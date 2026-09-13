import { useLang } from '@/i18n';
import { cn } from '@/lib/cn';
import type { ExpertTier } from '@/types';

const TIER_STYLES: Record<ExpertTier, { chip: string; dot: string }> = {
  'Tier 1': {
    chip: 'bg-accent-soft text-accent border-accent-line',
    dot: 'bg-accent',
  },
  'Tier 2': {
    chip: 'bg-canvas-sunken text-ink-muted border-line-strong',
    dot: 'bg-ink-soft',
  },
  'Tier 3': {
    chip: 'bg-surface text-ink-soft border-line',
    dot: 'bg-ink-faint',
  },
};

/** Tier labels stay English — they are the firm's internal vocabulary. */

interface ExpertTierBadgeProps {
  tier: ExpertTier;
  /** Show the plain-language meaning next to the chip. */
  withHint?: boolean;
  className?: string;
}

export function ExpertTierBadge({ tier, withHint, className }: ExpertTierBadgeProps) {
  const { t } = useLang();
  const style = TIER_STYLES[tier];

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-tight whitespace-nowrap',
          style.chip,
        )}
      >
        <span className={cn('size-1.5 rounded-full', style.dot)} />
        {tier}
      </span>
      {withHint && (
        <span className="text-[11px] text-ink-faint">
          {t.agent3.tierHint[tier]}
        </span>
      )}
    </span>
  );
}

export default ExpertTierBadge;
