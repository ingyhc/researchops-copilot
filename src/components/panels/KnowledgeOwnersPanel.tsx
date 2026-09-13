import { useState } from 'react';
import { InsightCard } from '@/components/InsightCard';
import { KnowledgeOwnerTable } from '@/components/KnowledgeOwnerTable';
import { ExpertTierBadge } from '@/components/ExpertTierBadge';
import { AlertTriangle, ArrowRight, Check, Copy } from '@/components/icons';
import { useLang } from '@/i18n';
import type { Strings } from '@/i18n';
import type { KnowledgeOwnerMap } from '@/types';

interface KnowledgeOwnersPanelProps {
  data: KnowledgeOwnerMap;
  projectTitle: string;
}

/** Formats the mapping as plain text a CSA can paste into a sourcing ticket. */
function toSourcingPlan(
  data: KnowledgeOwnerMap,
  projectTitle: string,
  t: Strings,
): string {
  const lines = [`${t.agent3.planHeading} — ${projectTitle}`, ''];

  data.rows.forEach((row, i) => {
    lines.push(`${i + 1}. ${row.question}`);
    lines.push(
      `   ${t.agent3.planOwner}: ${row.knowledgeOwner} (${row.department}) — ${row.tier}`,
    );
    lines.push(`   ${t.agent3.planTitles}: ${row.recommendedTitles.join('; ')}`);
    lines.push(`   ${t.agent3.planCompanies}: ${row.sourceCompanies.join(', ')}`);
    lines.push('');
  });

  lines.push(t.agent3.planAvoid);
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
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toSourcingPlan(data, projectTitle, t));
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
        title={t.agent3.title}
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
                {t.agent3.copied}
              </>
            ) : (
              <>
                <Copy size={14} />
                {t.agent3.copyPlan}
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
            {t.agent3.questionsMapped}
          </span>
          <span className="text-[11.5px] text-ink-soft">
            <span className="font-semibold text-ink tabular-nums">
              {tierOneCount}
            </span>{' '}
            {t.agent3.primaryTargets}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <ExpertTierBadge tier="Tier 1" withHint />
            <ExpertTierBadge tier="Tier 2" withHint />
          </div>
        </div>

        <KnowledgeOwnerTable rows={data.rows} />

        <p className="border-t border-line px-6 py-3 text-[11.5px] text-ink-faint">
          {t.agent3.rowHint}
        </p>
      </InsightCard>

      <InsightCard
        index={1}
        title={t.agent3.avoidTitle}
        description={t.agent3.avoidDescription}
        aside={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0e3c6] bg-caution-soft px-2.5 py-1 text-[11px] font-semibold text-caution">
            <AlertTriangle size={12} />
            {t.agent3.toExclude(data.avoid.length)}
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
                  {t.agent3.sourceInstead}{' '}
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
