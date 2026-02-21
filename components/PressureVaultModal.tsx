
import React, { useState } from 'react';
import { Shield, X, Activity, Lock, Unlock } from 'lucide-react';

export const PressureVaultModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 text-center">
         <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Hydraulic_Enclosure_0x22
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Модальный <br /><span className="text-amber-500">Сейф.</span>
         </h2>
      </div>

      <div className="relative h-[650px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl group perspective-2000">
         
         {/* THE BACKGROUND SURFACE (Bends inward when modal open) */}
         <div 
           className={`w-full max-w-5xl h-[80%] transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-center
             ${isOpen ? 'opacity-10 blur-2xl grayscale scale-90' : 'opacity-100 blur-0 grayscale-0 scale-100'}
           `}
           style={{ 
             transform: isOpen ? 'translateZ(-300px)' : 'translateZ(0px)' 
           }}
         >
            <div className="grid grid-cols-3 gap-8 w-full px-12">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="h-44 bg-white/5 border border-white/10 rounded-[40px] p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/10">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-zinc-700" />
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/10 w-1/3" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* OVERLAY (Backdrop) */}
         <div 
           onClick={() => setIsOpen(false)}
           className={`absolute inset-0 z-40 bg-black/60 backdrop-blur-xl transition-all duration-700 ease-in-out
             ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
         />

         {/* INITIAL TRIGGER (The "Lock") */}
         <div 
           className={`absolute z-30 transition-all duration-700 flex flex-col items-center
             ${isOpen ? 'opacity-0 scale-75 blur-lg pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'}
           `}
         >
           <button 
             onClick={() => setIsOpen(true)}
             className="bg-zinc-900/80 backdrop-blur-md border-2 border-white/10 text-white px-12 py-8 rounded-[40px] font-black text-xs uppercase tracking-widest shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-5 group"
           >
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-amber-500/50 transition-colors shadow-inner">
                <Lock className="w-10 h-10 text-amber-500 group-hover:scale-110 transition-transform" />
             </div>
             <span className="opacity-60 group-hover:opacity-100 transition-opacity">Open_Vault_Access</span>
           </button>
         </div>

         {/* THE VAULT MODAL CONTAINER */}
         <div 
            className={`absolute inset-0 z-50 flex items-center justify-center p-6 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) pointer-events-none
              ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85] blur-xl'}
            `}
            style={{ 
              transform: isOpen ? 'translateZ(150px)' : 'translateZ(0px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="w-full max-w-2xl bg-zinc-900/70 backdrop-blur-3xl rounded-[64px] border-x-[12px] border-y-[4px] border-zinc-800/80 p-16 shadow-[0_0_150px_rgba(0,0,0,0.9)] flex flex-col items-center gap-10 pointer-events-auto relative overflow-hidden">
               {/* Surface Polish Highlight */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
               
               {/* Close Handle / Pull bar */}
               <button 
                 onClick={() => setIsOpen(false)} 
                 className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-zinc-700/50 rounded-full hover:bg-amber-500/50 transition-colors cursor-pointer group"
               >
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono text-amber-500 whitespace-nowrap">CLOSE_VAULT</div>
               </button>

               <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 rounded-full blur-[60px] opacity-20 animate-pulse" />
                  <div className="w-32 h-32 rounded-[48px] bg-zinc-800/50 border-2 border-amber-500/30 flex items-center justify-center shadow-2xl relative z-10 transition-transform duration-700 hover:rotate-12">
                     <Unlock className="w-14 h-14 text-amber-500" />
                  </div>
               </div>

               <div className="text-center space-y-4 relative z-10">
                  <h3 className="text-4xl font-tech font-bold text-white uppercase tracking-[0.3em] leading-none">Access_Granted.</h3>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-sm mx-auto">Контейнер декомпрессирован. Все системы переведены в режим прямого управления ядрами.</p>
               </div>

               <div className="flex gap-6 w-full pt-4 relative z-10">
                  <button className="flex-1 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-600/20 active:scale-95 transition-all">Execute_Protocol</button>
                  <button onClick={() => setIsOpen(false)} className="flex-1 py-5 bg-white/5 border border-white/10 text-zinc-500 rounded-[32px] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Seal_Vault</button>
               </div>

               {/* Mechanical Labels */}
               <div className="absolute bottom-8 left-16 right-16 flex justify-between text-[8px] font-mono text-zinc-700 font-black uppercase pointer-events-none">
                  <span>Pressure: 1.0 ATM</span>
                  <span>Seal_ID: VLT-088-X</span>
               </div>
            </div>
         </div>
         
         {/* HUD SCANLINES */}
         <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 pointer-events-none z-10" />
         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 pointer-events-none z-10" />
      </div>
    </div>
  );
};
