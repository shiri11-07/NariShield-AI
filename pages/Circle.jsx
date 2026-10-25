import { useState } from 'react';
import { Mail, MessageSquare, Pencil, Phone, Plus, Send, Trash2, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { METHODS, ROLES } from '../data/demoCircle';

const EMPTY = { name: '', relationship: '', method: 'call', role: 'responder', note: '' };

export default function Circle() {
  const { circle, saveContact, deleteContact, notify } = useApp();
  const { t, tr } = useLang();
  const [form, setForm] = useState(null);
  const [alertFor, setAlertFor] = useState(null);
  const [broadcast, setBroadcast] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    saveContact({ ...form, name: form.name.trim(), relationship: form.relationship.trim(), note: form.note.trim() });
    setForm(null);
    notify(t('circle.saved'));
  };

  const methodIcon = (m) => (m === 'call' ? Phone : m === 'email' ? Mail : MessageSquare);
  const isDemoContact = (contact) => contact.demo || ['c_rhea', 'c_kavya', 'c_prakash'].includes(contact.id);

  return (
    <div>
      <PageHeader
        icon={Users}
        title={t('circle.title')}
        subtitle={t('circle.subtitle')}
        actions={
          <>
            {circle.length > 0 && (
              <button type="button" className="btn-pink" onClick={() => setBroadcast(true)}>
                <Send size={20} aria-hidden="true" />
                {t('circle.alertAll')}
              </button>
            )}
            <button type="button" className="btn-primary" onClick={() => setForm({ ...EMPTY })}>
              <Plus size={20} aria-hidden="true" />
              {t('circle.add')}
            </button>
          </>
        }
      />

      <GlassCard className="mb-5">
        <p className="text-base text-slate-700">{t('circle.principle')}</p>
        <p className="mt-2 text-sm font-semibold text-amber-800">{t('circle.demoOnly')}</p>
      </GlassCard>

      {circle.length === 0 ? (
        <GlassCard className="text-center">
          <p className="mb-4 text-lg">{t('circle.empty')}</p>
          <button type="button" className="btn-primary" onClick={() => setForm({ ...EMPTY })}>{t('circle.add')}</button>
        </GlassCard>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {circle.map((c) => {
            const MIcon = methodIcon(c.method);
            return (
              <li key={c.id} className="glass p-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-blush-400 text-2xl font-bold text-white" aria-hidden="true">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-ink">{c.name}</h2>
                    <p className="text-sm text-slate-600">{c.relationship}{isDemoContact(c) ? ` · ${t('common.demoData')}` : ''}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="chip border-brand-200 bg-brand-50 text-brand-800">
                        <MIcon size={14} aria-hidden="true" />
                        {tr(METHODS[c.method]?.label)}
                      </span>
                      <span className="chip border-blush-200 bg-blush-50 text-blush-500">{tr(ROLES[c.role]?.label)}</span>
                    </div>
                  </div>
                </div>
                {c.note && (
                  <p className="mt-3 rounded-xl bg-white/80 p-3 text-sm text-slate-700">
                    <b>{t('circle.noteLabel')}:</b> {c.note}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn-primary btn-sm" onClick={() => setAlertFor(c)}>
                    <Send size={16} aria-hidden="true" />
                    {t('circle.requestHelp')}
                  </button>
                  <button type="button" className="btn-soft btn-sm" onClick={() => setForm({ ...c })}>
                    <Pencil size={16} aria-hidden="true" />
                    {t('common.edit')}
                  </button>
                  <button
                    type="button"
                    className="btn-danger btn-sm"
                    onClick={() => {
                      deleteContact(c.id);
                      notify(t('circle.removed'), 'info');
                    }}
                    aria-label={`${t('common.delete')} ${c.name}`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? t('circle.edit') : t('circle.add')}>
        {form && (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label" htmlFor="c-name">{t('circle.name')}</label>
              <input id="c-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="label" htmlFor="c-rel">{t('circle.relationship')}</label>
              <input id="c-rel" className="input" value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} placeholder={t('circle.relPlaceholder')} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="c-method">{t('circle.method')}</label>
                <select id="c-method" className="input" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
                  {Object.entries(METHODS).map(([k, v]) => <option key={k} value={k}>{tr(v.label)}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="c-role">{t('circle.role')}</label>
                <select id="c-role" className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  {Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{tr(v.label)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="c-note">{t('circle.note')}</label>
              <textarea id="c-note" className="input min-h-[90px]" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder={t('circle.notePlaceholder')} />
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" className="btn-soft" onClick={() => setForm(null)}>{t('common.cancel')}</button>
              <button type="submit" className="btn-primary">{t('common.save')}</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={!!alertFor || broadcast} onClose={() => { setAlertFor(null); setBroadcast(false); }} title={t('circle.demoTitle')}>
        <div className="space-y-4">
          <p className="rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">{t('calm.demoBanner')}</p>
          <p className="text-base">
            {broadcast ? t('circle.demoAll', { n: circle.length }) : t('calm.demoMessage', { name: alertFor?.name || '' })}
          </p>
          <blockquote className="rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-4">{t('circle.demoText')}</blockquote>
          <button type="button" className="btn-primary w-full" onClick={() => { setAlertFor(null); setBroadcast(false); }}>
            {t('calm.demoDone')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
