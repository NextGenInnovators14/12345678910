import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { Realtor } from '../../types';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  PhoneCall, 
  X 
} from 'lucide-react';

export const VerifiedRealtorsRow: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('realtors', 'Meet Our Verified Realtors', 'Connect with certified local property advisors.');
  const { realtors, setActiveView, showToast } = useApp();
  const [contactModalRealtor, setContactModalRealtor] = useState<Realtor | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: 'Hi, I would like to consult regarding property in Sambhajinagar.'
  });

  // Filter realtors configured to show on homepage
  const homepageRealtors = realtors
    .filter(r => r.showOnHomepage !== false)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 6);

  // If none explicitly marked, fallback to top 6
  const displayList = homepageRealtors.length > 0 ? homepageRealtors : realtors.slice(0, 6);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and phone number', 'warning');
      return;
    }
    setInquirySent(true);
    showToast(`Inquiry sent to ${contactModalRealtor?.name}! They will reach out promptly.`, 'success');
    setTimeout(() => {
      setInquirySent(false);
      setContactModalRealtor(null);
      setFormData({ name: '', phone: '', message: 'Hi, I would like to consult regarding property in Sambhajinagar.' });
    }, 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="verified-realtors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F2621E]" />
              <span>RERA Registered & KYC Audited</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {homeHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              {homeSubheading}
            </p>
          </div>

          <button
            onClick={() => setActiveView('realtors')}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-[#1E4FA8] hover:text-[#F2621E] transition-colors cursor-pointer group shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Realtor Profile Cards: Responsive Row (Horizontal Scroll on Mobile, 5-6 Column Grid on Desktop) */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
          {displayList.map((realtor) => (
            <div
              key={realtor.id}
              className="w-[240px] sm:w-auto shrink-0 bg-[var(--surface)] card-theme rounded-2xl p-4 border border-[var(--border)] shadow-xs hover:-translate-y-1 hover:border-[#1E4FA8]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3 group"
            >
              {/* Photo-First Card Container */}
              <div className="space-y-3">
                
                {/* Profile Photo with Verified Badge (Brand Orange) and Rating */}
                <div className="relative">
                  <div className="w-full h-36 sm:h-32 rounded-xl overflow-hidden bg-slate-100 border border-[var(--border)] group-hover:border-[#1E4FA8]/30 transition-colors">
                    <img
                      src={realtor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                      alt={realtor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* "Verified" Badge (Brand Orange #F2621E) */}
                  <div 
                    className="absolute top-2 left-2 bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center space-x-1"
                    title="Auricity KYC & RERA Verified"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>

                  {/* Small Rating (e.g. 4.9★) */}
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs text-slate-900 px-2 py-0.5 rounded-lg border border-slate-200/80 shadow-xs flex items-center space-x-0.5 text-[11px] font-black">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{realtor.rating || 4.8}★</span>
                  </div>
                </div>

                {/* Name and Agency */}
                <div className="space-y-1">
                  <h3 className="font-black text-sm text-[var(--text-primary)] group-hover:text-[#1E4FA8] transition-colors truncate">
                    {realtor.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[var(--text-secondary)] truncate">
                    {realtor.agencyName}
                  </p>

                  {/* Specialty / Area they operate in */}
                  <div className="mt-1">
                    <span className="inline-block bg-[var(--primary-light)] text-[#1E4FA8] text-[10px] font-black px-2 py-0.5 rounded-md border border-[#1E4FA8]/15 line-clamp-1">
                      {realtor.specialty || realtor.areasCovered?.[0] || 'Sambhajinagar Specialist'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Contact Button */}
              <div className="pt-2 border-t border-[var(--border)]">
                <button
                  onClick={() => setContactModalRealtor(realtor)}
                  className="w-full inline-flex items-center justify-center space-x-1.5 bg-[#F2621E] hover:bg-[#d95213] text-white text-xs font-black py-2 px-3 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Contact / Consultation Modal */}
      {contactModalRealtor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-md rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden p-6 space-y-5">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={contactModalRealtor.avatar}
                  alt={contactModalRealtor.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-[#1E4FA8]"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-black text-base text-[var(--text-primary)]">
                      {contactModalRealtor.name}
                    </h3>
                    <span className="bg-[#F2621E] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#1E4FA8]">
                    {contactModalRealtor.agencyName}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    {contactModalRealtor.specialty}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setContactModalRealtor(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Call & WhatsApp Strip */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${contactModalRealtor.phone}`}
                className="inline-flex items-center justify-center space-x-1.5 bg-[#1E4FA8] hover:bg-[#163D85] text-white text-xs font-black py-2.5 px-3 rounded-xl shadow-xs transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {contactModalRealtor.phone}</span>
              </a>

              <a
                href={`https://wa.me/${(contactModalRealtor.whatsapp || contactModalRealtor.phone || '918010506030').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(contactModalRealtor.name)},%20I%20saw%20your%20verified%20profile%20on%20Auricity.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-3 rounded-xl shadow-xs transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Callback Request Form */}
            <form onSubmit={handleSendInquiry} className="space-y-3 pt-1 border-t border-[var(--border)]">
              <div className="text-xs font-bold text-[var(--text-primary)]">
                Or Request a Direct Callback:
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalRealtor(null)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inquirySent}
                  className="inline-flex items-center space-x-1.5 bg-[#F2621E] hover:bg-[#d95213] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {inquirySent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Inquiry Sent</span>
                    </>
                  ) : (
                    <span>Submit Callback</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
