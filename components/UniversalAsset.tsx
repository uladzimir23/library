import React, { useState, useContext, useRef } from 'react';
import { Shield, Activity, Cpu, Globe, Zap, BarChart3, Scan, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const UniversalAsset: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Сверхнизкая чувствительность для элитного ощущения
    setMousePos({ x: x * 0.15, y: y * 0.15 });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="universal">
      <div className="text-center mb-20">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.universal.tag}
        </span>
        <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.universal.title} <span className="text-indigo-500">{t.universal.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
          {t.universal.desc}
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        className="relative w-full h-[700px] bg-zinc-50 dark:bg-zinc-950/20 rounded-[60px] border border-black/5 dark:border-white/10 overflow-hidden flex items-center justify-center perspective-2000 group cursor-crosshair"
      >
        {/* Environmental Glow - Subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x),rgba(99,102,241,0.06),transparent_50%)] pointer-events-none transition-all duration-700"
             style={{ '--x': `${50 + mousePos.x * 20}%` } as any} />

        {/* The Master Molecule - Heavy Object */}
        <div 
          className="relative w-full max-w-4xl aspect-video preserve-3d transition-transform duration-1000 ease-out"
          style={{ transform: `rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 6}deg) translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)` }}
        >
          {/* Layer 0: Shadow Depth */}
          <div className="absolute inset-4 bg-black/20 blur-3xl rounded-[48px] -translate-z-20 pointer-events-none" />

          {/* Layer 1: Main Glass Body */}
          <div className="absolute inset-0 bg-white/20 dark:bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-2xl overflow-hidden flex flex-col p-8">
            {/* Header HUD - Subtle Parallax */}
            <div 
              className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 transition-transform duration-700"
              style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Quantum_Core_v2</div>
                  <div className="text-[9px] font-mono text-indigo-500 uppercase">Status: Fully_Operational</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Freq_Resonance</div>
                  <div className="text-xs font-bold text-emerald-500">124.08 GHz</div>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <Activity className="w-6 h-6 text-indigo-500 animate-pulse" />
              </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 grid grid-cols-12 gap-6">
              {/* Internal Parallax Item 1 */}
              <div 
                className="col-span-8 bg-black/5 dark:bg-white/5 rounded-3xl border border-white/10 p-6 transition-transform duration-700"
                style={{ transform: `translateZ(20px) translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)` }}
              >
                <div className="flex justify-between mb-4">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Neural_Map_Stream</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  </div>
                </div>
                <div className="relative h-48 bg-black/10 rounded-2xl overflow-hidden border border-white/5">
                  <svg className="absolute inset-0 w-full h-full">
                    <path 
                      d="M 0,100 Q 50,20 100,100 T 200,100 T 300,50 T 400,150" 
                      fill="none" stroke="#6366f1" strokeWidth="2"
                      className="animate-[dash_5s_linear_infinite]"
                      strokeDasharray="400"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent" />
                </div>
              </div>

              {/* Internal Parallax Item 2 */}
              <div 
                className="col-span-4 space-y-4 transition-transform duration-700"
                style={{ transform: `translateZ(40px) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
              >
                {[
                  { icon: Cpu, label: 'Compute', val: '94%' },
                  { icon: Globe, label: 'Network', val: 'Active' },
                  { icon: BarChart3, label: 'Throughput', val: '2.4 GB/s' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white/10 dark:bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-indigo-600 transition-all cursor-pointer group/item">
                    <item.icon className="w-5 h-5 text-indigo-500 group-hover/item:text-white transition-colors" />
                    <div>
                      <div className="text-[8px] text-zinc-500 uppercase group-hover/item:text-white/60">{item.label}</div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover/item:text-white">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Footer */}
            <div 
              className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end translate-z-30 transition-transform duration-700"
              style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)` }}
            >
              <div className="flex gap-8">
                <div>
                  <div className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Depth_Factor</div>
                  <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white">{(1.5 + mousePos.y * 0.05).toFixed(3)}</div>
                </div>
              </div>
              <button className="px-8 py-3 bg-indigo-600 rounded-2xl text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 group/btn">
                <Scan className="w-4 h-4" />
                Initialize
              </button>
            </div>
          </div>

          {/* Floating HUD Markers - Subtle High Parallax */}
          <div 
            className="absolute -right-12 top-1/4 -translate-y-1/2 p-6 bg-rose-500/10 backdrop-blur-2xl border border-rose-500/20 rounded-[32px] shadow-2xl transition-transform duration-300"
            style={{ transform: `translateZ(100px) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
          >
             <div className="flex items-center gap-4 mb-4">
                <Zap className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">ALERT</span>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .translate-z-30 { transform: translateZ(30px); }
        .-translate-z-20 { transform: translateZ(-20px); }
      `}</style>
    </section>
  );
};
