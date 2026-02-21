
import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
  Hammer, Wand2, Loader2, Zap, Layout, 
  ChevronRight, Database, Globe, Sliders,
  CheckCircle2, AlertTriangle, Shield, Activity, 
  Terminal, Monitor, Smartphone, Share2, ArrowRight, RefreshCw,
  Users, Building2, BarChart3, Star, HelpCircle,
  LayoutGrid, ListChecks, MailQuestion, Cpu, Workflow, Layers, Sun, Radio, Move,
  Mic, History, VolumeX, Eye, Server, Radar, HardDrive
} from 'lucide-react';
import { LanguageContext } from '../App';
import { GoogleGenAI, Type } from "@google/genai";
import { playUISound } from './AudioService';

type BuilderStep = 'INTAKE' | 'CONFIG' | 'SYNTHESIS' | 'RESULT';

interface SiteSection {
  type: string;
  data: any;
}

interface SiteContent {
  title: string;
  heroHeadline: string;
  heroSub: string;
  colorScheme: string;
  sections: SiteSection[];
}

export const LandingBuilder: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const isDark = theme === 'dark';
  const [step, setStep] = useState<BuilderStep>('INTAKE');
  const [prompt, setPrompt] = useState('');
  const [refraction, setRefraction] = useState(0.6);
  const [density, setDensity] = useState(0.4);
  const [loadingText, setLoadingText] = useState('');
  const [generatedContent, setGeneratedContent] = useState<SiteContent | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  const handleIntake = () => {
    if (!prompt.trim()) return;
    playUISound('click');
    setStep('CONFIG');
    addLog("Brief_Captured: Semantics_Extracted");
  };

  const startSynthesis = async () => {
    playUISound('process');
    setStep('SYNTHESIS');
    
    const steps = [
      "Allocating neural buffers...",
      "Generating high-fidelity copy...",
      "Calibrating refractive indices...",
      "Mapping spatial coordinates...",
      "Forging atomic UI components..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setLoadingText(steps[current]);
        addLog(`System_Log: ${steps[current]}`);
        current++;
      }
    }, 1000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a spatial landing page architecture for: "${prompt}". 
        Return JSON with:
        {
          "title": "String",
          "heroHeadline": "String",
          "heroSub": "String",
          "colorScheme": "Hex",
          "sections": [
            {"type": "feature_grid", "data": {"features": [{"title": "...", "desc": "..."}]}},
            {"type": "process_steps", "data": {"steps": [{"title": "...", "desc": "..."}]}},
            {"type": "newsletter", "data": {"title": "...", "sub": "..."}},
            {"type": "clients", "data": {"logos": ["Brand A", "Brand B"]}},
            {"type": "stats", "data": {"items": [{"label": "Uptime", "value": "99.9%"}]}},
            {"type": "expertise", "data": {"items": [{"title": "...", "desc": "..."}]}},
            {"type": "team", "data": {"members": [{"name": "...", "role": "..."}]}},
            {"type": "pricing", "data": {"plans": [{"name": "...", "price": "..."}]}}
          ]
        }`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || "{}") as SiteContent;
      
      setTimeout(() => {
        clearInterval(interval);
        setGeneratedContent(data);
        setStep('RESULT');
        playUISound('success');
        addLog("Synthesis_Finalized: OBJ_READY");
      }, 5000);

    } catch (err) {
      clearInterval(interval);
      setStep('INTAKE');
      addLog("Critical_Error: Synthesis aborted");
    }
  };

  return (
    <div className="space-y-40 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
              <Hammer className="w-3 h-3" /> NEURAL_INTERFACE_BUILDER
           </div>
           <h2 className="text-[100px] md:text-[120px] font-tech font-bold text-zinc-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
              Синтез <br /><span className="text-indigo-500">Материи.</span>
           </h2>
           <p className="text-xl font-light text-zinc-500 dark:text-zinc-400 max-w-xl">
             Создайте интерфейс нового поколения. Опишите видение, и система сформирует пространственную структуру с адаптивной физикой.
           </p>
        </div>

        {/* Steps Visualizer */}
        <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl shadow-2xl">
           {(['INTAKE', 'CONFIG', 'SYNTHESIS', 'RESULT'] as BuilderStep[]).map((s, i) => (
             <div key={s} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-[10px] transition-all duration-500
                  ${step === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-zinc-600'}`}>
                   0{i+1}
                </div>
                {i < 3 && <div className="w-4 h-px bg-white/5" />}
             </div>
           ))}
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative min-h-[700px] rounded-[80px] border overflow-hidden p-1 transition-all duration-1000
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-100 border-black/5 shadow-inner'}
      `}>
         
         {step === 'INTAKE' && (
           <div className="h-full flex flex-col items-center justify-center p-20 animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-40">
              <div className="w-full max-w-3xl space-y-12">
                 <div className="text-center space-y-4">
                    <h3 className="text-5xl font-tech font-bold uppercase text-text-main">Matter_Input</h3>
                    <p className="text-lg opacity-40 italic">Введите описание вашего будущего проекта для инициации синтеза</p>
                 </div>
                 
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[40px] blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
                    <textarea 
                       value={prompt}
                       onChange={(e) => setPrompt(e.target.value)}
                       placeholder="Напр. Агентство для кибер-стартапов в стиле цифрового брутализма..."
                       className="w-full h-48 bg-black/40 border border-white/10 rounded-[40px] p-10 text-2xl font-light text-text-main outline-none focus:border-indigo-500/50 transition-all resize-none custom-scroll"
                    />
                 </div>

                 <div className="flex justify-center">
                    <button 
                      onClick={handleIntake}
                      className="px-16 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center gap-4"
                    >
                      Продолжить <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* BLUEPRINT DESCRIPTION SECTIONS - EXPANDED TO 12 */}
              <div className="w-full max-w-6xl space-y-16">
                 <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                       <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.5em]">{t.builder.blueprintTitle}</span>
                       <h4 className="text-3xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">{t.builder.blueprintSub}</h4>
                    </div>
                    <div className="flex gap-4 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                       <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Cluster_AMS: ONLINE</span>
                       <span className="text-indigo-500">Nodes_Active: 12.0k</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                      { id: 'neural', icon: Cpu, color: 'indigo' },
                      { id: 'physics', icon: Workflow, color: 'emerald' },
                      { id: 'atomic', icon: Layers, color: 'sky' },
                      { id: 'edge', icon: Globe, color: 'violet' },
                      { id: 'kinetic', icon: Move, color: 'amber' },
                      { id: 'optic', icon: Sun, color: 'indigo' },
                      { id: 'sync', icon: Radio, color: 'emerald' },
                      { id: 'shield', icon: Shield, color: 'rose' },
                      { id: 'vocal', icon: Mic, color: 'sky' },
                      { id: 'temporal', icon: History, color: 'violet' },
                      { id: 'audio', icon: VolumeX, color: 'amber' },
                      { id: 'vision', icon: Eye, color: 'indigo' }
                    ].map((bp) => {
                      const data = (t.builder.blueprints as any)[bp.id];
                      return (
                        <div key={bp.id} className="p-8 glass-panel rounded-[40px] space-y-6 group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                           <div className={`absolute -top-12 -right-12 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-${bp.color}-500`} />
                           
                           <div className={`w-12 h-12 rounded-2xl bg-${bp.color}-500/10 border border-${bp.color}-500/20 flex items-center justify-center text-${bp.color}-500 group-hover:scale-110 transition-transform`}>
                              <bp.icon className="w-6 h-6" />
                           </div>
                           <div className="space-y-2">
                              <h5 className="text-lg font-tech font-bold text-text-main uppercase tracking-widest leading-none">{data.title}</h5>
                              <p className="text-[10px] font-light text-text-muted leading-relaxed uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">{data.desc}</p>
                           </div>
                           <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center opacity-20 group-hover:opacity-100 transition-opacity">
                              <span className="text-[8px] font-mono uppercase">HASH: 0x{bp.id.slice(0,3).toUpperCase()}</span>
                              <Activity className={`w-3 h-3 text-${bp.color}-400`} />
                           </div>
                        </div>
                      );
                    })}
                 </div>

                 {/* NEW PIPELINE VISUALIZATION - 7 STEPS */}
                 <div className="space-y-12 pt-20 border-t border-white/5">
                    <div className="text-center space-y-2">
                       <span className="text-[9px] font-mono text-indigo-500 font-black uppercase tracking-[0.5em] animate-pulse">{t.builder.pipeline.title}</span>
                    </div>
                    
                    <div className="relative flex justify-between items-center max-w-5xl mx-auto px-4 overflow-x-auto no-scrollbar py-10">
                       {/* Line Connector */}
                       <div className="absolute inset-x-0 top-[50%] -translate-y-1/2 h-px bg-white/5 z-0" />
                       
                       {t.builder.pipeline.steps.map((step: any, i: number) => (
                         <div key={i} className="relative z-10 flex flex-col items-center gap-6 group min-w-[120px]">
                            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-indigo-500/50 group-hover:scale-110 shadow-xl backdrop-blur-xl">
                               <div className="text-xs font-mono font-black text-indigo-500">0{i+1}</div>
                            </div>
                            <div className="text-center space-y-1">
                               <div className="text-[10px] font-tech font-black text-text-main uppercase tracking-widest">{step.label}</div>
                               <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity">{step.desc}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* NEW SPATIAL NODE REGISTRY SECTION */}
                 <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="flex items-center gap-4">
                          <Radar className="w-5 h-5 text-indigo-500 animate-pulse" />
                          <h4 className="text-3xl font-tech font-bold text-text-main uppercase tracking-widest">Spatial_Node_Registry</h4>
                       </div>
                       <div className="flex items-center gap-3 px-6 py-2 bg-black/40 rounded-full border border-white/10">
                          <span className="text-[8px] font-mono text-zinc-500 uppercase">Latency_Global:</span>
                          <span className="text-[10px] font-tech font-black text-emerald-500">12.4ms</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       {[
                         { loc: 'AMS_NORTH', id: '0x882A', load: 42, icon: Server },
                         { loc: 'SFO_WEST', id: '0x771B', load: 84, icon: HardDrive },
                         { loc: 'LND_CORE', id: '0x449F', load: 12, icon: Cpu },
                         { loc: 'TYO_EAST', id: '0x110C', load: 65, icon: Globe }
                       ].map((node) => (
                         <div key={node.loc} className="p-6 bg-black/20 border border-white/5 rounded-3xl flex items-center justify-between group hover:bg-black/40 transition-all">
                            <div className="flex items-center gap-4">
                               <node.icon className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                               <div>
                                  <div className="text-[9px] font-tech font-bold text-text-main uppercase tracking-widest">{node.loc}</div>
                                  <div className="text-[7px] font-mono text-zinc-600">{node.id}</div>
                               </div>
                            </div>
                            <div className="text-right space-y-1">
                               <div className="text-[8px] font-mono text-emerald-500">{node.load}%</div>
                               <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500/40" style={{ width: `${node.load}%` }} />
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
         )}

         {step === 'CONFIG' && (
           <div className="h-full grid grid-cols-1 lg:grid-cols-2 p-1 animate-in fade-in duration-700">
              <div className="p-20 flex flex-col justify-center space-y-12">
                 <div className="space-y-4">
                    <h3 className="text-5xl font-tech font-bold uppercase text-text-main">Calibration</h3>
                    <p className="opacity-40 italic">Настройка физических свойств сгенерированного интерфейса</p>
                 </div>

                 <div className="space-y-10">
                    <div className="space-y-4">
                       <div className="flex justify-between font-mono text-[10px] uppercase text-zinc-500">
                          <span>Refraction_Power</span>
                          <span className="text-indigo-500">{refraction.toFixed(2)}</span>
                       </div>
                       <input type="range" min="0" max="1" step="0.01" value={refraction} onChange={e => setRefraction(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/5 rounded-full appearance-none accent-indigo-500" />
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between font-mono text-[10px] uppercase text-zinc-500">
                          <span>Mass_Density</span>
                          <span className="text-indigo-500">{density.toFixed(2)}</span>
                       </div>
                       <input type="range" min="0" max="1" step="0.01" value={density} onChange={e => setDensity(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/5 rounded-full appearance-none accent-indigo-500" />
                    </div>
                 </div>

                 <button 
                   onClick={startSynthesis}
                   className="w-full py-8 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.5em] shadow-xl hover:bg-indigo-500 transition-all active:scale-95 shadow-indigo-600/30"
                 >
                   Запустить Синтез
                 </button>
              </div>

              <div className="bg-black/20 flex items-center justify-center p-20">
                 <div className="relative w-80 h-96">
                    <div 
                      className="absolute inset-0 border-2 rounded-[56px] transition-all duration-700 shadow-2xl"
                      style={{ 
                         backgroundColor: `rgba(255,255,255, ${0.05 + density * 0.1})`,
                         backdropFilter: `blur(${refraction * 60}px)`,
                         borderColor: `rgba(99, 102, 241, ${0.2 + refraction * 0.4})`,
                         transform: 'rotateX(15deg) rotateY(-15deg)'
                      }}
                    >
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="w-12 h-12 text-indigo-500 animate-pulse" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {step === 'SYNTHESIS' && (
            <div className="h-full flex flex-col items-center justify-center p-20 space-y-12 animate-in fade-in duration-700">
               <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-white/5 flex items-center justify-center">
                     <div className="w-full h-full border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                  </div>
                  <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white animate-pulse" />
               </div>

               <div className="text-center space-y-6">
                  <h3 className="text-4xl font-tech font-bold uppercase tracking-widest text-text-main">{loadingText}</h3>
                  <div className="w-96 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto">
                     <div className="h-full bg-indigo-500 animate-[progress_5s_linear]" />
                  </div>
               </div>

               <div className="w-full max-w-xl bg-black border border-white/5 rounded-[40px] p-10 shadow-2xl h-56 overflow-hidden font-mono text-[11px] text-indigo-400/60">
                  {logs.map((log, i) => (
                    <div key={i} className="mb-1">{log}</div>
                  ))}
               </div>
            </div>
         )}

         {step === 'RESULT' && generatedContent && (
            <div className="h-full flex flex-col animate-in fade-in duration-1000">
               <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-3xl">
                  <div className="flex items-center gap-6">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                     </div>
                     <span className="text-[10px] font-mono text-zinc-500">blueprint://forged_asset_{generatedContent.title.toLowerCase()}</span>
                  </div>
                  <div className="flex gap-3">
                     <button className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-white transition-all"><Monitor className="w-4 h-4" /></button>
                     <button className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-white transition-all"><Smartphone className="w-4 h-4" /></button>
                     <div className="w-[1px] h-10 bg-white/5 mx-3" />
                     <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl active:scale-95 shadow-indigo-600/30">Опубликовать</button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto custom-scroll bg-[#030305]">
                  <section className="py-40 px-20 relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${generatedContent.colorScheme}, transparent 70%)` }} />
                     <div className="relative z-10 max-w-4xl space-y-12">
                        <div className="text-8xl font-tech font-bold text-white uppercase leading-none tracking-tighter">
                           {generatedContent.heroHeadline}
                        </div>
                        <p className="text-2xl font-light opacity-60 max-w-2xl">{generatedContent.heroSub}</p>
                        <button className="px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all bg-white text-black shadow-2xl">
                           Explore_Structure
                        </button>
                     </div>
                  </section>

                  {generatedContent.sections.map((sec, i) => (
                    <div key={i}>
                       {sec.type === 'feature_grid' && (
                         <section className="py-32 px-20 bg-surface/5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                               {sec.data.features.map((f: any, j: number) => (
                                 <div key={j} className="p-12 rounded-[48px] bg-white/5 border border-white/10 hover:-translate-y-2 transition-transform">
                                    <Zap className="w-8 h-8 text-indigo-500 mb-6" />
                                    <h4 className="text-xl font-tech font-bold uppercase text-white mb-4">{f.title}</h4>
                                    <p className="text-sm font-light opacity-40">{f.desc}</p>
                                 </div>
                               ))}
                            </div>
                         </section>
                       )}
                       {sec.type === 'process_steps' && (
                          <section className="py-32 px-20 border-y border-white/5">
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {sec.data.steps.map((step: any, j: number) => (
                                  <div key={j} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                                     <div className="text-3xl font-tech font-black opacity-10 mb-4">0{j+1}</div>
                                     <h5 className="text-sm font-bold uppercase text-white mb-2">{step.title}</h5>
                                     <p className="text-[10px] font-light opacity-30">{step.desc}</p>
                                  </div>
                                ))}
                             </div>
                          </section>
                       )}
                       {sec.type === 'newsletter' && (
                         <section className="py-32 px-20 bg-gradient-to-t from-indigo-500/10 to-transparent">
                            <div className="max-w-2xl mx-auto text-center space-y-12">
                               <h3 className="text-4xl font-tech font-bold uppercase text-white">{sec.data.title}</h3>
                               <div className="flex bg-white/5 border border-white/10 rounded-full p-2">
                                  <input type="email" placeholder="Email_Hash" className="bg-transparent border-none outline-none flex-1 px-8 text-sm" />
                                  <button className="px-10 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase">Join_Fleet</button>
                               </div>
                            </div>
                         </section>
                       )}
                       {sec.type === 'clients' && (
                         <section className="py-16 border-y border-white/5 bg-white/[0.02]">
                            <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-12 opacity-30">
                               <Building2 className="w-6 h-6" />
                               {sec.data.logos.map((l: string, j: number) => (
                                 <span key={j} className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">{l}</span>
                               ))}
                            </div>
                         </section>
                       )}
                       {sec.type === 'stats' && (
                         <section className="py-24 px-20 bg-surface">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                               {sec.data.items.map((item: any, j: number) => (
                                 <div key={j} className="space-y-2">
                                    <div className="text-5xl font-tech font-bold text-white">{item.value}</div>
                                    <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.5em]">{item.label}</div>
                                 </div>
                               ))}
                            </div>
                         </section>
                       )}
                    </div>
                  ))}
               </div>

               <div className="p-8 bg-zinc-900 border-t border-white/5 flex justify-between items-center">
                  <button onClick={() => setStep('INTAKE')} className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors uppercase font-bold text-[10px]">
                     <RefreshCw className="w-4 h-4" /> Новый Синтез
                  </button>
                  <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase shadow-xl">
                     <Share2 className="w-4 h-4" /> Экспорт_Blueprints
                  </button>
               </div>
            </div>
         )}
      </div>
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};
