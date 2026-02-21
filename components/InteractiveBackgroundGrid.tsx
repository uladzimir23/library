import React, { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../App';

export const InteractiveBackgroundGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const ripple = useRef({ x: -1000, y: -1000, r: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let width: number;
    let height: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      ripple.current = { x: e.clientX, y: e.clientY, r: 0, active: true };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    resize();

    const gridSize = 60;
    const dots: { x: number; y: number; ox: number; oy: number }[] = [];

    const initGrid = () => {
      dots.length = 0;
      for (let x = 0; x <= width + gridSize; x += gridSize) {
        for (let y = 0; y <= height + gridSize; y += gridSize) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.08)';
      ctx.lineWidth = 0.5;

      // Update ripple
      if (ripple.current.active) {
        ripple.current.r += 15;
        if (ripple.current.r > Math.max(width, height) * 1.5) {
          ripple.current.active = false;
        }
      }

      // Draw horizontal lines
      const rows = Math.ceil(height / gridSize) + 2;
      const cols = Math.ceil(width / gridSize) + 2;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = c * rows + r;
          const dot = dots[idx];
          if (!dot) continue;

          const dx = mouse.current.x - dot.ox;
          const dy = mouse.current.y - dot.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Warp effect logic
          const maxDist = 300;
          let shiftX = 0;
          let shiftY = 0;

          if (dist < maxDist) {
            const power = (1 - dist / maxDist) * 40;
            shiftX = (dx / dist) * -power;
            shiftY = (dy / dist) * -power;
          }

          // Ripple effect logic
          if (ripple.current.active) {
            const rdx = ripple.current.x - dot.ox;
            const rdy = ripple.current.y - dot.oy;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const rDiff = Math.abs(rdist - ripple.current.r);
            if (rDiff < 100) {
              const rPower = (1 - rDiff / 100) * 20;
              shiftX += (rdx / rdist) * rPower;
              shiftY += (rdy / rdist) * rPower;
            }
          }

          dot.x = dot.ox + shiftX;
          dot.y = dot.oy + shiftY;

          if (c === 0) ctx.moveTo(dot.x, dot.y);
          else ctx.lineTo(dot.x, dot.y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = c * rows + r;
          const dot = dots[idx];
          if (!dot) continue;
          if (r === 0) ctx.moveTo(dot.x, dot.y);
          else ctx.lineTo(dot.x, dot.y);
        }
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    initGrid();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ opacity: 0.8 }}
    />
  );
};