
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  HardHat, Layers, Quote, Info, Zap, Sun, Droplets, Magnet, 
  Infinity, Leaf, Flame, Terminal, Brain, FlaskConical as FlaskRound,
  Moon, Cpu, Radio, Globe, Disc, RefreshCw, Anchor, Target, Gauge, Aperture, 
  CheckCircle2, Shield, Hammer, ArrowLeft, User, LayoutGrid, Wand2, Compass,
  Activity, X, Menu, Sliders, Type, Beaker, Atom, Component, Sparkle
} from 'lucide-react';
import { LanguageContext } from '../index';
export { LanguageContext };
import { WoodLattice } from './components/WoodLattice';
import { EngineeringReport } from './components/EngineeringReport';
import { GenesisMasterShowcase } from './components/GenesisMasterShowcase';
import { GenesisTimeline } from './components/GenesisTimeline';
import { TechnicalPillars } from './components/TechnicalPillars';
import { ComponentConstructor } from './components/ComponentConstructor';
import { IntegrationFlow } from './components/IntegrationFlow';
import { DesignManifesto } from './components/DesignManifesto';
import { PhysicsInsights } from './components/PhysicsInsights';
import { NodalSpringStack } from './components/NodalSpringStack';
import { StateMorphStack } from './components/StateMorphStack';
import { ComponentHistoryDeconstructor } from './components/ComponentHistoryDeconstructor';
import { AnatomyView } from '../components/AnatomyView';
import { RefractionEngine } from '../components/RefractionEngine';
import { CausticFocus } from '../components/CausticFocus';
import { SubmergedRefraction } from '../components/SubmergedRefraction';
import { BuoyancyLab } from '../components/BuoyancyLab';
import { FluidDynamics } from '../components/FluidDynamics';
import { CapillaryFlowSync } from '../components/CapillaryFlowSync';
import { TidalWaveFlow } from '../components/TidalWaveFlow';
import { NodalAttractionLab } from './components/NodalAttractionLab';
import { GravitationalNexusHub } from '../components/GravitationalNexusHub';
import { WeightedPressureGrid } from '../components/WeightedPressureGrid';
import { QuantumEntanglementLink } from '../components/QuantumEntanglementLink';
import { QuantumFlux } from '../components/QuantumFlux';
import { QuantumSuperposition } from '../components/QuantumSuperposition';
import { BioMatterLattice } from '../components/BioMatterLattice';
import { BioMimeticMesh } from '../components/BioMimeticMesh';
import { MycelialLink } from '../components/MycelialLink';
import { RespiratoryLattice } from '../components/RespiratoryLattice';
import { ThermalExpansionCore } from '../components/ThermalExpansionCore';
import { ThermalTraceSurface } from '../components/ThermalTraceSurface';
import { SignalInterferenceBuffer } from '../components/SignalInterferenceBuffer';
import { KineticReactorDrive } from '../components/KineticReactorDrive';
import { TopologyOscilloscope } from '../components/TopologyOscilloscope';
import { StructuralLOD } from '../components/StructuralLOD';
import { NeuralDebugger } from '../components/NeuralDebugger';
import { SpectralAnalyzer } from '../components/SpectralAnalyzer';
import { NeuralCoreLab } from './components/NeuralCoreLab';
import { ExperimentalLabs } from './components/ExperimentalLabs';
import { LandingBuilder } from './components/LandingBuilder';
import { TypographyLab } from './components/TypographyLab';
import { AlchemyLab } from './components/AlchemyLab';
import { AtomicLab } from './components/AtomicLab';
import { PrimitivesLibrary } from './library/PrimitivesLibrary';
import { SectionStubGroup } from './components/SharedStubs';
import { UnitShowcase } from './library/UnitShowcase';

const playSound = (type: 'click' | 'hover') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'hover') {
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.05);
    } else {
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
    }
    osc.start();
    osc.stop(now + 0.1);
  } catch (e) {}
};

export type TabID = 'STATUS' | 'BUILDER' | 'GENESIS' | 'SHOWCASE_V2' | 'PRIMITIVES' | 'MANIFESTO' | 'INSIGHTS' | 'PHYSICS' | 'OPTICS' | 'WATER' | 'GRAVITY' | 'QUANTUM' | 'BIOLOGIC' | 'THERMAL' | 'SYSTEM' | 'NEURAL' | 'TYPOGRAPHY' | 'ALCHEMY' | 'ATOMS' | 'EXPERIMENTS';

export const GravityContext = createContext<{
  active: boolean;
  mass: number;
  size: number;
  mousePos: { x: number, y: number };
}>({
  active: true,
  mass: 0.5,
  size: 0.5,
  mousePos: { x: 0, y: 0 }
});

const Sidebar: React.FC<{
  activeTab: TabID;
  setActiveTab: (id: TabID) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  lang: string;
  setLang: (l: any) => void;
  t: any;
}> = ({ activeTab, setActiveTab, theme, setTheme, lang, setLang, t }) => {
  const tabs: { id: TabID, icon: any, label: string }[] = [
    { id: 'STATUS', icon: HardHat, label: 'Инженерный Отчет' },
    { id: 'BUILDER', icon: Hammer, label: 'AI Конструктор' },
    { id: 'GENESIS', icon: Layers, label: 'Генезис Материи' },
    { id: 'SHOWCASE_V2', icon: Sparkle, label: t.sidebar.unitShowcase },
    { id: 'PRIMITIVES', icon: Component, label: t.sidebar.library },
    { id: 'ATOMS', icon: Atom, label: t.sidebar.atoms },
    { id: 'ALCHEMY', icon: Beaker, label: t.sidebar.alchemy },
    { id: 'MANIFESTO', icon: Quote, label: 'Манифест Дизайна' },
    { id: 'INSIGHTS', icon: Info, label: 'Архитектурные Инсайты' },
    { id: 'PHYSICS', icon: Zap, label: 'Кинетическая Физика' },
    { id: 'TYPOGRAPHY', icon: Type, label: t.sidebar.typography },
    { id: 'OPTICS', icon: Sun, label: 'Оптика и Рефракция' },
    { id: 'WATER', icon: Droplets, label: 'Гидростатика' },
    { id: 'GRAVITY', icon: Magnet, label: 'Гравитационные Поля' },
    { id: 'QUANTUM', icon: Infinity, label: 'Квантовые Состояния' },
    { id: 'BIOLOGIC', icon: Leaf, label: 'Биомиметика' },
    { id: 'THERMAL', icon: Flame, label: 'Тепловой След' },
    { id: 'SYSTEM', icon: Terminal, label: 'Системный Анализ' },
    { id: 'NEURAL', icon: Brain, label: 'Нейронные Связи' },
    { id: 'EXPERIMENTS', icon: FlaskRound, label: 'Эксперименты' }
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-24 lg:w-80 bg-surface/80 backdrop-blur-3xl border-r border-black/5 dark:border-white/5 z-[200] flex flex-col transition-all duration-700">
       <div className="p-8 flex items-center gap-4 border-b border-black/5 dark:border-white/5 h-20">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
             <Activity className="w-5 h-5" />
          </div>
          <span className="hidden lg:block font-tech text-2xl font-bold tracking-tighter uppercase truncate text-text-main">Showcase_Hub</span>
       </div>

       <div className="flex-1 py-12 px-6 space-y-2 overflow-y-auto custom-scroll no-scrollbar">
          <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-6 px-4">Research_Sectors</div>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onMouseEnter={() => playSound('hover')}
              onClick={() => { setActiveTab(tab.id); playSound('click'); }}
              className={`w-full flex items-center gap-6 p-4 rounded-3xl transition-all duration-500 group
                ${activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20' 
                  : 'text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main'}
              `}
            >
               <tab.icon className={`w-6 h-6 shrink-0 transition-transform ${activeTab === tab.id ? 'rotate-12 scale-110' : 'group-hover:scale-110'}`} />
               <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest truncate">{tab.label}</span>
            </button>
          ))}
       </div>

       <div className="p-6 border-t border-black/5 dark:border-white/5 space-y-6">
          <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
             <button 
               onClick={() => setTheme('light')}
               className={`flex-1 py-3 rounded-xl flex items-center justify-center transition-all ${theme === 'light' ? 'bg-white text-zinc-950 shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
             >
                <Sun className="w-4 h-4" />
             </button>
             <button 
               onClick={() => setTheme('dark')}
               className={`flex-1 py-3 rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-100'}`}
             >
                <Moon className="w-4 h-4" />
             </button>
          </div>

          <button 
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="w-full flex items-center gap-6 p-4 rounded-3xl text-zinc-500 hover:bg-indigo-600/10 hover:text-indigo-600 transition-all group"
          >
             <div className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold">{lang}</div>
             <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Switch_Lang</span>
          </button>
       </div>
    </div>
  );
};

const WoodenRecordApp: React.FC = () => {
  const { lang, t, setLang, theme, setTheme } = useContext(LanguageContext);
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<TabID>('STATUS');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <GravityContext.Provider value={{ active: true, mass: 0.5, size: 0.5, mousePos }}>
      <div className={`min-h-screen ${isDark ? 'bg-[#030305] text-white' : 'bg-[#fdfdfe] text-black'} transition-colors duration-700 font-sans overflow-hidden flex relative`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme} 
          setTheme={setTheme} 
          lang={lang} 
          setLang={setLang} 
          t={t} 
        />
        <WoodLattice mousePos={mousePos} theme={theme} />
        
        <div className="flex-1 flex flex-col ml-24 lg:ml-80 transition-all duration-700 overflow-hidden">
           <header className="h-20 border-b border-black/5 dark:border-white/5 backdrop-blur-xl flex items-center justify-between px-12 z-[120]">
              <div className="flex items-center gap-6">
                 <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">Cluster_State: </span>
                 <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Observatory_Online</span>
                 </div>
              </div>

              <div className="flex items-center gap-6">
                 <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.4em]">Sector: {activeTab}</div>
              </div>
           </header>

           <main className="flex-1 relative overflow-y-auto no-scrollbar scroll-smooth p-8 lg:p-24">
              <div className="max-w-[1400px] mx-auto">
                 {activeTab === 'STATUS' && <EngineeringReport theme={theme} onNavigate={setActiveTab} />}
                 {activeTab === 'BUILDER' && <LandingBuilder theme={theme} />}
                 
                 {activeTab === 'GENESIS' && (
                    <div className="space-y-40">
                       <GenesisMasterShowcase theme={theme} />
                       <GenesisTimeline theme={theme} />
                       <TechnicalPillars theme={theme} />
                       <ComponentConstructor theme={theme} />
                       <IntegrationFlow theme={theme} />
                    </div>
                 )}

                 {activeTab === 'SHOWCASE_V2' && <UnitShowcase theme={theme} />}
                 {activeTab === 'PRIMITIVES' && <PrimitivesLibrary theme={theme} />}
                 {activeTab === 'ATOMS' && <AtomicLab theme={theme} />}
                 {activeTab === 'ALCHEMY' && <AlchemyLab theme={theme} />}
                 {activeTab === 'MANIFESTO' && <DesignManifesto theme={theme} />}
                 {activeTab === 'INSIGHTS' && <PhysicsInsights theme={theme} />}

                 {activeTab === 'PHYSICS' && (
                    <div className="space-y-40">
                       <NodalSpringStack theme={theme} />
                       <StateMorphStack theme={theme} />
                       <ComponentHistoryDeconstructor theme={theme} />
                    </div>
                 )}

                 {activeTab === 'TYPOGRAPHY' && <TypographyLab theme={theme} />}

                 {activeTab === 'OPTICS' && (
                    <div className="space-y-40">
                       <AnatomyView />
                       <RefractionEngine />
                       <CausticFocus />
                       <SectionStubGroup category="Optics" count={4} />
                    </div>
                 )}

                 {activeTab === 'WATER' && (
                    <div className="space-y-40">
                       <SubmergedRefraction />
                       <BuoyancyLab />
                       <FluidDynamics />
                       <CapillaryFlowSync />
                       <TidalWaveFlow />
                       <SectionStubGroup category="Hydrostatics" count={2} />
                    </div>
                 )}

                 {activeTab === 'GRAVITY' && (
                    <div className="space-y-40">
                       <NodalAttractionLab theme={theme} />
                       <GravitationalNexusHub />
                       <WeightedPressureGrid />
                       <SectionStubGroup category="Gravity" count={3} />
                    </div>
                 )}

                 {activeTab === 'QUANTUM' && (
                    <div className="space-y-40">
                       <QuantumEntanglementLink />
                       <QuantumFlux />
                       <QuantumSuperposition />
                       <SectionStubGroup category="Quantum" count={4} />
                    </div>
                 )}

                 {activeTab === 'BIOLOGIC' && (
                    <div className="space-y-40">
                       <BioMatterLattice />
                       <BioMimeticMesh />
                       <MycelialLink />
                       <RespiratoryLattice />
                       <SectionStubGroup category="Biomimetics" count={2} />
                    </div>
                 )}

                 {activeTab === 'THERMAL' && (
                    <div className="space-y-40">
                       <ThermalExpansionCore />
                       <ThermalTraceSurface />
                       <SectionStubGroup category="Thermodynamics" count={4} />
                    </div>
                 )}

                 {activeTab === 'SYSTEM' && (
                    <div className="space-y-40">
                       <SignalInterferenceBuffer />
                       <KineticReactorDrive />
                       <TopologyOscilloscope />
                       <StructuralLOD />
                       <NeuralDebugger />
                       <SectionStubGroup category="Systems" count={3} />
                    </div>
                 )}

                 {activeTab === 'NEURAL' && (
                    <div className="space-y-40">
                       <SpectralAnalyzer />
                       <NeuralCoreLab theme={theme} />
                       <SectionStubGroup category="Neural" count={6} />
                    </div>
                 )}

                 {activeTab === 'EXPERIMENTS' && <ExperimentalLabs theme={theme} />}
              </div>
           </main>
        </div>
      </div>
    </GravityContext.Provider>
  );
};

export default WoodenRecordApp;
