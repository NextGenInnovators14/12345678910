export type AffiliateStatus = 'under_review' | 'approved' | 'rejected' | 'suspended';

export interface AffiliateApplication {
  id: string;
  affiliateId: string;
  status: AffiliateStatus;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  city: string;
  state: string;
  profession: string;
  upiId?: string;
  bankDetails?: string;
  referralCode: string;
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

export type ReferralDealStatus = 
  | 'Open' 
  | 'Owner Contacted' 
  | 'Site Visit' 
  | 'In Negotiation' 
  | 'Sold / Deal Closed' 
  | 'Dropped';

export type ReferralPayoutStatus = 'Pending' | 'Approved' | 'Paid' | 'Cancelled';

export interface AffiliatePropertyReferral {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliatePhone: string;
  affiliateUpi?: string;
  propertyTitle: string;
  propertyType: string;
  listingNature: 'Sale' | 'Rent' | 'Lease';
  locality: string;
  address?: string;
  expectedPrice: string;
  ownerName: string;
  ownerPhone: string;
  additionalNotes?: string;
  images?: string[];
  submittedAt: string;
  dealStatus: ReferralDealStatus;
  dealAmount?: number;
  commissionReward?: number;
  payoutStatus: ReferralPayoutStatus;
  payoutTxId?: string;
  payoutDate?: string;
  adminNotes?: string;
}

const APPS_KEY = 'auricity_affiliate_applications_v1';
const REFS_KEY = 'auricity_affiliate_referrals_v1';
const SESSION_KEY = 'auricity_current_affiliate';

export const INITIAL_AFFILIATE_APPS: AffiliateApplication[] = [
  {
    id: 'af-1',
    affiliateId: 'AUR-AF-2026-8912',
    status: 'approved',
    fullName: 'Sunil S. Shinde',
    email: 'sunil.shinde@auricitypartners.in',
    mobile: '9822012345',
    password: 'password123',
    city: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    profession: 'Local Business & Referral Consultant',
    upiId: 'sunilshinde@okhdfcbank',
    referralCode: 'SUNIL77',
    submittedAt: '2026-09-15T10:30:00Z',
    reviewedAt: '2026-09-15T14:20:00Z',
    adminNotes: 'Verified local business consultant. High quality property referrals expected.'
  },
  {
    id: 'af-2',
    affiliateId: 'AUR-AF-2026-4431',
    status: 'under_review',
    fullName: 'Pooja Nitin Joshi',
    email: 'pooja.joshi@gmail.com',
    mobile: '9423188776',
    password: 'password123',
    city: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    profession: 'Architectural Consultant',
    upiId: 'poojajoshi@icici',
    referralCode: 'POOJA88',
    submittedAt: '2026-09-22T08:15:00Z',
    adminNotes: 'Application received. Reviewing details for approval.'
  }
];

export const INITIAL_AFFILIATE_REFERRALS: AffiliatePropertyReferral[] = [
  {
    id: 'REF-2026-001',
    affiliateId: 'AUR-AF-2026-8912',
    affiliateName: 'Sunil S. Shinde',
    affiliatePhone: '9822012345',
    affiliateUpi: 'sunilshinde@okhdfcbank',
    propertyTitle: 'Spacious 3 BHK Penthouse with Private Terrace',
    propertyType: 'Apartment / Flat',
    listingNature: 'Sale',
    locality: 'CIDCO N-4',
    address: 'Near Cannaught Garden, Sector E',
    expectedPrice: '₹ 85 Lakh',
    ownerName: 'Rameshwar Patil',
    ownerPhone: '9890123456',
    additionalNotes: 'Owner is relocating to Pune. Clear 30-yr search title. Immediate possession available.',
    submittedAt: '2026-09-18T11:00:00Z',
    dealStatus: 'Sold / Deal Closed',
    dealAmount: 8400000,
    commissionReward: 25000,
    payoutStatus: 'Paid',
    payoutTxId: 'UPI-260920-98212',
    payoutDate: '2026-09-20T16:00:00Z',
    adminNotes: 'Deal closed with buyer Dr. Anand Kulkarni. ₹25,000 commission credited via UPI to Sunil.'
  },
  {
    id: 'REF-2026-002',
    affiliateId: 'AUR-AF-2026-8912',
    affiliateName: 'Sunil S. Shinde',
    affiliatePhone: '9822012345',
    affiliateUpi: 'sunilshinde@okhdfcbank',
    propertyTitle: 'Corner NA Plot 2400 sq.ft (Town Planning Sanctioned)',
    propertyType: 'Plot / Land',
    listingNature: 'Sale',
    locality: 'Beed Bypass',
    address: 'Opposite MIT College Road',
    expectedPrice: '₹ 54 Lakh',
    ownerName: 'Vikas Chandrakant Deshmukh',
    ownerPhone: '9823456789',
    additionalNotes: 'East-facing plot, clear demarcation done, water & electricity line at boundary.',
    submittedAt: '2026-09-21T14:45:00Z',
    dealStatus: 'In Negotiation',
    dealAmount: 5200000,
    commissionReward: 18000,
    payoutStatus: 'Approved',
    adminNotes: 'Token amount scheduled tomorrow. Affiliate commission of ₹18,000 approved upon deed signing.'
  }
];

export function normalizeAffiliateApp(raw: any): AffiliateApplication & {
  basic: { fullName: string; email: string; mobile: string; country: string; state: string; city: string };
  profile: { affiliateType: string; website: string; socialProfile: string; audienceSize: string; primaryChannel: string; about: string };
  promotion: { heardFrom: string; strategy: string; guidelines: boolean };
  account: { emailVerified: boolean };
  referrals: any[];
  clicks: number;
  rewards: any[];
} {
  const fullName = String(raw?.fullName || raw?.basic?.fullName || 'Auricity Partner').trim();
  const email = String(raw?.email || raw?.basic?.email || '').trim().toLowerCase();
  const mobile = String(raw?.mobile || raw?.basic?.mobile || '').trim();
  const city = String(raw?.city || raw?.basic?.city || 'Chhatrapati Sambhajinagar').trim();
  const state = String(raw?.state || raw?.basic?.state || 'Maharashtra').trim();
  const profession = String(raw?.profession || raw?.profile?.affiliateType || 'Referral Partner').trim();
  const password = String(raw?.password || 'password123');
  const referralCode = String(raw?.referralCode || Math.random().toString(36).slice(2, 8).toUpperCase());

  return {
    id: String(raw?.id || `af-${Date.now()}`),
    affiliateId: String(raw?.affiliateId || `AUR-AF-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`),
    status: (raw?.status as AffiliateStatus) || 'under_review',
    fullName,
    email,
    mobile,
    password,
    city,
    state,
    profession,
    upiId: raw?.upiId || '',
    bankDetails: raw?.bankDetails || '',
    referralCode,
    submittedAt: raw?.submittedAt || new Date().toISOString(),
    reviewedAt: raw?.reviewedAt,
    adminNotes: raw?.adminNotes || '',
    basic: {
      fullName,
      email,
      mobile,
      country: String(raw?.basic?.country || raw?.country || 'India'),
      state,
      city
    },
    profile: {
      affiliateType: profession,
      website: String(raw?.profile?.website || raw?.website || ''),
      socialProfile: String(raw?.profile?.socialProfile || ''),
      audienceSize: String(raw?.profile?.audienceSize || ''),
      primaryChannel: String(raw?.profile?.primaryChannel || 'Instagram'),
      about: String(raw?.profile?.about || 'Partner affiliate in Sambhajinagar')
    },
    promotion: {
      heardFrom: String(raw?.promotion?.heardFrom || 'Auricity Website'),
      strategy: String(raw?.promotion?.strategy || 'Social media and local word-of-mouth referral'),
      guidelines: Boolean(raw?.promotion?.guidelines ?? true)
    },
    account: {
      emailVerified: Boolean(raw?.account?.emailVerified ?? true)
    },
    referrals: Array.isArray(raw?.referrals) ? raw.referrals : [],
    clicks: Number(raw?.clicks) || 0,
    rewards: Array.isArray(raw?.rewards) ? raw.rewards : []
  };
}

// Applications
export function getAffiliateApplications(): AffiliateApplication[] {
  try {
    const raw = localStorage.getItem(APPS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeAffiliateApp);
      }
    }
  } catch {}
  const defaults = INITIAL_AFFILIATE_APPS.map(normalizeAffiliateApp);
  localStorage.setItem(APPS_KEY, JSON.stringify(defaults));
  return defaults;
}

export function saveAffiliateApplications(apps: AffiliateApplication[]): void {
  try {
    const normalized = apps.map(normalizeAffiliateApp);
    localStorage.setItem(APPS_KEY, JSON.stringify(normalized));
    fetch(`/api/store/${APPS_KEY}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: normalized })
    }).catch(() => {});
  } catch {}
}

export function addAffiliateApplication(app: AffiliateApplication): void {
  const all = getAffiliateApplications();
  const cleanEmail = (app.email || (app as any).basic?.email || '').toLowerCase().trim();
  const cleanMobile = (app.mobile || (app as any).basic?.mobile || '').replace(/[^0-9]/g, '');
  
  const filtered = all.filter(a => {
    const aEmail = (a.email || (a as any).basic?.email || '').toLowerCase().trim();
    const aMobile = (a.mobile || (a as any).basic?.mobile || '').replace(/[^0-9]/g, '');
    const isSameEmail = cleanEmail && aEmail === cleanEmail;
    const isSameMobile = cleanMobile && aMobile === cleanMobile;
    const isSameId = a.id === app.id || a.affiliateId === app.affiliateId;
    return !(isSameEmail || isSameMobile || isSameId);
  });
  
  const normalizedApp = normalizeAffiliateApp(app);
  const next = [normalizedApp, ...filtered];
  saveAffiliateApplications(next);
}

export function updateAffiliateApplicationStatus(
  id: string, 
  status: AffiliateStatus, 
  adminNotes?: string
): AffiliateApplication | null {
  const all = getAffiliateApplications();
  let updatedApp: AffiliateApplication | null = null;
  const next = all.map(a => {
    if (a.id === id || a.affiliateId === id) {
      updatedApp = {
        ...a,
        status,
        reviewedAt: new Date().toISOString(),
        adminNotes: adminNotes !== undefined ? adminNotes : a.adminNotes
      };
      return updatedApp;
    }
    return a;
  });
  if (updatedApp) {
    saveAffiliateApplications(next);
  }
  return updatedApp;
}

// Referrals
export function getAffiliateReferrals(): AffiliatePropertyReferral[] {
  try {
    const raw = localStorage.getItem(REFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  localStorage.setItem(REFS_KEY, JSON.stringify(INITIAL_AFFILIATE_REFERRALS));
  return INITIAL_AFFILIATE_REFERRALS;
}

export function saveAffiliateReferrals(refs: AffiliatePropertyReferral[]): void {
  try {
    localStorage.setItem(REFS_KEY, JSON.stringify(refs));
    fetch(`/api/store/${REFS_KEY}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: refs })
    }).catch(() => {});
  } catch {}
}

export function addAffiliateReferral(ref: AffiliatePropertyReferral): void {
  const all = getAffiliateReferrals();
  const next = [ref, ...all];
  saveAffiliateReferrals(next);
}

export function updateAffiliateReferral(
  id: string, 
  updates: Partial<AffiliatePropertyReferral>
): AffiliatePropertyReferral | null {
  const all = getAffiliateReferrals();
  let updated: AffiliatePropertyReferral | null = null;
  const next = all.map(r => {
    if (r.id === id) {
      updated = { ...r, ...updates };
      return updated;
    }
    return r;
  });
  if (updated) {
    saveAffiliateReferrals(next);
  }
  return updated;
}

// Session
export function getCurrentAffiliate(): AffiliateApplication | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Refresh state from database
      const freshList = getAffiliateApplications();
      const fresh = freshList.find(a => a.id === parsed.id || a.affiliateId === parsed.affiliateId);
      return fresh || parsed;
    }
  } catch {}
  return null;
}

export function setCurrentAffiliate(app: AffiliateApplication | null): void {
  if (!app) {
    localStorage.removeItem(SESSION_KEY);
  } else {
    localStorage.setItem(SESSION_KEY, JSON.stringify(app));
  }
}
