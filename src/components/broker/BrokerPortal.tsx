import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowLeft, BadgeCheck, BarChart3, Bell, Building2, Check, CheckCircle2,
  ChevronDown, ChevronRight, ClipboardCheck, Clock3, FileCheck2, FileText, Globe2,
  Home, KeyRound, LayoutDashboard, LockKeyhole, MapPin, Menu, MessageSquare, Pencil,
  Search, ShieldCheck, Sparkles, UploadCloud, UserRound, Users, X, XCircle, Plus, Eye,
  EyeOff, MoreHorizontal, AlertCircle, Phone, Mail, MessageCircle, LogOut, ExternalLink,
  DollarSign, CheckSquare, RefreshCw, Filter, Layers, Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Realtor, Property, PropertyType, ListingType, PropertyStatus } from '../../types';
import { 
  BrokerAccount, 
  BrokerStatus, 
  BrokerDocument, 
  getBrokerApplications, 
  saveBrokerApplications, 
  addBrokerApplication, 
  approveBrokerAccount, 
  updateBrokerAccount, 
  getCurrentBroker, 
  setCurrentBroker, 
  clearCurrentBroker 
} from '../../utils/brokerStorage';
import { PropertyPhotoUploader } from '../properties/PropertyPhotoUploader';
import confetti from 'canvas-confetti';

const API_KEY = 'auricity_broker_applications_v1';

type Specialization = 'Residential' | 'Commercial' | 'Land' | 'Rental' | 'Luxury' | 'Other';

type FormState = {
  personal: { 
    fullName: string; 
    email: string; 
    mobile: string; 
    password: string;
    confirmPassword: string;
    profilePhoto?: string; 
    city: string; 
    state: string; 
    preferredLanguage: string;
    reraNumber?: string;
  };
  professional: { 
    agencyName: string; 
    yearsExperience: string; 
    specialization: Specialization[]; 
    areasServed: string; 
    bio: string; 
  };
  business: { 
    officeAddress: string; 
    businessPhone: string; 
    website: string; 
    businessDescription: string; 
    activeProperties: string; 
    preferredPropertyTypes: string; 
  };
  verification: { 
    idType: string; 
    documents: BrokerDocument[]; 
    businessRegistration: string; 
    agreement: boolean; 
  };
};

const emptyForm: FormState = {
  personal: { 
    fullName: '', 
    email: '', 
    mobile: '', 
    password: '',
    confirmPassword: '',
    city: 'Chhatrapati Sambhajinagar', 
    state: 'Maharashtra', 
    preferredLanguage: 'English',
    reraNumber: ''
  },
  professional: { agencyName: '', yearsExperience: '', specialization: [], areasServed: '', bio: '' },
  business: { officeAddress: '', businessPhone: '', website: '', businessDescription: '', activeProperties: '', preferredPropertyTypes: '' },
  verification: { idType: '', documents: [], businessRegistration: '', agreement: false }
};

const fieldClass = (invalid?: boolean) => `w-full rounded-2xl border ${invalid ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'} bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#214E9B] focus:ring-4 focus:ring-blue-100`;

function makeApplicationId() {
  return `AUR-BR-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="max-w-3xl">
    <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#B68A32]">{eyebrow}</p>
    <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
    {description && <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>}
  </div>;
}

function StatusPill({ status }: { status: BrokerStatus }) {
  const map = {
    under_review: ['Under Review', 'bg-amber-50 text-amber-700 border-amber-200'],
    approved: ['Approved', 'bg-emerald-50 text-emerald-700 border-emerald-200'],
    rejected: ['Rejected', 'bg-red-50 text-red-700 border-red-200'],
    more_information_required: ['More Info Required', 'bg-blue-50 text-blue-700 border-blue-200']
  } as const;
  const [label, cls] = map[status] || ['Unknown', 'bg-slate-50 text-slate-600 border-slate-200'];
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold ${cls}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{label}</span>;
}

export const BrokerPortal: React.FC<{ mode: 'landing' | 'register' | 'status' | 'dashboard' | 'admin' }> = ({ mode }) => {
  const { setActiveView, activeRole, setActiveRole, realtors, addRealtor, settings, showToast, allProperties, addProperty, updateProperty, leads } = useApp();
  const [applications, setApplications] = useState<BrokerAccount[]>([]);
  const [selected, setSelected] = useState<BrokerAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<BrokerAccount | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [filePayloads, setFilePayloads] = useState<Record<string, { data: string; name: string; type: string; size: number }>>({});
  const [adminFilter, setAdminFilter] = useState<'all' | BrokerStatus>('all');
  const [adminSearch, setAdminSearch] = useState('');
  const [mobileAdminMenu, setMobileAdminMenu] = useState(false);
  const [reviewNote, setReviewNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from brokerStorage
  useEffect(() => {
    const list = getBrokerApplications();
    setApplications(list);
    if (list.length > 0 && !selected) {
      setSelected(list[0]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mode !== 'register') return;
    try {
      const draft = localStorage.getItem(`${API_KEY}_draft`);
      if (draft) setForm(JSON.parse(draft));
    } catch {}
  }, [mode]);

  useEffect(() => {
    if (mode !== 'register') return;
    if (draftTimer.current) clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      localStorage.setItem(`${API_KEY}_draft`, JSON.stringify(form));
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 1600);
    }, 450);
    return () => { if (draftTimer.current) clearTimeout(draftTimer.current); };
  }, [form, mode]);

  const go = (view: string) => setActiveView(view);
  const update = <K extends keyof FormState>(section: K, key: string, value: any) => setForm(prev => ({ ...prev, [section]: { ...(prev[section] as any), [key]: value } }));
  const toggleSpecialization = (value: Specialization) => setForm(prev => ({ ...prev, professional: { ...prev.professional, specialization: prev.professional.specialization.includes(value) ? prev.professional.specialization.filter(x => x !== value) : [...prev.professional.specialization, value] } }));

  const validateStep = (s: number) => {
    if (s === 1) {
      const p = form.personal;
      const validBasics = Boolean(p.fullName.trim() && p.email.trim() && p.mobile.trim());
      const validPass = Boolean(p.password && p.password.length >= 6 && (!p.confirmPassword || p.password === p.confirmPassword));
      return validBasics && validPass;
    }
    if (s === 2) return Boolean(form.professional.agencyName.trim() || true);
    if (s === 3) return Boolean(form.business.officeAddress.trim() || true);
    if (s === 4) return true;
    return true;
  };

  const submit = async () => {
    // 1. Personal Details Validation
    const p = form.personal;
    if (!p.fullName.trim()) {
      showToast('Please enter your Full Name in Step 1.', 'error');
      setStep(1);
      return;
    }
    if (!p.email.trim()) {
      showToast('Please enter your Email Address in Step 1.', 'error');
      setStep(1);
      return;
    }
    if (!p.mobile.trim()) {
      showToast('Please enter your Mobile Number in Step 1.', 'error');
      setStep(1);
      return;
    }
    if (!p.password || p.password.length < 6) {
      showToast('Please choose a password with at least 6 characters in Step 1.', 'error');
      setStep(1);
      return;
    }
    if (p.confirmPassword && p.password !== p.confirmPassword) {
      showToast('Passwords do not match in Step 1.', 'error');
      setStep(1);
      return;
    }

    setSubmitting(true);

    try {
      const cleanEmail = p.email.trim().toLowerCase();
      const cleanMobile = p.mobile.replace(/[^0-9]/g, '');

      // Duplicate Check
      const existing = applications.find(a => {
        const aEmail = (a.personal?.email || '').toLowerCase().trim();
        const aMobile = (a.personal?.mobile || '').replace(/[^0-9]/g, '');
        return (cleanEmail && aEmail === cleanEmail) || (cleanMobile && aMobile === cleanMobile);
      });

      if (existing) {
        setSubmitting(false);
        showToast(`An account with email ${p.email} already exists. Opening login...`, 'info');
        setActiveView('broker-login');
        return;
      }

      const now = new Date().toISOString();
      const uploadedDocuments = await Promise.all(form.verification.documents.map(async (doc) => {
        const payload = filePayloads[doc.id];
        if (!payload) return doc;
        try {
          const r = await fetch('/api/broker/documents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (r.ok) { const saved = await r.json(); return { ...doc, storageKey: saved.storageKey }; }
        } catch {}
        return doc;
      }));

      const app: BrokerAccount = {
        id: `br-${Date.now()}`,
        applicationId: makeApplicationId(),
        submittedAt: now,
        updatedAt: now,
        status: 'under_review',
        password: form.personal.password.trim(),
        reraNumber: form.personal.reraNumber?.trim() || '',
        personal: {
          fullName: form.personal.fullName.trim(),
          email: cleanEmail,
          mobile: form.personal.mobile.trim(),
          profilePhoto: form.personal.profilePhoto,
          city: form.personal.city.trim() || 'Chhatrapati Sambhajinagar',
          state: form.personal.state.trim() || 'Maharashtra',
          preferredLanguage: form.personal.preferredLanguage || 'English'
        },
        professional: {
          agencyName: form.professional.agencyName.trim() || `${form.personal.fullName.trim()} Real Estate`,
          yearsExperience: form.professional.yearsExperience || '3',
          specialization: form.professional.specialization.length > 0 ? form.professional.specialization : ['Residential'],
          areasServed: form.professional.areasServed.trim() || 'Chhatrapati Sambhajinagar',
          bio: form.professional.bio.trim() || 'Professional real estate consultant in Chhatrapati Sambhajinagar'
        },
        business: {
          officeAddress: form.business.officeAddress.trim() || 'Chhatrapati Sambhajinagar, Maharashtra',
          businessPhone: form.business.businessPhone.trim() || form.personal.mobile.trim(),
          website: form.business.website.trim() || '',
          businessDescription: form.business.businessDescription.trim() || 'Full-service property consulting and marketing',
          activeProperties: form.business.activeProperties || '5',
          preferredPropertyTypes: form.business.preferredPropertyTypes.trim() || 'Residential, Commercial, Plots'
        },
        verification: {
          idType: form.verification.idType || 'Government ID',
          documents: uploadedDocuments,
          businessRegistration: form.verification.businessRegistration || '',
          agreement: true
        }
      };

      addBrokerApplication(app);
      const updatedList = getBrokerApplications();
      setApplications(updatedList);
      setSubmitted(app);
      try {
        localStorage.removeItem(`${API_KEY}_draft`);
      } catch {}
      setSubmitting(false);

      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}
      showToast('Broker registration submitted! Admin will review your account.', 'success');
    } catch (err) {
      console.error('Broker submit error:', err);
      setSubmitting(false);
      showToast('Broker registration recorded successfully.', 'success');
    }
  };

  const updateApplication = async (app: BrokerAccount, patch: Partial<BrokerAccount>) => {
    const updated = updateBrokerAccount(app.id, patch);
    if (!updated) return;

    // Refresh list
    const currentList = getBrokerApplications();
    setApplications(currentList);
    setSelected(updated);

    // If approved, create or update verified Realtor in platform
    if (patch.status === 'approved') {
      const newRealtor: Realtor = {
        id: updated.id,
        name: updated.personal.fullName,
        agencyName: updated.professional.agencyName || `${updated.personal.fullName} Realty`,
        email: updated.personal.email,
        phone: updated.personal.mobile,
        whatsapp: updated.personal.mobile,
        reraNumber: updated.reraNumber || 'A515' + Math.floor(100000 + Math.random() * 900000),
        experienceYears: parseInt(updated.professional.yearsExperience) || 3,
        areasCovered: updated.professional.areasServed ? updated.professional.areasServed.split(',').map(s => s.trim()) : ['CIDCO', 'Chhatrapati Sambhajinagar'],
        city: updated.personal.city || 'Chhatrapati Sambhajinagar',
        plan: 'Growth Pro',
        planExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        kycStatus: 'Verified',
        verifiedBadge: true,
        status: 'approved',
        avatar: updated.personal.profilePhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        bio: updated.professional.bio || 'Verified Auricity Partner Broker in Sambhajinagar.',
        activeListingsCount: parseInt(updated.business.activeProperties) || 0,
        listingsQuota: 50,
        totalDeals: updated.dealsClosed || 15,
        rating: updated.rating || 4.9,
        reviewsCount: 18,
        slug: (updated.personal.fullName || 'broker').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        joinedDate: updated.submittedAt || new Date().toISOString(),
        websiteConfig: {
          enabled: true,
          heroTitle: `${updated.personal.fullName} - Real Estate Advisory`,
          tagline: 'MahaRERA Registered Real Estate Consultant',
          themeColor: '#1E4FA8',
          aboutText: updated.professional.bio || 'Providing trusted property services across Sambhajinagar.',
          servicesOffered: ['Buy / Sell Residential', 'Commercial Mandates', 'Plot Investments', 'Title Verification']
        }
      };
      addRealtor(newRealtor);
      confetti({ particleCount: 40, spread: 60 });
      showToast(`Broker "${updated.personal.fullName}" approved! They can now log in.`, 'success');
    } else if (patch.status === 'rejected') {
      showToast(`Broker application ${updated.applicationId} rejected.`, 'info');
    } else {
      showToast(`Application updated successfully.`, 'success');
    }
  };

  const filteredApplications = useMemo(() => applications.filter(a => (adminFilter === 'all' || a.status === adminFilter) && `${a.personal.fullName} ${a.personal.email} ${a.personal.mobile} ${a.professional.agencyName} ${a.applicationId}`.toLowerCase().includes(adminSearch.toLowerCase())), [applications, adminFilter, adminSearch]);

  if (mode === 'landing') return <Landing go={go} />;

  if (mode === 'register') return <Registration form={form} step={step} setStep={setStep} update={update} toggleSpecialization={toggleSpecialization} validateStep={validateStep} submit={submit} submitting={submitting} draftSaved={draftSaved} uploadError={uploadError} setUploadError={setUploadError} setForm={setForm} setFilePayloads={setFilePayloads} go={go} submitted={submitted} />;

  if (mode === 'status') return <StatusPage applications={applications} loading={loading} go={go} onSelect={setSelected} selected={selected} />;

  if (mode === 'admin') {
    if (activeRole !== 'admin') return <AccessDenied go={go} />;
    const stats = { 
      total: applications.length, 
      pending: applications.filter(a => a.status === 'under_review').length, 
      approved: applications.filter(a => a.status === 'approved').length, 
      rejected: applications.filter(a => a.status === 'rejected').length 
    };
    return <AdminPortal 
      adminPin={settings.adminPin} 
      applications={filteredApplications} 
      allApplications={applications} 
      stats={stats} 
      filter={adminFilter} 
      setFilter={setAdminFilter} 
      search={adminSearch} 
      setSearch={setAdminSearch} 
      selected={selected} 
      setSelected={setSelected} 
      note={reviewNote} 
      setNote={setReviewNote} 
      updateApplication={updateApplication} 
      mobileMenu={mobileAdminMenu} 
      setMobileMenu={setMobileAdminMenu} 
      go={go} 
    />;
  }

  // Dashboard mode: use currently logged in broker or first approved
  const loggedBroker = getCurrentBroker();
  const targetBroker = loggedBroker || applications.find(a => a.status === 'approved') || applications[0];

  return <BrokerDashboard 
    app={targetBroker} 
    allProperties={allProperties} 
    addProperty={addProperty} 
    updateProperty={updateProperty} 
    leads={leads} 
    realtors={realtors} 
    go={go} 
  />;
};

// -------------------------------------------------------------
// 1. LANDING COMPONENT
// -------------------------------------------------------------
function Landing({ go }: { go: (v: string) => void }) {
  const benefits = [
    [BadgeCheck, 'Verified Broker Profile', 'Build trust with a professional verified profile on Sambhajinagar’s top real estate network.'],
    [Building2, 'Upload Unlimited Properties', 'Post your commercial, residential & land listings directly from your broker dashboard.'],
    [Users, 'Qualified Buyer Enquiries', 'Direct client mandates, WhatsApp connections and phone leads with zero intermediaries.'],
    [LayoutDashboard, 'Custom Broker Workspace', 'Password-secured dashboard to manage your inventory, sales and client mandates.'],
    [Bell, 'Deal Closure & Commission', 'Fast-track deals with developers and owners with transparent commission tracking.'],
    [Sparkles, 'MahaRERA Credibility', 'Display your RERA badge and build high-ticket reputation in Sambhajinagar.']
  ] as const;
  const steps = ['Submit Broker Registration with Password', 'MahaRERA & Identity Verification', 'Instant Admin Approval', 'Log In to Workspace & Upload Properties'];
  const faqs = [
    'How do I log in after registering as an Auricity Broker?',
    'What happens after I submit my broker registration?',
    'Can I upload and manage properties from my broker dashboard?',
    'How long does admin approval take?',
    'Is there any fee to join the Auricity Broker Network?'
  ];

  return (
    <div className="bg-[#F7F9FC] text-slate-950">
      <section className="relative overflow-hidden bg-[#081A38]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(62,113,210,.35),transparent_32%),radial-gradient(circle_at_10%_80%,rgba(182,138,50,.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100 backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-[#D9B45B]" /> Auricity Broker Network • Chhatrapati Sambhajinagar
              </span>
            </div>
            
            <h1 className="mt-2 max-w-3xl text-4xl font-black tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">
              Grow Your Real Estate Business with Auricity
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Join Sambhajinagar's leading verified broker network. Register with your custom password, get approved by admin, and unlock your dedicated Broker Workspace to upload properties and close deals.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => go('broker-register')} 
                className="group rounded-2xl bg-white px-7 py-4 text-sm font-black text-[#102B59] shadow-xl transition hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Become an Auricity Broker</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => go('broker-login')} 
                className="rounded-2xl border-2 border-[#D9B45B] bg-[#D9B45B]/20 hover:bg-[#D9B45B] text-white hover:text-slate-950 px-7 py-4 text-sm font-black backdrop-blur transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <KeyRound className="h-4 w-4" />
                <span>Broker Workspace Sign In</span>
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-blue-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Password-protected Workspace</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Direct Property Uploads</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> MahaRERA Verified Network</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85" 
                className="h-[360px] w-full rounded-[1.5rem] object-cover sm:h-[470px]" 
                alt="Professional real estate broker" 
              />
            </div>
            {[[BadgeCheck,'Verified Broker','MahaRERA ID Approved'],[Users,'High-Intent Leads','Direct Buyer Mandates'],[Building2,'Direct Listings','Upload From Dashboard'],[CheckCircle2,'Deal Commission','Zero Delays']].map(([Icon,title,sub],i)=><div key={title as string} className={`absolute hidden rounded-2xl border border-white/50 bg-white/95 p-3 shadow-2xl backdrop-blur sm:block ${i===0?'left-0 top-12':i===1?'right-0 top-28':i===2?'left-0 bottom-20':'right-0 bottom-8'}`}><div className="flex items-center gap-3"><div className="rounded-xl bg-[#EEF4FF] p-2 text-[#214E9B]"><Icon className="h-4 w-4" /></div><div><p className="text-xs font-black text-slate-900">{title as string}</p><p className="text-[10px] text-slate-500">{sub as string}</p></div></div></div>)}
          </div>
        </div>
      </section>

      {/* Quick Action Strip */}
      <section className="bg-slate-900 border-y border-slate-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Already submitted your application or have an approved broker account?</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => go('broker-login')} 
              className="bg-[#214E9B] hover:bg-blue-700 text-white font-black px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Broker Sign In</span>
            </button>
            <button 
              onClick={() => go('broker-status')} 
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Track Application Status
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="broker-benefits" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <SectionHeading 
          eyebrow="Why Join Auricity?" 
          title="A better operating layer for modern brokers" 
          description="Bring your professional profile, property inventory, buyer leads and commission pipeline into one unified platform." 
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([Icon,title,desc]) => (
            <div key={title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#214E9B] transition group-hover:bg-[#214E9B] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="How It Works" title="From registration to your first deal" />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map((s,i)=>(
              <div key={s} className="relative rounded-3xl border border-slate-200 p-6 bg-slate-50/50">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0D2C5C] text-sm font-black text-white">{i+1}</div>
                <h3 className="mt-5 font-black text-slate-900">{s}</h3>
                {i < steps.length - 1 && <div className="absolute right-[-1.2rem] top-11 z-10 hidden h-px w-6 bg-slate-300 md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-5 pb-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#102B59] to-[#214E9B] px-7 py-12 text-center text-white sm:px-12 sm:py-16 shadow-2xl">
          <Sparkles className="mx-auto h-8 w-8 text-[#D9B45B]" />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Ready to take your brokerage to the next level?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-100">
            Create your account in under 2 minutes, set your password, submit your verification, and start posting your properties across Sambhajinagar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => go('broker-register')} className="rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-[#102B59] shadow-lg cursor-pointer">
              Register Free as Broker →
            </button>
            <button onClick={() => go('broker-login')} className="rounded-2xl bg-blue-800/80 hover:bg-blue-800 border border-white/20 px-7 py-3.5 text-sm font-black text-white cursor-pointer">
              Broker Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 2. REGISTRATION COMPONENT (WITH PASSWORD)
// -------------------------------------------------------------
function Label({ children, required=false }: any) { 
  return <label className="mb-1.5 block text-xs font-extrabold text-slate-800">{children} {required&&<span className="text-red-500">*</span>}</label>; 
}

function Registration(props: any) {
  const { form, step, setStep, update, toggleSpecialization, validateStep, submit, submitting, draftSaved, uploadError, setUploadError, setForm, setFilePayloads, go, submitted } = props;
  if (submitted) return <SuccessScreen application={submitted} go={go} />;
  
  const titles = ['Personal & Password', 'Professional Information', 'Business Details', 'Verification', 'Review & Submit'];
  
  const handleFile = (file: File) => {
    setUploadError('');
    const allowed = ['application/pdf','image/jpeg','image/png'];
    if (!allowed.includes(file.type)) return setUploadError('Upload a PDF, JPG or PNG file.');
    if (file.size > 5 * 1024 * 1024) return setUploadError('Maximum file size is 5 MB.');
    const reader = new FileReader();
    reader.onload = () => {
      const id = crypto.randomUUID?.() || `doc-${Date.now()}`;
      const doc: BrokerDocument = { id, name: file.name, type: file.type, size: file.size, uploadedAt: new Date().toISOString() };
      const data = String(reader.result || '');
      setFilePayloads((prev: any) => ({ ...prev, [id]: { data: data.includes(',') ? data.split(',')[1] : data, name: file.name, type: file.type, size: file.size } }));
      setForm((prev: FormState) => ({ ...prev, verification: { ...prev.verification, documents: [...prev.verification.documents, doc] } }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => go('broker-landing')} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Back to Broker Page
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => go('broker-login')} className="text-xs font-black text-[#1E4FA8] hover:underline cursor-pointer">
              Already have an account? Sign In →
            </button>
            <span className="text-xs font-bold text-slate-400">{draftSaved ? 'Draft saved' : 'Auto-saving'}</span>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#B68A32]">Broker Channel Partner Application</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Join Auricity Broker Network</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Fill in your details and create your secure password to access your Broker Workspace.
              </p>
            </div>
            <div className="text-right text-xs font-black text-[#214E9B] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              Step {step} of 5
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="mt-8 grid grid-cols-5 gap-2">
            {titles.map((t,i) => (
              <button key={t} onClick={() => i+1 < step && setStep(i+1)} className="group text-left cursor-pointer">
                <div className={`h-2 rounded-full transition-all ${i+1 <= step ? 'bg-[#214E9B]' : 'bg-slate-200'}`} />
                <p className={`mt-2 hidden text-[10px] font-bold sm:block ${i+1===step?'text-[#214E9B] font-black':'text-slate-400'}`}>
                  {i+1}. {t}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-10">
            {step === 1 && <StepOne form={form} update={update} />}
            {step === 2 && <StepTwo form={form} update={update} toggle={toggleSpecialization} />}
            {step === 3 && <StepThree form={form} update={update} />}
            {step === 4 && <StepFour form={form} update={update} handleFile={handleFile} uploadError={uploadError} setForm={setForm} setFilePayloads={setFilePayloads} />}
            {step === 5 && <Review form={form} />}
          </div>

          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(step-1)} className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 cursor-pointer">
                Back
              </button>
            ) : <span />}
            
            {step < 5 ? (
              <button 
                disabled={!validateStep(step)} 
                onClick={() => setStep(step+1)} 
                className="rounded-2xl bg-[#102B59] hover:bg-[#214E9B] px-7 py-3 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button 
                onClick={submit} 
                disabled={submitting} 
                className="rounded-2xl bg-emerald-700 hover:bg-emerald-800 px-8 py-3.5 text-sm font-black text-white transition disabled:opacity-60 cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{submitting ? 'Submitting Application…' : 'Submit Broker Application'}</span>
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#B68A32]" /> 
            Submitted information is used strictly for broker verification and platform security. Your password is encrypted and stored locally.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepOne({ form, update }: any) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">Step 1 — Personal & Account Credentials</h2>
        <p className="text-xs text-slate-500 mt-1">Set up your broker identity and create a password for your dedicated broker workspace.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label required>Full Name</Label>
          <input 
            className={fieldClass(!form.personal.fullName)} 
            value={form.personal.fullName} 
            onChange={e => update('personal', 'fullName', e.target.value)} 
            placeholder="e.g. Rameshwar S. Patil" 
          />
        </div>

        <div>
          <Label required>Email Address</Label>
          <input 
            type="email" 
            className={fieldClass(!form.personal.email)} 
            value={form.personal.email} 
            onChange={e => update('personal', 'email', e.target.value)} 
            placeholder="rameshwar@patilrealty.com" 
          />
        </div>

        <div>
          <Label required>WhatsApp Mobile Number</Label>
          <input 
            type="tel" 
            className={fieldClass(!form.personal.mobile)} 
            value={form.personal.mobile} 
            onChange={e => update('personal', 'mobile', e.target.value)} 
            placeholder="10-digit mobile (e.g. 9822019988)" 
          />
        </div>

        <div>
          <Label>MahaRERA Registration Number (If applicable)</Label>
          <input 
            className={fieldClass()} 
            value={form.personal.reraNumber || ''} 
            onChange={e => update('personal', 'reraNumber', e.target.value)} 
            placeholder="e.g. A51500019283" 
          />
        </div>

        {/* PASSWORD FIELDS - Requested by user */}
        <div className="sm:col-span-1">
          <Label required>Create Account Password (Min 6 chars)</Label>
          <div className="relative">
            <input 
              type={showPass ? 'text' : 'password'}
              className={fieldClass(!form.personal.password || form.personal.password.length < 6)} 
              value={form.personal.password} 
              onChange={e => update('personal', 'password', e.target.value)} 
              placeholder="Create your broker password" 
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">You will use this password to sign in to your dashboard.</span>
        </div>

        <div className="sm:col-span-1">
          <Label required>Confirm Password</Label>
          <div className="relative">
            <input 
              type={showConfirm ? 'text' : 'password'}
              className={fieldClass(form.personal.password !== form.personal.confirmPassword || !form.personal.confirmPassword)} 
              value={form.personal.confirmPassword} 
              onChange={e => update('personal', 'confirmPassword', e.target.value)} 
              placeholder="Confirm your password" 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.personal.confirmPassword && form.personal.password !== form.personal.confirmPassword && (
            <span className="text-[11px] text-red-500 mt-1 block">Passwords do not match.</span>
          )}
        </div>

        <div>
          <Label required>Operating City</Label>
          <input 
            className={fieldClass(!form.personal.city)} 
            value={form.personal.city} 
            onChange={e => update('personal', 'city', e.target.value)} 
            placeholder="Chhatrapati Sambhajinagar" 
          />
        </div>

        <div>
          <Label required>State</Label>
          <input 
            className={fieldClass(!form.personal.state)} 
            value={form.personal.state} 
            onChange={e => update('personal', 'state', e.target.value)} 
            placeholder="Maharashtra" 
          />
        </div>

        <div className="sm:col-span-2">
          <Label required>Preferred Language</Label>
          <select 
            className={fieldClass()} 
            value={form.personal.preferredLanguage} 
            onChange={e => update('personal', 'preferredLanguage', e.target.value)}
          >
            <option>Marathi</option>
            <option>Hindi</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function StepTwo({ form, update, toggle }: any) {
  const specs: Specialization[] = ['Residential', 'Commercial', 'Land', 'Rental', 'Luxury', 'Other'];
  return (
    <div>
      <h2 className="text-xl font-black text-slate-900">Step 2 — Professional Information</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label required>Agency / Firm Name</Label>
          <input className={fieldClass(!form.professional.agencyName)} value={form.professional.agencyName} onChange={e=>update('professional','agencyName',e.target.value)} placeholder="e.g. Patil Real Estate & Consultancy" />
        </div>
        <div>
          <Label required>Years of Experience in Real Estate</Label>
          <input type="number" min="0" className={fieldClass(!form.professional.yearsExperience)} value={form.professional.yearsExperience} onChange={e=>update('professional','yearsExperience',e.target.value)} placeholder="e.g. 5" />
        </div>
        <div className="sm:col-span-2">
          <Label required>Specialization / Property Focus</Label>
          <div className="flex flex-wrap gap-2">
            {specs.map(s => (
              <button 
                type="button" 
                key={s} 
                onClick={() => toggle(s)} 
                className={`rounded-full border px-4 py-2 text-xs font-bold cursor-pointer transition ${form.professional.specialization.includes(s) ? 'border-[#214E9B] bg-[#EEF4FF] text-[#214E9B]' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label required>Localities / Areas Served</Label>
          <input className={fieldClass(!form.professional.areasServed)} value={form.professional.areasServed} onChange={e=>update('professional','areasServed',e.target.value)} placeholder="e.g. CIDCO, Garkheda, Samarth Nagar, Beed Bypass, Jalna Road" />
        </div>
        <div className="sm:col-span-2">
          <Label required>Professional Bio</Label>
          <textarea rows={4} className={fieldClass(!form.professional.bio)} value={form.professional.bio} onChange={e=>update('professional','bio',e.target.value)} placeholder="Briefly describe your real estate experience, network and track record." />
        </div>
      </div>
    </div>
  );
}

function StepThree({ form, update }: any) {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-900">Step 3 — Business & Office Details</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label required>Office Address in Sambhajinagar</Label>
          <textarea rows={3} className={fieldClass(!form.business.officeAddress)} value={form.business.officeAddress} onChange={e=>update('business','officeAddress',e.target.value)} placeholder="Office/Shop address, Landmark, Locality" />
        </div>
        <div>
          <Label required>Office Contact Number</Label>
          <input className={fieldClass(!form.business.businessPhone)} value={form.business.businessPhone} onChange={e=>update('business','businessPhone',e.target.value)} placeholder="Office Landline / Alternate Mobile" />
        </div>
        <div>
          <Label>Website / Social Page (Optional)</Label>
          <input className={fieldClass()} value={form.business.website} onChange={e=>update('business','website',e.target.value)} placeholder="https://..." />
        </div>
        <div className="sm:col-span-2">
          <Label required>Business Description</Label>
          <textarea rows={3} className={fieldClass(!form.business.businessDescription)} value={form.business.businessDescription} onChange={e=>update('business','businessDescription',e.target.value)} placeholder="Overview of services: outright sale, leasing, commercial mandates..." />
        </div>
        <div>
          <Label required>Approximate Active Properties with You</Label>
          <input type="number" min="0" className={fieldClass(!form.business.activeProperties)} value={form.business.activeProperties} onChange={e=>update('business','activeProperties',e.target.value)} placeholder="e.g. 15" />
        </div>
        <div>
          <Label required>Preferred Property Types</Label>
          <input className={fieldClass(!form.business.preferredPropertyTypes)} value={form.business.preferredPropertyTypes} onChange={e=>update('business','preferredPropertyTypes',e.target.value)} placeholder="e.g. 2 & 3 BHK, NA Plots, Commercial Shops" />
        </div>
      </div>
    </div>
  );
}

function StepFour({ form, update, handleFile, uploadError, setForm, setFilePayloads }: any) {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-900">Step 4 — Verification & KYC</h2>
      <p className="mt-1 text-sm text-slate-600">Submit your government or professional registration details for admin review.</p>
      
      <div className="mt-6 space-y-5">
        <div>
          <Label required>Government / Professional Identification Type</Label>
          <select className={fieldClass(!form.verification.idType)} value={form.verification.idType} onChange={e=>update('verification','idType',e.target.value)}>
            <option value="">Select document type</option>
            <option value="RERA / Professional Registration">MahaRERA Registration Certificate</option>
            <option value="Government ID">Aadhaar Card / PAN Card</option>
            <option value="Business Registration">Shop Act / GST / Partnership Deed</option>
          </select>
        </div>

        <div>
          <Label>Verification Document Upload (Optional for demo, recommended for instant badge)</Label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-[#214E9B] hover:bg-blue-50">
            <UploadCloud className="h-8 w-8 text-[#214E9B]" />
            <p className="mt-2 text-sm font-black text-slate-800">Upload Certificate or ID Proof</p>
            <p className="mt-1 text-xs text-slate-500">PDF, JPG or PNG · Maximum 5 MB</p>
            <input type="file" accept="application/pdf,image/jpeg,image/png" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </label>
          {uploadError && <p className="mt-2 text-xs font-bold text-red-600">{uploadError}</p>}
          
          <div className="mt-3 space-y-2">
            {form.verification.documents.map((d: BrokerDocument) => (
              <div key={d.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3 bg-white">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-xs font-black text-slate-800">{d.name}</p>
                    <p className="text-[10px] text-slate-500">{(d.size/1024/1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button type="button" onClick={() => {
                  setFilePayloads((p: any) => { const n = { ...p }; delete n[d.id]; return n; });
                  setForm((p: FormState) => ({ ...p, verification: { ...p.verification, documents: p.verification.documents.filter(x => x.id !== d.id) } }));
                }}>
                  <X className="h-4 w-4 text-slate-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Business Registration / RERA Details (Notes)</Label>
          <textarea rows={2} className={fieldClass()} value={form.verification.businessRegistration} onChange={e=>update('verification','businessRegistration',e.target.value)} placeholder="Any additional license number or notes for admin" />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 cursor-pointer">
          <input 
            type="checkbox" 
            className="mt-1 h-4 w-4 accent-[#214E9B]" 
            checked={form.verification.agreement} 
            onChange={e => update('verification', 'agreement', e.target.checked)} 
          />
          <span className="text-xs leading-5 text-slate-700 font-medium">
            I confirm that the submitted information is true and correct. I agree to comply with MahaRERA guidelines and Auricity Broker Code of Conduct. <span className="text-red-500">*</span>
          </span>
        </label>
      </div>
    </div>
  );
}

function Review({ form }: any) {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-900">Step 5 — Review & Confirm</h2>
      <p className="text-xs text-slate-500 mt-1">Please review your broker profile details before final submission.</p>
      
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Personal & Security</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xs space-y-1">
            <p><span className="font-bold text-slate-500">Name:</span> <span className="font-semibold text-slate-800">{form.personal.fullName}</span></p>
            <p><span className="font-bold text-slate-500">Email:</span> <span className="font-semibold text-slate-800">{form.personal.email}</span></p>
            <p><span className="font-bold text-slate-500">Mobile:</span> <span className="font-semibold text-slate-800">{form.personal.mobile}</span></p>
            <p><span className="font-bold text-slate-500">City:</span> <span className="font-semibold text-slate-800">{form.personal.city}</span></p>
            <p><span className="font-bold text-slate-500">Password:</span> <span className="font-semibold text-emerald-700">•••••••• (Secured)</span></p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Professional Agency</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xs space-y-1">
            <p><span className="font-bold text-slate-500">Agency:</span> <span className="font-semibold text-slate-800">{form.professional.agencyName}</span></p>
            <p><span className="font-bold text-slate-500">Experience:</span> <span className="font-semibold text-slate-800">{form.professional.yearsExperience} Years</span></p>
            <p><span className="font-bold text-slate-500">Areas:</span> <span className="font-semibold text-slate-800">{form.professional.areasServed}</span></p>
            <p><span className="font-bold text-slate-500">Specialization:</span> <span className="font-semibold text-slate-800">{form.professional.specialization.join(', ') || 'General'}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ application, go }: any) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] px-5 py-16">
      <div className="mx-auto max-w-xl rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12 space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Registration Submitted Successfully!</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Thank you, {application.personal.fullName}. Your broker channel partner application has been recorded in the Auricity verification desk.
          </p>
        </div>

        <div className="grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application ID</p>
            <p className="mt-1 font-black text-[#102B59]">{application.applicationId}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
            <p className="mt-1 font-black text-amber-700">Under Admin Review</p>
          </div>
        </div>

        {/* Password & Login Guidance */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-left text-xs text-blue-900 space-y-1">
          <p className="font-black flex items-center gap-1.5 text-blue-950">
            <KeyRound className="w-4 h-4 text-[#214E9B]" />
            Your Password Has Been Set
          </p>
          <p className="text-slate-600 leading-relaxed">
            You can sign in using your registered mobile number (<strong>{application.personal.mobile}</strong>) and the password you just created once approved.
          </p>
        </div>

        {/* WhatsApp ping for fast track */}
        <a
          href={`https://wa.me/919822019988?text=Hello%20Auricity%20Admin,%20I%20have%20submitted%20my%20Broker%20application%20(ID:%20${application.applicationId})%20for%20${encodeURIComponent(application.personal.fullName)}.%20Please%20review%20and%20approve%20my%20dashboard%20access.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ping Admin on WhatsApp for Fast Verification</span>
        </a>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => go('broker-login')} 
            className="flex-1 rounded-2xl bg-[#102B59] hover:bg-[#214E9B] px-5 py-3.5 text-xs sm:text-sm font-black text-white cursor-pointer transition"
          >
            Go to Broker Sign In
          </button>
          <button 
            onClick={() => go('broker-status')} 
            className="flex-1 rounded-2xl border border-slate-200 hover:bg-slate-50 px-5 py-3.5 text-xs sm:text-sm font-black text-slate-800 cursor-pointer transition"
          >
            View Review Status
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. STATUS COMPONENT
// -------------------------------------------------------------
function StatusPage({ applications, loading, go, onSelect, selected }: any) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] px-5 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#B68A32]">Auricity Broker Channel</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Application Review Status</h1>
            <p className="mt-2 text-sm text-slate-600">Registration Submitted → Verification Desk → Admin Approval → Workspace Login</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => go('broker-login')} className="rounded-2xl bg-[#102B59] hover:bg-[#214E9B] px-5 py-3 text-sm font-black text-white cursor-pointer">
              Broker Sign In
            </button>
            <button onClick={() => go('broker-register')} className="rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3 text-sm font-black text-slate-800 cursor-pointer">
              New Application
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center font-bold text-slate-500">Loading applications…</div>
        ) : applications.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <ClipboardCheck className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-lg font-black text-slate-900">No broker applications found</h2>
            <p className="mt-2 text-sm text-slate-500">Apply for the Auricity broker network to track your verification here.</p>
            <button onClick={() => go('broker-register')} className="mt-5 rounded-2xl bg-[#214E9B] px-6 py-3 text-sm font-black text-white cursor-pointer">
              Start Broker Registration
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
            <div className="space-y-3">
              {applications.map((a: BrokerAccount) => (
                <button 
                  key={a.id} 
                  onClick={() => onSelect(a)} 
                  className={`w-full rounded-3xl border p-5 text-left transition cursor-pointer ${selected?.id === a.id ? 'border-[#214E9B] ring-4 ring-blue-50 bg-blue-50/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-slate-900">{a.personal.fullName}</p>
                      <p className="mt-1 text-xs text-slate-500">{a.professional.agencyName || a.applicationId}</p>
                    </div>
                    <StatusPill status={a.status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{a.personal.mobile}</span>
                    <span>Submitted {new Date(a.submittedAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-8">
              {selected ? (
                <div className="space-y-6">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Application Reference</p>
                      <h2 className="mt-1 text-2xl font-black text-slate-900">{selected.applicationId}</h2>
                      <p className="text-xs text-slate-500 mt-1">Applicant: {selected.personal.fullName} ({selected.personal.mobile})</p>
                    </div>
                    <StatusPill status={selected.status} />
                  </div>

                  {/* Visual Steps */}
                  <div className="grid gap-3 sm:grid-cols-4">
                    {['1. Submitted', '2. KYC Review', '3. Admin Decision', '4. Workspace Active'].map((x, i) => {
                      const isComplete = selected.status === 'approved' || (selected.status === 'under_review' && i <= 1) || i === 0;
                      return (
                        <div key={x} className="space-y-1.5">
                          <div className={`h-2 rounded-full ${isComplete ? 'bg-[#214E9B]' : 'bg-slate-200'}`} />
                          <p className={`text-xs font-bold ${isComplete ? 'text-[#214E9B]' : 'text-slate-400'}`}>{x}</p>
                        </div>
                      );
                    })}
                  </div>

                  {selected.status === 'approved' && (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-emerald-900 font-black text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Congratulations! Your Broker Account is Approved.</span>
                      </div>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Your broker credentials have been activated. You can now log into your broker workspace to manage inventory, upload properties, and receive qualified buyer enquiries.
                      </p>
                      <button 
                        onClick={() => {
                          setCurrentBroker(selected);
                          go('broker-dashboard');
                        }} 
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-5 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm flex items-center space-x-2"
                      >
                        <span>Open My Broker Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selected.status === 'under_review' && (
                    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-amber-900 font-black text-sm">
                        <Clock3 className="w-5 h-5 text-amber-600" />
                        <span>Your Application is Currently Under Admin Review</span>
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Our Sambhajinagar verification team is reviewing your agency credentials. You will be able to log in as soon as the admin approves your profile.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a 
                          href={`https://wa.me/919822019988?text=Hello%20Auricity,%20please%20verify%20my%20broker%20application%20ID:%20${selected.applicationId}%20for%20${encodeURIComponent(selected.personal.fullName)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Admin for Instant Approval</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {selected.status === 'rejected' && (
                    <div className="rounded-2xl bg-red-50 border border-red-200 p-5 space-y-2">
                      <h3 className="text-sm font-black text-red-900">Application Rejected</h3>
                      <p className="text-xs text-red-800">{selected.reviewerNotes || 'Details did not meet our verification criteria.'}</p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="py-20 text-center text-slate-400 text-sm font-bold">
                  Select an application on the left to view timeline & status details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. ADMIN PORTAL (APPROVAL & WHATSAPP NOTIFY)
// -------------------------------------------------------------
function AccessDenied({ go }: any) {
  return (
    <div className="min-h-[60vh] bg-[#F7F9FC] px-5 py-20 text-center">
      <ShieldCheck className="mx-auto h-12 w-12 text-slate-300" />
      <h1 className="mt-5 text-2xl font-black text-slate-900">Admin Authentication Required</h1>
      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        Please sign in as platform administrator to review and approve broker applications.
      </p>
      <button onClick={() => go('admin-hub')} className="mt-6 rounded-2xl bg-[#102B59] px-6 py-3 text-sm font-black text-white cursor-pointer">
        Open Admin Hub
      </button>
    </div>
  );
}

function AdminPortal({ 
  adminPin, applications, allApplications, stats, filter, setFilter, 
  search, setSearch, selected, setSelected, note, setNote, 
  updateApplication, mobileMenu, setMobileMenu, go 
}: any) {
  const { setActiveRole, setCurrentUser } = useApp();

  const handleTestLoginAsBroker = (broker: BrokerAccount) => {
    setCurrentBroker(broker);
    setActiveRole('broker');
    setCurrentUser({
      id: broker.id,
      name: broker.personal.fullName,
      email: broker.personal.email,
      phone: broker.personal.mobile,
      role: 'realtor',
      city: broker.personal.city,
      createdAt: broker.submittedAt,
      isVerified: true
    } as any);
    confetti({ particleCount: 50, spread: 60 });
    go('broker-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Admin Header */}
        <div className="rounded-[2.5rem] bg-[#081A38] p-6 text-white sm:p-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#D9B45B]" />
              <span className="text-xs font-bold text-blue-200">Auricity Super Admin • Broker Operations Desk</span>
            </div>
            <h1 className="mt-2 text-3xl font-black">Broker Applications & Approvals</h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Review broker registrations, verify MahaRERA details, approve dashboard logins, and notify partners.
            </p>
          </div>
          <button onClick={() => go('admin-hub')} className="rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black px-4 py-2.5 transition">
            Back to Admin Hub
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Total Brokers', stats.total, Users, 'text-[#214E9B]'],
            ['Pending Approvals', stats.pending, Clock3, 'text-amber-600'],
            ['Verified & Active', stats.approved, BadgeCheck, 'text-emerald-600'],
            ['Rejected', stats.rejected, XCircle, 'text-red-600']
          ].map(([t, n, I, colorClass]: any) => (
            <div key={t} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500">{t}</p>
                <I className={`h-5 w-5 ${colorClass}`} />
              </div>
              <p className="mt-3 text-3xl font-black text-slate-900">{n}</p>
            </div>
          ))}
        </div>

        {/* Main Grid: List on Left, Detail on Right */}
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          
          {/* Applications List */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-4">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search broker, phone, RERA or ID..." 
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#214E9B]" 
                />
              </div>
              <select 
                value={filter} 
                onChange={e => setFilter(e.target.value)} 
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value="all">All Statuses ({applications.length})</option>
                <option value="under_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {applications.map((a: BrokerAccount) => (
                <button 
                  key={a.id} 
                  onClick={() => setSelected(a)} 
                  className={`w-full rounded-2xl border p-4 text-left transition cursor-pointer ${selected?.id === a.id ? 'border-[#214E9B] bg-blue-50/50 ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">{a.personal.fullName}</p>
                      <p className="text-xs text-slate-500">{a.professional.agencyName} • {a.applicationId}</p>
                    </div>
                    <StatusPill status={a.status} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{a.personal.mobile}</span>
                    <span>{a.personal.city}</span>
                  </div>
                </button>
              ))}

              {!applications.length && (
                <div className="py-12 text-center text-sm font-bold text-slate-400">
                  No broker applications match the selected filter.
                </div>
              )}
            </div>
          </div>

          {/* Application Detail & Approval Action Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
            {selected ? (
              <div className="space-y-6">
                
                {/* Header & Status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Broker Candidate</span>
                    <h2 className="text-2xl font-black text-slate-900 mt-0.5">{selected.personal.fullName}</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {selected.professional.agencyName} • App ID: {selected.applicationId}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill status={selected.status} />
                    {selected.status === 'approved' && (
                      <button
                        onClick={() => handleTestLoginAsBroker(selected)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer"
                        title="Simulate login into this broker's workspace"
                      >
                        Open Workspace
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                    <p className="font-bold text-slate-400 uppercase text-[10px]">Contact Info</p>
                    <p className="font-bold text-slate-800">Phone: {selected.personal.mobile}</p>
                    <p className="text-slate-600">Email: {selected.personal.email}</p>
                    <p className="text-slate-600">Location: {selected.personal.city}, {selected.personal.state}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                    <p className="font-bold text-slate-400 uppercase text-[10px]">Professional Data</p>
                    <p className="font-bold text-slate-800">Experience: {selected.professional.yearsExperience} Years</p>
                    <p className="text-slate-600">Areas: {selected.professional.areasServed}</p>
                    <p className="text-slate-600">Specialty: {selected.professional.specialization.join(', ') || 'General'}</p>
                    {selected.reraNumber && (
                      <p className="text-emerald-700 font-bold">MahaRERA: {selected.reraNumber}</p>
                    )}
                  </div>
                </div>

                {/* Password / Login Notice */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center justify-between font-black text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5" /> Broker Password Configured
                    </span>
                    <span className="text-[10px] bg-blue-200/80 px-2 py-0.5 rounded-full text-blue-900 font-mono">
                      {selected.password ? selected.password : 'password123'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Once approved, this broker can immediately log in using their phone (<strong>{selected.personal.mobile}</strong>) and password.
                  </p>
                </div>

                {/* Action Box: Approve / Reject / WhatsApp */}
                <div className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/50">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Admin Review Actions
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Reviewer Notes / Approval Remarks
                    </label>
                    <textarea 
                      rows={2} 
                      value={note} 
                      onChange={e => setNote(e.target.value)} 
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white focus:outline-none focus:border-[#214E9B]" 
                      placeholder="e.g. Verified RERA details and office in CIDCO. Approved for platform inventory." 
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button 
                      onClick={() => updateApplication(selected, { status: 'approved', reviewerNotes: note || 'Approved by Admin' })} 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-5 py-2.5 rounded-xl cursor-pointer shadow-sm flex items-center space-x-1.5 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Broker & Activate Login</span>
                    </button>

                    <button 
                      onClick={() => updateApplication(selected, { status: 'rejected', reviewerNotes: note || 'Rejected due to incomplete verification' })} 
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2.5 rounded-xl cursor-pointer transition"
                    >
                      Reject
                    </button>

                    {/* WhatsApp Notification Direct Button */}
                    <a
                      href={`https://wa.me/${selected.personal.mobile.replace(/[^0-9]/g, '').replace(/^91/, '').length === 10 ? '91' + selected.personal.mobile.replace(/[^0-9]/g, '').replace(/^91/, '') : selected.personal.mobile.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(selected.personal.fullName)}!%20Aapka%20Auricity%20Broker%20Partner%20Account%20APPROVE%20kar%20diya%20gaya%20hai.%20Ab%20aap%20apne%20registered%20mobile%20(${selected.personal.mobile.replace(/[^0-9]/g, '')})%20aur%20password%20se%20login%20kar%20sakte%20hain.%20Welcome%20to%20Auricity!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Notify Broker via WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 text-sm font-bold">
                Select a broker from the left list to review KYC and grant approval.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. BROKER DASHBOARD (PROPERTY UPLOADING & INVENTORY)
// -------------------------------------------------------------
function BrokerDashboard({ 
  app, 
  allProperties, 
  addProperty, 
  updateProperty, 
  leads, 
  realtors, 
  go 
}: any) {
  const { showToast, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'inventory' | 'upload' | 'leads' | 'analytics'>('inventory');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Sold'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Property Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<PropertyType>('Apartment');
  const [newPrice, setNewPrice] = useState('7500000');
  const [newPriceDisplay, setNewPriceDisplay] = useState('₹75.0 L');
  const [newLocality, setNewLocality] = useState('CIDCO N-4');
  const [newAddress, setNewAddress] = useState('Near Cannaught Garden, CIDCO, Chhatrapati Sambhajinagar');
  const [newCarpetArea, setNewCarpetArea] = useState('1150');
  const [newBedrooms, setNewBedrooms] = useState('3');
  const [newBathrooms, setNewBathrooms] = useState('2');
  const [newFurnishing, setNewFurnishing] = useState('Semi-Furnished');
  const [newDescription, setNewDescription] = useState('Prime location spacious 3 BHK apartment with all modern amenities, 24x7 water supply, power backup, and dedicated covered car parking.');
  const [newImages, setNewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&auto=format&fit=crop&q=80'
  ]);
  const [uploading, setUploading] = useState(false);

  // Match properties posted by or assigned to this broker
  const brokerProperties = useMemo(() => {
    if (!app) return [];
    return allProperties.filter((p: Property) => 
      p.brokerId === app.id || 
      p.brokerName === app.personal.fullName ||
      p.listedBy?.name === app.personal.fullName ||
      p.ownerContact?.phone === app.personal.mobile
    );
  }, [allProperties, app]);

  const filteredProperties = useMemo(() => {
    if (statusFilter === 'all') return brokerProperties;
    return brokerProperties.filter(p => p.status === statusFilter);
  }, [brokerProperties, statusFilter]);

  const brokerLeads = useMemo(() => {
    if (!app) return [];
    return leads.filter((l: any) => 
      l.assignedBrokerId === app.id || 
      l.assignedBrokerName === app.personal.fullName
    );
  }, [leads, app]);

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter a property title.', 'error');
      return;
    }

    setUploading(true);

    const priceNum = parseFloat(newPrice) || 7500000;
    const priceFormatted = priceNum >= 10000000 
      ? `₹${(priceNum / 10000000).toFixed(2)} Cr` 
      : `₹${(priceNum / 100000).toFixed(1)} L`;

    const propId = `prop-br-${Date.now()}`;
    const newProperty: Property = {
      id: propId,
      title: newTitle.trim(),
      description: newDescription.trim(),
      price: priceNum,
      priceDisplay: newPriceDisplay.trim() || priceFormatted,
      propertyType: newType,
      listingType: 'Buy',
      locality: newLocality.trim(),
      address: newAddress.trim(),
      city: app?.personal.city || 'Chhatrapati Sambhajinagar',
      carpetArea: parseInt(newCarpetArea) || 1000,
      bedrooms: parseInt(newBedrooms) || 2,
      bathrooms: parseInt(newBathrooms) || 2,
      furnishing: newFurnishing,
      status: 'Active',
      readyToMove: true,
      reraApproved: true,
      verified: true,
      zeroBrokerage: false,
      featured: true,
      images: newImages.length > 0 ? newImages : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'
      ],
      amenities: ['Power Backup', 'Covered Parking', 'Lift', '24x7 Water Supply', 'Security / CCTV'],
      postedBy: 'Broker',
      brokerId: app?.id,
      brokerName: app?.personal.fullName,
      ownerContact: {
        name: app?.personal.fullName || 'Auricity Partner Broker',
        phone: app?.personal.mobile || '9822019988',
        whatsapp: app?.personal.mobile || '9822019988',
        email: app?.personal.email
      },
      createdAt: new Date().toISOString()
    };

    addProperty(newProperty);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setUploading(false);
    setShowUploadModal(false);
    showToast(`Property "${newTitle}" posted live successfully!`, 'success');

    // Reset fields
    setNewTitle('');
    setActiveTab('inventory');
  };

  const handleToggleSold = (p: Property) => {
    const nextStatus: PropertyStatus = p.status === 'Sold' ? 'Active' : 'Sold';
    updateProperty(p.id, { status: nextStatus });
    showToast(`Property marked as ${nextStatus}!`, 'info');
  };

  const handleLogout = () => {
    clearCurrentBroker();
    showToast('Signed out of Broker Workspace.', 'info');
    go('broker-login');
  };

  // If no application exists, prompt to sign in
  if (!app) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <KeyRound className="w-12 h-12 text-[#102B59] mx-auto" />
          <h2 className="text-xl font-black text-slate-900">Broker Sign In Required</h2>
          <p className="text-xs text-slate-600">
            Please log in with your broker mobile and password to access your dashboard.
          </p>
          <button 
            onClick={() => go('broker-login')} 
            className="w-full bg-[#102B59] hover:bg-[#214E9B] text-white font-black py-3 rounded-xl text-xs cursor-pointer"
          >
            Go to Broker Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      
      {/* Top Banner & Profile Header */}
      <div className="bg-[#081A38] text-white pt-10 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={app.personal.profilePhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'} 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-lg" 
                  alt={app.personal.fullName}
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-[#081A38] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-[#D9B45B]" />
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                    Auricity Verified Partner Broker
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black mt-1">
                  {app.personal.fullName}
                </h1>
                <p className="text-xs text-blue-100 mt-0.5">
                  {app.professional.agencyName} • {app.personal.city}
                  {app.reraNumber ? ` • MahaRERA: ${app.reraNumber}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowUploadModal(true)} 
                className="bg-[#F2621E] hover:bg-[#d95214] text-white font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center space-x-2 transition shadow-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload New Property</span>
              </button>

              <button 
                onClick={handleLogout} 
                className="bg-white/10 hover:bg-white/20 text-white font-bold p-3 rounded-2xl text-xs flex items-center transition cursor-pointer"
                title="Sign out of broker account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-3 border border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Active Listings</p>
              <p className="text-2xl font-black text-white mt-1">
                {brokerProperties.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-3 border border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Total Listed</p>
              <p className="text-2xl font-black text-white mt-1">
                {brokerProperties.length}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-3 border border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Buyer Enquiries</p>
              <p className="text-2xl font-black text-white mt-1">
                {brokerLeads.length || 6}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-3 border border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Broker Rating</p>
              <p className="text-2xl font-black text-[#D9B45B] mt-1">
                4.9 ★
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Workspace Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-4 sm:p-6 space-y-6">
          
          {/* Navigation Tab Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveTab('inventory')} 
                className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition ${activeTab === 'inventory' ? 'bg-[#102B59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                My Properties Inventory ({brokerProperties.length})
              </button>
              <button 
                onClick={() => setActiveTab('leads')} 
                className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition ${activeTab === 'leads' ? 'bg-[#102B59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Client Mandates & Leads
              </button>
              <button 
                onClick={() => setActiveTab('analytics')} 
                className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition ${activeTab === 'analytics' ? 'bg-[#102B59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Commission Forecaster
              </button>
            </div>

            <button 
              onClick={() => setShowUploadModal(true)} 
              className="bg-[#214E9B] hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Property</span>
            </button>
          </div>

          {/* TAB 1: PROPERTIES INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">Your Real Estate Inventory</h3>
                  <p className="text-xs text-slate-500">Live properties posted under {app.personal.fullName} on Auricity.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Filter:</span>
                  {(['all', 'Active', 'Sold'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold cursor-pointer transition ${statusFilter === s ? 'bg-[#102B59] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {s === 'all' ? 'All Listings' : s}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 space-y-4">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <div>
                    <h4 className="text-sm font-black text-slate-800">No properties in this view</h4>
                    <p className="text-xs text-slate-500 mt-1">Start showcasing your Sambhajinagar properties to verified buyers.</p>
                  </div>
                  <button 
                    onClick={() => setShowUploadModal(true)} 
                    className="bg-[#102B59] hover:bg-[#214E9B] text-white text-xs font-black px-6 py-2.5 rounded-xl cursor-pointer"
                  >
                    + Post First Property
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProperties.map(p => (
                    <div key={p.id} className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 overflow-hidden bg-slate-100">
                          <img 
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'} 
                            alt={p.title} 
                            className="w-full h-full object-cover" 
                          />
                          <span className={`absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm ${p.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'}`}>
                            {p.status}
                          </span>
                          <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-xs font-black px-2.5 py-1 rounded-xl">
                            {p.priceDisplay}
                          </span>
                        </div>

                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E4FA8]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{p.locality}</span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900 line-clamp-1">{p.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>

                          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600 border-t border-slate-100">
                            <span>{p.bedrooms ? `${p.bedrooms} BHK` : p.propertyType}</span>
                            <span>•</span>
                            <span>{p.carpetArea} sq.ft</span>
                            <span>•</span>
                            <span>{p.furnishing || 'Unfurnished'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                        <button
                          onClick={() => go(`property-detail:${p.id}`)}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl text-center cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View on Site</span>
                        </button>

                        <button
                          onClick={() => handleToggleSold(p)}
                          className={`text-xs font-bold px-3 py-2 rounded-xl cursor-pointer ${p.status === 'Sold' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                        >
                          {p.status === 'Sold' ? 'Reactivate' : 'Mark Sold'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CLIENT MANDATES & LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Direct Buyer Enquiries & Mandates</h3>
                <p className="text-xs text-slate-500">Contact home buyers looking for residential and commercial deals in Sambhajinagar.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: 'Dr. Anand Deshmukh', phone: '9822154433', req: 'Looking for 3 BHK flat in Cannaught / CIDCO N-4', budget: '₹85 Lakhs - 1.10 Cr', date: 'Today' },
                  { name: 'Sunil Kulkarni', phone: '9422789900', req: 'Commercial showroom space on Jalna Road', budget: '₹1.50 - 2.20 Cr', date: 'Yesterday' },
                  { name: 'Pooja Gaikwad', phone: '9890123344', req: '2 BHK ready-to-move in Garkheda / Samarth Nagar', budget: '₹55 - 65 Lakhs', date: '2 days ago' },
                  { name: 'Virendra Shinde', phone: '9158002211', req: 'NA Residential Plot in Beed Bypass / Shendra', budget: '₹35 - 50 Lakhs', date: '3 days ago' }
                ].map((l, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{l.name}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{l.req}</p>
                      </div>
                      <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{l.date}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Budget: <strong className="text-slate-800">{l.budget}</strong></span>
                    </div>

                    <div className="flex gap-2 pt-1 border-t border-slate-200">
                      <a 
                        href={`https://wa.me/91${l.phone}?text=Namaste%20${encodeURIComponent(l.name)},%20I%20am%20${encodeURIComponent(app.personal.fullName)}%20from%20Auricity%20Broker%20Network.%20I%20have%20matching%20properties%20for%20your%20requirement.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Client</span>
                      </a>
                      <a 
                        href={`tel:${l.phone}`}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center justify-center space-x-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMMISSION FORECASTER */}
          {activeTab === 'analytics' && (
            <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50/50 space-y-6">
              <div>
                <h3 className="text-base font-black text-slate-900">Broker Commission & Pipeline Forecaster</h3>
                <p className="text-xs text-slate-500">Calculate projected earnings based on your Sambhajinagar deals pipeline.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">Estimated Pipeline Value</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">₹3.85 Cr</p>
                  <p className="text-[11px] text-emerald-600 mt-1">4 properties currently shortlisted</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">Brokerage Fee Standard</p>
                  <p className="text-2xl font-black text-[#1E4FA8] mt-1">1.0% - 2.0%</p>
                  <p className="text-[11px] text-slate-500 mt-1">Sambhajinagar market standard</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">Projected Commission</p>
                  <p className="text-2xl font-black text-emerald-700 mt-1">₹3,85,000 - ₹7,70,000</p>
                  <p className="text-[11px] text-slate-500 mt-1">On closing ongoing discussions</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: POST / UPLOAD NEW PROPERTY */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8">
            
            {/* Modal Header */}
            <div className="bg-[#081A38] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9B45B]">Broker Desk Listing</span>
                <h3 className="text-lg font-black mt-0.5">Upload New Property Listing</h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateProperty} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div>
                <Label required>Property Title</Label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Luxurious 3 BHK Apartment in Cannaught Gardens, CIDCO"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label required>Property Type</Label>
                  <select 
                    value={newType} 
                    onChange={e => setNewType(e.target.value as PropertyType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B] cursor-pointer"
                  >
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="Independent House / Villa">Independent House / Villa</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Commercial Shop">Commercial Shop</option>
                    <option value="Industrial / MIDC Plot">Industrial / MIDC Plot</option>
                  </select>
                </div>

                <div>
                  <Label required>Price in INR</Label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 7500000"
                    value={newPrice}
                    onChange={e => {
                      setNewPrice(e.target.value);
                      const num = parseFloat(e.target.value);
                      if (num) {
                        setNewPriceDisplay(num >= 10000000 ? `₹${(num / 10000000).toFixed(2)} Cr` : `₹${(num / 100000).toFixed(1)} L`);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Display: {newPriceDisplay}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label required>Locality in Sambhajinagar</Label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. CIDCO N-4, Garkheda, Samarth Nagar"
                    value={newLocality}
                    onChange={e => setNewLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B]"
                  />
                </div>

                <div>
                  <Label required>Carpet Area (sq.ft)</Label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 1150"
                    value={newCarpetArea}
                    onChange={e => setNewCarpetArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Bedrooms (BHK)</Label>
                  <select 
                    value={newBedrooms} 
                    onChange={e => setNewBedrooms(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B] cursor-pointer"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <Label>Bathrooms</Label>
                  <select 
                    value={newBathrooms} 
                    onChange={e => setNewBathrooms(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B] cursor-pointer"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <Label>Furnishing</Label>
                  <select 
                    value={newFurnishing} 
                    onChange={e => setNewFurnishing(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B] cursor-pointer"
                  >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>
              </div>

              <div>
                <Label>Address / Landmark</Label>
                <input 
                  type="text"
                  placeholder="Near Cannaught Garden, CIDCO, Chhatrapati Sambhajinagar"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B]"
                />
              </div>

              <div>
                <Label>Property Description</Label>
                <textarea 
                  rows={3}
                  placeholder="Describe building highlights, floor, road width, ventilation..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#214E9B]"
                />
              </div>

              {/* Photos Uploader */}
              <div>
                <Label>Property Photos (Upload or Presets)</Label>
                <PropertyPhotoUploader 
                  images={newImages} 
                  onChange={setNewImages} 
                  maxPhotos={6} 
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-3 bg-[#102B59] hover:bg-[#214E9B] text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition disabled:opacity-50"
                >
                  {uploading ? 'Publishing…' : 'Publish Property Live'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
