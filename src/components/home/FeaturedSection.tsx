import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../properties/PropertyCard';
import { PropertyDetailModal } from '../properties/PropertyDetailModal';
import { Property } from '../../types';
import { normalizeListingType } from '../../utils/propertyUtils';
import { 
  Building2, 
  KeyRound, 
  Sparkles, 
  ArrowRight, 
  Flame
} from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const { allProperties, setActiveView } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'sale' | 'rent' | 'pg'>('all');

  const filtered = allProperties.filter(p => {
    // Self-submitted listings via the free "Post Property" form wait for
    // admin approval before they're public — see PostPropertyView.tsx.
    if (p.approvalStatus === 'pending') return false;
    if (filterTab === 'sale') return normalizeListingType(p.listingType) === 'sale';
    if (filterTab === 'rent') return normalizeListingType(p.listingType) === 'rent';
    if (filterTab === 'pg') return normalizeListingType(p.listingType) === 'pg';
    return true;
  }).slice(0, 6);

  return (
    <section className="py-14 sm:py-18 bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
              <Flame className="w-3.5 h-3.5 text-[var(--secondary)] fill-[var(--secondary)]" />
              <span>Handpicked Direct Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Featured Properties in Sambhajinagar
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              Verified flats, row houses, and commercial spaces with 0% brokerage and genuine owner contacts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-[var(--surface)] p-1.5 rounded-2xl border border-[var(--border)] shadow-2xs self-start md:self-auto">
            {[
              { id: 'all', label: 'All Types' },
              { id: 'sale', label: 'For Sale' },
              { id: 'rent', label: 'For Rent' },
              { id: 'pg', label: 'PG / Hostel' }
            ].map(tab => {
              const isActive = filterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={(p) => setSelectedProperty(p)}
            />
          ))}
        </div>

        {/* View All CTA Strip */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActiveView('properties')}
            className="inline-flex items-center space-x-2 btn-theme-outline text-xs px-6 py-3 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer font-bold"
          >
            <span>Explore All {allProperties.filter(p => p.approvalStatus !== 'pending').length} Verified Sambhajinagar Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
