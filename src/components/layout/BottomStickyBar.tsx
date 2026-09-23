import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Search, 
  PlusCircle, 
  Wrench, 
  MoreVertical
} from 'lucide-react';

interface BottomStickyBarProps {
  onOpenFeaturesMenu?: () => void;
}

export const BottomStickyBar: React.FC<BottomStickyBarProps> = ({ onOpenFeaturesMenu }) => {
  const { activeView, setActiveView } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => setActiveView('home'),
      isActive: activeView === 'home'
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      action: () => setActiveView('properties'),
      isActive: activeView === 'properties' || activeView === 'rentals' || activeView === 'pgs'
    },
    {
      id: 'post',
      label: 'Post (Free)',
      icon: PlusCircle,
      action: () => setActiveView('post-property'),
      isActive: activeView === 'post-property',
      highlight: true
    },
    {
      id: 'services',
      label: 'Services',
      icon: Wrench,
      action: () => setActiveView('services'),
      isActive: activeView === 'services'
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: MoreVertical,
      action: () => onOpenFeaturesMenu?.(),
      isActive: false
    }
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-[#E5DEC9] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] safe-bottom w-full"
      id="bottom-sticky-mobile-navigation"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center max-w-lg mx-auto w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
                item.isActive 
                  ? 'text-[#1E4FA8] font-black' 
                  : item.highlight
                  ? 'text-[#F2621E] hover:text-[#DE5514] font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
              id={`mobile-bottom-nav-${item.id}`}
              aria-label={item.label}
            >
              {/*
                The background "pill" is the ONLY thing that should say
                "you are on this page right now" — it must follow isActive
                alone. Post (Free) previously got the orange pill any time
                it wasn't active too (via the `highlight` branch below),
                which made it look permanently selected on every single
                page and confused anyone trying to tell which tab was
                actually open. It still gets its orange TEXT always (that
                part is an intentional "this is free" accent, not a
                selection indicator) — just not the pill unless it's truly
                the active page.
              */}
              <div className={`p-1 rounded-lg transition-colors ${
                item.isActive 
                  ? (item.highlight ? 'bg-orange-50 text-[#F2621E]' : 'bg-blue-50 text-[#1E4FA8]')
                  : 'text-inherit'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
