import React from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Coins,
  Share2
} from 'lucide-react';

interface TwoClubCardsProps {
  onOpenAffiliateModal?: () => void;
}

export const TwoClubCards: React.FC<TwoClubCardsProps> = ({ onOpenAffiliateModal }) => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('clubs', 'Partner With Auricity', 'Join the realtor and affiliate ecosystem.');
  const { setActiveView, clubCardsConfig } = useApp();

  const realtorsClub = clubCardsConfig?.realtorsClub || {
    id: 'realtors_club',
    heading: "Auricity Realtor's Club",
    subheading: 'The Premium Professional Broker Network in Sambhajinagar',
    tagline: 'Join 150+ verified RERA agents enjoying verified buyer leads, marketing tools, and builder inventory sharing without middlemen interference.',
    badgeText: 'For Brokers & Agents',
    buttonText: 'Join Now',
    buttonLink: 'broker-hub',
    benefits: [
      'Direct access to verified home buyers across CIDCO, Beed Bypass & Garkheda',
      'Exclusive builder sole-selling mandates & institutional inventory sharing',
      'Custom branded digital profile & instant lead alerts on WhatsApp',
      'MahaRERA compliance training & legal title documentation support',
      'Zero commission cut by Auricity — 100% deal brokerage stays yours'
    ]
  };

  const affiliatePartner = clubCardsConfig?.affiliatePartner || {
    id: 'affiliate_partner',
    heading: 'Auricity Affiliate Partner',
    subheading: 'Community Referral Program for Citizens & Professionals',
    tagline: 'Spot a property board or know someone buying, selling, or renting? Share the contact and earn generous spot bounty rewards upon closing.',
    badgeText: 'For Everyone & Referrers',
    buttonText: 'Join Now',
    buttonLink: 'affiliate-modal',
    benefits: [
      'Earn ₹5,000 to ₹25,000 reward per successful closed property deal',
      'Refer friends, family, or society sellers with a simple 2-click submission form',
      'Transparent real-time deal tracking dashboard & automated milestone alerts',
      'Instant direct UPI / Bank transfer payout upon deed registration',
      'No real estate license required — 100% open to all Sambhajinagar citizens'
    ]
  };

  const handleButtonClick = (linkKey: string) => {
    if (linkKey === 'affiliate-modal') {
      if (onOpenAffiliateModal) {
        onOpenAffiliateModal();
      } else {
        setActiveView('services');
      }
    } else if (linkKey === 'broker-hub') {
      setActiveView('broker-hub');
    } else if (linkKey === 'realtors') {
      setActiveView('realtors');
    } else if (linkKey === 'post-property') {
      setActiveView('post-property');
    } else if (linkKey.startsWith('http')) {
      window.open(linkKey, '_blank');
    } else {
      setActiveView(linkKey);
    }
  };

  return (
    <section className="py-3.5 sm:py-8 bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="two-club-cards-section">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-3 sm:space-y-6">
        
        {/* Section Header */}
        <div className="text-center space-y-0.5 sm:space-y-1 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-[9px] sm:text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
            <Sparkles className="w-3 h-3 text-[#F2621E]" />
            <span>Auricity Partner Ecosystems</span>
          </div>
          <h2 className="text-base sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            {homeHeading || clubCardsConfig?.sectionTitle || 'Grow Your Income with Auricity Exclusive Clubs'}
          </h2>
          <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium">
            {homeSubheading || clubCardsConfig?.sectionSubtitle || 'Tailored programs for Sambhajinagar brokers, channel partners, and community referrers.'}
          </p>
        </div>

        {/* 2 Club Cards: Side by Side on Desktop (2 Columns), Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
          
          {/* Card 1: Auricity Realtor's Club */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-[var(--border)] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3 sm:space-y-5 relative overflow-hidden group">
            
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-[#1E4FA8] to-[#2563eb]" />

            <div className="space-y-2.5 sm:space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-[#1E4FA8] flex items-center justify-center border border-blue-200 shadow-2xs">
                  <Building2 className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <span className="bg-[#1E4FA8] text-white text-[9px] sm:text-[11px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {realtorsClub.badgeText || 'For Brokers & Agents'}
                </span>
              </div>

              <div className="space-y-1">
                {/* Brand Blue heading (#1E4FA8) */}
                <h3 className="text-sm sm:text-xl font-black text-[#1E4FA8]">
                  {realtorsClub.heading}
                </h3>
                {realtorsClub.subheading && (
                  <p className="text-[10px] sm:text-xs text-slate-700 font-bold">
                    {realtorsClub.subheading}
                  </p>
                )}
                {realtorsClub.tagline && (
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                    {realtorsClub.tagline}
                  </p>
                )}
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-1.5 pt-1 sm:pt-2">
                <div className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                  Exclusive Club Privileges:
                </div>
                <ul className="space-y-1 sm:space-y-1.5">
                  {realtorsClub.benefits.slice(0, 3).map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5 text-[10px] sm:text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brand Orange "Join Now" Button */}
            <div className="pt-2 sm:pt-4 border-t border-slate-100">
              <button
                onClick={() => handleButtonClick(realtorsClub.buttonLink)}
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-[#F2621E] hover:bg-[#d95213] text-white font-black text-[11px] sm:text-sm py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group/btn"
              >
                <span>{realtorsClub.buttonText || 'Join Now'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Auricity Affiliate Partner */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-[var(--border)] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3 sm:space-y-5 relative overflow-hidden group">
            
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-[#F2621E] to-amber-500" />

            <div className="space-y-2.5 sm:space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-50 text-[#F2621E] flex items-center justify-center border border-orange-200 shadow-2xs">
                  <Share2 className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <span className="bg-[#1E4FA8] text-white text-[9px] sm:text-[11px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {affiliatePartner.badgeText || 'For Referrers'}
                </span>
              </div>

              <div className="space-y-1">
                {/* Brand Blue heading (#1E4FA8) */}
                <h3 className="text-sm sm:text-xl font-black text-[#1E4FA8]">
                  {affiliatePartner.heading}
                </h3>
                {affiliatePartner.subheading && (
                  <p className="text-[10px] sm:text-xs text-slate-700 font-bold">
                    {affiliatePartner.subheading}
                  </p>
                )}
                {affiliatePartner.tagline && (
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                    {affiliatePartner.tagline}
                  </p>
                )}
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-1.5 pt-1 sm:pt-2">
                <div className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                  Affiliate Bounty Program:
                </div>
                <ul className="space-y-1 sm:space-y-1.5">
                  {affiliatePartner.benefits.slice(0, 3).map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5 text-[10px] sm:text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F2621E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brand Orange "Join Now" Button */}
            <div className="pt-2 sm:pt-4 border-t border-slate-100">
              <button
                onClick={() => handleButtonClick(affiliatePartner.buttonLink)}
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-[#F2621E] hover:bg-[#d95213] text-white font-black text-[11px] sm:text-sm py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group/btn"
              >
                <span>{affiliatePartner.buttonText || 'Join Now'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
