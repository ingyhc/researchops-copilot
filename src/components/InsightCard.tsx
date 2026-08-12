import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface InsightCardProps {
  /** Small uppercase label — usually the agent or section name. */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Rendered top-right: a badge, count or action. */
  aside?: ReactNode;
  children?: ReactNode;
  /** Index in a list, used to stagger the entrance animation. */
  index?: number;
  /** Removes inner padding so tables can sit flush. */
  flush?: boolean;
  className?: string;
  bodyClassName?: string;
}

/**
 * The base analytical surface. Every panel on the dashboard is one of these so
 * the rhythm of eyebrow → title → body stays identical across all three agents.
 */
export function InsightCard({
  eyebrow,
  title,
  description,
  aside,
  children,
  index = 0,
  flush,
  className,
  bodyClassName,
}: InsightCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('surface-card overflow-hidden', className)}
    >
      {(eyebrow || title || description || aside) && (
        <header
          className={cn(
            'flex items-start justify-between gap-6 px-6 pt-5',
            flush ? 'pb-5 border-b border-line' : 'pb-0',
          )}
        >
          <div className="min-w-0">
            {eyebrow && <p className="label-eyebrow">{eyebrow}</p>}
            {title && (
              <h3
                className={cn(
                  'text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink',
                  eyebrow && 'mt-2',
                )}
              >
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1.5 max-w-2xl text-[13px] leading-[1.65] text-ink-soft">
                {description}
              </p>
            )}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </header>
      )}
      {children && (
        <div className={cn(flush ? '' : 'px-6 pt-5 pb-6', bodyClassName)}>
          {children}
        </div>
      )}
    </motion.section>
  );
}

export default InsightCard;
