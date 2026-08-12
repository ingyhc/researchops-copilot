import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardTabs } from '@/components/DashboardTabs';
import type { TabDefinition } from '@/components/DashboardTabs';
import { BriefUnderstandingPanel } from '@/components/panels/BriefUnderstandingPanel';
import { IndustryIntelligencePanel } from '@/components/panels/IndustryIntelligencePanel';
import { KnowledgeOwnersPanel } from '@/components/panels/KnowledgeOwnersPanel';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Compass,
  FileText,
  Layers,
  Users,
} from '@/components/icons';
import { cn } from '@/lib/cn';
import type { ResearchProject } from '@/types';

type TabId = 'brief' | 'industry' | 'owners';

interface ResearchDashboardProps {
  project: ResearchProject;
  onNewProject: () => void;
}

export function ResearchDashboard({
  project,
  onNewProject,
}: ResearchDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('brief');
  const [briefOpen, setBriefOpen] = useState(false);

  const tabs: TabDefinition<TabId>[] = [
    {
      id: 'brief',
      label: 'Brief Understanding',
      agent: 'Agent 1',
      icon: Compass,
      count: project.briefInterpretation.businessIntents.length,
    },
    {
      id: 'industry',
      label: 'Industry Intelligence',
      agent: 'Agent 2',
      icon: Layers,
      count: project.industryFramework.nodes.length,
    },
    {
      id: 'owners',
      label: 'Knowledge Owners',
      agent: 'Agent 3',
      icon: Users,
      count: project.knowledgeOwners.rows.length,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-full"
    >
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1440px] px-6 pt-5 lg:px-10">
          <div className="flex items-center gap-2 text-[12px] text-ink-faint">
            <button
              type="button"
              onClick={onNewProject}
              className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors hover:bg-canvas-sunken hover:text-ink"
            >
              <ArrowLeft size={13} />
              Projects
            </button>
            <span aria-hidden="true">/</span>
            <span className="truncate text-ink-muted">{project.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[24px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[27px]">
                  {project.title}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe6dd] bg-positive-soft px-2.5 py-1 text-[11px] font-semibold text-positive">
                  <Check size={12} strokeWidth={2.5} />
                  {project.status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-soft">
                <MetaItem label="Client" value={project.client} />
                <MetaItem label="Sector" value={project.sector} />
                <MetaItem
                  label="Analyzed"
                  value={new Date(project.submittedAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                />
                <MetaItem
                  label="Runtime"
                  value={`${(project.analysisDurationMs / 1000).toFixed(1)}s · 3 agents`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBriefOpen((open) => !open)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors',
                  briefOpen
                    ? 'border-line-strong bg-surface text-ink'
                    : 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink',
                )}
                aria-expanded={briefOpen}
              >
                <FileText size={14} />
                Original brief
                <ChevronDown
                  size={13}
                  className={cn(
                    'transition-transform duration-200',
                    briefOpen && 'rotate-180',
                  )}
                />
              </button>
              <button
                type="button"
                onClick={onNewProject}
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#2e2e2c]"
              >
                New project
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {briefOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl border border-line bg-surface p-5">
                  <p className="label-eyebrow">Brief as received</p>
                  <pre className="mt-3 max-h-64 overflow-auto font-sans text-[12.5px] leading-[1.75] whitespace-pre-wrap text-ink-muted">
                    {project.briefText}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4">
            <DashboardTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-10 lg:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
          >
            {activeTab === 'brief' && (
              <BriefUnderstandingPanel data={project.briefInterpretation} />
            )}
            {activeTab === 'industry' && (
              <IndustryIntelligencePanel framework={project.industryFramework} />
            )}
            {activeTab === 'owners' && (
              <KnowledgeOwnersPanel
                data={project.knowledgeOwners}
                projectTitle={project.title}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-ink-faint">{label}</span>
      <span className="font-medium text-ink-muted">{value}</span>
    </span>
  );
}

export default ResearchDashboard;
