import { mockProject } from '@/data/mockProject';
import type { ResearchProject } from '@/types';

/**
 * Service layer for the research analysis pipeline.
 *
 * PHASE 1 (current): every function here returns mock data on a simulated
 * latency curve. No network calls are made.
 *
 * PHASE 2: `analyzeBrief` will POST the brief to the Coze workflow that fans
 * out to three agents, and stream their stage completions back through the
 * same `onStage` callback the UI already consumes. The return type must not
 * change — the dashboard is written against `ResearchProject`, not against any
 * particular provider's response shape.
 */

/** One agent in the pipeline. The UI renders these during the transition. */
export interface AnalysisStage {
  id: string;
  agent: string;
  label: string;
  detail: string;
  /** Simulated wall-clock time for this stage, in ms. */
  durationMs: number;
}

export const ANALYSIS_STAGES: AnalysisStage[] = [
  {
    id: 'parse',
    agent: 'Intake',
    label: 'Parsing brief',
    detail: 'Segmenting requirements, normalising mixed-language input',
    durationMs: 900,
  },
  {
    id: 'agent-1',
    agent: 'Agent 1',
    label: 'Interpreting client objective',
    detail: 'Extracting intent hypotheses, key terms and open questions',
    durationMs: 1600,
  },
  {
    id: 'agent-2',
    agent: 'Agent 2',
    label: 'Building industry framework',
    detail: 'Mapping value chain layers and the client focus area',
    durationMs: 1900,
  },
  {
    id: 'agent-3',
    agent: 'Agent 3',
    label: 'Mapping knowledge owners',
    detail: 'Resolving research questions to functions, titles and tiers',
    durationMs: 1700,
  },
];

export interface AnalyzeBriefOptions {
  /** Fired as each pipeline stage completes. */
  onStage?: (stage: AnalysisStage, index: number) => void;
  /** Abort the (simulated) run — wired for parity with the real client. */
  signal?: AbortSignal;
}

export class AnalysisAbortedError extends Error {
  constructor() {
    super('Analysis aborted');
    this.name = 'AnalysisAbortedError';
  }
}

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(new AnalysisAbortedError());
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(timer);
      reject(new AnalysisAbortedError());
    }
    signal?.addEventListener('abort', onAbort, { once: true });
  });

/**
 * Run the three-agent analysis over a client brief.
 *
 * @example
 * const project = await analyzeBrief(text, {
 *   onStage: (stage, i) => setCompleted(i + 1),
 * });
 */
export async function analyzeBrief(
  briefText: string,
  options: AnalyzeBriefOptions = {},
): Promise<ResearchProject> {
  const { onStage, signal } = options;
  const startedAt = Date.now();

  for (let i = 0; i < ANALYSIS_STAGES.length; i += 1) {
    const stage = ANALYSIS_STAGES[i];
    await wait(stage.durationMs, signal);
    onStage?.(stage, i);
  }

  // TODO(phase-2): replace with a call to the Coze workflow, e.g.
  //   const res = await fetch(`${COZE_BASE_URL}/v1/workflow/run`, { ... });
  //   return normalizeCozeResponse(await res.json());
  return {
    ...mockProject,
    briefText: briefText.trim() || mockProject.briefText,
    submittedAt: new Date().toISOString(),
    analysisDurationMs: Date.now() - startedAt,
  };
}

/** Total simulated runtime — used to size the progress animation. */
export const TOTAL_ANALYSIS_MS = ANALYSIS_STAGES.reduce(
  (sum, stage) => sum + stage.durationMs,
  0,
);
