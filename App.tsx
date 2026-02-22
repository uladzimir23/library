
import React, { useState, useEffect, createContext, useRef } from 'react';
import { Sun, Moon, Activity, Zap, Shield, Brain, FlaskConical, Orbit, Cloud, Infinity, ThermometerSnowflake, ShieldAlert, ThermometerSun, Radio, Target, Move, Sliders, RefreshCw, Layers, ZapOff, Wind, Eye, Aperture, Box, Globe, Camera, Monitor, Cpu, Waves, Crosshair, Terminal, Layout, Maximize, BoxSelect, HardDrive, Disc, Hammer, Music, Flame, Share2, Link, Scissors, Magnet, Droplets, Anchor, Atom, Boxes } from 'lucide-react';
import { InteractiveBackgroundGrid } from './components/InteractiveBackgroundGrid';
import { NeuralCohesionLattice } from './components/NeuralCohesionLattice';
import { VolumetricMatterKiln } from './components/VolumetricMatterKiln';
import { KineticSignalMainframe } from './components/KineticSignalMainframe';
import { IntegratedControlTerminal } from './components/IntegratedControlTerminal';
import { MechanicalBladeSwitcher } from './components/MechanicalBladeSwitcher';
import { PressureVaultModal } from './components/PressureVaultModal';
import { translations } from './translations';


type Language = 'en' | 'ru';
type TranslationType = typeof translations['en'];

export const LanguageContext = createContext<{
  lang: Language;
  t: TranslationType;
  setLang: (l: Language) => void;
  isDiagnostic: boolean;
}>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
  isDiagnostic: false
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<Language>('ru');
  const [isDiagnostic, setIsDiagnostic] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const t = translations[lang] as TranslationType;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, isDiagnostic }}>
      <div 
        ref={containerRef}
        onMouseMove={handleGlobalMouseMove}
        className="min-h-screen relative selection:bg-emerald-500/30 overflow-x-hidden cursor-none bg-[#050507]"
      >
        <InteractiveBackgroundGrid />
        
        {/* PRECISION CURSOR */}
        <div 
          className="fixed pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-out"
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-emerald-500/50 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[1px] bg-emerald-500/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-[1px] bg-emerald-500/30" />
          </div>
        </div>

        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-7xl z-[100]">
          <div className="bg-white/40 dark:bg-black/80 backdrop-blur-3xl border border-black/5 dark:border-white/10 px-8 py-3.5 rounded-[32px] flex items-center justify-between shadow-2xl transition-all duration-500 hover:border-emerald-500/30">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Hammer className="text-emerald-500 w-5 h-5" />
              </div>
              <span className="font-tech text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase">
                Matter<span className="text-emerald-500">Forge</span>
              </span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              <a href="#cohesion-lattice" className="hover:text-emerald-400 transition-colors">Lattice</a>
              <a href="#matter-kiln" className="hover:text-amber-400 transition-colors">Kiln</a>
              <a href="#mainframe" className="hover:text-indigo-400 transition-colors">Mainframe</a>
              <a href="#terminal" className="hover:text-zinc-300 transition-colors">Utility</a>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDiagnostic(!isDiagnostic)}
                className={`w-10 h-10 rounded-2xl border transition-all flex items-center justify-center ${isDiagnostic ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-black/5 dark:bg-white/5 border-white/10 text-zinc-500'}`}
              >
                <Activity className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-500 text-[10px] font-bold uppercase transition-all hover:bg-emerald-500 hover:text-white"
              >
                {lang}
              </button>
              <button 
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-500 transition-all hover:text-emerald-500"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 max-w-7xl relative z-10 space-y-40 py-40">
          
          <section id="cohesion-lattice">
             <NeuralCohesionLattice />
          </section>

          <section id="matter-kiln">
             <VolumetricMatterKiln />
          </section>

          <section id="mainframe">
             <KineticSignalMainframe />
          </section>

          <section id="blade-switcher">
             <MechanicalBladeSwitcher />
          </section>

          <section id="pressure-vault">
             <PressureVaultModal />
          </section>

          <section id="terminal">
             <IntegratedControlTerminal />
          </section>

        </main>

        <footer className="border-t border-white/5 py-24 bg-black/80 backdrop-blur-3xl">
          <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-4 font-tech font-bold text-4xl text-white uppercase tracking-tighter">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 flex items-center justify-center shadow-xl">
                   <Hammer className="text-emerald-500 w-7 h-7" />
                </div>
                MatterForge
              </div>
              <p className="text-zinc-500 max-w-xs text-sm font-light uppercase tracking-widest italic">World Class Spatial Design Studio v24.0</p>
            </div>
            <div className="flex gap-12">
               <div className="space-y-4">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Protocol</div>
                  <div className="text-sm text-zinc-600">FLEX_GLASS_V2</div>
               </div>
               <div className="space-y-4">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</div>
                  <div className="text-sm text-emerald-500 font-bold">STABLE_COHESION</div>
               </div>
            </div>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
