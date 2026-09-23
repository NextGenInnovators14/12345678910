import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { HOME_SERVICE_CATEGORIES } from '../../../data/homeServicesData';
import { ENHANCED_HOME_SERVICES, EnhancedServiceDetail } from '../../../data/homeServicesEnhanced';
import { 
  Wrench, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  ExternalLink, 
  Save, 
  Sparkles, 
  DollarSign, 
  Image as ImageIcon, 
  Layers, 
  ListChecks, 
  XCircle, 
  Phone, 
  Calendar, 
  MapPin, 
  MessageSquare,
  Search,
  ChevronRight,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const ServicesManager: React.FC = () => {
  const { 
    customServiceDetails, 
    updateCustomServiceDetail, 
    serviceBookings, 
    updateServiceBookingStatus, 
    deleteServiceBooking,
    navigateToServiceDetail,
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'bookings'>('catalog');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(HOME_SERVICE_CATEGORIES[0]?.id || 'packers-movers');
  const [searchQuery, setSearchQuery] = useState('');

  // Find base service details
  const baseService = ENHANCED_HOME_SERVICES.find(s => s.id === selectedServiceId) || ENHANCED_HOME_SERVICES[0];
  const overrides = customServiceDetails[selectedServiceId] || {};

  // Local draft state for editing
  const [title, setTitle] = useState(overrides.title || baseService.title);
  const [offerBadge, setOfferBadge] = useState(overrides.offerBadge || baseService.offerBadge);
  const [startingPrice, setStartingPrice] = useState(overrides.startingPrice || baseService.startingPrice);
  const [heroImage, setHeroImage] = useState(overrides.heroImage || baseService.heroImage);
  const [detailedDescription, setDetailedDescription] = useState(overrides.detailedDescription || baseService.detailedDescription);
  const [turnaroundTime, setTurnaroundTime] = useState(overrides.turnaroundTime || baseService.turnaroundTime || 'Within 2 hours');
  const [guarantee, setGuarantee] = useState(overrides.guarantee || baseService.guarantee || '30-Day Service Guarantee');
  
  // Lists
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>(overrides.galleryPhotos || baseService.galleryPhotos || []);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  
  const [inclusions, setInclusions] = useState<string[]>(overrides.inclusions || baseService.inclusions || []);
  const [newInclusion, setNewInclusion] = useState('');
  
  const [exclusions, setExclusions] = useState<string[]>(overrides.exclusions || baseService.exclusions || []);
  const [newExclusion, setNewExclusion] = useState('');
  
  const [pricingTiers, setPricingTiers] = useState(overrides.pricingTiers || baseService.pricingTiers || []);

  // Sync draft when switching selected service
  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    const s = ENHANCED_HOME_SERVICES.find(srv => srv.id === id) || ENHANCED_HOME_SERVICES[0];
    const ov = customServiceDetails[id] || {};
    setTitle(ov.title || s.title);
    setOfferBadge(ov.offerBadge || s.offerBadge);
    setStartingPrice(ov.startingPrice || s.startingPrice);
    setHeroImage(ov.heroImage || s.heroImage);
    setDetailedDescription(ov.detailedDescription || s.detailedDescription);
    setTurnaroundTime(ov.turnaroundTime || s.turnaroundTime || 'Within 2 hours');
    setGuarantee(ov.guarantee || s.guarantee || '30-Day Service Guarantee');
    setGalleryPhotos(ov.galleryPhotos || s.galleryPhotos || []);
    setInclusions(ov.inclusions || s.inclusions || []);
    setExclusions(ov.exclusions || s.exclusions || []);
    setPricingTiers(ov.pricingTiers || s.pricingTiers || []);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomServiceDetail(selectedServiceId, {
      title,
      offerBadge,
      startingPrice,
      heroImage,
      detailedDescription,
      turnaroundTime,
      guarantee,
      galleryPhotos,
      inclusions,
      exclusions,
      pricingTiers
    });
    showToast(`CMS: "${title}" details successfully saved!`, 'success');
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setGalleryPhotos(prev => [...prev, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setGalleryPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions(prev => [...prev, newInclusion.trim()]);
      setNewInclusion('');
    }
  };

  const handleRemoveInclusion = (idx: number) => {
    setInclusions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions(prev => [...prev, newExclusion.trim()]);
      setNewExclusion('');
    }
  };

  const handleRemoveExclusion = (idx: number) => {
    setExclusions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateTier = (idx: number, field: string, val: any) => {
    setPricingTiers(prev => prev.map((tier, i) => i === idx ? { ...tier, [field]: val } : tier));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-[#1E4FA8]" />
            <span>Doorstep Home Services & Rate Card CMS</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure transparent rate cards, inclusions/exclusions, photo galleries, and manage client bookings.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveSubTab('catalog')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeSubTab === 'catalog' ? 'bg-[#1E4FA8] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Service Detail Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('bookings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'bookings' ? 'bg-[#1E4FA8] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Customer Bookings</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
              {serviceBookings.length}
            </span>
          </button>
        </div>
      </div>

      {activeSubTab === 'catalog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Service Selector (3 Cols) */}
          <div className="lg:col-span-4 space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider px-2 py-1">
              Select Service Category
            </h3>
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
              {HOME_SERVICE_CATEGORIES.map(cat => {
                const isSelected = cat.id === selectedServiceId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectService(cat.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-[#1E4FA8] text-white shadow-xs' 
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="text-xs font-black truncate">{cat.title}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        {cat.startingPrice} • {cat.offerBadge}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Service Editor Form (8 Cols) */}
          <form onSubmit={handleSaveService} className="lg:col-span-8 space-y-6">
            
            {/* Top Bar with Live Preview CTA */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/80 border border-blue-200/60">
              <div className="text-xs font-bold text-[#1E4FA8] flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#F2621E]" />
                <span>Editing: <strong>{title}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => navigateToServiceDetail(selectedServiceId)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E4FA8] border border-blue-200 text-xs font-bold flex items-center space-x-1 shadow-2xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Page</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#1E4FA8] hover:bg-[#163D85] text-white text-xs font-black flex items-center space-x-1 shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Service Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E4FA8] outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Offer Badge (e.g. 20% OFF)</label>
                <input
                  type="text"
                  value={offerBadge}
                  onChange={(e) => setOfferBadge(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E4FA8] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Starting Price Display</label>
                <input
                  type="text"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E4FA8] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Turnaround / Arrival Time</label>
                <input
                  type="text"
                  value={turnaroundTime}
                  onChange={(e) => setTurnaroundTime(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E4FA8] outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">Cover / Hero Image URL</label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E4FA8] outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Service Description</label>
                <textarea
                  rows={3}
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E4FA8] outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              
              {/* Inclusions */}
              <div className="space-y-2.5 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100">
                <div className="text-xs font-black text-emerald-900 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What is Included ({inclusions.length})</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 text-xs bg-white p-2 rounded-lg border border-emerald-200">
                      <span className="text-slate-800 leading-snug">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInclusion(idx)}
                        className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    placeholder="Add an included feature..."
                    className="flex-1 text-xs p-2 rounded-lg border border-slate-300 bg-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Exclusions */}
              <div className="space-y-2.5 bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100">
                <div className="text-xs font-black text-rose-900 flex items-center space-x-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>What is Excluded ({exclusions.length})</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {exclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 text-xs bg-white p-2 rounded-lg border border-rose-200">
                      <span className="text-slate-800 leading-snug">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExclusion(idx)}
                        className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    placeholder="Add an excluded item..."
                    className="flex-1 text-xs p-2 rounded-lg border border-slate-300 bg-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddExclusion}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

            </div>

            {/* Photo Gallery Editor */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="text-xs font-black text-slate-800 flex items-center space-x-1.5">
                <ImageIcon className="w-4 h-4 text-[#1E4FA8]" />
                <span>Service Photos Gallery ({galleryPhotos.length} Images)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryPhotos.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-md opacity-90 group-hover:opacity-100 cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="Paste Image URL (Unsplash or direct image link)..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 rounded-xl bg-[#1E4FA8] text-white text-xs font-bold cursor-pointer hover:bg-[#163D85]"
                >
                  Add Image
                </button>
              </div>
            </div>

            {/* Transparent Pricing Rate Cards */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="text-xs font-black text-slate-800 flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-[#F2621E]" />
                <span>Transparent Rate Cards / Pricing Tiers ({pricingTiers.length} Tiers)</span>
              </div>

              <div className="space-y-3">
                {pricingTiers.map((tier: any, idx: number) => (
                  <div key={tier.id || idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600">Plan Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleUpdateTier(idx, 'name', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600">Price Display (e.g. ₹ 2,499)</label>
                        <input
                          type="text"
                          value={tier.price}
                          onChange={(e) => handleUpdateTier(idx, 'price', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600">Estimated Duration</label>
                        <input
                          type="text"
                          value={tier.duration}
                          onChange={(e) => handleUpdateTier(idx, 'duration', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#1E4FA8] hover:bg-[#163D85] text-white text-xs font-black flex items-center space-x-2 shadow-blue-brand cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes to {title}</span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Customer Bookings Tab */}
      {activeSubTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-black text-slate-900">
              Customer Bookings & Doorstep Inquiries ({serviceBookings.length})
            </h3>
          </div>

          {serviceBookings.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">No service bookings received yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-500 tracking-wider bg-slate-50">
                    <th className="p-3">Customer</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Locality</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {serviceBookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50/70">
                      <td className="p-3 font-bold text-slate-900">
                        <div>{bk.userName}</div>
                        <a href={`tel:${bk.userPhone}`} className="text-[11px] text-[#1E4FA8] hover:underline font-semibold">
                          {bk.userPhone}
                        </a>
                      </td>
                      <td className="p-3 font-medium text-slate-700">
                        {bk.serviceTitle || bk.serviceId}
                      </td>
                      <td className="p-3 text-slate-600">
                        {bk.locality || 'Sambhajinagar'}
                      </td>
                      <td className="p-3 text-slate-600">
                        {bk.date || 'Immediate'}
                      </td>
                      <td className="p-3">
                        <select
                          value={bk.status}
                          onChange={(e) => updateServiceBookingStatus(bk.id, e.target.value as any)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                            bk.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                            bk.status === 'completed' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                            bk.status === 'cancelled' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                            'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="new">New Inquiry</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <a
                          href={`https://wa.me/91${bk.userPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(bk.userName)},%20regarding%20your%20Auricity%20home%20service%20inquiry.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-2 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700"
                        >
                          WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete the service order from "${bk.userName}"?`)) {
                              deleteServiceBooking(bk.id);
                            }
                          }}
                          className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
