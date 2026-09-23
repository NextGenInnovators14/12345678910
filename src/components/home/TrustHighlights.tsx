import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Percent, 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  Clock,
  ArrowRight
} from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const { setActiveView } = useApp();

  const highlights = [
    {
      icon: Percent,
      title: 'Zero Brokerage Guarantee',
      desc: 'Connect directly with verified owners and builder desks. Save ₹50,000 to ₹3,00,000 in brokerage fees.',
      badge: '100% Direct'
    },
    {
      icon: ShieldCheck,
      title: 'Auricity 100% Verified Homes',
      desc: 'Physical site verification, authentic HD photos, and title deed audit by Sambhajinagar field associates.',
      badge: 'Physical Audit'
    },
    {
      icon: Scale,
      title: '30-Year Legal Title Search',
      desc: 'Experienced high-court advocate legal verification, 7/12 CTS extract checks, and MahaRERA compliance.',
      badge: 'Advocate Verified'
    },
    {
      icon: Sparkles,
      title: 'Multilingual AI Valuator',
      desc: 'Instant micro-market price estimations powered by Gemini AI trained on real Sambhajinagar circle rates.',
      badge: 'Instant AI',
      action: () => setActiveView('valuator')
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-[var(--surface)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-black text-[var(--secondary)] uppercase tracking-wider">
            Why Sambhajinagar Chooses Auricity
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            The Gold Standard in Transparent Real Estate
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
            Eliminating middleman friction with institutional-grade property verification and instant doorstep services.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className={`card-theme p-6 flex flex-col justify-between space-y-4 hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all select-none ${item.action ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] shadow-2xs flex items-center justify-center border border-[var(--primary)]/15">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border)]">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-black text-sm text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center space-x-1 text-xs font-bold text-[var(--primary)]">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
