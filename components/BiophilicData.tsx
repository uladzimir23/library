import React, { useState, useContext, useEffect } from 'react';
import { Leaf, Wind, Droplets, Sun, Sparkles, Activity, Compass } from 'lucide-react';
import { LanguageContext } from '../App';

export const BiophilicData: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#F5F5F0] dark:bg-[#0E120E] border-y border-emerald-500/10" id="biophilic">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          <div className="flex-1 space-y-10">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-[0.4em]">
              <Leaf className="w-4 h-4" />
              Eco_Synchrony_v4
            </div>
            <h2 className="text-5xl font-sans font-light text-emerald-900 dark:text-emerald-50 text-shadow-sm">
              Biophilic <span className="font-serif italic text-emerald-600">Data_Mesh.</span>
            </h2>
            <p className="text-emerald-800/60 dark:text-emerald-200/40 text-lg font-light leading-relaxed max-w-lg">
              Technology that breathes. We integrate organic algorithms and natural growth patterns to create interfaces that feel like a living extension of our environment.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-8 bg-white dark:bg-emerald-950/20 rounded-[48px] shadow-sm border border-emerald-100 dark:border-emerald-800/30 flex flex-col gap-3 group hover:shadow-xl transition-all duration-700">
                  <Wind className="w-6 h-6 text-emerald-500 group-hover:animate-bounce" />
                  <div className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Air_Quality</div>
                  <div className="text-2xl font-sans font-bold text-emerald-900 dark:text-emerald-50">98%_PURITY</div>
               </div>
               <div className="p-8 bg-white dark:bg-emerald-950/20 rounded-[48px] shadow-sm border border-emerald-100 dark:border-emerald-800/30 flex flex-col gap-3 group hover:shadow-xl transition-all duration-700">
                  <Droplets className="w-6 h-6 text-sky-500 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Hydration</div>
                  <div className="text-2xl font-sans font-bold text-emerald-900 dark:text-emerald-50">0.42_STABLE</div>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full h-[600px] relative flex items-center justify-center group">
             {/* Organic Background Blobs */}
             <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-pulse transition-all duration-1000"
                  style={{ transform: `scale(${1 + Math.sin(pulse/10)*0.1})` }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-sky-200/30 dark:bg-sky-500/10 rounded-full blur-[100px] animate-pulse transition-all duration-1000"
                  style={{ transform: `scale(${1 + Math.cos(pulse/10)*0.1})` }}
                />
             </div>

             {/* The Biophilic Core */}
             <div className="relative w-80 h-96">
                <div className="absolute inset-0 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl border border-white/20 rounded-[100px] shadow-2xl flex flex-col items-center justify-center p-12 transition-all duration-700 hover:rounded-[64px] hover:scale-[1.02]">
                   <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 mb-8 shadow-inner overflow-hidden relative">
                      <div className="absolute bottom-0 w-full bg-emerald-500/20 transition-all duration-500" style={{ height: `${pulse}%` }} />
                      <Sun className="w-10 h-10 relative z-10 animate-spin-slow" />
                   </div>
                   <div className="text-center">
                      <div className="text-[10px] font-mono text-emerald-800/40 dark:text-emerald-200/40 uppercase tracking-[0.5em] mb-2">Life_Cycle_088</div>
                      <div className="text-3xl font-sans font-light text-emerald-900 dark:text-emerald-50 tracking-tighter">Photosynthesis</div>
                   </div>
                   
                   {/* Sprouting lines visual */}
                   <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-t from-emerald-500/40 to-transparent" />
                   <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-emerald-500/40 to-transparent" />
                </div>
             </div>

             <div className="absolute bottom-12 left-12 flex items-center gap-4 text-emerald-600/40">
                <Compass className="w-5 h-5 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Mapping_Organic_Vectors...</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
