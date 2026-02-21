
import React, { useState, useContext } from 'react';
import { Target, Zap, Shield, X, Maximize, BoxSelect, Aperture, Search, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const RefractiveLensModal: React.FC = () => {
  const { isDiagnostic } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 text-right">
         <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Optic_Lab_0x22
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Модальная <br /><span className="text-sky-500">Линза.</span>
         </h2>
      </div>

      <div className="relative h-[650px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl group perspective-2000">
         {/* Underlying "Desktop" surface */}
         <div className={`w-full max-w-5xl grid grid-cols-4 gap-8 px-12 transition-all duration-1000 ease-out ${isOpen ? 'translate-z-[-100px] blur-xl opacity-30 grayscale saturate-200' : 'translate-z-0 blur-0 opacity-100'}`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-44 bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between group/card hover:bg-white/10 transition-colors">
                 <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover/card:bg-sky-500/20 transition-all">
                    <BoxSelect className="w-5 h-5 text-zinc-600 group-hover/card:text-sky-400" />
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/10 w-1/2" />
                 </div>
              </div>
            ))}
         </div>

         {/* Center Trigger (If modal is closed) */}
         {!isOpen && (
           <button 
             onClick={() => setIsOpen(true)}
             className="absolute bg-white text-zinc-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_40px_100px_-20px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 z-10"
           >
             <Aperture className="w-5 h-5 animate-spin-slow" />
             Inspect_Protocol
           </button>
         )}

         {/* THE REFRACTIVE MODAL */}
         {isOpen && (
           <div className="absolute inset-0 z-50 flex items-center justify-center p-12">
              {/* Specialized Backdrop with localized focus */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
              
              {/* Modal Body - The Lens */}
              <div 
                className="relative w-full max-w-2xl bg-zinc-900/80 rounded-[64px] border-4 border-white/20 p-16 shadow-[0_0_150px_rgba(0,0,0,0.8)] transition-all duration-700 animate-in zoom-in-90 slide-in-from-bottom-12 backdrop-blur-3xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                 {/* Close Button */}
                 <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all group">
                    <X className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                 </button>

                 <div className="flex flex-col items-center text-center gap-10">
                    <div className="relative">
                       <div className="absolute inset-0 bg-sky-500 rounded-full blur-[40px] opacity-20 animate-pulse" />
                       <div className="w-24 h-24 rounded-[32px] bg-sky-600 flex items-center justify-center text-white shadow-2xl relative z-10">
                          <Shield className="w-12 h-12" />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-4xl font-tech font-bold text-white uppercase tracking-[0.2em] leading-none">Security_Override.</h3>
                       <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-md mx-auto">Требуется физическое подтверждение доступа к ядру. Выполните проверку векторов для продолжения сессии.</p>
                    </div>

                    <div className="flex gap-6 w-full pt-4">
                       <button className="flex-1 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-600/30 active:scale-95 transition-all">Execute_Verify</button>
                       <button onClick={() => setIsOpen(false)} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-3xl font-black text-xs uppercase tracking-widest transition-all">Abort_Scan</button>
                    </div>
                 </div>

                 {/* Diagnostic Overlay on Modal */}
                 {isDiagnostic && (
                   <div className="absolute bottom-8 left-16 right-16 flex justify-between items-center text-[8px] font-mono text-zinc-600">
                      <div className="flex items-center gap-2"><Search className="w-3 h-3" /> LENS_FOV: 120DEG</div>
                      <div className="flex items-center gap-2"><Activity className="w-3 h-3" /> DEPTH_BIAS: 0.124_U</div>
                   </div>
                 )}

                 {/* Corner Lens Artifacts */}
                 <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                 <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/20" />
              </div>
           </div>
         )}
         
         {/* HUD SCANLINE */}
         <div className="absolute top-0 left-0 w-full h-[2px] bg-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.5)] animate-scan-slow pointer-events-none" />
      </div>
      <style>{`
        @keyframes scan-slow {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-slow { animation: scan-slow 6s linear infinite; }
      `}</style>
    </div>
  );
};
