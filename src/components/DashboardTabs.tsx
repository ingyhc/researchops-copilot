import { motion } from 'framer-motion';
import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/lib/cn';

export interface TabDefinition<T extends string = string> {
  id: T;
  label: string;
  /** Agent attribution — reinforces that each tab is a distinct pipeline step. */
  agent: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /** Optional right-aligned count, e.g. number of rows produced. */
  count?: number;
}

interface DashboardTabsProps<T extends string> {
  tabs: TabDefinition<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}

export function DashboardTabs<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: DashboardTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label="Research output"
      className={cn('flex items-stretch gap-1 overflow-x-auto', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex shrink-0 items-center gap-2.5 px-3.5 pt-2 pb-3 text-[13px] font-medium transition-colors duration-150',
              isActive ? 'text-ink' : 'text-ink-soft hover:text-ink',
            )}
          >
            <Icon
              size={15}
              className={cn(
                'transition-colors',
                isActive ? 'text-accent' : 'text-ink-faint',
              )}
            />
            <span className="whitespace-nowrap">{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums transition-colors',
                  isActive
                    ? 'bg-accent-soft text-accent'
                    : 'bg-canvas-sunken text-ink-faint',
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <motion.span
                layoutId="dashboard-tab-underline"
                className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default DashboardTabs;
