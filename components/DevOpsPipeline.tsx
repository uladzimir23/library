import React, { useState, useContext, useEffect } from 'react';
import { Cloud, Zap, Shield, CheckCircle2, Server, Globe, Activity, ArrowRight, Loader2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const DevOpsPipeline: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [step, setStep] = useState(0); // 0: Idle, 1: Build, 2: Test, 3: Deploy
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step > 0 && step < 4) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStep(s => s + 1);
            return 0;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    if (step === 4) setProgress(100);
  }, [step]);

  const stages = [
    { label: 'Source', icon: Zap, color: 'text-indigo-500' },
    { label: 'Build', icon: Loader2, color: 'text-amber-500' },
    { label: 'Test', icon: Shield, color: 'text-sky-500' },
    { label: 'Deploy', icon: Globe, color: 'text-emerald-500' }
  ];

  return (
    <section className="py-32 bg-white dark:bg-[#050507] border-y border-black/5 dark:border-white/5" id="devops-pipeline">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
                Infrastructure_v10
              </span>
              <h2 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
                Deployment <br /><span className="text-indigo-500">Pipeline.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-500 text-lg font-light leading-relaxed max-w-lg mt-6">
                From local commit to global scale in milliseconds. Our automated delivery engine ensures that every pixel is built, tested, and distributed across a resilient spatial edge network.
              </p>
            </div>

            <div className="flex flex-col gap-6">
               <button 
                 onClick={() => { setStep(1); setProgress(0); }}
                 disabled={step > 0 && step < 4}
                 className={`w-full lg:w-auto px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${step === 4 ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50'}`}
               >
                 {step === 4 ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                 {step === 0 ? 'Initialize_Shipment' : step === 4 ? 'Deployment_Complete' : 'Processing_Pipeline...'}
               </button>
               
               <div className="flex items-center gap-4 text-zinc-400 font-mono text-[9px] uppercase tracking-widest">
                  <Server className="w-4 h-4" />
                  Cluster_Node: AMS-088.Active
               </div>
            </div>
          </div>

          <div className="flex-1 w-full relative h-[500px] flex items-center justify-center">
             {/* Pipeline Line */}
             <div className="absolute w-[80%] h-[2px] bg-zinc-100 dark:bg-zinc-800" />
             
             <div className="flex justify-between w-full max-w-2xl relative z-10">
                {stages.map((stage, i) => {
                  const isActive = step === i + 1;
                  const isDone = step > i + 1;
                  const isPending = step <= i;
                  
                  return (
                    <div key={i} className="flex flex-col items-center gap-6 relative">
                       <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 border-2 ${
                         isActive ? `bg-white dark:bg-zinc-900 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] scale-125` :
                         isDone ? `bg-emerald-500 border-emerald-400 text-white` :
                         `bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400`
                       }`}>
                          <stage.icon className={`w-6 h-6 ${isActive ? stage.color + ' animate-pulse' : ''} ${isActive && stage.label === 'Build' ? 'animate-spin' : ''}`} />
                       </div>
                       <div className="text-center">
                          <div className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? stage.color : isDone ? 'text-emerald-500' : 'text-zinc-500'}`}>{stage.label}</div>
                          {isActive && (
                            <div className="mt-2 text-[8px] font-mono text-zinc-400 uppercase">{progress}%</div>
                          )}
                       </div>

                       {/* Connectors Progress */}
                       {i < stages.length - 1 && (
                         <div className="absolute top-8 left-16 w-32 h-[2px] bg-zinc-100 dark:bg-zinc-800 -z-10 overflow-hidden">
                            <div className={`h-full bg-indigo-500 transition-all duration-300 ${isDone ? 'w-full' : 'w-0'}`} />
                         </div>
                       )}
                    </div>
                  );
                })}
             </div>

             {/* Live Activity HUD */}
             <div className="absolute top-10 right-0 p-6 bg-white dark:bg-zinc-900/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[32px] shadow-2xl transition-all duration-500 group-hover:scale-105">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                   <Activity className="w-4 h-4 animate-pulse" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Network_Throughput</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                   842 <span className="text-xs opacity-40">ms</span>
                </div>
                <div className="mt-4 flex gap-1">
                   {[1, 2, 3, 4, 5, 6].map(i => (
                     <div key={i} className="w-1.5 h-4 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div className="w-full bg-emerald-500 animate-bounce" style={{ height: `${Math.random()*100}%`, animationDelay: `${i*0.1}s` }} />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
