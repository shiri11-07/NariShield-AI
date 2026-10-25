import { Languages } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLang();
  const options = [
    { id: 'en', label: 'EN', full: 'English' },
    { id: 'te', label: 'తె', full: 'తెలుగు' },
  ];
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-2xl border border-brand-200 bg-white/80 p-1 ${className}`}
      role="group"
      aria-label={t('common.language')}
    >
      <Languages size={18} className="ml-2 text-brand-600" aria-hidden="true" />
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setLang(o.id)}
          aria-pressed={lang === o.id}
          aria-label={o.full}
          className={`min-h-[40px] min-w-[44px] rounded-xl px-3 text-sm font-bold transition ${
            lang === o.id ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow' : 'text-brand-800 hover:bg-brand-50'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
