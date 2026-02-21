
import React, { useState } from 'react';
import { Cpu, Zap, Radio, Globe, ArrowUpRight } from 'lucide-react';
import { playUISound } from './AudioService';

interface Props {
  theme: 'dark' | 'light';
  onSelect: (service: any) => void;
}

export const ServicesGrid: React.FC<Props> = ({ theme, onSelect }) => {
  const isDark = theme === 'dark';
  const services = [
    { title: 'Spatial UI Kit', price: '0x88.A', tag: 'Core_Logic', icon: Cpu, desc: 'Набор высокопроизводительных компонентов с физически корректным стеклом, глубоким блюром и хроматическими аберрациями.' },
    { title: 'Neural Web', price: '0x42.F', tag: 'AI_Driven', icon: Zap, desc: 'Разработка веб-приложений с глубокой интеграцией Gemini AI для адаптивного UX.' },
    { title: 'Optical Motion', price: '0x12.S', tag: 'Physics', icon: Radio, desc: 'Система анимации, основанная на инерции, преломлении световых волн и тактильном отклике.' },
    { title: 'Edge Network', price: '0x99.M', tag: 'Global', icon: Globe, desc: 'Развертывание интерфейсов в децентрализованных узлах с нулевой задержкой и защитой уровня L7.' }
  ];

  return (
    <div className="scroll-mt-32">
      <div className="mb-24 space-y-4">
         <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Inventory_Registry_v4</span>
         <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            Доступные <br /><span className="text-indigo-500">Модули.</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {services.map((service, i) => (
           <ServiceCard key={i} service={service} isDark={isDark} index={i} onClick={() => { playUISound('click'); onSelect(service); }} />
         ))}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ service: any; isDark: boolean; index: number; onClick: () => void }> = ({ service, isDark, index, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 15, y: x * -15 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playUISound('hover')}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      className="perspective-1000 group cursor-pointer"
    >
       <div 
         className={`relative p-12 rounded-[48px] border transition-all duration-500 ease-out preserve-3d
           ${isDark ? 'bg-white/[0.03] border-white/5 group-hover:border-white/20' : 'bg-white border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] group-hover:border-black/10'}
         `}
         style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
       >
          <div className="space-y-16 relative z-10">
             <div className="flex justify-between items-start">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl ${isDark ? 'bg-zinc-900 border border-white/10 text-indigo-500' : 'bg-zinc-50 border border-black/5 text-zinc-900'}`}>
                   <service.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-mono opacity-20 uppercase tracking-widest font-black">Ref_0{index + 1}</div>
                </div>
             </div>
             
             <div className="space-y-6">
                <h3 className="text-4xl font-tech font-bold uppercase tracking-widest text-zinc-900 dark:text-white leading-none group-hover:text-indigo-500 transition-colors">{service.title}</h3>
                <p className="text-lg font-light leading-relaxed max-w-sm opacity-50 text-zinc-600 dark:text-zinc-400">
                  {service.desc}
                </p>
             </div>

             <div className="flex justify-between items-end border-t border-current/5 pt-10">
                <div>
                   <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">{service.price}</div>
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border ${isDark ? 'bg-white/5 border-white/10 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-black/5 border-black/10 group-hover:bg-zinc-900 group-hover:text-white'}`}>
                   <ArrowUpRight className="w-6 h-6" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
