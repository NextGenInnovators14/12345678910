import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { CmsPageData } from '../../../types';
import { CmsImageReplacerModal } from './CmsImageReplacerModal';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { 
  Globe, 
  Save, 
  Eye, 
  RotateCcw, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  Layout, 
  Sparkles, 
  Tag, 
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Home,
  Info,
  Gift,
  Wrench,
  Users,
  BookOpen,
  PhoneCall,
  Scale
} from 'lucide-react';
import { INITIAL_CMS_PAGES } from '../../../data/cmsInitialData';
import { AboutUsPageEditor } from './AboutUsPageEditor';

export const PageContentEditor: React.FC = () => {
  const { cmsPages, updateCmsPage, updateCmsSection, setActiveView, showToast } = useApp();
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');

  // Image replacer state
  const [replacerOpen, setReplacerOpen] = useState<boolean>(false);
  useModalBackHandler(replacerOpen, () => setReplacerOpen(false));
  const [replacerTarget, setReplacerTarget] = useState<{ sectionId: string; fieldName: string; currentUrl: string } | null>(null);

  const currentPage: CmsPageData = cmsPages[selectedPageId] || INITIAL_CMS_PAGES[selectedPageId] || INITIAL_CMS_PAGES.home;
  const sections = currentPage.sections || {};
  const currentSection = sections[activeSectionId] || Object.values(sections)[0] || { id: 'default', name: 'Section' };

  const pageList = [
    { id: 'home', title: 'Home Page', icon: Home, route: 'home' },
    { id: 'about', title: 'About Us', icon: Info, route: 'about' },
    { id: 'projects', title: 'Projects & Townships', icon: Building, route: 'projects' },
    { id: 'properties', title: 'Properties Explorer', icon: Layout, route: 'properties' },
    { id: 'offers', title: 'Offers & Deals', icon: Gift, route: 'offers' },
    { id: 'services', title: 'Doorstep Services', icon: Wrench, route: 'services' },
    { id: 'realtors', title: 'Realtors & Brokers', icon: Users, route: 'realtor-portal' },
    { id: 'blogs', title: 'Blogs & News', icon: BookOpen, route: 'blogs' },
    { id: 'contact', title: 'Contact Us', icon: PhoneCall, route: 'contact' },
    { id: 'legal', title: 'Legal & MahaRERA', icon: Scale, route: 'legal' }
  ];

  const handleOpenImageReplacer = (sectionId: string, fieldName: string, currentUrl: string) => {
    setReplacerTarget({ sectionId, fieldName, currentUrl });
    setReplacerOpen(true);
  };

  const handleImageSelected = (newUrl: string) => {
    if (!replacerTarget) return;
    const { sectionId, fieldName } = replacerTarget;
    updateCmsSection(selectedPageId, sectionId, { [fieldName]: newUrl });
  };

  const handleResetDefaults = () => {
    if (window.confirm(`Reset "${currentPage.title}" content back to default factory settings?`)) {
      if (INITIAL_CMS_PAGES[selectedPageId]) {
        updateCmsPage(selectedPageId, INITIAL_CMS_PAGES[selectedPageId]);
        showToast('Page content reset to default!', 'info');
      }
    }
  };

  const handleSaveAll = () => {
    showToast(`Page "${currentPage.title}" published to live site successfully!`, 'success');
  };

  return (
    <div id="page-content-editor" className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Page Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-orange-100 text-[#F2621E] rounded-full uppercase tracking-wider">
              CMS • Manage Pages
            </span>
            <span className="text-xs text-slate-400">• Last saved: {currentPage.lastUpdated}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Page Content & Layout Editor
          </h2>
          <p className="text-xs text-slate-500">
            Customize headings, trust badges, button links, and swap images across every public page without code.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="cms-preview-page-btn"
            onClick={() => {
              const route = pageList.find(p => p.id === selectedPageId)?.route || 'home';
              setActiveView(route);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            Preview Live Page
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            id="cms-reset-page-btn"
            onClick={handleResetDefaults}
            className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1"
            title="Reset to factory text"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <button
            id="cms-save-page-btn"
            onClick={handleSaveAll}
            className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save & Publish
          </button>
        </div>
      </div>

      {/* Pages Navigation Strip */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {pageList.map((page) => {
            const Icon = page.icon;
            const isSelected = selectedPageId === page.id;
            return (
              <button
                key={page.id}
                id={`cms-page-tab-${page.id}`}
                onClick={() => {
                  setSelectedPageId(page.id);
                  const firstSec = Object.keys(cmsPages[page.id]?.sections || INITIAL_CMS_PAGES[page.id]?.sections || {})[0];
                  if (firstSec) setActiveSectionId(firstSec);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#1E4FA8] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-300' : 'text-slate-400'}`} />
                {page.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dedicated About Us Page Editor */}
      {selectedPageId === 'about' ? (
        <AboutUsPageEditor />
      ) : (
        <>
          {/* Page Meta & SEO Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1E4FA8]" />
            <h3 className="text-sm font-bold text-slate-900">Search Engine & Browser Meta Settings (SEO)</h3>
          </div>
          <span className="text-xs font-medium text-slate-500">Route URL: {currentPage.slug}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Page Browser Title (H1 / Title Tag)
            </label>
            <input
              id="cms-meta-title-input"
              type="text"
              value={currentPage.metaTitle || ''}
              onChange={(e) => updateCmsPage(selectedPageId, { metaTitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Search Engine Meta Description
            </label>
            <input
              id="cms-meta-desc-input"
              type="text"
              value={currentPage.metaDescription || ''}
              onChange={(e) => updateCmsPage(selectedPageId, { metaDescription: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
            />
          </div>
        </div>
      </div>

      {/* Section-by-Section Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Section List / Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
              Page Sections ({Object.keys(sections).length})
            </h4>

            {Object.entries(sections).map(([secKey, sec]) => {
              const isActive = activeSectionId === secKey;
              return (
                <button
                  key={secKey}
                  id={`cms-section-btn-${secKey}`}
                  onClick={() => setActiveSectionId(secKey)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between ${
                    isActive
                      ? 'bg-orange-50/80 border border-[#F2621E]/30 text-slate-900 shadow-sm'
                      : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#F2621E]' : 'bg-slate-300'}`} />
                      <p className={`text-xs font-bold ${isActive ? 'text-[#F2621E]' : 'text-slate-800'}`}>
                        {sec.name || secKey}
                      </p>
                    </div>
                    {sec.heading && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 pl-4">{sec.heading}</p>
                    )}
                  </div>
                  {sec.imageUrl && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      Image
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Form Editor */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  Editing Section
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {currentSection.name || activeSectionId}
                </h3>
              </div>
            </div>

            {/* Form Fields for the current section */}
            <div className="space-y-4">
              
              {/* Badge text (if present) */}
              {'badge' in currentSection && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Eyebrow / Tag Badge
                  </label>
                  <input
                    type="text"
                    value={currentSection.badge || ''}
                    onChange={(e) => updateCmsSection(selectedPageId, activeSectionId, { badge: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                  />
                </div>
              )}

              {/* Main Heading */}
              {'heading' in currentSection && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Main Headline (Heading)
                  </label>
                  <input
                    type="text"
                    value={currentSection.heading || ''}
                    onChange={(e) => updateCmsSection(selectedPageId, activeSectionId, { heading: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                  />
                </div>
              )}

              {/* Subheading */}
              {'subheading' in currentSection && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subheadline / Intro Text
                  </label>
                  <textarea
                    rows={2}
                    value={currentSection.subheading || ''}
                    onChange={(e) => updateCmsSection(selectedPageId, activeSectionId, { subheading: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                  />
                </div>
              )}

              {/* Long Body Text (if present) */}
              {'bodyText' in currentSection && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Description / Paragraph Content
                  </label>
                  <textarea
                    rows={4}
                    value={currentSection.bodyText || ''}
                    onChange={(e) => updateCmsSection(selectedPageId, activeSectionId, { bodyText: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                  />
                </div>
              )}

              {/* CTA Button Text & Link */}
              {'ctaText' in currentSection && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Action Button Text (CTA)
                    </label>
                    <input
                      type="text"
                      value={currentSection.ctaText || ''}
                      onChange={(e) => updateCmsSection(selectedPageId, activeSectionId, { ctaText: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination Link / Route
                    </label>
                    <input
                      type="text"
                      value={currentSection.ctaLink || ''}
                      onChange={(e) => updateCmsSection(selectedPageId, activeSectionId, { ctaLink: e.target.value })}
                      placeholder="e.g. properties, offers, services"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                    />
                  </div>
                </div>
              )}

              {/* SPECIALIZED EDITOR: WHY CHOOSE US (3 STACKED BLOCKS) */}
              {selectedPageId === 'home' && activeSectionId === 'whyChooseUs' && (
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      3 Stacked Differentiator Blocks
                    </h4>
                    <span className="text-[11px] font-bold text-[#F2621E] bg-orange-50 px-2 py-0.5 rounded">
                      Step 4 Live Controls
                    </span>
                  </div>

                  {/* Block 1: Brand Blue */}
                  <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#1E4FA8]" />
                        <span className="text-xs font-black text-[#1E4FA8]">Block 1: Brand Blue Block (Zero Brokerage)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={currentSection.customFields?.block1Title || 'Zero Brokerage'}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block1Title: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Icon</label>
                        <select
                          value={currentSection.customFields?.block1Icon || 'ShieldCheck'}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block1Icon: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="ShieldCheck">Shield Check (Checkmark Shield)</option>
                          <option value="CheckCircle2">Check Circle</option>
                          <option value="Percent">Percent Badge</option>
                          <option value="Zap">Zap Flash</option>
                          <option value="Award">Award Badge</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={currentSection.customFields?.block1Desc || ''}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block1Desc: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 2: Neutral / Brown-Gray */}
                  <div className="p-4 rounded-2xl border border-stone-300 bg-stone-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#3E3835]" />
                        <span className="text-xs font-black text-[#3E3835]">Block 2: Neutral/Brown-Gray Block (One Roof Services)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={currentSection.customFields?.block2Title || 'One Roof Services'}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block2Title: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Icon</label>
                        <select
                          value={currentSection.customFields?.block2Icon || 'ThumbsUp'}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block2Icon: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="ThumbsUp">Thumbs Up</option>
                          <option value="Layers">Layers / All-in-one</option>
                          <option value="HeartHandshake">Heart Handshake</option>
                          <option value="ShieldCheck">Shield Check</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={currentSection.customFields?.block2Desc || ''}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block2Desc: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 3: Brand Orange */}
                  <div className="p-4 rounded-2xl border border-orange-300 bg-orange-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#F2621E]" />
                        <span className="text-xs font-black text-[#F2621E]">Block 3: Brand Orange Block (Exciting Offers)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={currentSection.customFields?.block3Title || 'Exciting Offers'}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block3Title: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Icon</label>
                        <select
                          value={currentSection.customFields?.block3Icon || 'Award'}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block3Icon: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="Award">Award / Person Badge</option>
                          <option value="Sparkles">Sparkles Flash</option>
                          <option value="UserCheck">User Check</option>
                          <option value="Percent">Percent Tag</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={currentSection.customFields?.block3Desc || ''}
                          onChange={(e) => {
                            const custom = { ...(currentSection.customFields || {}), block3Desc: e.target.value };
                            updateCmsSection('home', 'whyChooseUs', { customFields: custom });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SPECIALIZED EDITOR: LOAN BANNER & BANK PARTNERS */}
              {selectedPageId === 'home' && activeSectionId === 'loanBanner' && (
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Loan Banner Partner Banks & CTAs
                    </h4>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      10 Partner Banks
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Secondary Button Text (EMI Calculator)
                      </label>
                      <input
                        type="text"
                        value={currentSection.customFields?.calcCtaText || 'EMI Calculator'}
                        onChange={(e) => {
                          const custom = { ...(currentSection.customFields || {}), calcCtaText: e.target.value };
                          updateCmsSection('home', 'loanBanner', { customFields: custom });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sub-Feature 1
                      </label>
                      <input
                        type="text"
                        value={currentSection.customFields?.subFeature1 || 'Zero Processing Fee'}
                        onChange={(e) => {
                          const custom = { ...(currentSection.customFields || {}), subFeature1: e.target.value };
                          updateCmsSection('home', 'loanBanner', { customFields: custom });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sub-Feature 2
                      </label>
                      <input
                        type="text"
                        value={currentSection.customFields?.subFeature2 || 'Doorstep Document Pickup'}
                        onChange={(e) => {
                          const custom = { ...(currentSection.customFields || {}), subFeature2: e.target.value };
                          updateCmsSection('home', 'loanBanner', { customFields: custom });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sub-Feature 3
                      </label>
                      <input
                        type="text"
                        value={currentSection.customFields?.subFeature3 || '48-Hour In-Principle Sanction'}
                        onChange={(e) => {
                          const custom = { ...(currentSection.customFields || {}), subFeature3: e.target.value };
                          updateCmsSection('home', 'loanBanner', { customFields: custom });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                  </div>

                  {/* Partner Banks List Manager */}
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800">
                        Partner Banks & Lending Institutions
                      </label>
                      <button
                        onClick={() => {
                          let currentBanks = [];
                          try {
                            currentBanks = JSON.parse(currentSection.customFields?.partnersJson || '[]');
                          } catch {
                            currentBanks = [];
                          }
                          const newBank = {
                            name: 'New Partner Bank',
                            code: 'BANK',
                            rate: '8.25%',
                            color: 'bg-blue-800'
                          };
                          const custom = { ...(currentSection.customFields || {}), partnersJson: JSON.stringify([...currentBanks, newBank]) };
                          updateCmsSection('home', 'loanBanner', { customFields: custom });
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-[#1E4FA8] bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Bank
                      </button>
                    </div>

                    {/* Bank Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-1">
                      {(() => {
                        let banks = [];
                        try {
                          banks = JSON.parse(currentSection.customFields?.partnersJson || '[]');
                        } catch {
                          banks = [];
                        }
                        if (banks.length === 0) {
                          banks = [
                            { name: 'State Bank of India', code: 'SBI', rate: '8.30%', color: 'bg-sky-600' },
                            { name: 'HDFC Bank', code: 'HDFC', rate: '8.35%', color: 'bg-blue-800' },
                            { name: 'ICICI Bank', code: 'ICICI', rate: '8.40%', color: 'bg-orange-700' },
                            { name: 'Bank of Baroda', code: 'BOB', rate: '8.25%', color: 'bg-amber-700' },
                            { name: 'Axis Bank', code: 'AXIS', rate: '8.50%', color: 'bg-rose-800' },
                            { name: 'Punjab National Bank', code: 'PNB', rate: '8.35%', color: 'bg-red-800' },
                            { name: 'Kotak Mahindra', code: 'KOTAK', rate: '8.40%', color: 'bg-red-600' },
                            { name: 'Canara Bank', code: 'CANARA', rate: '8.30%', color: 'bg-blue-600' },
                            { name: 'Bank of Maharashtra', code: 'BOM', rate: '8.25%', color: 'bg-blue-950' },
                            { name: 'LIC Housing Finance', code: 'LIC HFL', rate: '8.45%', color: 'bg-amber-600' }
                          ];
                        }
                        return banks.map((bank: any, bIdx: number) => (
                          <div key={bIdx} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="w-6 h-6 rounded bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                {bank.code?.slice(0, 3) || 'BK'}
                              </span>
                              <div className="min-w-0 flex-1">
                                <input
                                  type="text"
                                  value={bank.name}
                                  onChange={(e) => {
                                    const updated = [...banks];
                                    updated[bIdx] = { ...updated[bIdx], name: e.target.value };
                                    const custom = { ...(currentSection.customFields || {}), partnersJson: JSON.stringify(updated) };
                                    updateCmsSection('home', 'loanBanner', { customFields: custom });
                                  }}
                                  className="w-full text-xs font-bold text-slate-800 bg-transparent border-0 border-b border-dashed border-slate-300 focus:ring-0 p-0"
                                />
                                <div className="flex items-center gap-2 mt-0.5">
                                  <input
                                    type="text"
                                    value={bank.rate}
                                    placeholder="8.25%"
                                    onChange={(e) => {
                                      const updated = [...banks];
                                      updated[bIdx] = { ...updated[bIdx], rate: e.target.value };
                                      const custom = { ...(currentSection.customFields || {}), partnersJson: JSON.stringify(updated) };
                                      updateCmsSection('home', 'loanBanner', { customFields: custom });
                                    }}
                                    className="w-16 text-[10px] font-bold text-emerald-700 bg-transparent border-0 p-0"
                                  />
                                  <input
                                    type="text"
                                    value={bank.code}
                                    placeholder="Code"
                                    onChange={(e) => {
                                      const updated = [...banks];
                                      updated[bIdx] = { ...updated[bIdx], code: e.target.value };
                                      const custom = { ...(currentSection.customFields || {}), partnersJson: JSON.stringify(updated) };
                                      updateCmsSection('home', 'loanBanner', { customFields: custom });
                                    }}
                                    className="w-14 text-[10px] text-slate-500 uppercase bg-transparent border-0 p-0"
                                  />
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                const updated = banks.filter((_: any, i: number) => i !== bIdx);
                                const custom = { ...(currentSection.customFields || {}), partnersJson: JSON.stringify(updated) };
                                updateCmsSection('home', 'loanBanner', { customFields: custom });
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* INLINE IMAGE REPLACER WITH LIVE PREVIEW */}
              {'imageUrl' in currentSection && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Section Featured Image
                    </label>
                    <button
                      id="cms-replace-section-img-btn"
                      onClick={() => handleOpenImageReplacer(activeSectionId, 'imageUrl', currentSection.imageUrl || '')}
                      className="px-3 py-1.5 text-xs font-bold text-[#F2621E] bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      Replace Image
                    </button>
                  </div>

                  <div className="relative aspect-video max-h-48 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                    <img
                      src={currentSection.imageUrl}
                      alt={currentSection.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleOpenImageReplacer(activeSectionId, 'imageUrl', currentSection.imageUrl || '')}
                        className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 break-all">Current URL: {currentSection.imageUrl}</p>
                </div>
              )}

              {/* REPEATABLE ITEMS (Trust badges, values, stats items) */}
              {Array.isArray(currentSection.items) && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800">
                      Repeater Items ({currentSection.items.length})
                    </h4>
                    <button
                      onClick={() => {
                        const newItems = [...currentSection.items, { title: 'New Item', desc: 'Item description', value: '100+', label: 'New Metric' }];
                        updateCmsSection(selectedPageId, activeSectionId, { items: newItems });
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-[#1E4FA8] bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentSection.items.map((item: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500">Item #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const newItems = currentSection.items.filter((_: any, i: number) => i !== idx);
                              updateCmsSection(selectedPageId, activeSectionId, { items: newItems });
                            }}
                            className="text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.title !== undefined && (
                            <div>
                              <input
                                type="text"
                                value={item.title}
                                placeholder="Item Title"
                                onChange={(e) => {
                                  const newItems = [...currentSection.items];
                                  newItems[idx] = { ...newItems[idx], title: e.target.value };
                                  updateCmsSection(selectedPageId, activeSectionId, { items: newItems });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                              />
                            </div>
                          )}

                          {item.value !== undefined && (
                            <div>
                              <input
                                type="text"
                                value={item.value}
                                placeholder="Stat Value (e.g. 1,250+)"
                                onChange={(e) => {
                                  const newItems = [...currentSection.items];
                                  newItems[idx] = { ...newItems[idx], value: e.target.value };
                                  updateCmsSection(selectedPageId, activeSectionId, { items: newItems });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs font-bold text-[#1E4FA8] rounded-lg border border-slate-200 bg-white"
                              />
                            </div>
                          )}

                          {item.label !== undefined && (
                            <div>
                              <input
                                type="text"
                                value={item.label}
                                placeholder="Label"
                                onChange={(e) => {
                                  const newItems = [...currentSection.items];
                                  newItems[idx] = { ...newItems[idx], label: e.target.value };
                                  updateCmsSection(selectedPageId, activeSectionId, { items: newItems });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                              />
                            </div>
                          )}

                          {item.desc !== undefined && (
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                value={item.desc}
                                placeholder="Item Description"
                                onChange={(e) => {
                                  const newItems = [...currentSection.items];
                                  newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                  updateCmsSection(selectedPageId, activeSectionId, { items: newItems });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
      </>
      )}

      {/* Image Replacer Modal */}
      <CmsImageReplacerModal
        isOpen={replacerOpen}
        onClose={() => setReplacerOpen(false)}
        currentImageUrl={replacerTarget?.currentUrl || ''}
        imageTitle={`Replace Image for "${currentSection.name}"`}
        onSelectImage={handleImageSelected}
      />

    </div>
  );
};
