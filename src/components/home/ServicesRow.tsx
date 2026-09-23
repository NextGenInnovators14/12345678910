import React from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { motion } from 'motion/react';
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
  Star,
  Percent,
  Sparkle
} from 'lucide-react';

export const ServicesRow: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('services', 'What We Do Best', 'Verified doorstep assistance for property and home needs across Sambhajinagar.');
  const { setActiveView, navigateToServiceDetail } = useApp();

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

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E5DEC9] transition-colors w-full overflow-hidden" id="what-we-do-best-services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#1E4FA8] text-xs font-black uppercase tracking-wider border border-amber-300/80">
              <Sparkle className="w-3.5 h-3.5 text-[#F2621E]" />
              <span>Doorstep Assistance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E4FA8] tracking-tight">
              {homeHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {homeSubheading}
            </p>
          </div>

          <button
            onClick={() => setActiveView('services')}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-[#1E4FA8] hover:text-[#F2621E] transition-colors cursor-pointer group shrink-0"
            id="view-all-services-link"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scrollable Row of Service Category Cards */}
        <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
          {HOME_SERVICE_CATEGORIES.map((category) => {
            const Icon = getServiceIcon(category.id);

            return (
              <motion.div
                key={category.id}
                onClick={() => navigateToServiceDetail(category.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-[260px] sm:w-[280px] shrink-0 bg-white border border-[#E2DAC6] group rounded-2xl overflow-hidden hover:border-[#1E4FA8]/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs"
                id={`services-row-card-${category.id}`}
              >
                {/* Category Image + Badges */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Offer Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-[#F2621E] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center space-x-1">
                    <Percent className="w-3 h-3" />
                    <span>{category.offerBadge}</span>
                  </div>

                  {/* Icon Badge Stamp */}
                  <div className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs border border-white/40">
                    <Icon className="w-4 h-4 text-[#1E4FA8]" />
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-900 flex items-center space-x-1 shadow-xs border border-white/40">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-[#1E4FA8] transition-colors leading-snug">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Starting at</span>
                      <span className="text-xs font-black text-[#1E4FA8]">
                        {category.startingPrice}
                      </span>
                    </div>

                    <span className="text-[11px] font-black text-[#F2621E] flex items-center space-x-1">
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* End Card: View All */}
          <div
            onClick={() => setActiveView('services')}
            className="w-[200px] shrink-0 rounded-2xl bg-amber-50/80 border-2 border-dashed border-amber-300/80 p-5 flex flex-col items-center justify-center text-center space-y-2 hover:bg-[#1E4FA8] hover:text-white transition-all duration-300 cursor-pointer group shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-white text-[#1E4FA8] flex items-center justify-center shadow-xs group-hover:bg-white/20 group-hover:text-white transition-colors">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-black text-sm text-[#1E4FA8] group-hover:text-white">
              View All Services
            </div>
            <div className="text-[11px] text-slate-600 group-hover:text-white/80 font-medium">
              10+ Doorstep Categories
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
