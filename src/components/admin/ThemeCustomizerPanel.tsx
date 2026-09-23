import React, { useState } from 'react';
import { useTheme, THEME_PRESETS, ThemeConfig } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { 
  Palette, 
  Sparkles, 
  RotateCcw, 
  Save, 
  Eye, 
  Check, 
  Sliders, 
  Sun, 
  Moon, 
  Laptop, 
  CheckCircle2,
  Building2,
  PhoneCall,
  Heart,
  ShieldCheck,
  Search,
  PlusCircle,
  Percent,
  Layers,
  Sparkle
} from 'lucide-react';

export const ThemeCustomizerPanel: React.FC = () => {
  const { 
    theme, 
    previewTheme, 
    updatePreviewTheme, 
    saveTheme, 
    resetTheme, 
    resetToDefault, 
    applyPreset, 
    presets,
    isDirty 
  } = useTheme();

  const { showToast } = useApp();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleSave = () => {
    saveTheme();
    showToast('Theme settings saved and applied to entire website!', 'success');
  };

  const handleReset = () => {
    resetTheme();
    showToast('Unsaved theme changes reverted.', 'info');
  };

  const handleResetDefault = () => {
    if (confirm('Restore the default Auricity Blue design theme?')) {
      resetToDefault();
      showToast('Default Auricity theme restored!', 'success');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="theme-customizer-panel">
      
      {/* Header Banner */}
      <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black">
            <Palette className="w-3.5 h-3.5 text-[var(--secondary)]" />
            <span>Centralized Design System Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Website Appearance & Theme Customizer
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Configure primary brand colors, headers, button curves, typography shades, and live test changes across the portal.
          </p>
        </div>

        {/* Global Save / Reset Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handleResetDefault}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-rose-600 bg-[var(--surface-secondary)] hover:bg-rose-50 border border-[var(--border)] transition-colors cursor-pointer"
            title="Reset to default Auricity styling"
          >
            Restore Default
          </button>

          {isDirty && (
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)] bg-[var(--surface-secondary)] hover:bg-slate-200 border border-[var(--border)] transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          )}

          <button
            onClick={handleSave}
            className="btn-theme-primary px-5 py-2 text-xs font-black rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Theme Changes</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (Left 7 cols) & Live Interactive Preview (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1: One-Click Theme Presets */}
          <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-wider">
                  1. One-Click Theme Presets
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Select a pre-tuned, high-conversion real estate color system.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {presets.map((preset) => {
                const isCurrent = previewTheme.primaryColor.toUpperCase() === preset.primary.toUpperCase();
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-[var(--primary)] bg-[var(--primary-light)] ring-2 ring-[var(--primary)]/20 shadow-xs'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <span className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: preset.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: preset.secondary }} />
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[var(--primary)]" />}
                    </div>
                    <div>
                      <span className="font-black text-xs text-[var(--text-primary)] block leading-tight">
                        {preset.name.split(' (')[0]}
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)] line-clamp-1">
                        {preset.primary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Core Brand Colors & Custom HEX Inputs */}
          <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <div>
              <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-wider">
                2. Brand Colors & Custom HEX Inputs
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Customize precise hex codes for buttons, headers, accents and badges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Primary Color */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)]">
                <label className="text-[11px] font-bold text-[var(--text-primary)] block">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={previewTheme.primaryColor}
                    onChange={(e) => updatePreviewTheme({ primaryColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={previewTheme.primaryColor}
                    onChange={(e) => updatePreviewTheme({ primaryColor: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] uppercase"
                  />
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] block">Nav, Primary CTAs & Active states</span>
              </div>

              {/* Secondary Color */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)]">
                <label className="text-[11px] font-bold text-[var(--text-primary)] block">
                  Secondary Accent Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={previewTheme.secondaryColor}
                    onChange={(e) => updatePreviewTheme({ secondaryColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={previewTheme.secondaryColor}
                    onChange={(e) => updatePreviewTheme({ secondaryColor: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] uppercase"
                  />
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] block">Post Property, 0% badges & highlights</span>
              </div>

              {/* Accent / Success Color */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)]">
                <label className="text-[11px] font-bold text-[var(--text-primary)] block">
                  Third Accent Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={previewTheme.accentColor}
                    onChange={(e) => updatePreviewTheme({ accentColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={previewTheme.accentColor}
                    onChange={(e) => updatePreviewTheme({ accentColor: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] uppercase"
                  />
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] block">Verified checks, trust badges</span>
              </div>

            </div>
          </div>

          {/* SECTION 3: Header & Surface Background Modes */}
          <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <div>
              <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-wider">
                3. Header & Canvas Backgrounds
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Choose the appearance for the top notification bar and body background.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Header Style Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  Top Trust Bar Header Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'primary', label: 'Use Primary' },
                    { id: 'dark', label: 'Dark Navy' },
                    { id: 'white', label: 'White / Light' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => updatePreviewTheme({ headerColor: opt.id as any })}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        previewTheme.headerColor === opt.id
                          ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-black'
                          : 'border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  Page Background Theme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updatePreviewTheme({ backgroundColor: 'white' })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                      previewTheme.backgroundColor === 'white'
                        ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-black'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                    }`}
                  >
                    Clean White (#FFF)
                  </button>
                  <button
                    onClick={() => updatePreviewTheme({ backgroundColor: 'light_gray' })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                      previewTheme.backgroundColor === 'light_gray'
                        ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-black'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                    }`}
                  >
                    Soft Slate (#F8FAFC)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 4: Button Curves & Border Radius Slider */}
          <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <div>
              <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-wider">
                4. Button Style & Corner Radius
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Control curvature across cards, buttons, search bars, and pills.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Button Style Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'sharp', label: 'Sharp (2px)', radius: 2 },
                  { id: 'slight', label: 'Slight (6px)', radius: 6 },
                  { id: 'rounded', label: 'Rounded (12px)', radius: 12 },
                  { id: 'pill', label: 'Pill Curve', radius: 16 }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => updatePreviewTheme({ buttonStyle: style.id as any, borderRadius: style.radius })}
                    className={`px-3.5 py-2.5 border text-xs font-bold transition-all cursor-pointer text-center ${
                      previewTheme.buttonStyle === style.id
                        ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-black'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                    }`}
                    style={{
                      borderRadius: style.id === 'sharp' ? '2px' : style.id === 'pill' ? '9999px' : style.id === 'slight' ? '6px' : '12px'
                    }}
                  >
                    {style.label}
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                  <span>Card Corner Radius Precision</span>
                  <span className="font-mono">{previewTheme.borderRadius ?? 12}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="2"
                  value={previewTheme.borderRadius ?? 12}
                  onChange={(e) => updatePreviewTheme({ borderRadius: parseInt(e.target.value) })}
                  className="w-full accent-[var(--primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>0px (Boxy)</span>
                  <span>8px</span>
                  <span>12px (Standard)</span>
                  <span>16px</span>
                  <span>20px (Organic)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Live Interactive Preview Frame */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="sticky top-24 space-y-4">
            
            {/* Preview Frame Control Header */}
            <div className="flex items-center justify-between bg-[var(--surface)] p-3 rounded-2xl border border-[var(--border)] shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-black text-[var(--text-primary)]">
                <Eye className="w-4 h-4 text-[var(--primary)]" />
                <span>Real-Time Component Preview</span>
              </div>

              <div className="flex items-center space-x-1 bg-[var(--surface-secondary)] p-1 rounded-xl border border-[var(--border)]">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-2xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Interactive Mock Canvas */}
            <div 
              className={`p-4 rounded-3xl border border-[var(--border)] shadow-md space-y-4 transition-all duration-300 ${
                previewDevice === 'mobile' ? 'max-w-[340px] mx-auto' : 'w-full'
              }`}
              style={{
                backgroundColor: previewTheme.backgroundColor === 'light_gray' ? '#F8FAFC' : '#FFFFFF'
              }}
            >
              {/* Mock Header Strip */}
              <div 
                className="p-2.5 text-white text-[11px] font-bold rounded-2xl flex items-center justify-between shadow-2xs"
                style={{
                  backgroundColor: previewTheme.headerColor === 'dark' ? '#0F172A' : previewTheme.headerColor === 'white' ? '#1E293B' : previewTheme.primaryColor
                }}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: previewTheme.secondaryColor }} />
                  <span className="text-[10px] uppercase font-black tracking-wider">0% Brokerage Direct</span>
                </div>
                <span className="text-[10px] opacity-90">+91 8010506030</span>
              </div>

              {/* Mock Search Bar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <span 
                    className="px-2 py-0.5 rounded-lg text-[10px] font-black text-white"
                    style={{ backgroundColor: previewTheme.primaryColor }}
                  >
                    Buy
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold">Rent</span>
                  <span className="text-slate-400 text-[10px] font-bold">PG</span>
                </div>

                <div className="flex space-x-1.5">
                  <input
                    type="text"
                    placeholder="Search CIDCO, Garkheda..."
                    disabled
                    className="flex-1 bg-slate-50 border border-slate-200 text-[11px] px-2.5 py-1.5 rounded-xl font-medium"
                  />
                  <button
                    className="px-3 py-1.5 text-[11px] font-black text-white flex items-center space-x-1"
                    style={{
                      backgroundColor: previewTheme.primaryColor,
                      borderRadius: previewTheme.buttonStyle === 'sharp' ? '2px' : previewTheme.buttonStyle === 'pill' ? '9999px' : `${previewTheme.borderRadius}px`
                    }}
                  >
                    <Search className="w-3 h-3" />
                    <span>Go</span>
                  </button>
                </div>
              </div>

              {/* Mock Property Card */}
              <div 
                className="bg-white border border-slate-200 overflow-hidden shadow-xs space-y-2.5 pb-3"
                style={{
                  borderRadius: `${previewTheme.borderRadius}px`
                }}
              >
                <div className="relative aspect-16/9 bg-slate-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60"
                    alt="Mock"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <span 
                      className="text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: previewTheme.secondaryColor }}
                    >
                      0% Brokerage
                    </span>
                    <span 
                      className="text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: previewTheme.primaryColor }}
                    >
                      Verified
                    </span>
                  </div>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white">
                    <Heart className="w-3 h-3" />
                  </button>
                </div>

                <div className="px-3 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-black" style={{ color: previewTheme.primaryColor }}>
                      ₹68.5 Lakh
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">₹5,400/sq.ft</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    3 BHK Premium Flat in CIDCO N-4
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">
                    Opposite Prozone Mall, Sambhajinagar
                  </p>

                  <div className="pt-2 flex items-center space-x-1.5">
                    <button
                      className="flex-1 text-[10px] font-bold py-1.5 rounded-lg text-white"
                      style={{
                        backgroundColor: '#16A34A',
                        borderRadius: previewTheme.buttonStyle === 'sharp' ? '2px' : previewTheme.buttonStyle === 'pill' ? '9999px' : `${previewTheme.borderRadius}px`
                      }}
                    >
                      WhatsApp Pro
                    </button>
                    <button
                      className="flex-1 text-[10px] font-bold py-1.5 text-white"
                      style={{
                        backgroundColor: previewTheme.primaryColor,
                        borderRadius: previewTheme.buttonStyle === 'sharp' ? '2px' : previewTheme.buttonStyle === 'pill' ? '9999px' : `${previewTheme.borderRadius}px`
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Mock Buttons Showcase */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Button Curve & Accent Renders:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-3 py-1.5 text-xs font-black text-white shadow-xs"
                    style={{
                      backgroundColor: previewTheme.primaryColor,
                      borderRadius: previewTheme.buttonStyle === 'sharp' ? '2px' : previewTheme.buttonStyle === 'pill' ? '9999px' : `${previewTheme.borderRadius}px`
                    }}
                  >
                    Primary CTA
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs font-black text-white shadow-xs"
                    style={{
                      backgroundColor: previewTheme.secondaryColor,
                      borderRadius: previewTheme.buttonStyle === 'sharp' ? '2px' : previewTheme.buttonStyle === 'pill' ? '9999px' : `${previewTheme.borderRadius}px`
                    }}
                  >
                    Post Property
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs font-bold border"
                    style={{
                      borderColor: previewTheme.primaryColor,
                      color: previewTheme.primaryColor,
                      borderRadius: previewTheme.buttonStyle === 'sharp' ? '2px' : previewTheme.buttonStyle === 'pill' ? '9999px' : `${previewTheme.borderRadius}px`
                    }}
                  >
                    Outline
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Helper Note */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
              <span className="font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Instant Site-Wide Activation</span>
              </span>
              <p>
                Clicking <strong>Save Theme Changes</strong> updates CSS variables across all components, navigation headers, property cards, and buttons instantly.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
