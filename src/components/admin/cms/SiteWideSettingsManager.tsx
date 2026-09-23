import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { BannerAdItem, OfferItem } from '../../../types';
import { CmsImageReplacerModal } from './CmsImageReplacerModal';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  Edit, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Gift, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  Image as ImageIcon,
  ExternalLink,
  Layers,
  Save,
  Check,
  X
} from 'lucide-react';

export const SiteWideSettingsManager: React.FC = () => {
  const { 
    bannerAds, 
    addBannerAd, 
    updateBannerAd, 
    deleteBannerAd, 
    reorderBannerAds,
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    projects,
    navigationConfig,
    updateNavigationConfig,
    settings,
    updateSettings,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'banners' | 'offers' | 'contact'>('banners');

  // Banner Editor Modal
  const [isBannerModalOpen, setIsBannerModalOpen] = useState<boolean>(false);
  useModalBackHandler(isBannerModalOpen, () => setIsBannerModalOpen(false));
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerForm, setBannerForm] = useState<Partial<BannerAdItem>>({});

  // Offer Editor Modal
  const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);
  useModalBackHandler(isOfferModalOpen, () => setIsOfferModalOpen(false));
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [offerForm, setOfferForm] = useState<Partial<OfferItem>>({});

  // Image replacer modal
  const [replacerOpen, setReplacerOpen] = useState<boolean>(false);
  const [replacerTarget, setReplacerTarget] = useState<{ type: 'banner' | 'offer'; currentUrl: string } | null>(null);

  // BANNER HANDLERS
  const handleOpenBannerModal = (banner?: BannerAdItem) => {
    if (banner) {
      setEditingBannerId(banner.id);
      setBannerForm({ ...banner });
    } else {
      setEditingBannerId(null);
      setBannerForm({
        id: `ad-${Date.now()}`,
        tag: 'SPECIAL PROMOTION',
        tagBg: 'bg-[#1E4FA8] text-white',
        title: 'New Launch Township Offer in Sambhajinagar',
        subtitle: 'Exclusive 0% Stamp Duty + Zero Brokerage',
        desc: 'Book verified flats directly with developers and claim pre-launch benefits.',
        ctaText: 'Explore Projects',
        ctaActionType: 'view',
        ctaLink: 'projects',
        bgGradient: 'from-[#F7F2E6] via-[#EFE7D5] to-[#E7DEC5] border border-[#DDD3BC]',
        titleColor: 'text-[#1E4FA8]',
        subtitleColor: 'text-[#F2621E]',
        descColor: 'text-slate-700',
        badge: 'Limited Period',
        badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300/80',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        active: true,
        order: bannerAds.length + 1
      });
    }
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerForm.title || !bannerForm.subtitle) {
      showToast('Please provide a banner headline and subtitle', 'error');
      return;
    }

    const finalBanner: BannerAdItem = {
      id: editingBannerId || bannerForm.id || `ad-${Date.now()}`,
      tag: bannerForm.tag || 'OFFER',
      tagBg: bannerForm.tagBg || 'bg-[#1E4FA8] text-white',
      title: bannerForm.title || 'Special Promotion',
      subtitle: bannerForm.subtitle || '',
      desc: bannerForm.desc || '',
      ctaText: bannerForm.ctaText || 'Learn More',
      ctaActionType: bannerForm.ctaActionType || 'view',
      ctaLink: bannerForm.ctaLink || 'properties',
      bgGradient: bannerForm.bgGradient || 'from-[#F7F2E6] via-[#EFE7D5] to-[#E7DEC5] border border-[#DDD3BC]',
      titleColor: bannerForm.titleColor || 'text-[#1E4FA8]',
      subtitleColor: bannerForm.subtitleColor || 'text-[#F2621E]',
      descColor: bannerForm.descColor || 'text-slate-700',
      badge: bannerForm.badge || 'Active',
      badgeStyle: bannerForm.badgeStyle || 'bg-amber-100 text-amber-900 border-amber-300/80',
      image: bannerForm.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      videoUrl: bannerForm.videoUrl || '',
      linkUrl: bannerForm.linkUrl || '',
      active: bannerForm.active !== false,
      order: bannerForm.order || 1
    };

    if (editingBannerId) {
      updateBannerAd(editingBannerId, finalBanner);
      showToast('Promotional banner ad updated!', 'success');
    } else {
      addBannerAd(finalBanner);
      showToast('New banner ad added to homepage rotating carousel!', 'success');
    }

    setIsBannerModalOpen(false);
  };

  const handleMoveBanner = (index: number, direction: 'up' | 'down') => {
    const newAds = [...bannerAds];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newAds.length) return;

    const temp = newAds[index];
    newAds[index] = newAds[targetIdx];
    newAds[targetIdx] = temp;
    reorderBannerAds(newAds);
    showToast('Banner carousel order updated!', 'info');
  };

  // OFFER HANDLERS
  const handleOpenOfferModal = (off?: OfferItem) => {
    if (off) {
      setEditingOfferId(off.id);
      setOfferForm({ ...off });
    } else {
      setEditingOfferId(null);
      setOfferForm({
        id: `off-${Date.now()}`,
        title: 'Festive Modular Kitchen Offer',
        subtitle: 'Get modular kitchen voucher worth ₹50,000 on confirmed bookings',
        discountTag: 'FREE Modular Kitchen',
        discountValue: '₹ 50,000',
        projectId: projects[0]?.id || 'proj-01',
        projectName: projects[0]?.name || 'Featured Project',
        validTill: '2026-12-31',
        terms: 'Applicable for the first 10 confirmed registrations booked through Auricity.',
        published: true,
        bannerBg: 'bg-gradient-to-r from-amber-500 to-orange-600',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      });
    }
    setIsOfferModalOpen(true);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title) {
      showToast('Please provide an offer title', 'error');
      return;
    }

    const selectedProj = projects.find(p => p.id === offerForm.projectId);

    const finalOffer: OfferItem = {
      id: editingOfferId || offerForm.id || `off-${Date.now()}`,
      title: offerForm.title || 'Special Project Offer',
      subtitle: offerForm.subtitle || '',
      discountTag: offerForm.discountTag || 'Special Discount',
      discountValue: offerForm.discountValue || '0% Stamp Duty',
      projectId: offerForm.projectId || '',
      projectName: selectedProj ? selectedProj.name : (offerForm.projectName || 'All Projects'),
      validTill: offerForm.validTill || '2026-12-31',
      terms: offerForm.terms || '',
      published: offerForm.published !== false,
      bannerBg: offerForm.bannerBg || 'bg-gradient-to-r from-blue-600 to-indigo-700',
      imageUrl: offerForm.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
    };

    if (editingOfferId) {
      updateOffer(editingOfferId, finalOffer);
      showToast('Offer deal updated!', 'success');
    } else {
      addOffer(finalOffer);
      showToast('New project offer published!', 'success');
    }

    setIsOfferModalOpen(false);
  };

  const handleImageSelected = (newUrl: string) => {
    if (!replacerTarget) return;
    if (replacerTarget.type === 'banner') {
      setBannerForm(prev => ({ ...prev, image: newUrl }));
    } else {
      setOfferForm(prev => ({ ...prev, imageUrl: newUrl }));
    }
  };

  return (
    <div id="sitewide-settings-cms" className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-900 rounded-full uppercase tracking-wider">
              CMS • Banners, Offers & Contact
            </span>
            <span className="text-xs text-slate-400">• {bannerAds.length} Banners • {offers.length} Active Offers</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Site-Wide Content & Promotional Banners
          </h2>
          <p className="text-xs text-slate-500">
            Manage the rotating homepage banner ads carousel, create project-linked festive offers, and update contact details.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === 'banners' && (
            <button
              id="cms-add-banner-ad-btn"
              onClick={() => handleOpenBannerModal()}
              className="px-4 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              + Add Rotating Banner Ad
            </button>
          )}

          {activeTab === 'offers' && (
            <button
              id="cms-add-offer-deal-btn"
              onClick={() => handleOpenOfferModal()}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Gift className="w-4 h-4" />
              + Add New Project Offer
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-2">
        <button
          onClick={() => setActiveTab('banners')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'banners'
              ? 'bg-[#1E4FA8] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Homepage Rotating Banner Ads ({bannerAds.length})
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'offers'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Gift className="w-4 h-4" />
          Project Offers & Discounts ({offers.length})
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'contact'
              ? 'bg-[#F2621E] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Phone className="w-4 h-4" />
          Contact Info & Social Links
        </button>
      </div>

      {/* TAB 1: BANNER ADS CAROUSEL MANAGER */}
      {activeTab === 'banners' && (
        <div className="space-y-4">
          <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
            <p className="text-xs text-blue-900 font-medium">
              💡 These banners automatically rotate on the homepage hero section. You can reorder, activate, or swap graphics anytime.
            </p>
          </div>

          <div className="space-y-3">
            {bannerAds.map((ad, idx) => (
              <div 
                key={ad.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Banner Thumbnail & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-28 h-18 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative aspect-video">
                    <img src={ad.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${ad.tagBg || 'bg-blue-100 text-blue-800'}`}>
                        {ad.tag}
                      </span>
                      {ad.active ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          Disabled
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{ad.title}</h4>
                    <p className="text-xs text-[#F2621E] font-medium line-clamp-1">{ad.subtitle}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">CTA Button: "{ad.ctaText}" → Destination: {ad.ctaLink || ad.ctaActionType}</p>
                  </div>
                </div>

                {/* Reorder and Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <div className="flex border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleMoveBanner(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 hover:bg-slate-100 disabled:opacity-30 text-slate-600"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveBanner(idx, 'down')}
                      disabled={idx === bannerAds.length - 1}
                      className="p-2 hover:bg-slate-100 disabled:opacity-30 text-slate-600"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenBannerModal(ad)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    title="Edit Banner"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete banner ad "${ad.title}"?`)) {
                        deleteBannerAd(ad.id);
                        showToast('Banner ad deleted', 'info');
                      }
                    }}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFERS & DISCOUNTS MANAGER */}
      {activeTab === 'offers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold">
                    {offer.discountTag}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-100">
                    Valid till: {offer.validTill}
                  </span>
                </div>
                <h3 className="text-base font-bold">{offer.title}</h3>
                <p className="text-xs text-amber-100 mt-1">{offer.subtitle}</p>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Applicable Project:</span>
                    <span className="font-bold text-[#1E4FA8]">{offer.projectName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Discount Value:</span>
                    <span className="font-bold text-emerald-600">{offer.discountValue}</span>
                  </div>
                  {offer.terms && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <strong>Terms:</strong> {offer.terms}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${offer.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {offer.published ? 'Live on Site' : 'Draft'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenOfferModal(offer)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete offer "${offer.title}"?`)) {
                          deleteOffer(offer.id);
                          showToast('Offer deleted', 'info');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CONTACT & SOCIAL MEDIA SETTINGS */}
      {activeTab === 'contact' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Official Contact & Support Channels</h3>
            <p className="text-xs text-slate-500">Update phone helplines, WhatsApp desk, office address, and social links</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Helpline Phone</label>
              <input
                type="text"
                value={settings.supportPhone || ''}
                onChange={(e) => updateSettings({ supportPhone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail || ''}
                onChange={(e) => updateSettings({ supportEmail: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Office Physical Address</label>
              <textarea
                rows={2}
                value={settings.officeAddress || ''}
                onChange={(e) => updateSettings({ officeAddress: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#1E4FA8]" /> Social Media & Official Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook URL</label>
                <input
                  type="url"
                  value={navigationConfig.socialLinks?.facebook || ''}
                  onChange={(e) => updateNavigationConfig({
                    socialLinks: { ...navigationConfig.socialLinks, facebook: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={navigationConfig.socialLinks?.instagram || ''}
                  onChange={(e) => updateNavigationConfig({
                    socialLinks: { ...navigationConfig.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={navigationConfig.socialLinks?.linkedin || ''}
                  onChange={(e) => updateNavigationConfig({
                    socialLinks: { ...navigationConfig.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Channel</label>
                <input
                  type="url"
                  value={navigationConfig.socialLinks?.youtube || ''}
                  onChange={(e) => updateNavigationConfig({
                    socialLinks: { ...navigationConfig.socialLinks, youtube: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Chat Desk Link</label>
                <input
                  type="url"
                  value={navigationConfig.socialLinks?.whatsapp || ''}
                  onChange={(e) => updateNavigationConfig({
                    socialLinks: { ...navigationConfig.socialLinks, whatsapp: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Twitter / X Handle</label>
                <input
                  type="url"
                  value={navigationConfig.socialLinks?.twitter || ''}
                  onChange={(e) => updateNavigationConfig({
                    socialLinks: { ...navigationConfig.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => showToast('Contact settings and social links saved!', 'success')}
                className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Contact Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BANNER EDIT MODAL */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {editingBannerId ? 'Edit Promotional Banner' : 'Create Rotating Banner Ad'}
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Banner Tag Label *</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.tag || ''}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, tag: e.target.value }))}
                    placeholder="e.g. FESTIVAL HOME LOAN OFFER"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Style</label>
                  <input
                    type="text"
                    value={bannerForm.badge || 'Limited Period'}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, badge: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline (Title) *</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title || ''}
                  onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Get Instant Pre-Approved Home Loans @ 8.25% ROI"
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 text-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subheadline *</label>
                <input
                  type="text"
                  required
                  value={bannerForm.subtitle || ''}
                  onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Zero Processing Fees with SBI, HDFC & ICICI Bank Tie-ups"
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-[#F2621E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={bannerForm.desc || ''}
                  onChange={(e) => setBannerForm(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="Exclusive doorstep document pickup in Chhatrapati Sambhajinagar..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={bannerForm.ctaText || 'Calculate EMI & Apply'}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, ctaText: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Route / Action</label>
                  <input
                    type="text"
                    value={bannerForm.ctaLink || 'mortgage-calc'}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, ctaLink: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <label className="block text-xs font-semibold text-slate-700">Video URL (optional)
              <input type="url" value={bannerForm.videoUrl || ''} onChange={(e) => setBannerForm(prev => ({ ...prev, videoUrl: e.target.value }))} placeholder="https://…/banner.mp4" className="mt-1 w-full px-3 py-2 text-xs rounded-xl border border-slate-200" />
            </label>
            <label className="block text-xs font-semibold text-slate-700">Click destination URL (optional)
              <input type="url" value={bannerForm.linkUrl || ''} onChange={(e) => setBannerForm(prev => ({ ...prev, linkUrl: e.target.value }))} placeholder="https://example.com" className="mt-1 w-full px-3 py-2 text-xs rounded-xl border border-slate-200" />
            </label>
          </div>
        </div>
        
        {/* Banner Image */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Banner Graphic Photo</label>
                  <button
                    type="button"
                    onClick={() => {
                      setReplacerTarget({ type: 'banner', currentUrl: bannerForm.image || '' });
                      setReplacerOpen(true);
                    }}
                    className="text-xs text-[#F2621E] font-bold hover:underline flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Swap Photo
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                    <img src={bannerForm.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <input
                    type="url"
                    value={bannerForm.image || ''}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, image: e.target.value }))}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="banner-active-checkbox"
                  checked={bannerForm.active !== false}
                  onChange={(e) => setBannerForm(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-[#F2621E] rounded"
                />
                <label htmlFor="banner-active-checkbox" className="text-xs font-bold text-slate-800">
                  Enable and show in active rotating carousel on homepage
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm"
                >
                  Save Banner Ad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFER EDIT MODAL */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {editingOfferId ? 'Edit Project Offer' : 'Create Project Offer Deal'}
              </h3>
              <button onClick={() => setIsOfferModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={offerForm.title || ''}
                  onChange={(e) => setOfferForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Festive Modular Kitchen Offer"
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer Subtitle / Value Hook</label>
                <input
                  type="text"
                  value={offerForm.subtitle || ''}
                  onChange={(e) => setOfferForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Get modular kitchen voucher worth ₹50,000 on booking"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Applicable Project *</label>
                  <select
                    value={offerForm.projectId || ''}
                    onChange={(e) => setOfferForm(prev => ({ ...prev, projectId: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="">All Sambhajinagar Projects</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.locality})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Tag Badge</label>
                  <input
                    type="text"
                    value={offerForm.discountTag || '0% Stamp Duty'}
                    onChange={(e) => setOfferForm(prev => ({ ...prev, discountTag: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Value</label>
                  <input
                    type="text"
                    value={offerForm.discountValue || '₹ 50,000'}
                    onChange={(e) => setOfferForm(prev => ({ ...prev, discountValue: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Valid Till Date</label>
                  <input
                    type="date"
                    value={offerForm.validTill || '2026-12-31'}
                    onChange={(e) => setOfferForm(prev => ({ ...prev, validTill: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Terms & Conditions</label>
                <textarea
                  rows={2}
                  value={offerForm.terms || ''}
                  onChange={(e) => setOfferForm(prev => ({ ...prev, terms: e.target.value }))}
                  placeholder="Terms of redemption, minimum flat configuration..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm"
                >
                  Save Project Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Replacer */}
      <CmsImageReplacerModal
        isOpen={replacerOpen}
        onClose={() => setReplacerOpen(false)}
        currentImageUrl={replacerTarget?.currentUrl || ''}
        imageTitle="Select Image Asset"
        onSelectImage={handleImageSelected}
      />

    </div>
  );
};
