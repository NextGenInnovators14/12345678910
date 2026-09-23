import React, { useState } from 'react';
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
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

export const FeaturedProjectsRow: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('featuredProjects', 'Featured Projects', 'Handpicked RERA-approved townships and luxury residences with direct developer pricing and zero brokerage.');
  const { projects, cmsPages, setActiveView, navigateToProjectDetail } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionData = cmsPages?.home?.sections?.featuredProjects;
  const heading = sectionData?.heading || 'Featured Projects';
  const subheading = sectionData?.subheading || 'Explore premier RERA-registered townships and luxury residences with direct developer pricing and zero brokerage.';
  const badge = sectionData?.badge || 'Premier Builder Mandates';

  // Filter projects marked as featured, fallback to first 4 projects if none marked
  const featuredList = projects.filter(p => p.featured);
  const displayProjects = (featuredList.length > 0 ? featuredList : projects).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="featured-projects-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            {badge && (
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[var(--secondary)]" />
                <span>{badge}</span>
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                {subheading}
              </p>
            )}
          </div>

          <button
            onClick={() => setActiveView('projects')}
            className="self-start md:self-auto inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] transition-colors group cursor-pointer"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Projects: Grid on Desktop (2-4 cols), Horizontal Scroll on Mobile */}
        <div className="flex gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--primary)]/40 scrollbar-track-[var(--surface-secondary)] pb-3">
          {displayProjects.map((project) => {
            // Price range format
            const minPrice = project.minPrice ? `₹${(project.minPrice / 100000).toFixed(project.minPrice % 100000 === 0 ? 0 : 2)}L` : '';
            const maxPrice = project.maxPrice ? `₹${(project.maxPrice / 100000).toFixed(project.maxPrice % 100000 === 0 ? 0 : 2)}L` : '';
            const priceRange = minPrice && maxPrice ? `${minPrice} - ${maxPrice}` : minPrice || project.priceRange || 'Price on Request';
            
            // BHK range format
            const bhkRange = project.configurations && project.configurations.length > 0 
              ? project.configurations.join(', ')
              : (project.bhkRange || '2 & 3 BHK');

            const thumbnail = project.coverImage || project.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';

            return (
              <motion.div
                key={project.id}
                id={`featured-project-card-${project.id}`}
                onClick={() => navigateToProjectDetail(project.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.28, delay: (displayProjects.indexOf(project)) * 0.06, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-start card-theme p-5 rounded-3xl flex flex-col justify-between space-y-4 hover:border-[var(--primary)]/40 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4 text-center flex flex-col items-center">
                  
                  {/* Circular Project Thumbnail with Badge */}
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md ring-2 ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/60 transition-all duration-300">
                      <img
                        src={thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {project.status && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--secondary)] text-white shadow-xs whitespace-nowrap">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Project Title & Developer */}
                  <div className="space-y-1 w-full">
                    <h3 className="font-black text-base text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-1 text-[11px] text-[var(--text-secondary)] font-medium">
                      <MapPin className="w-3 h-3 text-[var(--secondary)] shrink-0" />
                      <span className="truncate">{project.locality || project.location || 'Sambhajinagar'}</span>
                    </div>
                  </div>

                  {/* BHK & Price Highlight Pill */}
                  <div className="w-full py-1.5 px-3 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black border border-[var(--primary)]/20 text-center">
                    <span>{bhkRange}</span>
                    <span className="mx-1.5 opacity-40">|</span>
                    <span className="text-[var(--secondary)]">{priceRange}</span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal line-clamp-2 text-center">
                    {project.description || `${project.developer || 'Leading Builder'} project offering modern amenities, clubhouse, landscaped gardens, and MahaRERA certified title.`}
                  </p>
                </div>

                {/* View Details Action Link */}
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>0% Brokerage</span>
                  </span>

                  <button
                    onClick={() => navigateToProjectDetail(project.id)}
                    className="inline-flex items-center space-x-1 text-xs font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group-hover:underline"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
