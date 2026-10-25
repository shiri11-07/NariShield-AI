import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Download, ExternalLink, FileText, ImagePlus, Link2, NotebookPen, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import GuidancePanel from '../components/GuidancePanel';
import Timeline from '../components/Timeline';
import Modal from '../components/Modal';
import PrivacyGuardian from '../components/PrivacyGuardian';
import { CategoryChip, SeverityBadge, StatusBadge } from '../components/Badges';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { EVENT_TYPES, STATUS } from '../data/categories';
import { buildIncidentSummary, getCategoryGuide } from '../utils/guides';
import { buildComplaintDraft } from '../utils/complaint';
import { toLocalInputValue } from '../utils/ids';

const CYBERCRIME_PORTAL = 'https://cybercrime.gov.in/';

function download(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, toggleChecklist, addEvent, deleteEvent, updateIncident, deleteIncident, notify } = useApp();
  const { t, tr, lang, fmt } = useLang();
  const incident = incidents.find((i) => i.id === id);

  const [eventOpen, setEventOpen] = useState(false);
  const [shotOpen, setShotOpen] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [ev, setEv] = useState({ type: 'note', title: '', detail: '', url: '', date: toLocalInputValue() });
  const [sender, setSender] = useState({ name: '', contact: '' });
  const [draft, setDraft] = useState('');

  const guide = useMemo(() => (incident ? getCategoryGuide(incident.category) : null), [incident]);

  if (!incident) {
    return (
      <GlassCard className="text-center">
        <p className="mb-4 text-lg">{t('evidence.notFound')}</p>
        <Link to="/evidence" className="btn-primary">{t('evidence.backToList')}</Link>
      </GlassCard>
    );
  }

  const submitEvent = (e) => {
    e.preventDefault();
    if (!ev.title.trim()) return;
    addEvent(incident.id, {
      type: ev.type,
      title: ev.title.trim(),
      detail: ev.detail.trim(),
      url: ev.type === 'url' ? ev.url.trim() : '',
      date: new Date(ev.date).toISOString(),
    });
    setEventOpen(false);
    setEv({ type: 'note', title: '', detail: '', url: '', date: toLocalInputValue() });
    notify(t('evidence.eventAdded'));
  };

  const saveScreenshot = ({ image, blurred }) => {
    addEvent(incident.id, {
      type: 'screenshot',
      title: t('evidence.screenshotAdded'),
      detail: blurred ? t('evidence.blurredCount', { n: blurred }) : t('evidence.noBlur'),
      image,
      date: new Date().toISOString(),
    });
    setShotOpen(false);
    notify(t('evidence.eventAdded'));
  };

  const openDraft = () => {
    setDraft(buildComplaintDraft(incident, lang, fmt, sender));
    setDraftOpen(true);
  };
  const regenerate = () => setDraft(buildComplaintDraft(incident, lang, fmt, sender));
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      notify(t('common.copied'));
    } catch (err) {
      notify(t('common.copyFailed'), 'warn');
    }
  };

  return (
    <div>
      <Link to="/evidence" className="mb-3 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-700">
        <ArrowLeft size={18} aria-hidden="true" />
        {t('evidence.backToList')}
      </Link>

      <PageHeader
        icon={FileText}
        title={incident.title}
        subtitle={`${incident.platform} · ${fmt(incident.createdAt)}`}
        actions={
          <>
            <button type="button" className="btn-pink" onClick={openDraft}>
              <NotebookPen size={20} aria-hidden="true" />
              {t('evidence.prepareComplaint')}
            </button>
          </>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <CategoryChip category={incident.category} />
        <SeverityBadge level={incident.severity} />
        <StatusBadge status={incident.status} />
        {incident.demo || incident.id?.startsWith('demo_') ? <span className="chip border-amber-300 bg-amber-50 text-amber-900">{t('common.demoData')}</span> : null}
        <label className="ml-auto flex items-center gap-2 text-sm font-semibold text-slate-700">
          {t('evidence.status')}
          <select
            className="input !min-h-[44px] !w-auto"
            value={incident.status}
            onChange={(e) => updateIncident(incident.id, { status: e.target.value })}
          >
            {Object.entries(STATUS).map(([k, s]) => (
              <option key={k} value={k}>{tr(s.label)}</option>
            ))}
          </select>
        </label>
      </div>

      {incident.summary && (
        <GlassCard className="mb-5">
          <h2 className="mb-2 text-lg font-bold text-ink">{t('evidence.fieldSummary')}</h2>
          <p className="whitespace-pre-line text-base text-slate-700">{incident.summary}</p>
        </GlassCard>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <GlassCard>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ink">{t('evidence.timeline')}</h2>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-soft btn-sm" onClick={() => setEventOpen(true)}>
                <Plus size={18} aria-hidden="true" />
                {t('evidence.addEvent')}
              </button>
              <button type="button" className="btn-primary btn-sm" onClick={() => setShotOpen(true)}>
                <ImagePlus size={18} aria-hidden="true" />
                {t('evidence.addScreenshot')}
              </button>
            </div>
          </div>
          <Timeline events={incident.events} onDelete={(eid) => deleteEvent(incident.id, eid)} demo={incident.demo || incident.id?.startsWith('demo_')} />
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-xl font-bold text-ink">{t('evidence.actionPlan')}</h2>
          <GuidancePanel
            steps={guide.steps}
            evidence={guide.evidence}
            resources={guide.resources}
            checked={incident.checklist || {}}
            onToggle={(itemId) => toggleChecklist(incident.id, itemId)}
          />
        </GlassCard>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-soft"
          onClick={() => download(`narishield-incident-${incident.id}.txt`, buildIncidentSummary(incident, lang, fmt))}
        >
          <Download size={20} aria-hidden="true" />
          {t('evidence.downloadSummary')}
        </button>
        <button type="button" className="btn-danger" onClick={() => setConfirmDelete(true)}>
          <Trash2 size={20} aria-hidden="true" />
          {t('evidence.deleteIncident')}
        </button>
      </div>

      {/* Add event */}
      <Modal open={eventOpen} onClose={() => setEventOpen(false)} title={t('evidence.addEvent')}>
        <form onSubmit={submitEvent} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="ev-type">{t('evidence.eventType')}</label>
              <select id="ev-type" className="input" value={ev.type} onChange={(e) => setEv({ ...ev, type: e.target.value })}>
                {Object.entries(EVENT_TYPES).filter(([k]) => k !== 'screenshot').map(([k, v]) => (
                  <option key={k} value={k}>{tr(v.label)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="ev-date">{t('evidence.dateTime')}</label>
              <input id="ev-date" type="datetime-local" className="input" value={ev.date} onChange={(e) => setEv({ ...ev, date: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="ev-title">{t('evidence.fieldTitle')}</label>
            <input id="ev-title" className="input" value={ev.title} onChange={(e) => setEv({ ...ev, title: e.target.value })} required />
          </div>
          {ev.type === 'url' && (
            <div>
              <label className="label" htmlFor="ev-url"><Link2 size={14} className="mr-1 inline" aria-hidden="true" />{t('evidence.url')}</label>
              <input id="ev-url" className="input" value={ev.url} onChange={(e) => setEv({ ...ev, url: e.target.value })} placeholder="https://" />
            </div>
          )}
          <div>
            <label className="label" htmlFor="ev-detail">{t('evidence.notes')}</label>
            <textarea id="ev-detail" className="input min-h-[90px]" value={ev.detail} onChange={(e) => setEv({ ...ev, detail: e.target.value })} />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="btn-soft" onClick={() => setEventOpen(false)}>{t('common.cancel')}</button>
            <button type="submit" className="btn-primary">{t('common.save')}</button>
          </div>
        </form>
      </Modal>

      {/* Screenshot with Privacy Guardian */}
      <Modal open={shotOpen} onClose={() => setShotOpen(false)} title={t('evidence.addScreenshot')} wide>
        <PrivacyGuardian onSave={saveScreenshot} saveLabel={t('evidence.saveToTimeline')} />
      </Modal>

      {/* Complaint draft */}
      <Modal open={draftOpen} onClose={() => setDraftOpen(false)} title={t('evidence.complaintTitle')} wide>
        <div className="space-y-4">
          <p className="rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">{t('evidence.complaintNote')}</p>
          <a href={CYBERCRIME_PORTAL} target="_blank" rel="noopener noreferrer" className="btn-soft btn-sm w-fit">
            <ExternalLink size={18} aria-hidden="true" />
            {t('evidence.openCybercrime')}
          </a>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="cd-name">{t('evidence.yourName')}</label>
              <input id="cd-name" className="input" value={sender.name} onChange={(e) => setSender({ ...sender, name: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="cd-contact">{t('evidence.yourContact')}</label>
              <input id="cd-contact" className="input" value={sender.contact} onChange={(e) => setSender({ ...sender, contact: e.target.value })} />
            </div>
          </div>
          <button type="button" className="btn-soft btn-sm" onClick={regenerate}>{t('evidence.refreshDraft')}</button>
          <label className="label" htmlFor="cd-text">{t('evidence.draftText')}</label>
          <textarea id="cd-text" className="input min-h-[300px] font-mono text-sm" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn-primary" onClick={() => copy(draft)}>
              <Copy size={20} aria-hidden="true" />
              {t('common.copy')}
            </button>
            <button type="button" className="btn-soft" onClick={() => download(`narishield-complaint-${incident.id}.txt`, draft)}>
              <Download size={20} aria-hidden="true" />
              {t('common.download')}
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title={t('evidence.deleteIncident')}>
        <p className="mb-5 text-base">{t('evidence.deleteConfirm')}</p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" className="btn-soft" onClick={() => setConfirmDelete(false)}>{t('common.cancel')}</button>
          <button
            type="button"
            className="btn-primary !from-red-600 !to-red-700"
            onClick={() => {
              deleteIncident(incident.id);
              navigate('/evidence');
            }}
          >
            {t('common.delete')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
