import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Copy, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  AuricityIcon, 
  ICON_REGISTRY, 
  IconName, 
  IconCategory 
} from './IconSystem';

interface IconSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_NAMES: Record<IconCategory, string> = {
  navigation: 'Main Navigation',
  search: 'Search & Filters',
  trust: 'Trust & Verification',
  features: 'Features & Highlights',
  categories: 'Real Estate Categories',
  services: 'Doorstep Home Services',
  'property-card': 'Property Card Badges',
  payments: 'Payments & Financial Offers',
  support: 'Support & Helpdesk',
  utility: 'System Utilities'
};

export const IconSystemModal: React.FC<IconSystemModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [previewState, setPreviewState] = useState<'blue' | 'orange' | 'active'>('blue');

  if (!isOpen) return null;

  const iconEntries = Object.entries(ICON_REGISTRY) as [IconName, typeof ICON_REGISTRY[IconName]][];

  const filteredIcons = iconEntries.filter(([name, data]) => {
    const matchesCategory = selectedCategory === 'all' || data.defaultCategory === selectedCategory;
    const matchesSearch = 
      name.toLowerCase().includes(search.toLowerCase()) || 
      data.label.toLowerCase().includes(search.toLowerCase()) ||
      data.defaultCategory.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (iconName: string) => {
    const code = `<AuricityIcon name="${iconName}" />`;
    navigator.clipboard.writeText(code);
    setCopiedName(iconName);
    setTimeout(() => setCopiedName(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-gradient-to-r from-blue-50/60 to-white">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1E4FA8]/10 text-[#1E4FA8] text-[10px] font-black uppercase tracking-wider">
                Brand Design System
              </span>
              <span className="text-xs text-[#64748B]">✦ 55+ Verified Line Icons</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E4FA8] flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#F2621E]" />
              <span>Auricity Unified Icon Architecture</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Standardized stroke-width (1.8), Brand Blue (#1E4FA8) lines, and Brand Orange (#F2621E) active states.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Category Chips & State Toggle */}
        <div className="p-4 bg-[#F7F8FA] border-b border-[#E2E8F0] space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search icons by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#1E4FA8]"
              />
            </div>

            {/* State Preview Switches */}
            <div className="flex items-center space-x-1.5 self-end sm:self-auto bg-white p-1 rounded-xl border border-[#E2E8F0] text-xs font-bold">
              <button
                onClick={() => setPreviewState('blue')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  previewState === 'blue' 
                    ? 'bg-[#1E4FA8] text-white shadow-xs' 
                    : 'text-[#64748B] hover:text-[#1E4FA8]'
                }`}
              >
                Line (#1E4FA8)
              </button>
              <button
                onClick={() => setPreviewState('orange')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  previewState === 'orange' 
                    ? 'bg-[#F2621E] text-white shadow-xs' 
                    : 'text-[#64748B] hover:text-[#F2621E]'
                }`}
              >
                Orange (#F2621E)
              </button>
              <button
                onClick={() => setPreviewState('active')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  previewState === 'active' 
                    ? 'bg-[#F2621E] text-white shadow-xs' 
                    : 'text-[#64748B] hover:text-[#F2621E]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Active State</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1E4FA8] text-white shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
              }`}
            >
              All ({iconEntries.length})
            </button>
            {Object.entries(CATEGORY_NAMES).map(([catKey, catLabel]) => (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === catKey
                    ? 'bg-[#1E4FA8] text-white shadow-xs'
                    : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                {catLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Icons Grid Content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredIcons.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-[#64748B]">
              No icons matched &quot;{search}&quot;. Try a different search term.
            </div>
          ) : (
            filteredIcons.map(([name, data]) => {
              const isCopied = copiedName === name;
              const isActive = previewState === 'active';
              const variant = previewState === 'orange' ? 'orange' : previewState === 'blue' ? 'blue' : 'default';

              return (
                <div
                  key={name}
                  onClick={() => handleCopy(name)}
                  className="group relative p-3.5 bg-white hover:bg-blue-50/40 rounded-2xl border border-[#E2E8F0] hover:border-[#1E4FA8]/50 shadow-xs hover:shadow-card transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 select-none"
                  title="Click to copy component code"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F7F8FA] group-hover:bg-white group-hover:shadow-xs flex items-center justify-center transition-all border border-[#E2E8F0]">
                    <AuricityIcon 
                      name={name} 
                      size={24} 
                      active={isActive}
                      variant={variant}
                    />
                  </div>
                  <div className="w-full overflow-hidden">
                    <p className="text-[11px] font-bold text-[#0F172A] truncate">
                      {data.label}
                    </p>
                    <p className="text-[9px] font-mono text-[#64748B] truncate">
                      {name}
                    </p>
                  </div>

                  {/* Copy Overlay Indicator */}
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isCopied ? (
                      <span className="p-1 rounded-md bg-emerald-100 text-[#16A34A] block">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="p-1 rounded-md bg-slate-100 text-[#64748B] block hover:text-[#1E4FA8]">
                        <Copy className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
          <span>Click any card to copy its JSX component tag to clipboard.</span>
          <span className="font-mono text-[11px] font-bold text-[#1E4FA8]">
            {filteredIcons.length} icons displayed
          </span>
        </div>
      </div>
    </div>
  );
};
