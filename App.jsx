import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';
import Guide from './pages/Guide';
import Calm from './pages/Calm';
import Evidence from './pages/Evidence';
import IncidentDetail from './pages/IncidentDetail';
import Privacy from './pages/Privacy';
import Circle from './pages/Circle';
import Recovery from './pages/Recovery';
import Boundary from './pages/Boundary';
import Phrases from './pages/Phrases';
import Comparator from './pages/Comparator';
import Journal from './pages/Journal';

export default function App() {
  return (
    <Routes>
      {/* Calm First mode is full-screen, outside the normal layout */}
      <Route path="/calm" element={<Calm />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="guide" element={<Guide />} />
        <Route path="evidence" element={<Evidence />} />
        <Route path="evidence/:id" element={<IncidentDetail />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="circle" element={<Circle />} />
        <Route path="recovery" element={<Recovery />} />
        <Route path="boundary" element={<Boundary />} />
        <Route path="phrases" element={<Phrases />} />
        <Route path="comparator" element={<Comparator />} />
        <Route path="journal" element={<Journal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
