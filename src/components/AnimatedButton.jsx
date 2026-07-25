import React from 'react';

export default function AnimatedButton({ children, as: Component = 'button', className = '', contentClassName = 'px-[1.4rem] py-[0.65rem]', ...props }) {
  return (
    <Component
      className={`relative inline-flex group cursor-pointer hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ${className}`}
      {...props}
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
          <span className="relative z-20 text-[0.9rem] font-medium text-white whitespace-nowrap flex items-center gap-2 w-full justify-center">
            {children}
          </span>
        </div>
      </div>
    </Component>
  );
}
