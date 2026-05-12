# Hour 1 checkpoint — Layer A operating-mode patch

**Time elapsed:** ~60 min (target 90).
**Status:** Layer A complete. Wave 1 starting.

## What I shipped (Layer A)

1. `~/.claude/hooks/track-visual-debt.sh` — PostToolUse hook on Write|Edit. Appends UI file edits to `<project>/.claude/visual-debt.json`. Tested: edits to `*.tsx` get tracked.
2. `~/.claude/hooks/require-visual-evidence.sh` — Stop hook. Reads visual-debt.json, emits `{"decision":"block","reason":"..."}` if unresolved entries exist. Tested: produces correct block JSON when debt exists.
3. `~/.claude/plugins/local/swap-test-before-shipping/` — skill that auto-triggers on "looks good / ready / done" phrases for UI work. Forces 3-bullet articulation of distinctive elements.
4. `~/.claude/plugins/local/honest-handoff/` — skill with 8-section required HANDOFF template. Empty sections fail.
5. `~/.claude/rules/visual-work-discipline.md` — 300-line targeted rules file. Wired into CLAUDE.md.
6. Registered both hooks in `~/.claude/settings.json` alongside existing hooks (additive, non-breaking).
7. Added new skills to `localPlugins` array.

## Self-test results

- track-visual-debt.sh fed `{"tool_input":{"file_path":"D:/Velkina/app/test.tsx"}}` → wrote correct entry to `D:/Velkina/.claude/visual-debt.json`.
- require-visual-evidence.sh with the test entry present + no screenshots → emitted `{"decision":"block","reason":"Visual debt unresolved: 1 UI file(s) edited this session..."}` and exit 0.
- Test entries cleared after verification.

## What I did NOT verify in Layer A

- Did not verify the skills fire automatically in mid-session (only at session start). The skill description matchers are configured per the SKILL.md frontmatter, but I have not yet tried saying "looks good" mid-task to confirm auto-trigger. Will observe during Wave 3 and adjust if matchers are too narrow.
- Did not test cross-platform — these hooks are bash + node, should work on Git Bash on Windows (current setup) and Linux. Not tested on macOS.
- Did not document the bypass file (`.claude/visual-debt-skip`) anywhere user-facing — Nalba/Baha need to know it exists. Will add to the global CLAUDE.md if used in practice.

## Next: Wave 1 — Honest Velkina audit

Dispatching three parallel agents:
- flow-auditor: navigate every page in every locale, screenshot at 3 viewports.
- honest-state-auditor: grep for fake success patterns (placeholder text, dead buttons, TODOs, untranslated strings).
- ux-auditor: Lighthouse + axe on every route.

Output expected: `docs/audits/2026-05-12/AUDIT-SUMMARY.md` with P0/P1/P2 buckets.

## Budget so far

| Service | Calls | Cost |
|---|---|---|
| No LLM/image generation yet | 0 | $0 |
