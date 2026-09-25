import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Calendar,
  X,
  PhoneCall,
  Download,
  Layers,
  Video,
  Film,
  FileText,
  Eye,
  ExternalLink
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('projects', 'Projects in Chh. Sambhajinagar', 'RERA-approved mega townships, high-rises, and commercial hubs with direct developer booking perks.');
  const { projects: contextProjects, setActiveView, navigateToProjectDetail } = useApp();
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeMediaView, setActiveMediaView] = useState<'gallery' | 'floorplan' | 'video'>('gallery');

  // Fallback if context is empty
  const allProjects = contextProjects && contextProjects.length > 0 ? contextProjects : [];

  const filteredProjects = allProjects.filter(p => {
    if (activeTab === 'commercial') {
      return p.locality.toLowerCase().includes('midc') || 
             p.locality.toLowerCase().includes('shendra') || 
             p.locality.toLowerCase().includes('dmic') || 
             p.name.toLowerCase().includes('arcade') || 
             p.name.toLowerCase().includes('park') || 
             p.name.toLowerCase().includes('hub');
    }
    return !p.name.toLowerCase().includes('arcade') && !p.name.toLowerCase().includes('shed');
  });

  const featuredProjects = allProjects.filter(p => p.featured).slice(0, 2);

  const handleOpenProjectModal = (p: Project) => {
    navigateToProjectDetail(p.id);
  };

  return (
    <section className="py-3.5 sm:py-8 bg-[var(--surface)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="projects-in-sambhajinagar-section">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-[9px] sm:text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
              <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--secondary)]" />
              <span>Builder Mandates & Townships</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {homeHeading}
            </h2>
            <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium line-clamp-1 sm:line-clamp-none">
              {homeSubheading}
            </p>
          </div>

          {/* Controls: Tab Toggle + View All */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 self-start sm:self-auto">
            <div className="flex items-center space-x-0.5 bg-[var(--surface-secondary)] p-0.5 rounded-lg sm:rounded-xl border border-[var(--border)] shadow-2xs">
              <button
                onClick={() => setActiveTab('residential')}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'residential'
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'commercial'
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Commercial
              </button>
            </div>

            <button
              onClick={() => setActiveView('properties')}
              className="inline-flex items-center space-x-1 text-xs font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Projects Directory Grid (Full Width) */}
        <div className="w-full space-y-4">
          <div className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(180px,1fr)] sm:auto-cols-[minmax(260px,1fr)] lg:auto-cols-[minmax(280px,1fr)] gap-2.5 sm:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--primary)]/40 scrollbar-track-[var(--surface-secondary)] snap-x snap-mandatory pb-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProjectModal(project)}
                className="card-theme group rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                id={`project-card-${project.id}`}
              >
                {/* Project Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-md border border-white/20 shadow-xs">
                    {project.status}
                  </div>

                  {/* Price Range Badge */}
                  <div className="absolute bottom-2 left-2 text-white">
                    <span className="text-xs font-black text-amber-300 block drop-shadow-xs">
                      {project.priceRange}
                    </span>
                  </div>

                  {/* Media Count Badge */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold">
                      📷 {project.images.length}
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                      {project.name}
                    </h4>
                    <div className="flex items-center space-x-1 text-[11px] text-[var(--text-secondary)] mt-0.5">
                      <MapPin className="w-3 h-3 text-[var(--secondary)] shrink-0" />
                      <span className="truncate">{project.locality}</span>
                    </div>
                  </div>

                  {/* Footer Button Label */}
                  <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 truncate">
                      {project.builderName}
                    </span>
                    <span className="text-[10px] font-black text-[var(--primary)] group-hover:text-[var(--secondary)] flex items-center space-x-0.5 shrink-0">
                      <span>Project Details</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Project Detail Modal Overlay with Rich Media Tabs */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--surface)] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] max-h-[92vh] flex flex-col">
            
            {/* Modal Header Media Viewer */}
            <div className="relative aspect-16/9 w-full bg-slate-950 overflow-hidden">
              {activeMediaView === 'gallery' ? (
                <img
                  src={selectedProject.images[activeImageIndex] || selectedProject.images[0]}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : activeMediaView === 'floorplan' ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 p-4">
                  {selectedProject.floorPlanUrl ? (
                    <img
                      src={selectedProject.floorPlanUrl}
                      alt="Floor Plan"
                      className="max-h-full max-w-full object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <Layers className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                      <p className="text-xs font-bold text-white">Blueprint Floor Plan Available on Request</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 p-6 text-center">
                  <div className="space-y-3">
                    <Video className="w-16 h-16 text-rose-500 mx-auto" />
                    <p className="text-sm font-bold text-white">Interactive Video Walkthrough</p>
                    {selectedProject.videoUrl ? (
                      <a
                        href={selectedProject.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                      >
                        Open YouTube Video <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <p className="text-xs text-slate-400">Video Walkthrough being edited by developer.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Media Switcher Tabs in Header */}
              <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                <button
                  onClick={() => setActiveMediaView('gallery')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg backdrop-blur-sm transition-all ${
                    activeMediaView === 'gallery' ? 'bg-white text-slate-900 shadow' : 'bg-black/60 text-white hover:bg-black/80'
                  }`}
                >
                  📷 Photos ({selectedProject.images.length})
                </button>
                {selectedProject.floorPlanUrl && (
                  <button
                    onClick={() => setActiveMediaView('floorplan')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg backdrop-blur-sm transition-all ${
                      activeMediaView === 'floorplan' ? 'bg-white text-slate-900 shadow' : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                  >
                    📐 Blueprint
                  </button>
                )}
                {selectedProject.videoUrl && (
                  <button
                    onClick={() => setActiveMediaView('video')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg backdrop-blur-sm transition-all ${
                      activeMediaView === 'video' ? 'bg-white text-slate-900 shadow' : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                  >
                    🎬 Video Tour
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer border border-white/20 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="bg-[var(--secondary)] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1 inline-block">
                  {selectedProject.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">{selectedProject.name}</h3>
                <p className="text-xs text-slate-300">{selectedProject.locality}, Chhatrapati Sambhajinagar</p>
              </div>
            </div>

            {/* Thumbnail Strip if multiple photos */}
            {selectedProject.images.length > 1 && activeMediaView === 'gallery' && (
              <div className="flex gap-2 p-2 bg-slate-900 overflow-x-auto no-scrollbar">
                {selectedProject.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-secondary)] p-4 rounded-2xl border border-[var(--border)]">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold block">Starting Price</span>
                  <span className="text-lg font-black text-[var(--primary)]">{selectedProject.priceRange}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold block">Developer</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">{selectedProject.builderName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold block">MahaRERA Registration</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">{selectedProject.reraNumber || 'P51500028491'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold block">Possession</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">{selectedProject.possessionDate || 'Under Construction'}</span>
                </div>
              </div>

              {selectedProject.exclusiveOffer && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Exclusive Booking Perk: {selectedProject.exclusiveOffer}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-[var(--text-primary)]">About the Project</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-[var(--text-primary)]">Key Project Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.amenities.map((am, i) => (
                    <span key={i} className="text-[11px] font-bold bg-[var(--surface-secondary)] text-[var(--text-primary)] px-2.5 py-1 rounded-lg border border-[var(--border)] flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{am}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[var(--surface-secondary)] border-t border-[var(--border)] flex items-center justify-between gap-3">
              {selectedProject.brochureUrl && (
                <a
                  href={selectedProject.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#1E4FA8] text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Brochure PDF</span>
                </a>
              )}

              <button
                onClick={() => {
                  window.open(`https://wa.me/918010506030?text=Hi%20Auricity,%20I%20am%20interested%20in%20${encodeURIComponent(selectedProject.name)}`, '_blank');
                }}
                className="btn-theme-secondary flex-1 py-2.5 text-xs font-black rounded-xl shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Project Desk</span>
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
