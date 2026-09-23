import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { PropertyDetailModal } from './PropertyDetailModal';
import { Property } from '../../types';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Building2, 
  KeyRound, 
  BedDouble, 
  LandPlot, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  ArrowUpDown,
  ShieldCheck,
  Sparkles,
  Filter
} from 'lucide-react';
import { formatPriceINR, matchesListingType, normalizeListingType, normalizePropertyType } from '../../utils/propertyUtils';

interface PropertyListingsViewProps {
  typeFilter?: 'sale' | 'rent' | 'pg';
  categoryFilter?: 'commercial' | 'plots';
  titleOverride?: string;
}

export const PropertyListingsView: React.FC<PropertyListingsViewProps> = ({ 
  typeFilter,
  categoryFilter,
  titleOverride 
}) => {
  const { allProperties, searchParams, setSearchParams, localitiesList, navigateToPropertyDetail } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Local filter states
  const [selectedLocality, setSelectedLocality] = useState(searchParams.locality || '');
  const [selectedBhk, setSelectedBhk] = useState(searchParams.bhk || '');
  const [selectedPropType, setSelectedPropType] = useState(searchParams.propertyType || '');
  const [maxBudget, setMaxBudget] = useState<number>(15000000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'newest'>('recommended');
  const [searchTerm, setSearchTerm] = useState(searchParams.query || '');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      // Self-submitted "Post Property (Free)" listings wait for admin
      // approval before appearing in public search/browse results.
      if (property.approvalStatus === 'pending') return false;

      // Type filter check
      const currentType = typeFilter || searchParams.listingType;
      if (currentType && !categoryFilter && !matchesListingType(property.listingType, currentType)) return false;
      if (categoryFilter && normalizeListingType(property.listingType) !== categoryFilter) return false;

      // Locality check
      if (selectedLocality && property.locality.toLowerCase() !== selectedLocality.toLowerCase()) {
        return false;
      }

      // BHK check
      if (selectedBhk && property.bhk !== Number(selectedBhk)) {
        return false;
      }

      // Property Type check
      if (selectedPropType && normalizePropertyType(property.propertyType) !== normalizePropertyType(selectedPropType)) return false;

      // Budget check
      if (property.price > maxBudget) {
        return false;
      }

      // Verified check
      if (verifiedOnly && !property.verified) {
        return false;
      }

      // Search keyword
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLoc = property.locality.toLowerCase().includes(query);
        const matchesDesc = property.description.toLowerCase().includes(query);
        const matchesAddress = property.address.toLowerCase().includes(query);
        const matchesTags = (property.tags || []).some(tag => String(tag).toLowerCase().includes(query));
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesAddress && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
      return 0; // recommended
    });
  }, [allProperties, typeFilter, categoryFilter, searchParams.listingType, selectedLocality, selectedBhk, selectedPropType, maxBudget, verifiedOnly, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setSelectedLocality('');
    setSelectedBhk('');
    setSelectedPropType('');
    setMaxBudget(15000000);
    setVerifiedOnly(false);
    setSearchTerm('');
    setSortBy('recommended');
    setSearchParams({});
  };

  const getPageTitle = () => {
    if (titleOverride) return titleOverride;
    if (typeFilter === 'rent') return 'Direct Owner Rental Homes in Sambhajinagar';
    if (typeFilter === 'pg') return 'PG, Hostels & Co-Living in Sambhajinagar';
    return 'Properties for Sale in Chhatrapati Sambhajinagar';
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                0% Brokerage
              </span>
              <span className="text-xs text-[#64748B] font-semibold">
                {filteredProperties.length} Properties Available
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-[#64748B]">
              Verified direct listings with genuine photographs and direct contact channels.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#64748B] font-bold hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F8FA] border border-[#E2E8F0] text-[#0F172A] font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-[#1E4FA8] text-xs"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newly Listed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Toolbar Container */}
        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Keywords
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search title, locality, society, landmark..."
                  value={searchTerm}
                  list="auricity-locality-suggestions"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>
            </div>

            {/* Locality Filter */}
            <div>
              <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Locality
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
              >
                <option value="">All Localities</option>
                {localitiesList.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <datalist id="auricity-locality-suggestions">
              {localitiesList.map(loc => <option key={loc} value={loc} />)}
            </datalist>

            {/* BHK Filter */}
            <div>
              <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Configuration
              </label>
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
              >
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Property Type
              </label>
              <select
                value={selectedPropType}
                onChange={(e) => setSelectedPropType(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
              >
                <option value="">All Types</option>
                <option value="Flat / Apartment">Flat / Apartment</option>
                <option value="Row House / Villa">Row House / Villa</option>
                <option value="Residential Plot">NA Plot / Land</option>
                <option value="Commercial Shop">Commercial Space</option>
              </select>
            </div>

            {/* Max Budget Slider */}
            <div>
              <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Max Budget: {formatPriceINR(maxBudget)}
              </label>
              <input
                type="range"
                min={500000}
                max={25000000}
                step={500000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#1E4FA8] mt-2"
              />
            </div>
          </div>

          {/* Bottom Filter Toggles & Reset */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded-md accent-[#1E4FA8]"
                />
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-[#1E4FA8]" />
                  <span>Auricity Verified Listings Only</span>
                </span>
              </label>
            </div>

            <button
              onClick={handleResetFilters}
              className="text-[#64748B] hover:text-[#0F172A] font-bold flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>

        {/* Properties Grid View */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1E4FA8] flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-[#0F172A]">
              No properties matched your current filters
            </h3>
            <p className="text-xs text-[#64748B] max-w-md mx-auto">
              Try widening your budget range, clearing specific locality filters, or searching for neighboring areas in Chhatrapati Sambhajinagar.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-[#1E4FA8] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-blue-brand cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={(p) => navigateToPropertyDetail(p.id)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
};
