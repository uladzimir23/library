import React, { useState, useEffect, useContext } from 'react';
import { Cpu, Zap, Code2, RefreshCw, Box, Layers, Share2, Terminal } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralForge: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isForging, setIsForging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState<string[]>([]);

  const codePool = [
    'class="fg-glass-pro"',
    'backdrop-blur="42px"',
    'border-alpha="0.08"',
    'animate="drift-slow"',
    'spatial-index="0x88"',
    'refraction="1.458"',
    'shadow="volumetric"',
    'noise="organic-02"'
  ];

  useEffect(() => {
    if (isForging) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsForging(false);
            return 100;
          }
          return prev + 1;
        });
        setStream(prev => [codePool[Math.floor(Math.random() * codePool.length)], ...prev.slice(0, 10)]);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isForging]);

  const startForge = () => {
    if (isForging) return;
    setStream([]);
    setProgress(0);
    setIsForging(true);
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-[#080808]" id="neural-forge">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-12">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
                Automated_Creation
              </span>
              <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
                Neural <br /><span className="text-indigo-500">Component_Forge.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
                The future of automated design. Our forge assembles high-fidelity components from semantic code streams, ensuring that every molecule is perfectly calibrated for spatial environments.
              </p>
            </div>

            <div className="space-y-6">
               <button 
                 onClick={startForge}
                 disabled={isForging}
                 className={`w-full lg:w-auto px-10 py-6 rounded-3xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 ${isForging ? 'bg-zinc-800 text-zinc-500' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-600/20 active:scale-95'}`}
               >
                 {isForging ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                 {isForging ? 'Synthesizing_Matter...' : 'Initialize_Forge_Sequence'}
               </button>
            </div>

            <div className="flex gap-10">
               <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Yield_Quality</div>
                  <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">99.98%_ACC</div>
               </div>
               <div className="w-[1px] h-12 bg-black/5 dark:bg-white/10" />
               <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Batch_Speed</div>
                  <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">12.4ms/OBJ</div>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-8">
             {/* The Terminal Hub */}
             <div className="h-48 bg-zinc-950 rounded-[32px] border border-white/5 p-6 font-mono text-[10px] overflow-hidden relative group">
                <div className="absolute top-4 right-6 flex items-center gap-2 text-indigo-500 opacity-40">
                   <Terminal className="w-3 h-3" />
                   <span className="uppercase tracking-widest">Stream_Buffer</span>
                </div>
                <div className="space-y-1">
                   {stream.map((line, i) => (
                     <div key={i} className="flex gap-4 animate-in slide-in-from-top-1 duration-300">
                        <span className="text-zinc-700">[{Date.now().toString().slice(-6)}]</span>
                        <span className="text-emerald-500">FORGE_LOG</span>
                        <span className="text-zinc-400">{'>>'} {line}</span>
                     </div>
                   ))}
                   {stream.length === 0 && <div className="text-zinc-800 italic uppercase tracking-widest p-4">Awaiting_Input_Data_Stream...</div>}
                </div>
             </div>

             {/* The Assembly Zone */}
             <div className="h-[450px] bg-white dark:bg-zinc-900/40 rounded-[48px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center group shadow-2xl">
                {/* Construction Sparks */}
                {isForging && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                     {[...Array(12)].map((_, i) => (
                       <div key={i} className="absolute w-1 h-1 bg-indigo-500 rounded-full animate-ping" 
                            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${i*0.2}s` }} />
                     ))}
                  </div>
                )}

                <div className={`relative transition-all duration-1000 ${isForging ? 'scale-90 blur-md opacity-40 rotate-12' : 'scale-100 blur-0 opacity-100 rotate-0'}`}>
                   <div className="w-64 h-40 bg-indigo-500/10 border-2 border-indigo-500/40 rounded-[32px] flex flex-col items-center justify-center p-8 backdrop-blur-3xl shadow-[0_0_80px_rgba(99,102,241,0.2)]">
                      <Box className={`w-12 h-12 text-indigo-500 mb-4 ${isForging ? 'animate-bounce' : ''}`} />
                      <div className="text-center">
                         <div className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest mb-1">Component_Hash</div>
                         <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">MASTER_ASSET_v1</div>
                      </div>
                   </div>
                </div>

                {/* Progress Overlay */}
                {isForging && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                     <div className="text-center">
                        <div className="text-6xl font-tech font-bold text-white mb-2">{progress}%</div>
                        <div className="text-[10px] font-mono text-indigo-300 uppercase tracking-[0.5em] animate-pulse">Materializing...</div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
