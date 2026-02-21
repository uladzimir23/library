import React, { useState, useContext, useRef } from 'react';
import { Orbit, Zap, Cpu, Radio, Shield, Activity, Share2, Target } from 'lucide-react';
import { LanguageContext } from '../App';

export const VolumetricSatelliteSystem: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isHubHovered, setIsHubHovered] = useState(false);
  const [activeSat, setActiveSat] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const satellites = [
    { icon: Cpu, label: 'Compute', color: 'indigo' },
    { icon: Radio, label: 'Signal', color: 'emerald' },
    { icon: Shield, label: 'Security', color: 'rose' },
    { icon: Activity, label: 'Metrics', color: 'amber' }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="satellite-system">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Compound_Architecture_v1
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Satellite <br /><span className="text-indigo-500">Orchestration.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are cosmic systems. This compound module features a central logic hub that exerts gravitational pull on satellite data nodes, dynamically reorganizing based on user focus levels.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
             <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                <span>Gravitational_Bias: {isHubHovered ? 'MAX' : 'STABLE'}</span>
                <span className="text-indigo-500">Nodes: 04</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-indigo-500 transition-all duration-700 ${isHubHovered ? 'w-full' : 'w-1/4'}`} />
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group perspective-2000 shadow-2xl"
        >
           {/* Orbital Rings */}
           <div className={`absolute w-[450px] h-[450px] border border-white/5 rounded-full transition-all duration-1000 ${isHubHovered ? 'scale-75 opacity-20' : 'scale-100 opacity-100'}`} />
           <div className={`absolute w-[300px] h-[300px] border border-indigo-500/10 rounded-full transition-all duration-1000 ${isHubHovered ? 'scale-90 opacity-40' : 'scale-100 opacity-100'}`} />

           {/* The Hub (Center) */}
           <div 
             onMouseEnter={() => setIsHubHovered(true)}
             onMouseLeave={() => setIsHubHovered(false)}
             className={`relative z-20 w-40 h-40 bg-white/5 border-2 border-white/10 rounded-full flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl transition-all duration-700 ${activeSat !== null ? 'blur-sm scale-90 opacity-40' : 'blur-0 scale-100'}`}
             style={{ transform: `rotateX(${mousePos.y * 20}deg) rotateY(${mousePos.x * 20}deg)` }}
           >
              <div className="absolute inset-4 border border-dashed border-indigo-500/30 rounded-full animate-spin-slow" />
              <Target className="w-12 h-12 text-indigo-500 mb-2 animate-pulse" />
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Logic_Hub_v10</div>
           </div>

           {/* Satellites */}
           {satellites.map((sat, i) => {
             const angle = (i * 90) + (isHubHovered ? 0 : 45);
             const radius = isHubHovered ? 120 : 220;
             const isThisActive = activeSat === i;

             return (
               <div 
                 key={i}
                 onMouseEnter={() => setActiveSat(i)}
                 onMouseLeave={() => setActiveSat(null)}
                 className="absolute z-30 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
                 style={{ 
                   transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) scale(${isThisActive ? 1.2 : 1})`,
                 }}
               >
                  <div className={`w-20 h-20 rounded-3xl backdrop-blur-2xl border transition-all duration-500 flex items-center justify-center cursor-pointer shadow-2xl ${isThisActive ? `bg-${sat.color}-500 border-white text-white rotate-12` : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10'}`}>
                     <sat.icon className="w-8 h-8" />
                     {isThisActive && (
                       <div className="absolute -top-12 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                          {sat.label}_Active
                       </div>
                     )}
                  </div>
                  
                  {/* Energy Tether */}
                  <div 
                    className={`absolute top-1/2 left-1/2 w-[200px] h-[1px] origin-left -z-10 transition-all duration-1000 opacity-20`}
                    style={{ 
                      width: `${radius}px`,
                      transform: `rotate(180deg)`,
                      background: `linear-gradient(90deg, ${isThisActive ? sat.color : 'rgba(255,255,255,0.2)'}, transparent)`
                    }}
                  />
               </div>
             );
           })}

           {/* Perspective Labels */}
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">System_Mode</div>
              <div className="text-xl font-tech font-bold text-indigo-400">0xCOHESIVE_ORBIT</div>
           </div>
        </div>
      </div>
    </section>
  );
};
