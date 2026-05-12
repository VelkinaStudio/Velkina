# Morning Brief

A single-glance status report across all your active projects. Reads git state, Vercel link state, visual-debt JSON, and recent audit checkpoints.

## Usage

```bash
# Print brief to stdout
node ~/.claude/morning-brief/generate.mjs

# Also write to ~/.claude/morning-brief/BRIEF.md
node ~/.claude/morning-brief/generate.mjs --write

# Verbose (logs scanning to stderr)
node ~/.claude/morning-brief/generate.mjs --verbose
```

## What it covers

- Git: branch, last commit timestamp + message, dirty file count, ahead/behind origin
- Visual debt: total entries + unresolved count (from `.claude/visual-debt.json`)
- Audit folder: most recent audit date + checkpoint file (`docs/audits/<date>/hour-N.md`)
- HANDOFF: file age + dated header
- Vercel: linked project name (from `.vercel/project.json`)
- Live URL: configured per project

## Add a project

Edit the `PROJECTS` array at the top of `generate.mjs`. Each entry:

```js
{
  name: 'Display name',
  path: 'D:/path/to/project',
  liveUrl: 'https://example.com' | null,
  priority: 'pitch-trip' | 'launch' | 'active' | 'side' | 'tools'
}
```

Priority feeds the "Recent activity" deep-dive section — only `pitch-trip`/`launch`/`active` projects get expanded.

## Scheduled run (optional)

If you want this generated every morning at 7am, add a Windows Task Scheduler entry:

```
Trigger: Daily at 07:00
Action: node "C:\Users\nalba\.claude\morning-brief\generate.mjs" --write
```

Then point your terminal startup file (e.g. PowerShell `$PROFILE`) at `cat ~/.claude/morning-brief/BRIEF.md` so it appears each new shell.

Or just run it on demand when you want to triage.

## What this solves

Across Velkina, RuleSell, MegVax, VisaAuto, ClaudeTeam, BCB Otomasyon, Realm of Crowns, Niceboard, Ball Fighter Shorts, serefkeser, Remotion Studio — that's 11+ active projects. Memorizing which ones have uncommitted work, unscreenshotted edits, or stale HANDOFFs is impossible.

This brief tells you in 30 seconds.

## Companion tools

This directory also has two related tools built in the same session:

### `weekly-ledger.mjs` — auto-draft Velkina's hero ledger

```bash
node ~/.claude/morning-brief/weekly-ledger.mjs --write
```

Scans git activity across all 12 projects from the last 7 days. Outputs:
- A human-readable list of shipped work per project
- A JSON snippet ready to paste into Velkina's `messages/en.json` `home.ledger.recent` field — so the live velkina.com signature element auto-refreshes
- A draft social post for end-of-week tweets / LinkedIn

This makes the Velkina hero ledger self-maintaining. Run it Monday morning, edit for accuracy, paste, redeploy.

### `reviewer-pack.mjs` — bundle a project for external review

```bash
node ~/.claude/morning-brief/reviewer-pack.mjs D:/Velkina
```

Generates `reviewer-pack-<date>/` inside the project with:
- The current HANDOFF.md
- A one-page summary
- The 10 most relevant screenshots (prioritized by keyword: live, final, after, hero, ledger…)
- All audit reports from the most recent run

Zip this folder and send to Codex/Gemini/Baha for review. They get the same context the author had, with the same evidence.

## Auto-run on session start

The morning brief is regenerated silently every time you start a Claude Code session, via the SessionStart hook at `~/.claude/hooks/session-start-brief.sh`. So `BRIEF.md` is always fresh — just open it.
