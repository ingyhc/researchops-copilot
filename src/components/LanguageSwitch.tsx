import { motion } from 'framer-motion';
import { LANGUAGE_LABELS, useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import { cn } from '@/lib/cn';

const OPTIONS: Lang[] = ['en', 'zh'];

/**
 * Segmented EN / 简体 control. Switching re-renders the whole tree, including
 * the analysis output — the mock fixtures exist in both languages.
 */
export function LanguageSwitch() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.app.languageLabel}
      className="flex items-center gap-0.5 rounded-lg border border-line bg-canvas p-0.5"
    >
      {OPTIONS.map((option) => {
        const isActive = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={isActive}
            className={cn(
              'relative rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors',
              isActive ? 'text-ink' : 'text-ink-faint hover:text-ink-muted',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="language-switch-pill"
                className="absolute inset-0 rounded-md border border-line bg-surface shadow-card"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{LANGUAGE_LABELS[option]}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
