import React, { useState, useContext, useRef, useEffect } from 'react';
import { Thermometer, Zap, Activity, Grid, Flame, Wind } from 'lucide-react';
import { LanguageContext } from '../App';

export const ThermalMesh: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [temperature, setTemperature] = useState(24);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setTemperature(prev => Math.min(120, prev + 2)); // Повышаем "температуру" при движении
  };

  useEffect(() => {
    const cooldown = setInterval(() => {
      setTemperature(prev => Math.max(24, prev - 1)); // Остывание
    }, 100);
    return () => clearInterval(cooldown);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="thermal">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/10 text-orange-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Reactive_Infrared
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Thermal <br /><span className="text-orange-500">Mesh.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-4">
              Material response beyond visual. Every interaction heats the digital surface, triggering an infrared gradient shift that tracks your journey across the interface grid.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3">
                <div className="flex justify-between items-center text-orange-500">
                   <Flame className="w-5 h-5" />
                   <span className="font-tech text-2xl font-bold">{temperature.toFixed(0)}°C</span>
                </div>
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Active_Surface_Temp</div>
             </div>
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sky-500">
                   <Wind className="w-5 h-5" />
                   <span className="font-tech text-2xl font-bold">{temperature > 50 ? 'TURBO' : 'IDLE'}</span>
                </div>
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Cooling_System</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Thermal Grid Background */}
           <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} />

           {/* The Thermal Bloom */}
           <div 
             className="absolute w-[400px] h-[400px] rounded-full transition-all duration-300 ease-out pointer-events-none"
             style={{ 
               left: `${mousePos.x * 100}%`, 
               top: `${mousePos.y * 100}%`,
               transform: 'translate(-50%, -50%)',
               background: `radial-gradient(circle at center, rgba(249,115,22,${(temperature-24)/200}) 0%, transparent 70%)`,
               filter: `blur(${40 + (temperature/2)}px)`
             }}
           />

           <div className="relative w-80 h-96 bg-white/5 border border-white/10 rounded-[56px] backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden transition-all duration-700">
              {/* Heat Distortion Effect */}
              <div className={`absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent transition-opacity duration-1000 ${temperature > 60 ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className={`w-24 h-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center transition-all duration-500 ${temperature > 80 ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : ''}`}>
                 <Thermometer className={`w-10 h-10 transition-colors duration-1000 ${temperature > 80 ? 'text-orange-500' : 'text-zinc-500'}`} />
              </div>
              
              <div className="mt-8 text-center">
                 <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Heatmap_0xDF</div>
                 <div className={`text-2xl font-tech font-bold uppercase transition-colors duration-1000 ${temperature > 80 ? 'text-orange-400' : 'text-white'}`}>
                    {temperature > 80 ? 'Thermal_Overload' : 'Matter_Neutral'}
                 </div>
              </div>
           </div>

           {/* Custom Interactive Cursor */}
           <div 
             className="absolute w-12 h-12 border-2 border-orange-500/40 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
           </div>
        </div>
      </div>
    </section>
  );
};
