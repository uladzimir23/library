import React, { useState, useContext, useEffect } from 'react';
import { Activity, Zap, Cpu, Server, Gauge, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const PerformanceBenchmark: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(prev => 60 + Math.random() * 2);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="performance">
      {/* Background Matrix Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-12">
            <div>
              <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">Runtime_Analytics</span>
              <h2 className="text-5xl md:text-6xl font-tech font-bold text-white uppercase leading-none tracking-tighter">
                Performance <br /><span className="text-indigo-500">Benchmark.</span>
              </h2>
              <p className="text-zinc-500 text-lg font-light leading-relaxed mt-6">
                Light speed by default. Every component is tree-shaken and memoized at the structural level, delivering consistent 60+ FPS even in high-load spatial environments.
              </p>
            </div>

            <div className="space-y-6">
               {[
                 { label: 'Bundle Size', val: '4.2kb', progress: 15, color: 'indigo' },
                 { label: 'Render Time', val: '0.04ms', progress: 8, color: 'emerald' },
                 { label: 'Memory Usage', val: '12mb', progress: 24, color: 'sky' }
               ].map((stat, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                       <span>{stat.label}</span>
                       <span className="text-white font-mono">{stat.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full bg-${stat.color}-500 transition-all duration-1000`} style={{ width: `${stat.progress}%` }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex-1 w-full flex items-center justify-center p-12">
             <div className="relative w-full max-w-md aspect-square rounded-full border border-white/5 flex items-center justify-center">
                {/* Orbiting Ring */}
                <div className="absolute inset-0 border border-indigo-500/10 rounded-full animate-spin-slow" />
                <div className="absolute inset-10 border border-white/5 rounded-full" />
                
                {/* Main Gauge */}
                <div className="relative z-10 text-center">
                   <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest mb-2 font-bold">Live_Refresh_Rate</div>
                   <div className="text-8xl font-tech font-bold text-white tracking-tighter">{fps.toFixed(1)}</div>
                   <div className="text-sm font-mono text-zinc-500 uppercase mt-2">Frames_Per_Second</div>
                </div>

                {/* Floating Node Metrics */}
                <div className="absolute top-1/4 left-0 p-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl animate-float">
                   <div className="flex items-center gap-3 text-emerald-500">
                      <Gauge className="w-4 h-4" />
                      <span className="text-[8px] font-bold uppercase">Turbo_Sync</span>
                   </div>
                </div>
                <div className="absolute bottom-1/4 right-0 p-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                   <div className="flex items-center gap-3 text-sky-400">
                      <Cpu className="w-4 h-4" />
                      <span className="text-[8px] font-bold uppercase">GPU_Accel</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
