import React, { useState, useContext } from 'react';
import { LayoutGrid, AppWindow, Columns, Rows, Move, MousePointer2, Maximize2 } from 'lucide-react';
import { LanguageContext } from '../App';

type LayoutType = 'dashboard' | 'grid' | 'split';

export const LayoutOrchestrator: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeLayout, setActiveLayout] = useState<LayoutType>('dashboard');

  return (
    <section className="py-32 bg-zinc-50 dark:bg-[#060606] border-y border-black/5 dark:border-white/5" id="layout-orchestrator">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-12">
            <div>
              <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">Spatial_Architecture</span>
              <h2 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
                Layout <br /><span className="text-indigo-500">Orchestrator.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
                Infinite adaptability. Our layout engine handles complex information hierarchies through a flexible, token-based grid system that scales from micro-wearables to ultra-wide displays.
              </p>
            </div>

            <div className="flex flex-col gap-3">
               {[
                 { id: 'dashboard', icon: AppWindow, label: 'Admin_Dashboard' },
                 { id: 'grid', icon: LayoutGrid, label: 'Content_Matrix' },
                 { id: 'split', icon: Columns, label: 'Split_Interface' }
               ].map(layout => (
                 <button 
                   key={layout.id}
                   onClick={() => setActiveLayout(layout.id as LayoutType)}
                   className={`p-6 rounded-3xl border flex items-center justify-between transition-all group ${activeLayout === layout.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl translate-x-2' : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5'}`}
                 >
                    <div className="flex items-center gap-5">
                       <layout.icon className={`w-5 h-5 transition-transform group-hover:rotate-12 ${activeLayout === layout.id ? 'text-white' : 'text-indigo-500'}`} />
                       <span className="text-xs font-bold uppercase tracking-widest">{layout.label}</span>
                    </div>
                    {activeLayout === layout.id && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                 </button>
               ))}
            </div>
          </div>

          <div className="flex-1 w-full h-[600px] bg-white dark:bg-zinc-900/50 rounded-[64px] border border-black/5 dark:border-white/10 relative overflow-hidden shadow-inner flex items-center justify-center group">
             {/* Dynamic Layout Preview */}
             <div className="relative w-full max-w-lg aspect-[1.4/1] bg-black/5 dark:bg-black/20 rounded-[32px] p-6 transition-all duration-700">
                
                {activeLayout === 'dashboard' && (
                  <div className="h-full flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500">
                     <div className="h-1/4 flex gap-4">
                        <div className="flex-1 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl" />
                        <div className="w-24 bg-white/10 rounded-2xl" />
                     </div>
                     <div className="flex-1 flex gap-4">
                        <div className="w-20 bg-white/5 rounded-2xl" />
                        <div className="flex-1 bg-white/10 rounded-2xl border border-white/5" />
                     </div>
                  </div>
                )}

                {activeLayout === 'grid' && (
                  <div className="h-full grid grid-cols-3 grid-rows-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     {[...Array(9)].map((_, i) => (
                       <div key={i} className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl transition-all hover:scale-105 hover:bg-indigo-500/20" />
                     ))}
                  </div>
                )}

                {activeLayout === 'split' && (
                  <div className="h-full flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                     <div className="w-1/3 bg-indigo-600 rounded-2xl shadow-lg" />
                     <div className="flex-1 bg-white/10 rounded-2xl border border-white/5" />
                  </div>
                )}

                {/* Perspective HUD Elements */}
                <div className="absolute -top-12 -right-4 p-4 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-xl">
                   <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Grid_Snapping</div>
                   <div className="text-xs font-bold text-indigo-500">0xENABLED</div>
                </div>
             </div>

             <div className="absolute bottom-12 left-12 flex items-center gap-4">
                <Move className="w-5 h-5 text-indigo-500 animate-bounce" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Adapting_to_Viewport_088...</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
