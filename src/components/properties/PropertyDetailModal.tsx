import React, { useState } from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  IndianRupee, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Heart, 
  Share2, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
  Calculator,
  User,
  Clock,
  Compass,
  FileCheck
} from 'lucide-react';
import { formatPriceINR, normalizeListingType } from '../../utils/propertyUtils';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
  const { toggleFavorite, isFavorite, showToast, addLead } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('I am interested in scheduling a site visit for this property.');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(property ? Math.round(property.price * 0.8) : 4000000);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  if (!property) return null;

  const listingType = normalizeListingType(property.listingType);
  const favorited = isFavorite(property.id);
  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'];

  // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const calculatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  ) || 0;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) {
      showToast('Please enter your Name and Phone Number', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      addLead({
        name: inquiryName,
        phone: inquiryPhone,
        email: `${inquiryName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        propertyId: property.id,
        propertyTitle: property.title,
        message: inquiryMsg,
        status: 'new',
        budget: formatPriceINR(property.price),
        preferredLocality: property.locality,
        propertyType: property.propertyType,
        source: 'Website Listing Detail'
      });
      setSubmitting(false);
      setSubmitted(true);
      showToast('Direct Owner & Relationship Desk notified! Expect a call within 15 minutes.', 'success');
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Namaste! I am interested in "${property.title}" (ID: ${property.id}) priced at ${formatPriceINR(property.price)} in ${property.locality}, Chhatrapati Sambhajinagar. Please share full brochure and schedule visit.`);
    window.open(`https://wa.me/918010506030?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Auricity 0% Brokerage Listing: ${property.title} in ${property.locality}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Sticky Header Bar */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-3">
            <span className="bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
              0% Brokerage
            </span>
            {property.verified && (
              <span className="bg-[#1E4FA8] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-sky-300" />
                <span>Auricity Verified</span>
              </span>
            )}
            {property.reraId && (
              <span className="bg-emerald-100 text-[#16A34A] text-[10px] font-bold px-2.5 py-1 rounded-full hidden sm:inline-flex items-center space-x-1">
                <FileCheck className="w-3 h-3" />
                <span>MahaRERA: {property.reraId}</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                favorited ? 'bg-rose-50 border-rose-200 text-rose-600' : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          
          {/* Hero Gallery & Quick Meta */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-16/10 rounded-3xl overflow-hidden bg-slate-100 border border-[#E2E8F0]">
                <img
                  src={images[activeImg]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-xs transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImg((activeImg + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-xs transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {activeImg + 1} / {images.length} Photos
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImg === idx ? 'border-[#1E4FA8] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Price & Direct Connect (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-[#1E4FA8]">
                    {formatPriceINR(property.price)}
                  </span>
                  {listingType === 'rent' && (
                    <span className="text-sm font-semibold text-[#64748B]">/ month</span>
                  )}
                  {property.area && (
                    <span className="text-xs text-[#64748B] font-medium">
                      (₹{Math.round(property.price / property.area)}/sq.ft)
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-black text-[#0F172A] leading-tight">
                  {property.title}
                </h1>

                <div className="flex items-center space-x-1.5 text-xs text-[#64748B] font-medium">
                  <MapPin className="w-4 h-4 text-[#F2621E] shrink-0" />
                  <span>{property.address || `${property.locality}, Chhatrapati Sambhajinagar, Maharashtra`}</span>
                </div>

                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100/80 text-xs text-[#1E4FA8] space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F2621E]" />
                    <span>0% Brokerage Guarantee</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Connect directly with the verified owner / authorized developer. No hidden commissions or brokerage fees.
                  </p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-[#E2E8F0] space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                  Direct Site Visit / Contact Owner
                </h3>

                {submitted ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1 text-xs text-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-[#16A34A] mx-auto" />
                    <p className="font-bold">Inquiry Sent Successfully!</p>
                    <p className="text-[11px] text-emerald-700">Auricity Concierge & Owner will call you on {inquiryPhone}.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Your 10-digit Phone Number"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#1E4FA8] hover:bg-[#153B82] text-white py-2.5 rounded-xl font-bold text-xs shadow-blue-brand transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Connecting...' : 'Request Instant Callback'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp (+91 8010506030)</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Key Property Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-[#E2E8F0] text-center">
              <span className="text-[11px] text-[#64748B] font-semibold uppercase">Configuration</span>
              <p className="text-base font-black text-[#0F172A] mt-1 flex items-center justify-center space-x-1">
                <BedDouble className="w-4 h-4 text-[#1E4FA8]" />
                <span>{property.bhk ? `${property.bhk} BHK` : property.propertyType}</span>
              </p>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-[#E2E8F0] text-center">
              <span className="text-[11px] text-[#64748B] font-semibold uppercase">Super Built-Up Area</span>
              <p className="text-base font-black text-[#0F172A] mt-1 flex items-center justify-center space-x-1">
                <Maximize2 className="w-4 h-4 text-[#1E4FA8]" />
                <span>{property.area} sq.ft</span>
              </p>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-[#E2E8F0] text-center">
              <span className="text-[11px] text-[#64748B] font-semibold uppercase">Furnishing</span>
              <p className="text-base font-black text-[#0F172A] mt-1 capitalize">
                {property.furnishing || 'Unfurnished'}
              </p>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-[#E2E8F0] text-center">
              <span className="text-[11px] text-[#64748B] font-semibold uppercase">Facing / Vastu</span>
              <p className="text-base font-black text-[#0F172A] mt-1 flex items-center justify-center space-x-1">
                <Compass className="w-4 h-4 text-[#1E4FA8]" />
                <span>{property.facing || 'East Facing'}</span>
              </p>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#F2621E]" />
              <span>Property Overview & Details</span>
            </h3>
            <div className="text-xs text-[#64748B] leading-relaxed bg-[#F7F8FA] p-4 rounded-2xl border border-[#E2E8F0] space-y-2">
              <p>{property.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#E2E8F0] text-xs">
                <div><strong>Locality:</strong> {property.locality}, Chhatrapati Sambhajinagar</div>
                <div><strong>Floor:</strong> {property.floor ? `${property.floor} of ${property.totalFloors || 5}` : 'Ground / Multi-level'}</div>
                <div><strong>Property Age:</strong> {property.age || 'Brand New Construction'}</div>
                <div><strong>Water Supply:</strong> {property.waterSupply || '24/7 Municipal + Borewell'}</div>
              </div>
            </div>
          </div>

          {/* Amenities Badges Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">
              Society & Flat Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div 
                  key={idx}
                  className="flex items-center space-x-2 p-2.5 bg-white rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#0F172A]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive EMI Calculator Section */}
          <div className="p-6 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 rounded-3xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-[#1E4FA8] flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-[#F2621E]" />
                  <span>Home Loan EMI Estimator</span>
                </h3>
                <p className="text-[11px] text-[#64748B]">Calculate monthly installments with 0% Processing Fee partners</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#64748B]">Estimated EMI</span>
                <p className="text-xl font-black text-[#F2621E]">₹{calculatedEmi.toLocaleString('en-IN')}<span className="text-xs text-[#64748B] font-normal">/mo</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Loan Amount: {formatPriceINR(loanAmount)}
                </label>
                <input
                  type="range"
                  min={500000}
                  max={property.price}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Tenure: {tenureYears} Years
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min={6.5}
                  max={12}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#1E4FA8]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E2E8F0] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-xs text-[#64748B]">
            <span>Listed by: <strong>{property.contactName || 'Direct Owner'}</strong></span>
            <span>•</span>
            <span>ID: <code className="font-mono text-[10px] bg-slate-200 px-1 py-0.5 rounded-sm">{property.id}</code></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#0F172A] rounded-xl cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
