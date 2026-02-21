
import React, { useState } from 'react';
import { Flame, Palette, Activity, ThermometerSun } from 'lucide-react';

export const ChromaDecaySurface: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10 text-pink-500 text-[9px] font-bold uppercase tracking-[0.5em]">Chromatic_Persistence</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Хроматический <br /><span className="text-pink-500">Распад.</span>
            </h2>
         </div>
         <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <Activity className="text-pink-500 w-5 h-5" />
            <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">Decay: 1.2s</div>
         </div>
      </div>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-[600px] bg-[#0a0a0c] rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl transition-all duration-[1200ms] cursor-none"
        style={{ 
          filter: isHovered ? 'grayscale(0) saturate(1.5)' : 'grayscale(1) saturate(0.5)',
          backgroundColor: isHovered ? '#1a0510' : '#0a0a0c'
        }}
      >
         {/* Noise Texture Layer */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         {/* The Persistent Matter */}
         <div className="relative w-full max-w-4xl h-[80%] flex items-center justify-center">
            <div className={`w-96 h-96 rounded-[80px] bg-gradient-to-tr from-pink-600 via-violet-600 to-indigo-600 transition-all duration-[2000ms] ease-out shadow-[0_0_150px_rgba(236,72,153,0.3)] flex flex-col items-center justify-center gap-8 ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-95 blur-sm opacity-20'}`}>
               <Palette className="w-20 h-20 text-white animate-pulse" />
               <div className="text-center space-y-2">
                  <div className="text-4xl font-tech font-bold text-white uppercase tracking-widest">Active_Ignition</div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-[0.5em]">Spectral_Recovery_OK</div>
               </div>
            </div>

            {/* Ghosting Layers */}
            <div className={`absolute w-80 h-80 border-2 border-pink-500/20 rounded-[64px] transition-all duration-700 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-20 animate-ping'}`} />
         </div>

         {/* Internal Thermal HUD */}
         <div className="absolute top-12 left-12 flex items-center gap-3">
            <ThermometerSun className={`w-5 h-5 transition-colors ${isHovered ? 'text-pink-500' : 'text-zinc-700'}`} />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Matter_Energy: {isHovered ? 'CRITICAL' : 'MINIMAL'}</span>
         </div>

         {/* Custom Hot-Cursor */}
         <div 
           className={`absolute w-12 h-12 rounded-full border-2 border-pink-500/50 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
           style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
         >
            <div className="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-40 animate-ping" />
         </div>
      </div>
    </div>
  );
};
