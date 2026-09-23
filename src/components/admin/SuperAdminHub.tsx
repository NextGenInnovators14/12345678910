import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeCustomizerPanel } from './ThemeCustomizerPanel';
import { PageContentEditor } from './cms/PageContentEditor';
import { MediaLibrary } from './cms/MediaLibrary';
import { BlogNewsManager } from './cms/BlogNewsManager';
import { ProjectsPropertiesManager } from './cms/ProjectsPropertiesManager';
import { SiteWideSettingsManager } from './cms/SiteWideSettingsManager';
import { RealtorsClubCardsManager } from './cms/RealtorsClubCardsManager';
import { KnowledgeHubManager } from './cms/KnowledgeHubManager';
import { NavigationManager } from './cms/NavigationManager';
import { ServicesManager } from './cms/ServicesManager';
import { AdminHelpGuide } from './AdminHelpGuide';
import { AIWebsiteEditor } from './AIWebsiteEditor';
import { HomepageStudioManager } from './cms/HomepageStudioManager';
import { PropertiesInventoryManager } from './cms/PropertiesInventoryManager';
import { BackupRestoreManager } from './cms/BackupRestoreManager';
import { OffersManager } from './cms/OffersManager';
import { ContactManager } from './ContactManager';
import { BrokerPortal } from '../broker/BrokerPortal';
import { ServiceProviderPortal } from '../services/ServiceProviderPortal';
import { AffiliateManagementAdminTab } from './cms/AffiliateManagementAdminTab';
import { 
  Building2, 
  Users, 
  PhoneCall, 
  Trash2, 
  Settings, 
  Layers, 
  FileCheck, 
  Search, 
  Palette,
  Eye,
  FileText,
  FolderOpen,
  BookOpen,
  Sliders,
  Sparkles,
  Award,
  GraduationCap,
  Compass,
  Wrench,
  HelpCircle,
  Tag,
  Menu,
  X,
  ExternalLink,
  Plus,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Database,
  ArrowRight,
  TrendingUp,
  Landmark,
  Star
} from 'lucide-react';
import { formatPriceINR } from '../../utils/propertyUtils';

export type AdminTab = 
  | 'overview'
  | 'homepage_studio'
  | 'properties'
  | 'projects'
  | 'services'
  | 'offers'
  | 'leads'
  | 'bookings'
  | 'affiliates_admin'
  | 'broker_applications'
  | 'service_provider_applications'
  | 'realtors_clubs'
  | 'knowledge_hub'
  | 'cms_blogs'
  | 'cms_navigation'
  | 'cms_pages'
  | 'theme'
  | 'media'
  | 'contact'
  | 'backup_restore'
  | 'ai_editor'
  | 'settings'
  | 'help';

interface NavGroup {
  title: string;
  items: Array<{
    id: AdminTab;
    label: string;
    hint: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
  }>;
}

export const SuperAdminHub: React.FC = () => {
  const { 
    allProperties, 
    leads, 
    updateLeadStatus, 
    deleteLead, 
    serviceBookings, 
    settings, 
    updateSettings, 
    showToast,
    setActiveView,
    projects,
    offers,
    realtors,
    contactMessages
  } = useApp();

  const [activeTab, setActiveTabState] = useState<AdminTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickAddMenuOpen, setQuickAddMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Browser History Integration for Admin Tabs
  const hasReplacedInitialEntry = useRef(false);
  useEffect(() => {
    if (!hasReplacedInitialEntry.current) {
      hasReplacedInitialEntry.current = true;
      try {
        window.history.replaceState({ ...(window.history.state || {}), adminTab: activeTab }, '');
      } catch {}
    }

    const onPopState = (e: PopStateEvent) => {
      const tab = e.state?.adminTab as AdminTab | undefined;
      if (tab) setActiveTabState(tab);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeTab]);

  const setActiveTab = (tab: AdminTab) => {
    if (tab === activeTab) return;
    try {
      window.history.pushState({ ...(window.history.state || {}), adminTab: tab }, '');
    } catch {}
    setActiveTabState(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalListings = allProperties.length;
  const verifiedListings = allProperties.filter(p => p.verified).length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalBookings = serviceBookings.length;

  const NAV_GROUPS: NavGroup[] = [
    {
      title: 'Command Center',
      items: [
        { id: 'overview', label: 'Dashboard & Cockpit', hint: 'Sab kuch ek nazar mein', icon: Layers },
        { id: 'homepage_studio', label: 'Homepage Master Studio', hint: '19 sections visual control', icon: Eye, badge: 'New', badgeColor: 'bg-emerald-500 text-white' }
      ]
    },
    {
      title: 'Real Estate Catalog',
      items: [
        { id: 'properties', label: 'Properties Inventory', hint: 'Add, edit, price, photos', icon: Building2, badge: totalListings, badgeColor: 'bg-blue-600 text-white' },
        { id: 'projects', label: 'Mega Townships & Projects', hint: 'RERA registered projects', icon: Landmark, badge: projects.length, badgeColor: 'bg-indigo-600 text-white' },
        { id: 'services', label: 'Doorstep Home Services', hint: 'Painting, cleaning, packers', icon: Wrench },
        { id: 'offers', label: 'Offers & Campaigns', hint: 'Discounts & festive vouchers', icon: Tag, badge: offers.length }
      ]
    },
    {
      title: 'Customer Relations (CRM)',
      items: [
        { id: 'leads', label: 'Buyer & Inquiry Leads', hint: 'Direct WhatsApp matching', icon: Users, badge: newLeads > 0 ? `${newLeads} New` : leads.length, badgeColor: newLeads > 0 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-700' },
        { id: 'bookings', label: 'Service Bookings', hint: 'Doorstep service orders', icon: FileCheck, badge: totalBookings },
        { id: 'contact', label: 'Contact Messages', hint: 'Public form submissions', icon: PhoneCall, badge: contactMessages?.length || 0 }
      ]
    },
    {
      title: 'Partners & Network',
      items: [
        { id: 'affiliates_admin', label: 'Affiliate Partners & Referrals', hint: 'Approvals, owner contacts & commission payouts', icon: Award, badge: 'Active Hub', badgeColor: 'bg-emerald-600 text-white' },
        { id: 'broker_applications', label: 'Broker Hub Applications', hint: 'Realtor KYC & approvals', icon: Users, badge: realtors.length },
        { id: 'service_provider_applications', label: 'Service Providers KYC', hint: 'Vendor approvals & rate cards', icon: ShieldCheck },
        { id: 'realtors_clubs', label: 'Two Clubs Configuration', hint: 'Realtor & Affiliate clubs', icon: Star }
      ]
    },
    {
      title: 'Website Content & CMS',
      items: [
        { id: 'cms_navigation', label: 'Header & Navigation Menu', hint: 'Top navbar links & pills', icon: Compass },
        { id: 'cms_pages', label: 'Pages Content (About/Legal)', hint: 'Static pages copy & story', icon: FileText },
        { id: 'knowledge_hub', label: 'Knowledge Hub & Academy', hint: 'Guides & market trends', icon: GraduationCap },
        { id: 'cms_blogs', label: 'News & Blog Articles', hint: 'Property news updates', icon: BookOpen },
        { id: 'media', label: 'Media Vault (Images/Files)', hint: 'All uploaded asset URLs', icon: FolderOpen }
      ]
    },
    {
      title: 'Brand, System & Backups',
      items: [
        { id: 'theme', label: 'Brand Styling & Colors', hint: 'Logo, colors & appearance', icon: Palette },
        { id: 'backup_restore', label: 'Backup, Restore & Reset', hint: '1-Click JSON data backup', icon: Database, badge: 'Crucial', badgeColor: 'bg-purple-600 text-white' },
        { id: 'ai_editor', label: 'AI Website Assistant', hint: 'Gemini AI site copilot', icon: Sparkles },
        { id: 'settings', label: 'Platform Master Settings', hint: 'Helplines, payment & SMS', icon: Settings },
        { id: 'help', label: 'Admin User Guide', hint: 'Kaise use karein step-by-step', icon: HelpCircle }
      ]
    }
  ];

  // Filtered navigation items for search
  const filteredNavGroups = NAV_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => 
      !searchFilter.trim() || 
      item.label.toLowerCase().includes(searchFilter.toLowerCase()) || 
      item.hint.toLowerCase().includes(searchFilter.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white shadow-md">
                A
              </div>
              <div>
                <span className="font-black text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                  Auricity <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">ADMIN</span>
                </span>
                <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">Full Website Management Hub</p>
              </div>
            </div>
          </div>

          {/* Center Search / Status */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-64 lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Jump to any admin section…"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
              {searchFilter && (
                <button onClick={() => setSearchFilter('')} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Synced
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Quick Add Dropdown */}
            <div className="relative">
              <button
                onClick={() => setQuickAddMenuOpen(!quickAddMenuOpen)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">+ Quick Add</span>
              </button>
              {quickAddMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in duration-150">
                  <button
                    onClick={() => { setActiveTab('properties'); setQuickAddMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-blue-50 hover:text-[#1E4FA8] flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-blue-600" /> + Add Property
                  </button>
                  <button
                    onClick={() => { setActiveTab('projects'); setQuickAddMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-blue-50 hover:text-[#1E4FA8] flex items-center gap-2"
                  >
                    <Landmark className="w-4 h-4 text-indigo-600" /> + Add Mega Project
                  </button>
                  <button
                    onClick={() => { setActiveTab('services'); setQuickAddMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-blue-50 hover:text-[#1E4FA8] flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4 text-amber-600" /> + Add Service
                  </button>
                  <button
                    onClick={() => { setActiveTab('offers'); setQuickAddMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-blue-50 hover:text-[#1E4FA8] flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4 text-emerald-600" /> + Add Offer Voucher
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => { setActiveTab('homepage_studio'); setQuickAddMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-blue-50 hover:text-[#1E4FA8] flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-purple-600" /> Edit Homepage Sections
                  </button>
                </div>
              )}
            </div>

            {/* View Live Website Button */}
            <button
              onClick={() => setActiveView('home')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
              title="Return to public customer website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">View Live Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        {/* Navigation Sidebar (Desktop + Mobile Drawer) */}
        <aside className={`lg:w-72 shrink-0 w-full ${
          mobileMenuOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto">
            {filteredNavGroups.map(group => (
              <div key={group.title} className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2 block">
                  {group.title}
                </span>
                <div className="space-y-1">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2.5 ${
                          isActive 
                            ? 'bg-[#1E4FA8] text-white shadow-md' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          <div className="min-w-0">
                            <p className="text-xs font-black truncate">{item.label}</p>
                            <p className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                              {item.hint}
                            </p>
                          </div>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                            item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600')
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Primary Content View Area */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          {/* TAB 1: EXECUTIVE COCKPIT / OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Executive Hero Banner */}
              <div className="bg-gradient-to-r from-blue-900 via-[#1E4FA8] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                      Admin Command Center
                    </span>
                    <span className="text-xs text-blue-200">Auricity v14</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                    Welcome to Your Control Hub
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                    Every piece of Auricity is 100% customizable from here: homepage banners, verified properties, townhouses, doorstep services, customer leads, and bank loans.
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={() => setActiveTab('homepage_studio')}
                      className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" /> Open Homepage Studio
                    </button>
                    <button
                      onClick={() => setActiveTab('properties')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      <Building2 className="w-4 h-4" /> Manage Properties ({totalListings})
                    </button>
                    <button
                      onClick={() => setActiveTab('backup_restore')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      <Database className="w-4 h-4" /> Backup Website JSON
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('properties')}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1 hover:border-blue-400 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Properties</span>
                  <p className="text-3xl font-black text-slate-900">{totalListings}</p>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {verifiedListings} 100% Verified
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('leads')}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1 hover:border-amber-400 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Inquiry Leads</span>
                  <p className="text-3xl font-black text-[#F2621E]">{leads.length}</p>
                  <span className="text-[11px] font-bold text-amber-600">
                    {newLeads} Pending Action
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1 hover:border-emerald-400 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Doorstep Orders</span>
                  <p className="text-3xl font-black text-emerald-600">{totalBookings}</p>
                  <span className="text-[11px] font-medium text-slate-500">Packers, Legal, Cleaning</span>
                </div>

                <div 
                  onClick={() => setActiveTab('projects')}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1 hover:border-purple-400 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Mega Townships</span>
                  <p className="text-3xl font-black text-indigo-600">{projects.length}</p>
                  <span className="text-[11px] font-medium text-slate-500">RERA Approved Projects</span>
                </div>
              </div>

              {/* 4 Feature Gateways */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                      Visual Control
                    </span>
                    <h3 className="font-black text-lg text-slate-900">
                      19 Homepage Sections Studio
                    </h3>
                    <p className="text-xs text-slate-500">
                      Reorder sections with drag/arrows, toggle visibility, customize headlines, hero search tabs, top localities, 4 CTA cards, bank loans, and buyer reviews.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('homepage_studio')}
                    className="w-full py-3 rounded-2xl bg-[#1E4FA8] text-white font-black text-xs flex items-center justify-center gap-1.5 hover:bg-blue-700 transition-all"
                  >
                    Open Homepage Studio <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      Inventory Engine
                    </span>
                    <h3 className="font-black text-lg text-slate-900">
                      Properties Inventory Master
                    </h3>
                    <p className="text-xs text-slate-500">
                      Add and edit properties for Sale, Rent, PG, Commercial and NA plots. Configure custom prices, photos, amenities, and 100% verified badges.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('properties')}
                    className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-all"
                  >
                    Manage Property Listings <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Latest Leads Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-slate-900">Recent Customer Inquiries</h3>
                    <p className="text-xs text-slate-500">Direct inquiries from property pages</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-[#1E4FA8] hover:underline"
                  >
                    View All {leads.length} Leads →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {leads.slice(0, 4).map(lead => (
                    <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-black text-slate-900">{lead.name} • <span className="text-[#1E4FA8] font-mono">{lead.phone}</span></div>
                        <div className="text-[11px] text-slate-500">{lead.propertyTitle || 'General Property Inquiry'} ({lead.preferredLocality})</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          lead.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {lead.status}
                        </span>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1 text-[11px]"
                        >
                          <PhoneCall className="w-3 h-3" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOMEPAGE MASTER STUDIO */}
          {activeTab === 'homepage_studio' && (
            <HomepageStudioManager />
          )}

          {/* TAB 3: PROPERTIES INVENTORY (FULL CRUD) */}
          {activeTab === 'properties' && (
            <PropertiesInventoryManager />
          )}

          {/* TAB 4: MEGA PROJECTS */}
          {activeTab === 'projects' && (
            <ProjectsPropertiesManager />
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <ServicesManager />
          )}

          {/* TAB 6: OFFERS */}
          {activeTab === 'offers' && (
            <OffersManager />
          )}

          {/* TAB 7: LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    Inquiry Leads & Buyer Matching CRM ({leads.length})
                  </h3>
                  <p className="text-xs text-slate-500">Connect instantly with interested buyers via direct WhatsApp or phone call.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map(lead => (
                  <div key={lead.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-black text-sm text-slate-900">{lead.name}</h4>
                        <p className="text-xs font-mono text-[#1E4FA8] font-bold">{lead.phone}</p>
                      </div>
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          updateLeadStatus(lead.id, e.target.value as any);
                          showToast('Lead status updated', 'success');
                        }}
                        className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-2.5 py-1"
                      >
                        <option value="new">New Inquiry</option>
                        <option value="contacted">Contacted</option>
                        <option value="site_visit_scheduled">Site Visit Scheduled</option>
                        <option value="closed">Deal Closed</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div><strong>Property:</strong> {lead.propertyTitle || 'General'}</div>
                      <div><strong>Locality:</strong> {lead.preferredLocality} • <strong>Budget:</strong> {lead.budget || 'Flexible'}</div>
                      {lead.message && (
                        <div className="italic bg-white p-2.5 rounded-xl border border-slate-200/80 mt-1 text-slate-700">
                          "{lead.message}"
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Buyer
                      </a>
                      <button
                        onClick={() => {
                          if (confirm(`Delete the inquiry from "${lead.name}"?`)) {
                            deleteLead(lead.id);
                            showToast('Lead deleted', 'info');
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 text-xs font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SERVICE BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-black text-lg text-slate-900">
                Doorstep Service Orders ({serviceBookings.length})
              </h3>
              <div className="space-y-3">
                {serviceBookings.map(b => (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{b.serviceName}</h4>
                      <p className="text-slate-500">Customer: <b>{b.customerName}</b> • Phone: <b className="font-mono text-blue-600">{b.customerPhone}</b></p>
                      <p className="text-slate-400 text-[11px]">Address: {b.customerAddress} • Date: {b.scheduledDate}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0">
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: AFFILIATE PARTNERS & REFERRAL DESK */}
          {activeTab === 'affiliates_admin' && (
            <AffiliateManagementAdminTab />
          )}

          {/* TAB 9: BROKER APPLICATIONS */}
          {activeTab === 'broker_applications' && (
            <BrokerPortal mode="admin" />
          )}

          {/* TAB 10: SERVICE PROVIDERS KYC */}
          {activeTab === 'service_provider_applications' && (
            <ServiceProviderPortal mode="admin" />
          )}

          {/* TAB 11: REALTORS & TWO CLUBS */}
          {activeTab === 'realtors_clubs' && (
            <RealtorsClubCardsManager />
          )}

          {/* TAB 12: KNOWLEDGE HUB */}
          {activeTab === 'knowledge_hub' && (
            <KnowledgeHubManager />
          )}

          {/* TAB 13: BLOGS & NEWS */}
          {activeTab === 'cms_blogs' && (
            <BlogNewsManager />
          )}

          {/* TAB 14: NAVIGATION & MENU */}
          {activeTab === 'cms_navigation' && (
            <NavigationManager />
          )}

          {/* TAB 15: PAGES CONTENT (ABOUT, LEGAL, ETC.) */}
          {activeTab === 'cms_pages' && (
            <PageContentEditor />
          )}

          {/* TAB 16: THEME & BRANDING */}
          {activeTab === 'theme' && (
            <ThemeCustomizerPanel />
          )}

          {/* TAB 17: MEDIA VAULT */}
          {activeTab === 'media' && (
            <MediaLibrary />
          )}

          {/* TAB 18: CONTACT FORM & MESSAGES */}
          {activeTab === 'contact' && (
            <ContactManager />
          )}

          {/* TAB 19: BACKUP & RESTORE */}
          {activeTab === 'backup_restore' && (
            <BackupRestoreManager />
          )}

          {/* TAB 20: AI WEBSITE ASSISTANT */}
          {activeTab === 'ai_editor' && (
            <AIWebsiteEditor />
          )}

          {/* TAB 21: PLATFORM SETTINGS */}
          {activeTab === 'settings' && (
            <SiteWideSettingsManager />
          )}

          {/* TAB 22: ADMIN HELP GUIDE */}
          {activeTab === 'help' && (
            <AdminHelpGuide onNavigate={(tab) => setActiveTab(tab as AdminTab)} />
          )}
        </main>
      </div>
    </div>
  );
};
