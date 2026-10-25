import { useState } from 'react';
import { GitCompare, ImagePlus } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { useLang } from '../context/LanguageContext';
import { assetUrl, readFileAsDataURL } from '../utils/imageTools';
import { combine, compareBios, compareImages, compareUsernames, verdictFor } from '../utils/comparator';

function Upload({ id, label, src, onChange }) {
  const { t } = useLang();
  return (
    <div>
      <p className="label">{label}</p>
      <label
        htmlFor={id}
        className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-brand-300 bg-white/70 p-3 text-center hover:bg-brand-50"
      >
        {src ? (
          <img src={src} alt={label} className="max-h-48 rounded-xl" />
        ) : (
          <>
            <ImagePlus size={32} className="mb-2 text-brand-500" aria-hidden="true" />
            <span className="font-semibold text-brand-800">{t('cmp.upload')}</span>
          </>
        )}
        <input
          id={id}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f && f.type.startsWith('image/')) onChange(await readFileAsDataURL(f));
          }}
        />
      </label>
    </div>
  );
}

function Meter({ label, value, note }) {
  const pct = Math.round(value * 100);
  const tone = pct >= 70 ? 'pink' : 'brand';
  return (
    <div className="rounded-2xl border border-brand-100 bg-white/80 p-4">
      <ProgressBar value={pct} label={label} tone={tone} />
      {note && <p className="mt-2 text-sm text-slate-600">{note}</p>}
    </div>
  );
}

export default function Comparator() {
  const { t } = useLang();
  const [a, setA] = useState({ img: '', user: '', bio: '' });
  const [b, setB] = useState({ img: '', user: '', bio: '' });
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const loadDemo = () => {
    setA({ img: assetUrl('demo-images/demo-profile-genuine.svg'), user: 'meera.rao', bio: 'Photography | Hyderabad | Coffee lover ☕ | Final-year CSE' });
    setB({ img: assetUrl('demo-images/demo-profile-fake.svg'), user: 'meera.rao_official', bio: 'Photography | Hyderabad | Coffee lover ☕ | DM for urgent help' });
    setResult(null);
  };

  const run = async () => {
    setBusy(true);
    try {
      const username = a.user.trim() && b.user.trim() ? compareUsernames(a.user, b.user) : null;
      const bio = compareBios(a.bio, b.bio);
      let image = null;
      if (a.img && b.img) {
        try {
          image = await compareImages(a.img, b.img);
        } catch (e) {
          image = null;
        }
      }
      const overall = combine({
        image: image ? image.score : null,
        username: username ? username.score : null,
        bio: bio.hasBoth ? bio.score : null,
      });
      setResult({ username, bio: bio.hasBoth ? bio : null, image, overall });
    } finally {
      setBusy(false);
    }
  };

  const canRun = (a.img && b.img) || (a.user && b.user) || (a.bio && b.bio);
  const flagText = (f) => t(`cmp.flag.${f}`);

  return (
    <div>
      <PageHeader icon={GitCompare} title={t('cmp.title')} subtitle={t('cmp.subtitle')} />
      <GlassCard className="mb-5">
        <p className="text-slate-700">{t('cmp.how')}</p>
        <p className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
          {t('cmp.limit')}
        </p>
        <button type="button" className="btn-soft btn-sm mt-3" onClick={loadDemo}>{t('cmp.demo')}</button>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        {[
          { key: 'a', label: t('cmp.genuine'), state: a, set: setA },
          { key: 'b', label: t('cmp.suspect'), state: b, set: setB },
        ].map(({ key, label, state, set }) => (
          <GlassCard key={key}>
            <h2 className="mb-3 text-lg font-bold text-ink">{label}</h2>
            <Upload id={`cmp-img-${key}`} label={t('cmp.photo')} src={state.img} onChange={(img) => { set({ ...state, img }); setResult(null); }} />
            <div className="mt-4">
              <label className="label" htmlFor={`cmp-u-${key}`}>{t('cmp.username')}</label>
              <input id={`cmp-u-${key}`} className="input" value={state.user} onChange={(e) => set({ ...state, user: e.target.value })} />
            </div>
            <div className="mt-4">
              <label className="label" htmlFor={`cmp-b-${key}`}>{t('cmp.bio')}</label>
              <textarea id={`cmp-b-${key}`} className="input min-h-[80px]" value={state.bio} onChange={(e) => set({ ...state, bio: e.target.value })} />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="my-5">
        <button type="button" className="btn-primary" onClick={run} disabled={!canRun || busy}>
          {busy ? t('cmp.comparing') : t('cmp.compare')}
        </button>
      </div>

      {result && (
        <GlassCard aria-live="polite">
          <h2 className="mb-1 text-xl font-bold text-ink">{t('cmp.result')}</h2>
          <p className="mb-4 text-lg font-semibold text-brand-800">{t(`cmp.verdict.${verdictFor(result.overall)}`)} ({Math.round(result.overall * 100)}%)</p>
          <div className="grid gap-4 md:grid-cols-3">
            {result.username && (
              <Meter
                label={t('cmp.username')}
                value={result.username.score}
                note={result.username.flags.map(flagText).join(' · ')}
              />
            )}
            {result.image && <Meter label={t('cmp.photo')} value={result.image.score} note={t('cmp.photoNote')} />}
            {result.bio && <Meter label={t('cmp.bio')} value={result.bio.score} />}
          </div>
          {verdictFor(result.overall) !== 'low' && (
            <p className="mt-4 rounded-2xl bg-blush-50 p-3 text-base text-slate-800">{t('cmp.nextStep')}</p>
          )}
          <p className="mt-3 text-sm text-slate-600">{t('cmp.limit')}</p>
        </GlassCard>
      )}
    </div>
  );
}
