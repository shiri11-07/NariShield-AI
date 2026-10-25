import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { translations } from '../language/translations';
import { formatDate } from '../utils/ids';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useLocalStorage('ns_lang', 'en');

  useEffect(() => {
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
  }, [lang]);

  // t('key', { name: 'x' }) -> UI string with {name} placeholders replaced.
  const t = useCallback(
    (key, params) => {
      let s = translations[lang]?.[key] ?? translations.en[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          s = s.split(`{${k}}`).join(String(v));
        });
      }
      return s;
    },
    [lang],
  );

  // tr({ en, te }) -> the string for the active language (used by bilingual content data).
  const tr = useCallback(
    (obj) => {
      if (obj == null) return '';
      if (typeof obj === 'string') return obj;
      return obj[lang] || obj.en || '';
    },
    [lang],
  );

  const fmt = useCallback((iso, withTime = true) => formatDate(iso, lang, withTime), [lang]);

  const value = useMemo(() => ({ lang, setLang, t, tr, fmt }), [lang, setLang, t, tr, fmt]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
