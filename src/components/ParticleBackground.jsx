import { useEffect, useRef } from 'react';

const CONNECTION_DISTANCE = 130;
const MOUSE_RADIUS = 120;
const MOUSE_FORCE = 0.04;
const PARTICLE_SPEED = 0.35;
const BASE_OPACITY = 0.55;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 188, g: 98, b: 180 };
}

class Particle {
  constructor(canvasW, canvasH, accent) {
    this.reset(canvasW, canvasH);
    this.accent = accent;
    // Randomise initial position across entire canvas
    this.x = Math.random() * canvasW;
    this.y = Math.random() * canvasH;
  }

  reset(w, h) {
    this.canvasW = w;
    this.canvasH = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
    this.vy = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
    this.radius = Math.random() * 1.6 + 0.6;
    this.baseOpacity = Math.random() * 0.4 + BASE_OPACITY;
    this.opacity = this.baseOpacity;
  }

  update(mouse) {
    // Mouse repulsion/attraction
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        this.vx += (dx / dist) * force * MOUSE_FORCE * 8;
        this.vy += (dy / dist) * force * MOUSE_FORCE * 8;
        this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
      } else {
        this.opacity = this.baseOpacity;
      }
    }

    // Damping
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Clamp velocity
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > PARTICLE_SPEED * 3) {
      this.vx = (this.vx / speed) * PARTICLE_SPEED * 3;
      this.vy = (this.vy / speed) * PARTICLE_SPEED * 3;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < -10) this.x = this.canvasW + 10;
    if (this.x > this.canvasW + 10) this.x = -10;
    if (this.y < -10) this.y = this.canvasH + 10;
    if (this.y > this.canvasH + 10) this.y = -10;
  }

  draw(ctx, accent) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${this.opacity})`;
    ctx.fill();
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: null, y: null },
    animId: null,
    accent: hexToRgb('#bc62b4'),
    isIntersecting: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    // Detect mobile screens to save CPU (reduce O(N^2) complexity)
    const particleCount = window.innerWidth < 768 ? 35 : 90;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      // Re-initialise particles on resize
      state.particles = Array.from(
        { length: particleCount },
        () => new Particle(canvas.width, canvas.height, state.accent)
      );
    }

    function onMouseMove(e) {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY + window.scrollY;
    }

    function onMouseLeave() {
      state.mouse.x = null;
      state.mouse.y = null;
    }

    function draw() {
      if (!state.isIntersecting) {
        state.animId = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { particles, mouse, accent } = state;

      // Update and draw particles
      particles.forEach((p) => {
        p.canvasW = canvas.width;
        p.canvasH = canvas.height;
        p.update(mouse);
        p.draw(ctx, accent);
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${lineOpacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw mouse glow connections
      if (mouse.x !== null) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - (mouse.y);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS * 1.5) {
            const lineOpacity = (1 - dist / (MOUSE_RADIUS * 1.5)) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${lineOpacity})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        });
      }

      state.animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Setup IntersectionObserver to pause the animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!state.animId) {
            state.animId = requestAnimationFrame(draw);
          }
        } else {
          if (state.animId) {
            cancelAnimationFrame(state.animId);
            state.animId = null;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    return () => {
      if (state.animId) cancelAnimationFrame(state.animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      observer.unobserve(canvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
