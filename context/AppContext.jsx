import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { buildDemoIncidents } from '../data/demoIncidents';
import { buildDemoCircle } from '../data/demoCircle';
import { buildDemoJournal } from '../data/demoJournal';
import { uid } from '../utils/ids';

const AppContext = createContext(null);

const STORAGE_KEYS = [
  'ns_incidents',
  'ns_circle',
  'ns_journal',
  'ns_recovery',
  'ns_codes',
  'ns_settings',
];

export function AppProvider({ children }) {
  // All state below lives in this browser's localStorage only.
  const [incidents, setIncidents] = useLocalStorage('ns_incidents', buildDemoIncidents);
  const [circle, setCircle] = useLocalStorage('ns_circle', buildDemoCircle);
  const [journal, setJournal] = useLocalStorage('ns_journal', buildDemoJournal);
  const [recoveryDone, setRecoveryDone] = useLocalStorage('ns_recovery', {
    r_evidence: true,
    r_talk: true,
    s_privacy: true,
  });
  const [codes, setCodes] = useLocalStorage('ns_codes', []);
  const [settings, setSettings] = useLocalStorage('ns_settings', { highContrast: false, largeText: false });
  const [toasts, setToasts] = useState([]);

  // ----- accessibility modes -----
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('hc', !!settings.highContrast);
    root.classList.toggle('lt', !!settings.largeText);
  }, [settings]);

  const toggleSetting = useCallback(
    (key) => setSettings((s) => ({ ...s, [key]: !s[key] })),
    [setSettings],
  );

  // ----- toasts -----
  const dismissToast = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);
  const notify = useCallback(
    (message, tone = 'success') => {
      const id = uid('toast');
      setToasts((list) => [...list.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast],
  );

  // ----- incidents -----
  const addIncident = useCallback(
    (data) => {
      const id = uid('inc');
      const incident = {
        id,
        title: data.title || 'Untitled incident',
        category: data.category || 'other',
        severity: data.severity || 'medium',
        platform: data.platform || 'Other',
        status: data.status || 'open',
        createdAt: data.createdAt || new Date().toISOString(),
        summary: data.summary || '',
        checklist: data.checklist || {},
        events: data.events || [],
      };
      setIncidents((list) => [incident, ...list]);
      return id;
    },
    [setIncidents],
  );

  const updateIncident = useCallback(
    (id, patch) => setIncidents((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i))),
    [setIncidents],
  );

  const deleteIncident = useCallback(
    (id) => setIncidents((list) => list.filter((i) => i.id !== id)),
    [setIncidents],
  );

  const toggleChecklist = useCallback(
    (id, itemId) =>
      setIncidents((list) =>
        list.map((i) =>
          i.id === id ? { ...i, checklist: { ...i.checklist, [itemId]: !i.checklist?.[itemId] } } : i,
        ),
      ),
    [setIncidents],
  );

  const addEvent = useCallback(
    (incidentId, event) =>
      setIncidents((list) =>
        list.map((i) =>
          i.id === incidentId
            ? { ...i, events: [...(i.events || []), { id: uid('ev'), ...event }] }
            : i,
        ),
      ),
    [setIncidents],
  );

  const deleteEvent = useCallback(
    (incidentId, eventId) =>
      setIncidents((list) =>
        list.map((i) =>
          i.id === incidentId ? { ...i, events: i.events.filter((e) => e.id !== eventId) } : i,
        ),
      ),
    [setIncidents],
  );

  // ----- trusted circle -----
  const saveContact = useCallback(
    (contact) => {
      setCircle((list) => {
        if (contact.id && list.some((c) => c.id === contact.id)) {
          return list.map((c) => (c.id === contact.id ? { ...c, ...contact } : c));
        }
        return [...list, { ...contact, id: uid('c') }];
      });
    },
    [setCircle],
  );
  const deleteContact = useCallback(
    (id) => setCircle((list) => list.filter((c) => c.id !== id)),
    [setCircle],
  );

  // ----- journal -----
  const addJournalEntry = useCallback(
    (entry) =>
      setJournal((list) => [
        { id: uid('j'), date: new Date().toISOString(), ...entry },
        ...list,
      ]),
    [setJournal],
  );
  const deleteJournalEntry = useCallback(
    (id) => setJournal((list) => list.filter((j) => j.id !== id)),
    [setJournal],
  );

  // ----- recovery -----
  const toggleRecovery = useCallback(
    (id) => setRecoveryDone((r) => ({ ...r, [id]: !r[id] })),
    [setRecoveryDone],
  );

  // ----- safety code book -----
  const addCode = useCallback(
    (code) => setCodes((list) => [{ id: uid('code'), ...code }, ...list]),
    [setCodes],
  );
  const deleteCode = useCallback((id) => setCodes((list) => list.filter((c) => c.id !== id)), [setCodes]);

  // ----- data control -----
  const resetDemo = useCallback(() => {
    const isDemoEntry = (item) => !!item?.demo || (typeof item?.id === 'string' && item.id.startsWith('demo_'));
    const isDemoContact = (item) => !!item?.demo || (typeof item?.id === 'string' && ['c_rhea', 'c_kavya', 'c_prakash'].includes(item.id));
    const isDemoJournal = (item) => !!item?.demo || (typeof item?.id === 'string' && ['j1', 'j2', 'j3'].includes(item.id));

    setIncidents((list) => [...buildDemoIncidents(), ...list.filter((item) => !isDemoEntry(item))]);
    setCircle((list) => [...buildDemoCircle(), ...list.filter((item) => !isDemoContact(item))]);
    setJournal((list) => [...buildDemoJournal(), ...list.filter((item) => !isDemoJournal(item))]);
    // User-created incidents, contacts, phrase books, and recovery progress remain untouched.
  }, [setIncidents, setCircle, setJournal]);

  const wipeAll = useCallback(() => {
    setIncidents([]);
    setCircle([]);
    setJournal([]);
    setRecoveryDone({});
    setCodes([]);
  }, [setIncidents, setCircle, setJournal, setRecoveryDone, setCodes]);

  const value = useMemo(
    () => ({
      incidents,
      addIncident,
      updateIncident,
      deleteIncident,
      toggleChecklist,
      addEvent,
      deleteEvent,
      circle,
      saveContact,
      deleteContact,
      journal,
      addJournalEntry,
      deleteJournalEntry,
      recoveryDone,
      toggleRecovery,
      codes,
      addCode,
      deleteCode,
      settings,
      toggleSetting,
      toasts,
      notify,
      dismissToast,
      resetDemo,
      wipeAll,
      storageKeys: STORAGE_KEYS,
    }),
    [
      incidents,
      addIncident,
      updateIncident,
      deleteIncident,
      toggleChecklist,
      addEvent,
      deleteEvent,
      circle,
      saveContact,
      deleteContact,
      journal,
      addJournalEntry,
      deleteJournalEntry,
      recoveryDone,
      toggleRecovery,
      codes,
      addCode,
      deleteCode,
      settings,
      toggleSetting,
      toasts,
      notify,
      dismissToast,
      resetDemo,
      wipeAll,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
