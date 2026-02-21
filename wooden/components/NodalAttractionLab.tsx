
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Target, Move, Activity, Zap, Cpu, MousePointer2, Box, ShieldCheck } from 'lucide-react';
import { GravityContext } from '../App';

interface GravityItemProps {
  icon: any;
  label: string;
  mass: number; // 0.1 to 1.0 (1.0 is heavy)
  mousePos: { x: number, y: number };
}

const GravityItem: React.FC<GravityItemProps> = ({ icon: Icon, label, mass, mousePos }) => {
  const { active, mass: globalMass, size: globalSize } = useContext(GravityContext);
  const itemRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!itemRef.current || !active) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - offset.x; 
    const centerY = rect.top + rect.height / 2 - offset.y;
    
    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Динамический радиус захвата
    const maxDist = 100 + (globalSize * 500);
    
    if (dist < maxDist) {
       // 1. Плавная кривая силы (Smoothstep)
       const t = Math.max(0, 1 - dist / maxDist);
       const pullPower = t * t * (3 - 2 * t);
       
       // 2. Soft Normalization
       const buffer = 45;
       const smoothDist = dist + buffer;
       
       // 3. Затухание в центре
       const centerDamping = Math.min(1, dist / 20);
       
       // 4. Множитель притяжения (объектная масса * глобальная настройка)
       const attractionMultiplier = mass * globalMass * 300;
       
       setOffset({
          x: (dx / smoothDist) * pullPower * attractionMultiplier * centerDamping,
          y: (dy / smoothDist) * pullPower * attractionMultiplier * centerDamping
       });
    } else {
       setOffset({ x: 0, y: 0 });
    }
  }, [mousePos, mass, active, globalMass, globalSize]);

  return (
    <div 
      ref={itemRef}
      className="relative flex flex-col items-center gap-4 transition-transform duration-500 ease-out will-change-transform"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
       <div 
         className={`w-24 h-24 rounded-[32px] flex items-center justify-center border transition-all duration-300
           ${mass > 0.7 ? 'bg-zinc-900 border-white/20' : 'bg-violet-600/10 border-violet-500/30'}
           ${Math.abs(offset.x) > 1 ? 'shadow-[0_15px_40px_rgba(139,92,246,0.25)] scale-105' : 'shadow-none scale-100'}
         `}
       >
          <Icon className={`w-10 h-10 transition-colors duration-500 ${mass > 0.7 ? 'text-zinc-600' : 'text-violet-500'}`} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-[inherit]" />
       </div>
       <div className="text-center">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</div>
          <div className="text-[8px] font-mono text-violet-500 opacity-60 font-bold">MASS: {mass.toFixed(1)}</div>
       </div>
    </div>
  );
};

export const NodalAttractionLab: React.FC<{ theme: string }> = ({ theme }) => {
  const { mousePos, size: globalSize } = useContext(GravityContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  return (
    <div 
      ref={containerRef}
      className="scroll-mt-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
         {/* Info Block */}
         <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
               <span className="text-[9px] font-mono opacity-40 uppercase tracking-[0.5em] block font-black">Nodal_Attraction_v4.5</span>
               <h3 className="text-5xl font-tech font-bold uppercase tracking-tight text-zinc-900 dark:text-white leading-none">
                  Изолированная <br /><span className="text-violet-500">Масса.</span>
               </h3>
               <p className="text-lg font-light leading-relaxed opacity-60 italic">
                  Настройте глобальные параметры гравитации в хедере, чтобы увидеть как меняется отклик объектов с разной массой.
               </p>
            </div>

            <div className="p-8 bg-violet-600/5 rounded-[40px] border border-violet-500/10 space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Field_Coherence</span>
                  <div className="flex gap-1">
                     {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                  </div>
               </div>
               <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-600 w-full" />
               </div>
            </div>
         </div>

         {/* Visual Field */}
         <div className={`lg:col-span-8 h-[650px] rounded-[64px] border relative overflow-hidden flex items-center justify-center p-20 transition-all duration-1000
           ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-50 border-black/5 shadow-inner'}
         `}>
            {/* Grid Pattern that Warps */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="grid grid-cols-3 gap-24 relative z-10">
               <GravityItem icon={Zap} label="Pulse_Node" mass={0.1} mousePos={mousePos} />
               <GravityItem icon={Cpu} label="Logic_Gate" mass={0.5} mousePos={mousePos} />
               <GravityItem icon={Box} label="Matter_Slab" mass={1.0} mousePos={mousePos} />
               <GravityItem icon={Target} label="Lock_Unit" mass={0.3} mousePos={mousePos} />
               <GravityItem icon={Activity} label="Wave_Relay" mass={0.2} mousePos={mousePos} />
               <GravityItem icon={ShieldCheck} label="Safety_Buffer" mass={0.8} mousePos={mousePos} />
            </div>

            {/* Singularity Indicator (Visible range) */}
            <div 
              className="absolute pointer-events-none mix-blend-screen opacity-10 transition-all duration-500"
              style={{ 
                left: mousePos.x - (containerRef.current?.getBoundingClientRect().left || 0), 
                top: mousePos.y - (containerRef.current?.getBoundingClientRect().top || 0), 
                transform: 'translate(-50%, -50%)', 
                width: `${200 + globalSize * 800}px`,
                height: `${200 + globalSize * 800}px`,
                background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' 
              }}
            />
         </div>
      </div>
    </div>
  );
};
