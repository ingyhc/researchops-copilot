import { useState } from 'react';
import { InsightCard } from '@/components/InsightCard';
import { KnowledgeOwnerTable } from '@/components/KnowledgeOwnerTable';
import { ExpertTierBadge } from '@/components/ExpertTierBadge';
import { AlertTriangle, ArrowRight, Check, Copy } from '@/components/icons';
import type { KnowledgeOwnerMap } from '@/types';

interface KnowledgeOwnersPanelProps {
  data: KnowledgeOwnerMap;
  projectTitle: string;
}

/** Formats the mapping as plain text a CSA can paste into a sourcing ticket. */
function toSourcingPlan(data: KnowledgeOwnerMap, projectTitle: string): string {
  const lines = [`SOURCING PLAN — ${projectTitle}`, ''];

  data.rows.forEach((row, i) => {
    lines.push(`${i + 1}. ${row.question}`);
    lines.push(`   Owner: ${row.knowledgeOwner} (${row.department}) — ${row.tier}`);
    lines.push(`   Titles: ${row.recommendedTitles.join('; ')}`);
    lines.push(`   Companies: ${row.sourceCompanies.join(', ')}`);
    lines.push('');
  });

  lines.push('DO NOT SOURCE');
  data.avoid.forEach((item) => {
    lines.push(`- ${item.profile} — ${item.reason}`);
  });

  return lines.join('\n');
}

/** Agent 3 output. */
export function KnowledgeOwnersPanel({
  data,
  projectTitle,
}: KnowledgeOwnersPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toSourcingPlan(data, projectTitle));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — leave the button in its idle state.
    }
  };

  const tierOneCount = data.rows.filter((row) => row.tier === 'Tier 1').length;

  return (
    <div className="space-y-5">
      <InsightCard
        index={0}
        flush
        eyebrow="Agent 3 · Knowledge owner mapping"
        title="Where the answers actually sit"
        description={data.summary}
        aside={
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[12px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            {copied ? (
              <>
                <Check size={14} className="text-positive" />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy sourcing plan
              </>
            )}
          </button>
        }
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line px-6 py-3">
          <span className="text-[11.5px] text-ink-soft">
            <span className="font-semibold text-ink tabular-nums">
              {data.rows.length}
            </span>{' '}
            research questions mapped
          </span>
          <span className="text-[11.5px] text-ink-soft">
            <span className="font-semibold text-ink tabular-nums">
              {tierOneCount}
            </span>{' '}
            primary sourcing targets
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <ExpertTierBadge tier="Tier 1" withHint />
            <ExpertTierBadge tier="Tier 2" withHint />
          </div>
        </div>

        <KnowledgeOwnerTable rows={data.rows} />

        <p className="border-t border-line px-6 py-3 text-[11.5px] text-ink-faint">
          Select a row to see why that function owns the answer, plus screening
          questions for the call.
        </p>
      </InsightCard>

      <InsightCard
        index={1}
        eyebrow="Screening guardrails"
        title="Profiles To Avoid"
        description="These profiles look relevant on paper and waste sourcing cycles. Each one is paired with the profile to source instead."
        aside={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0e3c6] bg-caution-soft px-2.5 py-1 text-[11px] font-semibold text-caution">
            <AlertTriangle size={12} />
            {data.avoid.length} to exclude
          </span>
        }
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {data.avoid.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-line bg-canvas p-4"
            >
              <h4 className="text-[13px] font-semibold tracking-[-0.01em] text-ink line-through decoration-ink-faint/60 decoration-1">
                {item.profile}
              </h4>
              <p className="mt-2 text-[12.5px] leading-[1.65] text-ink-muted">
                {item.reason}
              </p>
              <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
                <ArrowRight size={13} className="shrink-0 text-accent" />
                <span className="text-[12px] text-ink-soft">
                  Source instead:{' '}
                  <span className="font-medium text-ink">{item.insteadSource}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </InsightCard>
    </div>
  );
}

export default KnowledgeOwnersPanel;
