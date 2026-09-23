import React from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ThumbsUp, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Check, 
  Percent, 
  Layers, 
  Zap, 
  HeartHandshake,
  UserCheck
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  ThumbsUp,
  Award,
  Sparkles,
  CheckCircle2,
  Check,
  Percent,
  Layers,
  Zap,
  HeartHandshake,
  UserCheck
};

export const WhyChooseAuricity: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('whyChoose', 'Why Choose Auricity', 'Built around transparency, zero brokerage and end-to-end property support.');
  const { cmsPages } = useApp();
  const sectionData = cmsPages?.home?.sections?.whyChooseUs;

  const heading = sectionData?.heading || 'Why Choose Us?';
  const subheading = sectionData?.subheading || 'Setting the highest standards in transparency, zero brokerage, and end-to-end doorstep solutions in Chhatrapati Sambhajinagar.';
  const badge = sectionData?.badge || 'The Auricity Advantage';
  // The CMS/AI editor can switch this section to a genuinely compact density
  // instead of merely changing the outer section spacing.
  const compact = sectionData?.customFields?.compact === true || sectionData?.customFields?.density === 'compact';

  // Extract fields with fallback
  const customFields = sectionData?.customFields || {};

  const block1Title = customFields.block1Title || 'Zero Brokerage';
  const block1Desc = customFields.block1Desc || 'Direct owner-to-buyer transactions with 0% brokerage fees. Save ₹50,000 to ₹3,00,000 on your home purchase or rental across Sambhajinagar without paying any middlemen commission.';
  const block1IconKey = customFields.block1Icon || 'ShieldCheck';
  const Block1Icon = ICON_MAP[block1IconKey] || ShieldCheck;

  const block2Title = customFields.block2Title || 'One Roof Services';
  const block2Desc = customFields.block2Desc || 'Everything under one roof: 30-year High Court advocate title search, CTS/7-12 extract verification, verified packers & movers, deep cleaning, and expert home painting contractors.';
  const block2IconKey = customFields.block2Icon || 'ThumbsUp';
  const Block2Icon = ICON_MAP[block2IconKey] || ThumbsUp;

  const block3Title = customFields.block3Title || 'Exciting Offers';
  const block3Desc = customFields.block3Desc || 'Exclusive festive developer discounts, 0% stamp duty subsidies, instant pre-approved home loan waivers, and free VIP site visit cab assistance for family inspections.';
  const block3IconKey = customFields.block3Icon || 'Award';
  const Block3Icon = ICON_MAP[block3IconKey] || Award;

  return (
    <section className={`${compact ? 'py-7 sm:py-10' : 'py-12 sm:py-16'} bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors w-full overflow-hidden`} id="why-choose-us-section">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${compact ? 'space-y-5' : 'space-y-8'}`}>
        
        {/* Section Header */}
        <div className={`${compact ? 'space-y-1.5' : 'space-y-2'} text-center max-w-3xl mx-auto`}>
          {badge && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20 shadow-2xs">
              <ShieldCheck className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[var(--secondary)]`} />
              <span>{badge}</span>
            </div>
          )}
          <h2 className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-4xl'} font-black text-[var(--text-primary)] tracking-tight`}>
            {heading}
          </h2>
          {subheading && (
            <p className={`${compact ? 'text-[11px] sm:text-xs' : 'text-xs sm:text-sm'} text-[var(--text-secondary)] font-medium max-w-2xl mx-auto`}>
              {subheading}
            </p>
          )}
        </div>

        {/* 3 Stacked Full-Width Blocks */}
        <div className={`${compact ? 'space-y-2.5' : 'space-y-4'} max-w-5xl mx-auto min-w-0`}>
          
          {/* Block 1: Zero Brokerage (Brand Blue Block) */}
          <div 
            id="why-choose-block-1"
            className={`${compact ? 'p-3 sm:p-3.5 rounded-xl' : 'p-4 sm:p-5 rounded-2xl sm:rounded-3xl'} group relative overflow-hidden bg-[#1E4FA8] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className={`${compact ? 'gap-2.5 sm:gap-3' : 'gap-4 sm:gap-5'} relative z-10 flex flex-col sm:flex-row items-start sm:items-center`}>
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Block1Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white border border-white/20">
                    Direct To Owner
                  </span>
                  <span className="text-xs text-blue-200 font-bold">• 100% Commission-Free</span>
                </div>
                <h3 className={`${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-black text-white tracking-tight`}>
                  {block1Title}
                </h3>
                <p className={`${compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'} text-blue-100/90 leading-relaxed font-normal break-words`}>
                  {block1Desc}
                </p>
              </div>

              {/* Badge Pillar */}
              <div className="hidden md:flex flex-col items-end justify-center shrink-0 pl-4 border-l border-white/15 text-right">
                <span className="text-xl font-black text-amber-300">₹0</span>
                <span className="text-[11px] font-bold text-blue-100">Brokerage Fee</span>
              </div>
            </div>
          </div>

          {/* Block 2: One Roof Services (Neutral/Brown-Gray Block) */}
          <div 
            id="why-choose-block-2"
            className={`${compact ? 'p-3 sm:p-3.5 rounded-xl' : 'p-4 sm:p-5 rounded-2xl sm:rounded-3xl'} group relative overflow-hidden bg-[#3E3835] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className={`${compact ? 'gap-2.5 sm:gap-3' : 'gap-4 sm:gap-5'} relative z-10 flex flex-col sm:flex-row items-start sm:items-center`}>
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Block2Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white border border-white/20">
                    All Services In One Place
                  </span>
                  <span className="text-xs text-stone-300 font-bold">• Legal, Moving & Painting</span>
                </div>
                <h3 className={`${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-black text-white tracking-tight`}>
                  {block2Title}
                </h3>
                <p className={`${compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'} text-stone-200/90 leading-relaxed font-normal break-words`}>
                  {block2Desc}
                </p>
              </div>

              {/* Badge Pillar */}
              <div className="hidden md:flex flex-col items-end justify-center shrink-0 pl-4 border-l border-white/15 text-right">
                <span className="text-xl font-black text-amber-300">10+</span>
                <span className="text-[11px] font-bold text-stone-300">Home Services</span>
              </div>
            </div>
          </div>

          {/* Block 3: Exciting Offers (Brand Orange Block) */}
          <div 
            id="why-choose-block-3"
            className={`${compact ? 'p-3 sm:p-3.5 rounded-xl' : 'p-4 sm:p-5 rounded-2xl sm:rounded-3xl'} group relative overflow-hidden bg-[#F2621E] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />

            <div className={`${compact ? 'gap-2.5 sm:gap-3' : 'gap-4 sm:gap-5'} relative z-10 flex flex-col sm:flex-row items-start sm:items-center`}>
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Block3Icon className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200" />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 text-white border border-white/20">
                    Festive Perks
                  </span>
                  <span className="text-xs text-orange-100 font-bold">• Zero Stamp Duty & Subsidies</span>
                </div>
                <h3 className={`${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-black text-white tracking-tight`}>
                  {block3Title}
                </h3>
                <p className={`${compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'} text-orange-50/90 leading-relaxed font-normal break-words`}>
                  {block3Desc}
                </p>
              </div>

              {/* Badge Pillar */}
              <div className="hidden md:flex flex-col items-end justify-center shrink-0 pl-4 border-l border-white/20 text-right">
                <span className="text-xl font-black text-yellow-200">Save Lakhs</span>
                <span className="text-[11px] font-bold text-orange-100">Direct Discounts</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
