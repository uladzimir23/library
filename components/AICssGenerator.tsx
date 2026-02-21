
import React, { useState } from 'react';
import { generateGlassStyle } from '../services/geminiService';
import { AICssResponse } from '../types';
import { Sparkles, Copy, Loader2, Wand2 } from 'lucide-react';

export const AICssGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AICssResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || loading) return;
    
    setLoading(true);
    try {
      const data = await generateGlassStyle(prompt);
      setResult(data);
    } catch (err) {
      alert("Something went wrong. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="py-24 border-t border-white/5" id="ai-generator">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4 inline-block">
              AI Powered
            </span>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              Design by <span className="text-pink-500">Imagination</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Describe the glass effect you want, and our AI model will generate 
              the perfect combination of Tailwind classes and React styles.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="relative group">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Frosted arctic morning with a deep purple border'"
              className="w-full bg-zinc-900/80 border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all pr-32 placeholder:text-zinc-600"
            />
            <button 
              type="submit"
              disabled={loading || !prompt}
              className="absolute right-3 top-3 bottom-3 px-6 rounded-xl bg-pink-500 hover:bg-pink-400 disabled:opacity-50 disabled:hover:bg-pink-500 text-white font-semibold transition-all flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              Generate
            </button>
          </form>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Tailwind Output</h4>
                  <button 
                    onClick={() => copyToClipboard(result.tailwindClasses)}
                    className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <code className="text-pink-300 break-all leading-loose text-sm font-mono">
                  {result.tailwindClasses}
                </code>
              </div>
              <p className="text-zinc-400 text-sm italic border-l-2 border-pink-500/50 pl-4 py-1">
                {result.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 w-full min-h-[400px] bg-zinc-900/30 rounded-[40px] border border-white/5 relative overflow-hidden flex items-center justify-center p-12">
           {/* Abstract Background for Preview */}
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-30" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full" />
           
           <div 
             className={`w-full max-w-sm h-[200px] transition-all duration-1000 ${result ? result.tailwindClasses : 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl'}`}
             style={result?.styleObject}
           >
             <div className="p-8 h-full flex flex-col justify-between relative z-10">
               <div className="flex justify-between items-start">
                 <div className="w-12 h-12 bg-white/20 rounded-xl" />
                 <Sparkles className="text-white/40 w-5 h-5" />
               </div>
               <div>
                  <div className="h-6 w-32 bg-white/30 rounded-full mb-3" />
                  <div className="h-4 w-48 bg-white/10 rounded-full" />
               </div>
             </div>
           </div>
           
           {!result && !loading && (
             <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 backdrop-blur-[2px]">
               <p className="text-zinc-500 font-medium">Preview will appear here</p>
             </div>
           )}
           {loading && (
             <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 backdrop-blur-[2px]">
               <div className="flex flex-col items-center gap-4">
                 <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
                 <p className="text-pink-400/80 font-mono animate-pulse">Consulting Gemini...</p>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
