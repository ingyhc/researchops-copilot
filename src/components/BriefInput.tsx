import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Command, FileText, Sparkle } from '@/components/icons';
import { useLang } from '@/i18n';
import { cn } from '@/lib/cn';

/** Names the intake step can recognise locally — no model call involved. */
const KNOWN_ENTITIES = [
  'Lear',
  'Adient',
  'Yanfeng',
  'Jifeng',
  'BYD',
  'NIO',
  'XPeng',
  'Geely',
  'Changan',
  '蔚来',
  '小鹏',
  '理想',
  '吉利',
  '长安',
  '比亚迪',
];

interface BriefInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onLoadExample: () => void;
  isExampleLoaded: boolean;
  disabled?: boolean;
}

/**
 * The single entry point of the product. Deliberately one large surface: the
 * CSA's job here is to paste, not to fill in a form.
 */
export function BriefInput({
  value,
  onChange,
  onSubmit,
  onLoadExample,
  isExampleLoaded,
  disabled,
}: BriefInputProps) {
  const { t } = useLang();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Lightweight local read of the brief, shown as intake signals. This is
  // string matching, not inference — it should stay that way.
  const signals = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const entities = KNOWN_ENTITIES.filter((name) => trimmed.includes(name));
    const questions = trimmed
      .split('\n')
      .filter((line) => /^\s*\d+[.、)]/.test(line)).length;
    const hasCjk = /[一-鿿]/.test(trimmed);
    const hasLatin = /[a-zA-Z]{3,}/.test(trimmed);

    return {
      // Character count, not words — the brief is usually mixed CJK/Latin.
      characters: trimmed.length,
      entities: entities.length,
      questions,
      language: hasCjk && hasLatin ? 'EN + 中文' : hasCjk ? '中文' : 'EN',
    };
  }, [value]);

  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <div className="surface-card shadow-lifted">
      <header className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 sm:px-7">
        <div>
          <h2 className="text-[17px] leading-6 font-semibold tracking-[-0.015em] text-ink">
            {t.intake.cardTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={onLoadExample}
          disabled={disabled}
          className={cn(
            'hidden shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors sm:inline-flex',
            isExampleLoaded
              ? 'border-line bg-canvas-sunken text-ink-faint'
              : 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink',
          )}
        >
          <FileText size={14} />
          {isExampleLoaded ? t.intake.exampleLoaded : t.intake.loadExample}
        </button>
      </header>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
              event.preventDefault();
              if (canSubmit) onSubmit();
            }
          }}
          disabled={disabled}
          spellCheck={false}
          placeholder={t.intake.placeholder}
          aria-label={t.intake.briefLabel}
          className="h-[340px] w-full resize-none bg-transparent px-6 py-5 text-[13.5px] leading-[1.75] text-ink placeholder:text-ink-faint focus:outline-none sm:px-7"
        />
      </div>

      <footer className="flex flex-col gap-4 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex min-h-[26px] flex-wrap items-center gap-x-2 gap-y-2">
          {signals ? (
            <>
              <SignalChip label={t.intake.signalLanguage} value={signals.language} />
              <SignalChip
                label={t.intake.signalCompanies}
                value={String(signals.entities)}
              />
              <SignalChip
                label={t.intake.signalQuestions}
                value={String(signals.questions)}
              />
              <span className="text-[11px] text-ink-faint tabular-nums">
                {t.intake.characters(signals.characters)}
              </span>
            </>
          ) : (
            <span className="text-[12px] text-ink-faint">
              {t.intake.emptySignals}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 text-[11px] text-ink-faint lg:flex">
            <Command size={12} />
            <span>+ Enter</span>
          </span>
          <motion.button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            whileHover={canSubmit ? { y: -1 } : undefined}
            whileTap={canSubmit ? { y: 0, scale: 0.99 } : undefined}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors',
              canSubmit
                ? 'bg-accent text-white shadow-[0_1px_2px_rgba(111,69,32,0.35),0_8px_20px_-10px_rgba(111,69,32,0.6)] hover:bg-[#573717]'
                : 'cursor-not-allowed bg-canvas-sunken text-ink-faint',
            )}
          >
            <Sparkle size={15} />
            {t.intake.analyze}
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}

function SignalChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-2 py-1 text-[11px] text-ink-muted">
      <span className="text-ink-faint">{label}</span>
      <span className="font-semibold tabular-nums text-ink">{value}</span>
    </span>
  );
}

export default BriefInput;
