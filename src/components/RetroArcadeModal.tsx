import React, { useState, useEffect, useRef, useCallback } from 'react';

interface RetroArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  hp: number;
  maxHp: number;
  label: string;
  color: string;
  icon: string;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

export const RetroArcadeModal: React.FC<RetroArcadeModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fbmprime_retro_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    }
    return 0;
  });
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtFilter, setCrtFilter] = useState(true);

  // Web Audio Context for 8-bit sound synth
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: 'laser' | 'hit' | 'explosion' | 'gameover' | 'victory') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'laser') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'explosion') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'victory') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.5, now + 0.24);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled]);

  // Keys state for smooth movement
  const keysRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({
    left: false,
    right: false,
    fire: false,
  });

  // Game entities refs so animation frame always accesses latest values without re-mounting
  const playerRef = useRef({
    x: 300,
    y: 440,
    width: 36,
    height: 24,
    speed: 6.5,
    cooldown: 0,
  });

  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const enemyIdCounter = useRef(1);
  const nextSpawnTime = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const spawnExplosion = useCallback((x: number, y: number, color: string, count = 16) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 3 + 2,
        life: 0,
        maxLife: Math.random() * 20 + 20,
      });
    }
  }, []);

  const addFloatingText = useCallback((x: number, y: number, text: string, color = '#38bdf8') => {
    floatingTextsRef.current.push({
      x,
      y,
      text,
      color,
      alpha: 1,
      vy: -1.2,
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    bulletsRef.current = [];
    enemiesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    playerRef.current.x = 300;
    playerRef.current.cooldown = 0;
    playSound('victory');
  }, [playSound]);

  // Handle keyboard inputs
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code || e.key)) {
        keysRef.current.left = true;
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code || e.key)) {
        keysRef.current.right = true;
      }
      if (['Space', 'ArrowUp', 'KeyW', 'w', 'W'].includes(e.code || e.key)) {
        keysRef.current.fire = true;
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code || e.key)) {
        keysRef.current.left = false;
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code || e.key)) {
        keysRef.current.right = false;
      }
      if (['Space', 'ArrowUp', 'KeyW', 'w', 'W'].includes(e.code || e.key)) {
        keysRef.current.fire = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed internal resolution for consistent arcade math
    canvas.width = 600;
    canvas.height = 480;

    let isRunning = true;

    const enemyTypes = [
      { label: 'Bug', icon: '🐛', color: '#ef4444', hp: 1, points: 100 },
      { label: '404', icon: '🛑', color: '#f59e0b', hp: 2, points: 200 },
      { label: 'Leak', icon: '⏳', color: '#10b981', hp: 1, points: 150 },
      { label: 'Crash', icon: '💥', color: '#8b5cf6', hp: 3, points: 350 },
      { label: 'NullPtr', icon: '⚡', color: '#ec4899', hp: 2, points: 250 },
    ];

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      lastTimeRef.current = timestamp;

      // 1. Clear background (Retro deep space navy/black)
      ctx.fillStyle = '#060913';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      for (let i = 0; i < 35; i++) {
        const starX = (Math.sin(i * 99 + timestamp * 0.0005) * 0.5 + 0.5) * canvas.width;
        const starY = (Math.cos(i * 33 + timestamp * 0.0003) * 0.5 + 0.5) * canvas.height;
        ctx.fillRect(starX, starY, 1.5, 1.5);
      }

      if (gameState === 'playing') {
        // 2. Update player position
        const p = playerRef.current;
        if (keysRef.current.left) {
          p.x = Math.max(20, p.x - p.speed);
        }
        if (keysRef.current.right) {
          p.x = Math.min(canvas.width - 20, p.x + p.speed);
        }

        // Fire cooldown
        if (p.cooldown > 0) p.cooldown--;

        if (keysRef.current.fire && p.cooldown <= 0) {
          bulletsRef.current.push({
            x: p.x,
            y: p.y - 14,
            vx: 0,
            vy: -8.5,
            color: '#38bdf8',
            size: 4,
          });
          p.cooldown = 11; // 11 frames = ~5.5 shots/sec
          playSound('laser');
        }

        // 3. Spawn enemies
        if (timestamp > nextSpawnTime.current) {
          const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
          const spawnX = Math.random() * (canvas.width - 80) + 40;
          enemiesRef.current.push({
            id: enemyIdCounter.current++,
            x: spawnX,
            y: -25,
            speed: (Math.random() * 1.2 + 1.2) * (1 + level * 0.12),
            size: 24,
            hp: type.hp,
            maxHp: type.hp,
            label: type.label,
            color: type.color,
            icon: type.icon,
          });

          // Next spawn interval between 650ms and 1400ms based on level
          const interval = Math.max(500, 1300 - level * 100);
          nextSpawnTime.current = timestamp + interval;
        }

        // 4. Update bullets
        bulletsRef.current.forEach((b) => {
          b.y += b.vy;
        });
        bulletsRef.current = bulletsRef.current.filter((b) => b.y > -10);

        // 5. Update enemies & collision detection
        for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
          const enemy = enemiesRef.current[i];
          enemy.y += enemy.speed;

          // Check collision with bullets
          for (let j = bulletsRef.current.length - 1; j >= 0; j--) {
            const b = bulletsRef.current[j];
            const dist = Math.hypot(b.x - enemy.x, b.y - enemy.y);

            if (dist < enemy.size + b.size) {
              bulletsRef.current.splice(j, 1);
              enemy.hp--;
              spawnExplosion(b.x, b.y, enemy.color, 6);
              playSound('hit');

              if (enemy.hp <= 0) {
                // Enemy destroyed!
                const pointsGained = (enemy.maxHp * 100) + (level * 25);
                setScore((prev) => {
                  const newScore = prev + pointsGained;
                  if (newScore > highScore) {
                    setHighScore(newScore);
                    try {
                      localStorage.setItem('fbmprime_retro_highscore', newScore.toString());
                    } catch {
                      // ignore
                    }
                  }
                  // Level up every 1000 points
                  const newLevel = Math.floor(newScore / 1000) + 1;
                  setLevel(newLevel);
                  return newScore;
                });

                spawnExplosion(enemy.x, enemy.y, enemy.color, 24);
                addFloatingText(enemy.x, enemy.y - 10, `+${pointsGained}`, enemy.color);
                playSound('explosion');
                enemiesRef.current.splice(i, 1);
                break;
              }
            }
          }

          // Check if enemy crossed bottom boundary or hit player
          if (enemy.y > canvas.height - 20) {
            enemiesRef.current.splice(i, 1);
            spawnExplosion(enemy.x, canvas.height - 30, '#ef4444', 18);
            playSound('hit');

            setLives((prevLives) => {
              const remaining = prevLives - 1;
              if (remaining <= 0) {
                setGameState('gameover');
                playSound('gameover');
                spawnExplosion(p.x, p.y, '#ef4444', 36);
              }
              return remaining;
            });
          }
        }

        // 6. Draw Bullets
        bulletsRef.current.forEach((b) => {
          ctx.fillStyle = b.color;
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 8;
          ctx.fillRect(b.x - 2, b.y - 6, 4, 12);
        });
        ctx.shadowBlur = 0;

        // 7. Draw Enemies
        enemiesRef.current.forEach((enemy) => {
          // Glow container
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.strokeStyle = enemy.color;
          ctx.lineWidth = 2;
          ctx.shadowColor = enemy.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.roundRect(enemy.x - enemy.size, enemy.y - enemy.size, enemy.size * 2, enemy.size * 2, 6);
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Enemy text/icon
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px "Space Grotesk", monospace, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(enemy.label, enemy.x, enemy.y);

          // HP Bar if maxHp > 1
          if (enemy.maxHp > 1) {
            const barW = enemy.size * 1.8;
            const barH = 3;
            const hpRatio = Math.max(0, enemy.hp / enemy.maxHp);
            ctx.fillStyle = '#334155';
            ctx.fillRect(enemy.x - barW / 2, enemy.y - enemy.size - 6, barW, barH);
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x - barW / 2, enemy.y - enemy.size - 6, barW * hpRatio, barH);
          }
        });

        // 8. Draw Player Spaceship (Retro pixel fighter)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;

        // Wing thrusters
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.moveTo(-18, 12);
        ctx.lineTo(0, -16);
        ctx.lineTo(18, 12);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, -2, 5, 0, Math.PI * 2);
        ctx.fill();

        // Flame animation
        const flameHeight = Math.random() * 8 + 8;
        ctx.fillStyle = Math.random() > 0.5 ? '#f97316' : '#eab308';
        ctx.beginPath();
        ctx.moveTo(-6, 8);
        ctx.lineTo(0, 8 + flameHeight);
        ctx.lineTo(6, 8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 9. Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;

        const alpha = Math.max(0, 1 - pt.life / pt.maxLife);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        ctx.globalAlpha = 1;

        if (pt.life >= pt.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 10. Update & Draw Floating Score Texts
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y += ft.vy;
        ft.alpha -= 0.02;

        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = ft.alpha;
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 13px "Space Grotesk", monospace, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 6;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      // 11. Overlays for Idle and Game Over
      if (gameState === 'idle') {
        ctx.fillStyle = 'rgba(6, 9, 19, 0.78)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '900 24px "Space Grotesk", monospace, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CODE DEFENDER 1984', canvas.width / 2, 160);

        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 13px "Space Grotesk", monospace, sans-serif';
        ctx.fillText('SECRET RETRO ARCADE • KONAMI CODE ACTIVATED', canvas.width / 2, 190);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px "Space Grotesk", monospace, sans-serif';
        ctx.fillText('Squash software bugs, memory leaks, and 404s before they crash production!', canvas.width / 2, 230);
        ctx.fillText('Controls: [ ◀ ] [ ▶ ] or A / D to move • [ SPACE ] to fire', canvas.width / 2, 255);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 16px "Space Grotesk", monospace, sans-serif';
        ctx.fillText('PRESS [ START GAME ] OR TAP BELOW TO BEGIN', canvas.width / 2, 320);
      } else if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(6, 9, 19, 0.86)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ef4444';
        ctx.font = '900 26px "Space Grotesk", monospace, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SYSTEM CRASH: GAME OVER', canvas.width / 2, 170);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px "Space Grotesk", monospace, sans-serif';
        ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, 215);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 14px "Space Grotesk", monospace, sans-serif';
        ctx.fillText(`ALL-TIME HIGH SCORE: ${highScore}`, canvas.width / 2, 245);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '13px "Space Grotesk", monospace, sans-serif';
        ctx.fillText('Click "Play Again" or press Space to retry!', canvas.width / 2, 300);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen, gameState, level, lives, score, highScore, playSound, addFloatingText, spawnExplosion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-cyan-500/80 rounded-3xl max-w-2xl w-full shadow-[0_0_50px_rgba(6,182,212,0.35)] flex flex-col overflow-hidden text-slate-100 font-mono-grotesk relative">
        
        {/* Retro Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded">
                  RETRO-V1984
                </span>
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  CODE DEFENDER 👾
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Triggered via Konami Code: <span className="text-cyan-300 font-mono">↑ ↑ ↓ ↓ ← → ← → B A</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute 8-bit sound' : 'Enable 8-bit sound'}
            >
              <i className={`fa-solid ${soundEnabled ? 'fa-volume-high text-cyan-400' : 'fa-volume-xmark text-slate-500'}`}></i>
            </button>

            {/* CRT Scanline Toggle */}
            <button
              onClick={() => setCrtFilter(!crtFilter)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs transition-colors cursor-pointer hidden sm:inline-flex"
              title="Toggle CRT Scanline Effect"
            >
              <i className={`fa-solid fa-tv ${crtFilter ? 'text-emerald-400' : 'text-slate-500'}`}></i>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>

        {/* Retro HUD Stats Bar */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">SCORE</span>
              <span className="text-cyan-400 font-black text-base">{score.toString().padStart(5, '0')}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">HIGH SCORE</span>
              <span className="text-amber-400 font-black text-base">{highScore.toString().padStart(5, '0')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">LEVEL</span>
              <span className="text-purple-400 font-black text-base">WAVE {level}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block text-right">SHIELDS</span>
              <div className="flex items-center gap-1 text-rose-500 text-sm">
                {[...Array(3)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-heart ${i < lives ? 'text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]' : 'text-slate-700'}`}
                  ></i>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Arcade Screen Canvas Container */}
        <div className="relative w-full aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
          />

          {/* CRT Scanline Scan Effect */}
          {crtFilter && (
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
              style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
                backgroundSize: '100% 3px, 3px 100%',
              }}
            />
          )}
        </div>

        {/* Interactive Controls & Bottom Panel */}
        <div className="p-4 bg-slate-950 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Action Button */}
          {gameState === 'idle' ? (
            <button
              onClick={startGame}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-play"></i>
              <span>START GAME</span>
            </button>
          ) : gameState === 'gameover' ? (
            <button
              onClick={startGame}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_16px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-rotate-right"></i>
              <span>PLAY AGAIN</span>
            </button>
          ) : (
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>BATTLE ACTIVE — SQUASH THE BUGS!</span>
            </div>
          )}

          {/* On-Screen Touch Controls (Mobile Friendly) */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onMouseDown={() => (keysRef.current.left = true)}
              onMouseUp={() => (keysRef.current.left = false)}
              onTouchStart={() => (keysRef.current.left = true)}
              onTouchEnd={() => (keysRef.current.left = false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-sm font-bold active:scale-95 select-none cursor-pointer"
              title="Move Left"
            >
              ◀
            </button>
            <button
              onMouseDown={() => (keysRef.current.right = true)}
              onMouseUp={() => (keysRef.current.right = false)}
              onTouchStart={() => (keysRef.current.right = true)}
              onTouchEnd={() => (keysRef.current.right = false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-sm font-bold active:scale-95 select-none cursor-pointer"
              title="Move Right"
            >
              ▶
            </button>
            <button
              onMouseDown={() => (keysRef.current.fire = true)}
              onMouseUp={() => (keysRef.current.fire = false)}
              onTouchStart={() => (keysRef.current.fire = true)}
              onTouchEnd={() => (keysRef.current.fire = false)}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(225,29,72,0.4)] active:scale-95 select-none cursor-pointer"
              title="Fire Laser"
            >
              FIRE 💥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
