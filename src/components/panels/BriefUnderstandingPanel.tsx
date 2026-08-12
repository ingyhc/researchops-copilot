import { motion } from 'framer-motion';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { InsightCard } from '@/components/InsightCard';
import { ChevronRight, HelpCircle } from '@/components/icons';
import type { BriefInterpretation } from '@/types';

interface BriefUnderstandingPanelProps {
  data: BriefInterpretation;
}

/** Agent 1 output. */
export function BriefUnderstandingPanel({ data }: BriefUnderstandingPanelProps) {
  return (
    <div className="space-y-5">
      <InsightCard
        index={0}
        eyebrow="Client objective"
        title={data.clientObjective.prompt}
      >
        <p className="max-w-3xl text-[15px] leading-[1.7] font-medium tracking-[-0.005em] text-ink">
          {data.clientObjective.summary}
        </p>

        <div className="mt-6 border-t border-line pt-5">
          <p className="label-eyebrow">Broken into answerable questions</p>
          <ul className="mt-3 grid gap-2.5 lg:grid-cols-2">
            {data.clientObjective.restated.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 rounded-lg border border-line bg-canvas px-3.5 py-3"
              >
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-[12.5px] leading-[1.65] text-ink-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </InsightCard>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <InsightCard
          index={1}
          eyebrow="Industry context"
          title="Where this brief sits"
          description={data.industryContext.note}
        >
          <div className="flex flex-col gap-1">
            {data.industryContext.chain.map((step, i) => (
              <div key={step}>
                {i > 0 && (
                  <div className="ml-[13px] h-4 w-px bg-line-strong" aria-hidden="true" />
                )}
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex size-[27px] shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-[11px] font-semibold text-ink-soft tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-[13.5px] font-medium tracking-[-0.005em] text-ink">
                    {step}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </InsightCard>

        <InsightCard
          index={2}
          eyebrow="Key terms"
          title="Vocabulary you need before the first expert call"
          aside={
            <span className="text-[11px] text-ink-faint tabular-nums">
              {data.keyTerms.length} terms
            </span>
          }
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            {data.keyTerms.map((term) => (
              <div
                key={term.term}
                className="group rounded-lg border border-line bg-canvas px-3.5 py-3 transition-colors hover:border-line-strong hover:bg-surface"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                    {term.term}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-ink-faint">
                  {term.expansion}
                </p>
                <p className="mt-2 text-[12px] leading-[1.6] text-ink-muted">
                  {term.definition}
                </p>
                <p className="mt-2 border-t border-line pt-2 text-[11.5px] leading-[1.55] text-ink-soft">
                  <span className="font-medium text-ink-muted">Why it matters · </span>
                  {term.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </InsightCard>
      </div>

      <InsightCard
        index={3}
        eyebrow="Possible business intents"
        title="Three readings of the same brief"
        description="The model does not commit to one interpretation. Confirm the intent with the client before sourcing — it changes which experts are primary."
      >
        <ul className="space-y-3">
          {data.businessIntents.map((intent, i) => (
            <li
              key={intent.id}
              className="flex gap-4 rounded-xl border border-line bg-canvas p-4 transition-colors hover:border-line-strong"
            >
              <ConfidenceBadge value={intent.confidence} delay={0.2 + i * 0.1} />
              <div className="min-w-0 flex-1">
                <h4 className="text-[13.5px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                  {intent.title}
                </h4>
                <p className="mt-1.5 text-[12.5px] leading-[1.65] text-ink-muted">
                  {intent.rationale}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {intent.signals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-md border border-line bg-surface px-2 py-1 text-[11px] leading-tight text-ink-soft"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </InsightCard>

      <InsightCard
        index={4}
        eyebrow="Before you source"
        title="Open questions to clarify with the client"
        aside={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0e3c6] bg-caution-soft px-2.5 py-1 text-[11px] font-semibold text-caution">
            <HelpCircle size={12} />
            Needs confirmation
          </span>
        }
      >
        <ol className="space-y-2.5">
          {data.openQuestions.map((question, i) => (
            <li key={question} className="flex gap-3">
              <span className="text-[12px] font-semibold text-ink-faint tabular-nums">
                0{i + 1}
              </span>
              <span className="text-[12.5px] leading-[1.7] text-ink-muted">
                {question}
              </span>
            </li>
          ))}
        </ol>
      </InsightCard>
    </div>
  );
}

export default BriefUnderstandingPanel;
