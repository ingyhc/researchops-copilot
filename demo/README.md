# Demo assets

Everything needed to put this in front of a reviewer — human or model.

| File | What it's for |
| --- | --- |
| `EVALUATION-PROMPT.md` | Paste into ChatGPT before attaching anything else. Gives it the product context, the deliberate constraints, and what to critique. |
| `screenshots/` | Six captures covering the full flow. Attach to ChatGPT for design / UX / product critique. |
| `source-bundle.md` | Whole codebase in one file (~120 KB). Upload for architecture and code-quality review. |
| `bundle-source.sh` | Regenerates `source-bundle.md`. |
| `capture-screenshots.mjs` | Regenerates `screenshots/`. |

## The screenshots

| File | Screen |
| --- | --- |
| `01-project-intake.png` | Page 1 — brief pasted, intake signals detected |
| `02-analysis-running.png` | The three-agent pipeline mid-run |
| `03-tab1-brief-understanding.png` | Agent 1 — objective, key terms, ranked intent hypotheses |
| `04-tab2-industry-map.png` | Agent 2 — value-chain map + client focus area |
| `05-tab2-node-inspected.png` | Agent 2 — hover state isolating one node's relationships |
| `06-tab3-knowledge-owners.png` | Agent 3 — sourcing table (first row expanded) + profiles to avoid |

## Regenerating

Screenshots drive the real app in Chrome, so they never drift from the build.
Needs the dev server running and Playwright available:

```bash
npm run dev
```

```bash
npm install --no-save playwright@1.55.0 && node demo/capture-screenshots.mjs
```

Playwright is deliberately not in `package.json` — it's a capture tool, not a
dependency of the product.

```bash
bash demo/bundle-source.sh
```

## Which asset for which reviewer

- **ChatGPT / design critique** → prompt + screenshots. It reads visual hierarchy
  and IA well from images.
- **ChatGPT / code review** → prompt + `source-bundle.md`.
- **A recruiter or hiring manager** → deploy it (`npm run build`, then Vercel or
  Netlify) and send the URL. A live link beats any static asset for a human.
- **Not worth doing:** giving ChatGPT a deployed URL. Its browser doesn't execute
  the app, so it would see an empty React shell.
