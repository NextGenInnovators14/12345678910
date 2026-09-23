import React, { useRef, useState } from 'react';
import { useApp, HomePageSectionConfig } from '../../../context/AppContext';
import { HomePageCanvas } from '../../home/HomePageCanvas';
import { Save, RotateCcw, Eye, EyeOff, GripVertical, ChevronUp, ChevronDown, Sparkles, Image as ImageIcon, Wand2, Plus, Settings2, Smartphone, Monitor, LayoutTemplate, X, Maximize2, Check, HelpCircle } from 'lucide-react';
import { applyLocalHomeAI } from '../../../utils/homeEditorAI';

const compactAIState = (value: any, depth = 0): any => {
  if (depth > 8) return value;
  if (typeof value === 'string') {
    if (/^data:(image|video)\//i.test(value)) return '[binary media omitted]';
    if (value.length > 24000) return `${value.slice(0, 24000)}…[truncated]`;
    return value;
  }
  if (Array.isArray(value)) return value.map(item => compactAIState(item, depth + 1));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, compactAIState(v, depth + 1)]));
  }
  return value;
};

const fallbackSections: HomePageSectionConfig[] = [];

export const HomePageEditor: React.FC = () => {
  const {
    homePageConfig,
    updateHomePageConfig,
    updateHomeSection,
    resetHomePageConfig,
    cmsPages,
    updateCmsSection,
    showToast,
    addCmsPage,
    navigationConfig,
    updateNavigationConfig,
    allProperties, updateProperty, projects, updateProject, offers, updateOffer, bannerAds, updateBannerAd, settings, updateSettings
  } = useApp() as any;

  const [selectedId, setSelectedId] = useState('hero');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [aiText, setAiText] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [draftPageTitle, setDraftPageTitle] = useState('');
  const [draftPageSlug, setDraftPageSlug] = useState('');
  const [websiteMode, setWebsiteMode] = useState(false);
  const [aiImage, setAiImage] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const [aiResult, setAiResult] = useState<string>('');
  const aiFileRef = useRef<HTMLInputElement>(null);

  const sections = homePageConfig?.sections?.length ? homePageConfig.sections : fallbackSections;
  const selected = sections.find((s: HomePageSectionConfig) => s.id === selectedId) || sections[0];

  const reorder = (index: number, direction: -1 | 1) => {
    const next = [...sections];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateHomePageConfig({ sections: next });
  };

  const save = () => showToast('Homepage editor changes saved', 'success');

  const applyLocalAI = (text: string) => {
    const result = applyLocalHomeAI(text, homePageConfig, cmsPages, navigationConfig);
    updateHomePageConfig(result.config);
    if (result.navigationConfig) updateNavigationConfig(result.navigationConfig);
    (result.createdPages || []).forEach((page: any) => {
      addCmsPage(page);
      const navItems = Array.isArray(navigationConfig?.navItems) ? navigationConfig.navItems : [];
      if (!navItems.some((item: any) => item.viewOrUrl === page.id)) {
        updateNavigationConfig({ navItems: [...navItems, { id: `nav-${page.id}`, label: page.title, viewOrUrl: page.id, order: navItems.length + 1, published: true }] });
      }
    });
    showToast(result.message, result.createdPages?.length || result.message.startsWith('Done:') ? 'success' : 'info');
  };

  const applyAIResponse = (data: any) => {
    if (data?.config) updateHomePageConfig(data.config);
    if (data?.settings) updateSettings(data.settings);
    if (data?.navigationConfig) updateNavigationConfig(data.navigationConfig);
    if (Array.isArray(data?.bannerAds)) data.bannerAds.forEach((item: any) => updateBannerAd(item.id, item));
    if (Array.isArray(data?.offers)) data.offers.forEach((item: any) => updateOffer(item.id, item));
    if (Array.isArray(data?.projects)) data.projects.forEach((item: any) => updateProject(item.id, item));
    if (Array.isArray(data?.properties)) data.properties.forEach((item: any) => updateProperty(item.id, item));
    if (Array.isArray(data?.createdPages)) data.createdPages.forEach((p: any) => addCmsPage(p));
    if (data?.pageUpdates && typeof data.pageUpdates === 'object') {
      Object.entries(data.pageUpdates).forEach(([pageId, value]: [string, any]) => {
        // Accept both { pageId: {sectionId, ...updates} } and
        // { pageId: { sectionId: { ...updates } } } formats.
        if (value?.sectionId && value?.updates) updateCmsSection(pageId, value.sectionId, value.updates);
        else if (value && typeof value === 'object') {
          Object.entries(value).forEach(([sectionId, updates]: [string, any]) => updateCmsSection(pageId, sectionId, updates));
        }
      });
    }
  };

  const readAIImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('AI Editor mein sirf image/screenshot attach karo.', 'error');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showToast('Screenshot/image 8MB se chhoti honi chahiye.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || '');
      const comma = value.indexOf(',');
      setAiImage({ data: comma >= 0 ? value.slice(comma + 1) : value, mimeType: file.type, name: file.name });
    };
    reader.readAsDataURL(file);
  };

  const askAI = async (overrideText?: string) => {
    const instruction = (overrideText ?? aiText).trim();
    if (!instruction && !aiImage) return;
    setAiBusy(true);
    setAiResult('');
    try {
      const res = await fetch('/api/ai/home-editor', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instruction: instruction || 'Inspect the attached screenshot and apply the requested visual/content change.',
          image: aiImage ? { data: aiImage.data, mimeType: aiImage.mimeType, name: aiImage.name } : null,
          selectedSectionId: selected?.id || null,
          config: compactAIState(homePageConfig), pages: compactAIState(cmsPages), navigationConfig: compactAIState(navigationConfig), settings: compactAIState(settings),
          bannerAds: compactAIState(bannerAds), offers: compactAIState(offers),
          projects: compactAIState(projects.map((p: any) => ({ id: p.id, title: p.title, name: p.name, type: p.type }))),
          allProperties: compactAIState(allProperties.map((p: any) => ({ id: p.id, title: p.title, name: p.name, type: p.type, city: p.city, locality: p.locality })))
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.configured === false) {
          applyLocalAI(instruction);
          if (aiImage) showToast('Screenshot AI ke liye GEMINI_API_KEY configure karo.', 'warning');
        } else {
          applyAIResponse(data);
          setAiResult(data?.message || 'Change applied.');
          showToast(data?.message || 'AI changes applied', 'success');
        }
      } else {
        applyLocalAI(instruction);
        showToast('AI service unavailable — built-in commands used instead.', 'warning');
      }
    } catch {
      applyLocalAI(instruction);
      showToast('AI connection failed — built-in commands used instead.', 'warning');
    } finally {
      setAiBusy(false);
      setAiText('');
      setAiImage(null);
    }
  };

  const createPage = () => {
    const title = draftPageTitle.trim();
    if (!title) return showToast('Page title is required', 'error');
    const slug = (draftPageSlug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/^-|-$/g, '');
    const id = `custom-${Date.now()}`;
    addCmsPage({
      id, title, slug: `/${slug}`, metaTitle: title, metaDescription: '', lastUpdated: new Date().toISOString().slice(0, 10),
      sections: { header: { id: 'header', name: 'Page Header', badge: 'Auricity', heading: title, subheading: 'Edit this page with the Auricity AI editor.', imageUrl: '' } }
    } as any);
    const navItems = Array.isArray(navigationConfig?.navItems) ? navigationConfig.navItems : [];
    updateNavigationConfig({ navItems: [...navItems, { id: `nav-${id}`, label: title, viewOrUrl: id, order: navItems.length + 1, published: true }] });
    setDraftPageTitle(''); setDraftPageSlug('');
  };

  const patch = (updates: Partial<HomePageSectionConfig>) => selected && updateHomeSection(selected.id, updates);
  const runQuickAI = (prompt: string) => { setAiText(prompt); void askAI(prompt); };

  return (
    <div className="space-y-5">
      <input ref={aiFileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) readAIImage(f); e.currentTarget.value = ''; }} />
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 lg:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1"><span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1E4FA8] text-[10px] font-black uppercase tracking-wider">Visual CMS</span><span className="text-xs text-slate-400">{sections.length} homepage sections</span></div>
            <h2 className="text-2xl font-black text-slate-900">Homepage Editor</h2>
            <p className="text-sm text-slate-500">Website ko yahin preview karo, section select karo, edit karo, order badlo aur save karo.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={resetHomePageConfig} className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5"><RotateCcw className="w-4 h-4"/> Reset Layout</button>
            <button onClick={() => setWebsiteMode(true)} className="px-4 py-2 rounded-xl border border-[#1E4FA8]/20 bg-blue-50 text-[#1E4FA8] text-xs font-black flex items-center gap-1.5"><Maximize2 className="w-4 h-4"/> Edit Website</button><button onClick={save} className="px-4 py-2 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-1.5"><Save className="w-4 h-4"/> Save & Publish</button>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl p-4 text-white shadow-lg space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex items-center gap-2 shrink-0"><Sparkles className="w-5 h-5 text-cyan-300"/><div><span className="font-black">AI Website Editor</span><span className="block text-[10px] text-slate-400">Bas normal language mein bolo — AI kaam karega.</span></div></div>
          <input value={aiText} onChange={e => setAiText(e.target.value)} onKeyDown={e => e.key === 'Enter' && askAI()} placeholder="Jaise: Services ko neeche karo, hero badlo, naya page banao…" className="flex-1 min-w-0 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-slate-400" />
          <button onClick={() => aiFileRef.current?.click()} className="px-3 py-2.5 rounded-xl bg-white/10 text-white font-black text-xs border border-white/10" title="Screenshot attach karo">📎</button>
          <button disabled={aiBusy || (!aiText.trim() && !aiImage)} onClick={askAI} className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"><Wand2 className="w-4 h-4"/>{aiBusy ? 'Working…' : 'Do It'}</button>
        </div>
        {(aiImage || aiResult) && <div className="flex flex-wrap gap-2">{aiImage && <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[10px] text-cyan-200">📎 {aiImage.name}</span>}{aiResult && <span className="px-2.5 py-1 rounded-lg bg-emerald-400/10 text-[10px] text-emerald-200">{aiResult}</span>}</div>}
        <div className="flex flex-wrap gap-2">
          {[['Move Sale Properties to top','Move Sale Properties to top'],['Hide Services','Hide Services'],['Show Services','Show Services'],['Make Hero compact','Make Hero compact'],['Create a page called About','Create a page called About']].map(([label,prompt]) => <button key={label} onClick={() => runQuickAI(prompt)} className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[10px] font-bold text-slate-200 border border-white/10">{label}</button>)}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400"><HelpCircle className="w-3.5 h-3.5"/> Try: “logo change karo”, “rent section ko sale ke baad rakho”, “news hide karo”, “naya Contact page banao”.</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_330px] gap-5 items-start">
        <aside className="bg-white rounded-3xl border border-slate-200 shadow-sm p-3 sticky top-4 max-h-[75vh] overflow-auto">
          <div className="px-2 pb-2"><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Page Structure</div><div className="text-xs text-slate-500 mt-1">Drag-style order controls + visibility</div></div>
          <div className="space-y-1.5">
            {sections.map((section: HomePageSectionConfig, index: number) => (
              <div key={section.id} className={`rounded-2xl border ${selected?.id === section.id ? 'border-[#1E4FA8] bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
                <button onClick={() => setSelectedId(section.id)} className="w-full text-left p-2.5 flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-slate-400 shrink-0"/>
                  <span className="flex-1 min-w-0"><span className="block text-xs font-black text-slate-800 truncate">{index + 1}. {section.label}</span><span className="block text-[9px] text-slate-400">{section.layout} • {section.visible ? 'Visible' : 'Hidden'}</span></span>
                </button>
                <div className="flex items-center justify-between px-2 pb-2">
                  <button onClick={() => updateHomeSection(section.id, { visible: !section.visible })} className="text-[10px] font-bold text-slate-500 flex items-center gap-1">{section.visible ? <Eye className="w-3.5 h-3.5"/> : <EyeOff className="w-3.5 h-3.5"/>}{section.visible ? 'Visible' : 'Hidden'}</button>
                  <div className="flex gap-1"><button onClick={() => reorder(index, -1)} className="p-1 rounded bg-white border border-slate-200"><ChevronUp className="w-3.5 h-3.5"/></button><button onClick={() => reorder(index, 1)} className="p-1 rounded bg-white border border-slate-200"><ChevronDown className="w-3.5 h-3.5"/></button></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="bg-slate-100 rounded-3xl border border-slate-200 p-3 lg:p-5 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-3"><div className="flex items-center gap-2"><LayoutTemplate className="w-4 h-4 text-[#1E4FA8]"/><span className="text-xs font-black text-slate-700">Live website preview</span></div><div className="flex bg-white rounded-xl p-1 border border-slate-200"><button onClick={() => setDevice('mobile')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black ${device === 'mobile' ? 'bg-[#1E4FA8] text-white' : 'text-slate-500'}`}><Smartphone className="w-3.5 h-3.5 inline mr-1"/>Mobile</button><button onClick={() => setDevice('desktop')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black ${device === 'desktop' ? 'bg-[#1E4FA8] text-white' : 'text-slate-500'}`}><Monitor className="w-3.5 h-3.5 inline mr-1"/>Desktop</button></div></div>
          <div className={`mx-auto bg-white overflow-hidden rounded-2xl shadow-xl ${device === 'mobile' ? 'max-w-[430px]' : 'max-w-[1180px]'}`}>
            <HomePageCanvas editMode selectedId={selected?.id} onSelect={setSelectedId} />
          </div>
        </section>

        <aside className="space-y-4">
          {selected && <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Selected section</div><h3 className="text-lg font-black text-slate-900 mt-1">{selected.label}</h3></div><Settings2 className="w-5 h-5 text-[#1E4FA8]"/></div>
            <label className="block text-xs font-black text-slate-600">Section name<input value={selected.label} onChange={e => patch({ label: e.target.value })} className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/></label>
            <div className="grid grid-cols-2 gap-2"><label className="text-xs font-black text-slate-600">Layout<select value={selected.layout} onChange={e => patch({ layout: e.target.value as any })} className="mt-1.5 w-full border border-slate-200 rounded-xl px-2 py-2 text-xs"><option value="auto">Auto</option><option value="full">Full width</option><option value="compact">Compact</option><option value="split">Split</option><option value="grid">Grid</option><option value="carousel">Carousel</option></select></label><label className="text-xs font-black text-slate-600">Spacing<select value={selected.spacing} onChange={e => patch({ spacing: e.target.value as any })} className="mt-1.5 w-full border border-slate-200 rounded-xl px-2 py-2 text-xs"><option value="tight">Tight</option><option value="normal">Normal</option><option value="airy">Airy</option></select></label></div>
            <label className="block text-xs font-black text-slate-600">Heading override<input value={selected.headingOverride || ''} onChange={e => patch({ headingOverride: e.target.value })} placeholder="Leave blank to use current heading" className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/></label>
            <label className="block text-xs font-black text-slate-600">Description override<textarea value={selected.subheadingOverride || ''} onChange={e => patch({ subheadingOverride: e.target.value })} rows={3} placeholder="Leave blank to use current description" className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none"/></label>
            <label className="block text-xs font-black text-slate-600">Section image URL<input value={selected.imageUrl || ''} onChange={e => patch({ imageUrl: e.target.value })} placeholder="https://…" className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/></label>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"><div><div className="text-xs font-black text-slate-700">Automatic scroll</div><div className="text-[10px] text-slate-400">Carousel/section movement</div></div><button onClick={() => patch({ autoScroll: !selected.autoScroll })} className={`w-11 h-6 rounded-full p-1 ${selected.autoScroll ? 'bg-[#1E4FA8]' : 'bg-slate-300'}`}><span className={`block w-4 h-4 rounded-full bg-white transition-transform ${selected.autoScroll ? 'translate-x-5' : ''}`}/></button></div>
            <label className="block text-xs font-black text-slate-600">Auto-scroll speed<input type="range" min="0.5" max="3" step="0.5" value={selected.autoScrollSpeed} onChange={e => patch({ autoScrollSpeed: Number(e.target.value) })} className="w-full mt-2"/><span className="text-[10px] text-slate-400">{selected.autoScrollSpeed}×</span></label>
          </div>}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-[#F2621E]"/><h3 className="font-black text-sm">Brand & Favicon</h3></div>
            <input value={homePageConfig.brandLogoUrl || ''} onChange={e => updateHomePageConfig({ brandLogoUrl: e.target.value })} placeholder="Logo image URL" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/>
            <input value={homePageConfig.faviconUrl || ''} onChange={e => updateHomePageConfig({ faviconUrl: e.target.value })} placeholder="Favicon image URL" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/>
            <p className="text-[10px] text-slate-400">Logo URL yahan set karne se site header update hoga. Favicon browser tab mein update hoga.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-600"/><h3 className="font-black text-sm">Create New Page</h3></div>
            <input value={draftPageTitle} onChange={e => setDraftPageTitle(e.target.value)} placeholder="Page title" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/>
            <input value={draftPageSlug} onChange={e => setDraftPageSlug(e.target.value)} placeholder="Slug (optional)" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"/>
            <button onClick={createPage} className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black">Create & Add to CMS</button>
          </div>
        </aside>
      </div>

      {websiteMode && <div className="fixed inset-0 z-[100] bg-slate-100 flex flex-col">
        <div className="h-14 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-2"><button onClick={() => setWebsiteMode(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5"/></button><div><div className="text-sm font-black text-slate-900">Edit Website</div><div className="text-[10px] text-slate-400">Website par section tap karo → AI se bolo → done</div></div></div>
          <button onClick={save} className="px-3 py-2 rounded-xl bg-[#1E4FA8] text-white text-xs font-black flex items-center gap-1.5"><Check className="w-4 h-4"/> Publish</button>
        </div>
        <div className="flex-1 overflow-auto pb-24"><div className="mx-auto max-w-[1180px] bg-white min-h-full shadow-xl"><HomePageCanvas editMode selectedId={selected?.id} onSelect={setSelectedId} /></div></div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] max-w-2xl">
          {(aiImage || aiResult) && <div className="mb-2 flex items-center gap-2">{aiImage && <span className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-[10px] font-bold">📎 {aiImage.name}</span>}{aiResult && <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold truncate">{aiResult}</span>}</div>}
          <div className="bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex gap-2">
            <input value={aiText} onChange={e => setAiText(e.target.value)} onKeyDown={e => e.key === 'Enter' && askAI()} placeholder="Website mein kya change karna hai? (e.g. Services ko hide karo, naya page banao...)" className="flex-1 min-w-0 bg-white/10 text-white rounded-xl px-3 py-2.5 text-xs outline-none placeholder:text-slate-400"/>
            <button onClick={() => aiFileRef.current?.click()} className="px-3 rounded-xl bg-white/10 text-white text-xs font-black hover:bg-white/15" title="Screenshot attach karo">📎</button>
            <button disabled={aiBusy || (!aiText.trim() && !aiImage)} onClick={askAI} className="px-4 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black"><Wand2 className="w-4 h-4 inline mr-1"/>{aiBusy ? 'Working…' : 'Do it'}</button>
          </div>
        </div>
      </div>}

      {/* Mobile-friendly AI-Studio-style editor toolbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-24px)] max-w-xl">
        <div className="bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-2 py-2 flex items-center gap-1.5">
          <button onClick={() => setSelectedId(sections[0]?.id || 'hero')} className="flex-1 min-w-0 px-2 py-2.5 rounded-xl text-[10px] font-black text-white hover:bg-white/10">✦ Select</button>
          <button onClick={() => document.querySelector('[data-home-section=\"'+(selected?.id || 'hero')+'\"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="flex-1 min-w-0 px-2 py-2.5 rounded-xl text-[10px] font-black text-white hover:bg-white/10">↕ Scroll</button>
          <button onClick={() => setAiText('Move this section to the top and make it more compact')} className="flex-1 min-w-0 px-2 py-2.5 rounded-xl text-[10px] font-black text-cyan-300 hover:bg-white/10">✨ AI</button>
          <button onClick={save} className="flex-1 min-w-0 px-2 py-2.5 rounded-xl text-[10px] font-black bg-cyan-400 text-slate-950">Save</button>
        </div>
      </div>
    </div>
  );
};
