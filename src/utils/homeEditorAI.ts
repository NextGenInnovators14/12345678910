import { HomePageConfig, HomePageSectionConfig } from '../context/AppContext';

export type LocalAIResult = {
  config: HomePageConfig;
  navigationConfig?: any;
  createdPages?: any[];
  deletedPages?: string[];
  pageUpdates?: Record<string, any>;
  message: string;
  needsClarification?: boolean;
};

// A plain `/hide/i.test(text)` treats "hide mat karo" (Hindi for "do NOT
// hide") the same as "hide karo" — it found the word "hide" and stopped
// looking. That's how an instruction that explicitly said "cards aur
// section ko hide mat karo" still triggered a hide. This checks a small
// window of nearby words for a negation marker (mat/nahi/na/don't/never/
// etc.) on either side before accepting a keyword match as real.
const NEGATION_WORDS = /\b(mat|nahi|nahin|na|don'?t|do\s*not|never|skip|ignore|not)\b/i;
function hasUnnegatedKeyword(lower: string, keywordRegex: RegExp): boolean {
  // Strip leading/trailing punctuation from each token first — otherwise
  // "hatao," (a comma right after the word, as in "details hatao, cards
  // aur...") never matches /^hatao$/, and a real keyword gets missed.
  const words = lower.split(/\s+/).map(w => w.replace(/^[^\w]+|[^\w]+$/g, ''));
  for (let i = 0; i < words.length; i++) {
    if (keywordRegex.test(words[i])) {
      const window = words.slice(Math.max(0, i - 3), Math.min(words.length, i + 4)).join(' ');
      if (!NEGATION_WORDS.test(window)) return true;
    }
  }
  return false;
}

const aliases: Record<string, string[]> = {
  hero: ['hero', 'top banner', 'main banner', 'search banner'],
  localities: ['localities', 'locations', 'top locations'],
  cta: ['quick action', 'action cards', 'cta'],
  services: ['services', 'service'],
  bannerAds: ['banner ads', 'ads', 'advertisements', 'banners'],
  featuredProjects: ['featured projects', 'featured project'],
  projects: ['projects', 'project section'],
  loanBanner: ['loan', 'emi', 'loan banner'],
  saleProperties: ['sale properties', 'properties for sale', 'sale section', 'buy properties'],
  realtors: ['realtors', 'verified realtors', 'brokers'],
  clubs: ['clubs', 'affiliate clubs', 'realtor clubs'],
  rentProperties: ['rent properties', 'properties for rent', 'rental', 'rent section'],
  testimonials: ['testimonials', 'buyers', 'buyer reviews'],
  knowledgeHub: ['knowledge hub', 'knowledge'],
  news: ['news', 'articles', 'news articles'],
  whyChoose: ['why choose', 'why auricity', 'trust']
};

const findSectionId = (text: string, sections: HomePageSectionConfig[]) => {
  const normalized = text.toLowerCase();
  const byAlias = Object.entries(aliases).find(([, words]) => words.some(word => normalized.includes(word)));
  if (byAlias && sections.some(s => s.id === byAlias[0])) return byAlias[0];
  // Previously defaulted to sections[0] here, which meant any instruction
  // that didn't match a known section name silently edited whatever
  // section happened to be first in the list — exactly the "randomly
  // modify the website" behaviour the owner-facing spec forbids. Return
  // nothing instead; the caller falls back to the section the owner has
  // selected in the UI, and only asks for clarification if there isn't one.
  return undefined;
};

const titleAfter = (text: string, pattern: RegExp) => {
  const m = text.match(pattern);
  return m?.[1]?.trim().replace(/^['"]|['"]$/g, '');
};

export function applyLocalHomeAI(instruction: string, current: HomePageConfig, cmsPages: Record<string, any>, navigationConfig: any, selectedSectionId?: string | null): LocalAIResult {
  const text = instruction.trim();
  const lower = text.toLowerCase();
  let sections = [...current.sections];
  let config: HomePageConfig = { ...current, sections };
  const changed: string[] = [];

  // Resolve target section: explicit mention in the instruction first
  // (findSectionId), then whatever section the owner has selected in the
  // UI. Section-scoped commands (hide/compact/heading/etc.) only fire when
  // a target actually exists — pageMatch/logo/favicon/global-scroll below
  // don't need a section at all, so they still work with no target.
  const sectionId = findSectionId(text, sections) || selectedSectionId || undefined;
  const section = sections.find(s => s.id === sectionId);
  const pageUpdates: Record<string, any> = {};

  // Commands that clearly need a specific section but have neither a name
  // match nor a UI selection to fall back on: ask instead of guessing.
  const looksSectionScoped = /\b(hide|remove|disable|chhupa|band|show|unhide|enable|dikha|compact|smaller|small|shorter|chhota|chhoti|kam|reduce|heading|title|naam|description|subheading|layout|spacing|auto.?scroll|top|bottom|move|neeche|upar)\b/i.test(lower);
  if (!section && looksSectionScoped && !/create|add.*page|banao.*page|logo|favicon/i.test(lower)) {
    return {
      config: current,
      message: 'Kis section ko change karna hai? Pehle homepage section select karo ya screenshot bhejo, phir dobara try karo.',
      needsClarification: true
    };
  }

  if (section) {
    // "remove"/"hata" is dangerously ambiguous on its own: "extra details
    // remove karo" (talking about text inside the section) and "is section
    // ko remove karo" (talking about the section itself) both contain the
    // same word. Treating any "remove" as hide-the-section is exactly how
    // "shorten the Why Choose Us text" ended up hiding the whole section.
    // Only "hide/chhupa/band/disable" are unambiguous on their own. "remove/
    // hata/delete" only counts as hiding the SECTION when the sentence is
    // clearly about the section/card/block itself — and never when it's
    // talking about text/details/content inside it, which is the far more
    // common real phrasing and must instead fall through to the
    // description/compact handling below.
    const talksAboutContentNotSection = /\b(detail|details|text|content|info|information|description|point|points|line|lines|word|words|copy|paragraph|matter)\b/i.test(lower);
    const talksAboutSectionItself = /\b(section|block|widget|component|is\s+poore|puri|pura)\b/i.test(lower);
    const unambiguousHide = hasUnnegatedKeyword(lower, /^(hide|chhupa|band|disable)$/i);
    const removeMeansHideSection = hasUnnegatedKeyword(lower, /^(remove|delete|hata|hatao|hatado|hataye|hatana)$/i) && talksAboutSectionItself && !talksAboutContentNotSection;

    if (unambiguousHide || removeMeansHideSection) {
      sections = sections.map(s => s.id === section.id ? { ...s, visible: false } : s);
      changed.push(`hide ${section.label}`);
    }
    if (hasUnnegatedKeyword(lower, /^(show|unhide|enable|dikha|on)$/i) && !(unambiguousHide || removeMeansHideSection)) {
      sections = sections.map(s => s.id === section.id ? { ...s, visible: true } : s);
      changed.push(`show ${section.label}`);
    }

    const heading = titleAfter(text, /(?:heading|title|naam|name)\s*(?:to|as|=|:)?\s*["“']?(.+?)["”']?$/i);
    if (heading && /(?:heading|title|naam|name)/i.test(lower)) {
      sections = sections.map(s => s.id === section.id ? { ...s, headingOverride: heading } : s);
      changed.push(`change ${section.label} heading`);
    }

    const description = titleAfter(text, /(?:description|subheading|subtitle)\s*(?:to|as|=|:)?\s*["“']?(.+?)["”']?$/i);
    if (description) {
      sections = sections.map(s => s.id === section.id ? { ...s, subheadingOverride: description } : s);
      changed.push(`change ${section.label} description`);
    }

    // Requests to trim/shorten TEXT inside a section (as opposed to the
    // wantsCompact spacing/layout toggle below, which only affects visual
    // density, not word count) — e.g. "extra details remove karo", "isme
    // se excess text hata do". The offline engine can't safely rewrite
    // prose itself (that needs real judgement, which is what the Gemini
    // path above is for) — but it must never fall silently through to
    // "no change" or, worse, mis-fire as a hide. Surface this honestly
    // instead of guessing at new wording.
    const wantsTextTrim = talksAboutContentNotSection && /\b(remove|hata\w*|kam|reduce|less|excess|extra|unnecessary|zyada|jyada|shorten|chhota|chhoti|crowd)\b/i.test(lower);
    const textTrimRequested = wantsTextTrim && !(unambiguousHide || removeMeansHideSection);
    if (textTrimRequested && section.id === 'whyChoose') {
      // Pre-approved shortened copy for this exact section, confirmed with
      // the owner: titles, stats, icons, colors, layout and card count are
      // untouched — only the long supporting paragraph inside each card is
      // trimmed to its essential point, numbers kept.
      pageUpdates.home = {
        ...(pageUpdates.home || {}),
        whyChooseUs: {
          customFields: {
            ...(pageUpdates.home?.whyChooseUs?.customFields || {}),
            block1Desc: 'Direct owner-to-buyer deals with 0% brokerage. Save up to ₹3,00,000 on your purchase or rental.',
            block2Desc: 'Title verification, packers & movers, cleaning and painting — all arranged for you under one roof.',
            block3Desc: 'Festive developer discounts, 0% stamp duty subsidies and free site-visit assistance — direct to you.'
          }
        }
      };
      changed.push('shorten Why Choose Us card text (section, cards, titles, stats and icons unchanged)');
    } else if (textTrimRequested) {
      return {
        config: current,
        message: `"${section.label}" ke text ko main abhi khud shorten nahi kar sakta bina exact wording ke — kaunsa hissa hata na hai, wo bata do (ya AI service configure karo).`,
        needsClarification: true
      };
    }

    const wantsCompact = /\b(compact|smaller|small|shorter|chhota|chhoti|kam|less|reduce|short)\b/i.test(lower) && !talksAboutContentNotSection;
    if (wantsCompact) {
      sections = sections.map(s => s.id === section.id
        ? { ...s, layout: 'compact', spacing: 'tight' }
        : s);
      changed.push(`${section.label} compact`);
      if (section.id === 'whyChoose') {
        pageUpdates.home = {
          whyChooseUs: {
            customFields: {
              compact: true,
              density: 'compact'
            }
          }
        };
      }
    }

    const layoutMatch = lower.match(/\b(full|compact|split|grid|carousel|auto)\b/);
    if (layoutMatch) {
      sections = sections.map(s => s.id === section.id ? { ...s, layout: layoutMatch[1] as HomePageSectionConfig['layout'] } : s);
      changed.push(`${section.label} layout ${layoutMatch[1]}`);
    }

    const spacingMatch = lower.match(/\b(tight|normal|airy)\s*(?:spacing|space)?\b/);
    if (spacingMatch) {
      sections = sections.map(s => s.id === section.id ? { ...s, spacing: spacingMatch[1] as HomePageSectionConfig['spacing'] } : s);
      changed.push(`${section.label} spacing`);
    }

    if (/(auto.?scroll|automatic scroll)/i.test(lower)) {
      const on = !/(off|disable|stop|band)/i.test(lower);
      sections = sections.map(s => s.id === section.id ? { ...s, autoScroll: on } : s);
      const speed = lower.match(/(?:speed|rate)\s*(?:to|=)?\s*(\d+(?:\.\d+)?)x?/i);
      if (speed) sections = sections.map(s => s.id === section.id ? { ...s, autoScrollSpeed: Math.min(3, Math.max(0.5, Number(speed[1]))) } : s);
      changed.push(`${section.label} auto-scroll ${on ? 'on' : 'off'}`);
    }

    if (/(top|first|upar|sabse upar)/i.test(lower) && /(move|bring|put|shift|place|lao)/i.test(lower)) {
      const index = sections.findIndex(s => s.id === section.id);
      if (index > 0) sections = [sections[index], ...sections.slice(0, index), ...sections.slice(index + 1)];
      changed.push(`move ${section.label} to top`);
    }
    if (/(bottom|last|neeche|sabse neeche)/i.test(lower) && /(move|bring|put|shift|place|lao)/i.test(lower)) {
      const index = sections.findIndex(s => s.id === section.id);
      if (index >= 0 && index < sections.length - 1) sections = [...sections.slice(0, index), ...sections.slice(index + 1), sections[index]];
      changed.push(`move ${section.label} to bottom`);
    }
  }

  const afterMatch = text.match(/(?:move|place|shift)\s+(.+?)\s+(?:after|below)\s+(.+)/i);
  if (afterMatch) {
    const from = findSectionId(afterMatch[1], sections);
    const to = findSectionId(afterMatch[2], sections);
    if (from && to && from !== to) {
      const source = sections.find(s => s.id === from);
      if (source) {
        sections = sections.filter(s => s.id !== from);
        const index = sections.findIndex(s => s.id === to);
        sections.splice(index + 1, 0, source);
        changed.push(`move ${source.label} after ${sections[index]?.label || to}`);
      }
    }
  }

  const offset = text.match(/(?:scroll|top)\s*(?:offset)?\s*(?:to|=)\s*(\d+)/i);
  if (offset) { config = { ...config, autoScrollOffset: Number(offset[1]) }; changed.push('scroll offset'); }
  if (/(smooth scroll|smooth scrolling)/i.test(lower)) { config = { ...config, smoothScroll: !/(off|disable|stop|band)/i.test(lower) }; changed.push('smooth scrolling'); }

  const logo = titleAfter(text, /(?:logo)\s*(?:to|as|=|:)?\s*["“']?(.+?)["”']?$/i);
  if (logo && /logo/i.test(lower)) { config = { ...config, brandLogoUrl: logo }; changed.push('logo'); }
  const favicon = titleAfter(text, /(?:favicon)\s*(?:to|as|=|:)?\s*["“']?(.+?)["”']?$/i);
  if (favicon) { config = { ...config, faviconUrl: favicon }; changed.push('favicon'); }

  const pageMatch = text.match(/(?:create|add|make|banao)\s+(?:a\s+)?(?:new\s+)?page\s+(?:called|named|name)?\s*["“']?(.+?)["”']?(?:\s+page)?$/i);
  let createdPages: any[] = [];
  if (pageMatch) {
    const title = pageMatch[1].trim().replace(/^['"]|['"]$/g, '').replace(/\s+page$/i, '');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const id = `custom-${slug || Date.now()}`;
    if (!cmsPages[id]) {
      createdPages = [{ id, title, slug: `/${slug}`, metaTitle: title, metaDescription: '', lastUpdated: new Date().toISOString().slice(0,10), sections: { header: { id: 'header', name: 'Page Header', badge: 'Auricity', heading: title, subheading: 'Created with the Auricity AI Website Editor.', imageUrl: '' } } }];
      changed.push(`create page ${title}`);
    }
  }

  if (/(reset|restore).*(homepage|home page|layout)/i.test(lower)) {
    config = { ...current, sections: current.sections };
    changed.push('restore homepage layout');
  } else {
    config = { ...config, sections };
  }

  return {
    config,
    navigationConfig,
    createdPages,
    pageUpdates,
    message: changed.length ? `Done: ${changed.join(', ')}.` : 'I could not find a specific change. Try: “hide Services”, “move Sale Properties to top”, or “create a page called About”.'
  };
}
