import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeConfig {
  primaryColor: string; // Hex e.g. #1E4FA8 or #E11D48
  primaryHoverColor: string;
  primaryLightColor: string; // e.g. rgba or soft hex
  primaryContrastColor: string;
  secondaryColor: string; // Hex e.g. #F2621E
  accentColor: string; // Hex e.g. #059669
  headerColor: string; // 'primary' | 'dark' | 'white' | custom hex
  headerCustomColor?: string;
  backgroundColor: 'white' | 'light_gray' | string;
  surfaceColor: string;
  surfaceSecondaryColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  textMutedColor: string;
  borderColor: string;
  buttonStyle: 'sharp' | 'slight' | 'rounded' | 'pill';
  borderRadius: number; // 0, 4, 8, 12, 16, 20
  mode: 'light' | 'dark' | 'system';
  presetName?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  headerColor: string;
  bg: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'auricity-blue',
    name: 'Auricity Blue (Default)',
    description: 'Trustworthy Indian real estate royal navy and high-conversion orange',
    primary: '#1E4FA8',
    primaryHover: '#163D85',
    secondary: '#F2621E',
    accent: '#16A34A',
    headerColor: '#163D85',
    bg: '#FFFFFF'
  },
  {
    id: 'modern-red',
    name: 'Modern Red',
    description: 'High-energy marketplace style inspired by modern leading portals',
    primary: '#E11D48',
    primaryHover: '#BE123C',
    secondary: '#0F172A',
    accent: '#059669',
    headerColor: '#E11D48',
    bg: '#FFFFFF'
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    description: 'Eco-luxury, sustainable and peaceful residential living',
    primary: '#059669',
    primaryHover: '#047857',
    secondary: '#F59E0B',
    accent: '#2563EB',
    headerColor: '#047857',
    bg: '#FFFFFF'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Premium luxury high-rises and architectural masterworks',
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    secondary: '#F97316',
    accent: '#10B981',
    headerColor: '#6D28D9',
    bg: '#FFFFFF'
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Fresh, clean and ultra-modern coastal city aesthetic',
    primary: '#0284C7',
    primaryHover: '#0369A1',
    secondary: '#F43F5E',
    accent: '#10B981',
    headerColor: '#0369A1',
    bg: '#FFFFFF'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm, welcoming and active Indian property discovery',
    primary: '#F2621E',
    primaryHover: '#D94F12',
    secondary: '#1E4FA8',
    accent: '#16A34A',
    headerColor: '#D94F12',
    bg: '#FFFFFF'
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Exclusive villas, penthouses, and private estates',
    primary: '#D97706',
    primaryHover: '#B45309',
    secondary: '#0F172A',
    accent: '#059669',
    headerColor: '#B45309',
    bg: '#FFFFFF'
  },
  {
    id: 'slate-minimal',
    name: 'Slate Minimal',
    description: 'Sleek, monochrome corporate and institutional precision',
    primary: '#0F172A',
    primaryHover: '#1E293B',
    secondary: '#2563EB',
    accent: '#16A34A',
    headerColor: '#0F172A',
    bg: '#FFFFFF'
  }
];

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primaryColor: '#1E4FA8',
  primaryHoverColor: '#163D85',
  primaryLightColor: 'rgba(30, 79, 168, 0.08)',
  primaryContrastColor: '#FFFFFF',
  secondaryColor: '#F2621E',
  accentColor: '#16A34A',
  headerColor: '#163D85',
  backgroundColor: '#FFFFFF',
  surfaceColor: '#FFFFFF',
  surfaceSecondaryColor: '#F8FAFC',
  textPrimaryColor: '#0F172A',
  textSecondaryColor: '#475569',
  textMutedColor: '#94A3B8',
  borderColor: '#E2E8F0',
  buttonStyle: 'rounded',
  borderRadius: 12,
  mode: 'light',
  presetName: 'Auricity Blue (Default)'
};

// Helper to calculate hex opacity or shades
export function hexToRgba(hex: string, alpha = 1): string {
  if (!hex || typeof hex !== 'string') return `rgba(30, 79, 168, ${alpha})`;
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(30, 79, 168, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Adjust lightness of hex
export function adjustColorBrightness(hex: string, percent: number): string {
  if (!hex || typeof hex !== 'string') return hex;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) + Math.round((percent / 100) * 255);
  let g = ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255);
  let b = (num & 0x0000ff) + Math.round((percent / 100) * 255);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

interface ThemeContextType {
  theme: ThemeConfig;
  previewTheme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updatePreviewTheme: (updates: Partial<ThemeConfig>) => void;
  saveTheme: () => void;
  resetTheme: () => void;
  resetToDefault: () => void;
  applyPreset: (presetId: string) => void;
  presets: ThemePreset[];
  isDirty: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('auricity_theme_config');
      if (saved) {
        return { ...DEFAULT_THEME_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load saved theme config', e);
    }
    return DEFAULT_THEME_CONFIG;
  });

  const [previewTheme, setPreviewTheme] = useState<ThemeConfig>(theme);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Apply CSS variables to DOM whenever active theme changes
  useEffect(() => {
    applyThemeVariablesToDOM(theme);
  }, [theme]);

  const applyThemeVariablesToDOM = (cfg: ThemeConfig) => {
    const root = document.documentElement;

    const primary = cfg.primaryColor || DEFAULT_THEME_CONFIG.primaryColor;
    const primaryHover = cfg.primaryHoverColor || adjustColorBrightness(primary, -15);
    const primaryLight = hexToRgba(primary, 0.08);
    const secondary = cfg.secondaryColor || DEFAULT_THEME_CONFIG.secondaryColor;
    const secondaryHover = adjustColorBrightness(secondary, -15);
    const accent = cfg.accentColor || DEFAULT_THEME_CONFIG.accentColor;
    
    // Header color resolution
    let headerBg = primary;
    if (cfg.headerColor === 'dark') headerBg = '#0F172A';
    else if (cfg.headerColor === 'white') headerBg = '#FFFFFF';
    else if (cfg.headerColor && cfg.headerColor !== 'primary') headerBg = cfg.headerColor;

    // Background resolution
    let bg = '#FFFFFF';
    if (cfg.backgroundColor === 'light_gray') bg = '#F8FAFC';
    else if (cfg.backgroundColor && cfg.backgroundColor !== 'white') bg = cfg.backgroundColor;

    // Radius
    const rad = cfg.borderRadius ?? 12;
    let btnRad = `${rad}px`;
    if (cfg.buttonStyle === 'sharp') btnRad = '2px';
    else if (cfg.buttonStyle === 'pill') btnRad = '9999px';
    else if (cfg.buttonStyle === 'slight') btnRad = '6px';
    else if (cfg.buttonStyle === 'rounded') btnRad = `${Math.max(8, rad)}px`;

    // Assign CSS Variables
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-hover', primaryHover);
    root.style.setProperty('--primary-light', primaryLight);
    root.style.setProperty('--primary-contrast', cfg.primaryContrastColor || '#FFFFFF');
    root.style.setProperty('--secondary', secondary);
    root.style.setProperty('--secondary-hover', secondaryHover);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--header-bg', headerBg);
    root.style.setProperty('--background', bg);
    root.style.setProperty('--surface', cfg.surfaceColor || '#FFFFFF');
    root.style.setProperty('--surface-secondary', cfg.surfaceSecondaryColor || '#F8FAFC');
    root.style.setProperty('--text-primary', cfg.textPrimaryColor || '#0F172A');
    root.style.setProperty('--text-secondary', cfg.textSecondaryColor || '#475569');
    root.style.setProperty('--text-muted', cfg.textMutedColor || '#94A3B8');
    root.style.setProperty('--border', cfg.borderColor || '#E2E8F0');
    root.style.setProperty('--radius-btn', btnRad);
    root.style.setProperty('--radius-card', `${rad}px`);
    root.style.setProperty('--radius-sm', `${Math.max(4, rad - 6)}px`);
    root.style.setProperty('--radius-md', `${rad}px`);
    root.style.setProperty('--radius-lg', `${rad + 6}px`);
    root.style.setProperty('--success', '#16A34A');
    root.style.setProperty('--warning', '#F59E0B');
    root.style.setProperty('--error', '#EF4444');
  };

  const updatePreviewTheme = (updates: Partial<ThemeConfig>) => {
    setPreviewTheme(prev => {
      const next = { ...prev, ...updates };
      // Auto-compute hover & light if primary changes
      if (updates.primaryColor && !updates.primaryHoverColor) {
        next.primaryHoverColor = adjustColorBrightness(updates.primaryColor, -15);
        next.primaryLightColor = hexToRgba(updates.primaryColor, 0.08);
      }
      return next;
    });
    setIsDirty(true);
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const next = { ...theme, ...updates };
    if (updates.primaryColor && !updates.primaryHoverColor) {
      next.primaryHoverColor = adjustColorBrightness(updates.primaryColor, -15);
      next.primaryLightColor = hexToRgba(updates.primaryColor, 0.08);
    }
    setTheme(next);
    setPreviewTheme(next);
    try {
      localStorage.setItem('auricity_theme_config', JSON.stringify(next));
    } catch (e) {}
    setIsDirty(false);
  };

  const saveTheme = () => {
    setTheme(previewTheme);
    try {
      localStorage.setItem('auricity_theme_config', JSON.stringify(previewTheme));
    } catch (e) {}
    setIsDirty(false);
  };

  const resetTheme = () => {
    setPreviewTheme(theme);
    setIsDirty(false);
  };

  const resetToDefault = () => {
    setTheme(DEFAULT_THEME_CONFIG);
    setPreviewTheme(DEFAULT_THEME_CONFIG);
    try {
      localStorage.setItem('auricity_theme_config', JSON.stringify(DEFAULT_THEME_CONFIG));
    } catch (e) {}
    setIsDirty(false);
  };

  const applyPreset = (presetId: string) => {
    const p = THEME_PRESETS.find(item => item.id === presetId);
    if (!p) return;
    const newConfig: ThemeConfig = {
      ...previewTheme,
      primaryColor: p.primary,
      primaryHoverColor: p.primaryHover,
      primaryLightColor: hexToRgba(p.primary, 0.08),
      secondaryColor: p.secondary,
      accentColor: p.accent,
      headerColor: p.headerColor,
      backgroundColor: p.bg === '#FFFFFF' ? 'white' : p.bg,
      presetName: p.name
    };
    setPreviewTheme(newConfig);
    setIsDirty(true);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        previewTheme,
        updateTheme,
        updatePreviewTheme,
        saveTheme,
        resetTheme,
        resetToDefault,
        applyPreset,
        presets: THEME_PRESETS,
        isDirty
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
