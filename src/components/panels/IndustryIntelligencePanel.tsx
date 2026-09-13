import { IndustryMap } from '@/components/IndustryMap';
import { InsightCard } from '@/components/InsightCard';
import { Sparkle } from '@/components/icons';
import { useLang } from '@/i18n';
import type { IndustryFramework } from '@/types';

interface IndustryIntelligencePanelProps {
  framework: IndustryFramework;
}

/** Agent 2 output. */
export function IndustryIntelligencePanel({
  framework,
}: IndustryIntelligencePanelProps) {
  const { t } = useLang();
  const { clientFocus } = framework;

  return (
    <div className="space-y-5">
      <IndustryMap framework={framework} />

      <InsightCard
        index={1}
        title={clientFocus.title}
        description={clientFocus.description}
        aside={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
            <Sparkle size={12} />
            {t.agent2.sourcingPriority}
          </span>
        }
        className="border-accent-line bg-gradient-to-b from-accent-soft/50 to-surface"
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {clientFocus.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-accent-line/70 bg-surface p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-semibold text-accent tabular-nums">
                  0{i + 1}
                </span>
                <h4 className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
                  {pillar.title}
                </h4>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.65] text-ink-muted">
                {pillar.detail}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pillar.nodeIds.map((nodeId) => {
                  const node = framework.nodes.find((n) => n.id === nodeId);
                  if (!node) return null;
                  return (
                    <span
                      key={nodeId}
                      className="rounded-md border border-line bg-canvas px-2 py-1 text-[11px] font-medium text-ink-muted"
                    >
                      {node.label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </InsightCard>
    </div>
  );
}

export default IndustryIntelligencePanel;
