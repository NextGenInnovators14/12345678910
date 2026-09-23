import React, { useState, useEffect } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Key, 
  Sparkles, 
  PartyPopper, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Building2,
  Quote
} from 'lucide-react';

export const BuyerTestimonialsSection: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('testimonials', 'Keys to Happiness: Our Home Buyers', 'Real customer stories and successful property journeys.');
  const { cmsPages } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const defaultBuyerStories = [
    {
      id: 'story-1',
      buyerName: 'Pravin & Snehal Deshmukh',
      locality: 'SkyHeights, CIDCO N-4',
      propertyType: '3 BHK High-Rise Apartment',
      brokerageSaved: '₹ 1,76,000 Saved in Brokerage',
      story: 'We were searching for a 3 BHK in CIDCO for almost 8 months. Through Auricity, we connected directly with the original owner Vikas-ji within 2 days. The 30-year advocate title verification gave us 100% peace of mind. Truly zero brokerage!',
      rating: 5,
      date: 'Handover: August 2026',
      photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      badge: 'First Time Home Buyer'
    },
    {
      id: 'story-2',
      buyerName: 'Dr. Anand & Rohini Kulkarni',
      locality: 'Samarth Imperial Heights, Beed Bypass',
      propertyType: '4 BHK Sky Villa',
      brokerageSaved: '₹ 2,45,000 Saved in Brokerage',
      story: 'The AI Valuator gave us exact micro-market rate predictions for Beed Bypass. We directly negotiated with the developer with zero intermediary pressure. Auricity doorstep advocate verification was swift and transparent.',
      rating: 5,
      date: 'Handover: July 2026',
      photo: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      badge: 'Luxury Villa Owner'
    },
    {
      id: 'story-3',
      buyerName: 'Mahesh & Sunita Gaikwad',
      locality: 'Garkheda Sutgirni Parisar',
      propertyType: '2 BHK Vaastu Friendly Flat',
      brokerageSaved: '₹ 95,000 Saved in Brokerage',
      story: 'As a retired government servant, safety of investment was my biggest priority. Auricity field team visited the site, verified the 7/12 extract and municipal sanction before I paid any token money. Highly recommended for every Sambhajinagar family!',
      rating: 5,
      date: 'Handover: June 2026',
      photo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      badge: 'Verified Deal'
    }
  ];

  const cmsItems = cmsPages?.home?.sections?.testimonials?.items;
  const buyerStories = Array.isArray(cmsItems) && cmsItems.length > 0 ? cmsItems : defaultBuyerStories;

  // Auto-scroll through buyer photos every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % buyerStories.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [buyerStories.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? buyerStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % buyerStories.length);
  };

  // Touch swipe handling
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const current = buyerStories[currentIndex];

  return (
    <section className="py-12 sm:py-18 bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="keys-to-happiness-buyers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
            <Key className="w-3.5 h-3.5 text-[var(--secondary)]" />
            <span>Keys to Happiness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            {homeHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
            {homeSubheading}
          </p>
        </div>

        {/* Two Side-by-Side Panels (Desktop) / Stacked Vertically on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Panel: Congratulations Graphic + Dynamic Caption Story Box (5/12 cols) */}
          <div className="lg:col-span-5 bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-md flex flex-col justify-between space-y-6">
            
            {/* Top: Congratulations Graphic Badge */}
            <div className="flex items-center space-x-3 pb-4 border-b border-[var(--border)]">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[var(--secondary)] flex items-center justify-center border border-amber-200 shadow-2xs shrink-0">
                <PartyPopper className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--secondary)] block">
                  Celebration Handover
                </span>
                <h3 className="text-lg font-black text-[var(--text-primary)] leading-tight">
                  Congratulations to the Family!
                </h3>
              </div>
            </div>

            {/* Dynamic Text Box: Scrolling Story for Current Buyer */}
            <div className="p-5 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] space-y-3 relative">
              <Quote className="w-8 h-8 text-[var(--primary)]/15 absolute top-3 right-3" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {current.brokerageSaved}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed italic font-medium">
                "{current.story}"
              </p>

              <div className="pt-2 border-t border-[var(--border)]">
                <div className="font-black text-sm text-[var(--text-primary)]">
                  {current.buyerName}
                </div>
                <div className="text-xs text-[var(--secondary)] font-bold flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{current.locality}</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  {current.propertyType} • {current.date}
                </div>
              </div>
            </div>

            {/* Bottom Indicator / Thumbnails */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-[var(--text-secondary)]">
                Story {currentIndex + 1} of {buyerStories.length}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--primary-light)] text-[var(--text-primary)] hover:text-[var(--primary)] border border-[var(--border)] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous Story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--primary-light)] text-[var(--text-primary)] hover:text-[var(--primary)] border border-[var(--border)] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next Story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: Large Rounded Card with Auto-Scrolling Buyer Photos (7/12 cols) */}
          <div 
            className="lg:col-span-7 bg-[#F5F1E8] rounded-3xl overflow-hidden shadow-md border border-[var(--border)] relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-end select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Background Photo with Transition */}
            <img
              src={current.photo}
              alt={current.buyerName}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Overlay Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-lg border border-white/40 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--secondary)]" />
                <span>{current.badge}</span>
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Auricity Verified Happy Family</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {current.buyerName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                New Homeowners at {current.locality} ({current.propertyType})
              </p>

              {/* Progress Dots Indicator */}
              <div className="flex items-center space-x-2 pt-2">
                {buyerStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Jump to buyer ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
