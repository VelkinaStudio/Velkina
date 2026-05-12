#!/usr/bin/env node
// Reviewer Pack generator.
//
// Bundles the HANDOFF + key audit screenshots + a one-page summary into a single
// shareable folder for Codex/Gemini/Baha to review. Output: a self-contained
// directory ready to be zipped and sent.
//
// Usage:
//   node ~/.claude/morning-brief/reviewer-pack.mjs <project-path>
//   node ~/.claude/morning-brief/reviewer-pack.mjs D:/Velkina
//
// Produces:
//   <project>/reviewer-pack-<date>/
//     README.md          - what's in this pack + how to review
//     HANDOFF.md         - copy of the handoff
//     summary.md         - one-page executive view
//     screenshots/       - 5-10 key screenshots, renamed for clarity
//     audits/            - structured copy of recent audit reports

import { existsSync, readFileSync, readdirSync, mkdirSync, copyFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';

const projectPath = process.argv[2];
if (!projectPath) {
  console.error('Usage: reviewer-pack.mjs <project-path>');
  process.exit(1);
}
if (!existsSync(projectPath)) {
  console.error(`Path does not exist: ${projectPath}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const projectName = basename(projectPath);
const outDir = join(projectPath, `reviewer-pack-${today}`);

mkdirSync(outDir, { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
mkdirSync(join(outDir, 'audits'), { recursive: true });

console.log(`Building reviewer pack for ${projectName}...`);

// ─── 1. Copy HANDOFF.md ───
const handoff = join(projectPath, 'HANDOFF.md');
if (existsSync(handoff)) {
  copyFileSync(handoff, join(outDir, 'HANDOFF.md'));
  console.log(`  + HANDOFF.md`);
}

// ─── 2. Find most recent audit folder + copy reports + selected screenshots ───
const auditsDir = join(projectPath, 'docs/audits');
let latestAuditDate = null;
let auditReports = [];
let auditScreenshots = [];

if (existsSync(auditsDir)) {
  const dates = readdirSync(auditsDir).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().reverse();
  if (dates.length) {
    latestAuditDate = dates[0];
    const dateDir = join(auditsDir, latestAuditDate);

    function walk(dir, rel = '') {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const relPath = rel ? `${rel}/${entry}` : entry;
        if (statSync(full).isDirectory()) {
          walk(full, relPath);
        } else {
          if (entry.endsWith('.md')) {
            auditReports.push({ full, relPath, name: entry });
          } else if (entry.endsWith('.png') || entry.endsWith('.jpg')) {
            auditScreenshots.push({ full, relPath, name: entry });
          }
        }
      }
    }
    walk(dateDir);

    // Copy reports
    for (const r of auditReports) {
      const dest = join(outDir, 'audits', r.relPath.replace(/\//g, '__'));
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(r.full, dest);
    }
    console.log(`  + ${auditReports.length} audit reports`);

    // Pick top screenshots: prefer "verify", "after", "final", "hero", "ledger", "live"
    const priorityKeywords = ['live', 'final', 'after', 'verify', 'hero', 'ledger', 'home', 'critical'];
    const scored = auditScreenshots.map(s => {
      let score = 0;
      const name = s.name.toLowerCase();
      for (const kw of priorityKeywords) if (name.includes(kw)) score += 10;
      if (name.includes('1440')) score += 3;  // prefer desktop
      if (name.includes('-en') || name.includes('-ro')) score += 2;
      return { ...s, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const topShots = scored.slice(0, 10);
    for (const s of topShots) {
      const dest = join(outDir, 'screenshots', s.name);
      copyFileSync(s.full, dest);
    }
    console.log(`  + ${topShots.length} screenshots (out of ${auditScreenshots.length} candidates)`);
  }
}

// ─── 3. Generate summary.md ───
const gitLog = (() => {
  try {
    return require('node:child_process').execSync(
      `git -C "${projectPath}" log -5 --format="- %cr — %s"`,
      { encoding: 'utf8' }
    );
  } catch { return null; }
})();

const summary = `# Reviewer pack summary — ${projectName} — ${today}

## What you're reviewing

This pack contains the most recent honest-handoff, the most recent audit run, and a curated set of screenshots that prove (or disprove) the handoff's claims.

**Pack contents:**
- \`HANDOFF.md\` — the current handoff. Written under the honest-handoff skill template (required sections + non-empty "what I did NOT verify").
- \`audits/\` — all markdown reports from the most recent audit run (${latestAuditDate || 'no audit found'}).
- \`screenshots/\` — top 10 visual evidence shots, prioritized by recency and relevance.
- This summary file.

## How to review

1. **Read HANDOFF.md first.** Pay particular attention to Section 3 ("What I did NOT verify") and Section 4 ("Known limitations"). An honest handoff has both non-empty.
2. **Spot-check Section 1 claims against \`screenshots/\`.** Every "I shipped X" bullet should have a corresponding screenshot, or admit it doesn't.
3. **Sanity-check Section 5 "Build & test evidence".** Commands + output should be quotable, not paraphrased.
4. **Verify ground truth:**
${gitLog ? `   - Recent commits (${gitLog.split('\n').length - 1}):\n${gitLog.split('\n').filter(Boolean).map(l => '     ' + l).join('\n')}` : '   - (git log not available)'}

## Reviewer questions to answer

The handoff Section 7 ("Reviewer notes") explicitly asks for second opinions on specific decisions. Read those questions and answer them in your review.

## How to push back

If a claim in HANDOFF.md isn't supported by the screenshots or audit reports in this pack, that's a finding. Document it in your review with the same file:line discipline the audit used.

---

_Pack generated ${new Date().toISOString()}. Source: ${projectPath}_
`;

writeFileSync(join(outDir, 'summary.md'), summary);
console.log(`  + summary.md`);

// ─── 4. Generate top-level README.md ───
const readme = `# ${projectName} reviewer pack — ${today}

Everything a reviewer needs to evaluate the most recent autonomous run on this project.

**Quick start:**

1. Open \`summary.md\` for the one-page executive view.
2. Open \`HANDOFF.md\` for the full handoff.
3. Browse \`screenshots/\` for visual evidence.
4. Dive into \`audits/\` for individual agent reports.

**File count:**
- Audit reports: ${auditReports.length}
- Screenshots: ${Math.min(auditScreenshots.length, 10)}

**Source project path:** \`${projectPath}\`
**Latest audit run:** ${latestAuditDate || 'none found'}
`;

writeFileSync(join(outDir, 'README.md'), readme);
console.log(`  + README.md`);

console.log(`\nReviewer pack ready: ${outDir}`);
console.log(`Send this folder (or zip it) to the reviewer.`);
