
import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
}

export const AcousticVault: React.FC<Props> = ({ theme }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isDark = theme === 'dark';

  return (
    <div className="scroll-mt-32">
      <div className={`relative h-[650px] rounded-[64px] border overflow-hidden flex items-center justify-center group transition-all duration-1000
        ${isDark ? 'bg-black/40 border-white/5' : 'bg-white border-black/5 shadow-2xl'}
      `}>
         
         {/* THE MECHANICAL DOOR (SIDE PANELS) */}
         <div className={`absolute inset-y-0 left-0 w-1/2 border-r transition-transform duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) z-40 flex items-center justify-end pr-12
           ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#fcfcfc] border-black/5'}
           ${isUnlocked ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className="w-px h-24 bg-current opacity-5" />
         </div>
         <div className={`absolute inset-y-0 right-0 w-1/2 border-l transition-transform duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) z-40 flex items-center justify-start pl-12
           ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#fcfcfc] border-black/5'}
           ${isUnlocked ? 'translate-x-full' : 'translate-x-0'}`}>
            <div className="w-px h-24 bg-current opacity-5" />
         </div>

         {/* CONTENT (INSIDE VAULT) */}
         <div className={`relative w-full max-w-4xl text-center space-y-12 z-10 px-8 transition-all duration-1000 ${isUnlocked ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-xl'}`}>
            <div className="space-y-6">
               <ShieldCheck className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
               <h3 className="text-7xl font-tech font-bold uppercase tracking-tighter">Vault_Access.</h3>
               <p className={`text-lg font-light leading-relaxed max-w-sm mx-auto italic ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                 Все системы откалиброваны. Терминал готов к приему входящего потока данных.
               </p>
            </div>
            
            <button 
              onClick={() => setIsUnlocked(false)}
              className="px-12 py-5 bg-amber-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-amber-500 transition-all"
            >
              Seal_Structure
            </button>
         </div>

         {/* THE TRIGGER (CENTRAL LOCK) */}
         {!isUnlocked && (
           <div className="absolute z-50 flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
              <button 
                onClick={() => setIsUnlocked(true)}
                className={`w-40 h-40 rounded-full border shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group/lock
                  ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/10 shadow-lg'}
                `}
              >
                 <Lock className={`w-12 h-12 text-amber-500 transition-transform duration-700 group-hover/lock:scale-110`} />
              </button>
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.8em] font-black animate-pulse">Open_Protocol</div>
           </div>
         )}

         <div className="absolute top-12 left-12 flex items-center gap-4 opacity-10">
            <Zap className="w-4 h-4" />
            <span className="text-[8px] font-mono uppercase tracking-[0.4em]">Seal: {isUnlocked ? 'OFF' : 'ON'}</span>
         </div>
      </div>
    </div>
  );
};
