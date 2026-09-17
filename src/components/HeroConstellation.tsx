import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  angle: number;
  angularSpeed: number;
  radius: number;
}

export const HeroConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      '#8052ff', // Electric Iris
      '#ffb829', // Saffron Spark
      '#15846e', // Deep Verdant
      '#9333ea', // Purple
      '#38bdf8', // Light Cyan
      '#f43f5e', // Magenta
    ];

    let particles: Particle[] = [];
    let mouse = { x: width / 2, y: height / 2, active: false, radius: 150 };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(180, Math.floor((width * height) / 8000));
      const centerX = width > 768 ? width * 0.65 : width * 0.5;
      const centerY = height * 0.48;
      const baseRadius = Math.min(width, height) * 0.28;

      for (let i = 0; i < particleCount; i++) {
        // Distribute in an organic neural dual-hemisphere/cloud shape
        const angle = Math.random() * Math.PI * 2;
        const distRatio = Math.pow(Math.random(), 0.65);
        const r = distRatio * baseRadius;
        
        // Brain-like lobes distortion
        const lobeOffset = Math.sin(angle * 2) * (baseRadius * 0.25);
        const finalR = r + lobeOffset;
        
        const originX = centerX + Math.cos(angle) * finalR;
        const originY = centerY + Math.sin(angle) * (finalR * 0.82);

        particles.push({
          x: originX + (Math.random() - 0.5) * 40,
          y: originY + (Math.random() - 0.5) * 40,
          originX,
          originY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2.5 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.35,
          angle: Math.random() * Math.PI * 2,
          angularSpeed: (Math.random() - 0.5) * 0.008,
          radius: finalR
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      // Pulse effect on click
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          const force = (260 - dist) / 12;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background neural glow
      const centerX = width > 768 ? width * 0.65 : width * 0.5;
      const centerY = height * 0.48;
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.4);
      gradient.addColorStop(0, 'rgba(128, 82, 255, 0.08)');
      gradient.addColorStop(0.5, 'rgba(21, 132, 110, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect nearby particles with synaptic lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(128, 82, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles as tiny triangular & point glyphs
      particles.forEach((p) => {
        // Return force to origin
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        p.vx += dxOrigin * 0.003;
        p.vy += dyOrigin * 0.003;

        // Friction
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Gentle orbital drift
        p.angle += p.angularSpeed;
        p.x += p.vx + Math.cos(p.angle) * 0.25;
        p.y += p.vy + Math.sin(p.angle) * 0.25;

        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.vx -= (dx / dist) * force * 1.5;
            p.vy -= (dy / dist) * force * 1.5;
          }
        }

        // Draw particle (Triangle glyph or point)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        // Small triangular particle
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.86, s * 0.6);
        ctx.lineTo(-s * 0.86, s * 0.6);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0 opacity-80 transition-opacity duration-1000"
      style={{ filter: 'drop-shadow(0 0 15px rgba(128,82,255,0.2))' }}
    />
  );
};
