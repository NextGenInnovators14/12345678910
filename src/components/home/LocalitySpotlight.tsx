import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, ArrowRight } from 'lucide-react';

export const LocalitySpotlight: React.FC = () => {
  const { setSearchParams, setActiveView } = useApp();

  const localities = [
    {
      name: 'CIDCO N-1 to N-12',
      tagline: 'Heart of Town & Commercial Hub',
      avgPrice: '₹4,500 - ₹7,200 / sq.ft',
      activeListings: '140+ Properties',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Garkheda Parisar',
      tagline: 'Premium Residential & Sutgirni Belt',
      avgPrice: '₹5,000 - ₹8,500 / sq.ft',
      activeListings: '85+ Properties',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Samarth Nagar & Cannaught',
      tagline: 'Elite Core City & Commercial Center',
      avgPrice: '₹7,500 - ₹12,000 / sq.ft',
      activeListings: '40+ Properties',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Shendra DMIC & Jalna Road',
      tagline: 'Mega Industrial & High Appreciation',
      avgPrice: '₹2,800 - ₹4,800 / sq.ft',
      activeListings: '95+ Properties',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60'
    }
  ];

  const handleSelectLocality = (locName: string) => {
    setSearchParams(prev => ({ ...prev, locality: locName }));
    setActiveView('properties');
  };

  return (
    <section className="py-14 sm:py-18 bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-black text-[var(--secondary)] uppercase tracking-wider">
              Neighborhood Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Explore Chhatrapati Sambhajinagar Prime Hotspots
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              Real-time market insights, average square foot rates, and verified listings in top localities.
            </p>
          </div>
        </div>

        {/* Localities 4-Col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {localities.map((loc, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectLocality(loc.name)}
              className="card-theme group overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:border-[var(--primary)]/40 transition-all"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {loc.activeListings}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-black text-sm text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--secondary)] shrink-0" />
                  <span className="truncate">{loc.name}</span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {loc.tagline}
                </p>
                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-xs font-black text-[var(--primary)]">{loc.avgPrice}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--secondary)] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
