import React from 'react';
import { useApp } from '../../context/AppContext';
import { HOME_SERVICE_CATEGORIES } from '../../data/homeServicesData';
import { 
  Truck, 
  Paintbrush, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  Cpu, 
  Droplets, 
  Zap, 
  Wrench, 
  ArrowRight,
  Sparkle,
  Star,
  Percent
} from 'lucide-react';

export const ServicesShowcase: React.FC = () => {
  const { setActiveView } = useApp();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'packers-movers': return Truck;
      case 'painting': return Paintbrush;
      case 'cleaning': return Sparkles;
      case 'pest-control': return ShieldAlert;
      case 'legal-services': return Scale;
      case 'appliances-repair': return Cpu;
      case 'plumbing': return Droplets;
      case 'electrician': return Zap;
      case 'carpentry': return Wrench;
      case 'ro-water-purifier': return Droplets;
      default: return Wrench;
    }
  };

  // Show top 5 categories on homepage
  const homepageCategories = HOME_SERVICE_CATEGORIES.slice(0, 5);

  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)] border-b border-[var(--border)] transition-colors" id="home-services-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] border border-[var(--primary)]/20 text-xs font-bold text-[var(--primary)]">
              <Sparkle className="w-3.5 h-3.5 text-[var(--secondary)]" />
              <span>Doorstep Real Estate & Home Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Verified Home Services in Sambhajinagar
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl font-medium">
              Professional, background-verified local technicians for shifting, painting, deep cleaning, legal verification, and home repairs with transparent pricing.
            </p>
          </div>

          <button
            onClick={() => setActiveView('services')}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group self-start md:self-auto bg-[var(--primary-light)] px-4 py-2 rounded-xl border border-[var(--primary)]/20"
            id="view-all-services-link"
          >
            <span>Explore All 10+ Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-Card Grid: 5 Top Service Categories + 1 "See More Services" Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageCategories.map((category) => {
            const Icon = getServiceIcon(category.id);

            return (
              <div
                key={category.id}
                onClick={() => setActiveView('services')}
                className="group relative card-theme hover:border-[var(--primary)]/50 shadow-subtle hover-lift transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                id={`homepage-service-card-${category.id}`}
              >
                {/* Category Image with Offer Badge Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  
                  {/* Offer / Discount Badge */}
                  <div className="absolute top-3 left-3 bg-[var(--secondary)] text-white text-[11px] font-black tracking-wide uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Percent className="w-3 h-3" />
                    <span>{category.offerBadge}</span>
                  </div>

                  {/* Icon Stamp */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs border border-white/40">
                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#0F172A] flex items-center space-x-1 shadow-xs border border-white/40">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-black text-base text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block font-medium">Starting from</span>
                      <span className="text-sm font-black text-[var(--primary)]">
                        {category.startingPrice}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[var(--secondary)] flex items-center space-x-1">
                      <span>Book Pro</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: "See More Services →" styled with Theme Secondary Color */}
          <div
            onClick={() => setActiveView('services')}
            className="group relative bg-[var(--secondary)] text-white rounded-3xl p-6 sm:p-7 shadow-md hover-lift transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[300px] border border-white/20"
            id="homepage-see-more-services-card"
          >
            {/* Top Icon & Badge */}
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="bg-white text-[var(--secondary)] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                10+ Categories
              </span>
            </div>

            {/* Middle Teaser Text */}
            <div className="space-y-2 py-4">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Explore All Home Services
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                Plumbing, Electrician, RO Service, Pest Control, Carpentry & Full Home Shifting with verified Sambhajinagar pros.
              </p>
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs font-bold text-white/90">
                0% Hidden Charges
              </span>
              <div className="inline-flex items-center space-x-2 bg-white text-[var(--secondary)] px-4 py-2 rounded-xl text-xs font-black shadow-sm group-hover:bg-slate-50 transition-colors">
                <span>See More Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
