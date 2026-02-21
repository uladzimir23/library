
import React, { useState, useContext, useRef, useEffect } from 'react';
// Added missing Shield import from lucide-react
import { Compass, Globe, Zap, Settings, Target, Layers, Radio, Share2, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const RefractiveNavigationCore: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeRing, setActiveRing] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + (activeRing !== null ? 0.05 : 0.4));
    }, 20);
    return () => clearInterval(timer);
  }, [activeRing]);

  const rings = [
    { label: 'Compute', icon: Zap, color: 'indigo', radius: 180 },
    { label: 'Network', icon: Globe, color: 'emerald', radius: 260 },
    { label: 'Security', icon: ShieldCheck, color: 'rose', radius: 340 }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              03_Orbital_Dynamics_v11
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Навигационное <br /><span className="text-rose-500">Ядро.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Космическая иерархия. Система управления построена на орбитальных кольцах, которые замедляются при фокусе, открывая доступ к глубоким слоям данных через линзу Z-проекции.
            </p>
          </div>

          <div className="space-y-4">
             {rings.map((ring, i) => (
               <div 
                 key={i}
                 onMouseEnter={() => setActiveRing(i)}
                 onMouseLeave={() => setActiveRing(null)}
                 className={`p-6 rounded-[32px] border transition-all duration-500 flex items-center justify-between cursor-pointer group ${activeRing === i ? 'bg-rose-500 border-rose-400 text-white translate-x-4 shadow-xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
               >
                  <div className="flex items-center gap-5">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeRing === i ? 'bg-white/20 scale-110' : 'bg-rose-500/10'}`}>
                        <ring.icon className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest">Orbital_Slice_0{i}</div>
                        <span className="text-xl font-tech font-bold uppercase tracking-widest">{ring.label}</span>
                     </div>
                  </div>
                  <Radio className={`w-5 h-5 ${activeRing === i ? 'animate-pulse' : 'opacity-10'}`} />
               </div>
             ))}
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-[1.5] w-full h-[700px] bg-zinc-950 rounded-[80px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 perspective-2000"
        >
           {/* Center Anchor Sphere */}
           <div className="relative w-48 h-48 bg-white/5 border border-white/10 rounded-full flex flex-col items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_rgba(244,63,94,0.15)] z-20 transition-all duration-1000 group-hover:scale-110">
              <div className="absolute inset-4 border border-dashed border-rose-500/20 rounded-full animate-[spin_15s_linear_infinite]" />
              <Compass className="w-12 h-12 text-rose-500 animate-pulse" />
              <div className="mt-2 text-[8px] font-mono text-rose-400 uppercase tracking-widest">Nav_Core_v11</div>
           </div>

           {/* Orbital Rings with Perspective */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {rings.map((ring, i) => (
                <div 
                  key={i}
                  className="absolute border border-white/5 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${ring.radius * 2}px`, 
                    height: `${ring.radius * 2}px`,
                    transform: `rotateX(75deg) rotateY(${mousePos.x * 20}deg) rotateZ(${rotation * (i % 2 === 0 ? 1 : -1)}deg)`,
                    opacity: activeRing === i ? 0.8 : 0.2,
                    borderColor: activeRing === i ? '#f43f5e' : 'rgba(255,255,255,0.05)',
                    borderWidth: activeRing === i ? '2px' : '1px'
                  }}
                >
                   {/* Node on the ring */}
                   <div 
                     className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center transition-all duration-500 ${activeRing === i ? 'scale-150 rotate-[-75deg] bg-rose-600 text-white shadow-2xl' : 'text-zinc-700'}`}
                   >
                      <ring.icon className="w-6 h-6" />
                      {activeRing === i && (
                        <div className="absolute -top-12 bg-white text-zinc-900 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-xl">
                           Initialize_{ring.label}
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>

           {/* Depth Labels */}
           <div className="absolute top-12 right-12 text-right">
              <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest font-bold mb-1">Orbital_Sync: ACTIVE</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase">Phase_Calibration_0x88.F</div>
           </div>

           {/* SVG Energy Ties when active */}
           {activeRing !== null && (
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line 
                  x1="50%" y1="50%" 
                  x2="50%" y2="50%" 
                  stroke="#f43f5e" 
                  strokeWidth="1" 
                  className="animate-pulse"
                  style={{ transform: `rotate(${rotation}deg) translateY(-${rings[activeRing].radius}px)`, transformOrigin: '50% 50%' }}
                />
             </svg>
           )}
        </div>
      </div>
      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

const ShieldCheck = Shield; // Mapping icon if needed
