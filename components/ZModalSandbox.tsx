
import React, { useState, useContext } from 'react';
import { Target, ShieldAlert, Zap, X, AlertTriangle, ShieldCheck, Box, Info } from 'lucide-react';
import { LanguageContext } from '../App';

type ModalType = 'INFO' | 'WARNING' | 'CRITICAL' | null;

export const ZModalSandbox: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const modalContent = {
    INFO: {
      title: 'System_Handshake',
      desc: 'Успешное соединение с центральным узлом управления. Все протоколы стабильны.',
      icon: Info,
      color: 'emerald'
    },
    WARNING: {
      title: 'Buffer_Overflow_Risk',
      desc: 'Обнаружен критический уровень заполнения кэша. Требуется ручная очистка секторов.',
      icon: AlertTriangle,
      color: 'amber'
    },
    CRITICAL: {
      title: 'Kernel_Pan_0x001',
      desc: 'Фатальный сбой подсистемы навигации. Немедленно прервите выполнение потоков.',
      icon: ShieldAlert,
      color: 'rose'
    }
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 text-right">
         <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Experimental_0x22.Dialog
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Пространственные <br /><span className="text-sky-500">Диалоги.</span>
         </h2>
      </div>

      <div className="relative h-[650px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl group">
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
         
         {/* Underlying "Work Area" (Content that gets blurred) */}
         <div className={`w-full max-w-4xl grid grid-cols-3 gap-8 px-12 transition-all duration-700 ${activeModal ? 'blur-2xl grayscale scale-95 opacity-20' : 'blur-0'}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between">
                 <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center"><Box className="w-4 h-4 text-zinc-600" /></div>
                 <div className="h-2 w-full bg-white/5 rounded-full" />
              </div>
            ))}
         </div>

         {/* Trigger Buttons */}
         <div className="absolute bottom-12 flex gap-4">
            {(['INFO', 'WARNING', 'CRITICAL'] as ModalType[]).map(type => (
              <button 
                key={type}
                onClick={() => setActiveModal(type)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white hover:text-zinc-900 transition-all shadow-xl"
              >
                Trigger_{type}
              </button>
            ))}
         </div>

         {/* THE SPATIAL MODAL */}
         {activeModal && (
           <div className="absolute inset-0 flex items-center justify-center z-50 animate-in fade-in duration-500">
              {/* Backdrop specialized blur */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setActiveModal(null)} />
              
              <div 
                className="relative w-full max-w-lg bg-zinc-900 rounded-[56px] border-2 border-white/20 p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-500 animate-in zoom-in-95 slide-in-from-bottom-8"
                style={{ 
                   borderColor: activeModal === 'CRITICAL' ? 'rgba(244,63,94,0.4)' : activeModal === 'WARNING' ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.2)' 
                }}
              >
                 <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5 text-zinc-500" />
                 </button>
                 
                 <div className="flex flex-col items-center text-center gap-8">
                    <div className={`w-20 h-20 rounded-[32px] bg-${modalContent[activeModal].color}-500/10 border border-${modalContent[activeModal].color}-500/30 flex items-center justify-center`}>
                       {React.createElement(modalContent[activeModal].icon, { className: `w-10 h-10 text-${modalContent[activeModal].color}-500` })}
                    </div>
                    
                    <div className="space-y-4">
                       <h3 className="text-3xl font-tech font-bold text-white uppercase tracking-widest leading-none">{modalContent[activeModal].title}</h3>
                       <p className="text-zinc-400 text-lg font-light leading-relaxed">{modalContent[activeModal].desc}</p>
                    </div>

                    <div className="flex gap-4 w-full pt-4">
                       <button className={`flex-1 py-4 bg-${modalContent[activeModal].color}-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-${modalContent[activeModal].color}-600/20 active:scale-95 transition-all`}>
                          Execute_Link
                       </button>
                       <button onClick={() => setActiveModal(null)} className="flex-1 py-4 bg-white/5 text-zinc-500 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                          Abort
                       </button>
                    </div>
                 </div>

                 {/* Corner Technical Labels */}
                 <div className="absolute bottom-6 left-12 right-12 flex justify-between opacity-30 text-[8px] font-mono text-zinc-600">
                    <span>DIALOG_HASH: 0x882A</span>
                    <span>CONTEXT_ID: {activeModal}_PROT</span>
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};
