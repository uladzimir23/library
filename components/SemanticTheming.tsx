import React, { useState, useContext } from 'react';
import { Palette, Droplet, Sun, Moon, RefreshCw, Zap, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

type ThemePreset = 'indigo' | 'emerald' | 'rose' | 'amber';

export const SemanticTheming: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activePreset, setActivePreset] = useState<ThemePreset>('indigo');

  const presets = {
    indigo: { color: '#6366f1', bg: 'bg-indigo-500', text: 'text-indigo-500', glow: 'shadow-indigo-500/20' },
    emerald: { color: '#10b981', bg: 'bg-emerald-500', text: 'text-emerald-500', glow: 'shadow-emerald-500/20' },
    rose: { color: '#f43f5e', bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-500/20' },
    amber: { color: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-500', glow: 'shadow-amber-500/20' }
  };

  return (
    <section className="py-32 bg-white dark:bg-zinc-950 border-y border-black/5 dark:border-white/5" id="theming">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-12">
            <div>
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">DNA_Recalibration</span>
              <h2 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
                Semantic <br /><span className={presets[activePreset].text}>Theming.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
                Brand integration in seconds. Our library uses semantic tokens that can be hot-swapped at runtime, allowing for instant global visual updates without recompiling.
              </p>
            </div>

            <div className="flex gap-4">
               {(['indigo', 'emerald', 'rose', 'amber'] as ThemePreset[]).map(p => (
                 <button 
                   key={p}
                   onClick={() => setActivePreset(p)}
                   className={`w-14 h-14 rounded-full border-4 transition-all duration-300 ${activePreset === p ? 'border-zinc-900 dark:border-white scale-110' : 'border-transparent scale-100'}`}
                   style={{ backgroundColor: presets[p].color }}
                 />
               ))}
            </div>

            <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 space-y-6">
               <div className="flex items-center gap-4 text-zinc-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Active_Token_Map</span>
               </div>
               <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div className="text-zinc-500">--brand-primary:</div>
                  <div className={presets[activePreset].text}>{presets[activePreset].color}</div>
                  <div className="text-zinc-500">--surface-blur:</div>
                  <div className="text-zinc-900 dark:text-white">24px</div>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full h-[600px] flex items-center justify-center relative">
             {/* Preview Cards */}
             <div className="relative w-full max-w-sm h-96">
                <div 
                  className={`absolute inset-0 bg-white dark:bg-zinc-900/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[56px] shadow-2xl transition-all duration-700 flex flex-col p-10 justify-between ${presets[activePreset].glow}`}
                >
                   <div className="flex justify-between items-start">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white transition-colors duration-700 ${presets[activePreset].bg}`}>
                         <Zap className="w-8 h-8 fill-current" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                         <RefreshCw className="w-4 h-4 text-zinc-400" />
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className={`h-1 w-24 rounded-full transition-colors duration-700 ${presets[activePreset].bg}`} />
                      <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white uppercase">Theme_Preview</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">Dynamic token propagation established across the entire nodal network.</p>
                   </div>
                   
                   <button className={`w-full py-4 rounded-xl text-white font-bold text-[10px] uppercase tracking-widest transition-colors duration-700 ${presets[activePreset].bg}`}>Initialize_Sync</button>
                </div>

                {/* Floating HUD */}
                <div className="absolute -bottom-6 -left-6 p-4 bg-zinc-900 text-white rounded-2xl shadow-2xl border border-white/10 scale-90">
                   <div className="flex items-center gap-3">
                      <Palette className="w-4 h-4 text-indigo-400" />
                      <span className="text-[8px] font-mono font-bold uppercase">Color_Sync: OK</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
