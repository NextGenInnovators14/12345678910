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
    <section className="py-12 sm:py-16 bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="two-club-cards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#F2621E]" />
            <span>Auricity Partner Ecosystems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            {homeHeading || clubCardsConfig?.sectionTitle || 'Grow Your Income with Auricity Exclusive Clubs'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
            {homeSubheading || clubCardsConfig?.sectionSubtitle || 'Tailored programs for Sambhajinagar brokers, channel partners, and community referrers.'}
          </p>
        </div>

        {/* 2 Club Cards: Side by Side on Desktop (2 Columns), Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Auricity Realtor's Club */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1E4FA8] to-[#2563eb]" />

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E4FA8] flex items-center justify-center border border-blue-200 shadow-2xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="bg-[#1E4FA8] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {realtorsClub.badgeText || 'For Brokers & Agents'}
                </span>
              </div>

              <div className="space-y-1.5">
                {/* Brand Blue heading (#1E4FA8) */}
                <h3 className="text-xl sm:text-2xl font-black text-[#1E4FA8]">
                  {realtorsClub.heading}
                </h3>
                {realtorsClub.subheading && (
                  <p className="text-xs sm:text-sm text-slate-700 font-bold">
                    {realtorsClub.subheading}
                  </p>
                )}
                {realtorsClub.tagline && (
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {realtorsClub.tagline}
                  </p>
                )}
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Exclusive Club Privileges:
                </div>
                <ul className="space-y-2">
                  {realtorsClub.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brand Orange "Join Now" Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => handleButtonClick(realtorsClub.buttonLink)}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#F2621E] hover:bg-[#d95213] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer group/btn"
              >
                <span>{realtorsClub.buttonText || 'Join Now'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Auricity Affiliate Partner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F2621E] to-amber-500" />

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F2621E] flex items-center justify-center border border-orange-200 shadow-2xs">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="bg-[#1E4FA8] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {affiliatePartner.badgeText || 'For Referrers'}
                </span>
              </div>

              <div className="space-y-1.5">
                {/* Brand Blue heading (#1E4FA8) */}
                <h3 className="text-xl sm:text-2xl font-black text-[#1E4FA8]">
                  {affiliatePartner.heading}
                </h3>
                {affiliatePartner.subheading && (
                  <p className="text-xs sm:text-sm text-slate-700 font-bold">
                    {affiliatePartner.subheading}
                  </p>
                )}
                {affiliatePartner.tagline && (
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {affiliatePartner.tagline}
                  </p>
                )}
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Affiliate Bounty Program:
                </div>
                <ul className="space-y-2">
                  {affiliatePartner.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#F2621E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brand Orange "Join Now" Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => handleButtonClick(affiliatePartner.buttonLink)}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#F2621E] hover:bg-[#d95213] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer group/btn"
              >
                <span>{affiliatePartner.buttonText || 'Join Now'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
