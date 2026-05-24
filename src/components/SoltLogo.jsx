import React from 'react';

const SoltLogo = ({ size = "md" }) => {
  // Dynamic size configuration taaki aap iski height/width kahin bhi control kar sako
  const sizeClasses = {
    sm: "w-20 h-20 md:w-24 md:h-24",
    md: "w-32 h-32 md:w-36 md:h-36",
    lg: "w-48 h-48 md:w-56 md:h-56"
  };

  return (
    <div className={`${sizeClasses[size] || sizeClasses.md} mb-6 flex items-center justify-center relative select-none`}>
      
      {/* 🌟 CUSTOM 3D ANIMATION STYLES LOGGED DIRECTLY */}
      <style>{`
        @keyframes solt3DRotate {
          0% { transform: rotateY(0deg); }
          50% { 
            transform: rotateY(180deg); 
            filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6)) drop-shadow(0 0 50px rgba(34, 211, 238, 0.3)); 
          }
          100% { transform: rotateY(360deg); }
        }
        .animate-solt-logo {
          animation: solt3DRotate 7s linear infinite;
          perspective: 1000px;
          transform-style: preserve-3d;
          will-change: transform, filter;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-solt-logo { animation: none !important; }
        }
      `}</style>

      {/* Outer neon glowing radial layer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-cyan-500/20 blur-xl pointer-events-none"></div>
      
      {/* Core Brand Asset Component Layer */}
      <img 
        src="/logo.png"  // Pure assets route index reference
        alt="Solt Asset Logo" 
        className="w-full h-full object-contain animate-solt-logo filter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
      />
    </div>
  );
};

export default SoltLogo;