import { motion } from 'framer-motion';
import { Check } from '@/components/icons';
import { useLang } from '@/i18n';
import { cn } from '@/lib/cn';
import type { AnalysisStage } from '@/services/aiService';

interface AnalysisOverlayProps {
  stages: AnalysisStage[];
  /** Number of stages already finished. */
  completed: number;
}

/** Stage ids from the service map onto the translated stage copy. */
const STAGE_KEYS = ['parse', 'agent1', 'agent2', 'agent3'] as const;

/**
 * The transition between intake and dashboard. It exists to make the pipeline
 * legible: three named agents, running in sequence, each producing one tab.
 */
export function AnalysisOverlay({ stages, completed }: AnalysisOverlayProps) {
  const { t } = useLang();
  const progress = Math.round((completed / stages.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 px-6 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.99 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg rounded-2xl border border-line bg-surface p-7 shadow-overlay"
      >
        <div className="flex items-baseline justify-between">
          <p className="label-eyebrow">{t.analysis.eyebrow}</p>
          <span className="text-[11px] tabular-nums text-ink-faint">
            {progress}%
          </span>
        </div>

        <h2 className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-ink">
          {t.analysis.title}
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
          {t.analysis.subtitle}
        </p>

        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-canvas-sunken">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <ol className="mt-6 space-y-1">
          {stages.map((stage, index) => {
            const copy = t.stages[STAGE_KEYS[index] ?? 'parse'];
            const isDone = index < completed;
            const isRunning = index === completed;

            return (
              <li
                key={stage.id}
                className={cn(
                  'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors',
                  isRunning && 'bg-canvas',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors',
                    isDone
                      ? 'border-accent bg-accent text-white'
                      : isRunning
                        ? 'border-accent text-accent'
                        : 'border-line-strong text-transparent',
                  )}
                >
                  {isDone ? (
                    <Check size={11} strokeWidth={2.5} />
                  ) : isRunning ? (
                    <motion.span
                      className="size-1.5 rounded-full bg-accent"
                      animate={{ opacity: [1, 0.25, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  ) : null}
                </span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span
                      className={cn(
                        'text-[13px] font-medium transition-colors',
                        isDone || isRunning ? 'text-ink' : 'text-ink-faint',
                      )}
                    >
                      {copy.label}
                    </span>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-tight transition-colors',
                        isRunning
                          ? 'bg-accent-soft text-accent'
                          : 'bg-canvas-sunken text-ink-faint',
                      )}
                    >
                      {copy.agent}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block text-[11.5px] leading-snug transition-colors',
                      isDone || isRunning ? 'text-ink-soft' : 'text-ink-faint',
                    )}
                  >
                    {copy.detail}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </motion.div>
    </motion.div>
  );
}

export default AnalysisOverlay;
