
import React, { useState, useContext, useEffect } from 'react';
import { HardHat, Activity, Cpu, ShieldAlert, GitBranch, RefreshCw, Terminal, Sliders, ChevronRight, Sparkles, Database, Radio, Share2, Layers, Zap, Link as LinkIcon, Thermometer, Box, Target, Info, MousePointer2, Waves } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from './AudioService';

const MycelialGrowthSim: React.FC = () => {
  const [nodes, setNodes] = useState<{id: number, x: number, y: number, nutrient: number, isTrunk: boolean}[]>([]);
  
  useEffect(() => {
    const initial = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      nutrient: Math.random(),
      isTrunk: Math.random() > 0.7
    }));
    setNodes(initial);

    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        nutrient: Math.max(0.1, Math.min(1, n.nutrient + (Math.random() - 0.5) * 0.1))
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-panel rounded-[40px] border border-black/5 dark:border-white/5 overflow-hidden group/sim shadow-inner">
       <div className="absolute top-6 left-8 flex items-center gap-3 z-10">
          <Share2 className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-black">Mycelium_v3.2_Live_Feed</span>
       </div>
       
       <svg className="absolute inset-0 w-full h-full">
          {nodes.map((node, i) => 
            nodes.slice(i + 1).map((target, j) => {
              const dist = Math.hypot(node.x - target.x, node.y - target.y);
              if (dist > 35) return null;
              
              const avgNutrient = (node.nutrient + target.nutrient) / 2;
              const isHeavy = node.isTrunk && target.isTrunk;
              
              return (
                <line 
                  key={`${i}-${j}`}
                  x1={`${node.x}%`} y1={`${node.y}%`}
                  x2={`${target.x}%`} y2={`${target.y}%`}
                  stroke={isHeavy ? "#10b981" : "#10b981"}
                  strokeWidth={isHeavy ? 2 + avgNutrient * 6 : 0.5 + avgNutrient}
                  strokeDasharray={isHeavy ? "none" : "4 4"}
                  opacity={isHeavy ? 0.4 + avgNutrient * 0.4 : 0.1 + avgNutrient * 0.2}
                  className="transition-all duration-[2000ms]"
                />
              );
            })
          )}
          {nodes.map(n => (
            <circle 
              key={n.id}
              cx={`${n.x}%`} cy={`${n.y}%`}
              r={n.isTrunk ? 4 + n.nutrient * 6 : 2 + n.nutrient * 3}
              fill={n.isTrunk ? "var(--text-main)" : "#10b981"}
              className="transition-all duration-1000"
              style={{ opacity: 0.3 + n.nutrient * 0.7 }}
            />
          ))}
       </svg>
       
       <div className="absolute bottom-6 right-8 text-right opacity-40 group-hover/sim:opacity-100 transition-opacity">
          <div className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">Algorithm: Neural_Mycelial_Synthesis</div>
          <div className="text-[8px] font-mono text-text-muted uppercase">Health: NOMINAL_0x88</div>
       </div>
    </div>
  );
};

export const EngineeringReport: React.FC<{ theme: string; onNavigate: (id: any) => void }> = ({ theme, onNavigate }) => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [cohesion, setCohesion] = useState(94.2);
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      setCohesion(prev => Math.min(100, Math.max(90, prev + (Math.random() - 0.5) * 1.2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const directives = [
    { title: "Real-time Caustics", icon: Zap, status: "READY", color: "text-amber-500", desc: "Внедрение динамических каустических бликов для водных модулей." },
    { title: "Adaptive Audio Engine", icon: Waves, status: "PROTOTYPE", color: "text-indigo-500", desc: "Звуковой отклик, меняющийся в зависимости от массы компонента." },
    { title: "Spatial Raycasting", icon: MousePointer2, status: "CALIBRATING", color: "text-emerald-500", desc: "Высокоточное определение глубины клика в 3D стеке слоев." }
  ];

  return (
    <div className="animate-in fade-in duration-1000 space-y-32">
      {/* 1. HEADER & GLOBAL STATUS */}
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em]">
             <HardHat className="w-4 h-4" /> System_Integrity_Nexus
          </div>
          <h2 className="text-[80px] md:text-[120px] font-tech font-bold uppercase leading-[0.8] tracking-tighter text-text-main">
            Статус<br /><span className="text-orange-500">Матрицы.</span>
          </h2>
          <div className="space-y-6 max-w-2xl">
            <p className="text-2xl font-light text-text-muted leading-relaxed">
              Система MatterForge функционирует на пиковой когезии {cohesion.toFixed(1)}%. 
              Текущая итерация v19.4.5 подтвердила стабильность <span className="text-indigo-500 font-bold uppercase">Директивы #03</span>.
            </p>
            <div className="flex flex-wrap gap-3">
               <button onClick={() => onNavigate('BUILDER')} className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95">Запустить Билдер</button>
               <button onClick={() => onNavigate('GENESIS')} className="px-6 py-2.5 glass-panel text-text-main rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95">Иерархия Генезиса</button>
            </div>
          </div>
        </div>

        {/* Global Stability Gauge */}
        <div className="relative flex items-center justify-center w-80 h-80">
           <svg className="w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500/10" />
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#orangeGrad)" strokeWidth="8" strokeDasharray="300" strokeDashoffset={300 - (cohesion/100)*300} className="transition-all duration-[2000ms]" style={{ strokeLinecap: 'round' }} />
              <defs>
                 <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                 </linearGradient>
              </defs>
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Cohesion</div>
              <div className="text-6xl font-tech font-black text-text-main">{cohesion.toFixed(0)}%</div>
              <Activity className="w-5 h-5 text-orange-500 mt-4 animate-pulse" />
           </div>
        </div>
      </div>

      {/* 2. OPTIMIZATION DIRECTIVES */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
           <Sparkles className="w-6 h-6 text-indigo-500" />
           <h3 className="text-4xl font-tech font-bold uppercase text-text-main tracking-widest">Optimization_Directives</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {directives.map((d, i) => (
             <div key={i} className="p-10 glass-panel rounded-[48px] space-y-8 group hover:translate-y-[-10px] transition-all duration-500">
                <div className="flex justify-between items-start">
                   <div className={`w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${d.color}`}>
                      <d.icon className="w-7 h-7" />
                   </div>
                   <span className="text-[8px] font-black px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{d.status}</span>
                </div>
                <div className="space-y-3">
                   <h4 className="text-2xl font-tech font-bold uppercase text-text-main">{d.title}</h4>
                   <p className="text-sm font-light text-text-muted leading-relaxed">{d.desc}</p>
                </div>
                <div className="pt-6 border-t border-black/5 dark:border-white/5">
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-500 group-hover:gap-4 transition-all">
                      Deploy_Test_Node <ChevronRight className="w-3 h-3" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 3. DIRECTIVE #03 VISUALIZATION */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                 <Share2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                 <div className="flex items-center gap-3">
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">#03_Directive_Organic</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[8px] text-emerald-600 dark:text-emerald-500 font-bold uppercase">Active</span>
                 </div>
                 <h3 className="text-4xl font-tech font-bold uppercase text-text-main">Мицелиальная Сетка Данных</h3>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 h-[550px]">
              <MycelialGrowthSim />
           </div>
           <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="p-8 glass-panel rounded-[40px] space-y-6">
                 <div className="flex items-center gap-3 text-emerald-500">
                    <Info className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Сводка Директивы</span>
                 </div>
                 <p className="text-lg font-light text-text-muted leading-relaxed">
                   Связи между компонентами теперь являются живыми «дендритами». Они автоматически перераспределяют энергию (VRAM) в зависимости от частоты взаимодействия.
                 </p>
                 <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/10">
                    <div className="flex justify-between text-[10px] uppercase font-mono">
                       <span className="text-text-muted">Node_Density:</span>
                       <span className="text-text-main">1.24/OBJ</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER INFO */}
      <div className="flex justify-center opacity-20 hover:opacity-100 transition-opacity duration-700">
         <div className="flex items-center gap-8 py-8 border-t border-current/10 w-full max-w-4xl justify-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.4em]">Engine: MATTER_FORGE_X19</div>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="text-[10px] font-mono uppercase tracking-[0.4em]">Protocol: COHERENCE_STB</div>
         </div>
      </div>
    </div>
  );
};
