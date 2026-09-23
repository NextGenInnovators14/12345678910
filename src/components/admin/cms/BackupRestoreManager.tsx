import React, { useRef, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Download, 
  Upload, 
  RotateCcw, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  HardDrive, 
  FileJson, 
  ShieldAlert,
  Server
} from 'lucide-react';

export const BackupRestoreManager: React.FC = () => {
  const { 
    allProperties, 
    projects, 
    offers, 
    homePageConfig, 
    cmsPages, 
    navigationConfig, 
    settings, 
    realtors, 
    clubCardsConfig, 
    bannerAds, 
    cmsBlogs, 
    trainingBlogs, 
    knowledgeHubConfig, 
    leads, 
    serviceBookings, 
    contactPageConfig, 
    contactMessages,
    updateHomePageConfig,
    updateSettings,
    updateNavigationConfig,
    updateClubCardsConfig,
    updateContactPageConfig,
    showToast 
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoring, setRestoring] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // 1. Export All Website Data to JSON file
  const handleExportBackup = () => {
    try {
      const backupData = {
        meta: {
          app: 'Auricity Real Estate Portal',
          version: '14.0',
          exportedAt: new Date().toISOString()
        },
        allProperties,
        projects,
        offers,
        homePageConfig,
        cmsPages,
        navigationConfig,
        settings,
        realtors,
        clubCardsConfig,
        bannerAds,
        cmsBlogs,
        trainingBlogs,
        knowledgeHubConfig,
        leads,
        serviceBookings,
        contactPageConfig,
        contactMessages
      };

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute('download', `auricity-full-backup-${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast('Full website backup exported successfully!', 'success');
    } catch (err) {
      showToast('Failed to export backup data', 'error');
    }
  };

  // 2. Restore All Website Data from uploaded JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRestoring(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        // Check if valid backup
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON format');
        }

        // Apply to localStorage & sync
        if (parsed.allProperties) localStorage.setItem('auricity_properties', JSON.stringify(parsed.allProperties));
        if (parsed.projects) localStorage.setItem('auricity_projects', JSON.stringify(parsed.projects));
        if (parsed.offers) localStorage.setItem('auricity_offers', JSON.stringify(parsed.offers));
        if (parsed.homePageConfig) {
          localStorage.setItem('auricity_home_config', JSON.stringify(parsed.homePageConfig));
          updateHomePageConfig(parsed.homePageConfig);
        }
        if (parsed.cmsPages) localStorage.setItem('auricity_cms_pages', JSON.stringify(parsed.cmsPages));
        if (parsed.navigationConfig) {
          localStorage.setItem('auricity_nav_config', JSON.stringify(parsed.navigationConfig));
          updateNavigationConfig(parsed.navigationConfig);
        }
        if (parsed.settings) {
          localStorage.setItem('auricity_settings', JSON.stringify(parsed.settings));
          updateSettings(parsed.settings);
        }
        if (parsed.realtors) localStorage.setItem('auricity_realtors', JSON.stringify(parsed.realtors));
        if (parsed.clubCardsConfig) {
          localStorage.setItem('auricity_club_cards', JSON.stringify(parsed.clubCardsConfig));
          updateClubCardsConfig(parsed.clubCardsConfig);
        }
        if (parsed.bannerAds) localStorage.setItem('auricity_banner_ads', JSON.stringify(parsed.bannerAds));
        if (parsed.cmsBlogs) localStorage.setItem('auricity_cms_blogs', JSON.stringify(parsed.cmsBlogs));
        if (parsed.trainingBlogs) localStorage.setItem('auricity_training_blogs', JSON.stringify(parsed.trainingBlogs));
        if (parsed.leads) localStorage.setItem('auricity_leads', JSON.stringify(parsed.leads));
        if (parsed.serviceBookings) localStorage.setItem('auricity_bookings', JSON.stringify(parsed.serviceBookings));
        if (parsed.contactPageConfig) {
          localStorage.setItem('auricity_contact_page_config', JSON.stringify(parsed.contactPageConfig));
          updateContactPageConfig(parsed.contactPageConfig);
        }

        showToast('Backup restored successfully! Reloading...', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err: any) {
        showToast(`Restore failed: ${err.message || 'Invalid file format'}`, 'error');
        setRestoring(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 3. Reset Website to Initial Seed Data
  const handleFactoryReset = () => {
    try {
      const keysToClear = [
        'auricity_properties', 'auricity_projects', 'auricity_offers', 
        'auricity_home_config', 'auricity_cms_pages', 'auricity_nav_config', 
        'auricity_settings', 'auricity_realtors', 'auricity_club_cards', 
        'auricity_banner_ads', 'auricity_cms_blogs', 'auricity_training_blogs', 
        'auricity_leads', 'auricity_bookings', 'auricity_contact_page_config'
      ];
      keysToClear.forEach(k => localStorage.removeItem(k));
      showToast('Website restored to factory defaults. Reloading...', 'info');
      setResetConfirmOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      showToast('Failed to reset defaults', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Restore */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept=".json,application/json" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-2">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#1E4FA8]" />
          <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Data Administration</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900">Backup, Restore & Data Health</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
          Safeguard your website database. Export full JSON snapshots, restore anytime, or reset to verified seed data.
        </p>
      </div>

      {/* Main Operations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export Backup Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E4FA8] flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">Export Full JSON Backup</h3>
            <p className="text-xs text-slate-500">
              Downloads a timestamped JSON file containing all properties, RERA projects, home services, blog posts, leads, and CMS sections.
            </p>
          </div>
          <button
            onClick={handleExportBackup}
            className="w-full py-3 rounded-2xl bg-[#1E4FA8] hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Download className="w-4 h-4" /> Download Backup (.json)
          </button>
        </div>

        {/* Restore Backup Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">Restore from JSON File</h3>
            <p className="text-xs text-slate-500">
              Upload any previous Auricity backup file to instantly restore your entire website state and persist it across all visitors.
            </p>
          </div>
          <button
            disabled={restoring}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
          >
            <Upload className="w-4 h-4" /> {restoring ? 'Restoring…' : 'Select Backup File'}
          </button>
        </div>

        {/* Factory Reset Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">Reset to Factory Defaults</h3>
            <p className="text-xs text-slate-500">
              Clears customized overrides and restores initial verified Sambhajinagar properties, projects, and clean layout defaults.
            </p>
          </div>
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-black text-xs flex items-center justify-center gap-2 transition-all"
          >
            <ShieldAlert className="w-4 h-4" /> Factory Reset
          </button>
        </div>
      </div>

      {/* Database Breakdown & Item Count */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-600" /> Database Live Object Counts
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-bold">Properties</span>
            <span className="text-lg font-black text-slate-900">{allProperties.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-bold">Mega Projects</span>
            <span className="text-lg font-black text-slate-900">{projects.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-bold">Promotional Offers</span>
            <span className="text-lg font-black text-slate-900">{offers.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-bold">Verified Realtors</span>
            <span className="text-lg font-black text-slate-900">{realtors.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-bold">Banner Ads</span>
            <span className="text-lg font-black text-slate-900">{bannerAds.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-bold">Customer Leads</span>
            <span className="text-lg font-black text-slate-900">{leads.length}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-[140] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900">Are you absolutely sure?</h3>
              <p className="text-xs text-slate-500">
                This will reset all properties, projects, homepage layout, and settings to original defaults. We strongly recommend exporting a JSON backup first.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFactoryReset}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
