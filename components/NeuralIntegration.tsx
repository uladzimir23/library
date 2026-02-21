import React, { useContext, useState, useEffect } from 'react';
import { Brain, Cpu, Sparkles, Network, Activity, Wand2, Fingerprint, Database, Loader2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralIntegration: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    if (isCalibrating) {
      const interval = setInterval(() => {
        const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
        setTokens(prev => [`0x${hex}`, ...prev.slice(0, 5)]);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isCalibrating]);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => setIsCalibrating(false), 3000);
  };

  const modules = [
    { id: 'semantic', icon: Sparkles, color: 'text-indigo-500', bg: 'bg-indigo-500/10', label: 'Semantic_Core' },
    { id: 'predictive', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Predictive_Bias' },
    { id: 'context', icon: Network, color: 'text-pink-500', bg: 'bg-pink-500/10', label: 'Global_Context' }
  ];

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-24 items-center">
        {/* Visual Showcase (AI Core) */}
        <div className="flex-1 relative w-full aspect-square max-w-lg group">
          <div className={`absolute inset-0 transition-all duration-1000 blur-[140px] rounded-full ${isCalibrating ? 'bg-indigo-500/40 scale-125' : 'bg-indigo-500/20'}`} />
          
          {/* Main Core Container */}
          <div className={`relative h-full w-full bg-white/5 dark:bg-zinc-900/60 backdrop-blur-3xl border transition-all duration-700 rounded-full flex items-center justify-center p-12 ${isCalibrating ? 'border-indigo-500/60 shadow-[0_0_80px_rgba(99,102,241,0.3)]' : 'border-white/10 shadow-2xl'}`}>
            
            {/* Spinning Rings */}
            <div className={`absolute inset-4 border border-dashed border-indigo-500/20 rounded-full ${isCalibrating ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_20s_linear_infinite]'}`} />
            <div className={`absolute inset-12 border border-emerald-500/10 rounded-full ${isCalibrating ? 'animate-[spin_2s_linear_infinite_reverse]' : 'animate-[spin_15s_linear_infinite_reverse]'}`} />
            
            {/* AI Nucleus */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-28 h-28 bg-indigo-600 rounded-[40px] flex items-center justify-center shadow-2xl mb-8 transition-all duration-500 ${isCalibrating ? 'scale-125 rotate-[360deg] shadow-indigo-500/60' : ''}`}>
                 {isCalibrating ? <Loader2 className="w-14 h-14 text-white animate-spin" /> : <Brain className="w-14 h-14 text-white" />}
              </div>
              
              <div className="text-center">
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.6em] mb-4">Neural_Synthesis_v4</div>
                 
                 {/* Live Token Stream */}
                 <div className="h-20 overflow-hidden flex flex-col items-center justify-center gap-1">
                    {tokens.map((token, i) => (
                      <div key={i} className="text-[9px] font-mono text-indigo-400 opacity-40 animate-in slide-in-from-bottom-2">
                        {token} // MATERIAL_CALIBRATION_OK
                      </div>
                    ))}
                    {!isCalibrating && <div className="text-[9px] font-mono text-zinc-600 italic uppercase">Awaiting_Instructions...</div>}
                 </div>
              </div>
            </div>

            {/* Orbiting Metadata Tags */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-white/10 px-6 py-2.5 rounded-full shadow-2xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Coherence: 98.4%</span>
               </div>
            </div>
          </div>

          {/* Floating Diagnostic Cards */}
          <div className={`absolute -right-12 top-1/4 p-6 bg-emerald-500/10 backdrop-blur-2xl border border-emerald-500/20 rounded-[32px] shadow-2xl transition-all duration-700 ${isCalibrating ? 'translate-x-4 opacity-100' : 'opacity-40'}`}>
             <Database className="w-6 h-6 text-emerald-500 mb-3" />
             <div className="text-[8px] font-bold uppercase text-zinc-400">Buffer_Node</div>
             <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">0x8892.B</div>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[1px] bg-indigo-500" />
               <div className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">{t.neural.tag}</div>
            </div>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              {t.neural.title} <br /><span className="text-indigo-500">{t.neural.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-lg">
              Интерфейс больше не статичен. С помощью Gemini AI система анализирует ваш контекст и динамически «плавит» стекло интерфейса, подстраивая оптические свойства под важность данных.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              const content = (t.neural.cards as any)[module.id];
              return (
                <div 
                  key={module.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-6 rounded-[32px] border transition-all duration-500 cursor-pointer group flex items-center justify-between ${activeTab === idx ? 'bg-white dark:bg-zinc-900 border-indigo-500/50 shadow-2xl scale-[1.02]' : 'bg-white/5 border-transparent hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${activeTab === idx ? 'bg-indigo-600 border-indigo-500 text-white' : `${module.bg} border-white/5 ${module.color}`}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-tech font-bold uppercase mb-1 ${activeTab === idx ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>{content.title}</h4>
                      <p className={`text-sm font-light leading-relaxed ${activeTab === idx ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-600'}`}>{content.desc}</p>
                    </div>
                  </div>
                  <div className={`text-[8px] font-mono transition-opacity duration-500 ${activeTab === idx ? 'opacity-100 text-indigo-400' : 'opacity-0'}`}>ACTIVE_RELAY</div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleCalibrate}
            disabled={isCalibrating}
            className="w-full lg:w-auto bg-indigo-600 text-white px-10 py-6 rounded-[24px] font-bold flex items-center justify-center gap-5 hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/40 active:scale-95 group disabled:opacity-50"
          >
             {isCalibrating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
             {isCalibrating ? 'ИДЕТ КАЛИБРОВКА МАТЕРИИ...' : 'ЗАПУСТИТЬ ПЕРЕГЕНЕРАЦИЮ СТЕКА'}
          </button>
        </div>
      </div>
    </div>
  );
};
