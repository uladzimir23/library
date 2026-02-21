import React, { useState, useContext } from 'react';
import { ShieldCheck, FileText, CheckCircle, Bell, UserCheck, Landmark } from 'lucide-react';
import { LanguageContext } from '../App';

export const StateProtocol: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <section className="py-32 bg-[#F2F4F7] dark:bg-[#0A0C10] border-y border-black/5 dark:border-white/5" id="state-protocol">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3 text-[#0052FF] font-bold text-[10px] uppercase tracking-[0.2em]">
              <Landmark className="w-4 h-4" />
              Infrastructure_Standard_v2.5
            </div>
            <h2 className="text-5xl font-sans font-extrabold text-zinc-900 dark:text-white tracking-tight leading-none">
              State <br /><span className="text-[#0052FF]">Protocol.</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-normal leading-relaxed max-w-lg">
              Reliability as a visual language. We utilize a strict grid system and clinical clarity to ensure accessibility and trust in high-load digital environments.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <button 
                 onClick={() => setIsVerified(!isVerified)}
                 className={`px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 ${isVerified ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-[#0052FF] text-white shadow-lg shadow-blue-500/20'}`}
               >
                 {isVerified ? <CheckCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                 {isVerified ? 'Identity_Confirmed' : 'Start_Verification'}
               </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
             <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden">
                {/* Protocol Header */}
                <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Active_Session: 0x88.F</span>
                   </div>
                   <Bell className="w-4 h-4 text-zinc-300" />
                </div>

                <div className="p-10 space-y-8">
                   {/* Verification Steps */}
                   {[
                     { icon: FileText, label: 'Document_Validation', status: 'COMPLETED', color: 'text-emerald-500' },
                     { icon: UserCheck, label: 'Biometric_Match', status: isVerified ? 'COMPLETED' : 'PENDING', color: isVerified ? 'text-emerald-500' : 'text-amber-500' },
                   ].map((step, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-5">
                           <div className={`w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20`}>
                              <step.icon className={`w-6 h-6 ${step.color}`} />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{step.label}</div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Proc_ID: 8820-X</div>
                           </div>
                        </div>
                        <div className={`text-[9px] font-bold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 transition-colors ${step.status === 'COMPLETED' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 animate-pulse'}`}>
                           {step.status}
                        </div>
                     </div>
                   ))}

                   {/* Data Visualization */}
                   <div className="pt-8 border-t border-black/5 dark:border-white/5">
                      <div className="flex justify-between items-end mb-6">
                         <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Processing_Load</div>
                         <div className="text-2xl font-sans font-black text-zinc-900 dark:text-white">42%</div>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 w-[42%] transition-all duration-1000" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
