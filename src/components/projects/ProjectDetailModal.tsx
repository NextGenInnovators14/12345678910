import React, { useState } from 'react';
import { Project } from '../../types';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  X, 
  PhoneCall, 
  Download, 
  Layers, 
  Video, 
  Film, 
  FileText, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeMediaView, setActiveMediaView] = useState<'gallery' | 'floorplan' | 'video' | 'shorts'>('gallery');

  const images = project.images && project.images.length > 0 
    ? project.images 
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  const bhkDisplay = project.configurations && project.configurations.length > 0
    ? project.configurations.join(', ')
    : project.bhkRange || '2, 3 BHK Luxury Residences';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--secondary)]">
                {project.builderName || project.developer || 'Leading Builder'}
              </span>
              {project.status && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {project.status}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
              {project.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Media Switcher Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveMediaView('gallery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeMediaView === 'gallery'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>📸 Photos ({images.length})</span>
            </button>

            {project.floorPlanUrl && (
              <button
                onClick={() => setActiveMediaView('floorplan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeMediaView === 'floorplan'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Floor Plans</span>
              </button>
            )}

            {project.videoUrl && (
              <button
                onClick={() => setActiveMediaView('video')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeMediaView === 'video'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Tour</span>
              </button>
            )}

            {project.shortsUrl && (
              <button
                onClick={() => setActiveMediaView('shorts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeMediaView === 'shorts'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-rose-500" />
                <span>Reels / Shorts</span>
              </button>
            )}
          </div>

          {/* Media Player / Gallery Viewer */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
            {activeMediaView === 'gallery' && (
              <>
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={`${project.name} photo ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold">
                      {activeImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </>
            )}

            {activeMediaView === 'floorplan' && project.floorPlanUrl && (
              <img
                src={project.floorPlanUrl}
                alt={`${project.name} Floor Plan`}
                className="w-full h-full object-contain bg-white"
                referrerPolicy="no-referrer"
              />
            )}

            {activeMediaView === 'video' && project.videoUrl && (
              <iframe
                src={project.videoUrl.includes('embed') ? project.videoUrl : project.videoUrl.replace('watch?v=', 'embed/')}
                title={`${project.name} Video`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {activeMediaView === 'shorts' && project.shortsUrl && (
              <div className="w-full h-full flex items-center justify-center p-4">
                <video
                  src={project.shortsUrl}
                  controls
                  autoPlay
                  className="max-h-full rounded-xl"
                />
              </div>
            )}
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Configurations</span>
              <div className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{bhkDisplay}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Price Range</span>
              <div className="font-bold text-xs sm:text-sm text-[var(--secondary)]">{project.priceRange || 'Contact for Price'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Location</span>
              <div className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{project.locality || project.location || 'Sambhajinagar'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">MahaRERA Reg</span>
              <div className="font-bold text-xs sm:text-sm text-emerald-600 font-mono">{project.reraNumber || 'P51500019284'}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Overview & Amenities
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description || `${project.name} is a landmark residential township offering state-of-the-art construction, landscaped open areas, clubhouse, 24/7 security, high-speed elevators, and proximity to major commercial & educational hubs.`}
            </p>
          </div>

          {/* Amenities Badges */}
          {project.amenities && project.amenities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.amenities.map((amenity, aIdx) => (
                  <span
                    key={aIdx}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTAs */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-emerald-600 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Direct Developer Mandate • 0% Brokerage</span>
          </div>

          <div className="flex items-center gap-2">
            {project.brochureUrl && (
              <a
                href={project.brochureUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure</span>
              </a>
            )}

            <a
              href={`https://wa.me/918010506030?text=Hi%20Auricity,%20I%20am%20interested%20in%20visiting%20${encodeURIComponent(project.name)}%20(${encodeURIComponent(project.locality || '')}).`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-xl bg-[#1E4FA8] hover:bg-[#163D85] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>Book VIP Site Visit</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
