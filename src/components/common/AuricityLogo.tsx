import React from 'react';

interface AuricityLogoProps {
  variant?: 'icon' | 'compact' | 'full' | 'watermark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}

export const AuricityLogoMark: React.FC<{ className?: string; size?: number | string }> = ({ 
  className = 'w-10 h-10', 
  size 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Auricity Logo Icon"
    >
      <defs>
        {/* Brand Blue Gradients for Ring */}
        <linearGradient id="ringBackGrad" x1="10" y1="30" x2="90" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#153B82" />
          <stop offset="100%" stopColor="#1E4FA8" />
        </linearGradient>
        <linearGradient id="ringFrontGrad" x1="15" y1="40" x2="85" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="40%" stopColor="#1E4FA8" />
          <stop offset="100%" stopColor="#173E8A" />
        </linearGradient>
        
        {/* Brand Orange Gradients for Towers */}
        <linearGradient id="towerLeftGrad" x1="28" y1="36" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A3D" />
          <stop offset="100%" stopColor="#F2621E" />
        </linearGradient>
        <linearGradient id="towerCenterGrad" x1="42" y1="20" x2="58" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF702E" />
          <stop offset="100%" stopColor="#E0520F" />
        </linearGradient>
        <linearGradient id="towerRightGrad" x1="60" y1="40" x2="72" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8347" />
          <stop offset="100%" stopColor="#F2621E" />
        </linearGradient>

        {/* Ring Glow Filter */}
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1E4FA8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* 1. BACK SECTION OF BLUE ORBITAL RING (Behind Towers) */}
      <path
        d="M 16 52 C 14 38, 30 28, 56 28 C 76 28, 88 34, 88 44 C 88 47, 85 50, 80 53"
        stroke="url(#ringBackGrad)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* 2. THREE ORANGE SKYSCRAPER TOWERS */}
      {/* Left Tower */}
      <g>
        <path
          d="M 28 40 L 39 34 L 39 76 L 28 76 Z"
          fill="url(#towerLeftGrad)"
        />
        {/* Left Tower Facet & Windows */}
        <path d="M 39 34 L 41 35 L 41 76 L 39 76 Z" fill="#D94E0E" opacity="0.6" />
        <rect x="31" y="44" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="35" y="44" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="31" y="50" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="35" y="50" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="31" y="56" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="35" y="56" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="31" y="62" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="35" y="62" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
      </g>

      {/* Center Tower (Tallest & Main) */}
      <g>
        {/* Spire / Antenna */}
        <line x1="50" y1="14" x2="50" y2="24" stroke="#F2621E" strokeWidth="2" strokeLinecap="round" />
        {/* Tower Body */}
        <path
          d="M 43 24 L 50 20 L 57 24 L 57 78 L 43 78 Z"
          fill="url(#towerCenterGrad)"
        />
        {/* Right Bevel for Depth */}
        <path d="M 50 20 L 57 24 L 57 78 L 50 78 Z" fill="#BF4108" opacity="0.3" />
        {/* Architectural Windows Matrix */}
        <rect x="46" y="28" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="28" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="46" y="34" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="34" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="46" y="40" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="40" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="46" y="46" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="46" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="46" y="52" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="52" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="46" y="58" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="58" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="46" y="64" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
        <rect x="51" y="64" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.85" />
      </g>

      {/* Right Tower */}
      <g>
        <path
          d="M 59 38 L 71 44 L 71 76 L 59 76 Z"
          fill="url(#towerRightGrad)"
        />
        {/* Right Tower Facet */}
        <path d="M 59 38 L 61 39 L 61 76 L 59 76 Z" fill="#BF4108" opacity="0.3" />
        <rect x="63" y="48" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="67" y="50" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="63" y="54" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="67" y="56" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="63" y="60" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="67" y="62" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="63" y="66" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="67" y="68" width="2" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.75" />
      </g>

      {/* Foundation Base Line */}
      <rect x="24" y="76" width="52" height="3" rx="1.5" fill="#1E4FA8" />

      {/* 3. FRONT SECTION OF BLUE ORBITAL RING (Wraps in Front with Depth) */}
      <path
        d="M 84 51 C 86 63, 72 74, 46 74 C 24 74, 12 66, 12 55 C 12 51, 16 47, 22 43"
        stroke="url(#ringFrontGrad)"
        strokeWidth="7.5"
        strokeLinecap="round"
        filter="url(#softGlow)"
      />
      
      {/* Ring Dynamic Swoop Accent / Shine */}
      <path
        d="M 28 66 C 42 71, 62 70, 76 60"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

export const AuricityLogo: React.FC<AuricityLogoProps> = ({
  variant = 'compact',
  size = 'md',
  className = '',
  theme = 'light',
  onClick
}) => {
  // Dimension mappings
  const markSizes: Record<string, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    hero: 'w-24 h-24'
  };

  const markSize = markSizes[size] || markSizes.md;

  // Render Icon Only
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <AuricityLogoMark className={markSize} />
      </div>
    );
  }

  // Render Watermark (Large, semi-transparent graphic for hero banner)
  if (variant === 'watermark') {
    return (
      <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
        <AuricityLogoMark className="w-full h-full opacity-10" />
      </div>
    );
  }

  // Full Lockup with Tagline (Auth screens, hero cards, prominent branding)
  if (variant === 'full') {
    return (
      <div 
        onClick={onClick} 
        className={`flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <div className="relative mb-2">
          <AuricityLogoMark className={markSizes[size === 'md' ? 'lg' : size] || 'w-14 h-14'} />
        </div>
        
        {/* Wordmark */}
        <div className="flex items-center space-x-1.5 leading-none">
          <span className="text-2xl font-black tracking-tight text-[#1E4FA8] uppercase font-sans">
            AURI<span className="text-[#F2621E]">CITY</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#F2621E]/15 text-[#F2621E] border border-[#F2621E]/30">
            0% BROKERAGE
          </span>
        </div>
        {/* Lockup Tagline */}
        <div className="mt-1.5 flex items-center space-x-2 text-xs font-bold text-[#64748B]">
          <span className="text-[#F2621E] font-black">0% Brokerage</span>
          <span className="text-slate-300">|</span>
          <span className="text-[#1E4FA8] font-bold">100% Trust</span>
        </div>
        <p className="text-[10px] text-[#64748B] font-medium mt-0.5">
          Chhatrapati Sambhajinagar Real Estate Ecosystem
        </p>
      </div>
    );
  }

  // Compact / Header / Footer Standard Lockup (Navbar, Footer, Item Headers)
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center space-x-2 sm:space-x-3 select-none min-w-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      id="auricity-brand-lockup"
    >
      <div className="shrink-0 flex items-center justify-center">
        <AuricityLogoMark className={markSize} />
      </div>
      <div className="flex flex-col text-left min-w-0">
        <div className="flex items-center space-x-1.5 leading-none">
          <span className={`text-lg sm:text-xl font-black tracking-tight uppercase font-sans ${theme === 'dark' ? 'text-white' : 'text-[#1E4FA8]'}`}>
            AURI<span className="text-[#F2621E]">CITY</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#F2621E]/15 text-[#F2621E] border border-[#F2621E]/30">
            0% BROKERAGE
          </span>
        </div>
        <div className="flex items-center space-x-1 mt-0.5 text-[9px] sm:text-[10px]">
          <span className="text-[#F2621E] font-bold">0% Brokerage</span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className={`hidden sm:inline font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-[#64748B]'}`}>
            100% Trust (Sambhajinagar)
          </span>
        </div>
      </div>
    </div>
  );
};
