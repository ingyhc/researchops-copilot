# ResearchOps Copilot — Phase 1

An internal research intelligence tool for junior Client Service Associates (CSAs)
at an expert network. A CSA pastes an unfamiliar client brief and gets back the
three things an experienced CSA would work out on their own:

1. **Brief Understanding** — what the client is actually asking, and the competing
   readings of it, ranked by confidence.
2. **Industry Intelligence** — an interactive map of the value chain around the
   brief, with the client's focus area highlighted.
3. **Knowledge Owners** — which function, department and job titles own each
   research question, plus the profiles to avoid.

**This phase contains no AI integration.** Every output is mock data. The purpose
is to validate the UX and the product concept before wiring up the agent workflow.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173. `npm run build` produces a production bundle;
`npm run typecheck` runs TypeScript in isolation.

---

## Product flow

```
Project Intake  →  Analysis (3 simulated agents)  →  Research Dashboard
   BriefInput          AnalysisOverlay                3 tabs, 1 per agent
```

The example brief is pre-loaded on the intake screen, so the whole flow can be
demoed in two clicks.

---

## Project structure

```
src/
  types/index.ts                  Domain model — the contract between AI and UI
  data/mockProject.ts             ALL mock content. No copy lives in components.
  services/aiService.ts           Service layer. Phase 2 integration point.
  pages/
    ProjectIntake.tsx             Page 1 — paste the brief
    ResearchDashboard.tsx         Page 2 — header, tabs, panel switching
  components/
    BriefInput.tsx                Brief textarea + local intake signals
    AnalysisOverlay.tsx           Staged agent progress during analysis
    DashboardTabs.tsx             Animated tab bar
    InsightCard.tsx               Base analytical surface used by every panel
    ConfidenceBadge.tsx           Circular confidence meter for intent hypotheses
    IndustryMap.tsx               Interactive node/edge value-chain map
    IndustryNode.tsx              A single node card on that map
    KnowledgeOwnerTable.tsx       Expandable sourcing table
    ExpertTierBadge.tsx           Tier 1 / Tier 2 / Tier 3 chip
    icons.tsx                     Inline icon set
    panels/
      BriefUnderstandingPanel.tsx     Agent 1 output
      IndustryIntelligencePanel.tsx   Agent 2 output
      KnowledgeOwnersPanel.tsx        Agent 3 output
```

---

## Adding the real AI workflow (Phase 2)

Only one file needs to change: **`src/services/aiService.ts`**.

`analyzeBrief(briefText, { onStage, signal })` currently walks a list of stages on
a timer and returns `mockProject`. To go live:

1. Replace the timer loop with a call to the Coze workflow.
2. Emit `onStage(stage, index)` as each agent reports back — the overlay UI needs
   no changes.
3. Map the workflow response onto the `ResearchProject` type in
   `src/types/index.ts`. Keep the shape; the whole dashboard is written against it.

`mockProject.ts` then becomes the fixture for tests and local development rather
than the production data source.

---

## Design system

| Token      | Value     | Use                          |
| ---------- | --------- | ---------------------------- |
| Background | `#F7F7F5` | Page canvas                  |
| Surface    | `#FFFFFF` | Cards, tables, map nodes     |
| Text       | `#1A1A1A` | Primary text                 |
| Accent     | `#4F46E5` | Focus, confidence, active state |

Typeface is Inter throughout. Tokens are defined once in `src/index.css` under
`@theme` and consumed as Tailwind utilities (`bg-canvas`, `text-ink`,
`border-line`, `text-accent`).

The visual target is Linear / Notion / Palantir — quiet, analytical, generous
whitespace. Accent colour is used sparingly and only to mean "this is where the
model is pointing you".

---

## Notes on the mock content

All figures, supplier positioning and company detail in `mockProject.ts` are
hand-written for the prototype and are not sourced from filings or research. The
UI carries a persistent `Mock data · Phase 1` badge so nobody mistakes a demo for
an analysis.
