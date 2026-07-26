import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicked = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // 1. Mouse move — update dot immediately
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    // 2. Mouse click — scale dot up briefly
    const onMouseDown = () => {
      isClicked.current = true;
      dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(1.8)`;
      setTimeout(() => {
        isClicked.current = false;
        dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(1)`;
      }, 150);
    };

    // 3. Hover tracking on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, [role="button"]');
    const hoverListeners = [];
    interactiveEls.forEach((el) => {
      const onEnter = () => { isHovered.current = true; };
      const onLeave = () => { isHovered.current = false; };
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      hoverListeners.push({ el, onEnter, onLeave });
    });

    // 4. rAF loop — lerp ring toward mouse
    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;

      if (isHovered.current) {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.background = 'rgba(188,98,180,0.15)';
        ring.style.borderColor = 'rgba(188,98,180,0.9)';
      } else {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.background = 'transparent';
        ring.style.borderColor = 'rgba(188,98,180,0.6)';
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      hoverListeners.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — tracks instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(188, 98, 180, 1)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'transform 0.08s ease',
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring — follows with spring lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(188, 98, 180, 0.6)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  );
}
