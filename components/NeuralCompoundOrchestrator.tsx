import React, { useState, useContext, useEffect } from 'react';
import { BarChart3, Terminal, Activity, Zap, Shield, Cpu, ArrowUpRight, Share2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralCompoundOrchestrator: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(false);
  const [streamData, setStreamData] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setStreamData(prev => [`0x${Math.random().toString(16).slice(2, 6)}: CALIBRATED`, ...prev.slice(0, 3)]);
      setTimeout(() => setPulse(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#080808]" id="orchestrator">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          Complex_System_Design
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
          Neural <br /><span className="text-indigo-500">Orchestrator.</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-3xl mx-auto mt-6">
          Intelligence in composition. This orchestrator synchronizes charts, telemetry, and terminal streams into a single coherent organic entity, visualizing the propagation of data through the spatial stack.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[700px]">
           
           {/* Left: Telemetry Panel */}
           <div className="lg:col-span-4 grid grid-rows-3 gap-8 h-full">
              {[
                { icon: Cpu, label: 'Compute_Load', val: '42%', color: 'indigo' },
                { icon: Shield, label: 'Security_Bay', val: 'LOCKED', color: 'emerald' },
                { icon: Activity, label: 'Network_IO', val: '8.4 GB/s', color: 'rose' }
              ].map((item, i) => (
                <div key={i} className="bg-white/30 dark:bg-zinc-900/40 border border-black/5 dark:border-white/10 rounded-[40px] p-8 flex flex-col justify-between group hover:border-indigo-500/30 transition-all shadow-xl dark:shadow-none">
                   <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-500 transition-transform group-hover:rotate-12`}>
                         <item.icon className="w-6 h-6" />
                      </div>
                      <Zap className={`w-4 h-4 ${pulse ? 'text-indigo-500' : 'text-zinc-300 dark:text-zinc-700'}`} />
                   </div>
                   <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">{item.val}</div>
                   </div>
                </div>
              ))}
           </div>

           {/* Center: Main Visualization hub */}
           <div className="lg:col-span-8 bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden flex flex-col p-12 shadow-2xl group">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_1px,transparent_1px)] bg-[length:32px_32px]" />
              
              <div className="flex justify-between items-start z-10 mb-12">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                       <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-tech font-bold text-white uppercase tracking-widest">Mainframe_Metrics</h3>
                       <div className="text-[8px] font-mono text-indigo-400 uppercase">Buffer_Realtime_Stream_0x88.A</div>
                    </div>
                 </div>
                 <ArrowUpRight className="w-6 h-6 text-zinc-600" />
              </div>

              {/* Chart Visualization */}
              <div className="flex-1 flex items-end gap-3 px-4 z-10">
                 {Array.from({length: 12}).map((_, i) => (
                   <div 
                     key={i} 
                     className="flex-1 rounded-t-xl transition-all duration-1000 bg-indigo-500/20 border-t border-x border-white/10 relative overflow-hidden"
                     style={{ 
                       height: `${30 + Math.random() * 60}%`,
                       backgroundColor: pulse && i % 3 === 0 ? 'rgba(99, 102, 241, 0.4)' : undefined,
                       borderColor: pulse && i % 3 === 0 ? 'rgba(99, 102, 241, 0.6)' : undefined
                     }}
                   >
                      <div className={`absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent transition-opacity ${pulse ? 'opacity-100' : 'opacity-0'}`} />
                   </div>
                 ))}
              </div>

              {/* Internal Terminal HUD */}
              <div className="mt-12 bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-[10px] space-y-1 z-10 h-32 overflow-hidden">
                 <div className="flex justify-between text-zinc-600 mb-4 border-b border-white/5 pb-2">
                    <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> System_Logs</span>
                    <span>COH_LEVEL: 94%</span>
                 </div>
                 {streamData.map((line, i) => (
                   <div key={i} className="text-indigo-400 opacity-60 animate-in slide-in-from-top-1 duration-300">
                      {line}
                   </div>
                 ))}
                 {streamData.length === 0 && <div className="text-zinc-800 uppercase tracking-widest">Initializing_Data_Link...</div>}
              </div>

              {/* Syringe Link Connection Effect */}
              <div className={`absolute bottom-24 right-24 transition-all duration-700 ${pulse ? 'scale-150 opacity-10' : 'scale-100 opacity-0'}`}>
                 <Share2 className="w-64 h-64 text-indigo-500" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
