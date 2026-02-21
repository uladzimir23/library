import React, { useState, useContext } from 'react';
import { Database, Palette, Maximize, Layers, Zap, RefreshCw, Circle } from 'lucide-react';
import { LanguageContext } from '../App';

export const TokenDynamics: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeColor, setActiveColor] = useState('#6366f1');
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);

  const tokens = [
    { id: 'primary', color: '#6366f1', label: '--fg-brand-main' },
    { id: 'accent', color: '#10b981', label: '--fg-accent-vivid' },
    { id: 'danger', color: '#f43f5e', label: '--fg-status-error' },
    { id: 'warning', color: '#f59e0b', label: '--fg-status-warn' },
    { id: 'info', color: '#0ea5e9', label: '--fg-status-info' },
    { id: 'surface', color: '#a1a1aa', label: '--fg-surface-layer' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="tokens">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              System_Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Token <br /><span className="text-indigo-500">Dynamics.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              The DNA of our design system. We treat variables as dynamic entities. Every token is a physical constant that propagates through the entire spatial lattice instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {tokens.map((token) => (
               <div 
                 key={token.id}
                 onMouseEnter={() => setHoveredToken(token.label)}
                 onMouseLeave={() => setHoveredToken(null)}
                 onClick={() => setActiveColor(token.color)}
                 className={`p-5 rounded-3xl border cursor-pointer transition-all duration-500 flex items-center gap-4 ${activeColor === token.color ? 'bg-white dark:bg-zinc-900 border-indigo-500 shadow-xl scale-105' : 'bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10'}`}
               >
                  <div className="w-10 h-10 rounded-full shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: token.color }} />
                  <div>
                    <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Global_Token</div>
                    <div className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase">{token.id}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] relative flex items-center justify-center">
           {/* Large Preview Orb */}
           <div className="relative w-96 h-96 transition-all duration-1000 ease-out preserve-3d">
              <div 
                className="absolute inset-0 rounded-full blur-[120px] opacity-20 transition-all duration-1000"
                style={{ backgroundColor: activeColor }}
              />
              
              <div 
                className="absolute inset-0 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-3xl border-2 rounded-full shadow-2xl flex flex-col items-center justify-center p-12 transition-all duration-700"
                style={{ borderColor: `${activeColor}44` }}
              >
                 <div 
                   className="w-32 h-32 rounded-[40px] flex items-center justify-center text-white shadow-2xl transition-all duration-700 mb-8"
                   style={{ backgroundColor: activeColor, boxShadow: `0 20px 40px -10px ${activeColor}66` }}
                 >
                    <RefreshCw className="w-16 h-16 animate-spin-slow" />
                 </div>
                 
                 <div className="text-center">
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-zinc-900 dark:text-white">Active_Variable</div>
                    <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white tracking-tighter uppercase">{hoveredToken || '0xMASTER_DNA'}</div>
                 </div>

                 <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Propagation_Sync: OK</span>
                 </div>
              </div>
           </div>

           {/* Floating Info */}
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">State_Value</div>
              <div className="text-2xl font-tech font-bold transition-colors duration-500" style={{ color: activeColor }}>{activeColor.toUpperCase()}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
