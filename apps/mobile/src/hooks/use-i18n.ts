import { useCallback } from 'react';

import { translate, type TranslationKey } from '@/i18n/translations';
import { useAppStore } from '@/store/app-store';

export function useI18n() {
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang]
  );

  return { lang, setLang, t };
}
