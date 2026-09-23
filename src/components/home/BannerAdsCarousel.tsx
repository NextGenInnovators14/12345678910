import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface BannerAdsCarouselProps { onOpenEMIModal?: () => void; }

const fallbackAds = [
  { id:'fallback-1', tag:'AURICITY PROPERTY UPDATE', tagBg:'bg-[#1E4FA8] text-white', title:'Verified property opportunities in Sambhajinagar', subtitle:'Explore sale, rent and project listings with one consistent experience.', desc:'Search by locality, configuration, budget and verification status.', ctaText:'Explore Properties', ctaActionType:'view', ctaLink:'properties', bgGradient:'from-[#F7F2E6] via-[#EFE7D5] to-[#E7DEC5] border border-[#DDD3BC]', titleColor:'text-[#1E4FA8]', subtitleColor:'text-[#F2621E]', descColor:'text-slate-700', badge:'Verified Listings', badgeStyle:'bg-amber-100 text-amber-900 border-amber-300/80', image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', active:true, order:1 },
  { id:'fallback-2', tag:'LIST YOUR PROPERTY', tagBg:'bg-[#F2621E] text-white', title:'List your property with Auricity', subtitle:'A clean direct-listing experience for owners.', desc:'Submit your property and let the admin team review it before publication.', ctaText:'Post Property for FREE', ctaActionType:'post_property', ctaLink:'post-property', bgGradient:'from-[#FFF4ED] via-[#FDECE2] to-[#FCE0D2] border border-[#F6D0BC]', titleColor:'text-orange-950', subtitleColor:'text-[#F2621E]', descColor:'text-slate-700', badge:'Owner Listing', badgeStyle:'bg-orange-100 text-orange-900 border-orange-300/80', image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', active:true, order:2 }
];

export const BannerAdsCarousel: React.FC<BannerAdsCarouselProps> = ({ onOpenEMIModal }) => {
  const { setActiveView, bannerAds } = useApp();
  const ads = useMemo(() => (bannerAds?.filter(a => a.active).sort((a,b)=>a.order-b.order).length ? bannerAds.filter(a=>a.active).sort((a,b)=>a.order-b.order) : fallbackAds), [bannerAds]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => { setCurrentIndex(i => Math.min(i, Math.max(0, ads.length - 1))); }, [ads.length]);
  useEffect(() => { if (ads.length < 2) return; const timer = setInterval(()=>setCurrentIndex(i=>(i+1)%ads.length),10000); return ()=>clearInterval(timer); }, [ads.length]);

  const runAction = (ad:any) => {
    if (ad.linkUrl) { window.open(ad.linkUrl, '_blank', 'noopener,noreferrer'); return; }
    switch(ad.ctaActionType) {
      case 'emi_modal': onOpenEMIModal ? onOpenEMIModal() : setActiveView('services'); break;
      case 'post_property': setActiveView('post-property'); break;
      case 'whatsapp': window.open(ad.ctaLink || 'https://wa.me/918010506030','_blank','noopener,noreferrer'); break;
      case 'external': if(ad.ctaLink) window.open(ad.ctaLink,'_blank','noopener,noreferrer'); break;
      default: setActiveView(ad.ctaLink || 'properties');
    }
  };
  const activeAd:any = ads[currentIndex] || fallbackAds[0];
  const prev=()=>setCurrentIndex(i=>i===0?ads.length-1:i-1); const next=()=>setCurrentIndex(i=>(i+1)%ads.length);
  const onTouchEnd=()=>{ if(touchStart===null||touchEnd===null)return; const d=touchStart-touchEnd; if(Math.abs(d)>50)d>0?next():prev(); setTouchStart(null);setTouchEnd(null); };

  return <section className="w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface-secondary)] py-5 sm:py-7" id="banner-ads-carousel-section"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-[1.75rem] shadow-sm" onTouchStart={e=>setTouchStart(e.targetTouches[0].clientX)} onTouchMove={e=>setTouchEnd(e.targetTouches[0].clientX)} onTouchEnd={onTouchEnd}><div className={`relative flex min-h-[285px] w-full items-center overflow-hidden bg-gradient-to-r p-6 sm:min-h-[250px] sm:p-10 ${activeAd.bgGradient}`}><div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] opacity-20 md:block">{activeAd.videoUrl ? <video src={activeAd.videoUrl} autoPlay muted loop playsInline className="h-full w-full object-cover mix-blend-multiply" aria-label={activeAd.title} /> : <img src={activeAd.image} alt="" className="h-full w-full object-cover mix-blend-multiply"/>}</div><div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider sm:text-xs ${activeAd.tagBg}`}>{activeAd.tag}</span><span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${activeAd.badgeStyle}`}>{activeAd.badge}</span></div><div><h2 className={`text-xl font-black leading-snug tracking-tight sm:text-3xl ${activeAd.titleColor}`}>{activeAd.title}</h2><p className={`mt-1 text-xs font-bold sm:text-sm ${activeAd.subtitleColor}`}>{activeAd.subtitle}</p><p className={`mt-2 hidden max-w-2xl text-xs leading-relaxed sm:block ${activeAd.descColor}`}>{activeAd.desc}</p></div><button onClick={()=>runAction(activeAd)} className="btn-theme-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black shadow-md sm:text-sm"><span>{activeAd.ctaText}</span><ArrowRight className="h-4 w-4"/></button></div><div className="absolute bottom-4 right-4 z-20 flex gap-2 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto"><button onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-800 shadow-sm" aria-label="Previous advertisement"><ChevronLeft className="h-5 w-5"/></button><button onClick={next} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-800 shadow-sm" aria-label="Next advertisement"><ChevronRight className="h-5 w-5"/></button></div><div className="absolute bottom-3 left-6 z-20 flex gap-1.5 sm:left-10">{ads.map((_:any,i:number)=><button key={i} onClick={()=>setCurrentIndex(i)} aria-label={`Advertisement ${i+1}`} className={`h-1.5 rounded-full transition-all ${currentIndex===i?'w-6 bg-[#1E4FA8]':'w-2 bg-slate-400/60'}`}/>)}</div></div></div></div></section>;
};
