import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ConfidenceBadgeProps {
  /** 0–100 */
  value: number;
  size?: number;
  /** Delay the ring animation so a list of badges staggers. */
  delay?: number;
  className?: string;
}

/**
 * Circular confidence meter. Used to signal that the model is expressing a
 * hypothesis with a strength, not returning a fact.
 */
export function ConfidenceBadge({
  value,
  size = 52,
  delay = 0,
  className,
}: ConfidenceBadgeProps) {
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));

  // Confidence bands read at a glance without adding a second colour system.
  const tone =
    clamped >= 80
      ? { ring: 'var(--color-accent)', text: 'text-accent' }
      : clamped >= 65
        ? { ring: '#7c74e8', text: 'text-[#5f57d6]' }
        : { ring: '#a8a3d9', text: 'text-ink-muted' };

  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped}% confidence`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            'text-[13px] font-semibold tabular-nums tracking-tight',
            tone.text,
          )}
        >
          {clamped}
          <span className="text-[9px] font-medium">%</span>
        </span>
      </div>
    </div>
  );
}

export default ConfidenceBadge;
