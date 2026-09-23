import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Property, Project } from '../../../types';
import { CmsImageReplacerModal } from './CmsImageReplacerModal';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { 
  Building2, 
  Home, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Layers, 
  Video, 
  Film, 
  FileText, 
  Image as ImageIcon,
  MapPin, 
  IndianRupee, 
  ShieldCheck, 
  Filter,
  X,
  Eye,
  Check,
  Sparkles
} from 'lucide-react';

export const ProjectsPropertiesManager: React.FC = () => {
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject,
    allProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    localitiesList,
    navigateToProjectDetail,
    navigateToPropertyDetail,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'properties'>('projects');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Edit/Add Project State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  useModalBackHandler(isProjectModalOpen, () => setIsProjectModalOpen(false));
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});

  // Edit/Add Property State
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState<boolean>(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  useModalBackHandler(isPropertyModalOpen, () => setIsPropertyModalOpen(false));
  const [propertyForm, setPropertyForm] = useState<Partial<Property>>({});

  // Gallery & Image Replacer State
  const [replacerOpen, setReplacerOpen] = useState<boolean>(false);
  const [replacerTarget, setReplacerTarget] = useState<{ type: 'project' | 'property'; field: string; index?: number; currentUrl: string } | null>(null);

  // PROJECT HANDLERS
  const handleOpenProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProjectId(proj.id);
      setProjectForm({ ...proj });
    } else {
      setEditingProjectId(null);
      setProjectForm({
        id: `proj-${Date.now()}`,
        name: '',
        builderName: '',
        locality: localitiesList[0] || 'CIDCO',
        city: 'Chhatrapati Sambhajinagar',
        priceRange: '₹ 50.0 L - ₹ 1.20 Cr',
        minPrice: 5000000,
        maxPrice: 12000000,
        configurations: ['2 BHK', '3 BHK'],
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
        ],
        description: 'New luxury township project in Sambhajinagar with world class amenities.',
        amenities: ['Clubhouse', 'Swimming Pool', 'Gym', '24/7 Security', 'EV Charging'],
        status: 'Under Construction',
        featured: true,
        reraNumber: '',
        possessionDate: 'Dec 2026',
        exclusiveOffer: 'Special 0% Stamp Duty Offer'
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.builderName) {
      showToast('Please provide Project Name and Developer Name', 'error');
      return;
    }

    const finalProject: Project = {
      id: editingProjectId || projectForm.id || `proj-${Date.now()}`,
      name: projectForm.name || 'New Project',
      builderName: projectForm.builderName || 'Developer',
      locality: projectForm.locality || 'CIDCO',
      city: projectForm.city || 'Chhatrapati Sambhajinagar',
      priceRange: projectForm.priceRange || '₹ 50 L - ₹ 1 Cr',
      minPrice: Number(projectForm.minPrice) || 5000000,
      maxPrice: Number(projectForm.maxPrice) || 10000000,
      configurations: Array.isArray(projectForm.configurations) ? projectForm.configurations : ['2 BHK', '3 BHK'],
      images: projectForm.images && projectForm.images.length > 0 ? projectForm.images : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      description: projectForm.description || '',
      amenities: projectForm.amenities || ['Security', 'Water Supply'],
      status: projectForm.status || 'Under Construction',
      featured: !!projectForm.featured,
      reraNumber: projectForm.reraNumber,
      possessionDate: projectForm.possessionDate,
      exclusiveOffer: projectForm.exclusiveOffer,
      floorPlanUrl: projectForm.floorPlanUrl,
      videoUrl: projectForm.videoUrl,
      shortsUrl: projectForm.shortsUrl,
      brochureUrl: projectForm.brochureUrl
    };

    if (editingProjectId) {
      updateProject(editingProjectId, finalProject);
      showToast('Project updated successfully!', 'success');
    } else {
      addProject(finalProject);
      showToast('New project listed on portal!', 'success');
    }

    setIsProjectModalOpen(false);
  };

  // PROPERTY HANDLERS
  const handleOpenPropertyModal = (prop?: Property) => {
    if (prop) {
      setEditingPropertyId(prop.id);
      setPropertyForm({ 
        category: 'Residential',
        showOnHomepage: true,
        featured: false,
        featuredOrder: 1,
        ...prop 
      });
    } else {
      setEditingPropertyId(null);
      setPropertyForm({
        id: `prop-${Date.now()}`,
        title: '',
        price: 5500000,
        priceDisplay: '₹ 55.0 Lakh',
        category: 'Residential',
        propertyType: 'Apartment',
        listingType: 'sale',
        locality: localitiesList[0] || 'CIDCO',
        city: 'Chhatrapati Sambhajinagar',
        carpetArea: 850,
        bhk: 2,
        bathrooms: 2,
        balconies: 1,
        furnishing: 'semi_furnished',
        zeroBrokerage: true,
        featured: false,
        featuredOrder: 1,
        showOnHomepage: true,
        status: 'active',
        approvalStatus: 'approved',
        published: true,
        postedBy: 'owner',
        createdAt: new Date().toISOString(),
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Lift', 'Parking', 'Security', 'Power Backup'],
        description: 'Well-maintained direct owner apartment in peaceful locality.'
      });
    }
    setIsPropertyModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyForm.title || !propertyForm.price) {
      showToast('Please enter Property Title and Price', 'error');
      return;
    }

    const priceNum = Number(propertyForm.price) || 5000000;
    const priceDisplay = priceNum >= 10000000 
      ? `₹ ${(priceNum / 10000000).toFixed(2)} Cr` 
      : `₹ ${(priceNum / 100000).toFixed(1)} Lakh`;

    const finalProperty: Property = {
      ...(propertyForm as Property),
      id: editingPropertyId || propertyForm.id || `prop-${Date.now()}`,
      title: propertyForm.title || 'Property',
      price: priceNum,
      priceDisplay: propertyForm.priceDisplay || priceDisplay,
      category: propertyForm.category || 'Residential',
      propertyType: propertyForm.propertyType || 'Apartment',
      listingType: propertyForm.listingType || 'sale',
      locality: propertyForm.locality || 'CIDCO',
      city: propertyForm.city || 'Chhatrapati Sambhajinagar',
      carpetArea: Number(propertyForm.carpetArea) || 800,
      bhk: Number(propertyForm.bhk) || 2,
      bathrooms: Number(propertyForm.bathrooms) || 2,
      furnishing: propertyForm.furnishing || 'semi_furnished',
      zeroBrokerage: propertyForm.zeroBrokerage !== false,
      featured: !!propertyForm.featured,
      featuredOrder: Number(propertyForm.featuredOrder) || 1,
      showOnHomepage: propertyForm.showOnHomepage !== false,
      status: propertyForm.status || 'active',
      approvalStatus: propertyForm.approvalStatus || 'approved',
      published: propertyForm.published !== false,
      postedBy: propertyForm.postedBy || 'owner',
      createdAt: propertyForm.createdAt || new Date().toISOString(),
      images: propertyForm.images && propertyForm.images.length > 0 ? propertyForm.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      amenities: propertyForm.amenities || ['Security', 'Lift'],
      description: propertyForm.description || '',
      floorPlanUrl: propertyForm.floorPlanUrl,
      videoUrl: propertyForm.videoUrl,
      shortsUrl: propertyForm.shortsUrl
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, finalProperty);
      showToast('Property updated successfully!', 'success');
    } else {
      addProperty(finalProperty);
      showToast('New property listing published!', 'success');
    }

    setIsPropertyModalOpen(false);
  };

  // Image replacer callback
  const handleImageSelected = (newUrl: string) => {
    if (!replacerTarget) return;

    if (replacerTarget.type === 'project') {
      if (replacerTarget.field === 'gallery' && replacerTarget.index !== undefined) {
        const currentImgs = [...(projectForm.images || [])];
        currentImgs[replacerTarget.index] = newUrl;
        setProjectForm(prev => ({ ...prev, images: currentImgs }));
      } else if (replacerTarget.field === 'add_gallery') {
        const currentImgs = [...(projectForm.images || []), newUrl];
        setProjectForm(prev => ({ ...prev, images: currentImgs }));
      } else {
        setProjectForm(prev => ({ ...prev, [replacerTarget.field]: newUrl }));
      }
    } else {
      if (replacerTarget.field === 'gallery' && replacerTarget.index !== undefined) {
        const currentImgs = [...(propertyForm.images || [])];
        currentImgs[replacerTarget.index] = newUrl;
        setPropertyForm(prev => ({ ...prev, images: currentImgs }));
      } else if (replacerTarget.field === 'add_gallery') {
        const currentImgs = [...(propertyForm.images || []), newUrl];
        setPropertyForm(prev => ({ ...prev, images: currentImgs }));
      } else {
        setPropertyForm(prev => ({ ...prev, [replacerTarget.field]: newUrl }));
      }
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.builderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProperties = allProperties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.locality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.approvalStatus === statusFilter;
    
    let matchesCategory = true;
    if (categoryFilter !== 'all') {
      if (p.category) {
        matchesCategory = p.category.toLowerCase() === categoryFilter.toLowerCase();
      } else {
        if (categoryFilter === 'Residential') {
          matchesCategory = p.propertyType === 'Apartment' || p.propertyType === 'apartment' || p.propertyType === 'Independent House / Villa' || p.propertyType === 'row_house';
        } else if (categoryFilter === 'Commercial') {
          matchesCategory = p.propertyType === 'Commercial Office' || p.propertyType === 'Commercial Shop' || p.propertyType === 'commercial';
        } else if (categoryFilter === 'Industrial') {
          matchesCategory = p.propertyType === 'Industrial / MIDC Plot';
        } else if (categoryFilter === 'Plots') {
          matchesCategory = p.propertyType === 'Residential Plot' || p.propertyType === 'plot';
        } else if (categoryFilter === 'Land') {
          matchesCategory = p.propertyType === 'Agricultural Land';
        }
      }
    }

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div id="projects-properties-cms" className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
              CMS • Listings & Townships
            </span>
            <span className="text-xs text-slate-400">• {projects.length} Builder Projects • {allProperties.length} Properties</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Projects & Property Content Management
          </h2>
          <p className="text-xs text-slate-500">
            Manage full text, multi-photo galleries (20+ photos), floor plans, video walkthroughs, and reels for all listings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === 'projects' ? (
            <button
              id="cms-add-project-btn"
              onClick={() => handleOpenProjectModal()}
              className="px-4 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              + Add New Builder Project
            </button>
          ) : (
            <button
              id="cms-add-property-btn"
              onClick={() => handleOpenPropertyModal()}
              className="px-4 py-2 text-xs font-bold text-white bg-[#1E4FA8] hover:bg-[#163c80] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              + Add New Property Listing
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs (Projects vs Properties) */}
      <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'projects'
              ? 'bg-[#1E4FA8] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Builder Mega Townships & RERA Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'properties'
              ? 'bg-[#F2621E] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Home className="w-4 h-4" />
          Direct Owner & Broker Property Listings ({allProperties.length})
        </button>
      </div>

      {/* Search and Filters Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeTab === 'projects' ? 'Search projects by name, developer, locality...' : 'Search properties by title, locality...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20"
            />
          </div>

          {activeTab === 'properties' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white font-medium text-slate-700"
              >
                <option value="all">All Approval Statuses</option>
                <option value="approved">Approved & Live</option>
                <option value="pending">Pending Approval</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>

        {/* Category Filter Pills for Properties View */}
        {activeTab === 'properties' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Filter Category:</span>
            {[
              { id: 'all', label: `All (${allProperties.length})` },
              { id: 'Residential', label: `Residential (${allProperties.filter(p => (p.category ? p.category.toLowerCase() === 'residential' : (p.propertyType === 'Apartment' || p.propertyType === 'apartment' || p.propertyType === 'Independent House / Villa' || p.propertyType === 'row_house'))).length})` },
              { id: 'Commercial', label: `Commercial (${allProperties.filter(p => (p.category ? p.category.toLowerCase() === 'commercial' : (p.propertyType === 'Commercial Office' || p.propertyType === 'Commercial Shop' || p.propertyType === 'commercial'))).length})` },
              { id: 'Industrial', label: `Industrial (${allProperties.filter(p => (p.category ? p.category.toLowerCase() === 'industrial' : p.propertyType === 'Industrial / MIDC Plot')).length})` },
              { id: 'Plots', label: `Plots (${allProperties.filter(p => (p.category ? p.category.toLowerCase() === 'plots' : (p.propertyType === 'Residential Plot' || p.propertyType === 'plot'))).length})` },
              { id: 'Land', label: `Land (${allProperties.filter(p => (p.category ? p.category.toLowerCase() === 'land' : p.propertyType === 'Agricultural Land')).length})` },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat.id
                    ? 'bg-[#1E4FA8] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PROJECTS LIST VIEW */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-video w-full relative bg-slate-100 overflow-hidden">
                <img 
                  src={proj.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'} 
                  alt={proj.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#1E4FA8] text-white text-[10px] font-bold">
                  {proj.status}
                </div>
                {proj.featured && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </div>
                )}
                {proj.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-slate-950/70 text-white text-[10px] font-bold">
                    📸 {proj.images.length} Photos
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#F2621E]">
                    {proj.builderName}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {proj.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.locality}, {proj.city}</span>
                  </div>
                  <p className="text-sm font-bold text-[#1E4FA8] mt-1.5">
                    {proj.priceRange}
                  </p>

                  {/* Attachments Indicator */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.floorPlanUrl && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Blueprint
                      </span>
                    )}
                    {proj.videoUrl && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-semibold flex items-center gap-1">
                        <Video className="w-3 h-3" /> Walkthrough
                      </span>
                    )}
                    {proj.shortsUrl && (
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold flex items-center gap-1">
                        <Film className="w-3 h-3" /> Reel
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">RERA: {proj.reraNumber || 'Applied'}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigateToProjectDetail(proj.id)}
                      className="p-1.5 rounded-lg text-[#1E4FA8] hover:bg-blue-50"
                      title="View Dedicated Project Detail Page"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenProjectModal(proj)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete project "${proj.name}"?`)) {
                          deleteProject(proj.id);
                          showToast('Project deleted', 'info');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROPERTIES LIST VIEW */}
      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((prop) => {
            const categoryLabel = prop.category || (
              prop.propertyType === 'Apartment' || prop.propertyType === 'apartment' || prop.propertyType === 'Independent House / Villa' || prop.propertyType === 'row_house' ? 'Residential' :
              prop.propertyType === 'Commercial Office' || prop.propertyType === 'Commercial Shop' || prop.propertyType === 'commercial' ? 'Commercial' :
              prop.propertyType === 'Industrial / MIDC Plot' ? 'Industrial' :
              prop.propertyType === 'Residential Plot' || prop.propertyType === 'plot' ? 'Plots' :
              prop.propertyType === 'Agricultural Land' ? 'Land' : 'Residential'
            );

            return (
              <div 
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-video w-full relative bg-slate-100 overflow-hidden">
                  <img 
                    src={prop.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'} 
                    alt={prop.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category & BHK Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    <span className="px-2 py-0.5 rounded-lg bg-[#1E4FA8] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                      {categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-orange-600 text-white text-[9px] font-bold uppercase shadow-xs">
                      {prop.bhk ? `${prop.bhk} BHK` : prop.propertyType}
                    </span>
                  </div>
                  
                  {/* Top Right Badges: Featured & Approval */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    {prop.featured && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-current" /> #{prop.featuredOrder || 1} Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold text-white shadow-xs ${
                      prop.approvalStatus === 'approved' ? 'bg-emerald-600' :
                      prop.approvalStatus === 'rejected' ? 'bg-rose-600' : 'bg-amber-600'
                    }`}>
                      {prop.approvalStatus || 'approved'}
                    </span>
                  </div>

                  {prop.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-slate-950/70 text-white text-[10px] font-bold">
                      📸 {prop.images.length} Photos
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-emerald-600 uppercase">
                        {prop.zeroBrokerage ? '0% Brokerage' : 'Direct Owner'}
                      </span>
                      <span>Posted by {prop.postedBy || 'Owner'}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {prop.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{prop.locality}, {prop.city}</span>
                    </div>
                    
                    <p className="text-sm font-black text-[#1E4FA8]">
                      {prop.priceDisplay || `₹ ${(prop.price / 100000).toFixed(1)} L`}
                    </p>

                    {/* Quick Toggles: Homepage Display & Featured Sidebar */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          const nextVal = prop.showOnHomepage === false;
                          updateProperty(prop.id, { showOnHomepage: nextVal });
                          showToast(`Homepage visibility set to ${nextVal ? 'Visible' : 'Hidden'}`, 'info');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                          prop.showOnHomepage !== false
                            ? 'bg-blue-50 text-[#1E4FA8] border border-blue-200'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                        title="Toggle visibility in Homepage 'Properties on Sale' section"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{prop.showOnHomepage !== false ? 'On Homepage' : 'Hidden from Home'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const nextFeatured = !prop.featured;
                          updateProperty(prop.id, { featured: nextFeatured });
                          showToast(`Property ${nextFeatured ? 'marked as Featured' : 'removed from Featured'}`, 'info');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                          prop.featured
                            ? 'bg-amber-50 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                        title="Toggle Featured status (Featured Sidebar)"
                      >
                        <Star className={`w-3.5 h-3.5 ${prop.featured ? 'fill-current text-amber-500' : ''}`} />
                        <span>{prop.featured ? 'Featured' : 'Regular'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Approve/Reject & Edit/Delete One-Click Actions */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          updateProperty(prop.id, { approvalStatus: 'approved', published: true });
                          showToast('Listing approved and published!', 'success');
                        }}
                        className="px-2 py-1 text-[10px] font-bold rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        title="Approve"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => {
                          updateProperty(prop.id, { approvalStatus: 'rejected', published: false });
                          showToast('Listing rejected', 'warning');
                        }}
                        className="px-2 py-1 text-[10px] font-bold rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                        title="Reject"
                      >
                        ✕ Reject
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigateToPropertyDetail(prop.id)}
                        className="p-1.5 rounded-lg text-[#1E4FA8] hover:bg-blue-50"
                        title="View Dedicated Property Detail Page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenPropertyModal(prop)}
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        title="Edit Property"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete listing "${prop.title}"?`)) {
                            deleteProperty(prop.id);
                            showToast('Property deleted', 'info');
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROJECT ADD / EDIT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#1E4FA8]" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingProjectId ? 'Edit Builder Project' : 'Create New Builder Project'}
                </h3>
              </div>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.name || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Kalyani Greens Mega Township"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E4FA8]/20 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Builder / Developer Name *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.builderName || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, builderName: e.target.value }))}
                    placeholder="e.g. Kalyani Group Sambhajinagar"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Locality *</label>
                  <select
                    value={projectForm.locality || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, locality: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white font-medium"
                  >
                    {localitiesList.map((loc, idx) => (
                      <option key={idx} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price Range Display</label>
                  <input
                    type="text"
                    value={projectForm.priceRange || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, priceRange: e.target.value }))}
                    placeholder="₹ 52.0 L - ₹ 1.25 Cr"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Status</label>
                  <select
                    value={projectForm.status || 'Under Construction'}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white font-medium"
                  >
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Newly Launched">Newly Launched</option>
                    <option value="Pre-Launch">Pre-Launch</option>
                  </select>
                </div>
              </div>

              {/* PHOTO GALLERY MANAGER (Support for 20+ Photos) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Photo Gallery ({projectForm.images?.length || 0} Photos)</h4>
                    <p className="text-[11px] text-slate-500">Add up to 20+ high-res photos. The first image acts as the primary cover.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReplacerTarget({ type: 'project', field: 'add_gallery', currentUrl: '' });
                      setReplacerOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-[#F2621E] bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Photo
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                  {projectForm.images?.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-900">
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setReplacerTarget({ type: 'project', field: 'gallery', index: idx, currentUrl: imgUrl });
                            setReplacerOpen(true);
                          }}
                          className="p-1 rounded bg-white text-slate-800"
                          title="Replace Photo"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = projectForm.images?.filter((_, i) => i !== idx) || [];
                            setProjectForm(prev => ({ ...prev, images: newImgs }));
                          }}
                          className="p-1 rounded bg-rose-600 text-white"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ATTACHMENTS (Floorplan, Video, Shorts, Brochure) */}
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#1E4FA8]" />
                  Media Attachments & Rich Walkthroughs
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Blueprint / Floor Plan Image URL
                    </label>
                    <input
                      type="url"
                      value={projectForm.floorPlanUrl || ''}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, floorPlanUrl: e.target.value }))}
                      placeholder="https://...floorplan.jpg"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      YouTube / Vimeo Walkthrough Video Link
                    </label>
                    <input
                      type="url"
                      value={projectForm.videoUrl || ''}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Shorts / Reel Vertical Video Clip (9:16)
                    </label>
                    <input
                      type="url"
                      value={projectForm.shortsUrl || ''}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, shortsUrl: e.target.value }))}
                      placeholder="https://...reel.mp4"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      MahaRERA Sanctioned PDF Brochure Link
                    </label>
                    <input
                      type="url"
                      value={projectForm.brochureUrl || ''}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, brochureUrl: e.target.value }))}
                      placeholder="https://...brochure.pdf"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">MahaRERA Number</label>
                  <input
                    type="text"
                    value={projectForm.reraNumber || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, reraNumber: e.target.value }))}
                    placeholder="P51500028491"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Possession Date</label>
                  <input
                    type="text"
                    value={projectForm.possessionDate || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, possessionDate: e.target.value }))}
                    placeholder="Dec 2026 / Immediate"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Exclusive Offer Tag</label>
                  <input
                    type="text"
                    value={projectForm.exclusiveOffer || ''}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, exclusiveOffer: e.target.value }))}
                    placeholder="0% Stamp Duty + Modular Kitchen"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Description</label>
                <textarea
                  rows={3}
                  value={projectForm.description || ''}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the project, towers, location highlights..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="project-featured-checkbox"
                  checked={!!projectForm.featured}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-[#1E4FA8] rounded focus:ring-0"
                />
                <label htmlFor="project-featured-checkbox" className="text-xs font-bold text-slate-800">
                  Feature prominently on Homepage Projects Showcase
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1E4FA8] hover:bg-[#163c80] rounded-xl shadow-sm"
                >
                  {editingProjectId ? 'Save Project Changes' : 'Publish Builder Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROPERTY ADD / EDIT MODAL */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-[#F2621E]" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingPropertyId ? 'Edit Property Listing' : 'Add Direct Property Listing'}
                </h3>
              </div>
              <button onClick={() => setIsPropertyModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Listing Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={propertyForm.title || ''}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Spacious 2 BHK Luxury Flat in CIDCO N-4 Near Prozone Mall"
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Listing Category (Tab on Portal) *</label>
                  <select
                    value={propertyForm.category || 'Residential'}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-blue-50/50 text-[#1E4FA8] focus:outline-none"
                  >
                    <option value="Residential">Residential (Apartments, Villas, Row Houses)</option>
                    <option value="Commercial">Commercial (Shops, Showrooms, Offices)</option>
                    <option value="Industrial">Industrial (MIDC Waluj, Shendra, Chitegaon)</option>
                    <option value="Plots">Plots (NA 44, CIDCO Sanctioned, Gated Layouts)</option>
                    <option value="Land">Land (Agricultural, Farmhouses, Highways)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Property Type *</label>
                  <select
                    value={propertyForm.propertyType || 'Apartment'}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, propertyType: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white focus:outline-none"
                  >
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="Independent House / Villa">Independent House / Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Shop">Commercial Shop / Retail</option>
                    <option value="Commercial Office">Commercial Office Space</option>
                    <option value="Industrial / MIDC Plot">Industrial / MIDC Plot</option>
                    <option value="Residential Plot">Residential / NA Plot</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={propertyForm.price || ''}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="5500000"
                    className="w-full px-3 py-2 text-xs font-bold text-[#1E4FA8] rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Locality *</label>
                  <select
                    value={propertyForm.locality || ''}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, locality: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white font-medium"
                  >
                    {localitiesList.map((loc, idx) => (
                      <option key={idx} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">BHK / Config (if residential)</label>
                  <select
                    value={propertyForm.bhk || 2}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, bhk: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value={1}>1 BHK</option>
                    <option value={2}>2 BHK</option>
                    <option value={3}>3 BHK</option>
                    <option value={4}>4 BHK+</option>
                  </select>
                </div>
              </div>

              {/* Photo Gallery for Property */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Property Photos ({propertyForm.images?.length || 0})</h4>
                    <p className="text-[11px] text-slate-500">Add up to 20+ photos of living room, bedroom, kitchen, and balcony.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReplacerTarget({ type: 'property', field: 'add_gallery', currentUrl: '' });
                      setReplacerOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-[#F2621E] bg-orange-50 hover:bg-orange-100 rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Photo
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                  {propertyForm.images?.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-900">
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setReplacerTarget({ type: 'property', field: 'gallery', index: idx, currentUrl: imgUrl });
                            setReplacerOpen(true);
                          }}
                          className="p-1 rounded bg-white text-slate-800"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = propertyForm.images?.filter((_, i) => i !== idx) || [];
                            setPropertyForm(prev => ({ ...prev, images: newImgs }));
                          }}
                          className="p-1 rounded bg-rose-600 text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments (Blueprint / Video / Shorts) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blueprint / Floor Plan URL</label>
                  <input
                    type="url"
                    value={propertyForm.floorPlanUrl || ''}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, floorPlanUrl: e.target.value }))}
                    placeholder="https://...plan.jpg"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Walkthrough URL</label>
                  <input
                    type="url"
                    value={propertyForm.videoUrl || ''}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://youtube.com/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vertical Reel (9:16) URL</label>
                  <input
                    type="url"
                    value={propertyForm.shortsUrl || ''}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, shortsUrl: e.target.value }))}
                    placeholder="https://...reel.mp4"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Approval Status</label>
                  <select
                    value={propertyForm.approvalStatus || 'approved'}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, approvalStatus: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="approved">Approved & Live</option>
                    <option value="pending">Pending Approval</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Carpet Area (Sq.Ft)</label>
                  <input
                    type="number"
                    value={propertyForm.carpetArea || 850}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, carpetArea: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Furnishing</label>
                  <select
                    value={propertyForm.furnishing || 'semi_furnished'}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, furnishing: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi_furnished">Semi-Furnished</option>
                    <option value="fully_furnished">Fully Furnished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={propertyForm.description || ''}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe ventilation, vastu compliance, parking, society amenities..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Homepage Visibility & Special Tags</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={propertyForm.showOnHomepage !== false}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, showOnHomepage: e.target.checked }))}
                      className="w-4 h-4 text-[#1E4FA8] rounded"
                    />
                    <span>Show on Homepage Section</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={propertyForm.zeroBrokerage !== false}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, zeroBrokerage: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>0% Brokerage Tag</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!propertyForm.featured}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>Featured Sidebar Listing</span>
                  </label>
                </div>

                {propertyForm.featured && (
                  <div className="pt-2 border-t border-slate-200/80 flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-700">Featured Order / Priority:</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={propertyForm.featuredOrder || 1}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, featuredOrder: Number(e.target.value) }))}
                      className="w-24 px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-white text-[#F2621E]"
                    />
                    <span className="text-[11px] text-slate-500">(1 = Top card in Featured sidebar)</span>
                  </div>
                )}
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm"
                >
                  {editingPropertyId ? 'Save Property Listing' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Replacer Modal */}
      <CmsImageReplacerModal
        isOpen={replacerOpen}
        onClose={() => setReplacerOpen(false)}
        currentImageUrl={replacerTarget?.currentUrl || ''}
        imageTitle="Select Image for Listing"
        onSelectImage={handleImageSelected}
      />

    </div>
  );
};
