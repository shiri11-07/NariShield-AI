import { useState } from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import PrivacyGuardian from '../components/PrivacyGuardian';
import { useLang } from '../context/LanguageContext';

export default function Privacy() {
  const { t } = useLang();
  const [result, setResult] = useState(null);
  return (
    <div>
      <PageHeader icon={ShieldCheck} title={t('privacy.title')} subtitle={t('privacy.subtitle')} />

      <GlassCard className="mb-5 border-amber-200 bg-amber-50/80">
        <h2 className="mb-2 text-lg font-bold text-ink">{t('privacy.whatItCanDo')}</h2>
        <ul className="list-disc space-y-2 pl-5 text-base text-slate-700">
          <li>{t('privacy.explainOne')}</li>
          <li>{t('privacy.explainTwo')}</li>
          <li>{t('privacy.explainThree')}</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <PrivacyGuardian onSave={setResult} saveLabel={t('privacy.prepare')} />
      </GlassCard>
      {result && (
        <GlassCard className="mt-5">
          <h2 className="mb-3 text-lg font-bold text-ink">{t('privacy.ready', { n: result.blurred })}</h2>
          <img src={result.image} alt={t('privacy.canvasLabel')} className="mb-4 max-h-80 rounded-2xl border border-brand-200" />
          <a href={result.image} download="narishield-blurred-screenshot.jpg" className="btn-primary">
            <Download size={20} aria-hidden="true" />
            {t('privacy.download')}
          </a>
          <p className="mt-3 text-sm text-slate-600">{t('privacy.tipSave')}</p>
        </GlassCard>
      )}
    </div>
  );
}
