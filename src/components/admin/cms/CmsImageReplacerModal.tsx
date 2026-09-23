import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { MediaItem } from '../../../types';
import { compressImageFile, estimateDataUrlSizeKb } from '../../../utils/imageUtils';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Check, 
  FolderOpen,
  Search,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface CmsImageReplacerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl?: string;
  imageTitle?: string;
  onSelectImage: (newUrl: string) => void;
}

export const CmsImageReplacerModal: React.FC<CmsImageReplacerModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl = '',
  imageTitle = 'Select or Replace Image',
  onSelectImage
}) => {
  const { mediaLibrary, addMediaItem, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('library');
  const [customUrl, setCustomUrl] = useState<string>(currentImageUrl);
  const [selectedLibraryUrl, setSelectedLibraryUrl] = useState<string>(currentImageUrl);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter media library to images and floorplans
  const imageItems = mediaLibrary.filter(m => 
    (m.type === 'image' || m.type === 'floorplan') &&
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     m.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP)', 'error');
      return;
    }

    setIsCompressing(true);
    try {
      const compressed = await compressImageFile(file);
      const sizeKb = estimateDataUrlSizeKb(compressed);
      if (sizeKb > 4000) {
        // Extremely unusual (e.g. a huge panorama) — still too big even
        // after compression. Better to stop here than save something that
        // will fail silently later.
        showToast(`Image is still ${(sizeKb / 1024).toFixed(1)}MB after compression — try a smaller photo`, 'error');
        return;
      }
      setUploadPreview(compressed);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
    } catch (err) {
      showToast('Could not process that image — try a different file', 'error');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSaveUploadedImage = () => {
    if (!uploadPreview) return;
    const newMedia: MediaItem = {
      id: `med-${Date.now()}`,
      title: uploadTitle || 'Uploaded Image',
      url: uploadPreview,
      type: 'image',
      category: 'Page Uploads',
      tags: ['Uploaded', 'CMS'],
      fileSize: 'Custom File',
      uploadedAt: new Date().toISOString()
    };
    addMediaItem(newMedia);
    onSelectImage(uploadPreview);
    showToast('Image uploaded and applied successfully!', 'success');
    onClose();
  };

  const handleApplyLibraryImage = () => {
    if (!selectedLibraryUrl) {
      showToast('Please select an image from the library', 'warning');
      return;
    }
    onSelectImage(selectedLibraryUrl);
    showToast('Image replaced successfully!', 'success');
    onClose();
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) {
      showToast('Please enter a valid image URL', 'error');
      return;
    }
    onSelectImage(customUrl.trim());
    showToast('Image URL applied successfully!', 'success');
    onClose();
  };

  // Curated presets from Sambhajinagar real estate
  const curatedPresets = [
    { title: 'Luxury High-Rise Tower', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Modern Villa with Garden', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Contemporary Living Room', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Architectural Elevation', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Commercial Office Space', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Sanctioned Floorplan Blueprint', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80' }
  ];

  return (
    <div id="cms-image-replacer-modal" className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F2621E] flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{imageTitle}</h3>
              <p className="text-xs text-slate-500">Choose from media library, upload from device, or enter image link</p>
            </div>
          </div>
          <button 
            id="cms-modal-close-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-2 pt-2">
          <button
            id="cms-tab-library"
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'library'
                ? 'border-[#F2621E] text-[#F2621E] bg-orange-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            Media Library ({imageItems.length})
          </button>
          <button
            id="cms-tab-upload"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'upload'
                ? 'border-[#F2621E] text-[#F2621E] bg-orange-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload from Computer
          </button>
          <button
            id="cms-tab-url"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'url'
                ? 'border-[#F2621E] text-[#F2621E] bg-orange-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Paste Web URL
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cms-media-search"
                    type="text"
                    placeholder="Search by title, tag, project name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                  />
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  Showing {imageItems.length} photos
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto p-1">
                {imageItems.map((item) => {
                  const isSelected = selectedLibraryUrl === item.url;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedLibraryUrl(item.url)}
                      className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'border-[#F2621E] ring-2 ring-[#F2621E]/20 shadow-md scale-[1.02]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="aspect-video w-full bg-slate-100 relative">
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#F2621E] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-2 text-left">
                          <p className="text-[11px] font-medium text-white line-clamp-1">{item.title}</p>
                          <p className="text-[9px] text-slate-300 line-clamp-1">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Presets Carousel */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Popular Sambhajinagar Architecture Presets
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {curatedPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLibraryUrl(preset.url)}
                      className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-orange-50 hover:text-[#F2621E] rounded-lg text-slate-700 whitespace-nowrap transition-colors border border-slate-200"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FROM DEVICE */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              {!uploadPreview ? (
                <label 
                  id="cms-upload-dropzone"
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 group ${isCompressing ? 'border-slate-200 opacity-60 cursor-wait' : 'border-slate-300 hover:border-[#F2621E] hover:bg-orange-50/20 cursor-pointer'}`}
                >
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/webp, image/jpg" 
                    className="hidden" 
                    disabled={isCompressing}
                    onChange={handleFileUpload} 
                  />
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#F2621E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {isCompressing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">
                    {isCompressing ? 'Optimizing image…' : 'Click to browse or drop an image'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Any resolution works — we automatically resize and compress it so it saves reliably
                  </p>
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Image Preview:</span>
                    <button 
                      onClick={() => setUploadPreview(null)}
                      className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Change File
                    </button>
                  </div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center">
                    <img 
                      src={uploadPreview} 
                      alt="Upload preview" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Media Title / Description</label>
                    <input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g. Master Bedroom High-Res Rendering"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Direct Image Web URL (HTTPS)
                </label>
                <div className="flex gap-2">
                  <input
                    id="cms-custom-url-input"
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20 focus:border-[#F2621E]"
                  />
                  <button
                    onClick={() => setCustomUrl('')}
                    className="px-3 py-2 text-xs border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {customUrl && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-600">URL Preview:</p>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                    <img 
                      src={customUrl} 
                      alt="URL preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            id="cms-modal-cancel-btn"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {activeTab === 'library' && (
              <button
                id="cms-apply-library-btn"
                onClick={handleApplyLibraryImage}
                className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Apply Selected Image
              </button>
            )}

            {activeTab === 'upload' && (
              <button
                id="cms-apply-upload-btn"
                onClick={handleSaveUploadedImage}
                disabled={!uploadPreview}
                className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                Upload & Apply Image
              </button>
            )}

            {activeTab === 'url' && (
              <button
                id="cms-apply-url-btn"
                onClick={handleApplyCustomUrl}
                disabled={!customUrl.trim()}
                className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Use Web Image
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
