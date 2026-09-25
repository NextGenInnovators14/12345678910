import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { HOME_SERVICE_CATEGORIES, HomeServiceCategory } from '../../data/homeServicesData';
import { 
  Truck, 
  Paintbrush, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  Cpu, 
  Droplets, 
  Zap, 
  Wrench, 
  Star,
  CheckCircle2,
  PhoneCall,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Search,
  Percent,
  X,
  Sparkle,
  Check,
  Briefcase,
  Home,
  Compass,
  DraftingCompass,
  HardHat
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const HomeServicesView: React.FC = () => {
  const { localitiesList, showToast, addServiceBooking, navigateToServiceDetail } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'shifting' | 'cleaning' | 'repairs' | 'legal'>('all');
  const [serviceGroup, setServiceGroup] = useState<'property' | 'home'>('home');
  
  const [selectedCategory, setSelectedCategory] = useState<HomeServiceCategory | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Booking Form State
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedLocality, setSelectedLocality] = useState(localitiesList[0] || 'CIDCO');
  const [bookingDate, setBookingDate] = useState('');
  const [notes, setNotes] = useState('');
  const [propertyBudget, setPropertyBudget] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'packers-movers': return Truck;
      case 'painting': return Paintbrush;
      case 'cleaning': return Sparkles;
      case 'pest-control': return ShieldAlert;
      case 'legal-services': return Scale;
      case 'appliances-repair': return Cpu;
      case 'plumbing': return Droplets;
      case 'electrician': return Zap;
      case 'carpentry': return Wrench;
      case 'ro-water-purifier': return Droplets;
      case 'property-buy': return Home;
      case 'property-sale': return Briefcase;
      case 'property-rent': return Home;
      case 'property-vastu': return Compass;
      case 'property-architect': return DraftingCompass;
      case 'property-construction': return HardHat;
      default: return Wrench;
    }
  };

  const PROPERTY_SERVICE_CATEGORIES: HomeServiceCategory[] = [
    { id: 'property-buy', title: 'Buy Property', shortTitle: 'Buy', icon: 'Home', startingPrice: 'Free Consultation', badge: '0% Brokerage', offerBadge: 'FREE', description: 'Property search, shortlist and direct-owner assistance', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', services: [{ id: 'property-buy-form', categoryId: 'property-buy', categoryName: 'Buy Property', name: 'Property Buying Assistance', shortDescription: 'Share budget, locality and property requirements with our advisory desk.', startingPrice: 0, priceDisplay: 'Free Consultation', rating: 5, reviewCount: 0, duration: 'Flexible', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', popular: true, features: ['Verified options', 'Budget & locality matching', 'Direct owner coordination'] }] },
    { id: 'property-sale', title: 'Sell Property', shortTitle: 'Sale', icon: 'Building2', startingPrice: 'Free Listing', badge: 'Direct Buyer Leads', offerBadge: 'FREE', description: 'Sell flats, plots, shops and commercial property', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', services: [{ id: 'property-sale-form', categoryId: 'property-sale', categoryName: 'Sell Property', name: 'Property Sale Registration', shortDescription: 'Register your property and receive qualified buyer enquiries.', startingPrice: 0, priceDisplay: 'Free Listing', rating: 5, reviewCount: 0, duration: '15 mins', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', popular: true, features: ['Free listing', 'Buyer lead routing', 'Verification assistance'] }] },
    { id: 'property-rent', title: 'Rent / Lease', shortTitle: 'Rent', icon: 'KeyRound', startingPrice: 'Free Consultation', badge: 'Direct Tenants', offerBadge: 'FREE', description: 'Find or list residential and commercial rentals', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', services: [{ id: 'property-rent-form', categoryId: 'property-rent', categoryName: 'Rent / Lease', name: 'Rental Requirement / Listing', shortDescription: 'Tell us whether you need a tenant or a rental property.', startingPrice: 0, priceDisplay: 'Free Consultation', rating: 5, reviewCount: 0, duration: 'Flexible', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', popular: true, features: ['Tenant/property matching', 'Locality shortlist', 'Direct contact'] }] },
    { id: 'property-vastu', title: 'Vastu', shortTitle: 'Vastu', icon: 'Compass', startingPrice: 'On Request', badge: 'Expert Assistance', offerBadge: 'CONSULT', description: 'Vastu consultation for new and existing properties', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', services: [{ id: 'property-vastu-form', categoryId: 'property-vastu', categoryName: 'Vastu', name: 'Vastu Consultation Registration', shortDescription: 'Request a consultation for home, plot or office.', startingPrice: 0, priceDisplay: 'On Request', rating: 5, reviewCount: 0, duration: 'Flexible', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', popular: false, features: ['Requirement review', 'Property-specific guidance'] }] },
    { id: 'property-architect', title: 'Architect', shortTitle: 'Architect', icon: 'DraftingCompass', startingPrice: 'On Request', badge: 'Professional Network', offerBadge: 'CONSULT', description: 'Architectural planning and design assistance', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80', services: [{ id: 'property-architect-form', categoryId: 'property-architect', categoryName: 'Architect', name: 'Architect Consultation', shortDescription: 'Register your design, renovation or new-construction requirement.', startingPrice: 0, priceDisplay: 'On Request', rating: 5, reviewCount: 0, duration: 'Flexible', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80', popular: false, features: ['Requirement brief', 'Architect matching'] }] },
    { id: 'property-construction', title: 'Construction', shortTitle: 'Construction', icon: 'HardHat', startingPrice: 'On Request', badge: 'Verified Professionals', offerBadge: 'CONSULT', description: 'Construction, renovation and project assistance', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', services: [{ id: 'property-construction-form', categoryId: 'property-construction', categoryName: 'Construction', name: 'Construction Requirement Registration', shortDescription: 'Share plot, project and construction requirements.', startingPrice: 0, priceDisplay: 'On Request', rating: 5, reviewCount: 0, duration: 'Flexible', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', popular: false, features: ['Requirement capture', 'Professional matching'] }] }
  ];

  // Filter Categories
  const filteredCategories = useMemo(() => {
    const source = serviceGroup === 'property' ? PROPERTY_SERVICE_CATEGORIES : HOME_SERVICE_CATEGORIES;
    return source.filter((cat) => {
      // Filter tab logic
      if (selectedFilter === 'shifting' && cat.id !== 'packers-movers') return false;
      if (selectedFilter === 'cleaning' && !['cleaning', 'pest-control'].includes(cat.id)) return false;
      if (selectedFilter === 'repairs' && !['appliances-repair', 'plumbing', 'electrician', 'carpentry', 'ro-water-purifier'].includes(cat.id)) return false;
      if (selectedFilter === 'legal' && cat.id !== 'legal-services') return false;

      // Search query logic
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = cat.title.toLowerCase().includes(q);
        const matchDesc = cat.description.toLowerCase().includes(q);
        const matchOffer = cat.offerBadge.toLowerCase().includes(q);
        const matchServices = cat.services.some(s => s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchOffer || matchServices;
      }
      return true;
    });
  }, [searchQuery, selectedFilter, serviceGroup]);

  const handleOpenBooking = (category: HomeServiceCategory) => {
    setSelectedCategory(category);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone || !selectedCategory) {
      showToast('Please fill all required details', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      addServiceBooking({
        serviceId: selectedCategory.id,
        serviceTitle: selectedCategory.title,
        userName,
        userPhone,
        locality: selectedLocality,
        date: bookingDate || 'Immediate / Flexible',
        notes: serviceGroup === 'property' ? `${notes}${propertyBudget ? ` | Budget: ${propertyBudget}` : ''}${propertyType ? ` | Property Type: ${propertyType}` : ''}` : notes,
        status: 'new'
      });

      setSubmitting(false);
      setBookingModalOpen(false);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      showToast(`Service "${selectedCategory.title}" booked! Auricity partner will contact you within 15 mins.`, 'success');
      setUserName('');
      setUserPhone('');
      setNotes('');
      setPropertyBudget('');
      setPropertyType('');
    }, 450);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen py-10" id="all-services-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Hero Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#1E4FA8] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-[#1E4FA8]" />
                <span>Verified Doorstep Real Estate Services</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                All Home Services in Chhatrapati Sambhajinagar
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl leading-relaxed font-medium">
                Book verified professionals for shifting, painting, deep cleaning, pest control, legal title verification, and all household repairs with upfront pricing and service warranty.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="bg-orange-50 border border-orange-200/80 px-4 py-3 rounded-2xl text-center shadow-2xs">
                <span className="text-[10px] font-black text-[#F2621E] uppercase block">Special Offers</span>
                <span className="text-sm font-black text-[#0F172A]">Up to 30% Off</span>
              </div>
            </div>
          </div>

          {/* Service Type Switcher — separate registrations */}
          <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-slate-100 border border-slate-200">
            <button onClick={() => { setServiceGroup('property'); setSearchQuery(''); setSelectedFilter('all'); }} className={`flex-1 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 ${serviceGroup === 'property' ? 'bg-[#1E4FA8] text-white' : 'text-slate-600 bg-white'}`}><Briefcase className="w-4 h-4"/>Property Services</button>
            <button onClick={() => { setServiceGroup('home'); setSearchQuery(''); setSelectedFilter('all'); }} className={`flex-1 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 ${serviceGroup === 'home' ? 'bg-[#F2621E] text-white' : 'text-slate-600 bg-white'}`}><Home className="w-4 h-4"/>Home Services</button>
          </div>

          {/* Search & Filter Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g. AC repair, packers & movers, painting, pest control, plumber)..."
                className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8] focus:bg-white transition-all"
                id="search-services-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Tabs */}
            {serviceGroup === 'home' && <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {[
                { id: 'all', label: 'All Services (10)' },
                { id: 'shifting', label: 'Shifting' },
                { id: 'cleaning', label: 'Cleaning & Pest' },
                { id: 'repairs', label: 'Repairs & Maint.' },
                { id: 'legal', label: 'Legal & Title' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-[#1E4FA8] text-white shadow-blue-brand'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>}
          </div>
        </div>

        {/* Full 10-Category Services Grid */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-subtle space-y-3">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-black text-[#0F172A]">No services found for &quot;{searchQuery}&quot;</h3>
            <p className="text-xs text-[#64748B]">Try searching for &quot;packers&quot;, &quot;cleaning&quot;, &quot;plumbing&quot;, or &quot;painting&quot;.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
              className="mt-2 text-xs font-bold text-[#1E4FA8] hover:underline cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = getServiceIcon(category.id);

              return (
                <div
                  key={category.id}
                  onClick={() => serviceGroup === 'property' ? handleOpenBooking(category) : navigateToServiceDetail(category.id)}
                  className="group bg-white rounded-3xl border border-slate-200/90 shadow-subtle hover-lift transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  id={`all-service-card-${category.id}`}
                >
                  {/* Photo with Overlay & Offer Badge */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={category.image}
                      alt={category.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    {/* Offer / Discount Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-[#F2621E] text-white text-[11px] font-black tracking-wide uppercase px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                      <Percent className="w-3 h-3" />
                      <span>{category.offerBadge}</span>
                    </div>

                    {/* Icon Stamp */}
                    <div className="absolute bottom-3.5 left-3.5 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs border border-white/40">
                      <Icon className="w-6 h-6 text-[#1E4FA8]" />
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#0F172A] flex items-center space-x-1 shadow-xs border border-white/40">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>4.9</span>
                      <span className="text-[10px] text-[#64748B] font-normal">(380+ reviews)</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-[#0F172A] group-hover:text-[#1E4FA8] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                        {category.description}
                      </p>

                      {/* Sub-services / Highlights */}
                      <div className="pt-2 space-y-1.5">
                        {category.services.slice(0, 2).map((s) => (
                          <div key={s.id} className="flex items-center space-x-2 text-xs text-[#0F172A]">
                            <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                            <span className="truncate">{s.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#64748B] block font-semibold uppercase">Pricing</span>
                        <span className="text-base font-black text-[#1E4FA8]">
                          {category.startingPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(category)}
                        className="bg-[#1E4FA8] hover:bg-[#153B82] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-blue-brand transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                      >
                        <span>Book Pro</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 space-y-5 relative">
            
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0F172A] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 bg-orange-50 text-[#F2621E] px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                <Percent className="w-3 h-3" />
                <span>{serviceGroup === 'property' ? 'Property Service Registration' : `${selectedCategory.offerBadge} Applied`}</span>
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">
                Book {selectedCategory.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                Starting from <strong className="text-[#1E4FA8]">{selectedCategory.startingPrice}</strong> • Doorstep service in Sambhajinagar
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anand Kulkarni"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9822011223"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  required
                />
              </div>

              {serviceGroup === 'property' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#0F172A] block mb-1">Property Type *</label>
                    <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]" required>
                      <option value="">Select type</option><option>Apartment / Flat</option><option>Villa / House</option><option>Plot / Land</option><option>Commercial</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#0F172A] block mb-1">Budget / Value</label>
                    <input value={propertyBudget} onChange={e => setPropertyBudget(e.target.value)} placeholder="e.g. ₹50L - ₹80L" className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A]"/>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Locality *
                  </label>
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  >
                    {localitiesList.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">
                  Specific Requirements / Property Requirement
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 3 BHK in CIDCO N-4, ready to move / painting for 2 rooms"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1E4FA8] hover:bg-[#153B82] text-white py-3.5 rounded-xl font-black text-xs shadow-blue-brand transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : serviceGroup === 'property' ? 'Submit Property Service Request' : 'Confirm Doorstep Booking'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

