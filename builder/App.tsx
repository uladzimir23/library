
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { 
  Zap, Hammer, Globe, Sliders, ChevronRight, CheckCircle2, 
  Cpu, Monitor, Smartphone, Trash2, Palette, Tablet, 
  Settings2, Layout, Sparkles, Box, Upload, 
  Mail, Share2, Wand2, Briefcase, Rocket, Microscope, 
  ChevronDown, Save, Maximize, LayoutGrid, Plus, Minus, 
  Activity, Server, Radar, Loader2, RefreshCw, Star, HelpCircle, CreditCard,
  Layers, Database, Terminal, Shield, ArrowLeft, History, FileCode, Gauge,
  ListChecks, MailQuestion, LayoutTemplate, Sun, Moon
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { LanguageContext } from '../index';

const playSound = (type: 'click' | 'success' | 'process' | 'delete') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'click') {
      osc.frequency.setValueAtTime(200, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
    } else if (type === 'delete') {
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
    } else if (type === 'process') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.5);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
    } else {
      osc.frequency.setValueAtTime(880, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
    }
    osc.start();
    osc.stop(now + 0.5);
  } catch (e) {}
};

type PageID = 'DASHBOARD' | 'CREATE' | 'ASSETS' | 'API' | 'SETTINGS';
type AppPhase = 'INTAKE' | 'CALIBRATION' | 'SYNTHESIS' | 'PREVIEW' | 'DEPLOY';
type ProjectStyle = 'BUSINESS' | 'TECH' | 'PROMO' | 'MINIMAL';
type DeviceType = 'mobile' | 'tablet' | 'desktop';
type ViewMode = 'SINGLE' | 'CANVAS';
type FontStyle = 'sans' | 'serif' | 'mono';

interface SiteSection {
  id: string;
  type: 'hero' | 'about' | 'expertise' | 'portfolio' | 'pricing' | 'testimonials' | 'faq' | 'contact' | 'team' | 'clients' | 'stats' | 'feature_grid' | 'process_steps' | 'newsletter';
  data: any;
  isVisible: boolean;
}

interface GeneratedSite {
  id: string;
  brandName: string;
  accentColor: string;
  fontStyle: FontStyle;
  projectStyle: ProjectStyle;
  physics: { blur: number; opacity: number; radius: number; mass: number };
  sections: SiteSection[];
  createdAt: string;
}

export const BuilderApp: React.FC = () => {
  const { lang, t, setLang, theme, setTheme } = useContext(LanguageContext);
  const [currentPage, setCurrentPage] = useState<PageID>('DASHBOARD');
  const [phase, setPhase] = useState<AppPhase>('INTAKE');
  const [viewMode, setViewMode] = useState<ViewMode>('CANVAS');
  const [zoom, setZoom] = useState(0.45);
  const [prompt, setPrompt] = useState('');
  const [fileContext, setFileContext] = useState('');
  const [siteData, setSiteData] = useState<GeneratedSite | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [isRegeneratingSection, setIsRegeneratingSection] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nodesSync, setNodesSync] = useState(0);

  const [mySites] = useState<GeneratedSite[]>([
    {
      id: '1',
      brandName: 'CyberLoom Agency',
      accentColor: '#6366f1',
      fontStyle: 'sans',
      projectStyle: 'TECH',
      physics: { blur: 24, opacity: 0.1, radius: 48, mass: 1 },
      sections: [],
      createdAt: '12 May 2025'
    },
    {
      id: '2',
      brandName: 'EcoSpatial Port',
      accentColor: '#10b981',
      fontStyle: 'serif',
      projectStyle: 'MINIMAL',
      physics: { blur: 40, opacity: 0.05, radius: 80, mass: 0.5 },
      sections: [],
      createdAt: '08 May 2025'
    }
  ]);

  const [manualConfig, setManualConfig] = useState({
    blur: 24,
    opacity: 0.1,
    radius: 48,
    mass: 1.0,
    accent: '#6366f1',
    font: 'sans' as FontStyle,
    style: 'BUSINESS' as ProjectStyle
  });

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  const updateSectionData = useCallback((sectionId: string, key: string, value: any) => {
    setSiteData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        sections: prev.sections.map(s => 
          s.id === sectionId ? { ...s, data: { ...s.data, [key]: value } } : s
        )
      };
    });
  }, []);

  const startSynthesis = async () => {
    setPhase('SYNTHESIS');
    playSound('process');
    addLog(`Matter_Forge: Initiating Synthesis in ${lang.toUpperCase()}...`);
    
    const steps = [
      t.builder.loading.log1,
      t.builder.loading.log2,
      t.builder.loading.log3,
      t.builder.loading.log4
    ];
    let stepIdx = 0;
    const interval = setInterval(() => {
      setLoadingText(steps[stepIdx % steps.length]);
      stepIdx++;
    }, 1000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a high-fidelity landing page structure for: "${prompt}". 
        LANGUAGE: ${lang === 'ru' ? 'Russian' : 'English'}.
        Layout: Spatial Quoll Architecture.
        Return JSON with:
        {
          "brandName": "String",
          "sections": [
            {"type": "hero", "data": {"headline": "...", "subtext": "...", "cta": "..."}},
            {"type": "feature_grid", "data": {"features": [{"title": "...", "desc": "..."}]}},
            {"type": "process_steps", "data": {"steps": [{"title": "...", "desc": "..."}]}},
            {"type": "stats", "data": {"items": [{"label": "...", "value": "..."}]}},
            {"type": "team", "data": {"members": [{"name": "...", "role": "..."}]}},
            {"type": "pricing", "data": {"plans": [{"name": "...", "price": "...", "features": ["..."]}]}},
            {"type": "newsletter", "data": {"title": "...", "sub": "..."}},
            {"type": "faq", "data": {"items": [{"q": "...", "a": "..."}]}},
            {"type": "contact", "data": {"email": "...", "location": "..."}}
          ]
        }`,
        config: { responseMimeType: "application/json" }
      });

      const aiData = JSON.parse(response.text || "{}");
      
      const newSite: GeneratedSite = {
        id: Math.random().toString(36).substr(2, 9),
        brandName: aiData.brandName || "MATTER_PROJECT",
        accentColor: manualConfig.accent,
        fontStyle: manualConfig.font,
        projectStyle: manualConfig.style,
        physics: { ...manualConfig },
        sections: (aiData.sections || []).map((s: any) => ({
          ...s,
          id: Math.random().toString(36).substr(2, 9),
          isVisible: true,
          data: s.data || {}
        })),
        createdAt: new Date().toLocaleDateString()
      };

      clearInterval(interval);
      setSiteData(newSite);
      setPhase('PREVIEW');
      playSound('success');
    } catch (e) {
      clearInterval(interval);
      addLog("ERROR: Synthesis aborted.");
      setTimeout(() => setPhase('INTAKE'), 2000);
    }
  };

  const regenerateSection = async (sectionId: string) => {
    if (!siteData || isRegeneratingSection) return;
    const section = siteData.sections.find(s => s.id === sectionId);
    if (!section) return;

    setIsRegeneratingSection(sectionId);
    playSound('process');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Regenerate copy for ${section.type} section in ${lang === 'ru' ? 'Russian' : 'English'}. Context: ${prompt}. Return ONLY JSON.`,
        config: { responseMimeType: "application/json" }
      });

      const newData = JSON.parse(response.text || "{}");
      setSiteData(prev => prev ? {
        ...prev,
        sections: prev.sections.map(s => s.id === sectionId ? { ...s, data: newData } : s)
      } : null);
      playSound('success');
    } catch (e) {
      addLog("Error: Refinement failed.");
    } finally {
      setIsRegeneratingSection(null);
    }
  };

  const renderSection = (section: SiteSection) => {
    if (!section.isVisible) return null;
    const isHovered = hoveredSectionId === section.id;
    const p = siteData?.physics || manualConfig;
    const accent = siteData?.accentColor || manualConfig.accent;
    const data = section.data || {};
    const isReg = isRegeneratingSection === section.id;

    const GlassCard = ({ children, className = "" }: any) => (
      <div 
        className={`transition-all duration-700 ${isReg ? 'opacity-30 blur-xl scale-95' : ''} ${className}`}
        style={{ 
          borderRadius: p.radius, 
          backdropFilter: `blur(${p.blur}px)`,
          backgroundColor: `rgba(148, 163, 184, ${p.opacity})`,
          border: '1px solid rgba(125, 125, 125, 0.1)'
        }}
      >
        {children}
      </div>
    );

    return (
      <div 
        key={section.id}
        onMouseEnter={() => setHoveredSectionId(section.id)}
        onMouseLeave={() => setHoveredSectionId(null)}
        className={`relative transition-all duration-300 ${isHovered && phase === 'PREVIEW' ? 'ring-2 ring-indigo-500/40 ring-inset' : ''}`}
      >
        {isHovered && phase === 'PREVIEW' && (
          <div className="absolute top-2 right-2 z-[100] flex gap-1.5 animate-in fade-in zoom-in duration-200">
             <button onClick={() => regenerateSection(section.id)} className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-xl hover:bg-indigo-500 transition-colors">
               <Wand2 className="w-3.5 h-3.5" />
             </button>
             <button onClick={() => {
                setSiteData(prev => prev ? {...prev, sections: prev.sections.filter(s => s.id !== section.id)} : null);
                playSound('delete');
             }} className="bg-rose-600 text-white p-1.5 rounded-lg shadow-xl hover:bg-rose-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
             </button>
          </div>
        )}

        {section.type === 'hero' && (
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-40 dark:bg-[#020617] bg-white text-center">
             <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
             <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="text-4xl md:text-8xl font-tech font-bold tracking-tighter text-text-main mb-8 uppercase leading-none">{data.headline}</div>
                <p className="text-lg md:text-2xl font-light text-text-muted max-w-2xl mx-auto mb-12">{data.subtext}</p>
                <div className="px-12 py-5 inline-block text-white font-black text-xs uppercase tracking-[0.4em] shadow-2xl bg-indigo-600 cursor-pointer hover:bg-indigo-500 transition-all" style={{ backgroundColor: accent, borderRadius: p.radius }}>{data.cta || "Action"}</div>
             </div>
          </section>
        )}

        {section.type === 'feature_grid' && (
           <section className="py-32 px-12 dark:bg-[#0f172a]/30 bg-zinc-50 border-y border-black/5 dark:border-white/5">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                 {(data.features || []).map((f: any, i: number) => (
                   <GlassCard key={i} className="p-12 space-y-6 group hover:-translate-y-2 transition-transform">
                      <Zap className="w-10 h-10 text-indigo-500" />
                      <h3 className="text-2xl font-tech font-bold uppercase text-text-main tracking-widest">{f.title}</h3>
                      <p className="text-sm font-light text-text-muted leading-relaxed">{f.desc}</p>
                   </GlassCard>
                 ))}
              </div>
           </section>
        )}

        {section.type === 'process_steps' && (
          <section className="py-32 px-12 bg-surface">
             <div className="max-w-6xl mx-auto space-y-16">
                <h2 className="text-4xl font-tech font-bold uppercase tracking-widest text-center text-text-main">Production_Logic</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   {(data.steps || []).map((step: any, i: number) => (
                     <div key={i} className="relative p-10 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/5">
                        <div className="text-4xl font-tech font-black opacity-10 mb-6">0{i+1}</div>
                        <h4 className="text-lg font-tech font-bold uppercase text-text-main mb-4">{step.title}</h4>
                        <p className="text-xs font-light text-text-muted leading-relaxed">{step.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </section>
        )}

        {section.type === 'stats' && (
           <section className="py-24 px-8 bg-surface">
              <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                 {(data.items || []).map((item: any, i: number) => (
                   <div key={i} className="text-center space-y-2">
                      <div className="text-6xl font-tech font-bold text-text-main tracking-tighter" style={{ color: accent }}>{item.value}</div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">{item.label}</div>
                   </div>
                 ))}
              </div>
           </section>
        )}

        {section.type === 'newsletter' && (
           <section className="py-32 px-12 bg-gradient-to-b from-indigo-500/5 to-transparent border-t border-black/5 dark:border-white/5">
              <div className="max-w-4xl mx-auto text-center space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-tech font-bold uppercase text-text-main tracking-tighter">{data.title || "Join_The_Fleet"}</h2>
                    <p className="text-lg font-light text-text-muted">{data.sub || "Enter your neural hash for direct updates."}</p>
                 </div>
                 <div className="relative group max-w-xl mx-auto">
                    <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-10 group-hover:opacity-30 transition-all" />
                    <div className="relative flex bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-full p-2">
                       <input type="email" placeholder="0xAddress@domain.eth" className="bg-transparent border-none outline-none flex-1 px-8 text-sm font-mono text-text-main" />
                       <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 shadow-xl transition-all" style={{ backgroundColor: accent }}>Sync_Hash</button>
                    </div>
                 </div>
              </div>
           </section>
        )}

        {section.type === 'contact' && (
           <section className="py-32 px-12 bg-surface">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-6">
                    <h2 className="text-6xl font-tech font-bold uppercase leading-none">Initiate <span style={{ color: accent }}>Sync.</span></h2>
                    <p className="text-lg font-light text-text-muted max-w-sm">Establish a dedicated data link with our neural architects to scale your operation.</p>
                 </div>
                 <GlassCard className="p-16 space-y-6 border border-black/5 dark:border-white/10 shadow-2xl">
                    <input type="text" placeholder="Identity_Label" className="w-full h-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 text-sm font-mono" />
                    <textarea placeholder="Message_Buffer" className="w-full h-40 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 text-sm font-mono resize-none" />
                    <button className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg text-white" style={{ backgroundColor: accent }}>Dispatch_Link</button>
                 </GlassCard>
              </div>
           </section>
        )}
      </div>
    );
  };

  const Sidebar = () => (
    <div className="fixed left-0 top-0 bottom-0 w-24 lg:w-80 bg-surface/80 backdrop-blur-3xl border-r border-black/5 dark:border-white/5 z-[200] flex flex-col transition-all duration-700">
       <div className="p-8 flex items-center gap-4 border-b border-black/5 dark:border-white/5 h-20">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
             <Hammer className="w-5 h-5" />
          </div>
          <span className="hidden lg:block font-tech text-2xl font-bold tracking-tighter uppercase truncate text-text-main">Matter_Forge</span>
       </div>

       <div className="flex-1 py-12 px-6 space-y-4 overflow-y-auto custom-scroll">
          <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-6 px-4">Main_Console</div>
          {[
            { id: 'DASHBOARD', icon: LayoutGrid, label: t.sidebar.dashboard },
            { id: 'CREATE', icon: Wand2, label: t.sidebar.create },
            { id: 'ASSETS', icon: Layers, label: t.sidebar.assets },
            { id: 'API', icon: Cpu, label: t.sidebar.api },
            { id: 'SETTINGS', icon: Settings2, label: t.sidebar.settings }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => { setCurrentPage(item.id as PageID); playSound('click'); }}
              className={`w-full flex items-center gap-6 p-4 rounded-3xl transition-all duration-500 group
                ${currentPage === item.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20' 
                  : 'text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main'}
              `}
            >
               <item.icon className={`w-6 h-6 shrink-0 transition-transform ${currentPage === item.id ? 'rotate-12' : 'group-hover:scale-110'}`} />
               <span className="hidden lg:block text-xs font-bold uppercase tracking-widest truncate">{item.label}</span>
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
            onClick={() => window.location.hash = ''}
            className="w-full flex items-center gap-6 p-4 rounded-3xl text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all group"
          >
             <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
             <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">{t.nav.backToShowcase}</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-4 p-5 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 shadow-inner">
             <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-xl">A</div>
             <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-text-main truncate uppercase tracking-tighter">Architect_0x88</div>
                <div className="text-[8px] font-mono text-emerald-500 uppercase font-black">Licensed_Pro</div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface text-text-main font-sans selection:bg-indigo-500/30 overflow-hidden flex relative">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-24 lg:ml-80 transition-all duration-700 overflow-hidden">
         <header className="h-20 border-b border-black/5 dark:border-white/5 backdrop-blur-xl flex items-center justify-between px-12 z-[120]">
            <div className="flex items-center gap-6">
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">System_State: </span>
               <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active_Relay_0x88A</span>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <button 
                 onClick={() => setLang(lang === 'en' ? 'ru' : 'en')} 
                 className="px-4 py-2 rounded-xl glass-panel text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-400 transition-all"
               >
                 {lang}
               </button>
            </div>
         </header>

         <main className="flex-1 relative overflow-y-auto no-scrollbar scroll-smooth">
            {currentPage === 'DASHBOARD' && (
              <div className="p-16 space-y-16 animate-in fade-in duration-700">
                 <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 dark:border-white/5 pb-16">
                    <div className="space-y-4">
                       <h1 className="text-6xl font-tech font-bold uppercase tracking-tighter text-text-main leading-none">Мои <span className="text-indigo-500">Сайты.</span></h1>
                       <p className="text-text-muted font-light max-w-xl text-lg italic">Управление вашими синтезированными проектами и их распределение в Edge сети.</p>
                    </div>
                    <button onClick={() => setCurrentPage('CREATE')} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 shadow-2xl hover:bg-indigo-500 active:scale-95 transition-all shadow-indigo-600/30">
                       <Plus className="w-5 h-5" /> Создать Проект
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {mySites.map(site => (
                      <div key={site.id} className="group relative bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-[56px] p-12 flex flex-col gap-10 hover:border-indigo-500/30 transition-all duration-700 shadow-xl hover:shadow-2xl">
                         <div className="flex justify-between items-start">
                            <div className="w-16 h-16 rounded-3xl bg-zinc-900 border-2 border-white/10 flex items-center justify-center text-white transition-all duration-700 group-hover:scale-110" style={{ borderColor: site.accentColor }}>
                               <Globe className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <button className="p-3 rounded-full hover:bg-rose-500/10 text-zinc-800 hover:text-rose-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                         </div>
                         <div className="space-y-2">
                            <h3 className="text-3xl font-tech font-bold text-text-main uppercase tracking-widest">{site.brandName}</h3>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase font-black">Forged: {site.createdAt}</div>
                         </div>
                         <div className="pt-10 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                               <span className="text-[9px] font-black uppercase text-zinc-400">Deployed_OK</span>
                            </div>
                            <button className="text-[10px] font-black uppercase text-indigo-500 flex items-center gap-3 group-hover:gap-5 transition-all">
                               Open_Studio <ChevronRight className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                    ))}
                    
                    {/* Placeholder for expansion */}
                    <div onClick={() => setCurrentPage('CREATE')} className="border-2 border-dashed border-black/5 dark:border-white/10 rounded-[56px] flex flex-col items-center justify-center gap-6 p-12 opacity-40 hover:opacity-100 transition-all cursor-pointer group">
                       <Plus className="w-12 h-12 text-zinc-500 group-hover:rotate-90 transition-transform" />
                       <span className="text-xs font-black uppercase tracking-widest">Forge_New_Asset</span>
                    </div>
                 </div>
              </div>
            )}

            {currentPage === 'CREATE' && (
              <div className="h-full flex items-center justify-center">
                {phase === 'INTAKE' && (
                  <div className="w-full max-w-4xl space-y-16 animate-in fade-in duration-700 p-12">
                    <div className="text-center space-y-8">
                      <h1 className="text-7xl md:text-9xl font-tech font-bold text-text-main uppercase tracking-tighter leading-none">
                        {t.builder.intake.title} <span className="text-indigo-500">{t.builder.intake.titleAccent}</span>
                      </h1>
                      <p className="text-2xl font-light text-text-muted max-w-2xl mx-auto italic">{t.builder.intake.sub}</p>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[64px] blur opacity-10 group-focus-within:opacity-40 transition-opacity" />
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t.builder.intake.placeholder}
                        className="w-full h-64 bg-white dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-[64px] p-12 text-3xl font-light text-text-main outline-none transition-all resize-none relative z-10 focus:border-indigo-500/50 shadow-2xl"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => setPhase('CALIBRATION')} disabled={!prompt.trim()} className="group px-20 py-8 bg-indigo-600 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.6em] transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] active:scale-95 disabled:opacity-20 flex items-center gap-8 hover:bg-indigo-500 shadow-xl">{t.builder.intake.launchBtn} <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></button>
                    </div>
                  </div>
                )}
                
                {phase === 'CALIBRATION' && (
                   <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center p-12 animate-in fade-in duration-700">
                     <div className="space-y-12">
                        <div className="space-y-6">
                          <h2 className="text-7xl font-tech font-bold text-text-main uppercase tracking-tighter leading-none">{t.builder.config.title} <span className="text-indigo-500">{t.builder.config.titleAccent}</span></h2>
                          <p className="text-xl font-light text-text-muted">{t.builder.config.sub}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-black/5 dark:bg-white/5 p-12 rounded-[56px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                           <div className="space-y-8">
                              <div className="space-y-4">
                                 <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black"><span>{t.builder.config.refraction}</span> <span>{manualConfig.blur}px</span></div>
                                 <input type="range" min="0" max="64" value={manualConfig.blur} onChange={(e) => setManualConfig({...manualConfig, blur: parseInt(e.target.value)})} className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                              </div>
                              <div className="space-y-4">
                                 <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black"><span>{t.builder.config.density}</span> <span>{(manualConfig.opacity * 100).toFixed(0)}%</span></div>
                                 <input type="range" min="0.05" max="0.5" step="0.01" value={manualConfig.opacity} onChange={(e) => setManualConfig({...manualConfig, opacity: parseFloat(e.target.value)})} className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                              </div>
                           </div>
                           <div className="space-y-8">
                              <div className="space-y-4">
                                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">{t.builder.config.archetype}</div>
                                 <div className="flex flex-wrap gap-2">
                                   {(['BUSINESS', 'TECH', 'PROMO', 'MINIMAL'] as ProjectStyle[]).map(s => (
                                     <button key={s} onClick={() => setManualConfig({...manualConfig, style: s})} className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase transition-all ${manualConfig.style === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/10 text-zinc-500 border-transparent hover:bg-white/20'}`}>{s}</button>
                                   ))}
                                 </div>
                              </div>
                              <div className="flex items-center gap-6 p-6 bg-black/5 dark:bg-black/40 rounded-3xl border border-black/5 dark:border-white/5">
                                 <Palette className="w-5 h-5 text-indigo-500" />
                                 <input type="color" value={manualConfig.accent} onChange={(e) => setManualConfig({...manualConfig, accent: e.target.value})} className="bg-transparent border-none w-10 h-10 cursor-pointer" />
                                 <span className="text-[10px] font-mono text-zinc-500 uppercase">{manualConfig.accent}</span>
                              </div>
                           </div>
                        </div>
                        <button onClick={startSynthesis} className="w-full py-8 bg-indigo-600 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.6em] shadow-2xl hover:bg-indigo-500 active:scale-95 transition-all">{t.builder.config.btn}</button>
                     </div>
                     <div className="hidden lg:flex flex-col items-center justify-center h-[650px] bg-white/5 rounded-[100px] border border-black/5 dark:border-white/5 relative shadow-inner overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
                        <div className="w-80 h-[500px] transition-all duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-12 overflow-hidden border-2 rounded-[56px] bg-black/40" style={{ backdropFilter: `blur(${manualConfig.blur}px)`, borderColor: `${manualConfig.accent}44` }}>
                           <Cpu className="w-20 h-20 text-white opacity-20 animate-pulse" />
                        </div>
                     </div>
                   </div>
                )}

                {phase === 'SYNTHESIS' && (
                   <div className="w-full max-w-4xl flex flex-col items-center gap-16 text-center p-8 animate-in fade-in duration-1000">
                      <div className="relative">
                         <div className="w-64 h-64 rounded-full border-4 border-black/5 dark:border-white/5 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 rounded-full border-t-transparent animate-spin border-indigo-500" />
                            <Wand2 className="w-20 h-20 text-text-main animate-pulse" />
                         </div>
                      </div>
                      <div className="space-y-6">
                         <h2 className="text-5xl font-tech font-bold text-text-main uppercase tracking-[0.4em]">{loadingText}</h2>
                         <div className="w-full bg-black/5 dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-[48px] p-12 h-64 overflow-hidden font-mono text-[11px] text-left shadow-2xl text-indigo-400">
                            {logs.map((log, i) => <div key={i} className="opacity-60 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">> {log}</div>)}
                         </div>
                      </div>
                   </div>
                )}

                {phase === 'PREVIEW' && siteData && (
                  <div className="w-full h-full relative overflow-auto p-24 no-scrollbar scroll-smooth">
                     <div className="max-w-6xl mx-auto space-y-32 pb-40">
                        {siteData.sections.map(s => renderSection(s))}
                     </div>
                     
                     {/* HUD PREVIEW CONTROLS */}
                     <div className="fixed bottom-12 right-12 flex gap-4 z-[300]">
                        <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl flex gap-1 shadow-2xl">
                           <button onClick={() => setViewMode('CANVAS')} className={`p-3 rounded-xl transition-all ${viewMode === 'CANVAS' ? 'bg-indigo-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}><LayoutGrid className="w-5 h-5" /></button>
                           <button onClick={() => setViewMode('SINGLE')} className={`p-3 rounded-xl transition-all ${viewMode === 'SINGLE' ? 'bg-indigo-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}><Maximize className="w-5 h-5" /></button>
                        </div>
                        <button onClick={() => { setPhase('DEPLOY'); setNodesSync(0); }} className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-emerald-500 active:scale-95 shadow-emerald-600/30 flex items-center gap-3">
                           <Share2 className="w-4 h-4" /> {t.builder.preview.publish}
                        </button>
                     </div>
                  </div>
                )}
              </div>
            )}

            {currentPage === 'API' && (
              <div className="p-16 space-y-16 animate-in fade-in duration-700">
                 <div className="space-y-6 max-w-2xl">
                    <h1 className="text-6xl font-tech font-bold uppercase tracking-tighter text-text-main leading-none">API <span className="text-indigo-500">Доступ.</span></h1>
                    <p className="text-text-muted font-light text-lg italic">Мониторинг запросов к нейронной сети Gemini 3 и управление вашими архитектурными токенами в реальном времени.</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 bg-zinc-950 border border-white/5 rounded-[64px] p-16 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[500px]">
                       <div className="absolute top-12 right-12 flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-emerald-500 font-black uppercase tracking-widest">Protocol_Steady</span>
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-white">Usage_Telemetry</h3>
                          <p className="text-xs text-zinc-600 uppercase font-mono">Last_24_Hours_Link_State</p>
                       </div>
                       <div className="h-64 flex items-end gap-3 px-4 border-b border-white/5 pb-2">
                          {[...Array(24)].map((_, i) => (
                             <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-xl transition-all hover:bg-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] group relative" style={{ height: `${Math.random() * 80 + 20}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-mono text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">0x{i}F</div>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                       <div className="bg-white/5 border border-white/10 rounded-[48px] p-10 flex flex-col gap-8 backdrop-blur-3xl shadow-xl">
                          <div className="flex items-center gap-4 text-indigo-400">
                             <Database className="w-6 h-6" />
                             <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Active_API_Cluster</span>
                          </div>
                          <div className="p-5 bg-black rounded-3xl border border-white/5 font-mono text-xs text-zinc-500 truncate shadow-inner">
                             sk-proj-matterforge-882A-****************-PRO
                          </div>
                          <button className="w-full py-5 bg-white text-zinc-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">Update_Neural_Key</button>
                       </div>
                       
                       <div className="bg-white/5 border border-white/10 rounded-[48px] p-10 flex flex-col gap-4 shadow-xl">
                          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Quota_Allocation</div>
                          <div className="flex items-baseline gap-3">
                             <span className="text-5xl font-tech font-bold text-white tracking-tighter">1,248</span>
                             <span className="text-[10px] font-mono opacity-30 text-white">TOKENS / SEC</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full mt-6 overflow-hidden">
                             <div className="h-full bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.8)]" style={{ width: '25%' }} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {currentPage === 'SETTINGS' && (
               <div className="p-16 space-y-16 animate-in fade-in duration-700">
                  <div className="space-y-6 max-w-2xl">
                     <h1 className="text-6xl font-tech font-bold uppercase tracking-tighter text-text-main leading-none">Системные <span className="text-indigo-500">Настройки.</span></h1>
                     <p className="text-text-muted font-light text-lg italic">Глобальная калибровка параметров рабочего пространства и управление кэшем рефракции.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                     {[
                       { label: 'Cloud Synchrony', icon: RefreshCw, status: 'Enabled', color: 'indigo' },
                       { label: 'Deep Refraction Cache', icon: Layers, status: 'Active (4.2GB)', color: 'emerald' },
                       { label: 'Haptic Feedback Preview', icon: Activity, status: 'Silent_Mode', color: 'rose' },
                       { label: 'Security Handshake', icon: Shield, status: 'Level_3', color: 'amber' },
                       { label: 'Edge Propagation', icon: Globe, status: 'Global_CDN', color: 'sky' },
                       { label: 'Memory Allocation', icon: Database, status: 'PRO_UNLIMITED', color: 'violet' }
                     ].map((s, i) => (
                       <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[48px] flex items-center justify-between group hover:bg-white/10 transition-all duration-500 shadow-xl">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-${s.color}-400 group-hover:scale-110 transition-all`}>
                                <s.icon className="w-7 h-7" />
                             </div>
                             <span className="text-2xl font-tech font-bold uppercase tracking-widest text-text-main leading-none">{s.label}</span>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase font-black">{s.status}</div>
                       </div>
                     ))}
                  </div>
               </div>
            )}

            {currentPage === 'ASSETS' && (
               <div className="p-16 space-y-16 animate-in fade-in duration-700">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 dark:border-white/5 pb-16">
                     <div className="space-y-4">
                        <h1 className="text-6xl font-tech font-bold uppercase tracking-tighter text-text-main leading-none">Библиотека <span className="text-indigo-500">Активов.</span></h1>
                        <p className="text-text-muted font-light max-w-xl text-lg italic">Ваша персональная коллекция синтезированных компонентов и текстур.</p>
                     </div>
                     <button className="px-8 py-4 bg-zinc-900 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-white hover:text-black transition-all">
                        <Upload className="w-5 h-5" /> Import_Blob
                     </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                     {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-4 group hover:border-indigo-500/30 cursor-pointer transition-all shadow-xl">
                           <div className="w-16 h-16 rounded-[24px] bg-zinc-900 border border-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                              {i % 3 === 0 ? <FileCode className="w-8 h-8 text-indigo-500/40" /> : i % 3 === 1 ? <Layers className="w-8 h-8 text-emerald-500/40" /> : <Box className="w-8 h-8 text-sky-500/40" />}
                           </div>
                           <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">OBJ_0x882{i}</span>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </main>
      </div>

      {/* FOOTER INFO */}
      <footer className="fixed bottom-0 right-0 h-12 px-12 flex items-center justify-end z-[300] pointer-events-none opacity-20">
         <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.5em] font-black">
            MatterForge Spatial Architect // Dashboard v2.5.0_LATEST
         </div>
      </footer>
    </div>
  );
};

export default BuilderApp;
