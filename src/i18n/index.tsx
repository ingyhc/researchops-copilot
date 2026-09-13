import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { strings } from '@/i18n/strings';
import type { Lang, Strings } from '@/i18n/strings';

export { LANGUAGE_LABELS } from '@/i18n/strings';
export type { Lang, Strings } from '@/i18n/strings';

interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** The active dictionary. Used as `t.intake.analyze`. */
  t: Strings;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const value = useMemo(() => ({ lang, setLang, t: strings[lang] }), [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLang must be used inside <LanguageProvider>');
  return value;
}
