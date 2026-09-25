import React from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  PlusCircle, 
  Building2, 
  Users, 
  Megaphone, 
  ArrowRight
} from 'lucide-react';

interface FourCtaCardsProps {
  onOpenAffiliateModal?: () => void;
  onOpenAdvertiseModal?: () => void;
}

export const FourCtaCards: React.FC<FourCtaCardsProps> = ({ 
  onOpenAffiliateModal, 
  onOpenAdvertiseModal 
}) => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('cta', 'Powering Your Property Journey', '{homeSubheading}');
  const { setActiveView, setActiveRole, cmsPages } = useApp();

  const ctaSection = cmsPages?.home?.sections?.cta;
  const cf = ctaSection?.customFields || {};

  const cards = [
    {
      id: 'post-property',
      badge: 'FREE',
      badgeColor: 'bg-emerald-600 text-white',
      icon: PlusCircle,
      iconBg: 'bg-orange-50 text-[#F2621E] border-orange-200',
      title: cf.card1Title || 'List Your Property for FREE',
      subtitle: cf.card1Subtitle || 'For Owners & Builders',
      desc: cf.card1Desc || 'List a property and receive direct buyer or tenant enquiries.',
      ctaText: 'List Property',
      ctaStyle: 'btn-theme-secondary text-white',
      action: () => setActiveView('post-property')
    },
    {
      id: 'realtors-club',
      badge: 'BROKERS',
      badgeColor: 'bg-[#1E4FA8] text-white',
      icon: Building2,
      iconBg: 'bg-blue-50 text-[#1E4FA8] border-blue-200',
      title: cf.card2Title || "Join Realtor's (Broker) Club",
      subtitle: cf.card2Subtitle || 'For Real Estate Professionals',
      desc: cf.card2Desc || 'Create your verified broker profile and access the Auricity broker ecosystem.',
      ctaText: 'Join Club',
      ctaStyle: 'btn-theme-primary text-white',
      action: () => {
        setActiveRole('broker');
        setActiveView('broker-register');
      }
    },
    {
      id: 'affiliate-partner',
      badge: 'PARTNER',
      badgeColor: 'bg-amber-500 text-white',
      icon: Users,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      title: cf.card3Title || 'Be Our Affiliate Partner',
      subtitle: cf.card3Subtitle || 'For Referrers & Partners',
      desc: cf.card3Desc || 'Refer genuine property opportunities and participate in Auricity rewards.',
      ctaText: 'Become Partner',
      ctaStyle: 'btn-theme-primary text-white',
      action: () => onOpenAffiliateModal?.()
    },
    {
      id: 'advertise',
      badge: 'BUSINESS',
      badgeColor: 'bg-slate-800 text-white',
      icon: Megaphone,
      iconBg: 'bg-slate-50 text-slate-700 border-slate-200',
      title: cf.card4Title || 'Advertise With Us',
      subtitle: cf.card4Subtitle || 'For Builders & Brands',
      desc: cf.card4Desc || 'Promote projects, services and property-focused campaigns to local customers.',
      ctaText: 'Advertise',
      ctaStyle: 'btn-theme-secondary text-white',
      action: () => onOpenAdvertiseModal?.()
    }
  ];

  return (
    <section className="py-3.5 sm:py-8 bg-[#F5F1E8] border-b border-[#E5DEC9] transition-colors w-full" id="four-cta-cards-section">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        
        {/* Section Heading */}
        <div className="text-center space-y-0.5 sm:space-y-1 max-w-2xl mx-auto">
          <span className="text-[9px] sm:text-[11px] font-black text-[#F2621E] uppercase tracking-wider">
            Ecosystem Portals & Opportunities
          </span>
          <h2 className="text-sm sm:text-xl font-black text-[#1E4FA8] tracking-tight">
            {homeHeading}
          </h2>
        </div>

        {/* Two primary actions: clean two-column desktop layout and swipeable mobile row. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={card.action}
                className="min-w-0 snap-start bg-white border border-[#E2DAC6] group p-2.5 sm:p-4 rounded-xl flex flex-col justify-between space-y-2 sm:space-y-4 hover:-translate-y-1 hover:border-[#1E4FA8]/50 hover:shadow-lg transition-all duration-300 cursor-pointer shadow-xs"
                id={`cta-card-${card.id}`}
              >
                {/* Card Top: Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center border shadow-2xs ${card.iconBg}`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className={`text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2.5 py-0.2 sm:py-0.5 rounded-full uppercase tracking-wider shadow-2xs ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="space-y-0.5 sm:space-y-1.5 flex-1">
                  <div className="text-[9px] sm:text-[11px] font-bold text-[#F2621E]">
                    {card.subtitle}
                  </div>
                  <h3 className="font-black text-xs sm:text-sm text-slate-900 group-hover:text-[#1E4FA8] transition-colors leading-snug line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 sm:line-clamp-3">
                    {card.desc}
                  </p>
                </div>

                {/* Card Bottom CTA Button */}
                <div className="pt-1.5 sm:pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    className={`w-full py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all shadow-xs cursor-pointer ${card.ctaStyle}`}
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
