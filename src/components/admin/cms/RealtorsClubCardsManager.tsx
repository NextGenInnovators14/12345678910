import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { Realtor, ClubCardsConfig, ClubCardItem } from '../../../types';
import { 
  Users, 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Sliders, 
  Phone, 
  Share2, 
  Search, 
  X,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

export const RealtorsClubCardsManager: React.FC = () => {
  const { 
    realtors, 
    addRealtor, 
    updateRealtor, 
    deleteRealtor, 
    clubCardsConfig, 
    updateClubCardsConfig, 
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'realtors' | 'club_cards'>('realtors');
  const [searchTerm, setSearchTerm] = useState('');

  // Realtor Add/Edit Modal State
  const [editingRealtor, setEditingRealtor] = useState<Realtor | null>(null);
  useModalBackHandler(Boolean(editingRealtor), () => setEditingRealtor(null));
  const [isNewRealtor, setIsNewRealtor] = useState(false);
  const [realtorForm, setRealtorForm] = useState<Partial<Realtor>>({});

  // Club Cards Local Edit State
  const [cardsForm, setCardsForm] = useState<ClubCardsConfig>(() => JSON.parse(JSON.stringify(clubCardsConfig)));
  const [newRealtorBenefit, setNewRealtorBenefit] = useState('');
  const [newAffiliateBenefit, setNewAffiliateBenefit] = useState('');

  // Open Edit Modal for Realtor
  const handleEditRealtor = (realtor: Realtor) => {
    setIsNewRealtor(false);
    setEditingRealtor(realtor);
    setRealtorForm({ ...realtor });
  };

  // Open Create Modal for Realtor
  const handleAddNewRealtor = () => {
    setIsNewRealtor(true);
    const newId = `realtor-${Date.now()}`;
    const newObj: Partial<Realtor> = {
      id: newId,
      name: '',
      agencyName: '',
      specialty: 'CIDCO & Garkheda Specialist',
      email: '',
      phone: '+91 ',
      whatsapp: '+91 ',
      reraNumber: 'A5150000',
      experienceYears: 5,
      areasCovered: ['CIDCO N-1 to N-4'],
      plan: 'Gold',
      planExpiry: '2027-12-31T00:00:00Z',
      kycStatus: 'Verified',
      verifiedBadge: true,
      showOnHomepage: true,
      featuredOrder: realtors.length + 1,
      activeListingsCount: 10,
      listingsQuota: 30,
      totalDeals: 35,
      rating: 4.8,
      reviewsCount: 20,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Professional RERA registered broker in Sambhajinagar.',
      slug: `realtor-${Date.now()}`,
      websiteConfig: {
        enabled: true,
        heroTitle: 'Find Your Dream Property in Sambhajinagar',
        tagline: 'Transparent & Verified Property Advisory',
        themeColor: '#1E4FA8',
        aboutText: 'Trusted real estate consulting.',
        servicesOffered: ['Residential Resale', 'Plot Purchase']
      },
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setEditingRealtor(newObj as Realtor);
    setRealtorForm(newObj);
  };

  // Save Realtor
  const handleSaveRealtor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realtorForm.name || !realtorForm.agencyName) {
      showToast('Please provide Realtor Name and Agency Name', 'warning');
      return;
    }

    if (isNewRealtor) {
      addRealtor(realtorForm as Realtor);
      showToast(`Realtor "${realtorForm.name}" created successfully!`, 'success');
    } else if (editingRealtor?.id) {
      updateRealtor(editingRealtor.id, realtorForm);
      showToast(`Realtor "${realtorForm.name}" updated successfully!`, 'success');
    }

    setEditingRealtor(null);
  };

  // Delete Realtor
  const handleDeleteRealtor = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove realtor "${name}"?`)) {
      deleteRealtor(id);
      showToast(`Realtor "${name}" removed.`, 'info');
    }
  };

  // Toggle Homepage Visibility for Realtor
  const handleToggleHomepage = (realtor: Realtor) => {
    const nextState = !realtor.showOnHomepage;
    updateRealtor(realtor.id, { showOnHomepage: nextState });
    showToast(`${realtor.name} ${nextState ? 'will now show on Homepage' : 'hidden from Homepage'}`, 'info');
  };

  // Filtered Realtors
  const filteredRealtors = realtors.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.specialty && r.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Club Cards Actions
  const handleSaveClubCards = () => {
    updateClubCardsConfig(cardsForm);
    showToast('Two Club Cards CMS settings updated successfully!', 'success');
  };

  // Card 1 Benefits
  const handleAddRealtorBenefit = () => {
    if (!newRealtorBenefit.trim()) return;
    setCardsForm(prev => ({
      ...prev,
      realtorsClub: {
        ...prev.realtorsClub,
        benefits: [...prev.realtorsClub.benefits, newRealtorBenefit.trim()]
      }
    }));
    setNewRealtorBenefit('');
  };

  const handleRemoveRealtorBenefit = (index: number) => {
    setCardsForm(prev => ({
      ...prev,
      realtorsClub: {
        ...prev.realtorsClub,
        benefits: prev.realtorsClub.benefits.filter((_, idx) => idx !== index)
      }
    }));
  };

  const handleMoveRealtorBenefit = (index: number, direction: 'up' | 'down') => {
    setCardsForm(prev => {
      const list = [...prev.realtorsClub.benefits];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIdx];
      list[targetIdx] = temp;
      return {
        ...prev,
        realtorsClub: {
          ...prev.realtorsClub,
          benefits: list
        }
      };
    });
  };

  // Card 2 Benefits
  const handleAddAffiliateBenefit = () => {
    if (!newAffiliateBenefit.trim()) return;
    setCardsForm(prev => ({
      ...prev,
      affiliatePartner: {
        ...prev.affiliatePartner,
        benefits: [...prev.affiliatePartner.benefits, newAffiliateBenefit.trim()]
      }
    }));
    setNewAffiliateBenefit('');
  };

  const handleRemoveAffiliateBenefit = (index: number) => {
    setCardsForm(prev => ({
      ...prev,
      affiliatePartner: {
        ...prev.affiliatePartner,
        benefits: prev.affiliatePartner.benefits.filter((_, idx) => idx !== index)
      }
    }));
  };

  const handleMoveAffiliateBenefit = (index: number, direction: 'up' | 'down') => {
    setCardsForm(prev => {
      const list = [...prev.affiliatePartner.benefits];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIdx];
      list[targetIdx] = temp;
      return {
        ...prev,
        affiliatePartner: {
          ...prev.affiliatePartner,
          benefits: list
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Sub-Tabs */}
      <div className="bg-[var(--surface)] p-5 rounded-3xl border border-[var(--border)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-[var(--text-primary)] flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#F2621E]" />
            <span>Verified Realtors & Two Club Cards CMS</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Manage verified agent directory profiles, homepage visibility toggles, and customize the Two Club Cards content.
          </p>
        </div>

        <div className="flex bg-[var(--surface-secondary)] p-1 rounded-2xl border border-[var(--border)] space-x-1">
          <button
            onClick={() => setActiveSubTab('realtors')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'realtors'
                ? 'bg-[#1E4FA8] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Realtors Directory ({realtors.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('club_cards')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'club_cards'
                ? 'bg-[#1E4FA8] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Two Club Cards CMS</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: REALTORS DIRECTORY MANAGEMENT */}
      {activeSubTab === 'realtors' && (
        <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search realtor by name, agency, specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--text-primary)]"
              />
            </div>

            <button
              onClick={handleAddNewRealtor}
              className="btn-theme-primary text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Realtor</span>
            </button>
          </div>

          {/* Realtors Table / Cards */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-secondary)] text-[var(--text-secondary)] uppercase font-black tracking-wider text-[10px] border-b border-[var(--border)]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Realtor / Photo</th>
                  <th className="py-3 px-3">Specialty / Locality</th>
                  <th className="py-3 px-3">Rating & Deals</th>
                  <th className="py-3 px-3">Contact & RERA</th>
                  <th className="py-3 px-3 text-center">Homepage</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredRealtors.map((r) => (
                  <tr key={r.id} className="hover:bg-[var(--surface-secondary)]/50 transition-colors">
                    
                    {/* Photo and Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={r.avatar}
                            alt={r.name}
                            className="w-11 h-11 rounded-xl object-cover border border-[var(--border)] shadow-2xs"
                          />
                          {r.verifiedBadge !== false && (
                            <div className="absolute -bottom-1 -right-1 bg-[#F2621E] text-white rounded-full p-0.5 shadow-2xs">
                              <ShieldCheck className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-black text-[var(--text-primary)] text-sm">{r.name}</div>
                          <div className="text-[11px] font-bold text-[#1E4FA8]">{r.agencyName}</div>
                        </div>
                      </div>
                    </td>

                    {/* Specialty */}
                    <td className="py-3.5 px-3">
                      <span className="inline-block bg-[var(--primary-light)] text-[#1E4FA8] text-[11px] font-bold px-2 py-0.5 rounded-md border border-[#1E4FA8]/20">
                        {r.specialty || 'General Consultant'}
                      </span>
                      <div className="text-[10px] text-[var(--text-secondary)] mt-1 truncate max-w-[160px]">
                        {r.areasCovered?.join(', ')}
                      </div>
                    </td>

                    {/* Rating & Deals */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1 font-bold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{r.rating || 4.8}★</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        {r.totalDeals || 40}+ Deals Closed
                      </div>
                    </td>

                    {/* Contact & RERA */}
                    <td className="py-3.5 px-3">
                      <div className="font-mono font-bold text-[var(--text-primary)]">{r.phone}</div>
                      <div className="text-[10px] text-slate-500 font-mono">RERA: {r.reraNumber}</div>
                    </td>

                    {/* Homepage Toggle */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => handleToggleHomepage(r)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                          r.showOnHomepage !== false
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 text-slate-500 border border-slate-300'
                        }`}
                        title="Click to toggle homepage visibility"
                      >
                        {r.showOnHomepage !== false ? '✓ Visible' : 'Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditRealtor(r)}
                          className="p-1.5 rounded-lg bg-blue-50 text-[#1E4FA8] hover:bg-blue-100 transition-colors cursor-pointer"
                          title="Edit Profile"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteRealtor(r.id, r.name)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                          title="Delete Realtor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: TWO CLUB CARDS CMS */}
      {activeSubTab === 'club_cards' && (
        <div className="space-y-6">
          
          {/* Section Heading Settings */}
          <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-wider">
              Section Header & Description
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Section Main Title
                </label>
                <input
                  type="text"
                  value={cardsForm.sectionTitle || ''}
                  onChange={(e) => setCardsForm({ ...cardsForm, sectionTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Section Subtitle / Description
                </label>
                <input
                  type="text"
                  value={cardsForm.sectionSubtitle || ''}
                  onChange={(e) => setCardsForm({ ...cardsForm, sectionSubtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Cards 1 & 2 Side-by-Side Editors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Card 1: Realtor's Club Editor */}
            <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-[#1E4FA8]" />
                  <h4 className="font-black text-base text-[#1E4FA8]">Card 1: Realtor's Club</h4>
                </div>
                <span className="bg-blue-100 text-[#1E4FA8] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Broker Focus
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Card Heading</label>
                  <input
                    type="text"
                    value={cardsForm.realtorsClub.heading}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      realtorsClub: { ...cardsForm.realtorsClub, heading: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Subheading</label>
                  <input
                    type="text"
                    value={cardsForm.realtorsClub.subheading || ''}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      realtorsClub: { ...cardsForm.realtorsClub, subheading: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Tagline / Description</label>
                  <textarea
                    rows={2}
                    value={cardsForm.realtorsClub.tagline || ''}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      realtorsClub: { ...cardsForm.realtorsClub, tagline: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Badge Label</label>
                    <input
                      type="text"
                      value={cardsForm.realtorsClub.badgeText || ''}
                      onChange={(e) => setCardsForm({
                        ...cardsForm,
                        realtorsClub: { ...cardsForm.realtorsClub, badgeText: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button Text</label>
                    <input
                      type="text"
                      value={cardsForm.realtorsClub.buttonText || ''}
                      onChange={(e) => setCardsForm({
                        ...cardsForm,
                        realtorsClub: { ...cardsForm.realtorsClub, buttonText: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                    "Join Now" Destination Link / Route
                  </label>
                  <select
                    value={cardsForm.realtorsClub.buttonLink || 'broker-hub'}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      realtorsClub: { ...cardsForm.realtorsClub, buttonLink: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-bold"
                  >
                    <option value="broker-hub">Broker Hub & Join Club (Default)</option>
                    <option value="realtors">Realtors Directory View</option>
                    <option value="post-property">Post Direct Property</option>
                    <option value="affiliate-modal">Affiliate Modal</option>
                  </select>
                </div>

                {/* Benefits List Editor */}
                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[var(--text-primary)]">
                    Card Benefits Bullet Points ({cardsForm.realtorsClub.benefits.length})
                  </label>

                  <div className="space-y-2">
                    {cardsForm.realtorsClub.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-[var(--surface-secondary)] p-2 rounded-xl border border-[var(--border)]">
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCardsForm(prev => {
                              const updated = [...prev.realtorsClub.benefits];
                              updated[idx] = val;
                              return {
                                ...prev,
                                realtorsClub: { ...prev.realtorsClub, benefits: updated }
                              };
                            });
                          }}
                          className="flex-1 px-2 py-1 bg-transparent text-xs text-[var(--text-primary)] font-medium focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => handleMoveRealtorBenefit(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveRealtorBenefit(idx, 'down')}
                          disabled={idx === cardsForm.realtorsClub.benefits.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveRealtorBenefit(idx)}
                          className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                          title="Delete Bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Benefit Input */}
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add new benefit bullet point..."
                      value={newRealtorBenefit}
                      onChange={(e) => setNewRealtorBenefit(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRealtorBenefit())}
                      className="flex-1 px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                    <button
                      type="button"
                      onClick={handleAddRealtorBenefit}
                      className="btn-theme-primary text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: Affiliate Partner Editor */}
            <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-[#F2621E]" />
                  <h4 className="font-black text-base text-[#1E4FA8]">Card 2: Affiliate Partner</h4>
                </div>
                <span className="bg-orange-100 text-[#F2621E] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Referrals Focus
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Card Heading</label>
                  <input
                    type="text"
                    value={cardsForm.affiliatePartner.heading}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      affiliatePartner: { ...cardsForm.affiliatePartner, heading: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Subheading</label>
                  <input
                    type="text"
                    value={cardsForm.affiliatePartner.subheading || ''}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      affiliatePartner: { ...cardsForm.affiliatePartner, subheading: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Tagline / Description</label>
                  <textarea
                    rows={2}
                    value={cardsForm.affiliatePartner.tagline || ''}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      affiliatePartner: { ...cardsForm.affiliatePartner, tagline: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Badge Label</label>
                    <input
                      type="text"
                      value={cardsForm.affiliatePartner.badgeText || ''}
                      onChange={(e) => setCardsForm({
                        ...cardsForm,
                        affiliatePartner: { ...cardsForm.affiliatePartner, badgeText: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button Text</label>
                    <input
                      type="text"
                      value={cardsForm.affiliatePartner.buttonText || ''}
                      onChange={(e) => setCardsForm({
                        ...cardsForm,
                        affiliatePartner: { ...cardsForm.affiliatePartner, buttonText: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                    "Join Now" Destination Link / Route
                  </label>
                  <select
                    value={cardsForm.affiliatePartner.buttonLink || 'affiliate-modal'}
                    onChange={(e) => setCardsForm({
                      ...cardsForm,
                      affiliatePartner: { ...cardsForm.affiliatePartner, buttonLink: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-bold"
                  >
                    <option value="affiliate-modal">Open Affiliate Partner Modal (Default)</option>
                    <option value="broker-hub">Broker Hub & Network</option>
                    <option value="services">Home Services Portal</option>
                    <option value="post-property">Post Direct Property</option>
                  </select>
                </div>

                {/* Benefits List Editor */}
                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[var(--text-primary)]">
                    Card Benefits Bullet Points ({cardsForm.affiliatePartner.benefits.length})
                  </label>

                  <div className="space-y-2">
                    {cardsForm.affiliatePartner.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-[var(--surface-secondary)] p-2 rounded-xl border border-[var(--border)]">
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCardsForm(prev => {
                              const updated = [...prev.affiliatePartner.benefits];
                              updated[idx] = val;
                              return {
                                ...prev,
                                affiliatePartner: { ...prev.affiliatePartner, benefits: updated }
                              };
                            });
                          }}
                          className="flex-1 px-2 py-1 bg-transparent text-xs text-[var(--text-primary)] font-medium focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => handleMoveAffiliateBenefit(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveAffiliateBenefit(idx, 'down')}
                          disabled={idx === cardsForm.affiliatePartner.benefits.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveAffiliateBenefit(idx)}
                          className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                          title="Delete Bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Benefit Input */}
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add new benefit bullet point..."
                      value={newAffiliateBenefit}
                      onChange={(e) => setNewAffiliateBenefit(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAffiliateBenefit())}
                      className="flex-1 px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                    <button
                      type="button"
                      onClick={handleAddAffiliateBenefit}
                      className="btn-theme-primary text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end space-x-3 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)]">
            <button
              onClick={() => setCardsForm(JSON.parse(JSON.stringify(clubCardsConfig)))}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Reset Changes
            </button>
            <button
              onClick={handleSaveClubCards}
              className="btn-theme-primary text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Two Club Cards</span>
            </button>
          </div>

        </div>
      )}

      {/* Realtor Edit / Add Modal */}
      {editingRealtor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[var(--surface)] w-full max-w-2xl rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-black text-lg text-[var(--text-primary)] flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#1E4FA8]" />
                <span>{isNewRealtor ? 'Add New Realtor Profile' : `Edit Profile: ${realtorForm.name}`}</span>
              </h3>
              <button
                onClick={() => setEditingRealtor(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRealtor} className="space-y-4">
              
              {/* Photo & Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Patil"
                    value={realtorForm.name || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Agency / Firm Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marathwada Real Estates"
                    value={realtorForm.agencyName || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, agencyName: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Specialty & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                    Specialty / Area Focus * (e.g. "CIDCO & Garkheda Specialist")
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CIDCO & Garkheda Specialist"
                    value={realtorForm.specialty || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, specialty: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[#1E4FA8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Rating (e.g. 4.9)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="5.0"
                    value={realtorForm.rating || 4.8}
                    onChange={(e) => setRealtorForm({ ...realtorForm, rating: parseFloat(e.target.value) || 4.8 })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-bold"
                  />
                </div>
              </div>

              {/* Avatar URL with Preview */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Profile Photo URL (Upload or paste image link)
                </label>
                <div className="flex items-center space-x-3">
                  <img
                    src={realtorForm.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover border border-[var(--border)] shrink-0"
                  />
                  <input
                    type="url"
                    value={realtorForm.avatar || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                </div>
              </div>

              {/* Phone, WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={realtorForm.phone || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, phone: e.target.value })}
                    placeholder="+91 80105 06030"
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={realtorForm.whatsapp || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, whatsapp: e.target.value })}
                    placeholder="+918010506030"
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">MahaRERA Number</label>
                  <input
                    type="text"
                    value={realtorForm.reraNumber || ''}
                    onChange={(e) => setRealtorForm({ ...realtorForm, reraNumber: e.target.value })}
                    placeholder="A51500001892"
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                </div>
              </div>

              {/* Experience & Deals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={realtorForm.experienceYears || 5}
                    onChange={(e) => setRealtorForm({ ...realtorForm, experienceYears: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Total Closed Deals</label>
                  <input
                    type="number"
                    value={realtorForm.totalDeals || 30}
                    onChange={(e) => setRealtorForm({ ...realtorForm, totalDeals: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Toggles: Homepage Visibility & Verified Badge */}
              <div className="bg-[var(--surface-secondary)] p-4 rounded-2xl border border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={realtorForm.showOnHomepage !== false}
                    onChange={(e) => setRealtorForm({ ...realtorForm, showOnHomepage: e.target.checked })}
                    className="w-4 h-4 text-[#1E4FA8] rounded-sm focus:ring-[#1E4FA8]"
                  />
                  <div>
                    <span className="text-xs font-black text-[var(--text-primary)] block">Show on Homepage</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">Display in the homepage verified realtors row</span>
                  </div>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={realtorForm.verifiedBadge !== false}
                    onChange={(e) => setRealtorForm({ ...realtorForm, verifiedBadge: e.target.checked })}
                    className="w-4 h-4 text-[#F2621E] rounded-sm focus:ring-[#F2621E]"
                  />
                  <div>
                    <span className="text-xs font-black text-[var(--text-primary)] block">Verified Badge</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">Display Brand Orange verified badge</span>
                  </div>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setEditingRealtor(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-theme-primary text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNewRealtor ? 'Create Realtor' : 'Save Changes'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
