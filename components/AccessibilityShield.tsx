import React, { useState, useContext } from 'react';
import { ShieldCheck, Eye, Keyboard, Type, Languages, Accessibility, Search, AlertCircle } from 'lucide-react';
import { LanguageContext } from '../App';

export const AccessibilityShield: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [scanMode, setScanMode] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="accessibility">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          <div className="flex-1 space-y-12">
            <div>
              <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">Inclusion_Standard</span>
              <h2 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
                Accessibility <br /><span className="text-emerald-500">Vault.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
                Design for everyone. Our components ship with production-ready ARIA labels, semantic HTML, and full keyboard navigation support, ensuring a premium experience for every user.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: Keyboard, label: 'Tab_Order', val: 'Optimized' },
                 { icon: Type, label: 'Contrast', val: '4.5:1_Min' },
                 { icon: Languages, label: 'RTL_Support', val: 'Native' },
                 { icon: ShieldCheck, label: 'WCAG_2.2', val: 'Compliant' }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white dark:bg-zinc-900/40 border border-black/5 dark:border-white/10 rounded-[32px] group hover:border-emerald-500/30 transition-all">
                    <item.icon className="w-5 h-5 text-emerald-500 mb-4 transition-transform group-hover:scale-110" />
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.label}</div>
                    <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase mt-1">{item.val}</div>
                 </div>
               ))}
            </div>

            <button 
              onClick={() => setScanMode(!scanMode)}
              className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${scanMode ? 'bg-emerald-500 text-white shadow-xl' : 'bg-black/5 dark:bg-white/10 text-zinc-500 hover:text-emerald-500 border border-transparent hover:border-emerald-500/20'}`}
            >
              {scanMode ? <Eye className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              {scanMode ? 'System_Audit_Active' : 'Trigger_Access_Scan'}
            </button>
          </div>

          <div className="flex-1 w-full h-[600px] relative flex items-center justify-center">
             {/* The "Audited" Component */}
             <div className="relative w-80 h-[450px] transition-all duration-1000 group">
                {/* Background Shadow */}
                <div className="absolute inset-0 bg-black/20 blur-3xl rounded-[48px] -translate-z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Component Surface */}
                <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-2xl overflow-hidden p-10 flex flex-col justify-between">
                   <div className="space-y-6">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                         <Accessibility className="w-8 h-8" />
                      </div>
                      <div className="space-y-3">
                         <div className="h-2.5 w-3/4 bg-zinc-900/10 dark:bg-white/20 rounded-full" />
                         <div className="h-2 w-1/2 bg-zinc-900/5 dark:bg-white/10 rounded-full" />
                      </div>
                   </div>
                   <div className="pt-8 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
                      <div className="w-24 h-10 bg-emerald-600 rounded-xl" />
                      <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20" />
                   </div>
                </div>

                {/* Scan Overlay Tags */}
                {scanMode && (
                  <div className="absolute inset-0 z-50 pointer-events-none animate-in fade-in duration-500">
                     <div className="absolute top-6 left-6 p-2 bg-emerald-500 text-white text-[8px] font-mono rounded-md shadow-lg border border-emerald-400">role="article"</div>
                     <div className="absolute top-1/2 right-[-20px] p-2 bg-indigo-600 text-white text-[8px] font-mono rounded-md shadow-lg border border-indigo-400 translate-y-12">aria-hidden="false"</div>
                     <div className="absolute bottom-6 left-[-10px] p-2 bg-rose-500 text-white text-[8px] font-mono rounded-md shadow-lg border border-rose-400">tabindex="0"</div>
                     
                     {/* Scanning Line */}
                     <div className="absolute inset-x-0 h-[2px] bg-emerald-500/40 shadow-[0_0_15px_#10b981] animate-[scan_3s_infinite_linear]" />
                  </div>
                )}
             </div>

             {/* HUD Diagnostics */}
             <div className="absolute bottom-8 right-8 flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">No_Violations_Detected</span>
             </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
