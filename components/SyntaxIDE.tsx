
import React, { useState, useContext, useRef } from 'react';
import { 
  Code2, Terminal, Braces, Copy, Check, Play, Bug, 
  GitBranch, Sliders, Activity, Gauge, Monitor, 
  RefreshCw, SunMoon, Sparkles, Eye, EyeOff, Hash
} from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

type SyntaxTheme = 'COBALT' | 'AMBER' | 'MONO';

export const SyntaxIDE: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('App.tsx');
  const [fontSize, setFontSize] = useState(13);
  const [compileSpeed, setCompileSpeed] = useState(0.8);
  const [isCompiling, setIsCompiling] = useState(false);
  
  // New Settings
  const [theme, setTheme] = useState<SyntaxTheme>('COBALT');
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [bgOpacity, setBgOpacity] = useState(0.9);
  const [showLines, setShowLines] = useState(true);
  const [debugLayer, setDebugLayer] = useState(false);

  const codeSnippet = `const MatterForge = ({ atoms }) => {
  const stability = useMemo(() => 
    calculate(atoms), [atoms]);

  return (
    <div style={{ blur: stability }}>
      <RefractiveCore />
    </div>
  );
};`;

  const getThemeColors = (word: string) => {
    if (theme === 'MONO') return 'text-zinc-300';
    
    const colors: Record<SyntaxTheme, any> = {
      COBALT: {
        keywords: 'text-pink-500',
        components: 'text-indigo-400',
        operators: 'text-amber-400',
        strings: 'text-emerald-400'
      },
      AMBER: {
        keywords: 'text-amber-600',
        components: 'text-amber-400',
        operators: 'text-orange-500',
        strings: 'text-yellow-200'
      },
      MONO: {} // Handled above
    };

    if (['const', 'return', 'import', 'export'].includes(word)) return colors[theme].keywords;
    if (['MatterForge', 'RefractiveCore', 'useMemo'].includes(word)) return colors[theme].components;
    if (word.includes('=>') || word === '=' || word === '=>') return colors[theme].operators;
    return 'text-zinc-300';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    playUISound('click');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsCompiling(true);
    playUISound('process');
    setTimeout(() => {
      setIsCompiling(false);
      playUISound('success');
    }, 2000 * (1.1 - compileSpeed));
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Syntax_Architecture_Workbench_v8.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Compiler_Ready: {isCompiling ? 'BUSY' : 'IDLE'}</div>
            <div className="w-12 h-1 bg-indigo-500/20 rounded-full overflow-hidden">
               <div className={`h-full bg-indigo-500 transition-all ${isCompiling ? 'w-full duration-[2000ms]' : 'w-0'}`} />
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[850px]">
         {/* SETTINGS SIDEBAR */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-8 bg-zinc-900/50 overflow-y-auto custom-scroll">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Архитектура_IDE</span>
               </div>

               {/* Appearance Group */}
               <div className="space-y-6">
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                        <span>Размер_Шрифта</span>
                        <span className="text-indigo-400">{fontSize}px</span>
                     </div>
                     <input type="range" min="10" max="20" step="1" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                        <span>Optical_Glow</span>
                        <span className="text-indigo-400">{(glowIntensity * 100).toFixed(0)}%</span>
                     </div>
                     <input type="range" min="0" max="1" step="0.05" value={glowIntensity} onChange={e => setGlowIntensity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                        <span>Surface_Alpha</span>
                        <span className="text-indigo-400">{(bgOpacity * 100).toFixed(0)}%</span>
                     </div>
                     <input type="range" min="0.3" max="1" step="0.01" value={bgOpacity} onChange={e => setBgOpacity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                  </div>
               </div>

               {/* Theme Switcher */}
               <div className="space-y-4">
                  <div className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Цветовой_Спектр</div>
                  <div className="flex gap-2">
                     {(['COBALT', 'AMBER', 'MONO'] as SyntaxTheme[]).map(t => (
                        <button 
                           key={t}
                           onClick={() => { setTheme(t); playUISound('click'); }}
                           className={`flex-1 py-2 rounded-lg text-[8px] font-black transition-all border ${theme === t ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                        >
                           {t}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Toggles */}
               <div className="space-y-3 pt-4 border-t border-white/5">
                  <button 
                     onClick={() => setShowLines(!showLines)}
                     className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${showLines ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-600'}`}
                  >
                     <span className="text-[9px] font-bold uppercase">Line_Numbers</span>
                     {showLines ? <Hash className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                  <button 
                     onClick={() => setDebugLayer(!debugLayer)}
                     className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${debugLayer ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-zinc-600'}`}
                  >
                     <span className="text-[9px] font-bold uppercase">Diagnostic_Overlay</span>
                     {debugLayer ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-indigo-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">VRAM_Allocation</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(bgOpacity * 124).toFixed(1)}MB</div>
            </div>
         </div>

         {/* VIEWPORT (Editor) */}
         <div 
            className="flex-1 relative overflow-hidden flex flex-col group shadow-inner transition-colors duration-1000"
            style={{ backgroundColor: `rgba(13, 17, 23, ${bgOpacity})` }}
         >
            {/* Debug Layer Mesh */}
            {debugLayer && (
               <div className="absolute inset-0 pointer-events-none z-10 opacity-20" style={{ backgroundImage: 'linear-gradient(#f43f5e 1px, transparent 1px), linear-gradient(90deg, #f43f5e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            )}

            {/* Tabs */}
            <div className="flex bg-[#090c10]/80 backdrop-blur-md border-b border-white/5 px-6 z-20">
               {['App.tsx', 'theme.ts', 'hooks.ts'].map(tab => (
                 <div 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-3 text-[10px] font-mono cursor-pointer transition-all border-b-2 ${activeTab === tab ? 'border-indigo-500 text-indigo-400 bg-white/5' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}
                 >
                   {tab}
                 </div>
               ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-10 overflow-auto custom-scroll relative z-20">
               {isCompiling && (
                 <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                       <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin" />
                       <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.4em] animate-pulse">Building_AST_Nodes...</div>
                    </div>
                 </div>
               )}
               
               <div 
                  className="flex gap-8 font-mono transition-all duration-300" 
                  style={{ 
                     fontSize: `${fontSize}px`,
                     textShadow: glowIntensity > 0 ? `0 0 ${glowIntensity * 20}px ${theme === 'AMBER' ? 'rgba(245,158,11,0.5)' : 'rgba(99,102,241,0.4)'}` : 'none'
                  }}
               >
                  {showLines && (
                     <div className="text-zinc-700 text-right select-none space-y-1 border-r border-white/5 pr-6">
                        {codeSnippet.split('\n').map((_, i) => <div key={i} className={isCompiling && i === 2 ? 'text-indigo-500' : ''}>{i + 1}</div>)}
                     </div>
                  )}
                  <div className="flex-1 space-y-1">
                     {codeSnippet.split('\n').map((line, i) => (
                        <div key={i} className="text-zinc-300 whitespace-pre group/line flex items-center">
                           <span className="flex-1">
                              {line.split(' ').map((word, j) => (
                                 <span key={j} className={`${getThemeColors(word)} transition-colors duration-500`}>{word} </span>
                              ))}
                           </span>
                           {debugLayer && (
                              <span className="text-[7px] font-mono text-rose-500/40 opacity-0 group-hover/line:opacity-100 uppercase ml-4">
                                 ln_ptr: 0x{i.toString(16).toUpperCase()}
                              </span>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#090c10] border-t border-white/5 px-8 py-3 flex justify-between items-center text-[10px] font-mono text-zinc-600 relative z-20">
               <div className="flex gap-6 items-center">
                  <button onClick={handleRun} className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors group/run">
                     <Play className={`w-3 h-3 fill-current transition-transform ${isCompiling ? 'scale-0' : 'group-hover:scale-110'}`} />
                     {isCompiling ? 'COMPILING' : 'RUN_SYSTEM'}
                  </button>
                  <div className="flex items-center gap-2">
                     <Bug className="w-3 h-3 text-rose-500" /> 0 ERRORS
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="flex items-center gap-2 text-[8px] opacity-40">
                     <Sparkles className="w-3 h-3" />
                     {theme}_THEME
                  </div>
                  <button onClick={handleCopy} className="hover:text-white transition-colors flex items-center gap-2">
                     {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                     {copied ? 'COPIED' : 'COPY'}
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
