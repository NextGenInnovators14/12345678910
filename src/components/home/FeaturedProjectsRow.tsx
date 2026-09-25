import React, { useState, useRef } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Eye
} from 'lucide-react';

export const FeaturedProjectsRow: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('featuredProjects', 'Featured Projects', 'Handpicked RERA-approved townships and luxury residences with direct developer pricing and zero brokerage.');
  const { projects, cmsPages, setActiveView, navigateToProjectDetail } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sectionData = cmsPages?.home?.sections?.featuredProjects;
  const heading = sectionData?.heading || homeHeading || 'Featured Projects';
  const subheading = sectionData?.subheading || homeSubheading || 'Explore premier RERA-registered townships and luxury residences with direct developer pricing and zero brokerage.';
  const badge = sectionData?.badge || 'Premier Builder Mandates';

  // Filter projects marked as featured, or show all projects if few are marked
  const featuredList = projects.filter(p => p.featured);
  const displayProjects = featuredList.length > 0 ? featuredList : projects;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -290 : 290;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-12 bg-[var(--surface)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="featured-projects-section">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div className="space-y-1 max-w-2xl">
            {badge && (
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[var(--secondary)]" />
                <span>{badge}</span>
              </div>
            )}
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium line-clamp-1 sm:line-clamp-none">
                {subheading}
              </p>
            )}
          </div>

          {/* Navigation Controls & Explore All */}
          <div className="flex items-center space-x-2 sm:space-x-3 self-start sm:self-auto">
            <button
              onClick={() => setActiveView('projects')}
              className="inline-flex items-center space-x-1 text-[11px] sm:text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] transition-colors group cursor-pointer mr-1"
            >
              <span>Explore All ({projects.length})</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Scroll buttons */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="Scroll Left"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="Scroll Right"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Projects Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2.5 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 px-0.5 pb-2 scrollbar-thin scrollbar-thumb-[var(--primary)]/40 scrollbar-track-[var(--surface-secondary)]"
        >
          {displayProjects.map((project, idx) => {
            // Price range format
            const minPrice = project.minPrice ? `₹${(project.minPrice / 100000).toFixed(project.minPrice % 100000 === 0 ? 0 : 2)}L` : '';
            const maxPrice = project.maxPrice ? `₹${(project.maxPrice / 100000).toFixed(project.maxPrice % 100000 === 0 ? 0 : 2)}L` : '';
            const priceRange = minPrice && maxPrice ? `${minPrice} - ${maxPrice}` : minPrice || project.priceRange || 'Price on Request';
            
            // BHK range format
            const bhkRange = project.configurations && project.configurations.length > 0 
              ? project.configurations.slice(0, 2).join(', ') + (project.configurations.length > 2 ? ` +${project.configurations.length - 2}` : '')
              : '2 & 3 BHK';

            const thumbnail = project.bannerImage || project.image || project.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';

            return (
              <motion.div
                key={project.id}
                id={`featured-project-card-${project.id}`}
                onClick={() => navigateToProjectDetail(project.id)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.28, delay: Math.min(idx * 0.05, 0.3) }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-[185px] sm:w-[235px] md:w-[280px] shrink-0 snap-start card-theme p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-between space-y-2 sm:space-y-3 hover:border-[var(--primary)]/50 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="space-y-2 sm:space-y-3 text-center flex flex-col items-center">
                  
                  {/* Circular Project Thumbnail with Badge */}
                  <div className="relative">
                    <div className="w-13 h-13 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 sm:border-3 border-white dark:border-slate-800 shadow-sm ring-2 ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/60 transition-all duration-300">
                      <img
                        src={thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    {project.status && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[var(--secondary)] text-white shadow-xs whitespace-nowrap">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Project Title & Developer */}
                  <div className="space-y-0.5 sm:space-y-1 w-full text-center">
                    <h3 className="font-black text-xs sm:text-sm md:text-base text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-1 text-[9px] sm:text-[11px] text-[var(--text-secondary)] font-medium">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--secondary)] shrink-0" />
                      <span className="truncate">{project.locality || project.location || 'Sambhajinagar'}</span>
                    </div>
                  </div>

                  {/* BHK & Price Highlight Pill */}
                  <div className="w-full py-1 px-1.5 sm:px-2 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] text-[9px] sm:text-xs font-black border border-[var(--primary)]/20 text-center">
                    <span>{bhkRange}</span>
                    <span className="mx-1 opacity-40">|</span>
                    <span className="text-[var(--secondary)]">{priceRange}</span>
                  </div>

                  {/* Short Description */}
                  <p className="text-[9px] sm:text-xs text-[var(--text-secondary)] leading-relaxed font-normal line-clamp-2 text-center">
                    {project.description || `${project.developer || 'Leading Builder'} project offering modern amenities, clubhouse, landscaped gardens, and MahaRERA certified title.`}
                  </p>
                </div>

                {/* View Details Action Link */}
                <div className="pt-1.5 sm:pt-2 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>0% Brokerage</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToProjectDetail(project.id);
                    }}
                    className="inline-flex items-center space-x-0.5 text-[10px] sm:text-xs font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group-hover:underline"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
