import React, { useState, useContext } from 'react';
import { Triangle, Square, Circle, ArrowUpRight, Zap, Layers } from 'lucide-react';
import { LanguageContext } from '../App';

export const AvantGarde: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hovered, setHovered] = useState(false);

  return (
    <section 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="py-40 bg-white dark:bg-zinc-950 border-y-8 border-rose-600 relative overflow-hidden" 
      id="avant-garde"
    >
      {/* Background Graphic Elements */}
      <div className={`absolute top-0 right-0 w-[50%] h-full bg-rose-600 transition-transform duration-1000 ease-in-out ${hovered ? 'translate-x-0' : 'translate-x-full'}`} />
      <div className={`absolute bottom-0 left-0 w-full h-8 bg-zinc-900 transition-transform duration-700 ${hovered ? 'translate-y-0' : 'translate-y-full'}`} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-12">
            <div className={`inline-block px-6 py-2 bg-zinc-900 text-white font-black uppercase text-xl tracking-tighter skew-x-[-12deg] transition-transform duration-500 ${hovered ? 'scale-110' : ''}`}>
              Revolution_01
            </div>
            
            <h2 className={`text-7xl md:text-[120px] font-tech font-black uppercase leading-[0.8] tracking-tighter transition-colors duration-500 ${hovered ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
              Avant <br /><span className={hovered ? 'text-zinc-900' : 'text-rose-600'}>Garde.</span>
            </h2>

            <p className={`text-2xl font-bold leading-tight max-w-md transition-colors duration-500 ${hovered ? 'text-rose-100' : 'text-zinc-500'}`}>
              Geometry as ideology. Breaking the standard grid with diagonal compositions and primary color collisions.
            </p>

            <div className="flex gap-4">
               <button className="bg-rose-600 text-white px-10 py-6 rounded-none font-black text-xl uppercase tracking-tighter hover:bg-zinc-900 transition-colors border-4 border-transparent hover:border-white active:scale-95">
                 Get_Started_!
               </button>
            </div>
          </div>

          <div className="flex-1 relative h-[500px] w-full flex items-center justify-center">
             {/* Animated Geometry Stack */}
             <div className="relative w-80 h-80">
                <div className={`absolute inset-0 bg-rose-600 transition-all duration-700 ${hovered ? 'rotate-45 scale-110' : 'rotate-0'}`} />
                <div className={`absolute inset-4 bg-zinc-900 transition-all duration-1000 delay-100 ${hovered ? '-rotate-12 scale-90' : 'rotate-0'}`} />
                <div className={`absolute inset-12 bg-white flex items-center justify-center transition-all duration-500 ${hovered ? 'translate-x-12 translate-y-[-12px]' : ''}`}>
                   <Triangle className={`w-24 h-24 text-rose-600 transition-transform duration-1000 ${hovered ? 'rotate-[180deg]' : ''}`} />
                </div>
                
                {/* Floating HUD in Red Area */}
                <div className={`absolute -top-10 -right-20 p-4 bg-white border-4 border-zinc-900 font-black text-zinc-900 uppercase text-xs transition-opacity duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                   Matrix_Shift: OK
                </div>
             </div>

             <div className="absolute bottom-0 right-0 flex gap-1 items-end">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-4 bg-rose-600 transition-all duration-500" style={{ height: hovered ? `${i*40}px` : '4px' }} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
