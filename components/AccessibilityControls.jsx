import { Contrast, ALargeSmall } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';

export default function AccessibilityControls() {
  const { settings, toggleSetting } = useApp();
  const { t } = useLang();
  const base =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl border transition';
  const on = 'border-brand-700 bg-brand-700 text-white';
  const off = 'border-brand-200 bg-white/80 text-brand-800 hover:bg-brand-50';
  return (
    <div className="flex items-center gap-2" role="group" aria-label={t('a11y.title')}>
      <button
        type="button"
        onClick={() => toggleSetting('highContrast')}
        aria-pressed={!!settings.highContrast}
        aria-label={t('a11y.contrast')}
        title={t('a11y.contrast')}
        className={`${base} ${settings.highContrast ? on : off}`}
      >
        <Contrast size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => toggleSetting('largeText')}
        aria-pressed={!!settings.largeText}
        aria-label={t('a11y.largeText')}
        title={t('a11y.largeText')}
        className={`${base} ${settings.largeText ? on : off}`}
      >
        <ALargeSmall size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
