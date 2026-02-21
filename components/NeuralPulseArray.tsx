import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export const NeuralPulseArray: React.FC = () => {
  const [pulses, setPulses] = useState<{ id: number; pathIdx: number }[]>([]);

  const paths = [
    "M 10,50 Q 50,10 90,50",
    "M 10,50 Q 50,90 90,50",
    "M 50,10 L 50,90",
    "M 10,10 L 90,90",
    "M 90,10 L 10,90"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const pathIdx = Math.floor(Math.random() * paths.length);
      setPulses(prev => [...prev.slice(-3), { id, pathIdx }]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md aspect-square bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center shadow-2xl border border-white/5">
       <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,#fff_0.5px,transparent_0.5px)] bg-[length:40px_40px]" />

       <svg viewBox="0 0 100 100" className="w-full max-w-sm h-auto overflow-visible opacity-30">
          <defs>
             <filter id="pulse-glow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
          </defs>

          {paths.map((p, i) => (
            <path key={`bg-${i}`} d={p} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          ))}

          {pulses.map((p) => (
            <path 
              key={p.id}
              d={paths[p.pathIdx]}
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.2"
              strokeDasharray="15 100"
              strokeDashoffset="115"
              filter="url(#pulse-glow)"
              className="animate-[dash_2.5s_ease-in-out_forwards]"
            />
          ))}

          {[
            {x: 10, y: 50}, {x: 90, y: 50}, {x: 50, y: 10}, 
            {x: 50, y: 90}, {x: 10, y: 10}, {x: 90, y: 90}
          ].map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="1.2" fill="#444" />
          ))}
       </svg>

       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-indigo-500/20 animate-ping" />
          <Activity className="w-8 h-8 text-indigo-500/40 relative z-10" />
       </div>

       <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -115; }
        }
      `}</style>
    </div>
  );
};
