import React, { useRef } from 'react';

export default function AnimatedButton({ children, as: Component = 'button', className = '', contentClassName = 'px-[1.4rem] py-[0.65rem]', ...props }) {
  const buttonRef = useRef(null);

  function handleMouseMove(e) {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const RADIUS = 80;
    if (distance < RADIUS) {
      const strength = (RADIUS - distance) / RADIUS;
      const moveX = dx * 0.25 * strength;
      const moveY = dy * 0.25 * strength;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      el.style.transition = 'transform 0.1s ease';
      const innerEl = el.querySelector('[data-magnetic-inner]');
      if (innerEl) {
        innerEl.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
        innerEl.style.transition = 'transform 0.1s ease';
      }
    }
    props.onMouseMove?.(e);
  }

  function handleMouseLeave(e) {
    const el = buttonRef.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    const innerEl = el.querySelector('[data-magnetic-inner]');
    if (innerEl) {
      innerEl.style.transform = 'translate(0px, 0px)';
      innerEl.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    }
    props.onMouseLeave?.(e);
  }

  // Pull onMouseMove / onMouseLeave out of props so they aren't double-spread
  const { onMouseMove: _omm, onMouseLeave: _oml, ...restProps } = props;

  return (
    <Component
      ref={buttonRef}
      className={`relative inline-flex group cursor-pointer hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      {/* 1. Outer Glow Layer (creates the soft blurred light outside the button) */}
      <div className="absolute inset-0 rounded-full overflow-hidden blur-md opacity-0 group-hover:opacity-40 group-active:opacity-80 transition-opacity duration-300 z-0">
        <div className="absolute w-[300%] aspect-square left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(transparent_0%,_#bc62b4_35%,_#00f0ff_50%,_transparent_65%)] animate-[spin_3s_linear_infinite]" />
      </div>

      {/* 2. Button Body (clips the border spinning gradient to the pill shape) */}
      <div className="relative w-full h-full rounded-full overflow-hidden p-[2px] z-10 flex">
        {/* Spinning border layer */}
        <div className="absolute w-[300%] aspect-square left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(transparent_0%,_#bc62b4_35%,_#00f0ff_50%,_transparent_65%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-60 group-active:opacity-100 transition-opacity duration-300 z-0" />

        {/* Glass backdrop & Content */}
        <div className={`relative w-full h-full rounded-full bg-[#0a0a0f]/80 backdrop-blur-md z-10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0a0a0f]/60 group-active:bg-[#0a0a0f]/40 ${contentClassName}`}>
          <span data-magnetic-inner className="relative z-20 text-[0.9rem] font-medium text-white whitespace-nowrap flex items-center gap-2 w-full justify-center">
            {children}
          </span>
        </div>
      </div>
    </Component>
  );
}
