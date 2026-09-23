export type BrokerStatus = 'under_review' | 'approved' | 'rejected' | 'more_information_required';

export interface BrokerDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  storageKey?: string;
  url?: string;
}

export interface BrokerAccount {
  id: string;
  applicationId: string;
  status: BrokerStatus;
  submittedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  password?: string;
  personal: {
    fullName: string;
    email: string;
    mobile: string;
    profilePhoto?: string;
    city: string;
    state: string;
    preferredLanguage: string;
  };
  professional: {
    agencyName: string;
    yearsExperience: string;
    specialization: string[];
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
  reraNumber?: string;
  rating?: number;
  dealsClosed?: number;
}

export const BROKER_STORAGE_KEY = 'auricity_broker_applications_v1';
export const CURRENT_BROKER_KEY = 'auricity_current_broker';

export const INITIAL_BROKER_ACCOUNTS: BrokerAccount[] = [
  {
    id: 'br-approved-1',
    applicationId: 'AUR-BR-2026-9821',
    status: 'approved',
    submittedAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-09-13T14:30:00Z',
    reviewedAt: '2026-09-13T14:30:00Z',
    reviewerNotes: 'Verified MahaRERA licensed broker. Documents validated for Chhatrapati Sambhajinagar.',
    password: 'password123',
    reraNumber: 'A51500019283',
    rating: 4.9,
    dealsClosed: 38,
    personal: {
      fullName: 'Rameshwar S. Patil',
      email: 'rameshwar@patilrealty.com',
      mobile: '9822019988',
      city: 'Chhatrapati Sambhajinagar',
      state: 'Maharashtra',
      preferredLanguage: 'Marathi',
      profilePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
    },
    professional: {
      agencyName: 'Patil Real Estate & Consultancy',
      yearsExperience: '8',
      specialization: ['Residential', 'Commercial', 'Land'],
      areasServed: 'CIDCO, Garkheda, Samarth Nagar, Jalna Road',
      bio: 'Leading real estate advisor and CIDCO commercial/residential property specialist in Chhatrapati Sambhajinagar.'
    },
    business: {
      officeAddress: 'Shop 12, Commercial Complex, Near Cannaught Garden, CIDCO, Sambhajinagar',
      businessPhone: '9822019988',
      website: 'https://patilrealty.auricity.in',
      businessDescription: 'Providing end-to-end property buying, selling, leasing and legal title search.',
      activeProperties: '15',
      preferredPropertyTypes: '2 & 3 BHK Apartments, Commercial Shops, NA Plots'
    },
    verification: {
      idType: 'RERA / Professional Registration',
      documents: [
        {
          id: 'doc-1',
          name: 'MahaRERA_Certificate_PatilRealty.pdf',
          type: 'application/pdf',
          size: 1420000,
          uploadedAt: '2026-09-12T10:05:00Z'
        }
      ],
      businessRegistration: 'GSTIN27AABCP1234F1Z8',
      agreement: true
    }
  },
  {
    id: 'br-pending-1',
    applicationId: 'AUR-BR-2026-3319',
    status: 'under_review',
    submittedAt: '2026-09-22T11:45:00Z',
    updatedAt: '2026-09-22T11:45:00Z',
    reviewerNotes: 'Application submitted. Pending RERA certificate verification.',
    password: 'password123',
    reraNumber: 'A51500044122',
    rating: 4.7,
    dealsClosed: 12,
    personal: {
      fullName: 'Ganesh M. Jadhav',
      email: 'ganesh.jadhav@gmail.com',
      mobile: '9422114455',
      city: 'Chhatrapati Sambhajinagar',
      state: 'Maharashtra',
      preferredLanguage: 'Hindi'
    },
    professional: {
      agencyName: 'Jadhav Property Consultants',
      yearsExperience: '4',
      specialization: ['Residential', 'Rental'],
      areasServed: 'Beed Bypass, Seven Hills, Osmanpura',
      bio: 'Dedicated realtor specializing in residential rentals, 2 BHK flats and resale homes in Sambhajinagar.'
    },
    business: {
      officeAddress: 'Office 4, Ground Floor, Seven Hills Plaza, Sambhajinagar',
      businessPhone: '9422114455',
      website: '',
      businessDescription: 'Residential rental and resale brokerage service.',
      activeProperties: '6',
      preferredPropertyTypes: '1 BHK, 2 BHK, Row Houses'
    },
    verification: {
      idType: 'Government ID',
      documents: [
        {
          id: 'doc-2',
          name: 'Aadhaar_Ganesh_Jadhav.pdf',
          type: 'application/pdf',
          size: 980000,
          uploadedAt: '2026-09-22T11:48:00Z'
        }
      ],
      businessRegistration: '',
      agreement: true
    }
  }
];

export function normalizeBrokerAccount(raw: any): BrokerAccount {
  return {
    id: String(raw?.id || `br-${Date.now()}`),
    applicationId: String(raw?.applicationId || `AUR-BR-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`),
    status: (raw?.status as BrokerStatus) || 'under_review',
    submittedAt: raw?.submittedAt || new Date().toISOString(),
    updatedAt: raw?.updatedAt || new Date().toISOString(),
    reviewedAt: raw?.reviewedAt,
    reviewerNotes: raw?.reviewerNotes,
    password: raw?.password || 'password123',
    reraNumber: raw?.reraNumber || '',
    rating: typeof raw?.rating === 'number' ? raw.rating : 4.8,
    dealsClosed: typeof raw?.dealsClosed === 'number' ? raw.dealsClosed : 0,
    personal: {
      fullName: String(raw?.personal?.fullName || raw?.fullName || 'Auricity Broker').trim(),
      email: String(raw?.personal?.email || raw?.email || '').trim().toLowerCase(),
      mobile: String(raw?.personal?.mobile || raw?.mobile || '').trim(),
      profilePhoto: raw?.personal?.profilePhoto || raw?.profilePhoto,
      city: String(raw?.personal?.city || raw?.city || 'Chhatrapati Sambhajinagar').trim(),
      state: String(raw?.personal?.state || raw?.state || 'Maharashtra').trim(),
      preferredLanguage: String(raw?.personal?.preferredLanguage || 'English')
    },
    professional: {
      agencyName: String(raw?.professional?.agencyName || raw?.agencyName || 'Auricity Realty Associates').trim(),
      yearsExperience: String(raw?.professional?.yearsExperience || '5'),
      specialization: Array.isArray(raw?.professional?.specialization) ? raw.professional.specialization : ['Residential'],
      areasServed: String(raw?.professional?.areasServed || 'Chhatrapati Sambhajinagar'),
      bio: String(raw?.professional?.bio || 'Professional real estate advisor in Sambhajinagar')
    },
    business: {
      officeAddress: String(raw?.business?.officeAddress || 'Chhatrapati Sambhajinagar'),
      businessPhone: String(raw?.business?.businessPhone || raw?.personal?.mobile || ''),
      website: String(raw?.business?.website || ''),
      businessDescription: String(raw?.business?.businessDescription || 'Real estate agency services'),
      activeProperties: String(raw?.business?.activeProperties || '5'),
      preferredPropertyTypes: String(raw?.business?.preferredPropertyTypes || 'Apartments, Plots, Commercial')
    },
    verification: {
      idType: String(raw?.verification?.idType || 'Government ID'),
      documents: Array.isArray(raw?.verification?.documents) ? raw.verification.documents : [],
      businessRegistration: String(raw?.verification?.businessRegistration || ''),
      agreement: Boolean(raw?.verification?.agreement ?? true)
    }
  };
}

export function getBrokerApplications(): BrokerAccount[] {
  try {
    const raw = localStorage.getItem(BROKER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeBrokerAccount);
      }
    }
    const defaults = INITIAL_BROKER_ACCOUNTS.map(normalizeBrokerAccount);
    localStorage.setItem(BROKER_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  } catch {
    return INITIAL_BROKER_ACCOUNTS.map(normalizeBrokerAccount);
  }
}

export async function saveBrokerApplications(apps: BrokerAccount[]): Promise<void> {
  try {
    const normalized = apps.map(normalizeBrokerAccount);
    localStorage.setItem(BROKER_STORAGE_KEY, JSON.stringify(normalized));
    await fetch(`/api/store/${BROKER_STORAGE_KEY}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: normalized })
    }).catch(() => {});
  } catch (err) {
    console.warn('Failed to persist broker applications:', err);
  }
}

export function addBrokerApplication(app: BrokerAccount): void {
  const current = getBrokerApplications();
  const cleanEmail = (app.personal?.email || '').toLowerCase().trim();
  const cleanMobile = (app.personal?.mobile || '').replace(/[^0-9]/g, '');

  const filtered = current.filter(a => {
    const aEmail = (a.personal?.email || '').toLowerCase().trim();
    const aMobile = (a.personal?.mobile || '').replace(/[^0-9]/g, '');
    const isSameEmail = cleanEmail && aEmail === cleanEmail;
    const isSameMobile = cleanMobile && aMobile === cleanMobile;
    const isSameId = a.id === app.id || a.applicationId === app.applicationId;
    return !(isSameEmail || isSameMobile || isSameId);
  });

  const normalized = normalizeBrokerAccount(app);
  const updated = [normalized, ...filtered];
  saveBrokerApplications(updated);
}

export function updateBrokerAccount(id: string, patch: Partial<BrokerAccount>): BrokerAccount | null {
  const current = getBrokerApplications();
  let updatedAccount: BrokerAccount | null = null;
  const next = current.map(item => {
    if (item.id === id || item.applicationId === id) {
      updatedAccount = {
        ...item,
        ...patch,
        updatedAt: new Date().toISOString()
      };
      return updatedAccount;
    }
    return item;
  });

  if (updatedAccount) {
    saveBrokerApplications(next);
    // If the currently logged in broker was updated, sync session
    const currentSession = getCurrentBroker();
    if (currentSession && (currentSession.id === id || currentSession.applicationId === id)) {
      setCurrentBroker(updatedAccount);
    }
  }
  return updatedAccount;
}

export function approveBrokerAccount(id: string, reviewerNotes?: string): BrokerAccount | null {
  return updateBrokerAccount(id, {
    status: 'approved',
    reviewedAt: new Date().toISOString(),
    reviewerNotes: reviewerNotes || 'Approved by Auricity Administrator'
  });
}

export function getCurrentBroker(): BrokerAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_BROKER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentBroker(broker: BrokerAccount): void {
  try {
    localStorage.setItem(CURRENT_BROKER_KEY, JSON.stringify(broker));
  } catch (err) {
    console.warn('Could not save current broker to localStorage:', err);
  }
}

export function clearCurrentBroker(): void {
  try {
    localStorage.removeItem(CURRENT_BROKER_KEY);
  } catch {}
}
