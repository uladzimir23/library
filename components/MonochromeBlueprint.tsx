import React, { useState, useContext } from 'react';
import { Layout, MoveRight, Layers, Box, Maximize2, Share2, Grid } from 'lucide-react';
import { LanguageContext } from '../App';

export const MonochromeBlueprint: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`py-40 transition-all duration-700 my-16 border-y border-zinc-200 dark:border-zinc-800 ${isHovered ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100'}`} 
      id="blueprint-section"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-12">
             <div className="flex items-center gap-6 border-b border-current pb-8">
                <span className="text-8xl font-black font-tech tracking-tighter leading-none">01_</span>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                  Bauhaus <br />Architecture.
                </h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                <p className="text-xl font-medium leading-relaxed italic">
                  Minimalism is not a lack of content. It is a presence of clarity. We use asymmetric grids and stark contrast to focus purely on the structural essence of UI.
                </p>
                <div className="space-y-6">
                   <div className="flex justify-between items-center border-b border-current pb-2 group cursor-pointer">
                      <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-3"><Grid className="w-4 h-4" /> Grid_Stability</span>
                      <MoveRight className={`w-6 h-6 transition-transform ${isHovered ? 'translate-x-2' : ''}`} />
                   </div>
                   <div className="flex justify-between items-center border-b border-current pb-2 group cursor-pointer">
                      <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-3"><Maximize2 className="w-4 h-4" /> High_Contrast</span>
                      <MoveRight className={`w-6 h-6 transition-transform ${isHovered ? 'translate-x-2' : ''}`} />
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 h-full flex flex-col justify-end">
             <div className={`p-12 border-8 border-current transition-all duration-500 rounded-[32px] ${isHovered ? 'scale-105' : ''}`}>
                <div className="aspect-square flex items-center justify-center border-2 border-dashed border-current rounded-2xl mb-8">
                   <Box className={`w-24 h-24 transition-transform duration-1000 ${isHovered ? 'rotate-180' : ''}`} />
                </div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-center">Form_Follows_Function</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
