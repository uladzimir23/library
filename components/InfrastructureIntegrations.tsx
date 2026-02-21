import React, { useState, useContext } from 'react';
import { Cloud, Github, Database, Shield, Zap, Share2, Server, Globe, ExternalLink, Cpu } from 'lucide-react';
import { LanguageContext } from '../App';

export const InfrastructureIntegrations: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    { id: 'aws', icon: Cloud, label: 'Cloud_S3', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'git', icon: Github, label: 'Repo_Sync', color: 'text-zinc-900 dark:text-white', bg: 'bg-zinc-500/10' },
    { id: 'db', icon: Database, label: 'Edge_DB', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'auth', icon: Shield, label: 'IAM_Guard', color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
  ];

  return (
    <section className="py-32 bg-[#fafafa] dark:bg-[#050505] border-y border-black/5 dark:border-white/5 overflow-hidden" id="infrastructure">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
                Ecosystem_v12
              </span>
              <h2 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
                Infrastructure <br /><span className="text-indigo-500">Integrations.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
                Plug and play into the world's leading infrastructure providers. Our component stack is service-agnostic, designed to bridge the gap between complex backends and tactile user interfaces.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {services.map((s) => (
                 <button 
                   key={s.id}
                   onMouseEnter={() => setActiveService(s.id)}
                   onMouseLeave={() => setActiveService(null)}
                   className={`p-6 rounded-[32px] border text-left transition-all duration-500 group ${activeService === s.id ? 'bg-white dark:bg-zinc-900 border-indigo-500/50 shadow-2xl translate-y-[-4px]' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
                 >
                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-6 transition-transform group-hover:rotate-12`}>
                       <s.icon className={`w-6 h-6 ${s.color}`} />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">Service_Node</div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest flex items-center justify-between">
                       {s.label}
                       <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                    </div>
                 </button>
               ))}
            </div>
          </div>

          <div className="flex-1 w-full h-[650px] relative flex items-center justify-center">
             {/* Central Hub */}
             <div className="relative z-10 w-48 h-48 bg-white dark:bg-zinc-900 border border-indigo-500/30 rounded-[56px] shadow-[0_0_100px_rgba(99,102,241,0.15)] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
                <Server className="w-12 h-12 text-indigo-500 mb-4 animate-pulse" />
                <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Mainframe_0xDF</div>
                <div className="mt-2 flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-emerald-500/40 rounded-full" />)}
                </div>
             </div>

             {/* Connection Lines & Particles */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-20 dark:opacity-40">
                <defs>
                   <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                   </linearGradient>
                </defs>
                {[
                  { x1: '20%', y1: '20%', active: activeService === 'aws' },
                  { x1: '80%', y1: '20%', active: activeService === 'git' },
                  { x1: '20%', y1: '80%', active: activeService === 'db' },
                  { x1: '80%', y1: '80%', active: activeService === 'auth' }
                ].map((line, i) => (
                  <g key={i}>
                     <line x1={line.x1} y1={line.y1} x2="50%" y2="50%" stroke={line.active ? "#6366f1" : "currentColor"} strokeWidth={line.active ? "2" : "0.5"} className="transition-all duration-500" />
                     {line.active && (
                       <circle r="4" fill="#6366f1" filter="blur(4px)">
                          <animateMotion dur="1s" repeatCount="indefinite" path={`M ${line.x1} ${line.y1} L 50% 50%`} />
                       </circle>
                     )}
                  </g>
                ))}
             </svg>

             {/* Floating HUD Elements */}
             <div className="absolute top-12 left-12 p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[32px] shadow-2xl animate-float">
                <div className="flex items-center gap-3 text-emerald-500 mb-2">
                   <Globe className="w-4 h-4" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Global_Edge</span>
                </div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">AMS_088.2</div>
             </div>

             <div className="absolute bottom-12 right-12 p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[32px] shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3 text-indigo-500 mb-2">
                   <Cpu className="w-4 h-4" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Runtime_Load</span>
                </div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">12.4ms</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
