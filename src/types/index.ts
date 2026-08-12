/**
 * Domain model for ResearchOps Copilot.
 *
 * These types are the contract between the (future) AI workflow and the UI.
 * Phase 1 satisfies them with mock data in `src/data/mockProject.ts`; Phase 2
 * will satisfy them with responses from the Coze agent pipeline. The UI should
 * never need to change when the source swaps.
 */

/* ------------------------------------------------------------------ */
/* Agent 1 — Brief Understanding                                       */
/* ------------------------------------------------------------------ */

export interface ClientObjective {
  /** The question this card answers, shown verbatim in the UI. */
  prompt: string;
  /** One-paragraph interpretation of the brief. */
  summary: string;
  /** Atomic sub-questions the client is implicitly asking. */
  restated: string[];
}

export interface IndustryContext {
  /** Ordered breadcrumb, broad → narrow. */
  chain: string[];
  note: string;
}

export interface KeyTerm {
  term: string;
  /** Short expansion, e.g. "Original Equipment Manufacturer". */
  expansion: string;
  definition: string;
  /** Why a CSA should care when screening experts. */
  whyItMatters: string;
}

export interface BusinessIntent {
  id: string;
  /** 0–100. Rendered by <ConfidenceBadge />. */
  confidence: number;
  title: string;
  rationale: string;
  /** Evidence lifted from the brief that supports this hypothesis. */
  signals: string[];
}

export interface BriefInterpretation {
  clientObjective: ClientObjective;
  industryContext: IndustryContext;
  keyTerms: KeyTerm[];
  /** Multiple hypotheses — never a single answer. */
  businessIntents: BusinessIntent[];
  /** Ambiguities a CSA should clarify before sourcing. */
  openQuestions: string[];
}

/* ------------------------------------------------------------------ */
/* Agent 2 — Industry Intelligence                                     */
/* ------------------------------------------------------------------ */

export interface IndustryLayer {
  id: string;
  title: string;
  caption: string;
  /** Layers inside the client's stated scope get accent treatment. */
  isFocus?: boolean;
}

export interface IndustryNodeMeta {
  label: string;
  value: string;
}

export interface IndustryNodeData {
  id: string;
  layerId: string;
  label: string;
  /** Optional secondary line, e.g. a native-language name or ticker. */
  sublabel?: string;
  description: string;
  /** Longer context, revealed in the inspector when the node is selected. */
  detail: string;
  meta: IndustryNodeMeta[];
  /** Sits inside the client's explicit focus area. */
  isFocus?: boolean;
}

export interface IndustryEdge {
  from: string;
  to: string;
  /** `secondary` renders dashed — a weaker or conditional relationship. */
  kind?: 'primary' | 'secondary';
  label?: string;
}

export interface ClientFocusArea {
  title: string;
  description: string;
  pillars: { title: string; detail: string; nodeIds: string[] }[];
}

export interface IndustryFramework {
  headline: string;
  summary: string;
  layers: IndustryLayer[];
  nodes: IndustryNodeData[];
  edges: IndustryEdge[];
  clientFocus: ClientFocusArea;
}

/* ------------------------------------------------------------------ */
/* Agent 3 — Knowledge Owner Mapping                                   */
/* ------------------------------------------------------------------ */

export type ExpertTier = 'Tier 1' | 'Tier 2' | 'Tier 3';

export interface KnowledgeOwnerRow {
  id: string;
  /** The research question this owner can actually answer. */
  question: string;
  /** The function that owns the knowledge, not a person. */
  knowledgeOwner: string;
  department: string;
  recommendedTitles: string[];
  tier: ExpertTier;
  /** Where the answer physically sits inside the org. */
  rationale: string;
  /** Screening questions a CSA can paste into a call. */
  screeningQuestions: string[];
  /** Companies where this profile is most likely to be found. */
  sourceCompanies: string[];
}

export interface AvoidProfile {
  id: string;
  profile: string;
  reason: string;
  /** The profile a CSA should source instead. */
  insteadSource: string;
}

export interface KnowledgeOwnerMap {
  summary: string;
  rows: KnowledgeOwnerRow[];
  avoid: AvoidProfile[];
}

/* ------------------------------------------------------------------ */
/* Project envelope                                                    */
/* ------------------------------------------------------------------ */

export type ProjectStatus = 'Analysis Complete' | 'Analyzing' | 'Draft';

export interface ResearchProject {
  id: string;
  title: string;
  client: string;
  sector: string;
  status: ProjectStatus;
  /** ISO timestamp of when the brief was submitted. */
  submittedAt: string;
  /** Wall-clock duration of the (simulated) agent run. */
  analysisDurationMs: number;
  briefText: string;
  briefInterpretation: BriefInterpretation;
  industryFramework: IndustryFramework;
  knowledgeOwners: KnowledgeOwnerMap;
}
