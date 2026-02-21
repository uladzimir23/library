import React, { useContext } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Ban, Zap, Ghost, Target, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const ProtocolMatrix: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const items = [
    { id: 'loading', icon: Loader2, color: 'indigo', protocol: '0x1A' },
    { id: 'error', icon: AlertCircle, color: 'rose', protocol: '0x4E' },
    { id: 'success', icon: CheckCircle2, color: 'emerald', protocol: '0x2S' },
    { id: 'disabled', icon: Ban, color: 'zinc', protocol: '0x8D' },
    { id: 'glitch', icon: Zap, color: 'violet', protocol: '0x3G' },
    { id: 'pulse', icon: Activity, color: 'amber', protocol: '0x5P' },
    { id: 'ghost', icon: Ghost, color: 'sky', protocol: '0x0G' },
    { id: 'focus', icon: Target, color: 'fuchsia', protocol: '0x7F' },
  ];

  return (
    <section className="py-32 scroll-mt-24" id="protocols">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-1deg); }
          75% { transform: translateX(4px) rotate(1deg); }
        }
        @keyframes bloom {
          0% { box-shadow: 0 0 0px var(--bloom-color); }
          50% { box-shadow: 0 0 40px var(--bloom-color); }
          100% { box-shadow: 0 0 0px var(--bloom-color); }
        }
        @keyframes ripple-out {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes focus-lock {
          0% { padding: 10px; opacity: 0; transform: scale(1.2); }
          100% { padding: 0px; opacity: 1; transform: scale(1); }
        }
        @keyframes float-ghost {
          0%, 100% { transform: translateY(0); filter: blur(0px); }
          50% { transform: translateY(-10px); filter: blur(2px); }
        }

        .state-loading:hover { backdrop-filter: blur(20px); transition: 0.5s; }
        .state-error:hover { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both infinite; }
        .state-success:hover { --bloom-color: rgba(16, 185, 129, 0.4); animation: bloom 2s infinite; }
        .state-disabled:hover { transform: scale(0.95); filter: grayscale(1) brightness(0.5); opacity: 0.5; }
        .state-pulse:hover .pulse-ring { animation: ripple-out 1.5s infinite cubic-bezier(0, 0, 0.2, 1); }
        .state-ghost:hover { animation: float-ghost 3s infinite ease-in-out; opacity: 0.15; }
        .state-focus:hover .focus-bracket-container { animation: focus-lock 0.3s forwards cubic-bezier(0.19, 1, 0.22, 1); }
        .state-glitch:hover { filter: hue-rotate(90deg) contrast(1.2); transform: skewX(-2deg); }
      `}</style>

      <div className="text-center mb-24">
        <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">
          {t.protocols.tag}
        </span>
        <h2 className="text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white mb-6 uppercase">
          {t.protocols.title} <span className="text-indigo-500">{t.protocols.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed italic">
          {t.protocols.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          const text = (t.protocols.items as any)[item.id];
          
          return (
            <div 
              key={item.id}
              className={`group relative bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] p-8 overflow-hidden transition-all duration-500 state-${item.id} cursor-none sm:cursor-default`}
            >
              {/* Unique Visual elements per ID */}
              {item.id === 'pulse' && (
                <div className="pulse-ring absolute inset-0 border-2 border-amber-500/30 rounded-[32px] opacity-0" />
              )}
              
              {item.id === 'focus' && (
                <div className="focus-bracket-container absolute inset-0 p-10 opacity-0 pointer-events-none">
                  <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-fuchsia-500 rounded-tl-lg" />
                  <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-fuchsia-500 rounded-tr-lg" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-fuchsia-500 rounded-bl-lg" />
                  <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-fuchsia-500 rounded-br-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-fuchsia-500/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-fuchsia-500/30" />
                </div>
              )}

              {/* Background Accent Blur */}
              <div className={`absolute -top-10 -right-10 w-24 h-24 bg-${item.color}-500/10 blur-[40px] rounded-full group-hover:scale-[2.5] transition-transform duration-700`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center text-${item.color}-500 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    <Icon className={`w-6 h-6 ${item.id === 'loading' ? 'animate-spin' : ''}`} />
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 tracking-widest opacity-50">{item.protocol}</span>
                </div>

                <div>
                  <h3 className="text-xl font-tech font-bold uppercase mb-2 text-zinc-900 dark:text-white transition-all">
                    {text.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-500 text-[11px] leading-relaxed uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                    {text.desc}
                  </p>
                </div>
              </div>

              {/* Hover highlight layer */}
              <div className={`absolute inset-0 bg-${item.color}-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
