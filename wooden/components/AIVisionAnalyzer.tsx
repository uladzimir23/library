
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Wand2, Loader2, Sparkles, Cpu, Send, MessageSquare, Terminal, Table, CheckCircle2, Activity } from 'lucide-react';
import { playUISound } from './AudioService';

interface StructuredOutput {
  density: string;
  refraction: string;
  kinetics: string;
  blueprint_id: string;
}

export const AIVisionAnalyzer: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StructuredOutput | null>(null);
  const isDark = theme === 'dark';

  const analyzeVision = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);
    playUISound('process');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a technical architect for a React UI library. Analyze this design idea: "${input}".
        Return ONLY a JSON object with these keys: density (short technical string), refraction (float as string), kinetics (description of motion), blueprint_id (hex string).`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || "{}");
      setTimeout(() => {
        setResult(data);
        playUISound('success');
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="scroll-mt-32">
      <div className="mb-12 space-y-4">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
          AI_Component_Architect
        </span>
        <h2 className="text-6xl font-tech font-bold uppercase tracking-tighter leading-none text-zinc-900 dark:text-white">
          Лаборатория <br /><span className="text-indigo-500">Видения.</span>
        </h2>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 rounded-[48px] border overflow-hidden transition-all duration-1000 h-[550px]
        ${isDark ? 'bg-black/20 border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]'}
      `}>
        
        {/* Input Terminal */}
        <div className={`lg:col-span-7 flex flex-col p-12 border-r ${isDark ? 'border-white/5 bg-[#0a0a0c]' : 'border-black/5 bg-zinc-50'}`}>
           <div className="flex items-center gap-3 mb-8 opacity-40">
              <Terminal className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">System_Input</span>
           </div>
           
           <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Опишите желаемый компонент: 'Полупрозрачная панель с эффектом жидкого стекла и инерционным скроллом'..."
              className={`flex-1 bg-transparent border-none outline-none resize-none text-2xl font-light placeholder:opacity-20 ${isDark ? 'text-white' : 'text-zinc-900'}`}
           />

           <button 
             onClick={analyzeVision}
             disabled={loading || !input.trim()}
             className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-20
               ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-zinc-900 text-white hover:bg-black'}
             `}
           >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
             Synthesize_Blueprint
           </button>
        </div>

        {/* Structured Output Area */}
        <div className={`lg:col-span-5 flex flex-col relative h-full ${isDark ? 'bg-white/[0.02]' : 'bg-white'}`}>
           {loading && (
              <div className="absolute inset-x-0 h-[2px] bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scan z-50 pointer-events-none" />
           )}

           <div className="p-12 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-10 opacity-40">
                 <Table className="w-4 h-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Analysis_Result</span>
              </div>

              {result ? (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                   <div className="space-y-4">
                      {[
                        { label: 'Density', val: result.density, icon: Cpu },
                        { label: 'Refraction', val: result.refraction + 'n', icon: Sparkles },
                        { label: 'Kinetics', val: result.kinetics, icon: Activity },
                        { label: 'Asset_ID', val: result.blueprint_id, icon: CheckCircle2 }
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                           <div className="flex items-center gap-4">
                              <item.icon className="w-4 h-4 text-indigo-500" />
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</span>
                           </div>
                           <span className={`text-xs font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{item.val}</span>
                        </div>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-10 italic">
                   <MessageSquare className="w-12 h-12 mb-4" />
                   <p className="text-sm uppercase tracking-widest">Awaiting neural input stream...</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
