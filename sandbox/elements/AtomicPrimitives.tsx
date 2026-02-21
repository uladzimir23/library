
import React, { useState, useEffect } from 'react';
import { 
  Zap, Command, Terminal, Sliders, Box, Cpu, 
  ChevronRight, Search, Target, Radio, Activity, 
  Layers, Gauge, Battery, Wifi, Bell, Shield, 
  Settings, Key, MousePointer2, RefreshCw, Atom,
  Layout, List, Check, Phone, Signal, Clock, User
} from 'lucide-react';

export interface PhysicsProps {
  mass: number;
  refraction: number;
  blur: number;
  radius: number;
  tension: number;
}

const getBaseTransition = (tension: number) => `all ${0.8 - tension * 0.5}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;

// 1. Кнопка Действия
export const AtomicButton: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <button 
    className="px-12 py-6 text-white font-tech font-bold uppercase tracking-[0.4em] relative group overflow-hidden border-2 shadow-2xl"
    style={{
      borderRadius: `${physics.radius}px`,
      backdropFilter: `blur(${physics.blur}px)`,
      backgroundColor: `rgba(217, 70, 239, ${0.1 + physics.refraction * 0.3})`,
      borderColor: `rgba(255, 255, 255, ${physics.refraction * 0.5})`,
      transform: `scale(${1.2 - physics.mass * 0.1})`,
      transition: getBaseTransition(physics.tension)
    }}
  >
    <span className="relative z-10 flex items-center gap-4">
      <Zap className="w-5 h-5 fill-current animate-pulse" /> 0x_EXECUTE
    </span>
    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

// 2. Поле Ввода
export const AtomicInput: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="w-80 space-y-4" style={{ transform: `scale(${1.1 - physics.mass * 0.05})` }}>
    <div className="flex justify-between px-4">
       <span className="text-[9px] font-mono text-fuchsia-400 uppercase font-black">Data_Link</span>
       <Terminal className="w-4 h-4 text-zinc-700" />
    </div>
    <div 
      className="p-1 border overflow-hidden shadow-inner"
      style={{
        borderRadius: `${physics.radius / 2}px`,
        backdropFilter: `blur(${physics.blur}px)`,
        borderColor: `rgba(255, 255, 255, ${physics.refraction * 0.2})`,
        backgroundColor: `rgba(0, 0, 0, 0.4)`
      }}
    >
      <input type="text" placeholder="QUERY_SYSTEM..." className="w-full bg-transparent border-none outline-none p-5 text-lg font-tech text-white placeholder:text-zinc-800" />
    </div>
  </div>
);

// 3. Слайдер
export const AtomicSlider: React.FC<{ physics: PhysicsProps }> = ({ physics }) => {
  const [val, setVal] = useState(65);
  return (
    <div className="w-80 p-8 space-y-6" style={{ 
      borderRadius: `${physics.radius}px`,
      backgroundColor: `rgba(255, 255, 255, ${physics.refraction * 0.05})`,
      border: `1px solid rgba(255,255,255,${physics.refraction * 0.1})`
    }}>
      <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase">
        <span>Resonance</span>
        <span className="text-fuchsia-500">{val}%</span>
      </div>
      <div className="relative h-2 bg-black rounded-full overflow-hidden">
        <div className="h-full bg-fuchsia-600 shadow-[0_0_20px_#d946ef]" style={{ width: `${val}%` }} />
        <input 
          type="range" min="0" max="100" value={val} 
          onChange={e => setVal(parseInt(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

// 4. Радиальный Прибор
export const AtomicRadialMeter: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="relative w-48 h-48 flex items-center justify-center" style={{ transform: `scale(${1.4 - physics.mass * 0.2})` }}>
    <svg className="w-full h-full -rotate-90">
      <circle cx="50%" cy="50%" r="40%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
      <circle 
        cx="50%" cy="50%" r="40%" fill="none" stroke="url(#fuchsiaGrad)" strokeWidth="12" 
        strokeDasharray="100 300" strokeLinecap="round" className="animate-pulse"
      />
      <defs>
        <linearGradient id="fuchsiaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
       <span className="text-3xl font-tech font-bold text-white tracking-tighter">84.2</span>
       <span className="text-[8px] font-mono text-zinc-500 uppercase">Load_Index</span>
    </div>
  </div>
);

// 5. Чекбокс
export const AtomicCheckbox: React.FC<{ physics: PhysicsProps }> = ({ physics }) => {
  const [checked, setChecked] = useState(true);
  return (
    <div 
      onClick={() => setChecked(!checked)}
      className="w-20 h-20 border-2 flex items-center justify-center cursor-pointer transition-all duration-300"
      style={{
        borderRadius: `${physics.radius / 2}px`,
        backgroundColor: checked ? `rgba(217, 70, 239, 0.2)` : 'transparent',
        borderColor: checked ? '#d946ef' : 'rgba(255,255,255,0.1)',
        transform: `scale(${1.2 - physics.mass * 0.1})`
      }}
    >
      {checked && <Check className="w-10 h-10 text-white animate-in zoom-in duration-300" />}
    </div>
  );
};

// 6. Аудио Визуализатор
export const AtomicVisualizer: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="flex items-end gap-1.5 h-32" style={{ transform: `scale(${1.5 - physics.mass * 0.2})` }}>
    {[...Array(12)].map((_, i) => (
      <div 
        key={i} 
        className="w-2 bg-fuchsia-500 rounded-full animate-pulse"
        style={{ 
          height: `${20 + Math.random() * 80}%`,
          opacity: 0.3 + physics.refraction * 0.7,
          animationDelay: `${i * 0.1}s`
        }} 
      />
    ))}
  </div>
);

// 7. Радар
export const AtomicRadar: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="relative w-48 h-48 border border-fuchsia-500/20 rounded-full flex items-center justify-center overflow-hidden" style={{ transform: `scale(${1.3 - physics.mass * 0.1})` }}>
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,#d946ef_30deg,transparent_60deg)] animate-[spin_4s_linear_infinite] opacity-40" />
    <div className="absolute w-full h-[1px] bg-white/5" />
    <div className="absolute h-full w-[1px] bg-white/5" />
    <Target className="w-8 h-8 text-fuchsia-500/40 relative z-10" />
  </div>
);

// 8. Цифровая Панель (Keypad)
export const AtomicKeypad: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="grid grid-cols-3 gap-3 p-6 bg-white/5 border border-white/10 rounded-[32px]" style={{ transform: `scale(${1.1 - physics.mass * 0.1})` }}>
    {[1,2,3,4,5,6,7,8,9].map(i => (
      <div key={i} className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-tech font-bold text-zinc-500 hover:text-white hover:bg-fuchsia-600 transition-all cursor-pointer">
        {i}
      </div>
    ))}
  </div>
);

// 9. Батарея
export const AtomicBattery: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="flex flex-col items-center gap-4" style={{ transform: `scale(${1.4 - physics.mass * 0.2})` }}>
    <div className="w-32 h-12 border-4 border-zinc-800 rounded-2xl p-1 relative flex items-center">
       <div className="h-full bg-emerald-500 rounded-lg animate-pulse shadow-[0_0_15px_#10b981]" style={{ width: '84%' }} />
       <div className="absolute -right-3 w-2 h-4 bg-zinc-800 rounded-r-md" />
    </div>
    <span className="text-[10px] font-mono text-zinc-500">CHARGE: 84%</span>
  </div>
);

// 10. Сигнал
export const AtomicSignal: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="flex items-end gap-1.5 h-10" style={{ transform: `scale(${1.6 - physics.mass * 0.3})` }}>
    {[1,2,3,4,5].map(i => (
      <div key={i} className={`w-2 rounded-t-sm transition-all ${i < 4 ? 'bg-fuchsia-500' : 'bg-zinc-800'}`} style={{ height: `${i * 20}%` }} />
    ))}
  </div>
);

// 11. Вкладки (Tabs)
export const AtomicTabs: React.FC<{ physics: PhysicsProps }> = ({ physics }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex p-1 bg-black/40 border border-white/5 rounded-2xl" style={{ transform: `scale(${1.2 - physics.mass * 0.1})` }}>
       {['LOGS', 'SYS', 'DATA'].map((t, i) => (
         <button key={i} onClick={() => setActive(i)} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${active === i ? 'bg-fuchsia-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>{t}</button>
       ))}
    </div>
  );
};

// 12. Бейдж
export const AtomicBadge: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div 
    className="px-6 py-2 border-2 flex items-center gap-4 shadow-xl"
    style={{
      borderRadius: `${physics.radius / 2}px`,
      borderColor: `rgba(217, 70, 239, ${physics.refraction})`,
      backgroundColor: `rgba(217, 70, 239, ${physics.refraction * 0.1})`,
      transform: `scale(${1.5 - physics.mass * 0.3})`
    }}
  >
     <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
     <span className="text-[10px] font-mono text-white uppercase font-black tracking-widest">Protocol_Active</span>
  </div>
);

// 13. Карточка Материи
export const AtomicCard: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div 
    className="w-72 h-96 border shadow-2xl relative overflow-hidden group p-10 flex flex-col justify-between"
    style={{
      borderRadius: `${physics.radius}px`,
      backdropFilter: `blur(${physics.blur}px)`,
      borderColor: `rgba(255, 255, 255, ${physics.refraction * 0.3})`,
      backgroundColor: `rgba(255, 255, 255, ${physics.refraction * 0.05})`,
      transform: `scale(${1.1 - physics.mass * 0.1})`
    }}
  >
     <div className="flex justify-between items-start">
        <Layers className="w-10 h-10 text-fuchsia-500" />
        <div className="text-[8px] font-mono text-zinc-600">ID_0xMATTER</div>
     </div>
     <div className="space-y-4">
        <div className="h-1.5 w-full bg-white/10 rounded-full" />
        <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
     </div>
     <button className="w-full py-4 bg-fuchsia-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest">Access_Slab</button>
  </div>
);

// 14. Поиск
export const AtomicSearch: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="relative w-full max-w-xl group" style={{ transform: `scale(${1.2 - physics.mass * 0.1})` }}>
     <div 
      className="relative flex items-center bg-black/60 border p-2"
      style={{ borderRadius: `${physics.radius}px`, borderColor: `rgba(255,255,255,${physics.refraction * 0.2})` }}
     >
        <div className="p-4 rounded-[inherit] bg-fuchsia-600 text-white"><Search className="w-6 h-6" /></div>
        <input type="text" placeholder="SCAN_LATTICE..." className="bg-transparent border-none outline-none flex-1 px-6 text-xl font-light text-white" />
        <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full mr-4 text-[9px] font-mono text-zinc-500 uppercase">cmd + k</div>
     </div>
  </div>
);

// 15. Тоггл
export const AtomicToggle: React.FC<{ physics: PhysicsProps }> = ({ physics }) => {
  const [active, setActive] = useState(false);
  return (
    <div onClick={() => setActive(!active)} className="flex items-center gap-6 cursor-pointer group" style={{ transform: `scale(${1.3 - physics.mass * 0.2})` }}>
       <div 
         className={`relative w-24 h-12 rounded-full p-1 transition-all duration-700
           ${active ? 'bg-fuchsia-600 shadow-[0_0_40px_rgba(217,70,239,0.4)]' : 'bg-zinc-900'}
         `}
       >
          <div className={`w-10 h-10 rounded-full bg-white shadow-xl transition-all duration-500 ${active ? 'translate-x-12' : 'translate-x-0'}`} />
       </div>
       <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{active ? 'Status_ON' : 'Status_OFF'}</span>
    </div>
  );
};

// 16. Узел
export const AtomicNode: React.FC<{ physics: PhysicsProps }> = ({ physics }) => (
  <div className="flex flex-col items-center gap-6" style={{ transform: `scale(${1.5 - physics.mass * 0.3})` }}>
     <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-2 border-dashed border-fuchsia-500/20 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-4 bg-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
           <Atom className="w-10 h-10" />
        </div>
     </div>
     <div className="text-center">
        <div className="text-[8px] font-mono text-zinc-600 uppercase">Node_Hash</div>
        <div className="text-xs font-tech font-bold text-fuchsia-400 uppercase tracking-widest">0x882_BETA</div>
     </div>
  </div>
);
