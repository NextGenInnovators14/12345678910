import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { AuricityLogo } from '../common/AuricityLogo';
import { 
  PhoneCall, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  Percent, 
  Share2, 
  ShieldCheck, 
  Gift, 
  Building2, 
  Home, 
  Briefcase, 
  Factory, 
  LandPlot,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  User,
  PlusCircle,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { NavMenuItem } from '../../types';

interface NavbarProps {
  onOpenFeaturesMenu?: () => void;
  onOpenEMIModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenFeaturesMenu,
  onOpenEMIModal
}) => {
  const { 
    activeView, 
    setActiveView, 
    setSearchParams, 
    navigationConfig,
    settings,
    homePageConfig,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (viewOrUrl: string, filterParam?: string) => {
    setOpenDropdownId(null);
    if (String(viewOrUrl).toLowerCase().replace(/[^a-z]/g,'') === 'contactus' || String(viewOrUrl).toLowerCase() === '/contact' || String(viewOrUrl).toLowerCase() === 'contact') viewOrUrl = 'contact';
    if (viewOrUrl.startsWith('http')) {
      window.open(viewOrUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (filterParam) {
      if (filterParam === 'Residential') {
        setSearchParams(prev => ({ ...prev, propertyType: 'Flat / Apartment' }));
      } else if (filterParam === 'Commercial') {
        setSearchParams(prev => ({ ...prev, propertyType: 'Commercial Shop' }));
      } else if (filterParam === 'Industrial') {
        setSearchParams(prev => ({ ...prev, propertyType: 'Industrial Land' }));
      } else if (filterParam === 'Plots') {
        setSearchParams(prev => ({ ...prev, propertyType: 'Residential Plot' }));
      }
    }

    if (viewOrUrl === 'loan' || viewOrUrl === 'emi') {
      if (onOpenEMIModal) {
        onOpenEMIModal();
      } else {
        setActiveView('services');
      }
      return;
    }

    setActiveView(viewOrUrl);
  };

  const navItems: NavMenuItem[] = navigationConfig?.navItems && navigationConfig.navItems.length > 0 
    ? navigationConfig.navItems.filter(item => item.published !== false).map(item => /contact\s*us/i.test(item.label) ? { ...item, viewOrUrl: 'contact' } : item)
    : [
        { id: 'nav-home', label: 'Home', viewOrUrl: 'home', order: 1, published: true },
        { id: 'nav-about', label: 'About Us', viewOrUrl: 'about', order: 2, published: true },
        { 
          id: 'nav-projects', 
          label: 'Our Projects', 
          viewOrUrl: 'projects', 
          isDropdown: true, 
          order: 3, 
          published: true,
          subItems: [
            { id: 'sub-proj-all', label: 'All Projects', viewOrUrl: 'projects' },
            { id: 'sub-proj-res', label: 'Residential', viewOrUrl: 'projects', filterParam: 'Residential' },
            { id: 'sub-proj-comm', label: 'Commercial', viewOrUrl: 'projects', filterParam: 'Commercial' },
            { id: 'sub-proj-ind', label: 'Industrial', viewOrUrl: 'projects', filterParam: 'Industrial' },
            { id: 'sub-proj-plot', label: 'Plot-Land', viewOrUrl: 'projects', filterParam: 'Plots' }
          ]
        },
        { 
          id: 'nav-props', 
          label: 'Properties', 
          viewOrUrl: 'properties', 
          isDropdown: true, 
          order: 4, 
          published: true,
          subItems: [
            { id: 'sub-prop-all', label: 'All Properties', viewOrUrl: 'properties' },
            { id: 'sub-prop-res', label: 'Residential', viewOrUrl: 'properties', filterParam: 'Residential' },
            { id: 'sub-prop-comm', label: 'Commercial', viewOrUrl: 'commercial', filterParam: 'Commercial' },
            { id: 'sub-prop-ind', label: 'Industrial', viewOrUrl: 'properties', filterParam: 'Industrial' },
            { id: 'sub-prop-plot', label: 'Plot-Land', viewOrUrl: 'plots', filterParam: 'Plots' }
          ]
        },
        { id: 'nav-offers', label: 'Offers', viewOrUrl: 'offers', order: 5, published: true, badge: 'Festive' },
        { id: 'nav-services', label: 'Services', viewOrUrl: 'services', order: 6, published: true },
        { id: 'nav-realtors', label: 'Realtors', viewOrUrl: 'realtors', order: 7, published: true },
        { id: 'nav-contact', label: 'Contact Us', viewOrUrl: 'contact', order: 8, published: true }
      ];

  const loanText = navigationConfig?.loanButtonText || 'Loan';
  const loanLink = navigationConfig?.loanButtonLink || 'loan';
  const phoneText = navigationConfig?.headerPhoneDisplay || 'Call +91 8010506030';
  const phoneTel = navigationConfig?.headerPhoneText || '+918010506030';
  const topText = navigationConfig?.topBarText || 'Are You A Property Owner? List Your Property';
  const topPillText = navigationConfig?.topAnnouncementPillText || 'FREE';
  const joinText = navigationConfig?.joinAuricityText || 'Join Auricity';
  const joinLink = navigationConfig?.joinAuricityLink || 'https://wa.me/918010506030';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E5DEC9] transition-colors w-full shadow-xs">
        
        {/* 1. TOP ANNOUNCEMENT BAR (sticky, above header) */}
        <div className="bg-[#1E4FA8] text-white py-1.5 px-3 sm:px-4 text-xs font-semibold border-b border-black/10 w-full transition-colors">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            
            {/* Left: "Are You A Property Owner? List Your Property" + orange "FREE" pill button */}
            <div className="flex items-center space-x-2 min-w-0">
              <span className="text-[11px] sm:text-xs text-white/95 font-medium truncate">
                {topText}
              </span>
              <button
                id="top-announcement-post-free-btn"
                onClick={() => setActiveView('post-property')}
                className="bg-[#F2621E] hover:bg-[#d95214] text-white text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs transition-transform active:scale-95 cursor-pointer uppercase tracking-wider shrink-0"
              >
                {topPillText}
              </button>
            </div>

            {/* Right: WhatsApp icon + "Join Auricity" link, Facebook/Instagram/YouTube icons, "Register" and "Sign In" links */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] sm:text-xs shrink-0">
              
              {/* WhatsApp + Join Auricity */}
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-emerald-300 hover:text-emerald-200 font-bold transition-colors"
                title="Join Auricity WhatsApp Community"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20 text-emerald-300" />
                <span>{joinText}</span>
              </a>

              <span className="text-white/30 hidden sm:inline">|</span>

              {/* Social Icons */}
              <div className="hidden sm:flex items-center space-x-2 text-white/80">
                <a 
                  href={navigationConfig?.socialLinks?.facebook || 'https://facebook.com/auricity'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={navigationConfig?.socialLinks?.instagram || 'https://instagram.com/auricity.official'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={navigationConfig?.socialLinks?.youtube || 'https://youtube.com/@auricity'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>

              <span className="text-white/30">|</span>

              {/* Partner Desks */}
              <div className="flex items-center space-x-2 text-[11px] font-bold">
                <button
                  onClick={() => setActiveView('broker-login')}
                  className="text-blue-200 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                  title="Broker Workspace Sign In"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span>Broker Desk</span>
                </button>
                <span className="text-white/30">•</span>
                <button
                  onClick={() => setActiveView('affiliate-login')}
                  className="text-amber-200 hover:text-amber-100 transition-colors cursor-pointer flex items-center space-x-1"
                  title="Affiliate Partner Sign In"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Affiliate Desk</span>
                </button>
              </div>

              <span className="text-white/30">|</span>

              {/* Register & Sign In Links */}
              <div className="flex items-center space-x-2 font-bold">
                <button
                  onClick={() => setActiveView('register')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Register
                </button>
                <span className="text-white/30">/</span>
                <button
                  onClick={() => setActiveView('signin')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-amber-200"
                >
                  Sign In
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 2. MAIN HEADER & DESKTOP NAV */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full" ref={dropdownRef}>
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            
            {/* Logo on Left */}
            <div className="flex items-center shrink-0">
              {(homePageConfig?.brandLogoUrl || settings?.brandLogoUrl) ? (
                <button onClick={() => setActiveView('home')} className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <img src={homePageConfig?.brandLogoUrl || settings.brandLogoUrl} alt="Auricity" className="h-11 sm:h-12 w-auto max-w-[190px] object-contain" referrerPolicy="no-referrer" />
                </button>
              ) : (
                <AuricityLogo 
                  variant="compact" 
                  size="md" 
                  onClick={() => setActiveView('home')} 
                  className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                />
              )}
            </div>

            {/* Desktop Horizontal Nav Bar */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 text-xs font-bold text-slate-800">
              {navItems.map(item => {
                const isDropdown = item.isDropdown && item.subItems && item.subItems.length > 0;
                const isItemActive = activeView === item.viewOrUrl;
                const isOpen = openDropdownId === item.id;

                if (isDropdown) {
                  return (
                    <div key={item.id} className="relative">
                      <button
                        onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
                        className={`px-3 py-2 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer ${
                          isOpen || isItemActive 
                            ? 'text-[#1E4FA8] bg-blue-50/80 font-black' 
                            : 'text-slate-700 hover:text-[#1E4FA8] hover:bg-slate-100/70'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#F2621E]' : 'text-slate-400'}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          {item.subItems?.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavigate(sub.viewOrUrl, sub.filterParam)}
                              className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:text-[#1E4FA8] hover:bg-blue-50/80 flex items-center justify-between transition-colors cursor-pointer"
                            >
                              <span>{sub.label}</span>
                              <ArrowRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.viewOrUrl)}
                    className={`px-3 py-2 rounded-xl transition-colors cursor-pointer relative ${
                      isItemActive 
                        ? 'text-white bg-[#1E4FA8] font-black shadow-xs' 
                        : 'text-slate-700 hover:text-[#1E4FA8] hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-full font-black bg-amber-400 text-slate-950">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Affiliate CTA */}
              <button
                onClick={() => setActiveView('affiliate-landing')}
                className="border border-[#D8B15A] bg-[#FFF9EA] text-[#8A651D] hover:bg-[#F8EBCB] text-xs font-black px-3.5 py-2 rounded-xl transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
                title="Join the Auricity Affiliate Program"
              >
                <span>Affiliate</span>
              </button>

              {/* Service Provider CTA */}
              <button
                onClick={() => setActiveView('service-provider')}
                className="border border-slate-200 bg-white text-[#214E9B] hover:bg-blue-50 text-xs font-black px-3.5 py-2 rounded-xl transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
                title="Join the Auricity Service Provider Network"
              >
                <BriefcaseBusiness className="w-3.5 h-3.5" />
                <span>Service Partner</span>
              </button>

              {/* Broker CTA */}
              <button
                onClick={() => setActiveView('broker-landing')}
                className="border border-[#D8B15A] bg-[#FFF9EA] text-[#8A651D] hover:bg-[#F8EBCB] text-xs font-black px-3.5 py-2 rounded-xl transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
                title="Become an Auricity Broker"
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Become a Broker</span>
              </button>

              {/* Brand Orange "Loan" Button */}
              <button
                id="header-loan-button"
                onClick={() => handleNavigate(loanLink)}
                className="bg-[#F2621E] hover:bg-[#d95214] text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
                title="Home Loan Assistance & EMI Calculator"
              >
                <Percent className="w-3.5 h-3.5 text-amber-200" />
                <span>{loanText}</span>
              </button>

              {/* Post Free Property CTA Button */}
              <button
                id="header-post-free-button"
                onClick={() => setActiveView('post-property')}
                className="bg-[#102B59] hover:bg-[#214E9B] text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
                title="List Property For Free (Max 2 Properties)"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#F2621E]" />
                <span>Post Free</span>
                <span className="text-[9px] bg-[#F2621E] text-white font-extrabold px-1.5 py-0.2 rounded-full ml-1">2 Free</span>
              </button>
            </nav>

            {/* Centered/Right Call +91 8010506030 Clickable Pill with gentle pulse & ring animation */}
            <div className="flex items-center space-x-2">
              <motion.a
                href={`tel:${phoneTel}`}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(30, 79, 168, 0)',
                    '0 0 0 4px rgba(30, 79, 168, 0.15)',
                    '0 0 0 0 rgba(30, 79, 168, 0)'
                  ],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 border border-slate-300/70 px-3 sm:px-3.5 py-1.5 rounded-full font-black text-[11px] sm:text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                title="Call Auricity Customer Support"
              >
                <motion.div
                  animate={{
                    rotate: [0, -12, 12, -8, 8, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#1E4FA8]" />
                </motion.div>
                <span className="tracking-wide hidden sm:inline">{phoneText}</span>
                <span className="sm:hidden font-bold">Call Now</span>
              </motion.a>

              {/* Mobile Single Hamburger/3-Dot Menu Button */}
              <div className="lg:hidden flex items-center">
                <button
                  id="mobile-single-menu-button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-[#1E4FA8] text-[#1E4FA8] hover:text-white border border-amber-300/80 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="w-5 h-5 text-[#F2621E]" />
                  <span className="text-xs font-black hidden sm:inline">Menu</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </header>

      {/* Full-width Mobile Menu Panel */}
      <MobileMenuDrawer 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        onOpenEMIModal={onOpenEMIModal}
      />
    </>
  );
};
