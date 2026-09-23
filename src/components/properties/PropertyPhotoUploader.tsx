import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  Star, 
  Image as ImageIcon, 
  Plus, 
  Sparkles, 
  Check, 
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';

interface PropertyPhotoUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxPhotos?: number;
}

// Quick Sambhajinagar realistic interior/exterior presets if owner is testing or doesn't have photos
const SAMPLE_PRESETS = [
  {
    name: 'Modern Living Room',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'
  },
  {
    name: 'Modular Kitchen',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&auto=format&fit=crop&q=80'
  },
  {
    name: 'Master Bedroom',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1000&auto=format&fit=crop&q=80'
  },
  {
    name: 'Building Exterior & Balcony',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80'
  }
];

export const PropertyPhotoUploader: React.FC<PropertyPhotoUploaderProps> = ({
  images,
  onChange,
  maxPhotos = 8
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image on client-side canvas to ~1280px max dimension & JPEG 0.8 quality
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage('');

    const remainingSlots = maxPhotos - images.length;
    if (remainingSlots <= 0) {
      setErrorMessage(`Maximum limit of ${maxPhotos} photos reached.`);
      return;
    }

    const filesToProcess = Array.from(fileList).slice(0, remainingSlots);
    setIsProcessing(true);

    try {
      const promises = filesToProcess.map(file => compressImage(file));
      const processedImages = await Promise.all(promises);
      onChange([...images, ...processedImages]);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not process one or more images. Please try again.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemovePhoto = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetCoverPhoto = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const rest = images.filter((_, i) => i !== index);
    onChange([target, ...rest]);
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    if (images.length >= maxPhotos) {
      setErrorMessage(`Maximum limit of ${maxPhotos} photos reached.`);
      return;
    }
    onChange([...images, urlInput.trim()]);
    setUrlInput('');
    setShowUrlInput(false);
  };

  const handleAddSamplePreset = (presetUrl: string) => {
    if (images.includes(presetUrl)) return;
    if (images.length >= maxPhotos) {
      setErrorMessage(`Maximum limit of ${maxPhotos} photos reached.`);
      return;
    }
    onChange([...images, presetUrl]);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
          isDragging 
            ? 'border-[#1E4FA8] bg-blue-50/50 scale-[0.99]' 
            : 'border-slate-300 hover:border-[#1E4FA8] bg-slate-50/70 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#1E4FA8]">
            <UploadCloud className="w-7 h-7 text-[#1E4FA8] animate-bounce-subtle" />
          </div>

          <div>
            <p className="text-sm font-black text-slate-800">
              {isProcessing ? 'Optimizing & Uploading Photos...' : 'Click to Upload or Drag & Drop Photos'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPG, PNG, WEBP from your phone camera or gallery (Up to {maxPhotos} photos)
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
            <ImageIcon className="w-3.5 h-3.5 text-[#F2621E]" />
            <span>{images.length} of {maxPhotos} photos added</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Photos Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">
              Uploaded Property Gallery ({images.length} photos)
            </span>
            <span className="text-slate-400">First image is your Main Cover Photo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((imgUrl, index) => {
              const isCover = index === 0;
              return (
                <div 
                  key={`${imgUrl.slice(0, 30)}-${index}`}
                  className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] shadow-xs"
                >
                  <img
                    src={imgUrl}
                    alt={`Property photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Badges and Actions overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      {isCover ? (
                        <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <Star className="w-3 h-3 fill-slate-900" /> Cover
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetCoverPhoto(index);
                          }}
                          className="bg-white/90 hover:bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Star className="w-3 h-3" /> Make Cover
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePhoto(index);
                        }}
                        className="bg-red-600/90 hover:bg-red-700 text-white p-1 rounded-md shadow-xs transition-colors cursor-pointer"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] font-bold text-white/90">
                      Photo #{index + 1}
                    </span>
                  </div>

                  {/* Static Cover Badge */}
                  {isCover && (
                    <div className="absolute top-2 left-2 group-hover:hidden bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-slate-900" /> Cover Photo
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alternative Options: Add by URL or Sample Presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs font-bold text-[#1E4FA8] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showUrlInput ? 'Hide Image URL input' : 'Or paste direct image URL'}</span>
        </button>

        {images.length < maxPhotos && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500 font-medium">Quick samples:</span>
            {SAMPLE_PRESETS.slice(0, 3).map((preset) => (
              <button
                type="button"
                key={preset.name}
                onClick={() => handleAddSamplePreset(preset.url)}
                className="text-[11px] font-bold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                + {preset.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {showUrlInput && (
        <div className="flex gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <input
            type="url"
            placeholder="https://example.com/property-image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#1E4FA8]"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="bg-[#1E4FA8] text-white px-4 py-2 text-xs font-black rounded-xl hover:bg-[#153a7a] cursor-pointer"
          >
            Add URL
          </button>
        </div>
      )}
    </div>
  );
};
