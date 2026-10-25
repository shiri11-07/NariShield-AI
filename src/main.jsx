import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LanguageProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </LanguageProvider>
    </HashRouter>
  </React.StrictMode>,
);
