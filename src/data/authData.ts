import { AuthUser } from '../types';

export const INITIAL_USERS: AuthUser[] = [
  {
    id: 'user-owner',
    name: 'Swapnil Jadhav (Owner)',
    email: 'owner@auricity.in',
    phone: '+91 98224 88990',
    role: 'customer',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'CIDCO N-4',
    intent: 'Sell',
    savedProperties: ['prop-101', 'prop-102'],
    createdAt: '2026-08-10T10:00:00Z',
    isVerified: true
  },
  {
    id: 'user-broker',
    name: 'Rajesh Patil (Broker)',
    email: 'broker@auricity.in',
    phone: '+91 80105 06030',
    role: 'realtor',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Jalna Road (Golden Mile)',
    realtorId: 'realtor-01',
    agencyName: 'Marathwada Real Estates & Mandates',
    reraNumber: 'A51500001892',
    kycStatus: 'Verified',
    createdAt: '2026-07-15T08:30:00Z',
    isVerified: true
  },
  {
    id: 'user-tenant',
    name: 'Ananya Deshmukh (Tenant)',
    email: 'tenant@auricity.in',
    phone: '+91 98230 55443',
    role: 'customer',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Beed Bypass Road',
    intent: 'Rent',
    savedProperties: ['prop-103'],
    createdAt: '2026-08-18T11:00:00Z',
    isVerified: true
  },
  {
    id: 'user-admin',
    name: 'Auricity Super Administrator',
    email: 'admin@auricity.in',
    phone: '+91 80105 06030',
    role: 'admin',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Town Centre',
    createdAt: '2026-01-01T00:00:00Z',
    isVerified: true
  },
  {
    id: 'user-04',
    name: 'Rajeshwar Kulkarni',
    email: 'kulkarni.architects@example.com',
    phone: '+91 98224 55112',
    role: 'service_provider',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'CIDCO N-1 to N-4',
    providerId: 'sp-01',
    serviceCategory: 'Architect',
    businessName: 'Kulkarni & Associates Architects',
    providerStatus: 'approved',
    createdAt: '2026-08-10T09:00:00Z',
    isVerified: true
  }
];

export const SERVICE_CATEGORIES = [
  'Architect',
  'Interior Designer',
  'Vastu Consultant',
  'Construction Contractor',
  'Civil Engineer & Surveyor',
  'Painting Contractor',
  'Plumber & Sanitary Expert',
  'Electrical Contractor',
  'Modular Furniture & Carpenter',
  'Building Material Supplier',
  'Legal Title Search Advocate',
  'Home Loan & Subsidy Consultant',
  'Solar Rooftop Installer',
  'Security & CCTV Automation'
];
