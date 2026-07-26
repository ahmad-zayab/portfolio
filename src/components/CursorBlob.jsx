import { useEffect, useRef } from 'react';

export default function CursorBlob() {
  const blobRef = useRef(null);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const blobPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId = useRef(null);

  useEffect(() => {
    function onMouseMove(e) {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    }

    function animate() {
      // Very slow lerp — factor 0.04 for a dreamy, heavy lag
      blobPos.current.x += (mousePos.current.x - blobPos.current.x) * 0.04;
      blobPos.current.y += (mousePos.current.y - blobPos.current.y) * 0.04;

      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate(${blobPos.current.x - 250}px, ${blobPos.current.y - 250}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '500px',
        height: '500px',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: 'radial-gradient(ellipse at center, rgba(188, 98, 180, 0.12) 0%, rgba(188, 98, 180, 0.04) 50%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        animation: 'blobMorph 9s ease-in-out infinite',
      }}
    />
  );
}
