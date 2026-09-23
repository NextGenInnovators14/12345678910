import React, { useState } from 'react';
import { useApp, HomePageSectionConfig } from '../../../context/AppContext';
import { HomePageCanvas } from '../../home/HomePageCanvas';
import { 
  Eye, 
  EyeOff, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  LayoutTemplate, 
  CheckCircle2, 
  TrendingUp, 
  Star, 
  Landmark, 
  Users, 
  Megaphone, 
  Building2, 
  ShieldCheck, 
  ExternalLink,
  Image as ImageIcon,
  Check
} from 'lucide-react';

export const HomepageStudioManager: React.FC = () => {
  const {
    homePageConfig,
    updateHomePageConfig,
    updateHomeSection,
    resetHomePageConfig,
    cmsPages,
    updateCmsSection,
    showToast,
    localitiesList,
    bannerAds,
    addBannerAd,
    updateBannerAd,
    deleteBannerAd,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'sections' | 'hero' | 'localities' | 'cta_cards' | 'loan_banner' | 'testimonials' | 'clubs' | 'why_choose' | 'preview'>('sections');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('hero');

  const sections = homePageConfig.sections || [];
  const selectedSection = sections.find(s => s.id === selectedSectionId) || sections[0];

  // Reorder sections
  const handleReorder = (index: number, direction: -1 | 1) => {
    const next = [...sections];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateHomePageConfig({ sections: next });
    showToast('Section order updated', 'success');
  };

  // Toggle section visibility
  const handleToggleVisible = (id: string, current: boolean) => {
    updateHomeSection(id, { visible: !current });
    showToast(`Section ${!current ? 'enabled' : 'hidden'}`, 'info');
  };

  // 1. HERO SECTION FORM STATE
  const heroSection = cmsPages?.home?.sections?.hero;
  const [heroBadge, setHeroBadge] = useState(heroSection?.badge || '100% Owner Properties • Zero Brokerage • Verified Homes');
  const [heroHeading, setHeroHeading] = useState(heroSection?.heading || 'Find Your Perfect Home in Chhatrapati Sambhajinagar');
  const [heroSubheading, setHeroSubheading] = useState(heroSection?.subheading || 'Connect directly with verified owners and discover trusted homes without unnecessary brokerage across CIDCO, Garkheda, Samarth Nagar, and Shendra DMIC.');
  const [heroImageUrl, setHeroImageUrl] = useState(heroSection?.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [heroTabBuy, setHeroTabBuy] = useState(heroSection?.customFields?.tabBuyText || 'Buy Properties');
  const [heroTabRent, setHeroTabRent] = useState(heroSection?.customFields?.tabRentText || 'Rent Direct');
  const [heroTabCommercial, setHeroTabCommercial] = useState(heroSection?.customFields?.tabCommercialText || 'Commercial');
  const [heroTabPlots, setHeroTabPlots] = useState(heroSection?.customFields?.tabPlotsText || 'NA Plots');

  const handleSaveHero = () => {
    updateCmsSection('home', 'hero', {
      badge: heroBadge,
      heading: heroHeading,
      subheading: heroSubheading,
      imageUrl: heroImageUrl,
      customFields: {
        ...(heroSection?.customFields || {}),
        tabBuyText: heroTabBuy,
        tabRentText: heroTabRent,
        tabCommercialText: heroTabCommercial,
        tabPlotsText: heroTabPlots
      }
    });
    // Also sync to home section override
    updateHomeSection('hero', {
      headingOverride: heroHeading,
      subheadingOverride: heroSubheading,
      imageUrl: heroImageUrl
    });
    showToast('Hero section saved successfully!', 'success');
  };

  // 2. TOP LOCALITIES STATE
  const localitiesSection = cmsPages?.home?.sections?.localities;
  const defaultLocalities = [
    { name: 'CIDCO', fullName: 'CIDCO N-1 to N-12', tagline: 'Heart of Town & Commercial Hub', avgPrice: '₹4,500 - ₹7,200 / sq.ft', growth: '+12.4% YoY', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=60' },
    { name: 'Garkheda', fullName: 'Garkheda Parisar', tagline: 'Premium Residential & Sutgirni Belt', avgPrice: '₹5,000 - ₹8,500 / sq.ft', growth: '+9.8% YoY', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60' },
    { name: 'Jalna Road', fullName: 'Jalna Road & Shendra DMIC', tagline: 'Mega Industrial & High Appreciation', avgPrice: '₹3,200 - ₹5,800 / sq.ft', growth: '+18.6% YoY', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60' },
    { name: 'Beed Bypass', fullName: 'Beed Bypass Road', tagline: 'High-Rise Luxury & MIT Junction', avgPrice: '₹4,200 - ₹6,800 / sq.ft', growth: '+14.2% YoY', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60' },
    { name: 'Samarth Nagar', fullName: 'Samarth Nagar & Cannaught', tagline: 'Elite Core City & Commercial Center', avgPrice: '₹7,500 - ₹12,000 / sq.ft', growth: '+8.5% YoY', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60' }
  ];
  const [localitiesListState, setLocalitiesListState] = useState<any[]>(() => {
    return Array.isArray(localitiesSection?.items) && localitiesSection.items.length > 0 ? localitiesSection.items : defaultLocalities;
  });
  const [editingLocalityIndex, setEditingLocalityIndex] = useState<number | null>(null);
  const [localityForm, setLocalityForm] = useState<any>({ name: '', fullName: '', tagline: '', avgPrice: '', growth: '', image: '' });

  const handleOpenAddLocality = () => {
    setEditingLocalityIndex(null);
    setLocalityForm({
      name: 'New Locality',
      fullName: 'New Locality Sector / Belt',
      tagline: 'High Growth Investment Hotspot',
      avgPrice: '₹4,000 - ₹6,500 / sq.ft',
      growth: '+10.5% YoY',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60'
    });
  };

  const handleSaveLocalityItem = () => {
    if (!localityForm.name.trim()) return showToast('Locality name is required', 'error');
    let nextList = [...localitiesListState];
    if (editingLocalityIndex !== null) {
      nextList[editingLocalityIndex] = { ...localityForm };
    } else {
      nextList.push({ ...localityForm });
    }
    setLocalitiesListState(nextList);
    updateCmsSection('home', 'localities', {
      id: 'localities',
      name: 'Top Localities',
      heading: 'Explore Top Localities',
      subheading: 'Real-time market insights, average price per sq.ft, and verified direct owner inventory.',
      items: nextList
    });
    setEditingLocalityIndex(null);
    showToast('Locality saved!', 'success');
  };

  const handleDeleteLocalityItem = (index: number) => {
    const nextList = localitiesListState.filter((_, i) => i !== index);
    setLocalitiesListState(nextList);
    updateCmsSection('home', 'localities', {
      id: 'localities',
      name: 'Top Localities',
      items: nextList
    });
    showToast('Locality removed', 'info');
  };

  // 3. CTA CARDS STATE
  const ctaSection = cmsPages?.home?.sections?.cta;
  const [ctaHeading, setCtaHeading] = useState(ctaSection?.heading || 'Powering Your Property Journey');
  const [ctaCard1Title, setCtaCard1Title] = useState(ctaSection?.customFields?.card1Title || 'List Your Property for FREE');
  const [ctaCard1Desc, setCtaCard1Desc] = useState(ctaSection?.customFields?.card1Desc || 'List a property and receive direct buyer or tenant enquiries.');
  const [ctaCard2Title, setCtaCard2Title] = useState(ctaSection?.customFields?.card2Title || "Join Realtor's (Broker) Club");
  const [ctaCard2Desc, setCtaCard2Desc] = useState(ctaSection?.customFields?.card2Desc || 'Create your verified broker profile and access the Auricity broker ecosystem.');
  const [ctaCard3Title, setCtaCard3Title] = useState(ctaSection?.customFields?.card3Title || 'Be Our Affiliate Partner');
  const [ctaCard3Desc, setCtaCard3Desc] = useState(ctaSection?.customFields?.card3Desc || 'Refer genuine property opportunities and participate in Auricity rewards.');
  const [ctaCard4Title, setCtaCard4Title] = useState(ctaSection?.customFields?.card4Title || 'Advertise With Us');
  const [ctaCard4Desc, setCtaCard4Desc] = useState(ctaSection?.customFields?.card4Desc || 'Promote projects, services and property-focused campaigns to local customers.');

  const handleSaveCtaCards = () => {
    updateCmsSection('home', 'cta', {
      heading: ctaHeading,
      customFields: {
        card1Title: ctaCard1Title, card1Desc: ctaCard1Desc,
        card2Title: ctaCard2Title, card2Desc: ctaCard2Desc,
        card3Title: ctaCard3Title, card3Desc: ctaCard3Desc,
        card4Title: ctaCard4Title, card4Desc: ctaCard4Desc
      }
    });
    updateHomeSection('cta', { headingOverride: ctaHeading });
    showToast('CTA cards updated!', 'success');
  };

  // 4. LOAN BANNER STATE
  const loanSection = cmsPages?.home?.sections?.loanBanner;
  const [loanHeading, setLoanHeading] = useState(loanSection?.heading || 'Every Loan You Need, All in One Place');
  const [loanSubheading, setLoanSubheading] = useState(loanSection?.subheading || 'Home Loans, Plot Loans, Balance Transfers & Commercial Finance starting at 8.25% ROI with 10+ leading nationalized banks in Sambhajinagar.');
  const [loanBadge, setLoanBadge] = useState(loanSection?.badge || 'Instant Paperless Sanctions');
  const [loanCtaText, setLoanCtaText] = useState(loanSection?.ctaText || 'Apply Now');
  const [loanCtaLink, setLoanCtaLink] = useState(loanSection?.ctaLink || 'https://wa.me/918010506030?text=Hi%20Auricity,%20I%20want%20to%20apply%20for%20a%20Home%20Loan.');

  const handleSaveLoanBanner = () => {
    updateCmsSection('home', 'loanBanner', {
      heading: loanHeading,
      subheading: loanSubheading,
      badge: loanBadge,
      ctaText: loanCtaText,
      ctaLink: loanCtaLink
    });
    updateHomeSection('loanBanner', { headingOverride: loanHeading, subheadingOverride: loanSubheading });
    showToast('Loan banner saved!', 'success');
  };

  // 5. TESTIMONIALS STATE
  const testimonialsSection = cmsPages?.home?.sections?.testimonials;
  const defaultBuyerStories = [
    {
      id: 'story-1',
      buyerName: 'Pravin & Snehal Deshmukh',
      locality: 'SkyHeights, CIDCO N-4',
      propertyType: '3 BHK High-Rise Apartment',
      brokerageSaved: '₹ 1,76,000 Saved in Brokerage',
      story: 'We were searching for a 3 BHK in CIDCO for almost 8 months. Through Auricity, we connected directly with the original owner Vikas-ji within 2 days. Truly zero brokerage!',
      rating: 5,
      date: 'Handover: August 2026',
      photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      badge: 'First Time Home Buyer'
    },
    {
      id: 'story-2',
      buyerName: 'Dr. Anand & Rohini Kulkarni',
      locality: 'Samarth Imperial Heights, Beed Bypass',
      propertyType: '4 BHK Sky Villa',
      brokerageSaved: '₹ 2,45,000 Saved in Brokerage',
      story: 'The AI Valuator gave us exact micro-market rate predictions for Beed Bypass. We directly negotiated with the developer with zero intermediary pressure.',
      rating: 5,
      date: 'Handover: July 2026',
      photo: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      badge: 'Luxury Villa Owner'
    }
  ];
  const [storiesList, setStoriesList] = useState<any[]>(() => {
    return Array.isArray(testimonialsSection?.items) && testimonialsSection.items.length > 0 ? testimonialsSection.items : defaultBuyerStories;
  });
  const [editingStoryIndex, setEditingStoryIndex] = useState<number | null>(null);
  const [storyForm, setStoryForm] = useState<any>({ buyerName: '', locality: '', propertyType: '', brokerageSaved: '', story: '', rating: 5, date: '', photo: '', badge: '' });

  const handleSaveStory = () => {
    if (!storyForm.buyerName.trim()) return showToast('Buyer name is required', 'error');
    let next = [...storiesList];
    if (editingStoryIndex !== null) {
      next[editingStoryIndex] = { ...storyForm };
    } else {
      next.push({ ...storyForm, id: `story-${Date.now()}` });
    }
    setStoriesList(next);
    updateCmsSection('home', 'testimonials', {
      id: 'testimonials',
      name: 'Customer Testimonials',
      heading: 'Keys to Happiness: Our Home Buyers',
      items: next
    });
    setEditingStoryIndex(null);
    showToast('Testimonial saved!', 'success');
  };

  const handleDeleteStory = (index: number) => {
    const next = storiesList.filter((_, i) => i !== index);
    setStoriesList(next);
    updateCmsSection('home', 'testimonials', { id: 'testimonials', items: next });
    showToast('Testimonial removed', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-blue-900 via-[#1E4FA8] to-indigo-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-sm">
              Visual Homepage Studio
            </span>
            <span className="text-xs text-blue-200">19 Complete Sections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Full Homepage Control Center</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Reorder sections, toggle visibility, customize headings, hero banners, top localities, 4 CTA cards, bank loan rates, and customer testimonials.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={resetHomePageConfig}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reset Layout
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg hover:bg-cyan-300 transition-all"
          >
            <LayoutTemplate className="w-4 h-4" /> Live Preview Mode
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'sections', label: '1. Sections & Reorder', icon: Layers },
          { id: 'hero', label: '2. Hero Banner & Search', icon: Sparkles },
          { id: 'localities', label: '3. Top Localities (5+)', icon: TrendingUp },
          { id: 'cta_cards', label: '4. Quick 4 CTA Cards', icon: Users },
          { id: 'loan_banner', label: '5. Bank Loan & EMI Banner', icon: Landmark },
          { id: 'testimonials', label: '6. Happy Buyer Stories', icon: Star },
          { id: 'preview', label: '7. Live Canvas Preview', icon: Monitor }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-[#1E4FA8] text-white shadow-md' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. SECTIONS ORDER & VISIBILITY TAB */}
      {activeTab === 'sections' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Homepage Section Order & Visibility</h3>
                <p className="text-xs text-slate-500">Enable or disable sections and adjust their display order on the public homepage.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1E4FA8] text-xs font-black">
                {sections.filter(s => s.visible).length} of {sections.length} Visible
              </span>
            </div>

            <div className="space-y-2">
              {sections.map((section, index) => {
                const isSelected = selectedSectionId === section.id;
                return (
                  <div
                    key={section.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'border-[#1E4FA8] bg-blue-50/60 shadow-sm' 
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    <div 
                      className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                      onClick={() => setSelectedSectionId(section.id)}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate">
                          {section.label}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          ID: <span className="font-mono">{section.id}</span> • Layout: {section.layout} • Spacing: {section.spacing}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleVisible(section.id, section.visible)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                          section.visible 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        title={section.visible ? 'Hide from homepage' : 'Show on homepage'}
                      >
                        {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {section.visible ? 'Visible' : 'Hidden'}
                      </button>

                      <div className="flex bg-white rounded-xl border border-slate-200 p-0.5">
                        <button
                          disabled={index === 0}
                          onClick={() => handleReorder(index, -1)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30"
                          title="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          disabled={index === sections.length - 1}
                          onClick={() => handleReorder(index, 1)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30"
                          title="Move down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Properties Inspector for Selected Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Section Settings</span>
                <h4 className="text-base font-black text-slate-900">{selectedSection?.label}</h4>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${selectedSection?.visible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                {selectedSection?.visible ? 'Visible' : 'Hidden'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <label className="block">
                <span className="font-black text-slate-700">Display Label</span>
                <input
                  value={selectedSection?.label || ''}
                  onChange={e => updateHomeSection(selectedSection.id, { label: e.target.value })}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="font-black text-slate-700">Layout Format</span>
                  <select
                    value={selectedSection?.layout || 'auto'}
                    onChange={e => updateHomeSection(selectedSection.id, { layout: e.target.value as any })}
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="auto">Auto</option>
                    <option value="full">Full Width</option>
                    <option value="compact">Compact</option>
                    <option value="split">Split</option>
                    <option value="grid">Grid</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </label>

                <label className="block">
                  <span className="font-black text-slate-700">Padding Spacing</span>
                  <select
                    value={selectedSection?.spacing || 'normal'}
                    onChange={e => updateHomeSection(selectedSection.id, { spacing: e.target.value as any })}
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="airy">Airy (Padded)</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="font-black text-slate-700">Heading Override</span>
                <input
                  value={selectedSection?.headingOverride || ''}
                  onChange={e => updateHomeSection(selectedSection.id, { headingOverride: e.target.value })}
                  placeholder="Leave empty to use default heading"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <span className="font-black text-slate-700">Subheading Override</span>
                <textarea
                  value={selectedSection?.subheadingOverride || ''}
                  onChange={e => updateHomeSection(selectedSection.id, { subheadingOverride: e.target.value })}
                  rows={2}
                  placeholder="Leave empty to use default description"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none"
                />
              </label>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-black text-slate-800">Auto-Scroll Animation</p>
                  <p className="text-[10px] text-slate-400">Continuous carousel motion</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateHomeSection(selectedSection.id, { autoScroll: !selectedSection.autoScroll })}
                  className={`w-11 h-6 rounded-full p-1 transition-colors ${selectedSection?.autoScroll ? 'bg-[#1E4FA8]' : 'bg-slate-300'}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${selectedSection?.autoScroll ? 'translate-x-5' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => showToast('Section settings saved', 'success')}
                className="w-full py-2.5 rounded-xl bg-[#1E4FA8] text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Section Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO BANNER & SEARCH EDIT TAB */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">Main Entry Point</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Hero Section & Search Bar Customizer</h3>
              <p className="text-xs text-slate-500">Edit the top banner headlines, background imagery, and search tab labels.</p>
            </div>
            <button
              onClick={handleSaveHero}
              className="px-5 py-2.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-2 shadow-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" /> Save Hero Section
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-black text-slate-700">Hero Badge Pill</span>
                <input
                  value={heroBadge}
                  onChange={e => setHeroBadge(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Main Headline (H1)</span>
                <textarea
                  value={heroHeading}
                  onChange={e => setHeroHeading(e.target.value)}
                  rows={2}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base font-black text-slate-900 resize-none"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Subheading & Trust Narrative</span>
                <textarea
                  value={heroSubheading}
                  onChange={e => setHeroSubheading(e.target.value)}
                  rows={3}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 resize-none"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Hero Background Image URL</span>
                <input
                  value={heroImageUrl}
                  onChange={e => setHeroImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </label>
            </div>

            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F2621E]" /> Search Bar Tab Labels
              </h4>
              <p className="text-xs text-slate-500">Rename the 4 primary search modes on the homepage hero.</p>

              <label className="block">
                <span className="text-xs font-bold text-slate-600">Tab 1: Buy Properties</span>
                <input
                  value={heroTabBuy}
                  onChange={e => setHeroTabBuy(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-600">Tab 2: Rent Direct</span>
                <input
                  value={heroTabRent}
                  onChange={e => setHeroTabRent(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-600">Tab 3: Commercial</span>
                <input
                  value={heroTabCommercial}
                  onChange={e => setHeroTabCommercial(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-600">Tab 4: NA Plots</span>
                <input
                  value={heroTabPlots}
                  onChange={e => setHeroTabPlots(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 3. TOP LOCALITIES EDIT TAB */}
      {activeTab === 'localities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">Market Spotlight</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Explore Top Localities Manager</h3>
              <p className="text-xs text-slate-500">Manage CIDCO, Garkheda, Beed Bypass, Jalna Road, and add new growth corridors.</p>
            </div>
            <button
              onClick={handleOpenAddLocality}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" /> Add New Locality
            </button>
          </div>

          {/* Add / Edit Locality Form Modal / Card */}
          {(editingLocalityIndex !== null || localityForm.name) && (
            <div className="bg-blue-50/70 border-2 border-blue-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-[#1E4FA8]">
                  {editingLocalityIndex !== null ? 'Edit Locality Details' : 'Add New Locality Corridor'}
                </h4>
                <button 
                  onClick={() => { setEditingLocalityIndex(null); setLocalityForm({ name: '' }); }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-xs font-black text-slate-700">Locality Code / Name</span>
                  <input
                    value={localityForm.name}
                    onChange={e => setLocalityForm({ ...localityForm, name: e.target.value })}
                    placeholder="e.g. CIDCO"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-700">Full Display Title</span>
                  <input
                    value={localityForm.fullName}
                    onChange={e => setLocalityForm({ ...localityForm, fullName: e.target.value })}
                    placeholder="e.g. CIDCO N-1 to N-12"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-700">Tagline / Key Highlight</span>
                  <input
                    value={localityForm.tagline}
                    onChange={e => setLocalityForm({ ...localityForm, tagline: e.target.value })}
                    placeholder="e.g. Heart of Town & Commercial Hub"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-700">Average Rate / sq.ft</span>
                  <input
                    value={localityForm.avgPrice}
                    onChange={e => setLocalityForm({ ...localityForm, avgPrice: e.target.value })}
                    placeholder="e.g. ₹4,500 - ₹7,200 / sq.ft"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-700">YoY Price Appreciation</span>
                  <input
                    value={localityForm.growth}
                    onChange={e => setLocalityForm({ ...localityForm, growth: e.target.value })}
                    placeholder="e.g. +14.2% YoY"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-700">Thumbnail Image URL</span>
                  <input
                    value={localityForm.image}
                    onChange={e => setLocalityForm({ ...localityForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSaveLocalityItem}
                  className="px-5 py-2.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Locality
                </button>
              </div>
            </div>
          )}

          {/* Localities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localitiesListState.map((loc, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                <div className="h-32 bg-slate-100 relative overflow-hidden">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shadow-md">
                    {loc.growth}
                  </span>
                  <span className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-black backdrop-blur-sm">
                    {loc.name}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-black text-sm text-slate-900">{loc.fullName}</h5>
                    <p className="text-xs text-slate-500 line-clamp-1">{loc.tagline}</p>
                    <p className="text-xs font-black text-[#1E4FA8] mt-1">{loc.avgPrice}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                    <button
                      onClick={() => {
                        setEditingLocalityIndex(idx);
                        setLocalityForm({ ...loc });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4FA8] font-bold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLocalityItem(idx)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. QUICK 4 CTA CARDS TAB */}
      {activeTab === 'cta_cards' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black uppercase">Engagement Drivers</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">4 Action CTA Cards</h3>
              <p className="text-xs text-slate-500">Customize the 4 primary gateway cards displayed right below the homepage hero.</p>
            </div>
            <button
              onClick={handleSaveCtaCards}
              className="px-5 py-2.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-2 shadow-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" /> Save All 4 Cards
            </button>
          </div>

          <label className="block max-w-xl">
            <span className="text-xs font-black text-slate-700">Section Main Heading</span>
            <input
              value={ctaHeading}
              onChange={e => setCtaHeading(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-black"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl border-2 border-emerald-100 bg-emerald-50/30 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black">CARD 1 (FREE LISTING)</span>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 1 Title</span>
                <input value={ctaCard1Title} onChange={e => setCtaCard1Title(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 1 Description</span>
                <textarea value={ctaCard1Desc} onChange={e => setCtaCard1Desc(e.target.value)} rows={2} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white resize-none" />
              </label>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl border-2 border-blue-100 bg-blue-50/30 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1E4FA8] text-white text-[10px] font-black">CARD 2 (BROKERS CLUB)</span>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 2 Title</span>
                <input value={ctaCard2Title} onChange={e => setCtaCard2Title(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 2 Description</span>
                <textarea value={ctaCard2Desc} onChange={e => setCtaCard2Desc(e.target.value)} rows={2} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white resize-none" />
              </label>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl border-2 border-amber-100 bg-amber-50/30 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black">CARD 3 (AFFILIATE PARTNER)</span>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 3 Title</span>
                <input value={ctaCard3Title} onChange={e => setCtaCard3Title(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 3 Description</span>
                <textarea value={ctaCard3Desc} onChange={e => setCtaCard3Desc(e.target.value)} rows={2} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white resize-none" />
              </label>
            </div>

            {/* Card 4 */}
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-100/50 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white text-[10px] font-black">CARD 4 (ADVERTISE WITH US)</span>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 4 Title</span>
                <input value={ctaCard4Title} onChange={e => setCtaCard4Title(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Card 4 Description</span>
                <textarea value={ctaCard4Desc} onChange={e => setCtaCard4Desc(e.target.value)} rows={2} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white resize-none" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 5. LOAN BANNER TAB */}
      {activeTab === 'loan_banner' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase">Financial Desk</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Bank Partners & Home Loan Banner</h3>
              <p className="text-xs text-slate-500">Configure interest rate headline, bank list, and WhatsApp direct loan application link.</p>
            </div>
            <button
              onClick={handleSaveLoanBanner}
              className="px-5 py-2.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" /> Save Loan Banner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-black text-slate-700">Top Badge</span>
                <input
                  value={loanBadge}
                  onChange={e => setLoanBadge(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Main Heading</span>
                <input
                  value={loanHeading}
                  onChange={e => setLoanHeading(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-black"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Subheading / ROI Rate Details</span>
                <textarea
                  value={loanSubheading}
                  onChange={e => setLoanSubheading(e.target.value)}
                  rows={3}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none"
                />
              </label>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-black text-slate-700">Button Call-to-Action Text</span>
                <input
                  value={loanCtaText}
                  onChange={e => setLoanCtaText(e.target.value)}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-slate-700">WhatsApp / Application Link</span>
                <input
                  value={loanCtaLink}
                  onChange={e => setLoanCtaLink(e.target.value)}
                  placeholder="https://wa.me/91..."
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono"
                />
              </label>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-black">Nationalized Banks Displayed:</p>
                <p className="text-[11px]">SBI (8.30%), HDFC (8.35%), ICICI (8.40%), Bank of Baroda (8.25%), Axis (8.50%), PNB (8.35%), Kotak (8.40%), Canara Bank (8.30%).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. HAPPY BUYER STORIES TAB */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-black uppercase">Social Proof</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Buyer Testimonials & Success Stories</h3>
              <p className="text-xs text-slate-500">Real customer stories with verified savings amounts and photo handovers.</p>
            </div>
            <button
              onClick={() => {
                setEditingStoryIndex(null);
                setStoryForm({
                  buyerName: '',
                  locality: 'CIDCO N-4',
                  propertyType: '3 BHK Flat',
                  brokerageSaved: '₹ 1,50,000 Saved',
                  story: 'Connecting directly with the owner through Auricity was simple, transparent, and completely free of brokerage.',
                  rating: 5,
                  date: 'Handover: Recently',
                  photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
                  badge: 'Verified Buyer'
                });
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Story
            </button>
          </div>

          {/* Add / Edit Story Card */}
          {(editingStoryIndex !== null || storyForm.buyerName) && (
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-900">
                  {editingStoryIndex !== null ? 'Edit Testimonial' : 'Create New Customer Story'}
                </h4>
                <button onClick={() => { setEditingStoryIndex(null); setStoryForm({ buyerName: '' }); }} className="text-xs font-bold text-slate-500">Cancel</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Buyer / Family Name</span>
                  <input value={storyForm.buyerName} onChange={e => setStoryForm({ ...storyForm, buyerName: e.target.value })} placeholder="e.g. Pravin & Snehal Deshmukh" className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Locality / Society</span>
                  <input value={storyForm.locality} onChange={e => setStoryForm({ ...storyForm, locality: e.target.value })} placeholder="e.g. SkyHeights, CIDCO N-4" className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Brokerage Saved Amount</span>
                  <input value={storyForm.brokerageSaved} onChange={e => setStoryForm({ ...storyForm, brokerageSaved: e.target.value })} placeholder="e.g. ₹ 1,76,000 Saved" className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white font-black text-emerald-700" />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-xs font-bold text-slate-700">Customer Review / Experience</span>
                  <textarea value={storyForm.story} onChange={e => setStoryForm({ ...storyForm, story: e.target.value })} rows={2} className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white resize-none" />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Photo URL</span>
                  <input value={storyForm.photo} onChange={e => setStoryForm({ ...storyForm, photo: e.target.value })} placeholder="https://..." className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={handleSaveStory} className="px-5 py-2.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-1.5">
                  <Save className="w-4 h-4" /> Save Story
                </button>
              </div>
            </div>
          )}

          {/* Stories List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storiesList.map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <img src={story.photo} alt={story.buyerName} className="w-16 h-16 rounded-xl object-cover shrink-0 border" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-black text-slate-900 text-sm">{story.buyerName}</h5>
                    <p className="text-xs text-slate-500">{story.locality}</p>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black mt-1">
                      {story.brokerageSaved}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">"{story.story}"</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="text-[10px] text-slate-400 font-bold">{story.date}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingStoryIndex(idx); setStoryForm({ ...story }); }} className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4FA8] font-bold">Edit</button>
                    <button onClick={() => handleDeleteStory(idx)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. LIVE CANVAS PREVIEW TAB */}
      {activeTab === 'preview' && (
        <div className="bg-slate-100 rounded-3xl border border-slate-200 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-[#1E4FA8]" />
              <h3 className="font-black text-sm text-slate-900">Live Homepage Preview</h3>
            </div>
            <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 ${device === 'mobile' ? 'bg-[#1E4FA8] text-white' : 'text-slate-600'}`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile View
              </button>
              <button
                onClick={() => setDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 ${device === 'desktop' ? 'bg-[#1E4FA8] text-white' : 'text-slate-600'}`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop View
              </button>
            </div>
          </div>

          <div className={`mx-auto bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden transition-all ${
            device === 'mobile' ? 'max-w-[420px]' : 'max-w-6xl'
          }`}>
            <HomePageCanvas editMode={false} />
          </div>
        </div>
      )}
    </div>
  );
};
