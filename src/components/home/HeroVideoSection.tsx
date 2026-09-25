import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Building2, 
  KeyRound, 
  BedDouble, 
  Briefcase, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  PlusCircle,
  LandPlot,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface HeroVideoSectionProps {
  onOpenEMIModal?: () => void;
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({ onOpenEMIModal }) => {
  const { heading: homeHeading, subheading: homeSubheading, imageUrl: homeImageUrl } = useHomeCopy('hero', 'Find Your Perfect Home in Chhatrapati Sambhajinagar', 'Connect directly with verified owners and discover trusted homes without unnecessary brokerage across CIDCO, Garkheda, Samarth Nagar, and Shendra DMIC.');
  const { 
    searchParams, 
    setSearchParams, 
    setActiveView, 
    localitiesList,
    settings 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'plots' | 'pg'>('buy');
  const [selectedLocality, setSelectedLocality] = useState(searchParams.locality || '');
  const [selectedPropertyType, setSelectedPropertyType] = useState(searchParams.propertyType || '');
  const [selectedBhk, setSelectedBhk] = useState(searchParams.bhk || '');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.query || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      ...searchParams,
      query: searchQuery,
      locality: selectedLocality,
      propertyType: selectedPropertyType,
      bhk: selectedBhk ? Number(selectedBhk) : undefined,
      listingType: activeTab === 'buy' ? 'sale' : activeTab === 'rent' ? 'rent' : activeTab === 'pg' ? 'pg' : 'commercial'
    });

    if (activeTab === 'buy') setActiveView('properties');
    else if (activeTab === 'rent') setActiveView('rentals');
    else if (activeTab === 'pg') setActiveView('pgs');
    else setActiveView('properties');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F1E8] text-slate-900 min-h-[320px] sm:min-h-[420px] flex flex-col justify-between border-b border-[#E5DEC9] transition-colors" id="hero-video-banner-section">
      
      {/* Background Video / Architectural Visual Layer with Loop & Warm Light Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={homeImageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80"}
          className="w-full h-full object-cover object-center opacity-15 mix-blend-multiply scale-105 transform duration-1000"
        >
          {/* Looping placeholder city / architectural video source */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-city-buildings-and-skyscrapers-31518-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Warm light beige overlay for text readability & ambient feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8] via-[#FAF7F2]/85 to-[#F5F1E8]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/35 via-transparent to-transparent" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-7 pb-4 sm:pb-6 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Trust Pill & Tagline */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-300/80 shadow-xs text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F2621E] animate-pulse shrink-0"></span>
            <span className="font-black text-[#F2621E]">0% Brokerage</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-slate-800">100% Direct Owner Homes</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="font-semibold text-slate-600 hidden sm:inline">Chhatrapati Sambhajinagar</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-black text-[#1E4FA8] tracking-tight leading-[1.15]">
            {homeHeading}
          </h1>

          <p className="text-[11px] sm:text-sm text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
            {homeSubheading}
          </p>

          {/* Quick CTA Actions */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 pt-1 w-full max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => setActiveView('properties')}
              className="btn-theme-secondary text-[11px] sm:text-sm font-black px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl shadow-md flex items-center justify-center space-x-1 sm:space-x-2 cursor-pointer transform hover:-translate-y-0.5 transition-all text-white"
            >
              <span className="truncate">Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={() => setActiveView('post-property')}
              className="bg-white hover:bg-slate-50 text-[#1E4FA8] border border-slate-300 text-[11px] sm:text-sm font-bold px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl shadow-xs flex items-center justify-center space-x-1 sm:space-x-2 cursor-pointer transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#F2621E] shrink-0" />
              <span className="truncate">Post Free (Owner)</span>
            </button>
          </div>
        </div>

        {/* Section 3: Advanced Search Console sitting on top of video banner */}
        <div className="mt-2.5 sm:mt-5 max-w-5xl mx-auto w-full">
          <div className="auricity-home-search-console bg-white text-slate-900 rounded-xl sm:rounded-2xl shadow-lg border border-[#E2DAC6] p-2 sm:p-3 space-y-1 sm:space-y-2">
            
            {/* Search Category Tabs */}
            <div className="flex items-center space-x-1 sm:space-x-2 border-b border-slate-100 pb-1 sm:pb-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'buy', label: 'Buy Properties', icon: Building2 },
                { id: 'rent', label: 'Rent Direct', icon: KeyRound },
                { id: 'commercial', label: 'Commercial', icon: Briefcase },
                { id: 'plots', label: 'Plots / Land', icon: LandPlot },
                { id: 'pg', label: 'PG / Co-Living', icon: BedDouble }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-black transition-all flex items-center space-x-1 sm:space-x-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'bg-[var(--primary)] text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="ml-auto hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Direct Owners</span>
              </div>
            </div>

            {/* Main Search Controls Form */}
            <form onSubmit={handleSearch} className="space-y-2 sm:space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-1.5 sm:gap-2">
                
                {/* Locality Selector (4 cols on lg) */}
                <div className="lg:col-span-3">
                  <label className="block text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                    Locality / Area
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#F2621E] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="w-full pl-8 pr-6 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-slate-900 focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="">All Sambhajinagar Localities</option>
                      {localitiesList.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* BHK / Unit dropdown (3 cols on lg) */}
                <div className="lg:col-span-3">
                  <label className="block text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                    BHK / Unit Type
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedBhk}
                      onChange={(e) => setSelectedBhk(e.target.value)}
                      className="w-full pl-8 pr-6 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-slate-900 focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="">Any BHK / Config</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4+ BHK / Duplex</option>
                      <option value="plot">Plot / Land Unit</option>
                      <option value="commercial">Commercial Space</option>
                    </select>
                  </div>
                </div>

                {/* Budget Dropdown (3 cols on lg) */}
                <div className="lg:col-span-3">
                  <label className="block text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                    Budget Range
                  </label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-slate-900 focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="">Any Budget</option>
                    <option value="under-25L">Under ₹25 Lakhs</option>
                    <option value="25L-50L">₹25 Lakhs - ₹50 Lakhs</option>
                    <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                    <option value="1Cr-2Cr">₹1 Crore - ₹2 Crores</option>
                    <option value="above-2Cr">Above ₹2 Crores</option>
                    <option value="rent-5k-15k">₹5,000 - ₹15,000 / mo (Rent)</option>
                    <option value="rent-15k-30k">₹15,000 - ₹30,000 / mo (Rent)</option>
                  </select>
                </div>

                {/* Orange Search Action Button (3 cols on lg) */}
                <div className="lg:col-span-3 flex items-end">
                  <button
                    type="submit"
                    className="btn-theme-secondary w-full h-[34px] sm:h-[40px] text-xs sm:text-sm font-black rounded-lg sm:rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow-md text-white transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Search Properties</span>
                  </button>
                </div>
              </div>

              {/* Keyword Bar & AI Valuation Helper */}
              <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search by landmark, society or builder (e.g. Prozone Mall, Cannaught, Sutgirni, Kalyani)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveView('valuator')}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>AI Price Valuator</span>
                </button>
              </div>
            </form>

            {/* Popular Search Tags */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-bold text-slate-500">Popular:</span>
              {['2 BHK CIDCO N-4', 'Garkheda Sutgirni', 'Samarth Nagar 3 BHK', 'Shendra Industrial Land', 'Beed Bypass Row House'].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveView('properties');
                  }}
                  className="text-[11px] bg-slate-100 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200 transition-colors cursor-pointer font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
