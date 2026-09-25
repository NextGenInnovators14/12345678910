import React from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  Landmark, 
  ArrowRight, 
  Percent, 
  Calculator, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  Building
} from 'lucide-react';

interface LoanBannerSectionProps {
  onOpenEMIModal?: () => void;
  onOpenLoanModal?: () => void;
}

interface BankPartnerItem {
  name: string;
  code: string;
  rate: string;
  color?: string;
  logo?: string;
}

const DEFAULT_BANKS: BankPartnerItem[] = [
  { name: 'State Bank of India', code: 'SBI', rate: '8.30%', color: 'bg-sky-600' },
  { name: 'HDFC Bank', code: 'HDFC', rate: '8.35%', color: 'bg-blue-800' },
  { name: 'ICICI Bank', code: 'ICICI', rate: '8.40%', color: 'bg-orange-700' },
  { name: 'Bank of Baroda', code: 'BOB', rate: '8.25%', color: 'bg-amber-700' },
  { name: 'Axis Bank', code: 'AXIS', rate: '8.50%', color: 'bg-rose-800' },
  { name: 'Punjab National Bank', code: 'PNB', rate: '8.35%', color: 'bg-red-800' },
  { name: 'Kotak Mahindra', code: 'KOTAK', rate: '8.40%', color: 'bg-red-600' },
  { name: 'Canara Bank', code: 'CANARA', rate: '8.30%', color: 'bg-blue-600' },
  { name: 'Bank of Maharashtra', code: 'BOM', rate: '8.25%', color: 'bg-blue-950' },
  { name: 'LIC Housing Finance', code: 'LIC HFL', rate: '8.45%', color: 'bg-amber-600' }
];

export const LoanBannerSection: React.FC<LoanBannerSectionProps> = ({ 
  onOpenEMIModal,
  onOpenLoanModal 
}) => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('loanBanner', 'Every Loan You Need, All in One Place', 'Home Loans, Plot Loans, Balance Transfers & Commercial Finance with leading bank partners.');
  const { cmsPages } = useApp();
  const sectionData = cmsPages?.home?.sections?.loanBanner;

  const heading = sectionData?.heading || 'Every Loan You Need, All in One Place';
  const subheading = sectionData?.subheading || 'Home Loans, Plot Loans, Balance Transfers & Commercial Finance starting at 8.25% ROI with 10+ leading nationalized banks in Sambhajinagar.';
  const badge = sectionData?.badge || 'Instant Paperless Sanctions';
  const ctaText = sectionData?.ctaText || 'Apply Now';
  const ctaLink = sectionData?.ctaLink || 'https://wa.me/918010506030?text=Hi%20Auricity,%20I%20want%20to%20apply%20for%20a%20Home%20Loan.';

  const customFields = sectionData?.customFields || {};
  const calcCtaText = customFields.calcCtaText || 'EMI Calculator';
  const subFeature1 = customFields.subFeature1 || 'Zero Processing Fee';
  const subFeature2 = customFields.subFeature2 || 'Doorstep Document Pickup';
  const subFeature3 = customFields.subFeature3 || '48-Hour In-Principle Sanction';

  let bankPartners: BankPartnerItem[] = DEFAULT_BANKS;
  if (customFields.partnersJson) {
    try {
      const parsed = JSON.parse(customFields.partnersJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        bankPartners = parsed;
      }
    } catch {
      bankPartners = DEFAULT_BANKS;
    }
  }

  const handleApplyClick = () => {
    if (onOpenLoanModal) {
      onOpenLoanModal();
    } else if (ctaLink.startsWith('http')) {
      window.open(ctaLink, '_blank');
    } else if (onOpenEMIModal) {
      onOpenEMIModal();
    } else {
      window.open('https://wa.me/918010506030?text=Hi%20Auricity,%20I%20want%20to%20apply%20for%20a%20Home%20Loan.', '_blank');
    }
  };

  return (
    <section className="py-4 sm:py-10 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 border-b border-amber-500/30 transition-colors w-full overflow-hidden shadow-inner" id="loan-banner-section">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-3 sm:space-y-6">
        
        {/* Top Banner Content Box */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6">
          
          <div className="space-y-1 sm:space-y-2 text-center lg:text-left">
            {badge && (
              <div className="inline-flex items-center space-x-1 bg-black/10 px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-wider text-slate-900 border border-black/10">
                <Zap className="w-3 h-3 text-slate-900 fill-slate-900" />
                <span>{badge}</span>
              </div>
            )}

            <h2 className="text-base sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {heading}
            </h2>

            <p className="text-[10px] sm:text-xs sm:text-sm text-slate-800 font-semibold max-w-2xl">
              {subheading}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-3 pt-0.5 text-[9px] sm:text-xs font-bold text-slate-900">
              <span className="flex items-center space-x-0.5">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-slate-950" />
                <span>{subFeature1}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-0.5">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-slate-950" />
                <span>{subFeature2}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-0.5">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-slate-950" />
                <span>{subFeature3}</span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-xs sm:max-w-none sm:w-auto sm:flex sm:flex-wrap items-center justify-center shrink-0">
            <button
              onClick={handleApplyClick}
              className="bg-[#1E4FA8] hover:bg-[#163D85] text-white font-black text-[11px] sm:text-sm px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center space-x-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
              id="loan-apply-now-btn"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>

            <button
              onClick={() => onOpenEMIModal?.()}
              className="bg-white/90 hover:bg-white text-slate-950 font-black text-[11px] sm:text-sm px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl border border-black/10 shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
              id="loan-calc-emi-btn"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-800" />
              <span>{calcCtaText}</span>
            </button>
          </div>
        </div>

        {/* All bank partners — one row, continuously auto-scrolling. */}
        <div className="pt-4 border-t border-black/10">
          <div className="mb-3 text-center text-[11px] font-black uppercase tracking-wider text-slate-900 sm:text-left">
            Our Official Banking & NBFC Partners:
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/30 py-2.5">
            <div className="bank-marquee flex w-max gap-3 px-1">
              {[...bankPartners, ...bankPartners].map((bank, idx) => (
                <button
                  key={`${bank.code}-${idx}`}
                  type="button"
                  onClick={() => onOpenEMIModal?.()}
                  className="flex min-w-[170px] sm:min-w-[215px] items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/95 px-2.5 sm:px-3.5 py-2 sm:py-3 text-left shadow-2xs transition-transform hover:scale-[1.02]"
                  title={`${bank.name} - Home Loans from ${bank.rate}`}
                >
                  {bank.logo ? (
                    <img src={bank.logo} alt={bank.name} className="h-7 w-7 sm:h-9 sm:w-9 shrink-0 rounded-lg border border-slate-200 object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <span className={`flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg ${bank.color || 'bg-blue-800'} text-[9px] sm:text-[10px] font-black text-white`}>{bank.code.slice(0, 4)}</span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] sm:text-xs font-black leading-tight text-slate-950">{bank.name}</span>
                    <span className="mt-0.5 block text-[9px] sm:text-[10px] font-bold text-emerald-800">From {bank.rate}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
