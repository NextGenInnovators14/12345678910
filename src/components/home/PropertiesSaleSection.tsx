import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { PropertyDetailModal } from '../properties/PropertyDetailModal';
import { Property } from '../../types';
import { 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  MapPin,
  CheckCircle2,
  Maximize2,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

type PropertyTabType = 'Residential' | 'Commercial' | 'Industrial' | 'Plots' | 'Land';

export const PropertiesSaleSection: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('saleProperties', 'Properties on Sale', 'Verified direct-owner properties across residential, commercial, industrial, plots and land.');
  const { allProperties, setActiveView, cmsPages, navigateToPropertyDetail } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<PropertyTabType>('Residential');

  // Custom CMS section config fallback
  const homeData = (cmsPages?.home as any)?.data || {};
  const sectionTitle = homeData.propertiesSaleTitle || 'Properties on Sale';
  const sectionSubtitle = homeData.propertiesSaleSubtitle || '100% verified title deeds, 0% brokerage direct owner listings, and collector sanctioned plots in Sambhajinagar.';

  const tabs: { id: PropertyTabType; label: string; count?: number }[] = [
    { id: 'Residential', label: 'Residential' },
    { id: 'Commercial', label: 'Commercial' },
    { id: 'Industrial', label: 'Industrial' },
    { id: 'Plots', label: 'Plots' },
    { id: 'Land', label: 'Land' },
  ];

  // Filter properties for the active tab (8 cards for 4x2 grid)
  const tabProperties = allProperties.filter(p => {
    // Only show published / approved properties if flagged. Pending =
    // a free self-submitted listing awaiting admin review (see
    // PostPropertyView.tsx) — must not appear publicly yet.
    if (p.approvalStatus === 'rejected' || p.approvalStatus === 'pending') return false;
    if (p.showOnHomepage === false) return false;

    // Check category match
    if (p.category) {
      if (p.category.toLowerCase() === activeTab.toLowerCase()) return true;
    }

    // Fallback to propertyType heuristics
    if (activeTab === 'Residential') {
      return (
        p.propertyType === 'Apartment' || 
        p.propertyType === 'apartment' || 
        p.propertyType === 'Independent House / Villa' || 
        p.propertyType === 'row_house' || 
        p.propertyType === 'Penthouse' ||
        p.propertyType === 'penthouse'
      );
    }
    if (activeTab === 'Commercial') {
      return (
        p.propertyType === 'Commercial Office' || 
        p.propertyType === 'Commercial Shop' || 
        p.propertyType === 'commercial'
      );
    }
    if (activeTab === 'Industrial') {
      return p.propertyType === 'Industrial / MIDC Plot';
    }
    if (activeTab === 'Plots') {
      return p.propertyType === 'Residential Plot' || p.propertyType === 'plot';
    }
    if (activeTab === 'Land') {
      return p.propertyType === 'Agricultural Land';
    }
    return false;
  });

  // Main 8 cards (4 cols x 2 rows on desktop)
  const mainCards = tabProperties.slice(0, 8);

  // Featured Properties for Sidebar (Sorted by featuredOrder or latest)
  const featuredProperties = allProperties
    .filter(p => p.featured && p.approvalStatus !== 'rejected' && p.approvalStatus !== 'pending')
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 2);

  // Fallback if fewer than 2 are featured
  const finalFeaturedList = featuredProperties.length >= 2
    ? featuredProperties
    : allProperties.filter(p => p.approvalStatus !== 'rejected' && p.approvalStatus !== 'pending').slice(0, 2);

  const getBhkOrTypeDisplay = (p: Property) => {
    if (p.bhk) return `${p.bhk} BHK`;
    if (p.propertyType === 'Apartment' || p.propertyType === 'apartment') return 'Apartment';
    if (p.propertyType === 'Independent House / Villa') return 'Villa / House';
    if (p.propertyType === 'Penthouse') return 'Penthouse';
    if (p.propertyType === 'Commercial Shop') return 'Shop / Retail';
    if (p.propertyType === 'Commercial Office') return 'Office Space';
    if (p.propertyType === 'Industrial / MIDC Plot') return 'Industrial / MIDC';
    if (p.propertyType === 'Residential Plot') return 'NA 44 Plot';
    if (p.propertyType === 'Agricultural Land') return 'Agri Land';
    return p.propertyType || p.category || 'Property';
  };

  return (
    <section 
      id="properties-on-sale-section"
      className="py-3.5 sm:py-8 bg-slate-50/70 border-b border-slate-200/80 transition-colors w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        
        {/* SECTION HEADER: Title & View All */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#1E4FA8] text-[9px] sm:text-xs font-black uppercase tracking-wider border border-blue-200/60">
              <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F2621E]" />
              <span>Direct Owner & Verified Resale</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {homeHeading || sectionTitle}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-600 font-medium max-w-2xl line-clamp-1 sm:line-clamp-none">
              {homeSubheading || sectionSubtitle}
            </p>
          </div>

          {/* Right Action: View All Link */}
          <button
            id="view-all-sale-properties-btn"
            onClick={() => setActiveView('properties')}
            className="inline-flex items-center space-x-1 text-[11px] sm:text-xs font-black text-[#1E4FA8] hover:text-[#F2621E] transition-colors cursor-pointer group shrink-0 py-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* TAB TOGGLE: Residential / Commercial / Industrial / Plots / Land */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 border-b border-slate-200 pb-2 sm:pb-3">
          <div 
            id="property-category-tabs"
            className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-0.5 sm:py-1 w-full sm:w-auto"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`sale-tab-${tab.id.toLowerCase()}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                    isActive
                      ? 'bg-[#1E4FA8] text-white shadow-sm ring-2 ring-[#1E4FA8]/20'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100/80'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab item count indicator on desktop */}
          <div className="hidden sm:flex items-center text-xs font-semibold text-slate-500">
            <span>Showing <strong className="text-slate-800">{mainCards.length}</strong> {activeTab} listings</span>
          </div>
        </div>

        {/* MAIN PROPERTIES DIRECTORY GRID (Full Width) */}
        <div className="w-full space-y-4">
            
            {mainCards.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-700">No {activeTab} properties listed yet</h3>
                <p className="text-xs text-slate-500">New verified listings are added daily. Check back shortly or view all listings.</p>
                <button
                  onClick={() => setActiveView('properties')}
                  className="px-4 py-2 bg-[#1E4FA8] text-white text-xs font-bold rounded-xl hover:bg-[#163c80] transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>Browse All Categories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div 
                id="properties-sale-grid"
                className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(180px,1fr)] sm:auto-cols-[minmax(250px,1fr)] gap-2.5 sm:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--primary)]/40 scrollbar-track-[var(--surface-secondary)] snap-x snap-mandatory pb-2"
              >
                {mainCards.map((property, index) => {
                  const coverImage = property.images && property.images.length > 0
                    ? property.images[0]
                    : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

                  return (
                    <motion.div
                      key={property.id || index}
                      id={`sale-card-${property.id || index}`}
                      onClick={() => navigateToPropertyDetail(property.id)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.28, delay: (index % 4) * 0.05, ease: "easeOut" }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#1E4FA8]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                    >
                      {/* Photo Section */}
                      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={coverImage}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        
                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                          <span className="px-2 py-0.5 rounded-md bg-[#1E4FA8]/90 backdrop-blur-xs text-white text-[10px] font-black tracking-wide uppercase shadow-2xs">
                            {getBhkOrTypeDisplay(property)}
                          </span>
                          
                          {property.zeroBrokerage && (
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-600/95 text-white text-[9px] font-black tracking-tight shadow-2xs">
                              0% Brokerage
                            </span>
                          )}
                        </div>

                        {/* Bottom Gradient overlay with area */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-2 pt-5 flex items-end justify-between">
                          <span className="text-[11px] font-bold text-white tracking-tight drop-shadow-xs">
                            {property.carpetArea ? `${property.carpetArea.toLocaleString('en-IN')} sq.ft` : 'Clear Title'}
                          </span>
                          {property.images && property.images.length > 1 && (
                            <span className="text-[9px] font-bold text-slate-200 bg-black/40 px-1.5 py-0.5 rounded">
                              📸 {property.images.length}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-3 sm:p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          {/* Price */}
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm sm:text-base font-black text-[#1E4FA8] tracking-tight">
                              {property.priceDisplay || `₹ ${(property.price / 100000).toFixed(1)} L`}
                            </span>
                          </div>

                          {/* Locality */}
                          <p className="text-[11px] text-slate-600 font-medium flex items-center space-x-1 truncate">
                            <MapPin className="w-3 h-3 text-[#F2621E] shrink-0" />
                            <span className="truncate">{property.locality}</span>
                          </p>

                          {/* Title */}
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1E4FA8] transition-colors line-clamp-1">
                            {property.title}
                          </h4>
                        </div>

                        {/* Card Footer: Details Label / Button */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-slate-500">
                            {property.verified ? '✓ Verified' : 'Direct Owner'}
                          </span>
                          <span className="text-[11px] font-black text-[#F2621E] group-hover:text-[#d85517] flex items-center space-x-0.5 transition-colors">
                            <span>Details</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Bottom "View More" Full Category Strip */}
            <div className="pt-2">
              <button
                id="view-all-category-strip-btn"
                onClick={() => setActiveView('properties')}
                className="w-full py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-slate-100 text-[#1E4FA8] border border-slate-200 text-xs font-black shadow-2xs hover:shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Browse All {allProperties.length}+ Properties on Sale in Sambhajinagar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      {/* Interactive Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  );
};
