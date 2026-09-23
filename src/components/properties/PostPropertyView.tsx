import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  BedDouble, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck,
  User,
  PhoneCall,
  PlusCircle,
  Clock,
  Zap,
  Info,
  Layers,
  Compass,
  AlertTriangle,
  Check,
  Trash2,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  BadgeAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PropertyPhotoUploader } from './PropertyPhotoUploader';
import { 
  getFreeListingQuota, 
  recordFreeListing, 
  removeFreeListing, 
  getLastUsedOwnerPhone, 
  setLastUsedOwnerPhone,
  MAX_FREE_LISTINGS,
  FreeListingRecord 
} from '../../utils/freeListingStorage';

export const PostPropertyView: React.FC = () => {
  const { addProperty, deleteProperty, allProperties, localitiesList, showToast, setActiveView } = useApp();

  // Primary Classification
  const [listingType, setListingType] = useState<'sale' | 'rent' | 'pg' | 'commercial'>('sale');
  const [propertyType, setPropertyType] = useState('Flat / Apartment');

  // Room & Building Configuration
  const [bhk, setBhk] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [balconies, setBalconies] = useState<number>(1);
  const [floorNumber, setFloorNumber] = useState<number>(3);
  const [totalFloors, setTotalFloors] = useState<number>(7);
  const [furnishing, setFurnishing] = useState('Semi-Furnished');
  const [facing, setFacing] = useState('East');
  const [propertyAge, setPropertyAge] = useState('Ready to Move (0-2 Yrs)');
  const [possession, setPossession] = useState('Immediate');
  const [ownershipTitle, setOwnershipTitle] = useState('CIDCO Sanctioned / Freehold');
  const [parking, setParking] = useState('1 Covered Car + Bike');
  const [waterSupply, setWaterSupply] = useState('Corporation + Borewell (24/7)');

  // Area Specifications
  const [carpetArea, setCarpetArea] = useState<number>(850);
  const [builtupArea, setBuiltupArea] = useState<number>(1050);
  const [plotArea, setPlotArea] = useState<number>(1200);

  // Location & Address (Sambhajinagar)
  const [locality, setLocality] = useState(localitiesList[0] || 'CIDCO');
  const [societyName, setSocietyName] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');

  // Pricing & Commercials
  const [price, setPrice] = useState<number>(4500000);
  const [priceNegotiable, setPriceNegotiable] = useState(true);
  const [maintenanceMonthly, setMaintenanceMonthly] = useState<number>(1200);
  const [securityDeposit, setSecurityDeposit] = useState<number>(30000);
  const [allInclusive, setAllInclusive] = useState(false);

  // Photos & Media
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'
  ]);

  // Amenities
  const [amenities, setAmenities] = useState<string[]>([
    'Lift with Battery Backup',
    'Reserved Car Parking',
    '24/7 Water Supply',
    'CCTV Security',
    'Gated Society'
  ]);

  // Title & Description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Owner Contact & Free Tier Verification
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState(() => getLastUsedOwnerPhone());
  const [ownerWhatsapp, setOwnerWhatsapp] = useState('');
  const [whatsappSameAsPhone, setWhatsappSameAsPhone] = useState(true);
  const [preferredCallTime, setPreferredCallTime] = useState('Anytime (9 AM - 8 PM)');
  const [reraId, setReraId] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [showManageSlotsModal, setShowManageSlotsModal] = useState(false);

  // Calculate user free quota whenever ownerPhone changes
  const quota = getFreeListingQuota(ownerPhone);

  // Keep WhatsApp in sync if checked
  useEffect(() => {
    if (whatsappSameAsPhone) {
      setOwnerWhatsapp(ownerPhone);
    }
  }, [ownerPhone, whatsappSameAsPhone]);

  // Helper to format Indian Currency
  const formatIndianPrice = (amount: number): string => {
    if (!amount || isNaN(amount)) return '₹ 0';
    if (amount >= 10000000) {
      return `₹ ${(amount / 10000000).toFixed(2)} Crore`;
    }
    if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const amenityOptions = [
    'Lift with Battery Backup',
    'Reserved Car Parking',
    '24/7 Water Supply',
    'CCTV Security',
    'Gated Society',
    'Power Backup (Common)',
    'Children Play Area',
    'Gymnasium / Fitness',
    'Solar Water Heater',
    'Rainwater Harvesting',
    'Vastu Compliant',
    'Piped Gas (MNGL)',
    'Intercom System',
    'Security Guard'
  ];

  const handleToggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter(a => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  // AI Description Generator
  const handleGenerateAIDescription = async () => {
    if (!locality || !propertyType) {
      showToast('Please select property type and locality first', 'error');
      return;
    }

    setAiGenerating(true);
    try {
      const response = await fetch('/api/ai/enhance-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || `${bhk} BHK ${propertyType} in ${societyName ? societyName + ', ' : ''}${locality}`,
          locality,
          propertyType,
          bhk,
          area: carpetArea || builtupArea,
          price,
          amenities,
          societyName,
          furnishing,
          facing
        })
      });

      if (!response.ok) {
        throw new Error('AI Service request failed');
      }

      const data = await response.json();
      if (data.enhancedTitle) setTitle(data.enhancedTitle);
      if (data.enhancedDescription) setDescription(data.enhancedDescription);
      showToast('AI Listing Title & Description Generated!', 'success');
    } catch (err) {
      // High-quality Sambhajinagar realistic fallback template
      const isPlot = propertyType.includes('Plot') || propertyType.includes('Land');
      const generatedTitle = isPlot
        ? `Prime ${plotArea} Sq.Ft ${propertyType} with NA Sanction in ${locality}, Sambhajinagar`
        : `Spacious ${bhk} BHK ${propertyType} with ${facing} Facing in ${societyName || locality}`;

      const generatedDesc = isPlot
        ? `Exceptional opportunity to own a clear-title ${plotArea} sq.ft NA Residential Plot located in the rapidly growing hub of ${locality}, Chhatrapati Sambhajinagar. Features wide internal road access, electricity connection, and direct connectivity to main highway. 100% clear title with ${ownershipTitle}. Direct deal with owner, 0% brokerage.`
        : `Well-designed and sunlit ${bhk} BHK ${propertyType} available in ${societyName ? societyName + ', ' : ''}${locality}, Chhatrapati Sambhajinagar. Offering ${carpetArea} sq.ft of RERA carpet area (${builtupArea} sq.ft super built-up) on floor ${floorNumber} of ${totalFloors}. Features ${furnishing.toLowerCase()} setup, auspicious ${facing} facing, ${waterSupply}, and ${parking}. Situated close to schools, hospitals, and shopping centers with peaceful surroundings. Direct from owner with 0% brokerage.`;

      if (!title) setTitle(generatedTitle);
      setDescription(generatedDesc);
      showToast('Auto-generated listing description with local templates', 'info');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleDeleteExistingListing = (propId: string) => {
    removeFreeListing(propId);
    deleteProperty(propId);
    showToast('Listing removed! Free listing slot freed up.', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Quota Check
    if (ownerPhone.length >= 10 && !quota.canPost) {
      showToast('Limit reached: Maximum 2 Free properties allowed per owner mobile number.', 'error');
      return;
    }

    // 2. Required Fields Validation
    if (!ownerName.trim()) {
      showToast('Please enter your Name', 'error');
      return;
    }
    if (!ownerPhone.trim() || ownerPhone.replace(/[^0-9]/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!price || price <= 0) {
      showToast('Please enter expected price or rent', 'error');
      return;
    }
    if (images.length === 0) {
      showToast('Please upload at least 1 photo of your property', 'error');
      return;
    }
    if (!agreeTerms) {
      showToast('Please agree to Auricity listing verification guidelines', 'error');
      return;
    }

    const finalTitle = title.trim() || (
      propertyType.includes('Plot') 
        ? `${plotArea} Sq.Ft ${propertyType} in ${locality}` 
        : `${bhk} BHK ${propertyType} in ${societyName ? societyName + ', ' : ''}${locality}`
    );

    setSubmitting(true);

    setTimeout(() => {
      const newPropertyId = `prop-free-${Date.now()}`;
      const priceDisplayFormatted = formatIndianPrice(Number(price));

      const newProp = {
        id: newPropertyId,
        title: finalTitle,
        description: description || `${bhk} BHK ${propertyType} in ${locality}, Chhatrapati Sambhajinagar. 0% Brokerage direct from owner.`,
        price: Number(price),
        priceDisplay: priceDisplayFormatted,
        listingType: listingType as any,
        propertyType: propertyType as any,
        locality,
        address: address ? `${address}, ${locality}, Chhatrapati Sambhajinagar` : `${locality}, Chhatrapati Sambhajinagar`,
        city: 'Chhatrapati Sambhajinagar',
        carpetArea: Number(carpetArea || plotArea || 800),
        builtupArea: Number(builtupArea || carpetArea || 1000),
        areaSqFt: Number(carpetArea || plotArea || 800),
        bedrooms: propertyType.includes('Plot') ? undefined : bhk,
        bhk: propertyType.includes('Plot') ? undefined : bhk,
        bathrooms: propertyType.includes('Plot') ? undefined : bathrooms,
        balconies: propertyType.includes('Plot') ? undefined : balconies,
        floorNumber: propertyType.includes('Plot') ? undefined : floorNumber,
        totalFloors: propertyType.includes('Plot') ? undefined : totalFloors,
        facing,
        furnishing,
        parking,
        amenities,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80'],
        verified: false,
        zeroBrokerage: true,
        isZeroBrokerage: true,
        featured: false,
        status: 'Active' as const,
        approvalStatus: 'pending' as const,
        published: false,
        postedBy: 'Owner',
        ownerContact: {
          name: ownerName.trim(),
          phone: ownerPhone.trim(),
          whatsapp: ownerWhatsapp.trim() || ownerPhone.trim()
        },
        contactPerson: {
          name: ownerName.trim(),
          phone: ownerPhone.trim()
        },
        reraNumber: reraId.trim() || undefined,
        reraApproved: !!reraId.trim(),
        maintenanceMonthly: Number(maintenanceMonthly || 0),
        readyToMove: propertyAge.includes('Ready'),
        possessionDate: possession,
        createdAt: new Date().toISOString()
      };

      // Add to store
      addProperty(newProp as any);

      // Record in free listing quota tracking
      recordFreeListing({
        id: `fl-${Date.now()}`,
        phone: ownerPhone.trim(),
        propertyId: newPropertyId,
        title: finalTitle,
        locality,
        price: Number(price),
        status: 'pending'
      });
      setLastUsedOwnerPhone(ownerPhone.trim());

      setSubmitting(false);

      // Celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      const remainingSlots = Math.max(0, MAX_FREE_LISTINGS - (quota.used + 1));
      showToast(
        `Property submitted successfully! You have used ${quota.used + 1} of ${MAX_FREE_LISTINGS} free listings (${remainingSlots} remaining). Admin will review it shortly.`,
        'success'
      );

      // Navigate
      setActiveView('home');
    }, 700);
  };

  const isPlotType = propertyType.includes('Plot') || propertyType.includes('Land');

  return (
    <div className="bg-[#F7F8FA] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. Header Banner with 2-Property Free Quota Meter */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2 bg-orange-50 text-[#F2621E] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-orange-200">
              <Zap className="w-4 h-4 fill-[#F2621E]" />
              <span>100% Free Owner Listing • 0% Brokerage</span>
            </div>

            {/* Quota Indicator Pill */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border ${
              quota.used >= MAX_FREE_LISTINGS 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Free Quota: {quota.used} of {MAX_FREE_LISTINGS} Used</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Post Your Property for Free in Sambhajinagar
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Direct connection with genuine home buyers and verified tenants. Each owner can post up to <strong className="text-slate-900 font-bold">2 properties completely free</strong> with multi-photo upload, full specifications, and zero commission.
            </p>
          </div>

          {/* 2-Slot Visual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[0, 1].map((slotIndex) => {
              const isOccupied = slotIndex < quota.used;
              const prop = quota.userProperties[slotIndex];
              return (
                <div 
                  key={slotIndex}
                  className={`p-4 rounded-2xl border transition-all ${
                    isOccupied 
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950' 
                      : 'bg-slate-50 border-dashed border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isOccupied ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      Free Listing Slot #{slotIndex + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isOccupied ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isOccupied ? 'Occupied / Under Review' : 'Available for Listing'}
                    </span>
                  </div>

                  {isOccupied && prop ? (
                    <div className="mt-2 text-xs">
                      <p className="font-bold text-slate-900 truncate">{prop.title}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{prop.locality} • {formatIndianPrice(prop.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingListing(prop.propertyId)}
                          className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Remove to free slot
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-[11px] text-slate-500">
                      Empty slot available. Fill out the form below to publish your property.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* If Quota Reached Warning */}
          {quota.used >= MAX_FREE_LISTINGS && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <BadgeAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-black text-red-900">
                    Free Listing Quota Reached (2 of 2 Properties Used)
                  </p>
                  <p className="text-red-700 mt-0.5">
                    Your mobile number <span className="font-bold">{quota.normalizedPhone}</span> has reached the maximum of 2 free listings. To list more, remove an older listing or upgrade to the Realtor Club.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <a
                  href="https://wa.me/918010506030?text=Hi%20Auricity,%20I%20have%20reached%20my%202%20free%20listings%20and%20want%20to%20list%20more%20properties."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION 1: PURPOSE & CATEGORY */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-[#1E4FA8]" />
              <span>1. Property Purpose & Classification</span>
            </h3>

            {/* Purpose Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'sale', label: 'Sell Property' },
                { id: 'rent', label: 'Rent Out Flat/House' },
                { id: 'commercial', label: 'Commercial Sale/Lease' },
                { id: 'pg', label: 'PG / Co-Living Bed' }
              ].map(t => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setListingType(t.id as any)}
                  className={`py-3 px-3 rounded-2xl text-xs font-black transition-all border text-center cursor-pointer ${
                    listingType === t.id
                      ? 'bg-[#1E4FA8] text-white border-[#1E4FA8] shadow-xs'
                      : 'bg-[#F7F8FA] text-[#0F172A] border-[#E2E8F0] hover:border-[#1E4FA8]/40'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Property Category */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                Property Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Flat / Apartment',
                  'Row House / Villa',
                  'NA Residential Plot',
                  'Commercial Shop',
                  'Commercial Office',
                  'Industrial Plot / Shed',
                  'Agricultural Land',
                  'Penthouse / Duplex'
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`p-2.5 text-xs font-bold text-left rounded-xl border transition-all cursor-pointer ${
                      propertyType === type
                        ? 'bg-blue-50 border-[#1E4FA8] text-[#1E4FA8]'
                        : 'bg-[#F7F8FA] border-[#E2E8F0] text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: ROOMS, FLOORS & FACING (Context-aware for Plots vs Flats) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <BedDouble className="w-4 h-4 text-[#F2621E]" />
              <span>2. Detailed Configuration & Vastu</span>
            </h3>

            {!isPlotType ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* BHK */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    BHK Config *
                  </label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value={1}>1 RK / Studio</option>
                    <option value={1}>1 BHK</option>
                    <option value={2}>2 BHK</option>
                    <option value={3}>3 BHK</option>
                    <option value={4}>4 BHK</option>
                    <option value={5}>5+ BHK</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Bathrooms *
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value={1}>1 Bathroom</option>
                    <option value={2}>2 Bathrooms</option>
                    <option value={3}>3 Bathrooms</option>
                    <option value={4}>4 Bathrooms</option>
                    <option value={5}>5+ Bathrooms</option>
                  </select>
                </div>

                {/* Balconies */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Balconies
                  </label>
                  <select
                    value={balconies}
                    onChange={(e) => setBalconies(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value={0}>No Balcony</option>
                    <option value={1}>1 Balcony</option>
                    <option value={2}>2 Balconies</option>
                    <option value={3}>3+ Balconies</option>
                  </select>
                </div>

                {/* Furnishing */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Furnishing Status *
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>

                {/* Floor Number */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Property On Floor
                  </label>
                  <select
                    value={floorNumber}
                    onChange={(e) => setFloorNumber(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value={0}>Ground Floor</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(f => (
                      <option key={f} value={f}>Floor {f}</option>
                    ))}
                  </select>
                </div>

                {/* Total Floors */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Total Floors in Tower
                  </label>
                  <select
                    value={totalFloors}
                    onChange={(e) => setTotalFloors(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map(tf => (
                      <option key={tf} value={tf}>{tf} Floors</option>
                    ))}
                  </select>
                </div>

                {/* Facing */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Facing Direction (Vastu)
                  </label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value="East">East (Purva)</option>
                    <option value="North">North (Uttara)</option>
                    <option value="North-East">North-East (Ishan - Best Vastu)</option>
                    <option value="West">West (Pashchim)</option>
                    <option value="South">South (Dakshin)</option>
                    <option value="North-West">North-West (Vayavya)</option>
                    <option value="South-East">South-East (Agneya)</option>
                  </select>
                </div>

                {/* Parking */}
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Parking Facility
                  </label>
                  <select
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value="1 Covered Car + Bike">1 Covered Car + Bike</option>
                    <option value="2 Covered Car Parking">2 Covered Car Parking</option>
                    <option value="Open Car Parking">Open Car Parking</option>
                    <option value="Dedicated Bike Parking Only">Dedicated Bike Parking Only</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
            ) : (
              // Plot / Land specific inputs
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Plot Area (Sq.Ft) *
                  </label>
                  <input
                    type="number"
                    value={plotArea}
                    onChange={(e) => setPlotArea(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Sanction / Approval
                  </label>
                  <select
                    value={ownershipTitle}
                    onChange={(e) => setOwnershipTitle(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option value="CIDCO Sanctioned NA">CIDCO Sanctioned NA</option>
                    <option value="Collector NA Order 44">Collector NA Order 44</option>
                    <option value="Grampanchayat Sanctioned">Grampanchayat Sanctioned</option>
                    <option value="Gunthewari Regularized">Gunthewari Regularized</option>
                    <option value="Agricultural 7/12 Clear Title">Agricultural 7/12 Clear Title</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Facing Road Width
                  </label>
                  <select
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    <option>30 Feet DP Road</option>
                    <option>40 Feet Road</option>
                    <option>60 Feet Main Road</option>
                    <option>20 Feet Society Internal Road</option>
                  </select>
                </div>
              </div>
            )}

            {/* Additional Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Property Age / Status
                </label>
                <select
                  value={propertyAge}
                  onChange={(e) => setPropertyAge(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                >
                  <option value="Ready to Move (0-2 Yrs)">Ready to Move (New / 0-2 Yrs)</option>
                  <option value="Ready to Move (2-5 Yrs)">Ready to Move (2-5 Yrs)</option>
                  <option value="5-10 Years Old">5-10 Years Old</option>
                  <option value="10+ Years Old">10+ Years Old</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Possession / Available From
                </label>
                <select
                  value={possession}
                  onChange={(e) => setPossession(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                >
                  <option value="Immediate">Immediate</option>
                  <option value="Within 15 Days">Within 15 Days</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="Within 2 Months">Within 2 Months</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Water Supply
                </label>
                <select
                  value={waterSupply}
                  onChange={(e) => setWaterSupply(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                >
                  <option value="Corporation + Borewell (24/7)">Corporation + Borewell (24/7)</option>
                  <option value="Corporation Water (24/7)">Sambhajinagar Municipal Corp (24/7)</option>
                  <option value="Borewell Water Only">Borewell Water Only</option>
                  <option value="Dedicated Water Tanker Storage">Dedicated Water Tanker Storage</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: AREA MEASUREMENT (RERA CARPET & BUILT-UP) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <Maximize2 className="w-4 h-4 text-[#1E4FA8]" />
              <span>3. Area Dimensions (Sq.Ft)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  RERA Carpet Area (Sq.Ft) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 850"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  required
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Usable internal floor area as mandated under MahaRERA
                </span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Super Built-up Area (Sq.Ft)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1050"
                  value={builtupArea}
                  onChange={(e) => setBuiltupArea(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Includes walls, balconies and common proportionate area
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 4: LOCATION & ADDRESS IN SAMBHAJINAGAR */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#F2621E]" />
              <span>4. Exact Location & Landmark</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Locality / Sector *
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                >
                  {localitiesList.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Society / Apartment / Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Runwal Meadows, Sara City, Kasliwal Enclave"
                  value={societyName}
                  onChange={(e) => setSocietyName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Exact Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sector N-3, Plot No. 45, Behind Cannaught Garden"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Nearby Landmark / Connectivity
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Prozone Mall, 500m from Jalna Road"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: PRICING & FINANCIALS */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span>5. Pricing & Financial Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  {listingType === 'rent' ? 'Monthly Rent (₹) *' : 'Expected Total Price (₹) *'}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 4500000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-black text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  required
                />
                <div className="mt-1 flex items-center justify-between text-xs font-black text-emerald-700">
                  <span>In words: {formatIndianPrice(price)}</span>
                  {carpetArea > 0 && price > 0 && (
                    <span className="text-slate-500 font-bold text-[11px]">
                      ~ ₹{Math.round(price / carpetArea).toLocaleString('en-IN')}/sq.ft
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Maintenance (₹/month)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1200"
                  value={maintenanceMonthly}
                  onChange={(e) => setMaintenanceMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={priceNegotiable}
                  onChange={(e) => setPriceNegotiable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1E4FA8] focus:ring-0 cursor-pointer"
                />
                <span>Price is Negotiable</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={allInclusive}
                  onChange={(e) => setAllInclusive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1E4FA8] focus:ring-0 cursor-pointer"
                />
                <span>All-Inclusive Price (No hidden charges)</span>
              </label>
            </div>
          </div>

          {/* SECTION 6: PHOTO UPLOAD GALLERY */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
                <UploadCloud className="w-4 h-4 text-[#1E4FA8]" />
                <span>6. Property Photos (Upload from Device) *</span>
              </h3>

              <span className="text-xs font-bold text-slate-500">
                {images.length}/8 Photos
              </span>
            </div>

            {/* Custom Multi-Photo Uploader Component with Drag & Drop & Compression */}
            <PropertyPhotoUploader
              images={images}
              onChange={setImages}
              maxPhotos={8}
            />
          </div>

          {/* SECTION 7: AMENITIES */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>7. Society Amenities & Features</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {amenityOptions.map((am) => {
                const isChecked = amenities.includes(am);
                return (
                  <button
                    type="button"
                    key={am}
                    onClick={() => handleToggleAmenity(am)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border flex items-center space-x-2 transition-all cursor-pointer ${
                      isChecked 
                        ? 'bg-blue-50/90 border-[#1E4FA8] text-[#1E4FA8] shadow-2xs' 
                        : 'bg-[#F7F8FA] border-[#E2E8F0] text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-[#1E4FA8]' : 'text-slate-300'}`} />
                    <span className="truncate">{am}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 8: AI TITLE & DESCRIPTION */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>8. Listing Title & Description</span>
              </h3>

              <button
                type="button"
                onClick={handleGenerateAIDescription}
                disabled={aiGenerating}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiGenerating ? 'Generating with Gemini AI...' : 'Auto-Generate with AI'}</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spacious 2 BHK Flat with Garden View in CIDCO N-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Detailed Property Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your property, proximity to schools, road connectivity, water availability, society culture..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8] resize-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 9: DIRECT OWNER CONTACT & RERA */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center space-x-2">
              <User className="w-4 h-4 text-[#16A34A]" />
              <span>9. Direct Owner Verification & Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Owner Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rameshwar Deshmukh"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9822012345"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  required
                />
                {ownerPhone.length >= 10 && (
                  <span className={`text-[10px] font-bold block mt-1 ${quota.canPost ? 'text-emerald-700' : 'text-red-600'}`}>
                    {quota.canPost 
                      ? `✓ Quota OK: ${quota.used} of ${MAX_FREE_LISTINGS} used` 
                      : `✗ Limit reached: ${quota.used} of ${MAX_FREE_LISTINGS} listings used`}
                  </span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9822012345"
                  value={ownerWhatsapp}
                  onChange={(e) => {
                    setOwnerWhatsapp(e.target.value);
                    setWhatsappSameAsPhone(false);
                  }}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
                <label className="inline-flex items-center gap-1.5 mt-1 text-[10px] text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappSameAsPhone}
                    onChange={(e) => {
                      setWhatsappSameAsPhone(e.target.checked);
                      if (e.target.checked) setOwnerWhatsapp(ownerPhone);
                    }}
                    className="w-3.5 h-3.5 text-[#1E4FA8]"
                  />
                  <span>Same as Mobile Number</span>
                </label>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Preferred Call Time
                </label>
                <select
                  value={preferredCallTime}
                  onChange={(e) => setPreferredCallTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                >
                  <option value="Anytime (9 AM - 8 PM)">Anytime (9 AM - 8 PM)</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  MahaRERA Registration No. (If Applicable)
                </label>
                <input
                  type="text"
                  placeholder="e.g. P51500012345 (Optional for Individual Resale/Rent)"
                  value={reraId}
                  onChange={(e) => setReraId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1E4FA8] mt-0.5"
                  required
                />
                <span>
                  I confirm that I am the genuine owner or authorized representative of this property. I understand that free listing is capped at <strong>2 properties per mobile number</strong>, and all submissions undergo verification before publication on Auricity.
                </span>
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || (ownerPhone.length >= 10 && !quota.canPost)}
              className={`w-full py-4 rounded-2xl font-black text-sm shadow-orange-brand transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                ownerPhone.length >= 10 && !quota.canPost
                  ? 'bg-slate-400 text-slate-100 cursor-not-allowed'
                  : 'bg-[#F2621E] hover:bg-[#E0520F] text-white'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>
                {submitting 
                  ? 'Submitting Listing for Verification...' 
                  : ownerPhone.length >= 10 && !quota.canPost
                    ? 'Limit Reached (2 of 2 Free Properties Used)'
                    : 'Publish Free Property Listing (0% Brokerage)'}
              </span>
            </button>

            {ownerPhone.length >= 10 && !quota.canPost && (
              <p className="text-center text-xs text-red-600 mt-2 font-bold">
                You have reached your 2 free listings limit. Remove an existing property or contact admin on WhatsApp to expand.
              </p>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
