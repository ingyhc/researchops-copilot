import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnalysisOverlay } from '@/components/AnalysisOverlay';
import { ProjectIntake } from '@/pages/ProjectIntake';
import { ResearchDashboard } from '@/pages/ResearchDashboard';
import { Compass, Layers, Logo, Search, Settings, Users } from '@/components/icons';
import { ANALYSIS_STAGES, analyzeBrief } from '@/services/aiService';
import { EXAMPLE_BRIEF } from '@/data/mockProject';
import { cn } from '@/lib/cn';
import type { ResearchProject } from '@/types';

type View = 'intake' | 'dashboard';

const RAIL_ITEMS = [
  { id: 'projects', icon: Compass, label: 'Projects' },
  { id: 'frameworks', icon: Layers, label: 'Industry frameworks' },
  { id: 'experts', icon: Users, label: 'Expert library' },
  { id: 'search', icon: Search, label: 'Search' },
];

export function App() {
  const [view, setView] = useState<View>('intake');
  const [brief, setBrief] = useState(EXAMPLE_BRIEF);
  const [project, setProject] = useState<ResearchProject | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedStages, setCompletedStages] = useState(0);

  const handleAnalyze = useCallback(async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setCompletedStages(0);

    const result = await analyzeBrief(brief, {
      onStage: (_stage, index) => setCompletedStages(index + 1),
    });

    // Let the final stage read as complete before the view swaps.
    await new Promise((resolve) => setTimeout(resolve, 450));

    setProject(result);
    setView('dashboard');
    setIsAnalyzing(false);
  }, [brief, isAnalyzing]);

  const handleNewProject = useCallback(() => {
    setView('intake');
    setProject(null);
    setCompletedStages(0);
  }, []);

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Left rail — navigation scaffold for the wider internal platform.
          The wrapper carries the border and fill so the column stays unbroken
          on pages taller than the viewport; the nav itself sticks. */}
      <div className="hidden w-14 shrink-0 border-r border-line bg-surface lg:block">
        <nav
          aria-label="Workspace"
          className="sticky top-0 flex h-screen flex-col items-center py-4"
        >
        <Logo size={26} />
        <div className="mt-6 flex flex-1 flex-col items-center gap-1">
          {RAIL_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0;
            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                aria-label={item.label}
                className={cn(
                  'flex size-9 items-center justify-center rounded-lg transition-colors',
                  isActive
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink-faint hover:bg-canvas hover:text-ink-muted',
                )}
              >
                <Icon size={17} />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          title="Settings"
          aria-label="Settings"
          className="flex size-9 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-canvas hover:text-ink-muted"
        >
          <Settings size={17} />
        </button>
          <div className="mt-3 flex size-8 items-center justify-center rounded-full bg-canvas-sunken text-[11px] font-semibold text-ink-muted">
            IC
          </div>
        </nav>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5 lg:px-6">
          <div className="flex items-center gap-2.5">
            <span className="lg:hidden">
              <Logo size={22} />
            </span>
            <span className="text-[12.5px] font-semibold tracking-[-0.01em] text-ink">
              ResearchOps Copilot
            </span>
            <span className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
              Internal
            </span>
          </div>
          <span
            className="rounded-full border border-[#f0e3c6] bg-caution-soft px-2.5 py-1 text-[10.5px] font-semibold text-caution"
            title="Phase 1 prototype — all output is mock data, no model is called."
          >
            Mock data · Phase 1
          </span>
        </div>

        <main className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            {view === 'intake' || !project ? (
              <ProjectIntake
                key="intake"
                brief={brief}
                onBriefChange={setBrief}
                onAnalyze={handleAnalyze}
                onLoadExample={() => setBrief(EXAMPLE_BRIEF)}
                isExampleLoaded={brief.trim() === EXAMPLE_BRIEF.trim()}
                isAnalyzing={isAnalyzing}
              />
            ) : (
              <ResearchDashboard
                key="dashboard"
                project={project}
                onNewProject={handleNewProject}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {isAnalyzing && (
          <AnalysisOverlay
            key="analysis"
            stages={ANALYSIS_STAGES}
            completed={completedStages}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
