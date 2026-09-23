import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Building2, 
  KeyRound, 
  BedDouble, 
  ShieldCheck, 
  Briefcase,
  Percent,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AuricityLogoMark } from '../common/AuricityLogo';

export const HeroBanner: React.FC = () => {
  const { 
    searchParams,
    setSearchParams,
    allProperties, 
    setActiveView, 
    localitiesList
  } = useApp();

  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'pg'>('buy');
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
      bhk: selectedBhk,
      listingType: activeTab === 'buy' ? 'sale' : activeTab === 'rent' ? 'rent' : activeTab === 'pg' ? 'pg' : 'commercial'
    });

    if (activeTab === 'buy') setActiveView('properties');
    else if (activeTab === 'rent') setActiveView('rentals');
    else if (activeTab === 'pg') setActiveView('pgs');
    else setActiveView('properties');
  };

  return (
    <section className="relative bg-[var(--background)] pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden border-b border-[var(--border)] w-full max-w-full transition-colors">
      
      {/* Subtle Background Geometry */}
      <div className="absolute right-[-40px] top-[-30px] opacity-[0.03] pointer-events-none w-96 h-96">
        <AuricityLogoMark className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-full space-y-8">
        
        {/* Main Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center space-x-2 bg-[var(--primary-light)] px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 shadow-2xs text-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse shrink-0"></span>
            <span className="font-extrabold text-[var(--primary)]">100% Owner Properties</span>
            <span className="text-[var(--border)]">•</span>
            <span className="font-bold text-[var(--text-secondary)]">Zero Brokerage</span>
            <span className="text-[var(--border)] hidden sm:inline">•</span>
            <span className="font-medium text-[var(--text-secondary)] hidden sm:inline">Verified Homes</span>
          </div>

          {/* Large Readable Typography */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.15]">
            Find Your Perfect Home in <br className="hidden sm:inline" />
            <span className="text-[var(--primary)]">Chhatrapati Sambhajinagar</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-medium leading-relaxed">
            Connect directly with verified owners and discover trusted homes without unnecessary brokerage across CIDCO, Garkheda, Samarth Nagar, and Shendra DMIC.
          </p>
        </div>

        {/* Clean, Spacious Real Estate Search Card */}
        <div className="max-w-4xl mx-auto bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-md p-4 sm:p-7 space-y-5 w-full min-w-0">
          
          {/* Search Category Tabs */}
          <div className="flex items-center space-x-2 border-b border-[var(--border)] pb-3.5 overflow-x-auto no-scrollbar w-full min-w-0">
            {[
              { id: 'buy', label: 'Buy Properties', icon: Building2 },
              { id: 'rent', label: 'Rent Direct', icon: KeyRound },
              { id: 'commercial', label: 'Commercial', icon: Briefcase },
              { id: 'pg', label: 'PG / Co-Living', icon: BedDouble }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-200 flex items-center space-x-2 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white shadow-xs' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="ml-auto hidden md:flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>0% Brokerage Guarantee</span>
            </div>
          </div>

          {/* Search Controls Matrix */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 w-full min-w-0">
              
              {/* Locality Selector (4 cols) */}
              <div className="sm:col-span-4 min-w-0">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                  Locality / Area
                </label>
                <div className="relative min-w-0">
                  <MapPin className="w-4 h-4 text-[var(--secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="">All Sambhajinagar Localities</option>
                    {localitiesList.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Type (3 cols) */}
              <div className="sm:col-span-3 min-w-0">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                  Property Type
                </label>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="">All Property Types</option>
                  <option value="apartment">Apartment / Flat</option>
                  <option value="house">Independent Row House</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="plot">NA Plot / Land</option>
                  <option value="commercial">Commercial Office/Shop</option>
                </select>
              </div>

              {/* BHK / Configuration (3 cols) */}
              <div className="sm:col-span-3 min-w-0">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                  BHK / Unit
                </label>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="">Any BHK / Config</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK / Penthouse</option>
                </select>
              </div>

              {/* Search Submit Button (2 cols) */}
              <div className="sm:col-span-2 flex items-end min-w-0">
                <button
                  type="submit"
                  className="btn-theme-primary w-full h-[40px] text-xs font-black rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Keyword Input Line */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Or search by project name, builder, landmarks (e.g. Prozone Mall, Cannaught, Sutgirni)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-colors"
                />
              </div>

              {/* Quick AI Valuation Trigger */}
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

          {/* Quick Trending Searches */}
          <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-[var(--text-secondary)]">Popular Searches:</span>
            {['2 BHK CIDCO N-4', 'Garkheda Sutgirni', 'Samarth Nagar 3 BHK', 'Shendra Industrial Land', 'Beed Bypass Row House'].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(tag);
                  setActiveView('properties');
                }}
                className="text-[11px] bg-[var(--surface-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] text-[var(--text-primary)] px-2.5 py-1 rounded-lg border border-[var(--border)] transition-colors cursor-pointer font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Trust Highlights Strip */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 w-full min-w-0">
          <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] text-center shadow-2xs hover-lift">
            <div className="text-2xl font-black text-[var(--primary)]">0%</div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Brokerage Fee</div>
            <div className="text-[10px] text-[var(--text-secondary)]">100% Direct Owners</div>
          </div>

          <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] text-center shadow-2xs hover-lift">
            <div className="text-2xl font-black text-[var(--secondary)]">{allProperties.filter(p => p.approvalStatus !== 'pending').length}</div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Verified Listings</div>
            <div className="text-[10px] text-[var(--text-secondary)]">Sambhajinagar Wide</div>
          </div>

          <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] text-center shadow-2xs hover-lift">
            <div className="text-2xl font-black text-[var(--primary)]">100%</div>
            <div className="text-xs font-bold text-[var(--text-primary)]">MahaRERA & Legal</div>
            <div className="text-[10px] text-[var(--text-secondary)]">30-Yr Title Search</div>
          </div>

          <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] text-center shadow-2xs hover-lift">
            <div className="text-2xl font-black text-emerald-600">15 Min</div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Direct Response</div>
            <div className="text-[10px] text-[var(--text-secondary)]">Instant WhatsApp Desk</div>
          </div>
        </div>

      </div>
    </section>
  );
};
