import React, { useState, useContext } from 'react';
import { Target, Move, Activity, Sliders, Fingerprint, Expand } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticAnatomy: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="kinetic-anatomy">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.nav.logic}
            </span>
            <h2 className="text-4xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              Kinetic <span className="text-indigo-500">Anatomy.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-light leading-relaxed mt-4">
              Components aren't rigid. Every interaction stretches the digital matter, revealing the "spring" physics that maintain UI integrity.
            </p>
          </div>

          <div className="p-6 bg-zinc-900 rounded-3xl border border-white/5 space-y-4">
             <div className="flex items-center gap-3 text-indigo-500">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Spring_Engine: ON</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-indigo-500 transition-all duration-1000 ${isHovered ? 'w-full' : 'w-1/3'}`} />
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group"
        >
           {/* Visual connection lines appearing on hover */}
           <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-20' : 'opacity-0'}`}>
              <svg className="w-full h-full">
                 <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" />
                 <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="0.5" />
              </svg>
           </div>

           {/* The Exploding Component */}
           <div className="relative w-64 h-24">
              {/* Layer 1: Ghost Base */}
              <div className={`absolute inset-0 border border-indigo-500/20 rounded-2xl transition-all duration-500 ${isHovered ? 'scale-150 opacity-10 blur-xl' : 'scale-100 opacity-0'}`} />
              
              {/* Layer 2: Core Interaction Slab */}
              <div className={`absolute inset-0 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-tech font-bold uppercase tracking-widest shadow-2xl transition-all duration-500 z-20 ${isHovered ? 'translate-z-40 scale-105' : ''}`}>
                 Hover_To_Deconstruct
              </div>

              {/* Layer 3: Spring Vectors */}
              {[
                { x: -40, y: -60, icon: Target },
                { x: 40, y: -60, icon: Expand },
                { x: -40, y: 60, icon: Move },
                { x: 40, y: 60, icon: Fingerprint }
              ].map((v, i) => (
                <div 
                  key={i}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-indigo-400 transition-all duration-700 ease-out z-10 ${isHovered ? '' : 'opacity-0'}`}
                  style={{ transform: isHovered ? `translate(calc(-50% + ${v.x}px), calc(-50% + ${v.y}px)) rotate(${i * 90}deg)` : 'translate(-50%, -50%)' }}
                >
                   <v.icon className="w-5 h-5" />
                </div>
              ))}
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-indigo-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Component_DNA_Buffer: {isHovered ? 'Active' : 'Standby'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
