import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Heart, 
  Share2, 
  ShieldCheck, 
  MessageCircle,
  Eye,
  Award,
  CheckCircle2,
  Percent
} from 'lucide-react';
import { formatPriceINR, normalizeListingType } from '../../utils/propertyUtils';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const { toggleFavorite, isFavorite, showToast } = useApp();
  const [activeImgIndex] = useState(0);
  const favorited = isFavorite(property.id);
  const listingType = normalizeListingType(property.listingType);

  const images = property.images && property.images.length > 0
    ? property.images 
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'];

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} in ${property.locality}, Chhatrapati Sambhajinagar on Auricity (0% Brokerage)`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'success');
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Hi, I'm interested in "${property.title}" (ID: ${property.id}) listed on Auricity.com for ${formatPriceINR(property.price)}. Please share more details.`);
    window.open(`https://wa.me/918010506030?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      onClick={() => onSelect?.(property)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="card-theme group overflow-hidden flex flex-col cursor-pointer transition-shadow duration-300 hover:shadow-card"
      id={`property-card-${property.id}`}
    >
      {/* Top Image Box */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={images[activeImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Left Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-[var(--secondary)] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
            <Percent className="w-3 h-3" />
            <span>0% Brokerage</span>
          </span>

          {property.verified && (
            <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-sky-200" />
              <span>Verified</span>
            </span>
          )}

          {property.featured && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Right Top Quick Actions */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              favorited 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            title="Save Property"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-all cursor-pointer"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Image Caption: Locality */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center space-x-1 font-bold drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[var(--secondary)]" />
            <span className="truncate">{property.locality}, Sambhajinagar</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-black/60 text-[10px] uppercase font-bold tracking-wider backdrop-blur-xs">
            {listingType === 'sale' ? 'For Sale' : listingType === 'rent' ? 'For Rent' : listingType === 'commercial' ? 'Commercial' : listingType === 'plots' ? 'Plot / Land' : 'PG / Co-Living'}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Price & Title */}
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <div className="text-xl font-black text-[var(--primary)] flex items-center space-x-1">
              <span>{formatPriceINR(property.price)}</span>
              {listingType === 'rent' && (
                <span className="text-xs text-[var(--text-secondary)] font-semibold">/month</span>
              )}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] font-medium">
              {property.area ? `₹${Math.round(property.price / property.area)}/sq.ft` : ''}
            </span>
          </div>

          <h3 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
            {property.title}
          </h3>

          <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5 font-medium">
            {property.address || `${property.locality}, Chhatrapati Sambhajinagar`}
          </p>
        </div>

        {/* Specifications Matrix */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-[var(--surface-secondary)] rounded-2xl border border-[var(--border)] text-center text-xs">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[var(--text-muted)] text-[10px] uppercase font-semibold">Config</span>
            <span className="font-bold text-[var(--text-primary)] flex items-center space-x-1 mt-0.5">
              <BedDouble className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>{property.bhk ? `${property.bhk} BHK` : property.propertyType}</span>
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-x border-[var(--border)]">
            <span className="text-[var(--text-muted)] text-[10px] uppercase font-semibold">Super Area</span>
            <span className="font-bold text-[var(--text-primary)] flex items-center space-x-1 mt-0.5">
              <Maximize2 className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>{property.area} sq.ft</span>
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-[var(--text-muted)] text-[10px] uppercase font-semibold">Furnishing</span>
            <span className="font-bold text-[var(--text-primary)] capitalize mt-0.5 truncate max-w-full">
              {property.furnishing || 'Unfurnished'}
            </span>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center space-x-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(property);
            }}
            className="flex-1 btn-theme-primary text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
