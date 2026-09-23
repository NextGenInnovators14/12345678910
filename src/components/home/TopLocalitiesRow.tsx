import React from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';

export const TopLocalitiesRow: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('localities', 'Explore Top Localities', 'Real-time market insights, average price per sq.ft, and verified direct owner inventory.');
  const { setSearchParams, setActiveView, allProperties, cmsPages } = useApp();

  const defaultLocalities = [
    {
      name: 'CIDCO',
      fullName: 'CIDCO N-1 to N-12',
      tagline: 'Heart of Town & Commercial Hub',
      avgPrice: '₹4,500 - ₹7,200 / sq.ft',
      activeListings: '',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=60',
      growth: '+12.4% YoY'
    },
    {
      name: 'Garkheda',
      fullName: 'Garkheda Parisar',
      tagline: 'Premium Residential & Sutgirni Belt',
      avgPrice: '₹5,000 - ₹8,500 / sq.ft',
      activeListings: '',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      growth: '+9.8% YoY'
    },
    {
      name: 'Jalna Road',
      fullName: 'Jalna Road & Shendra DMIC',
      tagline: 'Mega Industrial & High Appreciation',
      avgPrice: '₹3,200 - ₹5,800 / sq.ft',
      activeListings: '',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60',
      growth: '+18.6% YoY'
    },
    {
      name: 'Beed Bypass',
      fullName: 'Beed Bypass Road',
      tagline: 'High-Rise Luxury & MIT Junction',
      avgPrice: '₹4,200 - ₹6,800 / sq.ft',
      activeListings: '',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
      growth: '+14.2% YoY'
    },
    {
      name: 'Samarth Nagar',
      fullName: 'Samarth Nagar & Cannaught',
      tagline: 'Elite Core City & Commercial Center',
      avgPrice: '₹7,500 - ₹12,000 / sq.ft',
      activeListings: '',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
      growth: '+8.5% YoY'
    }
  ];

  const cmsItems = cmsPages?.home?.sections?.localities?.items;
  const localities = Array.isArray(cmsItems) && cmsItems.length > 0 ? cmsItems : defaultLocalities;

  const handleSelectLocality = (locName: string) => {
    setSearchParams(prev => ({ ...prev, locality: locName }));
    setActiveView('properties');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E5DEC9] transition-colors w-full overflow-hidden" id="explore-top-localities-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#1E4FA8] text-xs font-black uppercase tracking-wider border border-amber-300/80">
              <TrendingUp className="w-3.5 h-3.5 text-[#F2621E]" />
              <span>{homeHeading}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E4FA8] tracking-tight">
              {homeHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {homeSubheading}
            </p>
          </div>

          <button
            onClick={() => setActiveView('properties')}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-[#1E4FA8] hover:text-[#F2621E] transition-colors cursor-pointer group shrink-0"
          >
            <span>View All Localities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Visible on Desktop, Horizontal Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {localities.map((loc, idx) => {
            const activeCount = allProperties.filter(p => p.approvalStatus !== 'pending' && (p.locality || '').toLowerCase().includes(loc.name.toLowerCase())).length;
            return (
            <div
              key={idx}
              onClick={() => handleSelectLocality(loc.name)}
              className="min-w-[240px] sm:min-w-0 bg-white border border-[#E2DAC6] group overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:border-[#1E4FA8]/50 hover:shadow-lg transition-all duration-300 rounded-2xl shadow-xs"
            >
              {/* Image with Thumbnail, Overlay & Count Badge */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Active Listings Badge */}
                <div className="absolute bottom-2.5 left-2.5 text-white">
                  <span className="bg-[#1E4FA8] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                    {activeCount} active
                  </span>
                </div>

                {/* Growth Indicator */}
                <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs flex items-center space-x-1">
                  <span>{loc.growth}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-sm text-slate-900 group-hover:text-[#1E4FA8] transition-colors flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F2621E] shrink-0" />
                    <span className="truncate">{loc.name}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                    {loc.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-black text-[#1E4FA8]">{loc.avgPrice}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F2621E] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          );
          })}
        </div>

      </div>
    </section>
  );
};
