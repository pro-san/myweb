import React, { useEffect, useRef } from 'react';

interface KonamiParticleBurstProps {
  show: boolean;
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
}

export const KonamiParticleBurst: React.FC<KonamiParticleBurstProps> = ({ show, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#38bdf8', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
    const particles: Particle[] = [];
    const count = 120;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      particles.push({
        x: centerX + (Math.random() - 0.5) * 50,
        y: centerY + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: Math.random() * 40 + 45,
      });
    }

    let isRunning = true;
    let animId: number;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18; // gravity
        p.rotation += p.vRot;
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.alpha > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    const timer = setTimeout(() => {
      isRunning = false;
      onComplete();
    }, 2200);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      clearTimeout(timer);
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative px-6 py-3 rounded-2xl bg-slate-950/90 border-2 border-cyan-400 text-cyan-300 font-mono-grotesk font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-bounce text-center">
        👾 KONAMI CODE UNLOCKED! RETRO ARCADE READY! 🎮
      </div>
    </div>
  );
};
