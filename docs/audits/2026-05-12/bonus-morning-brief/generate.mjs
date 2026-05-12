#!/usr/bin/env node
// Morning Brief generator for Nalba.
//
// Scans known active projects, gathers status signals (git, visual-debt, last audit,
// last deploy if Vercel-linked), and writes a single Markdown brief to the dashboard
// directory + prints to stdout.
//
// Usage:
//   node ~/.claude/morning-brief/generate.mjs            # print brief to stdout
//   node ~/.claude/morning-brief/generate.mjs --write    # also write to ~/.claude/morning-brief/BRIEF.md
//
// No external deps. Pure node + child_process.

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, basename } from 'node:path';
import { homedir } from 'node:os';

// ────────────────────────────────────────────────────────────────────────────
// Config: known active projects. Edit this list as projects come and go.
// ────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  { name: 'Velkina',           path: 'D:/Velkina',                  liveUrl: 'https://www.velkina.com',     priority: 'pitch-trip' },
  { name: 'RuleSell',          path: 'D:/RulesetMarketplace-master', liveUrl: 'https://www.rulesell.com',    priority: 'launch' },
  { name: 'MegVax Platform',   path: 'D:/MegvaxV4-main',             liveUrl: null,                          priority: 'active' },
  { name: 'MegVax Landing',    path: 'D:/megvax-landing',            liveUrl: null,                          priority: 'active' },
  { name: 'VisaAuto',          path: 'D:/VisaAuto',                  liveUrl: null,                          priority: 'active' },
  { name: 'ClaudeTeam',        path: 'D:/claudeteam',                liveUrl: null,                          priority: 'active' },
  { name: 'BCB Otomasyon',     path: 'D:/bcboto',                    liveUrl: null,                          priority: 'active' },
  { name: 'Realm of Crowns',   path: 'D:/RealmOfCrowns',             liveUrl: null,                          priority: 'side' },
  { name: 'Niceboard',         path: 'D:/Whiteboard',                liveUrl: null,                          priority: 'side' },
  { name: 'Ball Fighter Shorts', path: 'D:/Ball Fighter Shorts Channel', liveUrl: null,                       priority: 'side' },
  { name: 'serefkeser.com',    path: 'D:/serefkesercom',             liveUrl: 'https://serefkeser.com',      priority: 'side' },
  { name: 'Remotion Studio',   path: 'D:/remotion-studio',           liveUrl: null,                          priority: 'tools' }
];

// ────────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const writeOut = args.includes('--write');
const verbose = args.includes('--verbose') || args.includes('-v');

function sh(cmd, opts = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], ...opts }).trim();
  } catch {
    return null;
  }
}

function ageHuman(ms) {
  const min = Math.round(ms / 60_000);
  if (min < 60) return `${min}m`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  return `${d}d`;
}

function probeProject(project) {
  const r = {
    name: project.name,
    path: project.path,
    liveUrl: project.liveUrl,
    priority: project.priority,
    exists: existsSync(project.path),
    notes: []
  };

  if (!r.exists) {
    r.notes.push('path does not exist');
    return r;
  }

  // Git state
  const gitDir = join(project.path, '.git');
  if (existsSync(gitDir)) {
    r.branch = sh(`git -C "${project.path}" rev-parse --abbrev-ref HEAD`);
    r.lastCommit = sh(`git -C "${project.path}" log -1 --format=%cr 2>&1`);
    r.lastCommitMsg = sh(`git -C "${project.path}" log -1 --format=%s`);
    const status = sh(`git -C "${project.path}" status --porcelain`);
    r.dirty = status ? status.split('\n').length : 0;
    const aheadBehind = sh(`git -C "${project.path}" status -sb 2>&1 | head -1`);
    r.aheadBehind = aheadBehind || null;
  }

  // Visual debt
  const debtFile = join(project.path, '.claude/visual-debt.json');
  if (existsSync(debtFile)) {
    try {
      const debt = JSON.parse(readFileSync(debtFile, 'utf8'));
      const entries = debt.entries || [];
      r.visualDebtTotal = entries.length;
      r.visualDebtUnresolved = entries.filter(e => !e.resolved).length;
    } catch {}
  }

  // Last audit / checkpoint
  const auditsDir = join(project.path, 'docs/audits');
  if (existsSync(auditsDir)) {
    try {
      const dates = readdirSync(auditsDir).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().reverse();
      if (dates.length) {
        r.lastAuditDate = dates[0];
        const auditFiles = readdirSync(join(auditsDir, dates[0])).filter(f => f.endsWith('.md'));
        r.lastAuditFiles = auditFiles.length;
        // Find most recent hour-N or final checkpoint
        const checkpoints = auditFiles.filter(f => /^hour-\d+|final/i.test(f)).sort();
        r.lastCheckpoint = checkpoints.at(-1) || null;
      }
    } catch {}
  }

  // HANDOFF check
  const handoff = join(project.path, 'HANDOFF.md');
  if (existsSync(handoff)) {
    const st = statSync(handoff);
    r.handoffAge = ageHuman(Date.now() - st.mtimeMs);
    // First line of handoff for context
    try {
      const txt = readFileSync(handoff, 'utf8').slice(0, 1000);
      const dateMatch = txt.match(/(\d{4}-\d{2}-\d{2})/);
      r.handoffDate = dateMatch ? dateMatch[1] : null;
    } catch {}
  }

  // Vercel linked?
  if (existsSync(join(project.path, '.vercel/project.json'))) {
    r.vercelLinked = true;
    try {
      const v = JSON.parse(readFileSync(join(project.path, '.vercel/project.json'), 'utf8'));
      r.vercelProject = v.projectName;
    } catch {}
  }

  return r;
}

// ────────────────────────────────────────────────────────────────────────────
// Render the brief
// ────────────────────────────────────────────────────────────────────────────

function pad(str, n) { return String(str).padEnd(n); }

function renderBrief(projects) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];

  lines.push(`# Nalba's Morning Brief — ${today}`);
  lines.push('');
  lines.push('Single-glance status across active projects. Generated by `~/.claude/morning-brief/generate.mjs`.');
  lines.push('');

  // ─── At-a-glance status ───
  lines.push('## At a glance');
  lines.push('');
  lines.push('| Project | Priority | Branch | Last commit | Dirty | Visual debt | Last audit | Live |');
  lines.push('|---|---|---|---|---|---|---|---|');
  for (const p of projects) {
    if (!p.exists) {
      lines.push(`| ${p.name} | ${p.priority} | — | — | — | — | — | _path missing_ |`);
      continue;
    }
    const debt = p.visualDebtUnresolved != null
      ? (p.visualDebtUnresolved === 0 ? `✅ 0/${p.visualDebtTotal}` : `⚠️ ${p.visualDebtUnresolved}/${p.visualDebtTotal}`)
      : '—';
    const dirty = p.dirty ? `⚠️ ${p.dirty}` : '✅ clean';
    const live = p.liveUrl ? `[link](${p.liveUrl})` : '—';
    lines.push(`| **${p.name}** | ${p.priority} | ${p.branch || '—'} | ${p.lastCommit || '—'} | ${dirty} | ${debt} | ${p.lastAuditDate || '—'} | ${live} |`);
  }
  lines.push('');

  // ─── Things that want attention ───
  const attention = [];
  for (const p of projects) {
    if (!p.exists) continue;
    if (p.dirty && p.dirty > 5) attention.push(`**${p.name}** has ${p.dirty} uncommitted files — check before next session.`);
    if (p.visualDebtUnresolved > 0) attention.push(`**${p.name}** has ${p.visualDebtUnresolved} unscreenshotted UI edits in visual-debt.json.`);
    if (p.aheadBehind && p.aheadBehind.includes('ahead')) {
      const m = p.aheadBehind.match(/ahead (\d+)/);
      if (m) attention.push(`**${p.name}** is ${m[1]} commit(s) ahead of origin — push pending.`);
    }
  }
  if (attention.length) {
    lines.push('## Wants attention');
    lines.push('');
    for (const a of attention) lines.push(`- ${a}`);
    lines.push('');
  }

  // ─── Recent activity per priority project ───
  lines.push('## Recent activity (high-priority projects)');
  lines.push('');
  const hot = projects.filter(p => p.exists && ['pitch-trip', 'launch', 'active'].includes(p.priority));
  for (const p of hot) {
    lines.push(`### ${p.name}`);
    lines.push('');
    if (p.lastCommit) lines.push(`- Last commit: ${p.lastCommit} — _${p.lastCommitMsg}_`);
    if (p.handoffDate) lines.push(`- HANDOFF dated ${p.handoffDate} (mtime ${p.handoffAge} ago)`);
    if (p.lastAuditDate) lines.push(`- Last audit: ${p.lastAuditDate} (${p.lastAuditFiles} reports${p.lastCheckpoint ? `, latest: ${p.lastCheckpoint}` : ''})`);
    if (p.vercelLinked) lines.push(`- Vercel: linked to project \`${p.vercelProject}\``);
    if (p.liveUrl) lines.push(`- Live: ${p.liveUrl}`);
    lines.push('');
  }

  // ─── Suggested priorities ───
  lines.push('## Suggested priorities today');
  lines.push('');
  const priorities = [];
  // 1. Anything dirty + ahead = push priority
  const pushReady = projects.filter(p => p.exists && p.aheadBehind && p.aheadBehind.includes('ahead'));
  if (pushReady.length) priorities.push(`Push: ${pushReady.map(p => p.name).join(', ')}`);
  // 2. Visual debt unresolved
  const debtProjects = projects.filter(p => p.exists && p.visualDebtUnresolved > 0);
  if (debtProjects.length) priorities.push(`Verify visually: ${debtProjects.map(p => `${p.name} (${p.visualDebtUnresolved})`).join(', ')}`);
  // 3. Live URL freshness check on pitch-trip / launch projects
  const liveCheckTargets = projects.filter(p => p.exists && p.liveUrl && ['pitch-trip', 'launch'].includes(p.priority));
  if (liveCheckTargets.length) priorities.push(`Spot-check live URL(s): ${liveCheckTargets.map(p => p.liveUrl).join(', ')}`);
  if (!priorities.length) priorities.push('Nothing urgent. Pick a P1 from a recent audit or work on the side projects.');

  for (let i = 0; i < priorities.length; i++) {
    lines.push(`${i + 1}. ${priorities[i]}`);
  }
  lines.push('');

  lines.push(`---\n_Brief generated ${new Date().toISOString()}. Run \`node ~/.claude/morning-brief/generate.mjs --write\` to refresh._`);

  return lines.join('\n');
}

// ────────────────────────────────────────────────────────────────────────────

const projects = PROJECTS.map(p => {
  if (verbose) process.stderr.write(`scanning ${p.name}...\n`);
  return probeProject(p);
});

const brief = renderBrief(projects);

if (writeOut) {
  const outDir = join(homedir(), '.claude/morning-brief');
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, 'BRIEF.md');
  writeFileSync(outFile, brief);
  process.stderr.write(`wrote ${outFile}\n`);
}

process.stdout.write(brief + '\n');
