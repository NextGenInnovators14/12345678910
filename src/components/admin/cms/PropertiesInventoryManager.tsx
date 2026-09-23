import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Property, ListingType, PropertyType, PropertyStatus } from '../../../types';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { 
  Building2, 
  Home, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Star, 
  MapPin, 
  IndianRupee, 
  ShieldCheck, 
  Filter, 
  X, 
  Eye, 
  Check, 
  Sparkles, 
  Phone, 
  Image as ImageIcon,
  Copy,
  ExternalLink
} from 'lucide-react';

const COMMON_AMENITIES = [
  'Lift', '24/7 Security', 'Covered Parking', 'Power Backup', 
  'Vaastu Compliant', 'Swimming Pool', 'Gym', 'Club House', 
  'Solar Water Heating', 'Rainwater Harvesting', 'Children Play Area', 
  'CCTV Surveillance', 'Intercom', 'Gas Pipeline'
];

export const PropertiesInventoryManager: React.FC = () => {
  const { 
    allProperties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    localitiesList,
    navigateToPropertyDetail, 
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [listingTypeFilter, setListingTypeFilter] = useState<string>('all');
  const [localityFilter, setLocalityFilter] = useState<string>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  useModalBackHandler(isModalOpen, () => setIsModalOpen(false));

  // Form State
  const [form, setForm] = useState<Partial<Property>>({});
  const [newImageUrl, setNewImageUrl] = useState('');

  // Statistics
  const stats = useMemo(() => {
    return {
      total: allProperties.length,
      sale: allProperties.filter(p => p.listingType === 'sale').length,
      rent: allProperties.filter(p => p.listingType === 'rent').length,
      commercial: allProperties.filter(p => p.listingType === 'commercial' || p.category === 'Commercial').length,
      plots: allProperties.filter(p => p.propertyType === 'Plot' || p.category === 'Plots').length,
      verified: allProperties.filter(p => p.verified).length,
      featured: allProperties.filter(p => p.featured).length,
    };
  }, [allProperties]);

  // Filtered Properties
  const filtered = useMemo(() => {
    return allProperties.filter(p => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.locality.toLowerCase().includes(q) || 
        p.address.toLowerCase().includes(q) ||
        (p.ownerContact?.name && p.ownerContact.name.toLowerCase().includes(q));

      const matchesListingType = listingTypeFilter === 'all' || p.listingType === listingTypeFilter;
      const matchesLocality = localityFilter === 'all' || p.locality.toLowerCase() === localityFilter.toLowerCase();
      const matchesVerified = verifiedFilter === 'all' || (verifiedFilter === 'verified' ? p.verified : !p.verified);
      const matchesFeatured = featuredFilter === 'all' || (featuredFilter === 'featured' ? p.featured : !p.featured);

      return matchesSearch && matchesListingType && matchesLocality && matchesVerified && matchesFeatured;
    });
  }, [allProperties, searchTerm, listingTypeFilter, localityFilter, verifiedFilter, featuredFilter]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      id: `prop-${Date.now()}`,
      title: '',
      description: 'Well-maintained, spacious property located in a prime Sambhajinagar neighborhood with 100% verified documents and direct owner access.',
      price: 6500000,
      priceDisplay: '₹ 65.0 L',
      propertyType: 'Apartment',
      listingType: 'sale',
      locality: localitiesList[0] || 'CIDCO',
      address: 'Near Main Highway',
      city: 'Chhatrapati Sambhajinagar',
      carpetArea: 1050,
      builtupArea: 1300,
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      furnishing: 'Semi-Furnished',
      parking: 'Covered',
      floorNumber: 3,
      totalFloors: 7,
      reraNumber: '',
      reraApproved: true,
      verified: true,
      zeroBrokerage: true,
      featured: false,
      category: 'Residential',
      status: 'active',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Lift', '24/7 Security', 'Covered Parking', 'Power Backup'],
      ownerContact: {
        name: 'Property Owner',
        phone: '+91 8010506030',
        whatsapp: '+91 8010506030',
        email: 'info@auricity.in'
      },
      postedBy: 'Owner',
      createdAt: new Date().toISOString()
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (prop: Property) => {
    setEditingId(prop.id);
    setForm({ ...prop });
    setIsModalOpen(true);
  };

  // Format Price Display
  const handlePriceChange = (val: number) => {
    let display = `₹ ${val}`;
    if (val >= 10000000) {
      display = `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      display = `₹ ${(val / 100000).toFixed(2)} L`;
    } else if (val > 0) {
      display = `₹ ${val.toLocaleString('en-IN')}`;
    }
    setForm(prev => ({ ...prev, price: val, priceDisplay: display }));
  };

  // Save Property
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) {
      return showToast('Please enter a property title', 'error');
    }
    if (!form.locality?.trim()) {
      return showToast('Please select a locality', 'error');
    }

    if (editingId) {
      updateProperty(editingId, form);
      showToast('Property updated successfully!', 'success');
    } else {
      addProperty(form as Property);
      showToast('Property created successfully!', 'success');
    }
    setIsModalOpen(false);
  };

  // Toggle Verified
  const handleToggleVerified = (id: string, current: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    updateProperty(id, { verified: !current });
    showToast(`Property verified badge ${!current ? 'enabled' : 'removed'}`, 'info');
  };

  // Toggle Featured
  const handleToggleFeatured = (id: string, current: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    updateProperty(id, { featured: !current });
    showToast(`Property ${!current ? 'marked as featured on homepage' : 'removed from featured'}`, 'info');
  };

  // Add Image URL
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setForm(prev => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl.trim()]
    }));
    setNewImageUrl('');
  };

  // Remove Image
  const handleRemoveImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  // Toggle Amenity
  const handleToggleAmenity = (amenity: string) => {
    const list = form.amenities || [];
    if (list.includes(amenity)) {
      setForm(prev => ({ ...prev, amenities: list.filter(a => a !== amenity) }));
    } else {
      setForm(prev => ({ ...prev, amenities: [...list, amenity] }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Counters */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                Full CRUD Control
              </span>
              <span className="text-xs text-slate-400">{allProperties.length} Total Properties</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Properties Inventory Master</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Add new properties, edit prices, images, amenities, toggle 100% verified status, and manage direct owner listings.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-2xl bg-[#1E4FA8] hover:bg-blue-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> + Add New Property
          </button>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <p className="text-[10px] font-black uppercase text-blue-700 tracking-wider">For Sale</p>
            <p className="text-2xl font-black text-blue-950 mt-0.5">{stats.sale}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <p className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">For Rent</p>
            <p className="text-2xl font-black text-emerald-950 mt-0.5">{stats.rent}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
            <p className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Commercial</p>
            <p className="text-2xl font-black text-purple-950 mt-0.5">{stats.commercial}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
            <p className="text-[10px] font-black uppercase text-amber-700 tracking-wider">NA Plots</p>
            <p className="text-2xl font-black text-amber-950 mt-0.5">{stats.plots}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100">
            <p className="text-[10px] font-black uppercase text-teal-700 tracking-wider">100% Verified</p>
            <p className="text-2xl font-black text-teal-950 mt-0.5">{stats.verified}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100">
            <p className="text-[10px] font-black uppercase text-orange-700 tracking-wider">Featured</p>
            <p className="text-2xl font-black text-orange-950 mt-0.5">{stats.featured}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search title, locality, address or owner name…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:border-[#1E4FA8] outline-none transition-all"
            />
          </div>

          <select
            value={listingTypeFilter}
            onChange={e => setListingTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold bg-white outline-none"
          >
            <option value="all">All Listing Types</option>
            <option value="sale">For Sale (Buy)</option>
            <option value="rent">For Rent</option>
            <option value="commercial">Commercial</option>
            <option value="pg">PG / Co-Living</option>
          </select>

          <select
            value={localityFilter}
            onChange={e => setLocalityFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold bg-white outline-none"
          >
            <option value="all">All Localities</option>
            {localitiesList.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={verifiedFilter}
            onChange={e => setVerifiedFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold bg-white outline-none"
          >
            <option value="all">All Verification Status</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      {/* Property Cards Table / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Showing {filtered.length} Properties
          </span>
          {(searchTerm || listingTypeFilter !== 'all' || localityFilter !== 'all' || verifiedFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setListingTypeFilter('all');
                setLocalityFilter('all');
                setVerifiedFilter('all');
                setFeaturedFilter('all');
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-black text-slate-800">No properties match your filter</h4>
            <p className="text-xs text-slate-500">Try changing your search keywords or filter criteria.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-2 px-4 py-2 rounded-xl bg-[#1E4FA8] text-white font-black text-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(property => {
              const mainImg = property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
              return (
                <div 
                  key={property.id} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header with Badges */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden group">
                      <img 
                        src={mainImg} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-sm ${
                          property.listingType === 'sale' 
                            ? 'bg-blue-600 text-white' 
                            : property.listingType === 'rent'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-purple-600 text-white'
                        }`}>
                          {property.listingType}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                          {property.propertyType}
                        </span>
                      </div>

                      {/* Right Control Toggles */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          onClick={e => handleToggleVerified(property.id, property.verified, e)}
                          title={property.verified ? 'Verified (Click to unverify)' : 'Unverified (Click to verify)'}
                          className={`p-1.5 rounded-full shadow-md backdrop-blur-sm transition-all ${
                            property.verified ? 'bg-emerald-500 text-white' : 'bg-white/80 text-slate-400'
                          }`}
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={e => handleToggleFeatured(property.id, property.featured, e)}
                          title={property.featured ? 'Featured on Homepage' : 'Not featured'}
                          className={`p-1.5 rounded-full shadow-md backdrop-blur-sm transition-all ${
                            property.featured ? 'bg-amber-400 text-slate-950' : 'bg-white/80 text-slate-400'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      {/* Bottom Price Overlay */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                        <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-sm font-black text-amber-300">
                          {property.priceDisplay || `₹ ${property.price.toLocaleString('en-IN')}`}
                        </span>
                        <span className="text-[10px] font-bold bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                          {property.carpetArea} sq.ft
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2.5">
                      <h4 className="font-black text-sm text-slate-900 line-clamp-1">
                        {property.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F2621E] shrink-0" />
                        {property.locality}, {property.city}
                      </p>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-1">
                        {property.bedrooms && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold">
                            {property.bedrooms} BHK
                          </span>
                        )}
                        {property.bathrooms && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold">
                            {property.bathrooms} Baths
                          </span>
                        )}
                        {property.furnishing && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold">
                            {property.furnishing}
                          </span>
                        )}
                      </div>

                      {/* Owner Contact */}
                      {property.ownerContact?.name && (
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                          <span className="truncate">Owner: <b>{property.ownerContact.name}</b></span>
                          {property.ownerContact.phone && (
                            <a 
                              href={`https://wa.me/${property.ownerContact.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-emerald-600 font-bold hover:underline shrink-0"
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigateToPropertyDetail(property.id)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(property)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4FA8] text-xs font-black hover:bg-blue-100 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
                            deleteProperty(property.id);
                            showToast('Property deleted', 'info');
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100"
                        title="Delete property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL PROPERTY ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1E4FA8] flex items-center justify-center font-black">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {editingId ? 'Edit Property Details' : 'Add New Property Listing'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in complete property specifications, pricing, documents, and photos.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">1. Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-slate-700">Property Title *</label>
                    <input
                      required
                      type="text"
                      value={form.title || ''}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Luxurious 3 BHK Flat in CIDCO N-4 with Balcony"
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Listing Nature</label>
                    <select
                      value={form.listingType || 'sale'}
                      onChange={e => setForm({ ...form, listingType: e.target.value as ListingType })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    >
                      <option value="sale">For Sale (Buy)</option>
                      <option value="rent">For Rent</option>
                      <option value="commercial">Commercial</option>
                      <option value="pg">PG / Co-Living</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Property Category</label>
                    <select
                      value={form.propertyType || 'Apartment'}
                      onChange={e => setForm({ ...form, propertyType: e.target.value as PropertyType })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    >
                      <option value="Apartment">Apartment / Flat</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Villa">Villa / Row House</option>
                      <option value="Plot">NA / Collector Plot</option>
                      <option value="Commercial Space">Commercial Space / Office</option>
                      <option value="Shop">Shop / Retail Store</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Price (in INR) *</label>
                    <input
                      required
                      type="number"
                      value={form.price || 0}
                      onChange={e => handlePriceChange(Number(e.target.value))}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Display Price String</label>
                    <input
                      type="text"
                      value={form.priceDisplay || ''}
                      onChange={e => setForm({ ...form, priceDisplay: e.target.value })}
                      placeholder="e.g. ₹ 65.0 L"
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">2. Location Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700">Locality *</label>
                    <select
                      value={form.locality || localitiesList[0]}
                      onChange={e => setForm({ ...form, locality: e.target.value })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    >
                      {localitiesList.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-slate-700">Address / Society Name</label>
                    <input
                      type="text"
                      value={form.address || ''}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                      placeholder="e.g. Flat 302, Sai Shraddha Residency, Jalna Road"
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">3. Specifications & Area</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700">Bedrooms (BHK)</label>
                    <input
                      type="number"
                      value={form.bedrooms || 0}
                      onChange={e => setForm({ ...form, bedrooms: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Bathrooms</label>
                    <input
                      type="number"
                      value={form.bathrooms || 0}
                      onChange={e => setForm({ ...form, bathrooms: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Carpet Area (sq.ft)</label>
                    <input
                      type="number"
                      value={form.carpetArea || 0}
                      onChange={e => setForm({ ...form, carpetArea: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Built-up Area (sq.ft)</label>
                    <input
                      type="number"
                      value={form.builtupArea || 0}
                      onChange={e => setForm({ ...form, builtupArea: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Furnishing</label>
                    <select
                      value={form.furnishing || 'Semi-Furnished'}
                      onChange={e => setForm({ ...form, furnishing: e.target.value })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    >
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Parking</label>
                    <select
                      value={form.parking || 'Covered'}
                      onChange={e => setForm({ ...form, parking: e.target.value })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    >
                      <option value="Covered">Covered</option>
                      <option value="Open">Open</option>
                      <option value="2+ Covered">2+ Covered</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Floor Number</label>
                    <input
                      type="number"
                      value={form.floorNumber || 0}
                      onChange={e => setForm({ ...form, floorNumber: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Total Floors</label>
                    <input
                      type="number"
                      value={form.totalFloors || 0}
                      onChange={e => setForm({ ...form, totalFloors: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Owner / Contact Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">4. Owner / Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700">Contact Person Name</label>
                    <input
                      type="text"
                      value={form.ownerContact?.name || ''}
                      onChange={e => setForm({
                        ...form,
                        ownerContact: { ...(form.ownerContact || { name: '', phone: '' }), name: e.target.value }
                      })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">Phone Number</label>
                    <input
                      type="text"
                      value={form.ownerContact?.phone || ''}
                      onChange={e => setForm({
                        ...form,
                        ownerContact: { ...(form.ownerContact || { name: '', phone: '' }), phone: e.target.value }
                      })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700">WhatsApp Number</label>
                    <input
                      type="text"
                      value={form.ownerContact?.whatsapp || ''}
                      onChange={e => setForm({
                        ...form,
                        ownerContact: { ...(form.ownerContact || { name: '', phone: '' }), whatsapp: e.target.value }
                      })}
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Verification & Badges */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">5. Badges & Visibility</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(form.verified)}
                      onChange={e => setForm({ ...form, verified: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <div>
                      <p className="text-xs font-black text-slate-900">100% Verified Badge</p>
                      <p className="text-[10px] text-slate-500">Physically inspected by Auricity</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(form.zeroBrokerage)}
                      onChange={e => setForm({ ...form, zeroBrokerage: e.target.checked })}
                      className="w-4 h-4 text-[#1E4FA8] rounded"
                    />
                    <div>
                      <p className="text-xs font-black text-slate-900">Zero Brokerage Tag</p>
                      <p className="text-[10px] text-slate-500">0% Commission transaction</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(form.featured)}
                      onChange={e => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded"
                    />
                    <div>
                      <p className="text-xs font-black text-slate-900">Homepage Spotlight</p>
                      <p className="text-[10px] text-slate-500">Showcase in top home carousel</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">6. Photo Gallery</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    placeholder="Paste image URL (https://images.unsplash.com/...)"
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
                  >
                    Add Image
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(form.images || []).map((img, idx) => (
                    <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={img} alt="Property" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md text-[10px] opacity-80 hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">7. Amenities & Facilities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COMMON_AMENITIES.map(amenity => {
                    const checked = (form.amenities || []).includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => handleToggleAmenity(amenity)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                          checked 
                            ? 'bg-blue-50 border-blue-400 text-[#1E4FA8]' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {checked ? '✓ ' : '+ '}{amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="block text-xs font-black text-slate-700">Detailed Description</label>
                <textarea
                  rows={4}
                  value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm resize-none"
                />
              </div>

              {/* Form Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1E4FA8] text-white text-xs font-black shadow-lg hover:bg-blue-700"
                >
                  {editingId ? 'Save Changes' : 'Create Property Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
