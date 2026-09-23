import { Property } from '../types';

/** Canonical public listing types used by filters and cards. Legacy seed data
 * uses values such as `Buy`/`Rent`; normalizing at the boundary prevents
 * filters from silently returning zero results. */
export type CanonicalListingType = 'sale' | 'rent' | 'pg' | 'commercial' | 'plots';

export function normalizeListingType(value: unknown): CanonicalListingType {
  const v = String(value ?? '').trim().toLowerCase();
  if (v === 'rent' || v === 'lease') return 'rent';
  if (v === 'pg' || v === 'hostel' || v === 'co-living' || v === 'coliving') return 'pg';
  if (v === 'commercial' || v === 'commercial shop' || v === 'commercial office') return 'commercial';
  if (v === 'plot' || v === 'plots' || v === 'land' || v === 'residential plot') return 'plots';
  return 'sale';
}


export function normalizePropertyType(value: unknown): string {
  const v = String(value ?? '').trim().toLowerCase();
  if (v === 'apartment' || v === 'flat' || v === 'flat / apartment') return 'flat / apartment';
  if (v.includes('row house') || v.includes('villa') || v === 'row_house' || v === 'independent house / villa') return 'row house / villa';
  if (v.includes('commercial shop') || v === 'shop') return 'commercial shop';
  if (v.includes('commercial office') || v === 'office') return 'commercial office';
  if (v.includes('plot') || v.includes('land')) return 'plot / land';
  return v;
}

export function matchesListingType(value: unknown, expected: string | undefined): boolean {
  return !expected || normalizeListingType(value) === normalizeListingType(expected);
}

/**
 * Formats a numeric Indian Rupee price into formatted string like ₹ 45.0 L or ₹ 1.25 Cr
 */
export function formatPriceINR(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return 'Price on Request';
  }
  const val = Number(amount);
  if (val <= 0) return 'Price on Request';
  if (val >= 10000000) {
    return `₹ ${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹ ${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${val.toLocaleString('en-IN')}`;
}

export function calculateEMI(principal: number, annualRatePercent: number = 8.5, tenureYears: number = 20): {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
} {
  const r = annualRatePercent / (12 * 100);
  const n = tenureYears * 12;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment)
  };
}

/**
 * Normalizes property objects to ensure all compatibility, alias, and numeric fields
 * are guaranteed to exist with sensible defaults, preventing undefined runtime errors.
 */
export function normalizeProperty(p: Partial<Property> & Record<string, any>): Property {
  const priceVal = Number(p.priceNumeric ?? p.price ?? 0);
  const areaVal = Number(p.carpetArea ?? p.areaSqFt ?? p.builtupArea ?? 1000);
  const calculatedPerSqFt = areaVal > 0 ? Math.round(priceVal / areaVal) : 4500;
  const isZeroBrok = Boolean(p.isZeroBrokerage ?? p.zeroBrokerage ?? false);
  const isRera = Boolean(p.reraRegistered ?? p.reraApproved ?? false);
  const isFeatured = Boolean(p.featured ?? p.isFeatured ?? false);
  const bedroomsVal = Number(p.bedrooms ?? p.bhk ?? 2);
  const bathroomsVal = Number(p.bathrooms ?? 2);
  const balconiesVal = Number(p.balconies ?? 1);
  const furnishingVal = p.furnishing || p.furnishedStatus || 'Semi-Furnished';
  const facingVal = p.facing || 'East';
  const possessionVal = p.possession || p.possessionDate || (p.readyToMove ? 'Ready to Move' : 'Under Construction');
  const contactName = p.contactPerson?.name || p.ownerContact?.name || 'Auricity Property Advisor';
  const contactPhone = p.contactPerson?.phone || p.ownerContact?.phone || '+91 8010506030';
  const contactRole = p.contactPerson?.role || (typeof p.postedBy === 'string' ? p.postedBy.toLowerCase() : 'owner');
  const priceDisplayVal = p.priceDisplay || (
    priceVal >= 10000000 
      ? `₹ ${(priceVal / 10000000).toFixed(2)} Cr` 
      : `₹ ${(priceVal / 100000).toFixed(2)} Lakhs`
  );

  const imagesList = Array.isArray(p.images) && p.images.length > 0
    ? p.images
    : [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ];

  const amenitiesList = Array.isArray(p.amenities) && p.amenities.length > 0
    ? p.amenities
    : ['24/7 Security', 'Covered Parking', 'Water Supply', 'Power Backup'];

  return {
    id: p.id || `prop-${Date.now()}`,
    title: p.title || 'Residential Property in Chhatrapati Sambhajinagar',
    description: p.description || '',
    price: priceVal,
    priceNumeric: priceVal,
    priceDisplay: priceDisplayVal,
    propertyType: p.propertyType || p.type || 'Apartment',
    type: p.propertyType || p.type || 'Apartment',
    listingType: normalizeListingType(p.listingType),
    locality: p.locality || 'CIDCO N-1 to N-4',
    address: p.address || p.locality || 'Chhatrapati Sambhajinagar',
    city: p.city || 'Chhatrapati Sambhajinagar',
    carpetArea: areaVal,
    areaSqFt: areaVal,
    builtupArea: p.builtupArea || Math.round(areaVal * 1.25),
    pricePerSqFt: Number(p.pricePerSqFt ?? calculatedPerSqFt),
    bedrooms: bedroomsVal,
    bhk: bedroomsVal,
    bathrooms: bathroomsVal,
    balconies: balconiesVal,
    furnishing: furnishingVal,
    parking: p.parking || 'Covered',
    floorNumber: p.floorNumber ?? 1,
    totalFloors: p.totalFloors ?? 5,
    floor: p.floor ?? p.floorNumber ?? 1,
    reraNumber: p.reraNumber,
    reraApproved: isRera,
    reraRegistered: isRera,
    verified: p.verified ?? true,
    zeroBrokerage: isZeroBrok,
    isZeroBrokerage: isZeroBrok,
    featured: isFeatured,
    isFeatured: isFeatured,
    status: p.status || 'Active',
    images: imagesList,
    amenities: amenitiesList,
    readyToMove: Boolean(p.readyToMove ?? (possessionVal === 'Ready to Move')),
    possessionDate: possessionVal,
    possession: possessionVal,
    facing: facingVal,
    postedBy: p.postedBy || 'Owner',
    brokerId: p.brokerId,
    createdAt: p.createdAt || new Date().toISOString(),
    tags: Array.isArray(p.tags) ? p.tags : ['Verified', 'Chhatrapati Sambhajinagar'],
    contactPerson: {
      name: contactName,
      phone: contactPhone,
      email: p.contactPerson?.email || p.ownerContact?.email,
      role: contactRole,
      avatar: p.contactPerson?.avatar
    },
    ownerContact: {
      name: contactName,
      phone: contactPhone,
      email: p.ownerContact?.email || p.contactPerson?.email,
      whatsapp: p.ownerContact?.whatsapp || contactPhone.replace(/\D/g, '')
    },
    aiEstimatedValue: p.aiEstimatedValue || {
      minPrice: Math.round(priceVal * 0.95),
      maxPrice: Math.round(priceVal * 1.05),
      fairPrice: priceVal,
      confidenceScore: 92,
      trend: 'Rising'
    }
  } as Property;
}
