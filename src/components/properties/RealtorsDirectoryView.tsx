import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Realtor } from '../../types';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  Award,
  Sparkles,
  ExternalLink,
  X,
  PhoneCall
} from 'lucide-react';

export const RealtorsDirectoryView: React.FC = () => {
  const { realtors, setActiveView, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [contactModalRealtor, setContactModalRealtor] = useState<Realtor | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: 'Hello, I am interested in property advisory in Sambhajinagar.'
  });

  // Extract all unique specialties
  const specialties = ['All', 'CIDCO & Garkheda', 'Beed Bypass & Luxury', 'Industrial & MIDC', 'Commercial & Plots', 'City Core', 'AURIC Smart City'];

  const filteredRealtors = realtors.filter(realtor => {
    const matchesSearch = 
      realtor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      realtor.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (realtor.specialty && realtor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      realtor.areasCovered.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty = 
      selectedSpecialty === 'All' ||
      (realtor.specialty && realtor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())) ||
      (selectedSpecialty === 'CIDCO & Garkheda' && (realtor.specialty?.includes('CIDCO') || realtor.areasCovered.some(a => a.includes('CIDCO')))) ||
      (selectedSpecialty === 'Beed Bypass & Luxury' && (realtor.specialty?.includes('Beed') || realtor.areasCovered.some(a => a.includes('Beed')))) ||
      (selectedSpecialty === 'Industrial & MIDC' && (realtor.specialty?.includes('Industrial') || realtor.specialty?.includes('MIDC') || realtor.areasCovered.some(a => a.includes('MIDC')))) ||
      (selectedSpecialty === 'Commercial & Plots' && (realtor.specialty?.includes('Commercial') || realtor.specialty?.includes('Plot') || realtor.areasCovered.some(a => a.includes('Commercial')))) ||
      (selectedSpecialty === 'City Core' && (realtor.specialty?.includes('Core') || realtor.specialty?.includes('Samarth'))) ||
      (selectedSpecialty === 'AURIC Smart City' && (realtor.specialty?.includes('AURIC') || realtor.areasCovered.some(a => a.includes('AURIC'))));

    return matchesSearch && matchesSpecialty;
  });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and contact phone', 'warning');
      return;
    }
    setInquirySent(true);
    showToast(`Inquiry sent to ${contactModalRealtor?.name}! They will call you shortly.`, 'success');
    setTimeout(() => {
      setInquirySent(false);
      setContactModalRealtor(null);
      setFormData({ name: '', phone: '', message: 'Hello, I am interested in property advisory in Sambhajinagar.' });
    }, 2000);
  };

  return (
    <div className="bg-[var(--surface-secondary)] min-h-screen py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Button & Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[var(--primary)] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => setActiveView('broker-hub')}
            className="btn-theme-primary text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center space-x-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Join Realtor's Club</span>
          </button>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-r from-[#1E4FA8] via-[#163D85] to-[#122E68] text-white p-6 sm:p-10 rounded-3xl border border-[#163D85] shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-amber-300 text-xs font-black uppercase tracking-wider border border-white/20">
              <ShieldCheck className="w-4 h-4 text-[#F2621E]" />
              <span>100% RERA Registered & KYC Audited Agents</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Meet Our Verified Realtors & Mandate Advisors
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
              Connect with top-tier, licensed property specialists in Chhatrapati Sambhajinagar. Direct advisory for CIDCO, Beed Bypass, Jalna Road, Waluj MIDC, and AURIC Smart City with verified inventory and zero inflated pricing.
            </p>
          </div>

          <div className="hidden lg:block absolute -right-6 -bottom-10 opacity-15 pointer-events-none">
            <Building2 className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[var(--surface)] p-4 sm:p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by agent name, specialty, or locality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-[var(--text-secondary)] font-bold self-end sm:self-center">
              Showing <span className="text-[var(--primary)] font-black">{filteredRealtors.length}</span> Verified Agents
            </div>
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 pt-1">
            <span className="text-xs font-bold text-[var(--text-secondary)] shrink-0 mr-1">Filter by Area:</span>
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-[#1E4FA8] text-white shadow-xs'
                    : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-slate-200/60 border border-[var(--border)]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Realtors Grid */}
        {filteredRealtors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRealtors.map((realtor) => (
              <div
                key={realtor.id}
                className="card-theme rounded-2xl p-5 border border-[var(--border)] shadow-xs hover:-translate-y-1 hover:border-[#1E4FA8]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                {/* Header: Photo, Name, Verified Badge */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-4">
                    <div className="relative shrink-0">
                      <img
                        src={realtor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                        alt={realtor.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--border)] shadow-xs"
                      />
                      {realtor.verifiedBadge !== false && (
                        <div 
                          className="absolute -bottom-1 -right-1 bg-[#F2621E] text-white rounded-full p-1 shadow-xs"
                          title="Auricity Verified Broker"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-black text-base text-[var(--text-primary)] truncate">
                          {realtor.name}
                        </h3>
                        <div className="flex items-center space-x-0.5 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] font-black text-amber-800">{realtor.rating || 4.8}★</span>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-[#1E4FA8] truncate mt-0.5">
                        {realtor.agencyName}
                      </div>

                      {realtor.specialty && (
                        <div className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[var(--primary-light)] text-[#1E4FA8] text-[11px] font-black border border-[#1E4FA8]/20">
                          {realtor.specialty}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RERA and Experience Pill */}
                  <div className="flex items-center justify-between text-[11px] bg-[var(--surface-secondary)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] font-medium">MahaRERA:</span>
                    <span className="font-mono font-bold text-[var(--text-primary)]">{realtor.reraNumber || 'Applied'}</span>
                  </div>

                  {/* Deals & Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-[var(--surface-secondary)] p-2 rounded-xl border border-[var(--border)]">
                      <span className="text-[10px] text-[var(--text-secondary)] block font-medium">Experience</span>
                      <span className="font-black text-[var(--text-primary)]">{realtor.experienceYears || 8}+ Years</span>
                    </div>
                    <div className="bg-[var(--surface-secondary)] p-2 rounded-xl border border-[var(--border)]">
                      <span className="text-[10px] text-[var(--text-secondary)] block font-medium">Closed Deals</span>
                      <span className="font-black text-emerald-700">{realtor.totalDeals || 50}+ Closed</span>
                    </div>
                  </div>

                  {/* Operating Localities */}
                  {realtor.areasCovered && realtor.areasCovered.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#F2621E]" />
                        <span>Core Localities:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {realtor.areasCovered.slice(0, 3).map((area, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions: Contact Button & WhatsApp */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border)]">
                  <a
                    href={`https://wa.me/${(realtor.whatsapp || realtor.phone || '918010506030').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(realtor.name)},%20I%20saw%20your%20verified%20profile%20on%20Auricity.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setContactModalRealtor(realtor)}
                    className="inline-flex items-center justify-center space-x-1.5 bg-[#F2621E] hover:bg-[#d95213] text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all shadow-2xs cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--surface)] p-12 rounded-3xl border border-[var(--border)] text-center space-y-4">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-[var(--text-primary)]">No realtors matched your filter</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              Try searching with different keywords or reset your area filter to view all verified brokers.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedSpecialty('All'); }}
              className="btn-theme-primary text-xs font-black px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Contact Realtor Modal */}
        {contactModalRealtor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[var(--surface)] w-full max-w-lg rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={contactModalRealtor.avatar}
                    alt={contactModalRealtor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#1E4FA8]"
                  />
                  <div>
                    <h3 className="font-black text-lg text-[var(--text-primary)]">
                      {contactModalRealtor.name}
                    </h3>
                    <p className="text-xs font-bold text-[#1E4FA8]">
                      {contactModalRealtor.agencyName}
                    </p>
                    <div className="flex items-center space-x-1 text-[10px] text-emerald-700 font-bold mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>MahaRERA: {contactModalRealtor.reraNumber}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setContactModalRealtor(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct Call & Instant Contact Row */}
              <div className="bg-[var(--surface-secondary)] p-4 rounded-2xl border border-[var(--border)] space-y-2">
                <div className="text-xs font-bold text-[var(--text-secondary)]">Direct Contact Details:</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-[var(--text-primary)]">
                    {contactModalRealtor.phone}
                  </span>
                  <a
                    href={`tel:${contactModalRealtor.phone}`}
                    className="inline-flex items-center space-x-1.5 bg-[#1E4FA8] text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              {/* Instant Callback Form */}
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-[var(--text-primary)]">
                  Or Request a Free Callback / Property Consultation:
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Deshpande"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Your WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98220 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Message / Locality Requirement</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactModalRealtor(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inquirySent}
                    className="inline-flex items-center space-x-1.5 bg-[#F2621E] hover:bg-[#d95213] text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    {inquirySent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Inquiry Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
