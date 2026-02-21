
export const playUISound = (type: 'hover' | 'click' | 'success' | 'process' | 'glass' | 'heavy') => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  if (type === 'hover') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'click') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'success') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523, now); 
    osc.frequency.exponentialRampToValueAtTime(1046, now + 0.2); 
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'process') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(440, now + 0.8);
    gain.gain.setValueAtTime(0.01, now);
    osc.start(now);
    osc.stop(now + 0.8);
  } else if (type === 'glass') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(3000, now + 0.03);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.03);
    osc.start(now);
    osc.stop(now + 0.03);
  } else if (type === 'heavy') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.2);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  }
};
