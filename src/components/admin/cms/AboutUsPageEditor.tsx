import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { INITIAL_CMS_PAGES } from '../../../data/cmsInitialData';
import { AuricityLogo } from '../../common/AuricityLogo';
import { 
  Info, 
  Save, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  User, 
  FileText, 
  Check, 
  Upload, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const DEFAULT_OWNER_PHOTO = 'https://cdn.postimage.me/2026/09/02/1000001101.png';

export const AboutUsPageEditor: React.FC = () => {
  const { cmsPages, updateCmsSection, updateCmsPage, setActiveView, showToast } = useApp();

  const aboutData = cmsPages?.about || INITIAL_CMS_PAGES.about;
  const mainContent = aboutData.sections?.mainContent;
  const customFields = mainContent?.customFields;

  // Initial State extraction
  const [pageHeading, setPageHeading] = useState<string>(
    mainContent?.heading || 'About Us'
  );
  const [tagline, setTagline] = useState<string>(
    customFields?.tagline || 'Delivering Dreams, Trust, and Customer Excellence.'
  );

  const defaultParagraphs = [
    "Founded in 2023, Auricity Developers is one of the most esteemed real estate management companies in Chhatrapati Sambhajinagar (Aurangabad). We have helped hundreds of clients achieve their property goals. Whether you want to buy or sell a residential property or rent/lease an office space, we have got you covered.",
    "Auricity Developers has built a legacy of trust, quality, and customer satisfaction. We put our clients first, and every decision we make is towards the welfare of our clients. When you work with us, you not only get access to expertise and years of experience but also trust and a stamp of approval from hundreds of clients we have served.",
    "We assure you a niche experience with personalised services, step-by-step guidance, transparent dealings, fair market pricing, honest commitments, and a well-organised programme to make your next real estate transaction a smooth and memorable one. We believe in educating our customers with in-depth analysis of the latest Real estate market information, current design trends, and prevailing prices.",
    "We only work with Reputed Builders who are known for their exceptional workmanship, solid aesthetically beautiful buildings, fair dealings, timely delivery and have proven track record.",
    "For buying, we truly aspire to get you:\nThe Right property at The Right Location at The Right Price.",
    "And for sellers, we aim to fetch the best price, reliable legal guidance, and a streamlined process with a one-stop solution to sum up all your real estate aspirations on a single table."
  ];

  const [paragraphs, setParagraphs] = useState<string[]>(() => {
    if (Array.isArray(customFields?.paragraphs) && customFields.paragraphs.length > 0) {
      return customFields.paragraphs;
    }
    return defaultParagraphs;
  });

  const [ownerName, setOwnerName] = useState<string>(
    customFields?.ownerName || 'Vinod Sonawane'
  );
  const [ownerRole, setOwnerRole] = useState<string>(
    customFields?.ownerRole || 'Director - Auricity Developers'
  );
  const [ownerPhoto, setOwnerPhoto] = useState<string>(() => {
    if (customFields?.ownerPhoto && !customFields.ownerPhoto.includes('vinod_sonawane.jpg')) {
      return customFields.ownerPhoto;
    }
    return DEFAULT_OWNER_PHOTO;
  });
  const [logoUrl, setLogoUrl] = useState<string>(
    customFields?.logoUrl || ''
  );
  const [useCustomLogo, setUseCustomLogo] = useState<boolean>(
    Boolean(customFields?.logoUrl)
  );

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'owner' | 'preview'>('content');

  // Keep state in sync if external CMS data changes
  useEffect(() => {
    if (mainContent?.heading) setPageHeading(mainContent.heading);
    if (customFields?.tagline) setTagline(customFields.tagline);
    if (Array.isArray(customFields?.paragraphs) && customFields.paragraphs.length > 0) {
      setParagraphs(customFields.paragraphs);
    }
    if (customFields?.ownerName) setOwnerName(customFields.ownerName);
    if (customFields?.ownerRole) setOwnerRole(customFields.ownerRole);
    if (customFields?.ownerPhoto) setOwnerPhoto(customFields.ownerPhoto);
    if (customFields?.logoUrl !== undefined) {
      setLogoUrl(customFields.logoUrl);
      setUseCustomLogo(Boolean(customFields.logoUrl));
    }
  }, [mainContent, customFields]);

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
  };

  const handleSave = () => {
    const updatedFields = {
      tagline,
      paragraphs,
      ownerName,
      ownerRole,
      ownerPhoto,
      logoUrl: useCustomLogo ? logoUrl : ''
    };

    updateCmsSection('about', 'mainContent', {
      heading: pageHeading,
      subheading: tagline,
      customFields: updatedFields
    });

    setSavedSuccess(true);
    showToast('About Us content saved successfully!', 'success');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset the About Us page content back to the default approved text?')) {
      updateCmsPage('about', INITIAL_CMS_PAGES.about);
      setPageHeading(INITIAL_CMS_PAGES.about.sections.mainContent.heading || 'About Us');
      setTagline(INITIAL_CMS_PAGES.about.sections.mainContent.customFields?.tagline || 'Delivering Dreams, Trust, and Customer Excellence.');
      setParagraphs(defaultParagraphs);
      setOwnerName('Vinod Sonawane');
      setOwnerRole('Director - Auricity Developers');
      setOwnerPhoto(DEFAULT_OWNER_PHOTO);
      setLogoUrl('');
      setUseCustomLogo(false);
      showToast('Reset About Us page to defaults!', 'info');
    }
  };

  return (
    <div id="about-us-page-editor" className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-100 text-[#1E4FA8] rounded-full uppercase tracking-wider">
              CMS • Page Editor
            </span>
            <span className="text-xs text-slate-400">• Route: /about</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#1E4FA8]" />
            About Us Page Editor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the page heading, highlighted tagline, body copy paragraphs, owner profile (photo, name, role), and brand logo.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          
          <button
            onClick={() => setActiveView('about')}
            className="px-3.5 py-2 text-xs font-semibold text-[#1E4FA8] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d95214] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {savedSuccess ? 'Saved!' : 'Save & Publish'}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'bg-[#1E4FA8] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          Heading, Tagline & Body Copy
        </button>

        <button
          onClick={() => setActiveTab('owner')}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'owner'
              ? 'bg-[#1E4FA8] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          Owner Profile & Logo
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-[#1E4FA8] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Integrated Preview
        </button>
      </div>

      {/* TAB 1: HEADING, TAGLINE & BODY COPY */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          
          {/* Page Heading & Tagline Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Page Heading & Tagline</h3>
              <p className="text-xs text-slate-500">Configure the top page heading and highlighted tagline box.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Heading (H1)
                </label>
                <input
                  type="text"
                  value={pageHeading}
                  onChange={(e) => setPageHeading(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm font-bold rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#F2621E]/20"
                  placeholder="About Us"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Highlighted Tagline Box Text
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm font-bold text-[#1E4FA8] rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#F2621E]/20"
                  placeholder="Delivering Dreams, Trust, and Customer Excellence."
                />
              </div>
            </div>

            {/* Live Tagline Box Preview */}
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Tagline Box Visual Preview (as seen by visitors):
              </span>
              <div className="max-w-xl mx-auto bg-slate-100/95 text-slate-900 border border-slate-200/90 rounded-2xl px-6 py-4 shadow-sm text-center">
                <p className="text-base font-black tracking-tight text-slate-900 font-display">
                  "{tagline}"
                </p>
              </div>
            </div>
          </div>

          {/* Body Copy Paragraphs Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Body Copy Paragraphs</h3>
                <p className="text-xs text-slate-500">Edit each paragraph of the About Us story. Paragraph spacing is preserved automatically.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                {paragraphs.length} Paragraphs
              </span>
            </div>

            <div className="space-y-4">
              {paragraphs.map((para, idx) => {
                const labels = [
                  "1. Foundation & Scope (Residential, Commercial, Rent/Lease)",
                  "2. Legacy of Trust & Customer First",
                  "3. Personalized Guidance, Transparent Dealings & Market Insights",
                  "4. Reputed Builders & Proven Track Record",
                  "5. Aspirations for Buyers (The Right Property, Location & Price)",
                  "6. Aspirations for Sellers (Best Price, Legal Guidance & Single Table)"
                ];

                return (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        {labels[idx] || `Paragraph ${idx + 1}`}
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {para.length} characters
                      </span>
                    </div>

                    <textarea
                      rows={idx === 4 ? 3 : 4}
                      value={para}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#F2621E]/20 leading-relaxed font-sans"
                    />

                    {idx === 4 && (
                      <p className="text-[11px] text-amber-700 font-medium">
                        💡 Tip: Paragraph 5 maintains a clean line break before "The Right property at The Right Location at The Right Price."
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: OWNER PROFILE & LOGO */}
      {activeTab === 'owner' && (
        <div className="space-y-6">
          
          {/* Owner Profile Editor Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Owner Profile Block</h3>
              <p className="text-xs text-slate-500">
                Centered block with circular cropped portrait, name, and role. No extra team headers or bio text.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Photo Preview & Controls */}
              <div className="flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-600 mb-3">Live Portrait Preview</span>
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-[#1E4FA8]/20 bg-slate-200 flex items-center justify-center">
                  <img
                    src={ownerPhoto || DEFAULT_OWNER_PHOTO}
                    alt={ownerName}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/vinod_sonawane.png';
                    }}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => setOwnerPhoto(DEFAULT_OWNER_PHOTO)}
                  className="mt-4 px-3 py-1.5 text-xs font-semibold text-[#1E4FA8] bg-white hover:bg-blue-50 border border-blue-200 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Restore Official Photo
                </button>
              </div>

              {/* Text Fields */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Owner's Name
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm font-bold rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#F2621E]/20"
                    placeholder="Vinod Sonawane"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Displayed directly below the circular photo.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Owner's Role / Title
                  </label>
                  <input
                    type="text"
                    value={ownerRole}
                    onChange={(e) => setOwnerRole(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm font-bold text-[#F2621E] rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#F2621E]/20"
                    placeholder="Director - Auricity Developers"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Displayed directly below the owner's name in bold orange.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Photo URL or Relative Path
                  </label>
                  <input
                    type="text"
                    value={ownerPhoto}
                    onChange={(e) => setOwnerPhoto(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#F2621E]/20"
                    placeholder="https://cdn.postimage.me/2026/09/02/1000001101.png"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Logo Section Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Auricity Logo Display</h3>
              <p className="text-xs text-slate-500">
                Centered directly below the owner's role on the About Us page.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="logoChoice"
                    checked={!useCustomLogo}
                    onChange={() => setUseCustomLogo(false)}
                    className="text-[#1E4FA8] focus:ring-[#1E4FA8]"
                  />
                  Default Official Brand Logo (SVG Icon + Wordmark)
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="logoChoice"
                    checked={useCustomLogo}
                    onChange={() => setUseCustomLogo(true)}
                    className="text-[#1E4FA8] focus:ring-[#1E4FA8]"
                  />
                  Custom Logo Image URL
                </label>
              </div>

              {useCustomLogo && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom Logo Image URL
                  </label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#F2621E]/20"
                  />
                </div>
              )}

              {/* Logo Preview */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                <span className="text-[11px] font-semibold text-slate-400 mb-2">Logo Preview:</span>
                {useCustomLogo && logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Custom Logo"
                    className="h-12 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <AuricityLogo variant="full" size="lg" />
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: INTEGRATED PREVIEW */}
      {activeTab === 'preview' && (
        <div className="bg-[#FAF6EF] p-8 rounded-2xl border border-stone-300 shadow-sm space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Live Preview Representation
            </span>
            <button
              onClick={() => setActiveView('about')}
              className="text-xs font-bold text-[#1E4FA8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Open Full Page <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight font-display">
              {pageHeading}
            </h1>

            <div className="mt-5 max-w-xl mx-auto">
              <div className="bg-slate-100/95 text-slate-900 border border-slate-200/90 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-base font-black tracking-tight text-slate-900 font-display">
                  "{tagline}"
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-200/80 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-[#1E4FA8]/20 bg-slate-200">
              <img
                src={ownerPhoto || DEFAULT_OWNER_PHOTO}
                alt={ownerName}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/vinod_sonawane.png';
                }}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight font-display mt-3">
              {ownerName}
            </h3>
            <p className="text-xs font-bold text-[#F2621E] uppercase tracking-wider mt-0.5">
              {ownerRole}
            </p>
            <div className="mt-6 flex justify-center">
              {useCustomLogo && logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
              ) : (
                <AuricityLogo variant="full" size="md" />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
