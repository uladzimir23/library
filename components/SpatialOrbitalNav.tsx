import React, { useState, useContext, useEffect } from 'react';
import { Globe, User, Settings, Command, Search, Bell, Zap, Sliders, Navigation } from 'lucide-react';
import { LanguageContext } from '../App';

export const SpatialOrbitalNav: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [rotation, setRotation] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { icon: User, label: 'Identity' },
    { icon: Globe, label: 'Network' },
    { icon: Zap, label: 'Energy' },
    { icon: Settings, label: 'Protocol' },
    { icon: Search, label: 'Discovery' },
    { icon: Bell, label: 'Signals' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + 0.1);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 overflow-hidden" id="orbital-nav">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
                Navigation_Future
              </span>
              <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
                Spatial <br /><span className="text-cyan-500">Orbital_Nav.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
                Escape the linear. Experience orbital navigation where every interaction is a gravitational shift. Designed for immersive 3D cockpits and high-density information hubs.
              </p>
            </div>

            <div className="space-y-4">
               {menuItems.map((item, i) => (
                 <div 
                   key={i}
                   onMouseEnter={() => setActiveItem(i)}
                   className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${activeItem === i ? 'bg-cyan-500 border-cyan-400 text-white shadow-xl translate-x-2' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
                 >
                    <div className="flex items-center gap-4">
                       <item.icon className="w-5 h-5" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                    <Navigation className={`w-4 h-4 transition-opacity duration-500 ${activeItem === i ? 'opacity-100' : 'opacity-0'}`} />
                 </div>
               ))}
            </div>
          </div>

          <div className="flex-1 w-full h-[650px] relative flex items-center justify-center group perspective-2000">
             {/* Center Anchor */}
             <div className="relative z-10 w-32 h-32 bg-white/5 border border-white/20 rounded-full flex flex-col items-center justify-center shadow-2xl backdrop-blur-3xl transition-transform duration-500 group-hover:scale-110">
                <Command className="w-10 h-10 text-cyan-500 animate-pulse" />
                <div className="mt-2 text-[7px] font-mono text-cyan-500 uppercase tracking-widest">Nav_Core</div>
             </div>

             {/* Orbit Tracks */}
             <div className="absolute w-[450px] h-[450px] border border-cyan-500/10 rounded-full" />
             <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full" />

             {/* Orbital Items */}
             <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${rotation}deg)` }}>
                {menuItems.map((item, i) => {
                  const angle = (i * 360) / menuItems.length;
                  const isActive = activeItem === i;
                  return (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 pointer-events-auto"
                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-225px) rotate(-${angle + rotation}deg)` }}
                    >
                       <div 
                         onMouseEnter={() => setActiveItem(i)}
                         className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center transition-all duration-700 border shadow-2xl cursor-pointer ${
                           isActive ? 'bg-cyan-500 border-cyan-400 text-white scale-125 rotate-12' : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10'
                         }`}
                       >
                          <item.icon className={`w-8 h-8 ${isActive ? 'animate-pulse' : ''}`} />
                          {isActive && <div className="absolute -bottom-10 text-[9px] font-bold text-cyan-500 uppercase tracking-widest whitespace-nowrap">{item.label}</div>}
                       </div>
                       
                       {/* Connection Laser */}
                       {isActive && (
                         <div className="absolute top-1/2 left-1/2 w-[225px] h-[1px] bg-gradient-to-r from-cyan-500 to-transparent origin-left rotate-90 opacity-40 translate-y-10" />
                       )}
                    </div>
                  );
                })}
             </div>

             {/* HUD Markers */}
             <div className="absolute top-12 right-12 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Orbital_Sync: OK</span>
             </div>
             
             <div className="absolute bottom-12 left-12 p-6 bg-zinc-900 border border-white/5 rounded-2xl shadow-2xl opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 mb-2">
                   <Sliders className="w-4 h-4 text-cyan-500" />
                   <span className="text-[8px] font-bold text-zinc-400 uppercase">Gyro_State</span>
                </div>
                <div className="text-sm font-mono text-white">ROT_RAD: {rotation.toFixed(2)}</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
