import React, { useState, useContext, useEffect, useRef } from 'react';
import { Network, Zap, Share2, Activity, Shield, Box, ChevronRight, Cpu } from 'lucide-react';
import { LanguageContext } from '../App';

export const NexusCascade: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeSignal, setActiveSignal] = useState<number | null>(null);
  const [cascadeStep, setCascadeStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const triggerCascade = () => {
    setCascadeStep(0);
    setActiveSignal(Date.now());
  };

  useEffect(() => {
    if (activeSignal) {
      const interval = setInterval(() => {
        setCascadeStep(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [activeSignal]);

  return (
    <section ref={sectionRef} className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5 overflow-hidden" id="nexus">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.nexus.tag}
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.nexus.title} <span className="text-indigo-500">{t.nexus.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-3xl mx-auto mt-6">
          {t.nexus.desc}
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* The Root Node with enhanced ripple */}
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full animate-pulse" />
          <button 
            onClick={triggerCascade}
            className={`relative z-20 w-24 h-24 rounded-[32px] bg-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 ${cascadeStep > 0 ? 'shadow-[0_0_60px_rgba(79,70,229,0.6)]' : ''}`}
          >
             <Network className={`w-10 h-10 ${cascadeStep > 0 ? 'animate-pulse' : ''}`} />
          </button>
          
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-indigo-500 uppercase tracking-[0.3em] font-bold">
            Master_Link_v10
          </div>
        </div>

        {/* Dynamic Connection Web */}
        <div className="w-full max-w-5xl h-[450px] relative mt-8">
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
              <mask id="dashMask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
              </mask>
            </defs>
            
            {[0, 1, 2, 3].map((i) => {
              const isActive = cascadeStep > i;
              const isNodeHovered = hoveredNode === i;
              return (
                <g key={i}>
                  {/* Base Connection Path */}
                  <path 
                    d={`M 50% 0 Q 50% 50% ${12 + i * 25.3}% 100%`}
                    fill="none" 
                    stroke={isActive || isNodeHovered ? "#6366f1" : "currentColor"}
                    strokeWidth={isActive ? "2.5" : "1"}
                    className={`transition-all duration-700 opacity-10 dark:opacity-20 ${isActive || isNodeHovered ? 'opacity-100 dark:opacity-100' : ''}`}
                  />
                  
                  {/* Energy Impulse Animation */}
                  {(isActive || isNodeHovered) && (
                    <circle r="3" fill="#6366f1">
                      <animateMotion 
                        dur={isNodeHovered ? "1.5s" : "3s"} 
                        repeatCount="indefinite" 
                        path={`M 50% 0 Q 50% 50% ${12 + i * 25.3}% 100%`}
                      />
                      <animate r="3" values="3;5;3" dur="1s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Enhanced Child Nodes */}
          <div className="absolute bottom-0 inset-x-0 flex justify-between px-2">
             {[
               { icon: Shield, label: 'Encryption' },
               { icon: Box, label: 'Storage' },
               { icon: Activity, label: 'Telemetry' },
               { icon: Share2, label: 'Distribution' }
             ].map((node, i) => {
               const isActive = cascadeStep > i;
               const isTarget = hoveredNode === i;
               return (
                 <div 
                   key={i}
                   onMouseEnter={() => setHoveredNode(i)}
                   onMouseLeave={() => setHoveredNode(null)}
                   className={`w-36 p-7 bg-white/40 dark:bg-zinc-900/60 border rounded-[32px] transition-all duration-500 flex flex-col items-center gap-5 cursor-pointer group/node ${
                     isActive || isTarget ? 'border-indigo-500/60 scale-105 shadow-2xl bg-white dark:bg-zinc-900 translate-y-[-10px]' : 'border-black/5 dark:border-white/5 opacity-50'
                   }`}
                 >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive || isTarget ? 'bg-indigo-600 text-white shadow-lg rotate-12' : 'bg-zinc-500/10 text-zinc-500'}`}>
                       <node.icon className={`w-6 h-6 ${isTarget ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="text-center">
                       <div className="text-[8px] font-mono text-zinc-400 uppercase mb-1 tracking-tighter">System_0x0{i}</div>
                       <div className="text-[11px] font-bold text-zinc-900 dark:text-white uppercase tracking-widest">{node.label}</div>
                    </div>
                    
                    {/* Tiny Status Indicator */}
                    <div className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                 </div>
               );
             })}
          </div>
        </div>

        {/* Global HUD Display */}
        <div className="mt-20 flex flex-col items-center gap-8">
           <div className="flex gap-10 px-10 py-5 bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[32px]">
              <div className="flex items-center gap-3">
                 <Cpu className={`w-5 h-5 ${cascadeStep === 4 ? 'text-indigo-500' : 'text-zinc-500'}`} />
                 <div>
                    <div className="text-[9px] font-bold text-zinc-400 uppercase">Process_Load</div>
                    <div className="text-xs font-mono text-zinc-900 dark:text-white">{(cascadeStep * 25)}% Capacity</div>
                 </div>
              </div>
              <div className="w-[1px] h-10 bg-black/10 dark:bg-white/10" />
              <div className="flex items-center gap-3">
                 <Activity className={`w-5 h-5 ${cascadeStep > 0 ? 'text-emerald-500' : 'text-zinc-500'}`} />
                 <div>
                    <div className="text-[9px] font-bold text-zinc-400 uppercase">Sync_Coherence</div>
                    <div className="text-xs font-mono text-zinc-900 dark:text-white">{cascadeStep === 4 ? '99.98%' : 'Indexing...'}</div>
                 </div>
              </div>
           </div>
           
           <div className="text-[10px] font-tech text-zinc-400 uppercase tracking-[0.5em] animate-pulse">
             Monitoring Internal Cascade Protocols...
           </div>
        </div>
      </div>
    </section>
  );
};
