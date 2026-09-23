import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ENHANCED_HOME_SERVICES, EnhancedServiceDetail } from '../../data/homeServicesEnhanced';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Share2, 
  X,
  BadgePercent
} from 'lucide-react';

export const ServiceDetailView: React.FC = () => {
  const { 
    selectedServiceId, 
    customServiceDetails, 
    setActiveView, 
    navigateToServiceDetail, 
    addServiceBooking, 
    showToast 
  } = useApp();

  // Find the base service from enhanced dataset
  const baseService = useMemo(() => {
    return ENHANCED_HOME_SERVICES.find(s => s.id === selectedServiceId) || ENHANCED_HOME_SERVICES[0];
  }, [selectedServiceId]);

  // Merge with custom CMS overrides if set by admin
  const service: EnhancedServiceDetail = useMemo(() => {
    const overrides = customServiceDetails[baseService.id] || {};
    return {
      ...baseService,
      ...overrides,
      pricingTiers: overrides.pricingTiers || baseService.pricingTiers,
      inclusions: overrides.inclusions || baseService.inclusions,
      exclusions: overrides.exclusions || baseService.exclusions,
      processSteps: overrides.processSteps || baseService.processSteps
    };
  }, [baseService, customServiceDetails]);

  // Gallery Active Photo
  const [activePhoto, setActivePhoto] = useState<string>(service.heroImage);
  const [selectedTier, setSelectedTier] = useState<string>(service.pricingTiers[0]?.name || 'Standard Package');

  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientLocality, setClientLocality] = useState('');
  const [clientDate, setClientDate] = useState('');
  const [clientSlot, setClientSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [clientNotes, setClientNotes] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Reset states on service change
  useEffect(() => {
    setActivePhoto(service.heroImage);
    if (service.pricingTiers.length > 0) {
      setSelectedTier(service.pricingTiers[0].name);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  // Handle Service Booking Form
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      showToast('Please provide your name and contact phone number', 'error');
      return;
    }
    setSubmittingBooking(true);
    setTimeout(() => {
      addServiceBooking({
        serviceId: service.id,
        serviceTitle: `${service.title} (${selectedTier})`,
        userName: clientName,
        userPhone: clientPhone,
        locality: clientLocality || 'Chhatrapati Sambhajinagar',
        date: clientDate || new Date().toISOString().split('T')[0],
        timeSlot: clientSlot,
        notes: clientNotes,
        status: 'new'
      });
      setSubmittingBooking(false);
      setClientName('');
      setClientPhone('');
      setClientLocality('');
      setClientNotes('');
    }, 600);
  };

  // Related Services (excluding current)
  const relatedServices = useMemo(() => {
    return ENHANCED_HOME_SERVICES.filter(s => s.id !== service.id).slice(0, 3);
  }, [service.id]);

  return (
    <div className="bg-[var(--surface-secondary)] min-h-screen pb-16 transition-colors">
      
      {/* 1. TOP STICKY BREADCRUMB BAR */}
      <div className="bg-white border-b border-[#E5DEC9] sticky top-14 sm:top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-600 truncate">
            <button
              onClick={() => setActiveView('services')}
              className="hover:text-[#1E4FA8] font-bold flex items-center space-x-1 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#F2621E]" />
              <span>All Services</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-extrabold truncate">{service.title}</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: service.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Service link copied to clipboard!', 'info');
                }
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1E4FA8] border border-slate-200 cursor-pointer shadow-2xs transition-colors"
              title="Share Service"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href="tel:+918010506030"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1E4FA8] hover:bg-[#15397d] text-white text-xs font-black shadow-xs transition-all active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Expert Helpline:</span> <span>+91 8010506030</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* 2. HERO INTRO BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DAC6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1E4FA8] text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
                Auricity Certified Service
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Quality & Compliance Guarantee</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Turnaround: {service.turnaroundTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              {service.tagline}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
            <a
              href="#book-service"
              className="px-6 py-3 rounded-2xl bg-[#F2621E] hover:bg-[#d95214] text-white text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 text-center flex items-center justify-center space-x-1.5"
            >
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Book Service Consultation</span>
            </a>

            <a
              href={`https://wa.me/918010506030?text=${encodeURIComponent(`Hi Auricity! I would like to inquire about "${service.title}".`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs flex items-center justify-center space-x-1.5 transition-all text-center"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Quick WhatsApp Quote</span>
            </a>
          </div>
        </motion.div>

        {/* 3. PHOTO GALLERY OF SERVICE IN ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E2DAC6] shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
              <span>Service Gallery & Field Work</span>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {service.gallery.length} Photos
              </span>
            </h3>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">
              Real projects executed in Chhatrapati Sambhajinagar
            </span>
          </div>

          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative group shadow-inner">
            <img
              src={activePhoto}
              alt={service.title}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-xs text-white text-xs font-semibold">
              Auricity Field Deployment & Verification
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {service.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(img)}
                className={`relative w-24 sm:w-28 aspect-video rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activePhoto === img
                    ? 'border-[#F2621E] ring-2 ring-[#F2621E]/30 scale-102'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4. MAIN CONTENT TWO COLUMNS: DETAILS & PRICING (LEFT) + BOOKING FORM (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT 2 COLUMNS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* FULL SERVICE DESCRIPTION */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2DAC6] shadow-sm space-y-5">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-[#1E4FA8]" />
                <h3 className="text-lg font-black text-slate-900">Service Scope & Overview</h3>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {service.description}
              </p>

              {/* INCLUSIONS & EXCLUSIONS SIDE-BY-SIDE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-black text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What Is Included</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {service.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200/80 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-rose-800 font-black text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>What Is Excluded</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {service.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* STEP-BY-STEP WORKFLOW */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2DAC6] shadow-sm space-y-5">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Layers className="w-5 h-5 text-[#F2621E]" />
                <h3 className="text-lg font-black text-slate-900">How It Works (Step-by-Step)</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.processSteps.map((st) => (
                  <div key={st.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 relative">
                    <div className="w-7 h-7 rounded-xl bg-[#1E4FA8] text-white flex items-center justify-center text-xs font-black">
                      {st.step}
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">{st.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICING DETAILS: TRANSPARENT RATE CARDS */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2DAC6] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <BadgePercent className="w-5 h-5 text-[#1E4FA8]" />
                  <h3 className="text-lg font-black text-slate-900">Transparent Pricing Packages</h3>
                </div>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Fixed Pricing • No Hidden Costs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.pricingTiers.map((tier) => {
                  const isSelected = selectedTier === tier.name;
                  return (
                    <div
                      key={tier.name}
                      onClick={() => setSelectedTier(tier.name)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 relative ${
                        isSelected 
                          ? 'border-[#F2621E] bg-orange-50/20 shadow-md ring-2 ring-[#F2621E]/20' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                          Selected
                        </span>
                      )}

                      <div className="space-y-1.5">
                        <h4 className="text-sm font-black text-slate-900">{tier.name}</h4>
                        <div className="text-2xl font-black text-[#1E4FA8]">{tier.price}</div>
                        <div className="text-[11px] font-bold text-slate-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>Delivery: {tier.turnaround}</span>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-slate-100 pt-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Deliverables:</span>
                        <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                          {tier.deliverables.map((deliv, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTier(tier.name);
                          document.getElementById('book-service')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-black transition-all ${
                          isSelected 
                            ? 'bg-[#F2621E] text-white shadow-xs' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {isSelected ? 'Ready to Book' : 'Select Plan'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2DAC6] shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <HelpCircle className="w-5 h-5 text-[#1E4FA8]" />
                  <h3 className="text-lg font-black text-slate-900">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-2.5">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <span>{faq.q}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-[#F2621E]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: BOOKING FORM & HELPLINE */}
          <div id="book-service" className="space-y-6 lg:sticky lg:top-28">
            
            {/* Booking / Quote Form */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2DAC6] shadow-md space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Instant Booking Desk
                </span>
                <h3 className="text-lg font-black text-slate-900">Book {service.title}</h3>
                <p className="text-xs text-slate-500">
                  Selected Tier: <strong className="text-[#1E4FA8]">{selectedTier}</strong>
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Suresh Kulkarni"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E4FA8] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 9XXXXXXXXX"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E4FA8] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Property Locality</label>
                  <input
                    type="text"
                    value={clientLocality}
                    onChange={(e) => setClientLocality(e.target.value)}
                    placeholder="e.g. CIDCO N-4, Samarth Nagar"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E4FA8] font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={clientDate}
                      onChange={(e) => setClientDate(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Time Slot</label>
                    <select
                      value={clientSlot}
                      onChange={(e) => setClientSlot(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    >
                      <option>Morning (10-1)</option>
                      <option>Afternoon (1-4)</option>
                      <option>Evening (4-7)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Specific Requirements</label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Any specific instructions or urgent timeline..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E4FA8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="w-full py-3 rounded-2xl bg-[#F2621E] hover:bg-[#d95214] text-white text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5 text-amber-200" />
                  <span>{submittingBooking ? 'Submitting...' : 'Confirm Service Booking'}</span>
                </button>
              </form>

              {/* WhatsApp Quick Order */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`https://wa.me/918010506030?text=${encodeURIComponent(`Hi Auricity! I want to book "${service.title}" (${selectedTier}). Please get in touch.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs flex items-center justify-center space-x-1.5 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Order via WhatsApp</span>
                </a>

                <a
                  href="tel:+918010506030"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black border border-slate-300 flex items-center justify-center space-x-1.5 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#1E4FA8]" />
                  <span>Call +91 8010506030</span>
                </a>
              </div>
            </div>

            {/* Quality & Safety Assurance Box */}
            <div className="bg-white p-5 rounded-3xl border border-[#E2DAC6] shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-black text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Auricity Service Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.serviceGuarantee}
              </p>
            </div>

          </div>

        </div>

        {/* 5. "RELATED SERVICES" ROW AT BOTTOM */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Other Verified Property & Home Services
              </h3>
              <p className="text-xs text-slate-500">Combine services to streamline your property possession and legal clearance.</p>
            </div>
            <button
              onClick={() => setActiveView('services')}
              className="text-xs font-bold text-[#1E4FA8] hover:underline"
            >
              Browse All Services &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateToServiceDetail(rel.id)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-[#1E4FA8]/90 text-white text-[10px] font-bold">
                    {rel.turnaroundTime}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-[#1E4FA8] transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-black text-[#F2621E]">
                    <span>From {rel.pricingTiers[0]?.price || 'Affordable'}</span>
                    <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
