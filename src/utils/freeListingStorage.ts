// Utility to track and enforce the 2 Free Property Listings quota per owner
export interface FreeListingRecord {
  id: string;
  phone: string;
  propertyId: string;
  title: string;
  locality: string;
  price: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'sold';
}

const STORAGE_KEY = 'auricity_free_property_postings';
const LAST_PHONE_KEY = 'auricity_last_owner_phone';
export const MAX_FREE_LISTINGS = 2;

export function getStoredFreeListings(): FreeListingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read free listings from storage', err);
    return [];
  }
}

export function saveStoredFreeListings(records: FreeListingRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save free listings to storage', err);
  }
}

export function getLastUsedOwnerPhone(): string {
  try {
    return localStorage.getItem(LAST_PHONE_KEY) || '';
  } catch {
    return '';
  }
}

export function setLastUsedOwnerPhone(phone: string): void {
  try {
    localStorage.setItem(LAST_PHONE_KEY, phone.trim());
  } catch {}
}

export function normalizePhone(phone: string): string {
  // Extract last 10 digits
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.slice(-10);
}

export function getFreeListingQuota(phone: string, fallbackPhone?: string): {
  normalizedPhone: string;
  used: number;
  max: number;
  remaining: number;
  canPost: boolean;
  userProperties: FreeListingRecord[];
} {
  const target = normalizePhone(phone || fallbackPhone || getLastUsedOwnerPhone());
  
  if (!target || target.length < 10) {
    // If no phone provided yet, check if there's a stored phone
    return {
      normalizedPhone: '',
      used: 0,
      max: MAX_FREE_LISTINGS,
      remaining: MAX_FREE_LISTINGS,
      canPost: true,
      userProperties: []
    };
  }

  const all = getStoredFreeListings();
  const userProperties = all.filter(r => normalizePhone(r.phone) === target);
  const used = userProperties.length;
  const remaining = Math.max(0, MAX_FREE_LISTINGS - used);
  const canPost = used < MAX_FREE_LISTINGS;

  return {
    normalizedPhone: target,
    used,
    max: MAX_FREE_LISTINGS,
    remaining,
    canPost,
    userProperties
  };
}

export function recordFreeListing(record: Omit<FreeListingRecord, 'submittedAt'>): boolean {
  const normalized = normalizePhone(record.phone);
  if (!normalized || normalized.length < 10) return false;

  const current = getStoredFreeListings();
  const existingForUser = current.filter(r => normalizePhone(r.phone) === normalized);

  if (existingForUser.length >= MAX_FREE_LISTINGS) {
    return false; // Quota exceeded
  }

  const newRecord: FreeListingRecord = {
    ...record,
    phone: normalized,
    submittedAt: new Date().toISOString()
  };

  current.unshift(newRecord);
  saveStoredFreeListings(current);
  setLastUsedOwnerPhone(normalized);
  return true;
}

export function removeFreeListing(propertyId: string): boolean {
  const current = getStoredFreeListings();
  const filtered = current.filter(r => r.propertyId !== propertyId);
  if (filtered.length !== current.length) {
    saveStoredFreeListings(filtered);
    return true;
  }
  return false;
}
