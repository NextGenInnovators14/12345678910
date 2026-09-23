import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { NavMenuItem, NavSubItem, NavigationConfig, PartnerLogoItem } from '../../../types';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  Edit, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Save, 
  RotateCcw,
  Percent, 
  PhoneCall, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  ChevronDown, 
  Check, 
  X,
  Building2,
  Home,
  Briefcase,
  Gift,
  Wrench,
  Award,
  CreditCard,
  Lock
} from 'lucide-react';
import { INITIAL_NAVIGATION_CONFIG } from '../../../data/cmsInitialData';

export const NavigationManager: React.FC = () => {
  const { navigationConfig, updateNavigationConfig, showToast } = useApp();

  const [config, setConfig] = useState<NavigationConfig>(() => {
    return navigationConfig || INITIAL_NAVIGATION_CONFIG;
  });

  const [activeSubTab, setActiveSubTab] = useState<'menu' | 'topbar' | 'header' | 'footer' | 'partners'>('menu');

  // Nav Item Modal
  const [editingItem, setEditingItem] = useState<NavMenuItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  useModalBackHandler(isItemModalOpen, () => setIsItemModalOpen(false));

  // Sub Item Modal inside Nav Item
  const [editingSubItem, setEditingSubItem] = useState<{ parentId: string; subItem: NavSubItem | null } | null>(null);

  const handleSaveConfig = () => {
    updateNavigationConfig(config);
    showToast('Navigation & Header/Footer settings saved successfully!', 'success');
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all navigation settings to initial defaults?')) {
      setConfig(INITIAL_NAVIGATION_CONFIG);
      updateNavigationConfig(INITIAL_NAVIGATION_CONFIG);
      showToast('Navigation settings reset to defaults!', 'info');
    }
  };

  // Nav Items Reordering & Modification
  const handleMoveNavItem = (index: number, direction: 'up' | 'down') => {
    const items = [...(config.navItems || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;

    // re-assign order
    const updated = items.map((it, idx) => ({ ...it, order: idx + 1 }));
    setConfig(prev => ({ ...prev, navItems: updated }));
    updateNavigationConfig({ ...config, navItems: updated });
    showToast('Menu order updated!', 'info');
  };

  const handleSaveNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.label) {
      showToast('Please enter a valid menu label', 'error');
      return;
    }

    const currentItems = [...(config.navItems || [])];
    const existingIndex = currentItems.findIndex(i => i.id === editingItem.id);

    if (existingIndex >= 0) {
      currentItems[existingIndex] = editingItem;
      showToast(`Updated "${editingItem.label}" menu item`, 'success');
    } else {
      currentItems.push({
        ...editingItem,
        order: currentItems.length + 1
      });
      showToast(`Added "${editingItem.label}" to navigation`, 'success');
    }

    const updatedConfig = { ...config, navItems: currentItems };
    setConfig(updatedConfig);
    updateNavigationConfig(updatedConfig);
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteNavItem = (id: string, label: string) => {
    if (confirm(`Remove "${label}" from the navigation bar?`)) {
      const currentItems = (config.navItems || []).filter(i => i.id !== id);
      const updated = currentItems.map((it, idx) => ({ ...it, order: idx + 1 }));
      const updatedConfig = { ...config, navItems: updated };
      setConfig(updatedConfig);
      updateNavigationConfig(updatedConfig);
      showToast(`Removed "${label}"`, 'info');
    }
  };

  // Sub-items handling
  const handleAddSubItem = (parentId: string) => {
    setEditingSubItem({
      parentId,
      subItem: {
        id: `sub-${Date.now()}`,
        label: 'New Category',
        viewOrUrl: 'properties'
      }
    });
  };

  const handleSaveSubItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubItem || !editingSubItem.subItem?.label) return;

    const parentId = editingSubItem.parentId;
    const sub = editingSubItem.subItem;

    const currentItems = (config.navItems || []).map(item => {
      if (item.id === parentId) {
        const subList = item.subItems ? [...item.subItems] : [];
        const existingIdx = subList.findIndex(s => s.id === sub.id);
        if (existingIdx >= 0) {
          subList[existingIdx] = sub;
        } else {
          subList.push(sub);
        }
        return { ...item, subItems: subList, isDropdown: true };
      }
      return item;
    });

    const updatedConfig = { ...config, navItems: currentItems };
    setConfig(updatedConfig);
    updateNavigationConfig(updatedConfig);
    setEditingSubItem(null);
    showToast('Dropdown option saved!', 'success');
  };

  const handleDeleteSubItem = (parentId: string, subId: string) => {
    const currentItems = (config.navItems || []).map(item => {
      if (item.id === parentId && item.subItems) {
        return {
          ...item,
          subItems: item.subItems.filter(s => s.id !== subId)
        };
      }
      return item;
    });

    const updatedConfig = { ...config, navItems: currentItems };
    setConfig(updatedConfig);
    updateNavigationConfig(updatedConfig);
    showToast('Dropdown sub-item deleted', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1E4FA8] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Site-Wide Header & Navigation Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Navigation, Announcement Bar & Footer Controls
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Edit menu labels, reorder links, configure dropdown sub-items, customize the "Loan" button link, and control top announcement bar details.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetToDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSaveConfig}
            className="px-4 py-2 rounded-xl bg-[#1E4FA8] hover:bg-[#163D85] text-white text-xs font-black transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-amber-300" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 overflow-x-auto text-xs font-bold">
        {[
          { id: 'menu', label: 'Main Menu & Dropdowns' },
          { id: 'topbar', label: 'Top Announcement Bar' },
          { id: 'header', label: 'Header & Loan CTA' },
          { id: 'footer', label: 'Footer Links & Info' },
          { id: 'partners', label: 'Partner Badges' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === tab.id 
                ? 'bg-white text-[#1E4FA8] shadow-xs font-black' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB TAB 1: Main Menu & Dropdowns */}
      {activeSubTab === 'menu' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Desktop & Mobile Navigation Menu Items ({config.navItems?.length || 0})
            </h3>
            <button
              onClick={() => {
                setEditingItem({
                  id: `nav-${Date.now()}`,
                  label: '',
                  viewOrUrl: 'properties',
                  order: (config.navItems?.length || 0) + 1,
                  published: true
                });
                setIsItemModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#F2621E] hover:bg-[#d95214] text-white text-xs font-black flex items-center space-x-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Menu Item</span>
            </button>
          </div>

          {/* List of items */}
          <div className="space-y-3">
            {(config.navItems || []).map((item, idx) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-amber-300 text-slate-950">
                            {item.badge}
                          </span>
                        )}
                        {item.isDropdown && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-[#1E4FA8]">
                            Dropdown ({item.subItems?.length || 0} items)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        Target View/Route: {item.viewOrUrl}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleMoveNavItem(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveNavItem(idx, 'down')}
                      disabled={idx === (config.navItems?.length || 0) - 1}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem({ ...item });
                        setIsItemModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-blue-50 text-[#1E4FA8] hover:bg-blue-100 cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNavItem(item.id, item.label)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sub-items accordion / nested items */}
                {item.isDropdown && (
                  <div className="pt-2 border-t border-slate-100 pl-9 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">Dropdown Sub-Items:</span>
                      <button
                        onClick={() => handleAddSubItem(item.id)}
                        className="text-xs font-bold text-[#1E4FA8] hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Sub-Item</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.subItems?.map(sub => (
                        <div 
                          key={sub.id}
                          className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-slate-800">{sub.label}</span>
                            <span className="text-slate-400 ml-2 font-mono">({sub.viewOrUrl}{sub.filterParam ? ` / ${sub.filterParam}` : ''})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => setEditingSubItem({ parentId: item.id, subItem: { ...sub } })}
                              className="p-1 rounded text-[#1E4FA8] hover:bg-blue-100 cursor-pointer"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubItem(item.id, sub.id)}
                              className="p-1 rounded text-red-600 hover:bg-red-100 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: Top Announcement Bar */}
      {activeSubTab === 'topbar' && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Top Announcement Bar Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
            <div className="space-y-1">
              <label className="text-slate-700">Left Announcement Text</label>
              <input
                type="text"
                value={config.topBarText || ''}
                onChange={e => setConfig(prev => ({ ...prev, topBarText: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="Are You A Property Owner? List Your Property"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">Orange Action Pill Text</label>
              <input
                type="text"
                value={config.topAnnouncementPillText || ''}
                onChange={e => setConfig(prev => ({ ...prev, topAnnouncementPillText: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="FREE"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">Pill Action View / URL</label>
              <input
                type="text"
                value={config.topAnnouncementPillAction || ''}
                onChange={e => setConfig(prev => ({ ...prev, topAnnouncementPillAction: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="post-property"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">WhatsApp Community Text</label>
              <input
                type="text"
                value={config.joinAuricityText || ''}
                onChange={e => setConfig(prev => ({ ...prev, joinAuricityText: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="Join Auricity"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-slate-700">WhatsApp Link</label>
              <input
                type="text"
                value={config.joinAuricityLink || ''}
                onChange={e => setConfig(prev => ({ ...prev, joinAuricityLink: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="https://wa.me/918010506030"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 3: Header & Loan CTA */}
      {activeSubTab === 'header' && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Header Helpline & Loan Button Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
            <div className="space-y-1">
              <label className="text-slate-700">Header Phone Display Label</label>
              <input
                type="text"
                value={config.headerPhoneDisplay || ''}
                onChange={e => setConfig(prev => ({ ...prev, headerPhoneDisplay: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="Call +91 8010506030"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">Header Phone Tel URI</label>
              <input
                type="text"
                value={config.headerPhoneText || ''}
                onChange={e => setConfig(prev => ({ ...prev, headerPhoneText: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="+918010506030"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">Brand Orange CTA Button Label</label>
              <input
                type="text"
                value={config.loanButtonText || ''}
                onChange={e => setConfig(prev => ({ ...prev, loanButtonText: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="Loan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">Loan Button Destination View / Link</label>
              <input
                type="text"
                value={config.loanButtonLink || ''}
                onChange={e => setConfig(prev => ({ ...prev, loanButtonLink: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="loan"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 4: Footer Links & Info */}
      {activeSubTab === 'footer' && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Footer Company Address, Compliance & Disclaimer
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
            <div className="space-y-1 md:col-span-2">
              <label className="text-slate-700">Registered Office Address</label>
              <input
                type="text"
                value={config.companyAddress || ''}
                onChange={e => setConfig(prev => ({ ...prev, companyAddress: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="CIDCO Cannaught Place & Jalna Road, Chhatrapati Sambhajinagar, MH 431005"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">CIN / ROC Registration No.</label>
              <input
                type="text"
                value={config.rocCin || ''}
                onChange={e => setConfig(prev => ({ ...prev, rocCin: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="U70109MH2024PTC418920"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700">PAN Number</label>
              <input
                type="text"
                value={config.panNo || ''}
                onChange={e => setConfig(prev => ({ ...prev, panNo: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
                placeholder="AAACA9812E"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-slate-700">Disclaimer Text</label>
              <textarea
                rows={2}
                value={config.disclaimerText || ''}
                onChange={e => setConfig(prev => ({ ...prev, disclaimerText: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 5: Partner Badges */}
      {activeSubTab === 'partners' && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Footer Partner & Compliance Badges ({config.partnerLogos?.length || 0})
            </h3>
            <button
              onClick={() => {
                const newPartner: PartnerLogoItem = {
                  id: `partner-${Date.now()}`,
                  name: 'Axis Bank',
                  category: 'bank',
                  subtext: 'Home Loan Facilitation'
                };
                const updated = [...(config.partnerLogos || []), newPartner];
                setConfig(prev => ({ ...prev, partnerLogos: updated }));
                updateNavigationConfig({ ...config, partnerLogos: updated });
                showToast('Added new partner badge', 'success');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-bold flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Partner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {(config.partnerLogos || []).map(p => (
              <div 
                key={p.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">{p.name}</p>
                  <p className="text-[10px] text-slate-500">{p.subtext || p.category}</p>
                </div>
                <button
                  onClick={() => {
                    const updated = (config.partnerLogos || []).filter(item => item.id !== p.id);
                    setConfig(prev => ({ ...prev, partnerLogos: updated }));
                    updateNavigationConfig({ ...config, partnerLogos: updated });
                    showToast('Partner removed', 'info');
                  }}
                  className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nav Item Modal */}
      {isItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingItem.id.startsWith('nav-') ? 'Edit Menu Item' : 'New Menu Item'}
              </h3>
              <button onClick={() => setIsItemModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNavItem} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-700">Menu Label *</label>
                <input
                  type="text"
                  required
                  value={editingItem.label}
                  onChange={e => setEditingItem(prev => prev ? { ...prev, label: e.target.value } : null)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1"
                  placeholder="e.g. Our Projects"
                />
              </div>

              <div>
                <label className="text-slate-700">Target View / Route</label>
                <input
                  type="text"
                  value={editingItem.viewOrUrl}
                  onChange={e => setEditingItem(prev => prev ? { ...prev, viewOrUrl: e.target.value } : null)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1"
                  placeholder="e.g. projects, properties, about, contact"
                />
              </div>

              <div>
                <label className="text-slate-700">Optional Badge</label>
                <input
                  type="text"
                  value={editingItem.badge || ''}
                  onChange={e => setEditingItem(prev => prev ? { ...prev, badge: e.target.value } : null)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1"
                  placeholder="e.g. Festive, New, 0% Fee"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="is-dropdown-chk"
                  checked={editingItem.isDropdown || false}
                  onChange={e => setEditingItem(prev => prev ? { ...prev, isDropdown: e.target.checked } : null)}
                  className="w-4 h-4 text-[#1E4FA8] rounded"
                />
                <label htmlFor="is-dropdown-chk" className="text-slate-700 cursor-pointer">
                  Enable Dropdown Sub-menu
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E4FA8] text-white font-bold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sub-item Modal */}
      {editingSubItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Dropdown Sub-Item
              </h3>
              <button onClick={() => setEditingSubItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubItem} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-700">Sub-item Label *</label>
                <input
                  type="text"
                  required
                  value={editingSubItem.subItem?.label || ''}
                  onChange={e => setEditingSubItem(prev => prev ? {
                    ...prev,
                    subItem: { ...prev.subItem!, label: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1"
                  placeholder="e.g. Residential, Commercial"
                />
              </div>

              <div>
                <label className="text-slate-700">Target View</label>
                <input
                  type="text"
                  value={editingSubItem.subItem?.viewOrUrl || ''}
                  onChange={e => setEditingSubItem(prev => prev ? {
                    ...prev,
                    subItem: { ...prev.subItem!, viewOrUrl: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1"
                  placeholder="e.g. properties, projects"
                />
              </div>

              <div>
                <label className="text-slate-700">Filter Parameter (Optional)</label>
                <input
                  type="text"
                  value={editingSubItem.subItem?.filterParam || ''}
                  onChange={e => setEditingSubItem(prev => prev ? {
                    ...prev,
                    subItem: { ...prev.subItem!, filterParam: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1"
                  placeholder="e.g. Residential, Commercial, Plots"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingSubItem(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#1E4FA8] text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
