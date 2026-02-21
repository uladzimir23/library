import React, { useState, useContext } from 'react';
import { LayoutGrid, AppWindow, Columns, Rows, Move, Search, Settings, User, Bell, Radio, Maximize } from 'lucide-react';
import { LanguageContext } from '../App';

export const RefractiveHUD: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState(0);

  const menu = [
    { icon: LayoutGrid, label: 'Dashboard' },
    { icon: Search, label: 'Analytics' },
    { icon: User, label: 'Profiles' },
    { icon: Bell, label: 'Signals' },
    { icon: Settings, label: 'Kernel' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#080808]" id="refractive-hud">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              HUD_Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Refractive <br /><span className="text-cyan-500">HUD_System.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Navigation is more than links. It's a spatial anchor. Our HUD system uses layered refraction to establish hierarchy, bringing active elements into sharp focus while gracefully blurring the background.
            </p>
          </div>

          <div className="space-y-4">
             {menu.map((item, i) => (
               <div 
                 key={i}
                 onClick={() => setActiveTab(i)}
                 className={`flex items-center justify-between p-6 rounded-[32px] border transition-all cursor-pointer group ${activeTab === i ? 'bg-cyan-500 border-cyan-400 text-white shadow-xl translate-x-4' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
               >
                  <div className="flex items-center gap-4">
                     <item.icon className="w-5 h-5" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === i ? 'bg-white' : 'bg-zinc-700 opacity-20'}`} />
               </div>
             ))}
          </div>
        </div>

        <div className="flex-1 w-full h-[650px] relative flex items-center justify-center perspective-2000 group">
           {/* Background Mesh (Data Stream) */}
           <div className="absolute inset-20 opacity-10 bg-[radial-gradient(circle_at_center,#22d3ee_1px,transparent_1px)] bg-[length:30px_30px]" />

           {/* The HUD Panel Stack */}
           <div className="relative w-96 h-[500px] preserve-3d transition-transform duration-1000 group-hover:rotate-Y-12">
              
              {/* Ghost Layers */}
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/5 rounded-[48px] pointer-events-none transition-all duration-700"
                  style={{ 
                    transform: `translateZ(${(i+1) * -30}px) scale(${1 - i * 0.05})`,
                    backgroundColor: `rgba(34, 211, 238, ${0.02 * (3-i)})`,
                    backdropFilter: `blur(${i * 10}px)`
                  }}
                />
              ))}

              {/* Main Sidebar Component */}
              <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-24 h-[400px] bg-white/20 dark:bg-zinc-900/40 backdrop-blur-3xl border border-white/20 rounded-full shadow-2xl flex flex-col items-center justify-center gap-8 py-10 z-30">
                 {menu.map((item, i) => (
                   <div 
                     key={i} 
                     className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${activeTab === i ? 'bg-cyan-500 text-white shadow-xl scale-125' : 'bg-black/5 dark:bg-white/5 text-zinc-500 hover:text-cyan-400'}`}
                   >
                      <item.icon className="w-5 h-5" />
                   </div>
                 ))}
              </div>

              {/* Content Plate */}
              <div className="absolute inset-0 bg-white/5 dark:bg-zinc-900/10 backdrop-blur-md border border-white/10 rounded-[48px] shadow-2xl p-12 flex flex-col justify-between z-20">
                 <div className="flex justify-between items-start">
                    <div className="w-16 h-1 bg-cyan-500 rounded-full" />
                    <Radio className="w-5 h-5 text-cyan-500 animate-pulse" />
                 </div>
                 <div className="space-y-6">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active_Node: 0x88.2</div>
                    <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none">{menu[activeTab].label}</h3>
                    <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${(activeTab + 1) * 20}%` }} />
                    </div>
                 </div>
                 <div className="pt-8 border-t border-black/5 dark:border-white/5 flex justify-between">
                    <Maximize className="w-4 h-4 text-zinc-400" />
                    <span className="text-[8px] font-mono text-zinc-500">REFRACTION_STABLE: 100%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
