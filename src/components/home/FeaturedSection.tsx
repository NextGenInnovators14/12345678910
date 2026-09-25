import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../properties/PropertyCard';
import { PropertyDetailModal } from '../properties/PropertyDetailModal';
import { Property } from '../../types';
import { normalizeListingType } from '../../utils/propertyUtils';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const { allProperties, setActiveView, cmsPages } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'sale' | 'rent' | 'pg'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sectionData = cmsPages?.home?.sections?.featuredProperties;
  const heading = sectionData?.heading || 'Featured Properties in Sambhajinagar';
  const subheading = sectionData?.subheading || 'Verified flats, row houses, luxury penthouses, and commercial spaces with 0% brokerage.';
  const badge = sectionData?.badge || 'Handpicked Direct Listings';

  // Filter properties: only approved, matching selected tab
  const validProperties = allProperties.filter(p => {
    if (p.approvalStatus === 'pending' || p.approvalStatus === 'rejected') return false;
    if (filterTab === 'sale') return normalizeListingType(p.listingType) === 'sale';
    if (filterTab === 'rent') return normalizeListingType(p.listingType) === 'rent';
    if (filterTab === 'pg') return normalizeListingType(p.listingType) === 'pg';
    return true;
  });

  // Prioritize featured properties first, sorted by featuredOrder
  const featuredOnly = validProperties.filter(p => p.featured).sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
  const nonFeatured = validProperties.filter(p => !p.featured);
  const displayProperties = [...featuredOnly, ...nonFeatured];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -290 : 290;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-12 bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="featured-properties-section">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center space-x-1 bg-[var(--primary-light)] text-[var(--primary)] px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20 shadow-2xs">
              <Flame className="w-3 h-3 text-[var(--secondary)] fill-[var(--secondary)]" />
              <span>{badge}</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {heading}
            </h2>
            <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium line-clamp-1 sm:line-clamp-none">
              {subheading}
            </p>
          </div>

          {/* Filter Pills & Scroll Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start md:self-auto">
            {/* Filter Pills */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 bg-[var(--surface)] p-0.5 rounded-lg sm:rounded-2xl border border-[var(--border)] shadow-2xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'sale', label: 'Buy' },
                { id: 'rent', label: 'Rent' },
                { id: 'pg', label: 'PG' }
              ].map(tab => {
                const isActive = filterTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTab(tab.id as any)}
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[var(--primary)] text-white shadow-xs' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Scroll buttons */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="Scroll Left"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="Scroll Right"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Properties Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2.5 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 px-0.5 pb-2 scrollbar-thin scrollbar-thumb-[var(--primary)]/40 scrollbar-track-[var(--surface)]"
        >
          {displayProperties.map((prop) => (
            <div
              key={prop.id}
              className="w-[190px] sm:w-[245px] md:w-[290px] shrink-0 snap-start flex flex-col"
            >
              <PropertyCard
                property={prop}
                onSelect={(p) => setSelectedProperty(p)}
              />
            </div>
          ))}
        </div>

        {/* View All CTA Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-[var(--border)]/60 text-xs text-[var(--text-secondary)] gap-3">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-[var(--secondary)]" />
            <span>Showing <strong className="text-[var(--text-primary)]">{displayProperties.length}</strong> handpicked featured properties in Sambhajinagar</span>
          </div>

          <button
            onClick={() => setActiveView('properties')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group"
          >
            <span>Explore All {allProperties.filter(p => p.approvalStatus !== 'pending' && p.approvalStatus !== 'rejected').length} Properties</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
};
