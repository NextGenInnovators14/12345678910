import React from 'react';
import { useApp } from '../../context/AppContext';
import { normalizeListingType } from '../../utils/propertyUtils';
import { 
  Building2, 
  Home, 
  LandPlot, 
  BedDouble, 
  Briefcase, 
  Wrench, 
  Sparkles, 
  KeyRound,
  MoreVertical,
  Calculator,
  BookOpen
} from 'lucide-react';

interface CategoryPillsProps {
  onOpenFeaturesMenu?: () => void;
  onOpenEMIModal?: () => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ 
  onOpenFeaturesMenu,
  onOpenEMIModal 
}) => {
  const { activeView, setActiveView, allProperties } = useApp();
  const publicProperties = allProperties.filter(p => p.approvalStatus !== 'pending');
  const count = (type: string) => publicProperties.filter(p => normalizeListingType(p.listingType) === type).length;
  const categoryCount = (name: string) => publicProperties.filter(p => String(p.category || '').toLowerCase() === name).length;

  const categories = [
    { id: 'properties', label: 'Buy Flats', icon: Building2, count: String(count('sale')) },
    { id: 'rentals', label: 'Rent Homes', icon: KeyRound, count: String(count('rent')) },
    { id: 'pgs', label: 'PG / Co-Living', icon: BedDouble, count: String(count('pg')) },
    { id: 'plots', label: 'NA Plots / Land', icon: LandPlot, count: String(categoryCount('plots')), targetView: 'plots' },
    { id: 'commercial', label: 'Commercial', icon: Briefcase, count: String(categoryCount('commercial')), targetView: 'commercial' },
    { id: 'services', label: 'Doorstep Services', icon: Wrench, count: '12 Pros' },
    { id: 'knowledge-hub', label: 'Knowledge Hub', icon: BookOpen, count: 'Guides' },
    { id: 'valuator', label: 'AI Valuator', icon: Sparkles, count: 'Instant', highlight: true }
  ];

  return (
    <div className="bg-[#FAF7F2] border-b border-[#E5DEC9] py-2 sm:py-2.5 shadow-2xs w-full max-w-full overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth -mx-3 px-3 sm:mx-0 sm:px-0 w-full min-w-0">
          
          {/* 3-Dot All Features Quick Trigger */}
          <button
            onClick={() => onOpenFeaturesMenu?.()}
            className="group flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-200 border shrink-0 bg-amber-100 hover:bg-[#1E4FA8] text-[#1E4FA8] hover:text-white border-amber-300/80 hover:border-[#1E4FA8] shadow-2xs cursor-pointer active:scale-95"
            title="Open 3-Dot Features & Navigation Hub"
          >
            <div className="p-1 rounded-lg bg-white text-[#F2621E] shadow-2xs group-hover:bg-[#F2621E] group-hover:text-white transition-colors duration-200 shrink-0">
              <MoreVertical className="w-3.5 h-3.5 rotate-90 sm:rotate-0" />
            </div>
            <span>All Features</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black bg-[#F2621E] text-white">
              ...
            </span>
          </button>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeView === (cat.targetView || cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setActiveView(cat.targetView || cat.id)}
                className={`group flex items-center space-x-2 sm:space-x-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border shrink-0 cursor-pointer ${
                  cat.highlight
                    ? 'bg-[#1E4FA8] text-white border-[#1E4FA8] shadow-xs hover:opacity-95 hover:-translate-y-0.5'
                    : isSelected
                    ? 'bg-[#1E4FA8] text-white border-[#1E4FA8] shadow-sm font-black'
                    : 'bg-white text-slate-800 border-[#E2DAC6] hover:bg-amber-50 hover:border-[#1E4FA8]/40 hover:-translate-y-0.5'
                }`}
              >
                <div className={`p-1 sm:p-1.5 rounded-xl transition-colors duration-200 shrink-0 ${
                  cat.highlight || isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-amber-50 text-[#1E4FA8] shadow-2xs group-hover:text-[#F2621E]'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  cat.highlight || isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}

          {/* Quick EMI Calculator Pill */}
          <button
            onClick={() => onOpenEMIModal?.()}
            className="group flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border shrink-0 bg-white hover:bg-orange-50/90 text-slate-800 hover:text-[#F2621E] border-[#E2DAC6] hover:border-[#F2621E]/40 shadow-2xs cursor-pointer hover:-translate-y-0.5"
            title="Open Loan EMI Calculator"
          >
            <div className="p-1 rounded-lg bg-orange-50 text-[#F2621E] shadow-2xs shrink-0">
              <Calculator className="w-3.5 h-3.5" />
            </div>
            <span>EMI Calculator</span>
          </button>

        </div>
      </div>
    </div>
  );
};
