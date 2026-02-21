import React, { useState } from 'react';
import { 
  MessageSquare, Cloud, Zap, Plus, Search, User, Play, 
  Settings, Share2, Sparkles, MoreVertical, Edit3, Copy, 
  Trash2, Bell, Smartphone, Monitor, Command, ChevronRight
} from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  return (
    <section className="py-32" id="showcase">
      <div className="text-center mb-20">
        <span className="text-[10px] font-tech text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.5em] mb-4 block">Design Patterns</span>
        <h2 className="text-5xl font-tech font-bold tracking-tight mb-6 text-zinc-900 dark:text-white">Unified <span className="text-indigo-500">Molecules.</span></h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          Every component in our system follows refractive spatial logic, ensuring consistency across 2D and 3D space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {/* Spatial Chat Interface */}
        <div className="group relative bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 rounded-[40px] p-8 min-h-[580px] overflow-hidden flex flex-col shadow-lg dark:shadow-none transition-all hover:shadow-2xl">
          <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Chat Material</span>
          </div>

          <div className="space-y-6 flex-1">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0 border border-black/5 dark:border-white/10"></div>
              <div className="p-4 bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-2xl rounded-tl-none border border-black/5 dark:border-white/10 text-xs text-zinc-800 dark:text-zinc-200 shadow-sm">
                Hey! Have you seen the new refraction engine benchmarks?
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <div className="p-4 bg-indigo-600 text-white rounded-2xl rounded-tr-none shadow-xl shadow-indigo-600/20 text-xs font-medium">
                Solid 60fps on mobile. It's butter. 🧈
              </div>
            </div>

            <div className="p-4 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-4 group/file cursor-pointer">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white"><Play className="w-5 h-5 fill-white" /></div>
              <div className="flex-1">
                <div className="h-2 w-24 bg-zinc-800 dark:bg-white/20 rounded-full mb-2"></div>
                <div className="h-1.5 w-16 bg-zinc-400 dark:bg-white/10 rounded-full"></div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          <div className="mt-8 p-1.5 bg-black/5 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5 flex">
             <input type="text" placeholder="Reply..." className="bg-transparent flex-1 px-4 text-xs focus:outline-none text-zinc-900 dark:text-white" />
             <button className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg"><Sparkles className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Status Dashboard Molecule */}
        <div className="group relative bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 rounded-[40px] p-8 min-h-[580px] overflow-hidden flex flex-col shadow-lg dark:shadow-none transition-all hover:shadow-2xl">
           <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Real-time Node</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center border border-black/5 dark:border-white/10"><Settings className="w-4 h-4 text-zinc-400" /></div>
           </div>

           <div className="space-y-6">
              <div className="p-6 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Environment</span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">STABLE</span>
                 </div>
                 <div className="text-4xl font-tech font-bold text-zinc-900 dark:text-white">24.5<span className="text-sm opacity-40 ml-1">GB</span></div>
                 <div className="mt-4 h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[72%] shadow-[0_0_12px_rgba(99,102,241,0.5)]"></div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-3" />
                    <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white">99.9%</div>
                    <div className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Uptime</div>
                 </div>
                 <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-2xl">
                    <Zap className="w-4 h-4 text-pink-600 dark:text-pink-400 mb-3" />
                    <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white">12ms</div>
                    <div className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Latency</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Asset Manager & Context Menu */}
        <div className="group relative bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 rounded-[40px] p-8 min-h-[580px] overflow-hidden flex flex-col shadow-lg dark:shadow-none transition-all hover:shadow-2xl">
           <div className="flex items-center gap-2 mb-8">
            <Plus className="w-4 h-4 text-pink-500" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Asset Manager</span>
          </div>

          <div className="flex-1 space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl group/item cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-item:text-indigo-500"><Command className="w-5 h-5" /></div>
                  <div className="flex-1">
                     <div className="h-1.5 w-24 bg-zinc-800 dark:bg-white/20 rounded-full mb-1.5"></div>
                     <div className="h-1 w-12 bg-zinc-400 dark:bg-white/10 rounded-full"></div>
                  </div>
                  <MoreVertical className="w-4 h-4 text-zinc-400" />
               </div>
             ))}
          </div>

          {/* Context Menu Overlaid (Simulated) */}
          <div className="relative mt-8 p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl animate-float">
             <div className="p-1.5 space-y-1">
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 cursor-pointer">
                   <div className="flex items-center gap-3"><Edit3 className="w-3.5 h-3.5" /> Edit Layer</div>
                   <span className="opacity-40 font-mono">⌘E</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold text-zinc-500 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                   <div className="flex items-center gap-3"><Copy className="w-3.5 h-3.5" /> Duplicate</div>
                   <span className="opacity-40 font-mono">⌘D</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold text-red-500 hover:bg-red-500/10 cursor-pointer">
                   <div className="flex items-center gap-3"><Trash2 className="w-3.5 h-3.5" /> Delete</div>
                   <span className="opacity-40 font-mono">⌫</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* The Spatial Dock */}
      <div className="relative flex justify-center py-12">
         <div className="p-4 bg-white/60 dark:bg-black/40 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[32px] shadow-2xl flex items-end gap-5 group/dock transition-all hover:px-8">
            {[Smartphone, Monitor, Zap, User, Command, Search, Sparkles, Bell].map((Icon, i) => (
              <div 
                key={i} 
                className="w-12 h-12 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white transition-all duration-300 hover:scale-[1.5] hover:-translate-y-4 hover:mx-4 cursor-pointer shadow-sm active:scale-95 group/icon"
              >
                <Icon className="w-5 h-5 transition-transform group-hover/icon:scale-110" />
                <div className="absolute -bottom-1.5 w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
              </div>
            ))}
            <div className="w-[1px] h-8 bg-black/5 dark:bg-white/10 mx-2 mb-2"></div>
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.5] hover:-translate-y-4 hover:mx-4 transition-all cursor-pointer">
               <Plus className="w-6 h-6" />
            </div>
         </div>
      </div>
    </section>
  );
};