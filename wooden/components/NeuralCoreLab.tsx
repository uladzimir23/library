
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Brain, Wand2, Loader2, Sparkles, Cpu, Send, Terminal, Database, Activity, RefreshCw, Layers, ShieldAlert } from 'lucide-react';
import { playUISound } from './AudioService';

interface MatterBlueprint {
  color: string;
  blur: number;
  mass: number;
  friction: number;
  bounce: number;
  labels: string[];
}

export const NeuralCoreLab: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<MatterBlueprint | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const synthesizeMatter = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    playUISound('process');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this matter description: "${prompt}". 
        Convert it into physical attributes for a spatial UI system.
        Return ONLY a JSON object with:
        color (hex string),
        blur (number 0 to 60),
        mass (number 0.1 to 2.0),
        friction (number 0 to 0.2),
        bounce (number 0.6 to 0.98),
        labels (array of 3 technical terms describing this state).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              color: { type: Type.STRING },
              blur: { type: Type.NUMBER },
              mass: { type: Type.NUMBER },
              friction: { type: Type.NUMBER },
              bounce: { type: Type.NUMBER },
              labels: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });

      const data = JSON.parse(response.text || "{}") as MatterBlueprint;
      setBlueprint(data);
      playUISound('success');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (blueprint) {
        // Балансировка на основе новых стандартов (0.15 / 0.80)
        const dx = -currentPos.x;
        const dy = -currentPos.y;
        
        // Масса влияет на инерцию: чем тяжелее, тем медленнее отклик
        const stiffness = 0.15 / blueprint.mass;
        const damping = blueprint.bounce; 
        
        velocity.current.x = (velocity.current.x + dx * stiffness) * damping;
        velocity.current.y = (velocity.current.y + dy * stiffness) * damping;
        
        setCurrentPos(prev => ({
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        }));
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [blueprint, currentPos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!blueprint) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    
    // Внешняя сила прикладывается к вектору скорости
    velocity.current.x += (x - currentPos.x) * 0.05;
    velocity.current.y += (y - currentPos.y) * 0.05;

    setRotation({ x: y * 0.4, y: x * -0.4 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch h-auto lg:h-[800px]">
      
      {/* 1. INPUT TERMINAL */}
      <div className={`lg:col-span-4 flex flex-col p-1 rounded-[64px] border ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-100 border-black/5'}`}>
         <div className={`p-8 border-b ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'} rounded-t-[60px] flex items-center justify-between`}>
            <div className="flex items-center gap-3">
               <Terminal className="w-5 h-5 text-violet-500" />
               <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Matter_Prompt_v1.0</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
         </div>

         <div className="flex-1 p-10 flex flex-col gap-10">
            <div className="space-y-4">
               <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Description_Buffer</label>
               <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your matter (e.g., 'A cold obsidian slab with mirror refraction and extreme gravity')..."
                  className="w-full h-40 bg-transparent border-none outline-none resize-none text-2xl font-tech tracking-tight placeholder:opacity-20 text-zinc-900 dark:text-white"
               />
            </div>

            <div className="mt-auto space-y-4">
               <button 
                 onClick={synthesizeMatter}
                 disabled={loading || !prompt.trim()}
                 className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-2xl
                    ${loading ? 'bg-zinc-800 text-zinc-600' : 'bg-violet-600 text-white hover:bg-violet-500'}
                 `}
               >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                 {loading ? 'Synthesizing...' : 'Sinthesize_Matter'}
               </button>
               
               <p className="text-[9px] text-zinc-500 font-mono text-center uppercase tracking-tighter opacity-40">
                 System: Gemini-3-Flash-Preview // Midpoint: 50/50 Calibration
               </p>
            </div>
         </div>
      </div>

      {/* 2. NEURAL VIEWPORT */}
      <div 
        onMouseMove={handleMouseMove}
        className={`lg:col-span-8 relative rounded-[64px] border overflow-hidden flex items-center justify-center perspective-2000 group
           ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-100 border-black/5 shadow-inner'}
        `}
      >
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

         {/* THE FORGED OBJECT */}
         <div 
           className="relative w-full h-full flex items-center justify-center preserve-3d"
         >
            {blueprint ? (
               <div 
                 className="relative w-80 h-[500px] transition-all duration-300 ease-out shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden"
                 style={{ 
                    transform: `translate3d(${currentPos.x}px, ${currentPos.y}px, 0px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    backgroundColor: `${blueprint.color}15`,
                    borderColor: `${blueprint.color}44`,
                    borderWidth: '2px',
                    borderRadius: '80px',
                    backdropFilter: `blur(${blueprint.blur}px)`,
                    boxShadow: `0 40px 100px -20px ${blueprint.color}33, inset 0 0 50px ${blueprint.color}11`
                 }}
               >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center gap-10">
                     <div className="w-24 h-24 rounded-[36px] flex items-center justify-center shadow-2xl transition-all duration-1000"
                          style={{ backgroundColor: `${blueprint.color}44`, transform: `rotate(${currentPos.x * 0.5}deg)` }}>
                        <Brain className="w-12 h-12 text-white" />
                     </div>
                     <div className="text-center space-y-4">
                        <div className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40 text-white">Neural_Forged_State</div>
                        <div className="flex flex-wrap justify-center gap-2">
                           {blueprint.labels.map((l, i) => (
                             <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase text-white">{l}</span>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Diagnostic Scanline */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                     <div className="w-full h-[2px] bg-white/40 animate-scan blur-[2px]" />
                  </div>
               </div>
            ) : (
               <div className="text-center space-y-6 opacity-20 group-hover:opacity-40 transition-opacity">
                  <RefreshCw className="w-20 h-20 mx-auto animate-spin-slow" />
                  <div className="text-2xl font-tech font-bold uppercase tracking-widest">Awaiting_Sintehsis</div>
               </div>
            )}
         </div>

         {/* Floating Metrics HUD */}
         {blueprint && (
            <div className="absolute bottom-12 left-12 grid grid-cols-2 gap-8 z-50">
               <div className="flex flex-col gap-1">
                  <div className="text-[8px] font-mono text-zinc-500 uppercase font-black">Mass_Constant</div>
                  <div className="text-xl font-tech font-bold text-violet-500 uppercase">{blueprint.mass.toFixed(3)}_M☉</div>
               </div>
               <div className="flex flex-col gap-1">
                  <div className="text-[8px] font-mono text-zinc-500 uppercase font-black">Recoil_Bias</div>
                  <div className="text-xl font-tech font-bold text-emerald-500 uppercase">{blueprint.bounce.toFixed(2)}_B</div>
               </div>
            </div>
         )}

         <div className="absolute top-12 right-12 text-right">
            <div className="text-[10px] font-mono text-violet-500 uppercase tracking-widest font-black mb-1">State_Cohesion: {blueprint ? 'LOCKED' : 'NULL'}</div>
            <div className="text-[8px] font-mono text-zinc-700 uppercase">Buffer_Address: 0x882A.F0</div>
         </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500px); }
        }
        .animate-scan { animation: scan 3s linear infinite; }
      `}</style>
    </div>
  );
};
