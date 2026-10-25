import { useEffect, useState } from 'react';
import { CATEGORIES, PLATFORMS, SEVERITY, SEVERITY_ORDER } from '../data/categories';
import { useLang } from '../context/LanguageContext';
import Modal from './Modal';

const EMPTY = { title: '', category: 'harassment', severity: 'medium', platform: 'Instagram', summary: '' };

export default function IncidentForm({ open, onClose, onSubmit, initial }) {
  const { t, tr } = useLang();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm({ ...EMPTY, ...(initial || {}) });
  }, [open, initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form, title: form.title.trim(), summary: form.summary.trim() });
  };

  return (
    <Modal open={open} onClose={onClose} title={t('evidence.newIncident')}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label" htmlFor="inc-title">
            {t('evidence.fieldTitle')}
          </label>
          <input
            id="inc-title"
            className="input"
            value={form.title}
            onChange={set('title')}
            placeholder={t('evidence.titlePlaceholder')}
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="inc-cat">
              {t('evidence.fieldCategory')}
            </label>
            <select id="inc-cat" className="input" value={form.category} onChange={set('category')}>
              {Object.entries(CATEGORIES).map(([id, c]) => (
                <option key={id} value={id}>
                  {tr(c.label)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="inc-sev">
              {t('common.severity')}
            </label>
            <select id="inc-sev" className="input" value={form.severity} onChange={set('severity')}>
              {SEVERITY_ORDER.map((id) => (
                <option key={id} value={id}>
                  {tr(SEVERITY[id].label)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="inc-platform">
            {t('evidence.fieldPlatform')}
          </label>
          <select id="inc-platform" className="input" value={form.platform} onChange={set('platform')}>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="inc-summary">
            {t('evidence.fieldSummary')}
          </label>
          <textarea
            id="inc-summary"
            className="input min-h-[110px]"
            value={form.summary}
            onChange={set('summary')}
            placeholder={t('evidence.summaryPlaceholder')}
          />
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" className="btn-soft" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="submit" className="btn-primary">
            {t('evidence.createIncident')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
