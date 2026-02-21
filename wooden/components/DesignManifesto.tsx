
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Quote, Move, Box, Layers, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const DesignManifesto: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="scroll-mt-32 py-24 space-y-32"
    >
      <div className="flex flex-col items-center text-center space-y-8">
         <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-[8px] font-black uppercase tracking-[0.6em]">
            {t.manifesto.tag}
         </div>
         <h2 className="text-[80px] md:text-[120px] font-tech font-bold uppercase leading-[0.8] tracking-tighter text-zinc-900 dark:text-white">
            {t.manifesto.title}<br /><span className="text-indigo-500">{t.manifesto.titleAccent}</span>
         </h2>
         <p className="text-3xl font-light opacity-60 leading-relaxed max-w-3xl font-mono italic">
            "{t.manifesto.quote}"
         </p>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-1 rounded-[80px] border overflow-hidden
        ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-100 border-black/5 shadow-2xl'}
      `}>
         {/* INTERACTIVE TYPOGRAPHY SLAB */}
         <div className="h-[600px] bg-black flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div 
              className="relative transition-all duration-300 ease-out will-change-transform"
              style={{ 
                transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)`,
                textShadow: `${mousePos.x * -20}px ${mousePos.y * -20}px 40px rgba(99, 102, 241, 0.4)`
              }}
            >
               <div className="text-[180px] font-tech font-black text-white leading-none tracking-tighter uppercase select-none">
                 MATTER
               </div>
               {/* 3D Depth Layers for Text */}
               <div className="absolute inset-0 text-[180px] font-tech font-black text-indigo-500/20 leading-none tracking-tighter uppercase select-none -z-10 blur-md translate-z-[-20px]" />
            </div>

            <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/20">
               <Activity className="w-4 h-4" />
               <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Typographic_Deformation_Active</span>
            </div>
         </div>

         {/* CONTENT BLOCK */}
         <div className={`p-20 flex flex-col justify-center gap-12 ${isDark ? 'bg-zinc-900/50' : 'bg-white'}`}>
            <div className="space-y-6">
               <h3 className="text-4xl font-tech font-bold uppercase tracking-tight text-zinc-900 dark:text-white leading-none">
                  Форма следует <br /><span className="text-indigo-500">физике.</span>
               </h3>
               <p className="text-xl font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Мы верим в "Цифровую Искренность". Каждый элемент в MatterForge — это не просто CSS-стиль, а результат симуляции. Если кнопка кажется тяжелой, это потому что её инерция рассчитана на основе плотности.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-indigo-500">
                     <Box className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Property_A</span>
                  </div>
                  <div className="text-xs text-zinc-500 uppercase font-bold">Осязаемость</div>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-emerald-500">
                     <Layers className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Property_B</span>
                  </div>
                  <div className="text-xs text-zinc-500 uppercase font-bold">Оптическая Глубина</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
