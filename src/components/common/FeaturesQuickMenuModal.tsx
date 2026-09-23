import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Search, 
  Building2, 
  KeyRound, 
  BedDouble, 
  LandPlot, 
  Briefcase, 
  Home, 
  Sparkles, 
  Calculator, 
  Truck, 
  Scale, 
  Paintbrush, 
  Droplets, 
  ShieldAlert, 
  PlusCircle, 
  ShieldCheck, 
  Users, 
  Layers, 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Heart,
  ArrowRight,
  MoreVertical,
  User,
  Lock,
  Percent,
  Award,
  BookOpen,
  GraduationCap,
  Info
} from 'lucide-react';

interface FeaturesQuickMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEMIModal?: () => void;
  onOpenIconModal?: () => void;
  onOpenAffiliateModal?: () => void;
  onOpenAdvertiseModal?: () => void;
}

export const FeaturesQuickMenuModal: React.FC<FeaturesQuickMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenEMIModal,
  onOpenIconModal,
  onOpenAffiliateModal,
  onOpenAdvertiseModal
}) => {
  const { 
    activeView,
    setActiveView, 
    activeRole,
    setActiveRole,
    setSearchParams, 
    setShowPinModal, 
    favorites,
    localitiesList,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'properties' | 'ai' | 'services' | 'portals' | 'localities'>('all');

  if (!isOpen) return null;

  const handleNavigate = (viewId: string, params?: { locality?: string; propertyType?: string; listingType?: string; zeroBrokerageOnly?: boolean }) => {
    if (params) {
      setSearchParams(prev => ({
        ...prev,
        ...params
      }));
    }
    setActiveView(viewId);
    onClose();
  };

  const handleRoleSelect = (role: 'public' | 'broker' | 'admin') => {
    if (role === 'admin') {
      onClose();
      setShowPinModal(true);
    } else {
      setActiveRole(role);
      if (role === 'broker') {
        setActiveView('broker-hub');
        showToast('Switched to Broker CRM & Partner Hub', 'success');
      } else {
        setActiveView('home');
        showToast('Switched to Public Buyer & Tenant Portal', 'success');
      }
      onClose();
    }
  };

  // Feature Items Catalog
  const FEATURE_GROUPS = [
    {
      id: 'properties',
      category: 'Property Marketplace & Categories',
      icon: Building2,
      badge: '0% Brokerage',
      items: [
        {
          id: 'buy-flats',
          title: 'Buy Flats & Apartments',
          desc: '1, 2, 3 & 4 BHK ready-to-move and under-construction apartments',
          icon: Building2,
          color: 'blue',
          tag: '320+ Available',
          action: () => handleNavigate('properties', { listingType: 'sale', propertyType: 'Flat / Apartment' })
        },
        {
          id: 'rent-homes',
          title: 'Rent Direct from Owners',
          desc: '100% zero brokerage rental homes, row houses and independent flats',
          icon: KeyRound,
          color: 'orange',
          tag: 'Zero Brokerage',
          action: () => handleNavigate('rentals', { listingType: 'rent' })
        },
        {
          id: 'pg-coliving',
          title: 'PG, Hostels & Co-Living',
          desc: 'Affordable rooms for students & professionals with food & WiFi',
          icon: BedDouble,
          color: 'indigo',
          tag: 'From ₹3,500/mo',
          action: () => handleNavigate('pgs', { listingType: 'pg' })
        },
        {
          id: 'na-plots',
          title: 'NA Residential Plots & Land',
          desc: 'Clear title, Gunthewari sanctioned plots in high-growth corridors',
          icon: LandPlot,
          color: 'emerald',
          tag: 'NA 44 Sanctioned',
          action: () => handleNavigate('properties', { propertyType: 'Residential Plot' })
        },
        {
          id: 'commercial',
          title: 'Commercial Shops & Showrooms',
          desc: 'Prime retail spaces, offices, and warehouses across Jalna Road & CIDCO',
          icon: Briefcase,
          color: 'amber',
          tag: 'High ROI',
          action: () => handleNavigate('properties', { propertyType: 'Commercial Shop' })
        },
        {
          id: 'luxury-villas',
          title: 'Row Houses & Luxury Villas',
          desc: 'Independent duplexes & villas in Garkheda, Samarth Nagar & Ulkanagari',
          icon: Home,
          color: 'purple',
          tag: 'Gated Society',
          action: () => handleNavigate('properties', { propertyType: 'Row House / Villa' })
        }
      ]
    },
    {
      id: 'ai',
      category: 'Smart AI Tools & Financial Intelligence',
      icon: Sparkles,
      badge: 'Gemini AI Powered',
      items: [
        {
          id: 'ai-valuator',
          title: 'Multilingual AI Property Valuator',
          desc: 'Instant market price & rental yield reports in English, मराठी (Marathi) & हिन्दी',
          icon: Sparkles,
          color: 'indigo',
          tag: '3 Languages',
          action: () => handleNavigate('valuator')
        },
        {
          id: 'emi-calculator',
          title: 'Smart Home Loan & EMI Calculator',
          desc: 'Interactive monthly installment, down payment and interest amortization forecaster',
          icon: Calculator,
          color: 'blue',
          tag: 'All Banks',
          action: () => {
            onClose();
            onOpenEMIModal?.();
          }
        },
        {
          id: 'ai-listing-enhancer',
          title: 'AI Listing Title & Description Writer',
          desc: 'Generate professional marketing copy and SEO description for your property',
          icon: Zap,
          color: 'orange',
          tag: 'One-Click',
          action: () => handleNavigate('post-property')
        },
        {
          id: 'rera-vault',
          title: 'MahaRERA Verification Checker',
          desc: 'Search registered project IDs (P515000...) and developer approvals',
          icon: ShieldCheck,
          color: 'emerald',
          tag: '100% Legal',
          action: () => handleNavigate('properties', { zeroBrokerageOnly: false })
        }
      ]
    },
    {
      id: 'services',
      category: 'Doorstep Real Estate Services',
      icon: Truck,
      badge: 'Verified Contractors',
      items: [
        {
          id: 'legal-search',
          title: '30-Year Title Search & Legal Opinion',
          desc: 'High Court registered advocate report, CTS extract & encumbrance certification',
          icon: Scale,
          color: 'blue',
          tag: '₹4,999 • 48 Hrs',
          action: () => handleNavigate('services')
        },
        {
          id: 'packers-movers',
          title: 'Verified Packers & Movers',
          desc: 'Safe packing, GPS transport & zero-damage household shifting',
          icon: Truck,
          color: 'emerald',
          tag: 'From ₹2,499',
          action: () => handleNavigate('services')
        },
        {
          id: 'deep-cleaning',
          title: 'Full Home Deep Cleaning & Sanitization',
          desc: 'Machine floor scrubbing, kitchen degreasing & bathroom descaling',
          icon: Sparkles,
          color: 'indigo',
          tag: 'From ₹1,499',
          action: () => handleNavigate('services')
        },
        {
          id: 'home-painting',
          title: 'Interior & Exterior Painting',
          desc: 'Asian Paints certified painters, moisture damp-proofing & color consult',
          icon: Paintbrush,
          color: 'orange',
          tag: 'Free Site Quote',
          action: () => handleNavigate('services')
        },
        {
          id: 'pest-control',
          title: 'Pest Control & Anti-Termite Treatment',
          desc: 'Herbal odorless spray, termite soil treatment with 1-year warranty',
          icon: ShieldAlert,
          color: 'rose',
          tag: '1-Yr Warranty',
          action: () => handleNavigate('services')
        },
        {
          id: 'plumbing-repairs',
          title: 'Plumbing & Sanitary Works',
          desc: 'Leakage fixing, pressure pump setup & complete bathroom fittings',
          icon: Droplets,
          color: 'cyan',
          tag: '30-Min Arrival',
          action: () => handleNavigate('services')
        }
      ]
    },
    {
      id: 'portals',
      category: 'Owner, Broker & Admin Ecosystem',
      icon: ShieldCheck,
      badge: 'Multi-Role Access',
      items: [
        {
          id: 'about-us',
          title: 'About Auricity & Mission',
          desc: '0% brokerage philosophy, verified owner model, team & city vision',
          icon: Info,
          color: 'blue',
          tag: 'Our Story',
          action: () => handleNavigate('about')
        },
        {
          id: 'post-property',
          title: 'Post Free Property Listing',
          desc: 'List your flat, plot or shop with 0% brokerage and reach verified buyers',
          icon: PlusCircle,
          color: 'orange',
          tag: '100% Free',
          action: () => handleNavigate('post-property')
        },
        {
          id: 'broker-hub',
          title: 'Broker CRM & Channel Partner Desk',
          desc: 'Manage client requirements, deal commission forecasting & builder inventory',
          icon: Users,
          color: 'blue',
          tag: 'Partner Portal',
          action: () => handleRoleSelect('broker')
        },
        {
          id: 'admin-hub',
          title: 'Super Admin Control Hub',
          desc: 'Manage portal inventory, CRM leads, doorstep bookings & system rules',
          icon: ShieldCheck,
          color: 'amber',
          tag: 'PIN 9999',
          action: () => handleRoleSelect('admin')
        },
        {
          id: 'verified-realtors',
          title: 'Meet Verified Realtors & Advisors',
          desc: '100% RERA registered & audited local broker directory across Sambhajinagar',
          icon: Award,
          color: 'blue',
          tag: 'Verified',
          action: () => handleNavigate('realtors')
        },
        {
          id: 'knowledge-hub',
          title: 'Auricity Knowledge Hub',
          desc: 'Comprehensive real estate buyers guides, market trend reports & legal checklists',
          icon: BookOpen,
          color: 'blue',
          tag: 'Guides & News',
          action: () => handleNavigate('knowledge-hub')
        },
        {
          id: 'broker-knowledge-hub',
          title: 'Brokers Career & Development (Gated)',
          desc: 'Private MahaRERA training masterclasses, deal playbooks & direct Super Admin chat',
          icon: GraduationCap,
          color: 'orange',
          tag: 'Broker Academy',
          action: () => handleNavigate('broker-knowledge-hub')
        },
        {
          id: 'affiliate-partner',
          title: 'Auricity Affiliate Partner (Earn Cash)',
          desc: 'Refer buyers, tenants or sellers and earn ₹5,000 to ₹25,000 per closed deal',
          icon: Users,
          color: 'emerald',
          tag: 'Refer & Earn',
          action: () => {
            onClose();
            onOpenAffiliateModal?.();
          }
        },
        {
          id: 'advertise-brand',
          title: 'Advertise With Auricity (Media Kits)',
          desc: 'Promote your project, interiors, or brand to 50k+ active property buyers',
          icon: Zap,
          color: 'purple',
          tag: 'Media Ads',
          action: () => {
            onClose();
            onOpenAdvertiseModal?.();
          }
        },
        {
          id: 'icon-system',
          title: 'Line Icon Architecture & Design System',
          desc: 'Explore 55+ standardized SVG line icons with unified stroke and states',
          icon: Layers,
          color: 'indigo',
          tag: 'Brand Assets',
          action: () => {
            onClose();
            onOpenIconModal?.();
          }
        }
      ]
    }
  ];

  // Filtering based on active tab & search query
  const filteredGroups = FEATURE_GROUPS.map(group => {
    if (activeTab !== 'all' && group.id !== activeTab && activeTab !== 'localities') {
      return null;
    }
    const matchingItems = group.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (matchingItems.length === 0) return null;
    return { ...group, items: matchingItems };
  }).filter(Boolean);

  const matchingLocalities = localitiesList.filter(loc => 
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Slide-Up Panel */}
      <div className="relative z-10 bg-white w-full sm:max-w-5xl rounded-t-3xl sm:rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-[#FAF7F2]">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-gradient-to-r from-blue-50/90 via-white to-orange-50/60 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-[#F2621E] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-2xs">
                ✦ Auricity Master Menu
              </span>
              <span className="text-xs text-[#1E4FA8] font-bold hidden sm:inline">Chhatrapati Sambhajinagar Direct Real Estate</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] flex items-center space-x-2 tracking-tight">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#1E4FA8] text-white flex items-center justify-center shadow-xs">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-white rotate-90 sm:rotate-0" />
              </div>
              <span>All Features, Portals & Tools</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer shrink-0 ml-2"
            title="Close Menu (ESC)"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher & Access Control Bar */}
        <div className="bg-[#FAF7F2] p-3 sm:p-4 border-b border-[#E5DEC9] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Perspective & User Role
            </span>
            <span className="text-[10px] font-bold text-[#1E4FA8]">
              Current: <strong className="uppercase">{activeRole}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 1. Public Portal */}
            <button
              onClick={() => handleRoleSelect('public')}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeRole === 'public'
                  ? 'bg-blue-50 border-[#1E4FA8] shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <User className={`w-4 h-4 ${activeRole === 'public' ? 'text-[#1E4FA8]' : 'text-slate-500'}`} />
                {activeRole === 'public' && (
                  <span className="w-2 h-2 rounded-full bg-[#1E4FA8]"></span>
                )}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-tight">Buyer / Tenant</p>
                <p className="text-[10px] text-slate-500 truncate hidden xs:block">0% Brokerage Direct</p>
              </div>
            </button>

            {/* 2. Broker CRM */}
            <button
              onClick={() => handleRoleSelect('broker')}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeRole === 'broker'
                  ? 'bg-amber-50 border-amber-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Building2 className={`w-4 h-4 ${activeRole === 'broker' ? 'text-amber-600' : 'text-slate-500'}`} />
                {activeRole === 'broker' && (
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                )}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-tight">Broker CRM</p>
                <p className="text-[10px] text-slate-500 truncate hidden xs:block">Partner Leads & Deal Desk</p>
              </div>
            </button>

            {/* 3. Super Admin */}
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeRole === 'admin'
                  ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <ShieldCheck className={`w-4 h-4 ${activeRole === 'admin' ? 'text-amber-300' : 'text-slate-500'}`} />
                <Lock className="w-3 h-3 text-slate-400" />
              </div>
              <div>
                <p className={`text-xs font-black leading-tight ${activeRole === 'admin' ? 'text-white' : 'text-slate-900'}`}>
                  Super Admin
                </p>
                <p className={`text-[10px] truncate hidden xs:block ${activeRole === 'admin' ? 'text-blue-200' : 'text-slate-500'}`}>
                  PIN 9999 Access
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar & Quick CTAs */}
        <div className="p-3 sm:p-4 bg-[#F7F8FA] border-b border-[#E2E8F0] space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#1E4FA8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anything (e.g. EMI, Rent, CIDCO, Valuator, Legal, Shifting)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#1E4FA8] shadow-2xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-[#0F172A]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Action Shortcuts */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  handleNavigate('post-property');
                }}
                className="bg-[#F2621E] hover:bg-[#DE5514] text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Post Free</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenEMIModal?.();
                }}
                className="bg-white hover:bg-blue-50/60 border border-[#E2E8F0] text-[#1E4FA8] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-[#F2621E]" />
                <span>EMI Calc</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  handleNavigate('properties');
                }}
                className="bg-white hover:bg-slate-50 border border-[#E2E8F0] text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-2xs cursor-pointer"
                title="Saved Properties"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Saved ({favorites.length})</span>
              </button>
            </div>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
            {[
              { id: 'all', label: 'All Options', icon: Layers },
              { id: 'properties', label: 'Buy & Rent', icon: Building2 },
              { id: 'ai', label: 'AI & Tools', icon: Sparkles },
              { id: 'services', label: 'Services', icon: Truck },
              { id: 'portals', label: 'Portals', icon: ShieldCheck },
              { id: 'localities', label: 'Localities', icon: MapPin }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-[#1E4FA8] text-white shadow-xs'
                      : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Content Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* If Localities Tab or Searching Localities */}
          {(activeTab === 'localities' || (searchQuery && matchingLocalities.length > 0)) && (
            <div className="space-y-3 bg-[#F7F8FA] p-4 sm:p-5 rounded-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#F2621E]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                    Direct Locality Filter Jumps (Sambhajinagar)
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-[#64748B]">
                  Click locality to view listings
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {matchingLocalities.map(loc => (
                  <button
                    key={loc}
                    onClick={() => handleNavigate('properties', { locality: loc })}
                    className="bg-white hover:bg-blue-50 border border-[#E2E8F0] hover:border-[#1E4FA8] text-[#0F172A] hover:text-[#1E4FA8] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-[#F2621E]" />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categorized Feature Cards */}
          {filteredGroups && filteredGroups.length > 0 ? (
            filteredGroups.map(group => {
              if (!group) return null;
              const CategoryIcon = group.icon;

              return (
                <div key={group.id} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-[#1E4FA8]">
                        <CategoryIcon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                        {group.category}
                      </h3>
                    </div>
                    {group.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#F2621E] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
                        {group.badge}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map(item => {
                      const ItemIcon = item.icon;

                      return (
                        <div
                          key={item.id}
                          onClick={item.action}
                          className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/40 p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#1E4FA8] shadow-2xs hover:shadow-card transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] group-hover:bg-[#1E4FA8] text-[#1E4FA8] group-hover:text-white flex items-center justify-center transition-all border border-[#E2E8F0] group-hover:border-[#1E4FA8] shadow-2xs">
                                <ItemIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                              </div>

                              {item.tag && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-[#0F172A] group-hover:bg-[#F2621E] group-hover:text-white transition-colors">
                                  {item.tag}
                                </span>
                              )}
                            </div>

                            <div>
                              <h4 className="text-xs font-black text-[#0F172A] group-hover:text-[#1E4FA8] transition-colors flex items-center space-x-1">
                                <span>{item.title}</span>
                              </h4>
                              <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#1E4FA8] group-hover:text-[#F2621E] transition-colors">
                            <span>Open Feature</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : activeTab !== 'localities' ? (
            <div className="py-12 text-center text-xs text-[#64748B] space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-[#0F172A]">No features match &quot;{searchQuery}&quot;</p>
              <p>Try searching &quot;EMI&quot;, &quot;Legal&quot;, &quot;Rent&quot;, &quot;CIDCO&quot;, or browse by category tabs above.</p>
            </div>
          ) : null}

          {/* Direct WhatsApp Desk & Support Banner */}
          <div className="bg-gradient-to-r from-[#1E4FA8] to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="bg-[#F2621E] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  Verified Support
                </span>
                <span className="font-bold text-blue-200">0% Brokerage Assurance</span>
              </div>
              <p className="text-xs text-slate-300">
                Need customized real estate advice, legal 30-year title searches, or home relocation?
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <a
                href="https://wa.me/918010506030?text=Hi%20Auricity%2C%20I%20need%20assistance%20with%20properties%20in%20Sambhajinagar."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-bold flex items-center space-x-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href="tel:+918010506030"
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl font-bold flex items-center space-x-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Help</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#F7F8FA] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Auricity Real Estate Network • Chhatrapati Sambhajinagar</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-bold">
            <button
              onClick={() => {
                onClose();
                onOpenIconModal?.();
              }}
              className="text-[#1E4FA8] hover:underline cursor-pointer"
            >
              Icon System
            </button>
            <span>•</span>
            <button
              onClick={() => handleRoleSelect('admin')}
              className="text-[#F2621E] hover:underline cursor-pointer"
            >
              Admin Hub (PIN 9999)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
