import { Fragment, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from '@/components/icons';
import { ExpertTierBadge } from '@/components/ExpertTierBadge';
import { cn } from '@/lib/cn';
import type { KnowledgeOwnerRow } from '@/types';

interface KnowledgeOwnerTableProps {
  rows: KnowledgeOwnerRow[];
}

/**
 * The sourcing plan. Rows expand to reveal the reasoning and the screening
 * questions — the part that actually teaches a junior CSA how to think.
 */
export function KnowledgeOwnerTable({ rows }: KnowledgeOwnerTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(rows[0]?.id ?? null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <Th className="w-[24%] pl-6">Research Question</Th>
            <Th className="w-[17%]">Knowledge Owner</Th>
            <Th className="w-[15%]">Department</Th>
            <Th className="w-[27%]">Recommended Titles</Th>
            <Th className="w-[17%] pr-6">Expert Tier</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const isExpanded = expandedId === row.id;

            return (
              <Fragment key={row.id}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.35 }}
                  onClick={() =>
                    setExpandedId((current) => (current === row.id ? null : row.id))
                  }
                  className={cn(
                    'cursor-pointer border-b border-line align-top transition-colors',
                    isExpanded ? 'bg-canvas' : 'hover:bg-canvas',
                  )}
                >
                  <td className="py-4 pr-4 pl-6">
                    <div className="flex gap-2">
                      <ChevronRight
                        size={14}
                        className={cn(
                          'mt-0.5 shrink-0 text-ink-faint transition-transform duration-200',
                          isExpanded && 'rotate-90 text-accent',
                        )}
                      />
                      <span className="text-[13px] leading-[1.55] font-medium text-ink">
                        {row.question}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-[13px] leading-[1.55] text-ink-muted">
                      {row.knowledgeOwner}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-[13px] leading-[1.55] text-ink-muted">
                      {row.department}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <ul className="space-y-1">
                      {row.recommendedTitles.map((title) => (
                        <li
                          key={title}
                          className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-ink-muted"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-line-strong" />
                          {title}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 pr-6">
                    <ExpertTierBadge tier={row.tier} />
                  </td>
                </motion.tr>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.tr
                      key={`${row.id}-detail`}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-line"
                    >
                      <td colSpan={5} className="p-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden bg-canvas"
                        >
                          <div className="grid gap-6 px-6 pt-1 pb-6 lg:grid-cols-3">
                            <div>
                              <p className="label-eyebrow">Why this owner</p>
                              <p className="mt-2 text-[12.5px] leading-[1.7] text-ink-muted">
                                {row.rationale}
                              </p>
                            </div>
                            <div>
                              <p className="label-eyebrow">Screening questions</p>
                              <ol className="mt-2 space-y-1.5">
                                {row.screeningQuestions.map((question, i) => (
                                  <li
                                    key={question}
                                    className="flex gap-2 text-[12.5px] leading-[1.6] text-ink-muted"
                                  >
                                    <span className="text-ink-faint tabular-nums">
                                      {i + 1}.
                                    </span>
                                    {question}
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <p className="label-eyebrow">Likely source companies</p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {row.sourceCompanies.map((company) => (
                                  <span
                                    key={company}
                                    className="rounded-md border border-line bg-surface px-2 py-1 text-[11.5px] text-ink-muted"
                                  >
                                    {company}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={cn(
        'py-3 pr-4 text-[11px] font-semibold tracking-[0.09em] text-ink-faint uppercase',
        className,
      )}
    >
      {children}
    </th>
  );
}

export default KnowledgeOwnerTable;
