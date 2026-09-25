import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { normalizeListingType } from '../../utils/propertyUtils';
import { PropertyCard } from '../properties/PropertyCard';
import { PropertyDetailModal } from '../properties/PropertyDetailModal';
import { Property } from '../../types';
import { 
  KeyRound, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  MapPin, 
  BedDouble,
  Briefcase
} from 'lucide-react';

export const PropertiesRentSection: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('rentProperties', 'Properties on Rent', 'Find verified rental homes, commercial spaces and flexible living options.');
  const { allProperties, setActiveView, navigateToPropertyDetail } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'pg'>('all');

  // Filter rent properties
  const rentProperties = allProperties.filter(p => {
    if (p.approvalStatus === 'pending') return false;
    const isRent = ['rent','pg'].includes(normalizeListingType(p.listingType));
    if (!isRent) return false;

    if (activeTab === 'residential') {
      return p.propertyType === 'Apartment' || p.propertyType === 'apartment' || p.propertyType === 'Independent House / Villa';
    }
    if (activeTab === 'commercial') {
      return p.propertyType === 'Commercial Office' || p.propertyType === 'Commercial Shop' || p.propertyType === 'commercial';
    }
    if (activeTab === 'pg') {
      return p.propertyType === 'Co-living / PG';
    }
    return true;
  });

  const mainRentList = rentProperties.slice(0, 6);
  // Fallback to featured or standard rent items
  const featuredRentList = (rentProperties.filter(p => p.featured).length > 0 
    ? rentProperties.filter(p => p.featured) 
    : rentProperties).slice(0, 2);

  return (
    <section className="py-3.5 sm:py-8 bg-[var(--surface)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="properties-on-rent-section">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-[9px] sm:text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
              <KeyRound className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--secondary)]" />
              <span>Zero Brokerage Direct Rentals</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {homeHeading}
            </h2>
            <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium line-clamp-1 sm:line-clamp-none">
              {homeSubheading}
            </p>
          </div>

          {/* Controls: Tab Toggle & View All */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 self-start sm:self-auto overflow-x-auto no-scrollbar w-full sm:w-auto">
            <div className="flex items-center space-x-0.5 bg-[var(--surface-secondary)] p-0.5 rounded-lg border border-[var(--border)] shadow-2xs shrink-0">
              {[
                { id: 'all', label: 'All' },
                { id: 'residential', label: 'Flats & Villas' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'pg', label: 'PG' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[var(--primary)] text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveView('rentals')}
              className="inline-flex items-center space-x-1 text-[11px] sm:text-xs font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group shrink-0"
            >
              <span>View All Rentals</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Combined Layout: Main Grid (left 8 cols) + Featured Sidebar (right 4 cols on desktop, below on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          
          {/* Main Grid (8 cols desktop, 2-col on mobile/tablet) */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex gap-2.5 sm:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--primary)]/40 scrollbar-track-[var(--surface-secondary)] snap-x snap-mandatory pb-2">
              {mainRentList.map((property) => (
                <div key={property.id} className="w-[190px] sm:w-[245px] md:w-[280px] shrink-0 snap-start flex flex-col">
                  <PropertyCard
                    property={property}
                    onSelect={(p) => navigateToPropertyDetail(p.id)}
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveView('rentals')}
                className="w-full py-3 rounded-2xl bg-[var(--surface-secondary)] hover:bg-slate-100 text-[var(--primary)] border border-[var(--border)] text-xs font-black shadow-2xs hover:shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Browse All {rentProperties.length} Direct Owner Rental Homes in Sambhajinagar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Featured Rental Properties Sidebar (Right 4 cols desktop, stacked below on mobile) */}
          <div className="lg:col-span-4 w-full bg-[var(--surface-secondary)] p-4 sm:p-5 rounded-3xl border border-[var(--border)] shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--secondary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--secondary)]"></span>
                </span>
                <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-wider flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]" />
                  <span>Featured Rentals</span>
                </h3>
              </div>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Direct Owner
              </span>
            </div>

            {/* 2 Large Stacked Featured Property Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {featuredRentList.map((featured) => (
                <div
                  key={featured.id}
                  onClick={() => navigateToPropertyDetail(featured.id)}
                  className="card-theme group rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-[var(--secondary)] hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={featured.images[0]}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Zero Deposit Ready</span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <div className="text-sm font-black text-amber-300">
                        {featured.priceDisplay}
                      </div>
                      <div className="text-[11px] font-medium text-slate-200 truncate">
                        {featured.furnishing || 'Furnished'} • {featured.locality}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div>
                      <h4 className="font-black text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                        {featured.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[var(--secondary)] shrink-0" />
                        <span className="truncate">{featured.locality}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        100% Owner Listed
                      </span>
                      <span className="text-[11px] font-black text-[var(--secondary)] flex items-center space-x-1">
                        <span>Rent Direct</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Property Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  );
};
