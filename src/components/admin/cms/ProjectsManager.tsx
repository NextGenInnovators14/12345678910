import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Project } from '../../../types';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Star, 
  Video, 
  FileText, 
  Image as ImageIcon,
  MapPin, 
  IndianRupee, 
  ShieldCheck, 
  Filter,
  X,
  Eye,
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';

const COMMON_PROJECT_AMENITIES = [
  'Grand Clubhouse',
  'Swimming Pool & Kids Pool',
  'State-of-the-Art Gymnasium',
  '24/7 Multi-Tier Security',
  'CCTV Surveillance',
  'EV Vehicle Charging Stations',
  'Landscaped Gardens & Jogging Track',
  'Children Play Arena',
  'Indoor Games & Badminton Court',
  'Power Backup for Common Areas',
  'Solar Water Heating',
  'Rainwater Harvesting',
  'Senior Citizens Relaxation Gazebo',
  'Party Hall & Banquet Facility'
];

const CONFIG_OPTIONS = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '3.5 BHK',
  '4 BHK',
  'Row House / Villa',
  'Penthouse',
  'Commercial Shops',
  'Office Spaces'
];

export const ProjectsManager: React.FC = () => {
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject,
    localitiesList,
    navigateToProjectDetail,
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [localityFilter, setLocalityFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  useModalBackHandler(isModalOpen, () => setIsModalOpen(false));
  const [form, setForm] = useState<Partial<Project>>({});
  const [activeFormTab, setActiveFormTab] = useState<'basics' | 'pricing' | 'media' | 'amenities'>('basics');
  const [newGalleryUrl, setNewGalleryUrl] = useState<string>('');

  // Stats
  const stats = {
    total: projects.length,
    underConstruction: projects.filter(p => p.status === 'Under Construction').length,
    readyToMove: projects.filter(p => p.status === 'Ready to Move').length,
    newLaunch: projects.filter(p => p.status === 'Newly Launched').length,
    featured: projects.filter(p => p.featured).length
  };

  // Filtered Projects
  const filteredProjects = projects.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || 
      p.name.toLowerCase().includes(q) ||
      p.builderName.toLowerCase().includes(q) ||
      p.locality.toLowerCase().includes(q) ||
      (p.reraNumber && p.reraNumber.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesLocality = localityFilter === 'all' || p.locality.toLowerCase() === localityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesLocality;
  });

  // Open Add/Edit Modal
  const handleOpenAdd = () => {
    setEditingProjectId(null);
    setForm({
      id: `proj-${Date.now()}`,
      name: '',
      builderName: '',
      locality: localitiesList[0] || 'CIDCO',
      city: 'Chhatrapati Sambhajinagar',
      priceRange: '₹ 50.0 L - ₹ 1.25 Cr',
      minPrice: 5000000,
      maxPrice: 12500000,
      configurations: ['2 BHK', '3 BHK'],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Ultra-modern township project offering premium residences with MahaRERA approval, strategic connectivity, and world-class lifestyle amenities.',
      amenities: ['Grand Clubhouse', 'Swimming Pool & Kids Pool', 'State-of-the-Art Gymnasium', '24/7 Multi-Tier Security'],
      status: 'Under Construction',
      featured: true,
      reraNumber: 'P515000' + Math.floor(10000 + Math.random() * 90000),
      possessionDate: 'Dec 2026',
      exclusiveOffer: 'Special 0% Stamp Duty & Spot Booking Discount'
    });
    setActiveFormTab('basics');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProjectId(proj.id);
    setForm({ ...proj });
    setActiveFormTab('basics');
    setIsModalOpen(true);
  };

  const handleDelete = (projId: string, projName: string) => {
    if (window.confirm(`Are you sure you want to delete project "${projName}"?`)) {
      deleteProject(projId);
      showToast('Project deleted successfully', 'info');
    }
  };

  const handleToggleFeatured = (proj: Project) => {
    updateProject(proj.id, { featured: !proj.featured });
    showToast(`Project "${proj.name}" ${!proj.featured ? 'marked as Featured' : 'removed from Featured'}`, 'success');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      showToast('Please enter the Project Name', 'error');
      return;
    }
    if (!form.builderName?.trim()) {
      showToast('Please enter the Builder / Developer Name', 'error');
      return;
    }

    const finalProject: Project = {
      id: editingProjectId || form.id || `proj-${Date.now()}`,
      name: form.name.trim(),
      builderName: form.builderName.trim(),
      locality: form.locality || 'CIDCO',
      city: form.city || 'Chhatrapati Sambhajinagar',
      priceRange: form.priceRange || 'Price On Request',
      minPrice: Number(form.minPrice) || 0,
      maxPrice: Number(form.maxPrice) || 0,
      configurations: Array.isArray(form.configurations) && form.configurations.length > 0 
        ? form.configurations 
        : ['2 BHK', '3 BHK'],
      images: Array.isArray(form.images) && form.images.length > 0 
        ? form.images 
        : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      description: form.description || '',
      amenities: Array.isArray(form.amenities) ? form.amenities : [],
      status: form.status || 'Under Construction',
      featured: !!form.featured,
      reraNumber: form.reraNumber?.trim() || undefined,
      possessionDate: form.possessionDate?.trim() || undefined,
      exclusiveOffer: form.exclusiveOffer?.trim() || undefined,
      floorPlanUrl: form.floorPlanUrl?.trim() || undefined,
      videoUrl: form.videoUrl?.trim() || undefined,
      brochureUrl: form.brochureUrl?.trim() || undefined
    };

    if (editingProjectId) {
      updateProject(editingProjectId, finalProject);
      showToast(`Project "${finalProject.name}" updated successfully!`, 'success');
    } else {
      addProject(finalProject);
      showToast(`New project "${finalProject.name}" published!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    const current = Array.isArray(form.images) ? [...form.images] : [];
    current.push(newGalleryUrl.trim());
    setForm({ ...form, images: current });
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    const current = Array.isArray(form.images) ? [...form.images] : [];
    current.splice(index, 1);
    setForm({ ...form, images: current });
  };

  const handleToggleConfig = (cfg: string) => {
    const current = Array.isArray(form.configurations) ? [...form.configurations] : [];
    const exists = current.includes(cfg);
    const updated = exists ? current.filter(c => c !== cfg) : [...current, cfg];
    setForm({ ...form, configurations: updated });
  };

  const handleToggleAmenity = (amenity: string) => {
    const current = Array.isArray(form.amenities) ? [...form.amenities] : [];
    const exists = current.includes(amenity);
    const updated = exists ? current.filter(a => a !== amenity) : [...current, amenity];
    setForm({ ...form, amenities: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="projects-management-admin">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-black bg-indigo-100 text-indigo-900 rounded-full uppercase tracking-wider border border-indigo-200">
              Builder Mandates & Mega Townships
            </span>
            <span className="text-xs text-slate-500 font-bold">• {projects.length} Total Projects</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Mega Projects Management
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage developer sole-selling mandates, high-rise townships, RERA details, pricing, brochures and video walkthroughs.
          </p>
        </div>

        <button
          id="admin-add-project-btn"
          onClick={handleOpenAdd}
          className="px-5 py-3 text-xs font-black text-white bg-[#1E4FA8] hover:bg-[#163c80] rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Builder Project</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Projects</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{stats.total}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">Under Construction</span>
          <span className="text-2xl font-black text-amber-700 mt-1 block">{stats.underConstruction}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Ready to Move</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{stats.readyToMove}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">New Launches</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">{stats.newLaunch}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-[#F2621E] uppercase tracking-wider block">Featured on Home</span>
          <span className="text-2xl font-black text-[#F2621E] mt-1 block">{stats.featured}</span>
        </div>
      </div>

      {/* Search and Filters Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by project name, builder, locality or RERA number…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E4FA8] transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#1E4FA8]"
            >
              <option value="all">All Statuses ({projects.length})</option>
              <option value="Under Construction">Under Construction</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Newly Launched">Newly Launched</option>
            </select>

            {/* Locality Filter */}
            <select
              value={localityFilter}
              onChange={e => setLocalityFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#1E4FA8]"
            >
              <option value="all">All Localities</option>
              {localitiesList.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-black text-slate-800">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keyword or filters, or add a new mega builder project to your catalog.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#1E4FA8] text-white text-xs font-black rounded-xl hover:bg-[#163c80] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Project</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const cover = project.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
            return (
              <div 
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Photo & Badges */}
                <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={cover}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md text-white shadow-2xs ${
                      project.status === 'Ready to Move' 
                        ? 'bg-emerald-600' 
                        : project.status === 'Newly Launched'
                        ? 'bg-blue-600'
                        : 'bg-amber-600'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Featured Star Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project)}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                      project.featured 
                        ? 'bg-amber-400 text-slate-950' 
                        : 'bg-black/50 text-white/70 hover:text-white'
                    }`}
                    title={project.featured ? 'Featured on Homepage (Click to unfeature)' : 'Click to feature on Homepage'}
                  >
                    <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-slate-950' : ''}`} />
                  </button>

                  {/* Price & Offer in image */}
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-sm font-black text-amber-300 block drop-shadow-xs">
                      {project.priceRange}
                    </span>
                    {project.exclusiveOffer && (
                      <span className="text-[10px] font-semibold text-emerald-300 block truncate">
                        🎁 {project.exclusiveOffer}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-[#1E4FA8] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-bold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.builderName}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#F2621E] shrink-0" />
                      <span className="truncate">{project.locality}, Sambhajinagar</span>
                    </p>
                  </div>

                  {/* Configurations Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.configurations?.slice(0, 3).map((cfg, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {cfg}
                      </span>
                    ))}
                    {(project.configurations?.length || 0) > 3 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        +{(project.configurations?.length || 0) - 3} more
                      </span>
                    )}
                  </div>

                  {/* RERA Badge & Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                    <span className="text-[10px] font-mono text-slate-500 truncate" title={project.reraNumber}>
                      {project.reraNumber ? `RERA: ${project.reraNumber}` : 'RERA Approved'}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => navigateToProjectDetail(project.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1E4FA8] transition-colors cursor-pointer"
                        title="View Live Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.name)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    {editingProjectId ? 'Edit Builder Project' : 'Add New Mega Builder Project'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Sambhajinagar Township, Mandate & RERA Details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Form */}
            <div className="flex border-b border-slate-200 bg-white px-6 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveFormTab('basics')}
                className={`py-2 px-3 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'basics' 
                    ? 'border-[#1E4FA8] text-[#1E4FA8]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Project Basics
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('pricing')}
                className={`py-2 px-3 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'pricing' 
                    ? 'border-[#1E4FA8] text-[#1E4FA8]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Pricing & BHKs
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('media')}
                className={`py-2 px-3 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'media' 
                    ? 'border-[#1E4FA8] text-[#1E4FA8]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                3. Photos & Media ({form.images?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('amenities')}
                className={`py-2 px-3 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'amenities' 
                    ? 'border-[#1E4FA8] text-[#1E4FA8]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                4. Amenities & Offers
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* TAB 1: BASICS */}
              {activeFormTab === 'basics' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samarth Imperial Heights"
                        value={form.name || ''}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Builder / Developer Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kalyani Developers / Samarth Group"
                        value={form.builderName || ''}
                        onChange={e => setForm({ ...form, builderName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Locality *
                      </label>
                      <select
                        value={form.locality || 'CIDCO'}
                        onChange={e => setForm({ ...form, locality: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8] bg-white"
                      >
                        {localitiesList.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Construction Status
                      </label>
                      <select
                        value={form.status || 'Under Construction'}
                        onChange={e => setForm({ ...form, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8] bg-white"
                      >
                        <option value="Under Construction">Under Construction</option>
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Newly Launched">Newly Launched</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Possession Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dec 2026 or Immediate"
                        value={form.possessionDate || ''}
                        onChange={e => setForm({ ...form, possessionDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        MahaRERA Registration Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. P51500034981"
                        value={form.reraNumber || ''}
                        onChange={e => setForm({ ...form, reraNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!!form.featured}
                          onChange={e => setForm({ ...form, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-[#1E4FA8] focus:ring-[#1E4FA8]"
                        />
                        <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          Feature in Homepage Carousel
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Project Description & Highlights
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write an attractive overview of this project, architecture, location connectivity..."
                      value={form.description || ''}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING & CONFIGURATIONS */}
              {activeFormTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Price Display Text *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹ 48 L - ₹ 1.10 Cr"
                        value={form.priceRange || ''}
                        onChange={e => setForm({ ...form, priceRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Minimum Price (in Rupees)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 4800000"
                        value={form.minPrice || ''}
                        onChange={e => setForm({ ...form, minPrice: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Maximum Price (in Rupees)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 11000000"
                        value={form.maxPrice || ''}
                        onChange={e => setForm({ ...form, maxPrice: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-2">
                      Available Unit Configurations (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CONFIG_OPTIONS.map(cfg => {
                        const isSelected = form.configurations?.includes(cfg);
                        return (
                          <button
                            type="button"
                            key={cfg}
                            onClick={() => handleToggleConfig(cfg)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              isSelected 
                                ? 'bg-blue-50 border-[#1E4FA8] text-[#1E4FA8]' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span>{cfg}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4FA8]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MEDIA */}
              {activeFormTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Cover Photo URL (Primary Image)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={form.images?.[0] || ''}
                      onChange={e => {
                        const current = Array.isArray(form.images) ? [...form.images] : [];
                        current[0] = e.target.value;
                        setForm({ ...form, images: current });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                    />
                    {form.images?.[0] && (
                      <div className="mt-2 aspect-16/9 max-w-xs rounded-xl overflow-hidden border border-slate-200">
                        <img src={form.images[0]} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Add More Gallery Images
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Paste image URL here..."
                        value={newGalleryUrl}
                        onChange={e => setNewGalleryUrl(e.target.value)}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryImage}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 cursor-pointer"
                      >
                        + Add Image
                      </button>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mt-3">
                      {form.images?.map((url, idx) => (
                        <div key={idx} className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 group">
                          <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                            title="Remove Photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Video Walkthrough / Tour URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={form.videoUrl || ''}
                        onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Brochure PDF / Floor Plan URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://.../brochure.pdf"
                        value={form.brochureUrl || ''}
                        onChange={e => setForm({ ...form, brochureUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: AMENITIES & OFFERS */}
              {activeFormTab === 'amenities' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Exclusive Launch / Festive Offer Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Special 0% Stamp Duty + Free Modular Kitchen for First 10 Bookings"
                      value={form.exclusiveOffer || ''}
                      onChange={e => setForm({ ...form, exclusiveOffer: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#1E4FA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-2">
                      Project Amenities Checklist (Select all available)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {COMMON_PROJECT_AMENITIES.map(amenity => {
                        const isSelected = form.amenities?.includes(amenity);
                        return (
                          <button
                            type="button"
                            key={amenity}
                            onClick={() => handleToggleAmenity(amenity)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              isSelected 
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-800' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span>{amenity}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  {activeFormTab !== 'basics' && (
                    <button
                      type="button"
                      onClick={() => {
                        const order: Array<typeof activeFormTab> = ['basics', 'pricing', 'media', 'amenities'];
                        const idx = order.indexOf(activeFormTab);
                        if (idx > 0) setActiveFormTab(order[idx - 1]);
                      }}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    >
                      ← Previous
                    </button>
                  )}

                  {activeFormTab !== 'amenities' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const order: Array<typeof activeFormTab> = ['basics', 'pricing', 'media', 'amenities'];
                        const idx = order.indexOf(activeFormTab);
                        if (idx < order.length - 1) setActiveFormTab(order[idx + 1]);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-black text-white bg-[#1E4FA8] hover:bg-[#163c80] cursor-pointer"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingProjectId ? 'Update Project' : 'Publish Project'}</span>
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
