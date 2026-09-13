import { motion } from 'framer-motion';
import { BriefInput } from '@/components/BriefInput';
import { Compass, Layers, Users } from '@/components/icons';
import { useLang } from '@/i18n';

const AGENT_ICONS = [Compass, Layers, Users];
const PROJECT_AGES = ['2d', '4d', '1w'];

interface ProjectIntakeProps {
  brief: string;
  onBriefChange: (value: string) => void;
  onAnalyze: () => void;
  onLoadExample: () => void;
  isExampleLoaded: boolean;
  isAnalyzing: boolean;
}

export function ProjectIntake({
  brief,
  onBriefChange,
  onAnalyze,
  onLoadExample,
  isExampleLoaded,
  isAnalyzing,
}: ProjectIntakeProps) {
  const { t } = useLang();
  const agents = t.intake.agentSummary.map((item, i) => ({
    ...item,
    icon: AGENT_ICONS[i],
    agent: [t.stages.agent1.agent, t.stages.agent2.agent, t.stages.agent3.agent][i],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10 lg:py-16"
    >
      <header className="max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="label-eyebrow">{t.intake.eyebrow}</span>
        </div>
        <h1 className="mt-4 text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] text-ink sm:text-[40px]">
          {t.app.name}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
          {t.intake.subtitle}
        </p>
      </header>

      <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_296px]">
        <BriefInput
          value={brief}
          onChange={onBriefChange}
          onSubmit={onAnalyze}
          onLoadExample={onLoadExample}
          isExampleLoaded={isExampleLoaded}
          disabled={isAnalyzing}
        />

        <aside className="space-y-6">
          <section className="surface-card p-5">
            <p className="label-eyebrow">{t.intake.produces}</p>
            <ul className="mt-4 space-y-4">
              {agents.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-ink-muted">
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-semibold text-ink-faint">
                          {item.agent}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-[1.6] text-ink-soft">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="surface-card p-5">
            <p className="label-eyebrow">{t.intake.recent}</p>
            <ul className="mt-3 divide-y divide-line">
              {t.intake.recentProjects.map((project, i) => (
                <li
                  key={project.title}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-ink-muted">
                      {project.title}
                    </p>
                    <p className="text-[11px] text-ink-faint">{project.sector}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-ink-faint tabular-nums">
                    {PROJECT_AGES[i]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}

export default ProjectIntake;
