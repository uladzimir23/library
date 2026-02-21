
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Activity, Radio, MoveRight } from 'lucide-react';
import { playUISound } from './AudioService';

interface Props {
  theme: 'dark' | 'light';
}

export const TopTracks: React.FC<Props> = ({ theme }) => {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDark = theme === 'dark';

  const tracks = [
    { 
      title: 'Neural Symphony', 
      category: 'Spatial Sound', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      bpm: 124, dur: '3:42' 
    },
    { 
      title: 'Obsidian Flow', 
      category: 'Techno Minimalism', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      bpm: 128, dur: '6:12' 
    },
    { 
      title: 'Alabaster Echo', 
      category: 'Ambient Texture', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      bpm: 90, dur: '5:04' 
    }
  ];

  const toggleTrack = (i: number) => {
    if (playing === i) {
      audioRef.current?.pause();
      setPlaying(null);
      playUISound('click');
    } else {
      setPlaying(i);
      playUISound('success');
      if (audioRef.current) {
        audioRef.current.src = tracks[i].url;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="scroll-mt-32">
      <audio ref={audioRef} />
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
         <div className="space-y-4">
            <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Production_Showcase_v0.2</span>
            <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
               Топ <br /><span className="text-indigo-500">Релизов.</span>
            </h2>
         </div>
      </div>

      <div className={`rounded-[64px] border overflow-hidden transition-all duration-1000
        ${isDark ? 'bg-black/20 border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]'}
      `}>
         <div className="divide-y divide-current divide-opacity-5">
            {tracks.map((track, i) => (
              <div 
                key={i}
                onClick={() => toggleTrack(i)}
                onMouseEnter={() => playUISound('hover')}
                className={`relative p-12 transition-all duration-500 flex flex-col md:flex-row items-center gap-12 group cursor-pointer
                  ${playing === i ? (isDark ? 'bg-white/[0.02]' : 'bg-indigo-50/30') : ''}
                `}
              >
                 <div className="flex items-center gap-10 w-full md:w-1/3">
                    <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center transition-all duration-700 shadow-2xl
                      ${playing === i ? 'bg-indigo-600 text-white scale-110 rotate-12' : (isDark ? 'bg-zinc-900 text-zinc-600' : 'bg-zinc-100 text-zinc-400')}
                    `}>
                       {playing === i ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-0.5" />}
                    </div>
                    <div>
                       <h4 className={`text-2xl font-tech font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-zinc-900'}`}>{track.title}</h4>
                       <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.3em] mt-1">{track.category}</div>
                    </div>
                 </div>

                 {/* WAVEFORM */}
                 <div className="flex-1 flex items-center gap-1 h-12 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                    {[...Array(50)].map((_, j) => (
                      <div 
                        key={j}
                        className={`w-px rounded-full transition-all duration-300 ${playing === i ? 'bg-indigo-500' : (isDark ? 'bg-white' : 'bg-black')}`}
                        style={{ 
                          height: playing === i ? `${Math.random() * 100}%` : '20%',
                          transitionDelay: `${j * 10}ms`
                        }}
                      />
                    ))}
                 </div>

                 <div className="flex items-center gap-12 w-full md:w-auto text-right">
                    <div className="whitespace-nowrap">
                       <div className="text-[8px] font-mono opacity-20 uppercase tracking-widest">BPM / Length</div>
                       <div className={`text-sm font-tech font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{track.bpm} / {track.dur}</div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
