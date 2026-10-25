import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, FolderLock, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import IncidentForm from '../components/IncidentForm';
import ProgressBar from '../components/ProgressBar';
import { CategoryChip, SeverityBadge, StatusBadge } from '../components/Badges';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { incidentProgress } from '../utils/guides';
import { stagger } from '../animations/variants';

export default function Evidence() {
  const { incidents, addIncident, notify } = useApp();
  const { t, fmt } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const create = (data) => {
    const id = addIncident(data);
    setOpen(false);
    notify(t('evidence.saved'));
    navigate(`/evidence/${id}`);
  };

  return (
    <div>
      <PageHeader
        icon={FolderLock}
        title={t('evidence.title')}
        subtitle={t('evidence.subtitle')}
        actions={
          <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
            <Plus size={20} aria-hidden="true" />
            {t('evidence.newIncident')}
          </button>
        }
      />

      {incidents.length === 0 ? (
        <GlassCard className="text-center">
          <p className="mb-4 text-lg text-slate-700">{t('evidence.empty')}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
              {t('evidence.newIncident')}
            </button>
            <Link to="/assistant" className="btn-soft">{t('nav.assistant')}</Link>
          </div>
        </GlassCard>
      ) : (
        <motion.ul variants={stagger(0.06)} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2">
          {incidents.map((inc) => (
            <motion.li key={inc.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
              <Link to={`/evidence/${inc.id}`} className="glass block h-full p-5 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-3 flex flex-wrap gap-2">
                  <CategoryChip category={inc.category} />
                  <SeverityBadge level={inc.severity} />
                  <StatusBadge status={inc.status} />
                  {(inc.demo || inc.id?.startsWith('demo_')) && <span className="chip border-amber-300 bg-amber-50 text-amber-900">{t('common.demoData')}</span>}
                </div>
                <h2 className="text-lg font-bold text-ink">{inc.title}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {inc.platform} · {fmt(inc.createdAt, false)} · {t('evidence.eventsCount', { n: inc.events?.length || 0 })}
                </p>
                <div className="mt-4">
                  <ProgressBar value={incidentProgress(inc)} label={t('guide.progress')} tone="pink" />
                </div>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-700">
                  {t('evidence.open')}
                  <ChevronRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}

      <IncidentForm open={open} onClose={() => setOpen(false)} onSubmit={create} />
    </div>
  );
}
