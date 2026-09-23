import React from 'react';
import { useApp } from '../../context/AppContext';
import { AuricityLogo } from '../common/AuricityLogo';
import {
  MapPin,
  PhoneCall,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquare,
  ShieldCheck,
  Lock,
  ArrowUp,
  CreditCard,
  Download,
} from 'lucide-react';

interface FooterProps {
  onOpenIconModal?: () => void;
}

/**
 * V11 compact footer: keeps the important trust/contact/navigation information
 * while removing the large inline inquiry form and excessive vertical spacing.
 */
export const Footer: React.FC<FooterProps> = () => {
  const { setActiveView, navigationConfig } = useApp();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const corporateLinks = (navigationConfig?.footerCorporateLinks || [
    { id: 'corp-1', label: 'About Us', viewOrUrl: 'about' },
    { id: 'corp-2', label: 'Home', viewOrUrl: 'home' },
    { id: 'corp-3', label: 'Projects', viewOrUrl: 'projects' },
    { id: 'corp-4', label: 'Blog & News', viewOrUrl: 'blogs' },
    { id: 'corp-5', label: 'Contact Us', viewOrUrl: 'contact' },
    { id: 'corp-6', label: 'Refund & Privacy Policy', viewOrUrl: 'legal' },
    { id: 'corp-7', label: 'Become a Broker', viewOrUrl: 'broker-landing' },
    { id: 'corp-8', label: 'Service Provider Registration', viewOrUrl: 'service-provider-register' },
    { id: 'corp-9', label: 'Affiliate Partner Program', viewOrUrl: 'affiliate-landing' },
  ]).map(link => /contact\s*us/i.test(link.label) ? { ...link, viewOrUrl: 'contact' } : link);

  const handleLinkClick = (viewOrUrl: string) => {
    const value = String(viewOrUrl || '');
    const normalized = value.toLowerCase().replace(/[^a-z]/g, '');
    if (normalized === 'contactus' || normalized === 'contact') {
      setActiveView('contact');
    } else if (value.startsWith('http')) {
      window.open(value, '_blank', 'noopener,noreferrer');
    } else {
      setActiveView(value);
    }
    scrollToTop();
  };

  const socialLinks = [
    ['Facebook', navigationConfig?.socialLinks?.facebook || 'https://facebook.com/auricity', Facebook],
    ['Instagram', navigationConfig?.socialLinks?.instagram || 'https://instagram.com/auricity.official', Instagram],
    ['YouTube', navigationConfig?.socialLinks?.youtube || 'https://youtube.com/@auricity', Youtube],
    ['LinkedIn', navigationConfig?.socialLinks?.linkedin || 'https://linkedin.com/company/auricity', Linkedin],
    ['WhatsApp', navigationConfig?.joinAuricityLink || 'https://wa.me/918010506030', MessageSquare],
  ] as const;

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Compact primary footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] gap-4 lg:gap-7">
          {/* Brand */}
          <div className="min-w-0">
            <AuricityLogo variant="compact" theme="dark" size="md" />
            <p className="mt-2 max-w-md text-[11px] leading-relaxed text-slate-400">
              {navigationConfig?.footerTagline || "Chhatrapati Sambhajinagar's direct real estate portal & verified service ecosystem with 0% Brokerage."}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-emerald-800/60 bg-emerald-950/40 px-2 py-1 text-[9px] font-bold text-emerald-300">0% Brokerage</span>
              <span className="rounded-full border border-blue-800/60 bg-blue-950/40 px-2 py-1 text-[9px] font-bold text-blue-300">Direct Owner Deals</span>
              <span className="rounded-full border border-amber-800/60 bg-amber-950/40 px-2 py-1 text-[9px] font-bold text-amber-300">MahaRERA</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-wider text-amber-400">Quick Links</h4>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
              {corporateLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.viewOrUrl)}
                  className="truncate text-left text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact + legal */}
          <div className="min-w-0">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-amber-400">Contact & Registration</h4>
            <div className="mt-2 space-y-1.5 text-[11px]">
              <a className="flex items-center gap-2 text-slate-300 hover:text-white" href={`tel:${navigationConfig?.footerPhone || '+918010506030'}`}>
                <PhoneCall className="h-3.5 w-3.5 shrink-0 text-[#F2621E]" />
                <span>{navigationConfig?.footerPhone || '+91 8010506030'}</span>
              </a>
              <a className="flex items-center gap-2 text-slate-300 hover:text-white truncate" href={`mailto:${navigationConfig?.footerEmail || 'support@auricity.com'}`}>
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#F2621E]" />
                <span className="truncate">{navigationConfig?.footerEmail || 'support@auricity.com'}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400 leading-snug">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#F2621E] mt-0.5" />
                <span className="line-clamp-2">{navigationConfig?.companyAddress || navigationConfig?.footerAddress || 'CIDCO Cannaught Place & Jalna Road, Chhatrapati Sambhajinagar, MH 431005'}</span>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-0.5 text-[9px] text-slate-500">
              <span>CIN: {navigationConfig?.rocCin || 'U70109MH2024PTC418920'}</span>
              <span>PAN: {navigationConfig?.panNo || 'AAACA9812E'}</span>
              <span>MahaRERA: A51500038921</span>
            </div>
          </div>
        </div>

        {/* Compact utility strip */}
        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400">Connect</span>
              <div className="flex items-center gap-1.5">
                {socialLinks.map(([label, href, Icon]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <button onClick={scrollToTop} className="inline-flex items-center gap-1 self-start rounded-lg bg-slate-800 px-2.5 py-1.5 text-[10px] font-semibold text-slate-400 hover:text-white sm:self-auto">
              Back to top <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Legal footer */}
        <div className="mt-3 border-t border-slate-800/80 pt-3 text-[9px] leading-relaxed text-slate-500">
          <p>{navigationConfig?.disclaimerText || 'Disclaimer: Auricity Developers is an authorized direct real estate facilitation and property technology platform. Property and project specifications, plans, prices, and amenities are compiled from verified owners and MahaRERA-registered developers.'}</p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>{navigationConfig?.copyrightText || `© ${new Date().getFullYear()} Auricity. All Rights Reserved.`}</span>
            <span>Chhatrapati Sambhajinagar, MH • 0% Brokerage Direct Deals • MahaRERA A51500038921</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
