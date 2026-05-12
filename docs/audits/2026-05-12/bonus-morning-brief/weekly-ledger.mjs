#!/usr/bin/env node
// Weekly Ledger generator — drafts content for the next week's "shipping log"
// across all your projects, in the Velkina ledger format.
//
// This is the meta-move: the same shipping-ledger pattern that became Velkina's
// signature element can be auto-generated from real git activity, so you have
// a draft each Monday with this week's real shipped work.
//
// Usage:
//   node ~/.claude/morning-brief/weekly-ledger.mjs
//   node ~/.claude/morning-brief/weekly-ledger.mjs --write     # save to ~/.claude/morning-brief/WEEKLY-LEDGER.md
//   node ~/.claude/morning-brief/weekly-ledger.mjs --since=14d # last 14 days instead of 7
//
// Honest design: it does NOT invent shipped work. If git has no commits for a
// project this week, that project doesn't appear in the ledger.

import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { homedir } from 'node:os';

const PROJECTS = [
  { name: 'Velkina',           path: 'D:/Velkina',                  client: 'Velkina (agency site)' },
  { name: 'RuleSell',          path: 'D:/RulesetMarketplace-master', client: 'RuleSell (marketplace)' },
  { name: 'MegVax Platform',   path: 'D:/MegvaxV4-main',             client: 'MegVax' },
  { name: 'MegVax Landing',    path: 'D:/megvax-landing',            client: 'MegVax (landing)' },
  { name: 'VisaAuto',          path: 'D:/VisaAuto',                  client: 'VisaAuto' },
  { name: 'ClaudeTeam',        path: 'D:/claudeteam',                client: 'ClaudeTeam' },
  { name: 'BCB Otomasyon',     path: 'D:/bcboto',                    client: 'BCB Otomasyon' },
  { name: 'Niceboard',         path: 'D:/Whiteboard',                client: 'Niceboard' },
  { name: 'Realm of Crowns',   path: 'D:/RealmOfCrowns',             client: 'Realm of Crowns (game)' },
  { name: 'Ball Fighter Shorts', path: 'D:/Ball Fighter Shorts Channel', client: 'Ball Fighter (game)' },
  { name: 'serefkeser.com',    path: 'D:/serefkesercom',             client: 'serefkeser.com (AI Studio)' },
  { name: 'Remotion Studio',   path: 'D:/remotion-studio',           client: 'Remotion Studio (tools)' }
];

const args = process.argv.slice(2);
const writeOut = args.includes('--write');
const sinceArg = args.find(a => a.startsWith('--since='));
const sinceFlag = sinceArg ? sinceArg.split('=')[1] : '7d';
const sinceGit = sinceFlag.endsWith('d') ? `${sinceFlag.slice(0, -1)} days ago` : sinceFlag;

function sh(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch { return null; }
}

function commitsForProject(p) {
  if (!existsSync(join(p.path, '.git'))) return [];
  const out = sh(`git -C "${p.path}" log --since="${sinceGit}" --format="%h|%cI|%s" --no-merges`);
  if (!out) return [];
  return out.split('\n').map(line => {
    const [hash, iso, ...rest] = line.split('|');
    return { hash, iso, message: rest.join('|'), date: iso.slice(0, 10) };
  });
}

function classifyCommit(msg) {
  const m = msg.toLowerCase();
  if (/\bfeat|add\b|ship\b|launch\b|new\b/i.test(msg)) return 'shipped';
  if (/\bfix|bug|patch\b/i.test(msg)) return 'fixed';
  if (/\bdocs?|readme|handoff/i.test(msg)) return 'documented';
  if (/\brefactor|cleanup|reorg/i.test(msg)) return 'refactored';
  if (/\bdeploy|prod|release/i.test(msg)) return 'deployed';
  return 'shipped';
}

function condenseMessage(msg) {
  // Strip prefixes, keep first clause
  let m = msg.replace(/^\s*\[?[a-z0-9-]+\]?\s*[:|]\s*/i, '');
  m = m.split(' — ')[0].split(' — ')[0].split(': ')[0].split(' - ')[0];
  if (m.length > 90) m = m.slice(0, 87) + '...';
  return m;
}

// ─── Gather ───
const projectsActivity = [];
for (const p of PROJECTS) {
  const commits = commitsForProject(p);
  if (commits.length === 0) continue;
  projectsActivity.push({ ...p, commits });
}

// Sort by activity (most recent commit first)
projectsActivity.sort((a, b) => b.commits[0].iso.localeCompare(a.commits[0].iso));

// ─── Render ───
const today = new Date().toISOString().slice(0, 10);
const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);

const lines = [];
lines.push(`# Weekly Shipping Ledger — week of ${today}`);
lines.push('');
lines.push(`Auto-drafted from real git activity across ${PROJECTS.length} projects.`);
lines.push(`Range: ${sinceGit} (${weekAgo} → ${today}).`);
lines.push('');
lines.push('> This is the format Velkina uses for its hero "Recent work" ledger.');
lines.push('> Use this as a draft for client updates, social posts, end-of-week reports.');
lines.push('');

if (projectsActivity.length === 0) {
  lines.push('_No commits across any tracked project in this window._');
  lines.push('');
} else {
  lines.push('## This week');
  lines.push('');
  for (const p of projectsActivity) {
    lines.push(`### ${p.client}`);
    lines.push('');
    for (const c of p.commits.slice(0, 5)) {
      const cls = classifyCommit(c.message);
      const tag = cls === 'shipped' ? '✦' : cls === 'fixed' ? '◆' : cls === 'deployed' ? '▲' : '○';
      lines.push(`- \`${c.date}\` ${tag} ${condenseMessage(c.message)} _(${c.hash})_`);
    }
    if (p.commits.length > 5) lines.push(`- ...and ${p.commits.length - 5} more`);
    lines.push('');
  }

  // ─── Hero-ledger-formatted version (ready to paste into messages/*.json) ───
  lines.push('## As JSON for Velkina hero ledger');
  lines.push('');
  lines.push('Paste this into `D:/Velkina/messages/en.json` under `home.ledger.recent` to update the live hero on velkina.com.');
  lines.push('');
  lines.push('```json');
  const ledgerEntries = projectsActivity
    .filter(p => p.client !== 'Velkina (agency site)') // skip self
    .slice(0, 6)
    .map(p => {
      const top = p.commits[0];
      const cls = classifyCommit(top.message);
      const status = cls === 'fixed' ? 'delivered' : cls === 'deployed' ? 'shipped' : 'in_progress';
      return {
        date: top.date,
        client: p.client.replace(/ \(.*\)/, ''),
        scope: condenseMessage(top.message),
        status
      };
    });
  lines.push(JSON.stringify(ledgerEntries, null, 2));
  lines.push('```');
  lines.push('');

  // ─── Suggested social post ───
  lines.push('## Draft social post');
  lines.push('');
  const shipped = projectsActivity.flatMap(p => p.commits.filter(c => classifyCommit(c.message) === 'shipped' || classifyCommit(c.message) === 'deployed')).slice(0, 3);
  if (shipped.length) {
    lines.push('```');
    lines.push(`This week we shipped:`);
    lines.push('');
    for (const c of shipped) {
      const proj = projectsActivity.find(p => p.commits.some(cc => cc.hash === c.hash));
      lines.push(`- ${proj?.client || 'unknown'} — ${condenseMessage(c.message)}`);
    }
    lines.push('');
    lines.push(`From İstanbul · Bucharest · Berlin. — Velkina`);
    lines.push('```');
  } else {
    lines.push('_No "shipped" or "deployed" commits this week._');
  }
  lines.push('');
}

lines.push('---');
lines.push(`_Ledger generated ${new Date().toISOString()}. Source: 12 tracked projects._`);

const output = lines.join('\n');

if (writeOut) {
  const outDir = join(homedir(), '.claude/morning-brief');
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, 'WEEKLY-LEDGER.md');
  writeFileSync(outFile, output);
  process.stderr.write(`wrote ${outFile}\n`);
}

process.stdout.write(output + '\n');
