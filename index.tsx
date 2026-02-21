
import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import WoodenRecordApp from './wooden/App';
import BuilderApp from './builder/App';
import SandboxApp from './sandbox/App';
import { Hammer, Layers, Atom } from 'lucide-react';
import { translations } from './translations';

type Language = 'en' | 'ru';
type Theme = 'dark' | 'light';
type TranslationType = typeof translations['en'];

export const LanguageContext = createContext<{
  lang: Language;
  t: TranslationType;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDiagnostic: boolean;
  setIsDiagnostic: (v: boolean) => void;
}>({
  lang: 'ru',
  t: translations.ru,
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  isDiagnostic: true,
  setIsDiagnostic: () => {},
});

const RootComponent: React.FC = () => {
  const [view, setView] = useState<'SHOWCASE' | 'BUILDER' | 'SANDBOX'>('SHOWCASE');
  const [lang, setLang] = useState<Language>('ru');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isDiagnostic, setIsDiagnostic] = useState(true);

  const t = translations[lang] as TranslationType;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#builder') setView('BUILDER');
      else if (hash === '#sandbox') setView('SANDBOX');
      else setView('SHOWCASE');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, theme, setTheme, isDiagnostic, setIsDiagnostic }}>
      {view === 'SHOWCASE' ? <WoodenRecordApp /> : view === 'BUILDER' ? <BuilderApp /> : <SandboxApp />}
      
      {/* Глобальный переключатель (Floating Action HUD) */}
      <div className="fixed bottom-10 right-10 z-[9999] flex flex-col gap-4">
         <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 flex flex-col gap-2 shadow-2xl">
            <button 
              onClick={() => window.location.hash = ''}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${view === 'SHOWCASE' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:bg-white/5'}`}
            >
               <Layers className="w-6 h-6" />
            </button>
            <button 
              onClick={() => window.location.hash = '#builder'}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${view === 'BUILDER' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-zinc-500 hover:bg-white/5'}`}
            >
               <Hammer className="w-6 h-6" />
            </button>
            <button 
              onClick={() => window.location.hash = '#sandbox'}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${view === 'SANDBOX' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/20' : 'text-zinc-500 hover:bg-white/5'}`}
            >
               <Atom className="w-6 h-6" />
            </button>
         </div>
      </div>
    </LanguageContext.Provider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode><RootComponent /></React.StrictMode>);
