import { 
  Property, 
  Project, 
  Realtor, 
  Lead, 
  PaymentTransaction, 
  DltSmsTemplate, 
  DltSmsLog, 
  ServiceItem, 
  ServiceBooking, 
  BlogPost, 
  LegalDocument, 
  PlatformSettings,
  ServiceProviderRegistration,
  PropertyReferral,
  OfferItem,
  TrainingBlog,
  ClubCardsConfig,
  WebsiteContentConfig,
  RealtorPlan,
  BrokerReview,
  RealtorNotification,
  ProjectBrokerAssignment,
  KnowledgeHubConfig,
  BrokerAccessRequest,
  BrokerDirectMessage,
  PropertyType,
  FurnishingStatus,
  FacingDirection
} from '../types';
import { CATEGORIZED_SERVICES } from './servicesData';

export type { PropertyType, FurnishingStatus, FacingDirection };

export const SAMBHAJINAGAR_LOCALITIES = [
  'CIDCO N-1 to N-4',
  'CIDCO N-5 to N-8',
  'CIDCO N-9 to N-12',
  'Jalna Road (Golden Mile)',
  'Beed Bypass Road',
  'Garkheda Parisar',
  'Shendra MIDC / AURIC Smart City',
  'Waluj MIDC Industrial Area',
  'Chikalthana Industrial Area',
  'Seven Hills / Cannought Place',
  'Osmanpura / Station Road',
  'Samarth Nagar & Nirala Bazar',
  'Satara Parisar / Beed Highway',
  'Harsul / Jalgaon Road',
  'Paithan Road / IT Park',
  'TV Centre / Hudco',
  'Shahnoorwadi & Ulkanagari',
  'Khuldabad & Heritage Belt'
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    title: 'Luxury 3 BHK High-Rise Apartment with Panoramic Hills View',
    description: 'Ultra-modern 3 BHK residence with expansive balconies, italian marble flooring, automated lighting, and 2 designated covered parking slots. Situated in the heart of CIDCO N-4 close to Prozone Mall and Cambridge School.',
    price: 8800000,
    priceDisplay: '₹ 88.0 Lakhs',
    propertyType: 'Apartment',
    listingType: 'Buy',
    locality: 'CIDCO N-1 to N-4',
    address: 'Tower B, SkyHeights residency, Opposite CIDCO Water Tank, N-4 CIDCO',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 1420,
    builtupArea: 1810,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    furnishing: 'Semi-Furnished',
    parking: '2+ Covered',
    floorNumber: 7,
    totalFloors: 14,
    reraNumber: 'P51500028491',
    reraApproved: true,
    verified: true,
    zeroBrokerage: true,
    featured: true,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Clubhouse & Gym',
      'Swimming Pool',
      'Children Play Area',
      'EV Charging Station',
      '24/7 CCTV & Security',
      'High-speed Elevators',
      '100% Power Backup',
      'Solar Water Heating'
    ],
    ownerContact: {
      name: 'Vikas Kulkarni',
      phone: '+91 98220 11456',
      whatsapp: '+919822011456',
      email: 'vikas.kulkarni@auricity.in'
    },
    brokerId: 'realtor-01',
    postedBy: 'Broker',
    createdAt: '2026-08-10T10:30:00Z',
    readyToMove: true,
    possessionDate: 'Ready to Move',
    maintenanceMonthly: 2800,
    aiEstimatedValue: {
      minPrice: 8500000,
      maxPrice: 9200000,
      fairPrice: 8750000,
      confidenceScore: 94,
      trend: 'Rising'
    },
    tags: ['0% Brokerage', 'RERA Approved', 'Near Prozone Mall', 'Hill View']
  },
  {
    id: 'prop-102',
    title: 'Sprawling 4 BHK Independent Royal Villa with Private Garden',
    description: 'Exquisite independent duplex villa nestled in a premium gated enclave along Beed Bypass. Boasting a private landscaped lawn, personal elevator provision, servant quarters, and imported sanitary fittings.',
    price: 24500000,
    priceDisplay: '₹ 2.45 Crore',
    propertyType: 'Independent House / Villa',
    listingType: 'Buy',
    locality: 'Beed Bypass Road',
    address: 'Bunglow #18, Marathwada Meadows Enclave, Near Deogiri College Campus Extension, Beed Bypass',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 3250,
    builtupArea: 3900,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    furnishing: 'Fully Furnished',
    parking: '2+ Covered',
    floorNumber: 0,
    totalFloors: 2,
    reraNumber: 'P51500019283',
    reraApproved: true,
    verified: true,
    zeroBrokerage: false,
    featured: true,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Private Landscaped Lawn',
      'Gated Community with Biometric Access',
      'Vastu Compliant North-East Facing',
      'Solar Rooftop 5kW',
      'Servant Quarters with Attached Bath',
      'Rainwater Harvesting System',
      'Jogging Track & Tennis Court'
    ],
    ownerContact: {
      name: 'Sunil Rao Deshmukh',
      phone: '+91 94231 88721',
      whatsapp: '+919423188721',
      email: 'deshmukh.farms@auricity.in'
    },
    brokerId: 'realtor-02',
    postedBy: 'Broker',
    createdAt: '2026-08-12T14:15:00Z',
    readyToMove: true,
    possessionDate: 'Ready to Move',
    maintenanceMonthly: 4500,
    aiEstimatedValue: {
      minPrice: 23500000,
      maxPrice: 25500000,
      fairPrice: 24200000,
      confidenceScore: 91,
      trend: 'High Demand'
    },
    tags: ['Gated Villa', 'Private Garden', 'Vastu Compliant', 'Beed Bypass Prime']
  },
  {
    id: 'prop-103',
    title: 'Ready-to-Construct NA & RERA Sanctioned Residential Plot',
    description: 'Clear title, non-agricultural (NA 44) collector sanctioned residential plot located in prime Garkheda Parisar. Wide 40-feet tar road, underground drainage, and dedicated electricity connection ready.',
    price: 4950000,
    priceDisplay: '₹ 49.5 Lakhs',
    propertyType: 'Residential Plot',
    listingType: 'Buy',
    locality: 'Garkheda Parisar',
    address: 'Plot #42, Shubham Residency Scheme, Near Sutgirni Chowk, Garkheda',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 1800,
    builtupArea: 1800,
    reraNumber: 'P51500031029',
    reraApproved: true,
    verified: true,
    zeroBrokerage: true,
    featured: false,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Collector NA 44 Sanctioned',
      '40 Ft Concrete Internal Roads',
      'Underground Drainage & Water Line',
      'Street Lighting & Demarcated Fencing',
      'Immediate 7/12 Extract Transfer'
    ],
    ownerContact: {
      name: 'Rameshwar Ghuge (Direct Owner)',
      phone: '+91 97654 32109',
      whatsapp: '+919765432109',
      email: 'rameshwar.ghuge@gmail.com'
    },
    postedBy: 'Owner',
    createdAt: '2026-08-15T09:00:00Z',
    readyToMove: true,
    aiEstimatedValue: {
      minPrice: 4700000,
      maxPrice: 5200000,
      fairPrice: 4900000,
      confidenceScore: 96,
      trend: 'Rising'
    },
    tags: ['Direct Owner', 'NA 44 Collector', '0% Brokerage', 'Garkheda']
  },
  {
    id: 'prop-104',
    title: 'Grade-A Commercial Showroom & Office Space on Jalna Road',
    description: 'Prime frontage commercial space facing the main Golden Mile Jalna Road. Ideal for multinational banks, corporate headquarters, electronics flagship showroom, or diagnostic centers.',
    price: 18500000,
    priceDisplay: '₹ 1.85 Crore',
    propertyType: 'Commercial Shop',
    listingType: 'Buy',
    locality: 'Jalna Road (Golden Mile)',
    address: 'Ground Floor & Mezzanine, Auric Commercial Arcade, Near Seven Hills Flyover, Jalna Road',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 2150,
    builtupArea: 2600,
    bathrooms: 2,
    furnishing: 'Unfurnished',
    parking: '2+ Covered',
    floorNumber: 0,
    totalFloors: 6,
    reraNumber: 'P51500040192',
    reraApproved: true,
    verified: true,
    zeroBrokerage: false,
    featured: true,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      '55 Ft Wide Main Road Frontage',
      'Centralized Air Conditioning ducts',
      'Dedicated Basement Customer Parking (15+ cars)',
      '3-Phase High-Tension Power 45kW',
      'Dual High-speed Elevators',
      'Fire Fighting Compliance Certificate'
    ],
    ownerContact: {
      name: 'Rajesh Patil - Marathwada Realtors',
      phone: '+91 80105 06030',
      whatsapp: '+918010506030',
      email: 'rajesh.patil@auricity.in'
    },
    brokerId: 'realtor-01',
    postedBy: 'Broker',
    createdAt: '2026-08-16T11:20:00Z',
    readyToMove: true,
    possessionDate: 'Ready to Move',
    maintenanceMonthly: 6200,
    aiEstimatedValue: {
      minPrice: 17800000,
      maxPrice: 19500000,
      fairPrice: 18400000,
      confidenceScore: 92,
      trend: 'High Demand'
    },
    tags: ['High ROI 8.2%', 'Jalna Road Frontage', 'Grade A Commercial']
  },
  {
    id: 'prop-105',
    title: 'Modern 2 BHK Vaastu Friendly Flat for Rent in Osmanpura',
    description: 'Well-maintained, sunlit 2 BHK apartment in prime Osmanpura near Station Road. Close to top coaching institutes, banks, and daily markets. Modest maintenance and 24/7 municipal water supply.',
    price: 18500,
    priceDisplay: '₹ 18,500 / Month',
    propertyType: 'Apartment',
    listingType: 'Rent',
    locality: 'Osmanpura / Station Road',
    address: 'Flat 302, Vardhaman Pride, Near Kranti Chowk Police Station, Osmanpura',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 950,
    builtupArea: 1180,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    furnishing: 'Semi-Furnished',
    parking: 'Covered',
    floorNumber: 3,
    totalFloors: 5,
    reraApproved: false,
    verified: true,
    zeroBrokerage: true,
    featured: false,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      '24/7 Copious Corporation Water',
      'Covered Reserved Stilt Car Parking',
      'Modular Kitchen with Chimney',
      'Inverter Wiring Installed',
      'Lift with Automatic Rescue Device'
    ],
    ownerContact: {
      name: 'Anjali Deshpande (Direct Owner)',
      phone: '+91 93700 88214',
      whatsapp: '+919370088214',
      email: 'anjali.deshpande@yahoo.com'
    },
    postedBy: 'Owner',
    createdAt: '2026-08-18T16:45:00Z',
    readyToMove: true,
    maintenanceMonthly: 1200,
    tags: ['0% Brokerage', 'Direct Owner', 'Family / Working Professionals', 'Osmanpura']
  },
  {
    id: 'prop-106',
    title: 'Industrial MIDC Plot inside AURIC Smart City Shendra Node',
    description: 'Strategically positioned manufacturing & logistics approved plot in AURIC Smart City, Shendra. Plug-and-play underground utilities, DMIC corridor connectivity, and 100 meters from the Samruddhi Mahamarg interchange.',
    price: 36000000,
    priceDisplay: '₹ 3.60 Crore',
    propertyType: 'Industrial / MIDC Plot',
    listingType: 'Buy',
    locality: 'Shendra MIDC / AURIC Smart City',
    address: 'Sector 14, Plot C-09, AURIC Shendra Smart Industrial City',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 21780,
    builtupArea: 21780,
    reraNumber: 'MH-AURIC-2025-IND',
    reraApproved: true,
    verified: true,
    zeroBrokerage: false,
    featured: true,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Underground Gas, Power & Recycled Water Grid',
      'Direct Expressway Link to Mumbai-Nagpur Samruddhi',
      'Single Window Clearance with MIDC & DMIC',
      'High Load Bearing Soil for Heavy Industry',
      'Optic Fiber SCADA Monitored Infrastructure'
    ],
    ownerContact: {
      name: 'Pooja Shinde - Sambhajinagar Prime Realty',
      phone: '+91 98811 44321',
      whatsapp: '+919881144321',
      email: 'pooja.shinde@auricity.in'
    },
    brokerId: 'realtor-03',
    postedBy: 'Broker',
    createdAt: '2026-08-19T08:15:00Z',
    readyToMove: true,
    aiEstimatedValue: {
      minPrice: 34000000,
      maxPrice: 38000000,
      fairPrice: 36000000,
      confidenceScore: 95,
      trend: 'High Demand'
    },
    tags: ['AURIC Smart City', 'Samruddhi Mahamarg Node', 'Industrial Green Zone']
  },
  {
    id: 'prop-107',
    title: 'Executive 3 BHK Penthouse with Private Terrace & Sky Deck',
    description: 'Top-floor architectural marvel in Seven Hills Cannought area. Features a 600 sq.ft private wooden deck terrace, Jacuzzi bath, smart home automation, and 360-degree city views.',
    price: 13500000,
    priceDisplay: '₹ 1.35 Crore',
    propertyType: 'Penthouse',
    listingType: 'Buy',
    locality: 'Seven Hills / Cannought Place',
    address: 'Penthouse 1201, The Cannought Grand, Near Seven Hills Circle',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 2100,
    builtupArea: 2850,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    furnishing: 'Fully Furnished',
    parking: '2+ Covered',
    floorNumber: 12,
    totalFloors: 12,
    reraNumber: 'P51500024981',
    reraApproved: true,
    verified: true,
    zeroBrokerage: false,
    featured: true,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      '600 Sq.Ft Private Landscaped Sky Deck',
      'Imported Italian Modular Kitchen',
      'Private Terrace Jacuzzi & BBQ Area',
      'Automated Climate & Curtain Controls',
      'Clubhouse, Infinity Pool & Squash Court'
    ],
    ownerContact: {
      name: 'Amitabh Deshmukh - Ajanta Properties',
      phone: '+91 94222 34567',
      whatsapp: '+919422234567',
      email: 'amitabh@ajantaproperties.com'
    },
    brokerId: 'realtor-02',
    postedBy: 'Broker',
    createdAt: '2026-08-20T12:00:00Z',
    readyToMove: true,
    maintenanceMonthly: 4000,
    tags: ['Luxury Penthouse', 'Private Terrace Deck', 'Seven Hills Prime']
  },
  {
    id: 'prop-108',
    title: 'Fertile 2 Acre Agricultural Land with Farmhouse Potential',
    description: 'High-yield sweet water well equipped agricultural parcel along Paithan Road. Touching tar road, electrified transformer nearby, rich black cotton soil suitable for pomegranate, sugarcane or weekend agri-tourism resort.',
    price: 7500000,
    priceDisplay: '₹ 75.0 Lakhs',
    propertyType: 'Agricultural Land',
    listingType: 'Buy',
    locality: 'Paithan Road / IT Park',
    address: 'Gut No. 124, Near Bidkin Industrial Growth Zone, Paithan Highway',
    city: 'Chhatrapati Sambhajinagar',
    carpetArea: 87120,
    builtupArea: 87120,
    reraApproved: false,
    verified: true,
    zeroBrokerage: true,
    featured: false,
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Perennial Sweet Water Well & Borewell',
      'Single Owner Clear 7/12 & 8A Record',
      'Fencing Done on All 4 Boundaries',
      'Touching State Highway Link Road',
      'Potential for Agri-tourism / Agro-Processing'
    ],
    ownerContact: {
      name: 'Balasaheb Shinde (Direct Owner)',
      phone: '+91 99210 55432',
      whatsapp: '+919921055432',
      email: 'balasaheb.agri@gmail.com'
    },
    postedBy: 'Owner',
    createdAt: '2026-08-21T07:30:00Z',
    readyToMove: true,
    tags: ['Agricultural 7/12', 'Paithan Road', '0% Brokerage', 'Water Abundant']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    name: 'AURIC Greens & Lifestyle Habitat',
    builderName: 'Kalyani Infrastructure & Homes',
    developer: 'Kalyani Infrastructure & Homes',
    locality: 'CIDCO N-1 to N-4',
    address: 'Near Prozone Mall, Airport Link Highway, CIDCO N-4',
    location: 'CIDCO N-4, Near Prozone Mall',
    city: 'Chhatrapati Sambhajinagar',
    priceRange: '₹ 62.5 L - ₹ 1.45 Cr',
    minPrice: 6250000,
    startingPrice: 6250000,
    maxPrice: 14500000,
    configurations: ['2 BHK Elite', '3 BHK Supreme', '4 BHK Duplex Penthouse'],
    reraId: 'P51500034928',
    reraNumber: 'P51500034928',
    completionDate: 'December 2026',
    possessionDate: 'December 2026',
    brochureUrl: '#',
    bannerImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    totalArea: '6.5 Acres',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Chhatrapati Sambhajinagar\'s most anticipated landmark residential township spread over 6.5 lush acres. Engineered with IGBC Green Building Gold Certification, 40+ curated lifestyle amenities, and zero-compromise privacy.',
    totalUnits: 280,
    availableUnits: 68,
    featured: true,
    exclusiveOffer: 'Special 0% Stamp Duty + Free Modular Kitchen for First 15 Bookings!',
    amenities: [
      'Grand 25,000 Sq.Ft Clubhouse',
      'Semi-Olympic Temperature Controlled Pool',
      'Cricket Simulator & Badminton Courts',
      'Senior Citizen Reflexology Park',
      'EV Car Fast Chargers in Basements',
      '3-Tier Security with Facial Recognition'
    ],
    status: 'Under Construction',
    developerContact: {
      phone: '+91 80105 06030',
      email: 'sales@kalyanigreens.com',
      salesOffice: 'AURIC Greens Experience Center, CIDCO N-4, Sambhajinagar'
    }
  },
  {
    id: 'proj-02',
    name: 'Samarth Imperial Heights',
    builderName: 'Samarth Land Developers Ltd',
    developer: 'Samarth Land Developers Ltd',
    locality: 'Beed Bypass Road',
    address: 'Survey No. 88, Near MIT College Junction, Beed Bypass',
    location: 'Beed Bypass Road, Near MIT College',
    city: 'Chhatrapati Sambhajinagar',
    priceRange: '₹ 75.0 L - ₹ 1.85 Cr',
    minPrice: 7500000,
    startingPrice: 7500000,
    maxPrice: 18500000,
    configurations: ['3 BHK Comfort', '3.5 BHK Royal', '4 BHK Sky Villas'],
    reraId: 'P51500029817',
    reraNumber: 'P51500029817',
    completionDate: 'Ready to Move',
    possessionDate: 'Ready to Move',
    brochureUrl: '#',
    bannerImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    totalArea: '4.2 Acres',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ready-to-move ultra-luxury residences on Beed Bypass overlooking the historic hill ranges. Designed for high-net-worth families seeking expansive living spaces with unmatched cross ventilation.',
    totalUnits: 140,
    availableUnits: 18,
    featured: true,
    exclusiveOffer: 'Instant Possession + Zero GST Benefit Applied',
    amenities: [
      'Sky Lounge on 16th Floor',
      'Banquet Hall with Kitchenette',
      'Yoga & Meditation Deck',
      'Covered Badminton Court',
      'Covered 2-Car Parking per flat'
    ],
    status: 'Ready to Move',
    developerContact: {
      phone: '+91 94222 34567',
      email: 'contact@samarthheights.in',
      salesOffice: 'Imperial Heights Sales Gallery, Beed Bypass Road'
    }
  },
  {
    id: 'proj-04',
    name: 'Godavari Riverfront Residences',
    builderName: 'Riverstone Developers', developer: 'Riverstone Developers', locality: 'Garkheda Parisar', address: 'Near Godavari Riverfront, Garkheda', location: 'Garkheda Parisar', city: 'Chhatrapati Sambhajinagar',
    priceRange: '₹ 48.0 L - ₹ 92.0 L', minPrice: 4800000, startingPrice: 4800000, maxPrice: 9200000, configurations: ['2 BHK Riverside', '3 BHK Riverside'], reraId: 'P51500041221', reraNumber: 'P51500041221', completionDate: 'September 2027', possessionDate: 'September 2027', brochureUrl: '#', bannerImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', totalArea: '3.8 Acres', images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'], description: 'Contemporary riverside residences with landscaped courts and everyday access to the city.', totalUnits: 180, availableUnits: 74, featured: true, exclusiveOffer: 'Free registration for early bookings', amenities: ['Riverside promenade', 'Clubhouse', 'EV charging'], status: 'Newly Launched', developerContact: { phone: '+91 80105 06030', email: 'sales@riverstone.in', salesOffice: 'Garkheda Experience Centre' }
  },
  {
    id: 'proj-05',
    name: 'Seven Hills Business Square',
    builderName: 'Sahyadri Commercial Ventures', developer: 'Sahyadri Commercial Ventures', locality: 'Seven Hills', address: 'Seven Hills, Jalna Road', location: 'Seven Hills', city: 'Chhatrapati Sambhajinagar',
    priceRange: '₹ 32.0 L - ₹ 1.10 Cr', minPrice: 3200000, startingPrice: 3200000, maxPrice: 11000000, configurations: ['Office Suites', 'Retail Shops'], reraId: 'P51500041222', reraNumber: 'P51500041222', completionDate: 'Ready to Move', possessionDate: 'Ready to Move', brochureUrl: '#', bannerImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', totalArea: '2.1 Acres', images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'], description: 'High-visibility commercial offices and retail spaces for growing local businesses.', totalUnits: 96, availableUnits: 21, featured: false, exclusiveOffer: 'Flexible payment plans', amenities: ['Visitor parking', 'Cafeteria', '24x7 security'], status: 'Ready to Move', developerContact: { phone: '+91 94222 34567', email: 'hello@sahyadri.in', salesOffice: 'Seven Hills Sales Office' }
  },
  {
    id: 'proj-06',
    name: 'Pride City Smart Habitat Phase 2',
    builderName: 'Pride Marathwada Builders',
    developer: 'Pride Marathwada Builders',
    locality: 'Shendra MIDC / AURIC Smart City',
    address: 'Near DMIC Administration Building, Shendra AURIC Node',
    location: 'Shendra AURIC Smart City Node',
    city: 'Chhatrapati Sambhajinagar',
    priceRange: '₹ 38.0 L - ₹ 65.0 L',
    minPrice: 3800000,
    startingPrice: 3800000,
    maxPrice: 6500000,
    configurations: ['1 BHK Smart', '2 BHK Compact', '2 BHK Premium'],
    reraId: 'P51500038411',
    reraNumber: 'P51500038411',
    completionDate: 'March 2027',
    possessionDate: 'March 2027',
    brochureUrl: '#',
    bannerImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    totalArea: '10 Acres',
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Affordable yet modern smart homes tailored for engineers, corporate executives, and investors working in the burgeoning AURIC Industrial Smart City & Shendra MIDC zone.',
    totalUnits: 360,
    availableUnits: 142,
    featured: false,
    exclusiveOffer: 'PMAY Subsidy benefit up to ₹2.67 Lakhs + ₹50,000 Booking Token',
    amenities: [
      'Solar Powered Common Area Lighting',
      'Daily Shuttle Bus to CIDCO Bus Stand',
      'Co-Working Pods with High-speed Wi-Fi',
      'Open Air Amphitheatre',
      'Convenience Supermarket On-site'
    ],
    status: 'Under Construction',
    developerContact: {
      phone: '+91 98811 44321',
      email: 'info@pridemarathwada.com',
      salesOffice: 'Pride City Phase 2 Sales Lounge, Shendra MIDC'
    }
  }
];

export const INITIAL_REALTORS: Realtor[] = [
  {
    id: 'realtor-01',
    name: 'Rajesh Patil',
    agencyName: 'Marathwada Real Estates & Mandates',
    specialty: 'CIDCO & Garkheda Specialist',
    email: 'rajesh.patil@auricity.in',
    phone: '+91 80105 06030',
    whatsapp: '+918010506030',
    reraNumber: 'A51500001892',
    experienceYears: 14,
    areasCovered: ['CIDCO N-1 to N-4', 'Jalna Road (Golden Mile)', 'Seven Hills / Cannought Place'],
    plan: 'Platinum Club',
    planTier: 'Platinum Club',
    planExpiry: '2027-08-30T00:00:00Z',
    kycStatus: 'Verified',
    verifiedBadge: true,
    showOnHomepage: true,
    featuredOrder: 1,
    activeListingsCount: 24,
    listingsQuota: 50,
    totalDeals: 148,
    rating: 4.9,
    reviewsCount: 86,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Premier real estate advisor and RERA registered broker in Chhatrapati Sambhajinagar since 2012. Specializing in luxury residences, high-yield commercial showrooms on Jalna Road, and institutional builder mandates.',
    slug: 'rajesh-patil-marathwada',
    websiteConfig: {
      enabled: true,
      heroTitle: 'Find Your Dream Home & High ROI Commercial Spaces in Sambhajinagar',
      tagline: '14+ Years of Trust, Transparent Dealings & 100% RERA Verified Inventory',
      themeColor: '#0f766e',
      aboutText: 'Marathwada Real Estates is committed to providing end-to-end property advisory with complete legal title search, fair valuation, and smooth registration assistance.',
      servicesOffered: [
        'Luxury Residential Sales & Resale',
        'Jalna Road Commercial Leasing',
        'Collector NA Plot Acquisitions',
        'Builder Mandate & Sole Selling Desk'
      ],
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    },
    joinedDate: '2024-01-15'
  },
  {
    id: 'realtor-02',
    name: 'Amitabh Deshmukh',
    agencyName: 'Ajanta Properties & Villa Consultants',
    specialty: 'Beed Bypass & Luxury Villas Expert',
    email: 'amitabh@ajantaproperties.com',
    phone: '+91 94222 34567',
    whatsapp: '+919422234567',
    reraNumber: 'A51500004928',
    experienceYears: 11,
    areasCovered: ['Beed Bypass Road', 'Garkheda Parisar', 'Satara Parisar / Beed Highway'],
    plan: 'Gold',
    planTier: 'Gold',
    planExpiry: '2026-12-31T00:00:00Z',
    kycStatus: 'Verified',
    verifiedBadge: true,
    showOnHomepage: true,
    featuredOrder: 2,
    activeListingsCount: 16,
    listingsQuota: 30,
    totalDeals: 92,
    rating: 4.8,
    reviewsCount: 54,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'Dedicated villa, penthouse and agricultural farm consultant focusing on Beed Bypass and South Sambhajinagar green belts.',
    slug: 'ajanta-properties-amitabh',
    websiteConfig: {
      enabled: true,
      heroTitle: 'Exclusive Villas, Penthouses & Farm Estates in Chhatrapati Sambhajinagar',
      tagline: 'Hand-picked luxury properties for discerning homeowners',
      themeColor: '#1e3a8a',
      aboutText: 'We represent high-net-worth individuals and NRIs seeking peaceful, secure, and upscale living in the historic city.',
      servicesOffered: [
        'Luxury Independent Villas',
        'Agricultural & Weekend Farms',
        'Home Loan Consultation & Approval'
      ]
    },
    joinedDate: '2024-03-20'
  },
  {
    id: 'realtor-03',
    name: 'Pooja Shinde',
    agencyName: 'Sambhajinagar Prime Realty & Industrial Hub',
    specialty: 'Industrial Waluj & Shendra MIDC Specialist',
    email: 'pooja.shinde@auricity.in',
    phone: '+91 98811 44321',
    whatsapp: '+919881144321',
    reraNumber: 'A51500009182',
    experienceYears: 8,
    areasCovered: ['Shendra MIDC / AURIC Smart City', 'Waluj MIDC Industrial Area', 'Chikalthana Industrial Area'],
    plan: 'Gold',
    planTier: 'Gold',
    planExpiry: '2026-11-15T00:00:00Z',
    kycStatus: 'Verified',
    verifiedBadge: true,
    showOnHomepage: true,
    featuredOrder: 3,
    activeListingsCount: 12,
    listingsQuota: 30,
    totalDeals: 64,
    rating: 4.7,
    reviewsCount: 38,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Industrial real estate specialist for AURIC Shendra Smart City, Waluj MIDC, and industrial warehousing projects.',
    slug: 'pooja-shinde-prime-realty',
    websiteConfig: {
      enabled: true,
      heroTitle: 'AURIC Smart City & MIDC Industrial Land Specialist',
      tagline: 'Accelerating industrial setups, manufacturing sheds, and warehouse acquisitions',
      themeColor: '#047857',
      aboutText: 'Single window liaisoning for MIDC clearances, collector non-agricultural sanctions, and industrial leases.',
      servicesOffered: [
        'MIDC Industrial Plot Allotments & Transfers',
        'Ready Warehousing & Logistics Leases',
        'Environmental & Industrial Approvals Liaison'
      ]
    },
    joinedDate: '2024-05-10'
  },
  {
    id: 'realtor-04',
    name: 'Vikramaditya Gaikwad',
    agencyName: 'Gaikwad Commercial Estates',
    specialty: 'Jalna Road Commercial & NA Plots',
    email: 'vikram.gaikwad@auricity.in',
    phone: '+91 98224 77112',
    whatsapp: '+919822477112',
    reraNumber: 'A51500012480',
    experienceYears: 16,
    areasCovered: ['Jalna Road (Golden Mile)', 'Seven Hills / Cannought Place', 'Mondha / Town Centre'],
    plan: 'Platinum Club',
    planTier: 'Platinum Club',
    planExpiry: '2027-04-10T00:00:00Z',
    kycStatus: 'Verified',
    verifiedBadge: true,
    showOnHomepage: true,
    featuredOrder: 4,
    activeListingsCount: 28,
    listingsQuota: 50,
    totalDeals: 180,
    rating: 4.9,
    reviewsCount: 112,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Senior institutional advisor specializing in prime bank leasing, retail flagship spaces, and Collector NA sanctioned plot layouts.',
    slug: 'vikram-gaikwad-commercial',
    websiteConfig: {
      enabled: true,
      heroTitle: 'High-Yield Commercial Real Estate & Town Centre Retail',
      tagline: 'Trusted by national retail brands and corporate banks in Sambhajinagar',
      themeColor: '#1E4FA8',
      aboutText: 'Specializing in commercial leasing and high ROI investments.',
      servicesOffered: ['Retail Flagship Spaces', 'Corporate Offices', 'Collector NA Plot Layouts']
    },
    joinedDate: '2023-11-10'
  },
  {
    id: 'realtor-05',
    name: 'Snehalata Kulkarni',
    agencyName: 'Heritage Urban Homes',
    specialty: 'Samarth Nagar & City Core Residences',
    email: 'snehalata.k@auricity.in',
    phone: '+91 94231 22889',
    whatsapp: '+919423122889',
    reraNumber: 'A51500015993',
    experienceYears: 9,
    areasCovered: ['Samarth Nagar & Nirala Bazar', 'Osmanpura / Station Road', 'Khokadpura'],
    plan: 'Gold',
    planTier: 'Gold',
    planExpiry: '2026-10-20T00:00:00Z',
    kycStatus: 'Verified',
    verifiedBadge: true,
    showOnHomepage: true,
    featuredOrder: 5,
    activeListingsCount: 14,
    listingsQuota: 30,
    totalDeals: 76,
    rating: 4.8,
    reviewsCount: 47,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Dedicated home consultant specializing in central city properties, family apartments, and ready-to-move redevelopment flats.',
    slug: 'snehalata-heritage-homes',
    websiteConfig: {
      enabled: true,
      heroTitle: 'Prime Downtown Living in Chhatrapati Sambhajinagar',
      tagline: 'Walkable, prestigious, and peaceful family homes in central localities',
      themeColor: '#b45309',
      aboutText: '100% verified documentation for traditional and prime residential sectors.',
      servicesOffered: ['Central City Apartments', 'Redevelopment Flats', 'Family Resale Homes']
    },
    joinedDate: '2024-02-14'
  },
  {
    id: 'realtor-06',
    name: 'Ketan Bhalerao',
    agencyName: 'Samarth Land & Township Desk',
    specialty: 'AURIC Smart City & Townships Specialist',
    email: 'ketan.bhalerao@auricity.in',
    phone: '+91 98901 88442',
    whatsapp: '+919890188442',
    reraNumber: 'A51500018820',
    experienceYears: 12,
    areasCovered: ['Shendra MIDC / AURIC Smart City', 'Chikalthana', 'Beed Bypass Road'],
    plan: 'Pro',
    planTier: 'Pro',
    planExpiry: '2026-09-30T00:00:00Z',
    kycStatus: 'Verified',
    verifiedBadge: true,
    showOnHomepage: true,
    featuredOrder: 6,
    activeListingsCount: 19,
    listingsQuota: 25,
    totalDeals: 88,
    rating: 4.7,
    reviewsCount: 52,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Township sales and smart infrastructure consultant assisting corporate executives and real estate investors with upcoming projects.',
    slug: 'ketan-bhalerao-smart-city',
    websiteConfig: {
      enabled: true,
      heroTitle: 'Smart Homes & Future-Ready Townships in Sambhajinagar',
      tagline: 'Capital growth opportunities along the DMIC industrial development corridor',
      themeColor: '#0369a1',
      aboutText: 'Authorized sales channel partner for major integrated townships.',
      servicesOffered: ['Gated Township Units', 'Future Growth Plots', 'Industrial Housing']
    },
    joinedDate: '2024-04-05'
  }
];

export const INITIAL_CLUB_CARDS_CONFIG: ClubCardsConfig = {
  sectionTitle: 'Grow Your Income with Auricity Exclusive Clubs',
  sectionSubtitle: 'Tailored programs for Sambhajinagar brokers, channel partners, and community referrers.',
  realtorsClub: {
    id: 'realtors_club',
    heading: "Auricity Realtor's Club",
    subheading: 'The Premium Professional Broker Network in Sambhajinagar',
    tagline: 'Join 150+ verified RERA agents enjoying verified buyer leads, marketing tools, and builder inventory sharing without middlemen interference.',
    badgeText: 'For Brokers & Agents',
    buttonText: 'Join Now',
    buttonLink: 'broker-hub',
    benefits: [
      'Direct access to verified home buyers across CIDCO, Beed Bypass & Garkheda',
      'Exclusive builder sole-selling mandates & institutional inventory sharing',
      'Custom branded digital profile & instant lead alerts on WhatsApp',
      'MahaRERA compliance training & legal title documentation support',
      'Zero commission cut by Auricity — 100% deal brokerage stays yours'
    ]
  },
  affiliatePartner: {
    id: 'affiliate_partner',
    heading: 'Auricity Affiliate Partner',
    subheading: 'Community Referral Program for Citizens & Professionals',
    tagline: 'Spot a property board or know someone buying, selling, or renting? Share the contact and earn generous spot bounty rewards upon closing.',
    badgeText: 'For Everyone & Referrers',
    buttonText: 'Join Now',
    buttonLink: 'affiliate-modal',
    benefits: [
      'Earn ₹5,000 to ₹25,000 reward per successful closed property deal',
      'Refer friends, family, or society sellers with a simple 2-click submission form',
      'Transparent real-time deal tracking dashboard & automated milestone alerts',
      'Instant direct UPI / Bank transfer payout upon deed registration',
      'No real estate license required — 100% open to all Sambhajinagar citizens'
    ]
  }
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-301',
    name: 'Dr. Swapnil Jadhav',
    phone: '+91 98224 88990',
    email: 'swapnil.jadhav@gmail.com',
    propertyId: 'prop-101',
    propertyTitle: 'Luxury 3 BHK High-Rise Apartment with Panoramic Hills View',
    budget: '₹ 85 L - 95 L',
    budgetMax: 9500000,
    leadType: 'Buy',
    preferredLocality: 'CIDCO N-1 to N-4',
    localityPreference: 'CIDCO N-1 to N-4',
    status: 'site_visit_scheduled',
    assignedBrokerId: 'realtor-01',
    assignedBrokerName: 'Rajesh Patil',
    createdAt: '2026-08-22T10:15:00Z',
    updatedAt: '2026-08-24T15:30:00Z',
    siteVisitDate: '2026-08-28',
    siteVisitTime: '11:30 AM',
    source: 'Property Inquiry',
    notes: [
      {
        id: 'note-1',
        author: 'Rajesh Patil',
        text: 'Spoke with Dr. Swapnil. He is looking for a 3BHK flat near Prozone Mall for his parents. Confirmed site visit for Friday 11:30 AM.',
        timestamp: '2026-08-24T15:30:00Z',
        type: 'Call'
      }
    ]
  },
  {
    id: 'lead-302',
    name: 'Mahesh Kadam (Auto Component Manufacturer)',
    phone: '+91 94237 11223',
    email: 'kadam.industries@gmail.com',
    propertyId: 'prop-106',
    propertyTitle: 'Industrial MIDC Plot inside AURIC Smart City Shendra Node',
    budget: '₹ 3.5 Cr - 4.0 Cr',
    budgetMax: 40000000,
    leadType: 'Buy',
    preferredLocality: 'Shendra MIDC / AURIC Smart City',
    localityPreference: 'Shendra MIDC / AURIC Smart City',
    status: 'contacted',
    assignedBrokerId: 'realtor-03',
    assignedBrokerName: 'Pooja Shinde',
    createdAt: '2026-08-23T14:40:00Z',
    updatedAt: '2026-08-24T09:20:00Z',
    source: 'Website Search',
    notes: [
      {
        id: 'note-2',
        author: 'Pooja Shinde',
        text: 'Sent AURIC Shendra plot master plan and DMIC substation layout via WhatsApp. Follow-up scheduled for Monday.',
        timestamp: '2026-08-24T09:20:00Z',
        type: 'WhatsApp'
      }
    ]
  },
  {
    id: 'lead-303',
    name: 'Suhasini Kale',
    phone: '+91 97632 99881',
    email: 'suhasini.kale@outlook.com',
    propertyId: 'prop-102',
    propertyTitle: 'Sprawling 4 BHK Independent Royal Villa with Private Garden',
    budget: '₹ 2.2 Cr - 2.5 Cr',
    budgetMax: 25000000,
    leadType: 'Buy',
    preferredLocality: 'Beed Bypass Road',
    localityPreference: 'Beed Bypass Road',
    status: 'negotiation',
    assignedBrokerId: 'realtor-02',
    assignedBrokerName: 'Amitabh Deshmukh',
    createdAt: '2026-08-18T11:00:00Z',
    updatedAt: '2026-08-25T17:10:00Z',
    source: 'Site Visit Form',
    notes: [
      {
        id: 'note-3',
        author: 'Amitabh Deshmukh',
        text: 'Family loved the private garden and Vastu direction. Negotiating with the owner regarding the inclusion of imported chandeliers and inverter.',
        timestamp: '2026-08-25T17:10:00Z',
        type: 'Negotiation'
      }
    ]
  },
  {
    id: 'lead-304',
    name: 'Rohit Agrawal',
    phone: '+91 99230 44556',
    email: 'rohit.agrawal@gmail.com',
    budget: '₹ 50 L - 65 L',
    budgetMax: 6500000,
    leadType: 'Buy',
    preferredLocality: 'Garkheda Parisar',
    localityPreference: 'Garkheda Parisar',
    status: 'new',
    createdAt: '2026-08-25T19:30:00Z',
    updatedAt: '2026-08-25T19:30:00Z',
    source: 'Valuation Tool',
    notes: []
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-901',
    orderId: 'ORD_RAZ_20260815_01',
    realtorId: 'realtor-01',
    realtorName: 'Rajesh Patil',
    planName: 'Platinum Club',
    amount: 14999,
    currency: 'INR',
    status: 'Success',
    gateway: 'Razorpay',
    paymentMethod: 'UPI (Google Pay)',
    timestamp: '2026-08-15T12:30:00Z',
    invoiceNumber: 'INV-AURI-2026-0881'
  },
  {
    id: 'tx-902',
    orderId: 'ORD_CASH_20260818_04',
    realtorId: 'realtor-02',
    realtorName: 'Amitabh Deshmukh',
    planName: 'Gold',
    amount: 6999,
    currency: 'INR',
    status: 'Success',
    gateway: 'Cashfree',
    paymentMethod: 'Net Banking (HDFC)',
    timestamp: '2026-08-18T16:20:00Z',
    invoiceNumber: 'INV-AURI-2026-0894'
  },
  {
    id: 'tx-903',
    orderId: 'ORD_RAZ_20260822_09',
    realtorId: 'realtor-03',
    realtorName: 'Pooja Shinde',
    planName: 'Property Boost',
    amount: 1499,
    currency: 'INR',
    status: 'Success',
    gateway: 'Razorpay',
    paymentMethod: 'Credit Card (ICICI)',
    timestamp: '2026-08-22T09:10:00Z',
    invoiceNumber: 'INV-AURI-2026-0912'
  }
];

export const INITIAL_DLT_TEMPLATES: DltSmsTemplate[] = [
  {
    id: 'dlt-tpl-01',
    templateName: 'New Lead Instant Alert to Realtor',
    dltTemplateId: 'DLT_1407168920192834',
    senderId: 'AURCTY',
    category: 'Lead_Alert',
    messagePattern: 'Dear {#var#}, you received a new high-intent inquiry for {#var#} from {#var#} (Phone: {#var#}). Please login to Auricity CRM to follow up. - AURICITY',
    active: true
  },
  {
    id: 'dlt-tpl-02',
    templateName: 'Site Visit Confirmation to Buyer',
    dltTemplateId: 'DLT_1407168920192835',
    senderId: 'AURIRE',
    category: 'Visit_Confirmation',
    messagePattern: 'Namaste {#var#}, your property site visit for {#var#} in Chhatrapati Sambhajinagar is scheduled on {#var#} at {#var#}. Your verified guide is {#var#} ({#var#}). - AURICITY',
    active: true
  },
  {
    id: 'dlt-tpl-03',
    templateName: 'Property Approval / Live Notification',
    dltTemplateId: 'DLT_1407168920192836',
    senderId: 'AURCTY',
    category: 'Moderation_Status',
    messagePattern: 'Congratulations! Your property "{#var#}" has been reviewed & approved by Auricity Super Admin and is now LIVE to thousands of active buyers in Sambhajinagar. - AURICITY',
    active: true
  },
  {
    id: 'dlt-tpl-04',
    templateName: 'Realtor Plan Subscription Renewal',
    dltTemplateId: 'DLT_1407168920192837',
    senderId: 'AURCTY',
    category: 'Subscription',
    messagePattern: 'Thank you {#var#}! Your Auricity {#var#} Broker Subscription has been activated successfully. Order ID: {#var#}. Access CRM & Mini-Site now. - AURICITY',
    active: true
  }
];

export const INITIAL_DLT_LOGS: DltSmsLog[] = [
  {
    id: 'sms-log-01',
    templateId: 'dlt-tpl-01',
    recipientPhone: '+91 80105 06030',
    content: 'Dear Rajesh Patil, you received a new high-intent inquiry for Luxury 3 BHK High-Rise Apartment from Dr. Swapnil Jadhav (Phone: +91 98224 88990). Please login to Auricity CRM to follow up. - AURICITY',
    status: 'Delivered',
    timestamp: '2026-08-24T15:30:00Z',
    dltReferenceId: 'DLT_DEL_88492019'
  },
  {
    id: 'sms-log-02',
    templateId: 'dlt-tpl-02',
    recipientPhone: '+91 98224 88990',
    content: 'Namaste Dr. Swapnil Jadhav, your property site visit for SkyHeights N-4 in Chhatrapati Sambhajinagar is scheduled on 28-Aug-2026 at 11:30 AM. Your verified guide is Rajesh Patil (+91 80105 06030). - AURICITY',
    status: 'Delivered',
    timestamp: '2026-08-24T15:35:00Z',
    dltReferenceId: 'DLT_DEL_88492024'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = CATEGORIZED_SERVICES;

export const INITIAL_SERVICE_BOOKINGS: ServiceBooking[] = [
  {
    id: 'sb-01',
    serviceId: 'srv-01',
    serviceTitle: '30-Year Title Search & Legal Clearance Certificate',
    customerName: 'Anil Deshpande',
    phone: '+91 98221 44556',
    email: 'anil.deshpande@gmail.com',
    locality: 'CIDCO N-4',
    preferredDate: '2026-08-28',
    status: 'In_Progress',
    amount: 4499,
    notes: 'Plot in N-4 CIDCO. Customer needs search report for SBI mortgage.',
    createdAt: '2026-08-24T11:00:00Z'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'How AURIC Smart City & Samruddhi Mahamarg Are Boosting Sambhajinagar Real Estate in 2026',
    slug: 'auric-smart-city-samruddhi-real-estate-boom-2026',
    excerpt: 'The convergence of DMIC industrial growth, electric vehicle clusters in Shendra-Bidkin, and 4-hour travel time to Mumbai is driving exponential property appreciation across Chhatrapati Sambhajinagar.',
    content: `### The Transformational Growth of Chhatrapati Sambhajinagar\n\nChhatrapati Sambhajinagar (formerly Aurangabad) has rapidly transitioned from a historic tourism hub to Maharashtra's premier industrial and smart city powerhouse.\n\n#### 1. The Impact of Samruddhi Mahamarg\nWith the Hindu Hrudaysamrat Balasaheb Thackeray Maharashtra Samruddhi Mahamarg fully operational, logistics travel time between Sambhajinagar and Mumbai/JNPT Port has plummeted from 10 hours to under 4.5 hours. This logistical revolution has made the city the top choice for national warehousing and component manufacturing.\n\n#### 2. AURIC Smart City: The Crown Jewel of DMIC\nAURIC (Aurangabad Industrial City) spread over 10,000 acres across Shendra and Bidkin is India's first greenfield industrial smart city. With anchor investments from global EV manufacturers, engineering giants, and pharmaceutical leaders, over 75,000 high-income industrial jobs are being created.\n\n#### 3. Top Residential Hotspots to Watch\n* **CIDCO N-1 to N-8:** Steady capital appreciation (8-11% YoY) driven by established social infrastructure, Prozone Mall, and airport connectivity.\n* **Beed Bypass & Satara Parisar:** Rapidly developing luxury villa hubs and gated communities with hill-facing views.\n* **Jalna Road (Golden Mile):** Premium commercial rental yields ranging between 7.5% and 9% annually.`,
    category: 'AURIC & Infrastructure',
    author: 'Adv. Rajesh Patil',
    authorRole: 'Senior Property Legal Analyst',
    readTimeMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-15',
    published: true,
    tags: ['AURIC City', 'Samruddhi Mahamarg', 'Investment 2026', 'CIDCO']
  },
  {
    id: 'blog-02',
    title: 'Maharashtra Ready Reckoner Rates 2026: Stamp Duty & Registration Guide for Sambhajinagar',
    slug: 'maharashtra-ready-reckoner-stamp-duty-guide-sambhajinagar',
    excerpt: 'Understand how circle rates affect your property buying budget in CIDCO, Garkheda, and Jalna Road, plus special concessions available for women homebuyers in Maharashtra.',
    content: `### Understanding Ready Reckoner Rates in Sambhajinagar\n\nThe Ready Reckoner (RR) rate is the minimum valuation at which a property can be registered in Maharashtra. Understanding these values ensures buyers avoid tax penalties under Section 56(2)(x) of the Income Tax Act.\n\n#### Stamp Duty Slabs in Chhatrapati Sambhajinagar\n1. **Male Buyers:** 6% (5% Stamp Duty + 1% Local Body Surcharge / LBT)\n2. **Female Buyers:** 5% (1% Concession granted by Government of Maharashtra on residential units)\n3. **Joint Registration (Husband + Wife):** 5.5% average\n4. **Standard Registration Fee:** 1% of market value (Capped at ₹30,000 for properties above ₹30 Lakhs)\n\n#### Key Locality Ready Reckoner Benchmarks (2026 Indicative)\n* **CIDCO Commercial (Jalna Road Frontage):** ₹58,000 - ₹75,000 / Sq. Meter\n* **CIDCO Residential (N-1 to N-5):** ₹34,000 - ₹46,000 / Sq. Meter\n* **Beed Bypass Residential Plots:** ₹18,000 - ₹28,000 / Sq. Meter\n* **Shendra Industrial Zones:** ₹8,500 - ₹14,000 / Sq. Meter`,
    category: 'Legal & RERA',
    author: 'CA Snehal Deshpande',
    authorRole: 'Real Estate Tax Consultant',
    readTimeMinutes: 4,
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-10',
    published: true,
    tags: ['Ready Reckoner', 'Stamp Duty', 'Registration', 'Tax Guide']
  },
  {
    id: 'blog-03',
    title: 'MahaRERA Checklist: 7 Essential Documents Every Homebuyer in Sambhajinagar Must Verify',
    slug: 'maharera-checklist-7-documents-before-buying-sambhajinagar',
    excerpt: 'Avoid disputes by checking 7/12 extract ferfar, Commencement Certificate (CC), Title Search, and RERA quarterly progress reports before giving any booking token.',
    content: `### Protect Your Life Savings with MahaRERA Due Diligence\n\nBuying a home is one of life\'s biggest financial decisions. Before transferring any token amount to a developer or seller in Sambhajinagar, verify this 7-point checklist.\n\n1. **MahaRERA Project Registration Certificate & QR Code:** Verify on the official maharera.mahaonline.gov.in portal that the project registration is active and not in default.\n2. **Title Certificate & 30-Year Search Report:** Prepared and signed by an advocate confirming marketable, encumbrance-free title.\n3. **Commencement Certificate (CC):** Issued by the Chhatrapati Sambhajinagar Municipal Corporation (CSMC) or CIDCO authorizing construction up to the specific floor you are booking.\n4. **Sanctioned Layout & Floor Plans:** Ensure the apartment layout corresponds exactly with the building plan approved by town planning authorities.\n5. **RERA Bank Account Details:** Ensure all payments are routed strictly into the dedicated escrow account listed on MahaRERA.\n6. **7/12 & PR Card Extract:** Showing developer or land owner name with clean mutation entries (Ferfar).\n7. **Draft Agreement for Sale (Allotment Letter):** Must conform to the standard MahaRERA Model Agreement without unilateral penalty clauses.`,
    category: 'Buyer Guide',
    author: 'Adv. Suresh Kulkarni',
    authorRole: 'RERA Compliance Advocate',
    readTimeMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-05',
    published: true,
    tags: ['MahaRERA', 'Buyer Rights', 'Due Diligence', 'Legal Check']
  }
];

export const INITIAL_LEGAL_PAGES: LegalDocument[] = [
  {
    id: 'leg-01',
    slug: 'terms-of-service',
    title: 'Terms of Service & Platform User Agreement',
    lastUpdated: 'August 2026',
    version: '2.4',
    sections: [
      {
        heading: '1. Platform Overview & Scope',
        body: 'Auricity (operated as Auricity PropTech Ecosystem) provides digital real estate discovery, broker CRM, and property moderation software for the Chhatrapati Sambhajinagar (Aurangabad) regional market. Users accessing our portal, listing properties, or booking services agree to these terms.'
      },
      {
        heading: '2. Listing Accuracy & Owner Representations',
        body: 'Users and brokers submitting properties agree that all photographs, carpet area figures, pricing, and RERA registration numbers are genuine and non-misleading. Auricity Super Admin moderation reserves the right to reject, modify, or permanently suspend any listing that violates verified guidelines.'
      },
      {
        heading: '3. Broker Subscription & Commercial Terms',
        body: 'Brokers subscribed to Silver, Gold, or Platinum Club tiers are granted quota-based listing privileges, lead access, and mini-website generation. Subscription fees processed via Razorpay or Cashfree are non-refundable once activated.'
      }
    ]
  },
  {
    id: 'leg-02',
    slug: 'privacy-policy',
    title: 'Privacy & Data Protection Policy',
    lastUpdated: 'August 2026',
    version: '2.1',
    sections: [
      {
        heading: '1. Data Collection & Phone Number Usage',
        body: 'We collect name, contact phone numbers, email addresses, and property search preferences strictly for facilitating legitimate real estate inquiries and sending transactional DLT SMS notifications.'
      },
      {
        heading: '2. No Third-Party Spam Guarantee',
        body: 'Auricity does not sell, rent, or lease personal user contact information to unrelated third-party marketing telemarketers. Lead information is shared solely with the assigned RERA-verified broker or property owner whom the user specifically chooses to contact.'
      }
    ]
  },
  {
    id: 'leg-03',
    slug: 'broker-code-of-conduct',
    title: 'Realtor Code of Conduct & RERA Ethics Guidelines',
    lastUpdated: 'August 2026',
    version: '1.8',
    sections: [
      {
        heading: '1. MahaRERA Registration Mandatory',
        body: 'All real estate agents operating on Auricity must possess a valid MahaRERA Agent Registration Number. Agents must clearly display this on their Mini-Websites and property listings.'
      },
      {
        heading: '2. 0% Brokerage & Fee Transparency',
        body: 'When a listing is marked with the "0% Brokerage" tag, the agent or owner is strictly prohibited from demanding any commission or hidden service charges from the buyer or tenant.'
      }
    ]
  }
];

export const INITIAL_PLATFORM_SETTINGS: PlatformSettings = {
  superAdminPin: '9999',
  portalName: 'Auricity Developers',
  brandTagline: '0% Brokerage | 100% Trust',
  supportPhone: '+91 8010506030',
  supportEmail: 'info@auricity.com',
  officeAddress: 'Chhatrapati Sambhajinagar - 431001, Maharashtra',
  referralWhatsappNumber: '+918010506030',
  referralDeskPhone: '+91 80105 06030',
  enableWhatsAppAlerts: true,
  enableAiValuation: true,
  platformCommissionPercentage: 1.0,
  zeroBrokerageFee: 0,
  paymentGateway: {
    activeProvider: 'Razorpay',
    testMode: true,
    razorpayKeyId: 'rzp_test_auricity_live_2026',
    cashfreeAppId: 'cf_app_auricity_prod_881'
  },
  dltConfig: {
    defaultSenderId: 'AURCTY',
    entityId: '1101552940291029',
    smsGatewayActive: true
  },
  enableInstantWhatsapp: true,
  autoApproveVerifiedBrokers: false,
  aiValuationSettings: {
    avgBaseRatePerSqft: 4650,
    appreciationFactorAnnual: 8.5,
    localityMultipliers: {
      'CIDCO N-1 to N-4': 1.25,
      'Jalna Road (Golden Mile)': 1.35,
      'Beed Bypass Road': 1.15,
      'Shendra MIDC / AURIC Smart City': 1.30,
      'Garkheda Parisar': 1.18,
      'Samarth Nagar & Nirala Bazar': 1.40
    }
  }
};

export const INITIAL_SERVICE_PROVIDERS: ServiceProviderRegistration[] = [
  {
    id: 'sp-01',
    name: 'Ar. Rajeshwar Kulkarni',
    businessName: 'Kulkarni & Associates Architects',
    serviceCategory: 'Architect',
    serviceId: 'srv-02',
    phone: '+91 98224 55112',
    email: 'kulkarni.architects@gmail.com',
    officeAddress: 'Plot 42, Town Centre, CIDCO, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'CIDCO N-1 to N-4',
    area: 'Town Centre',
    experienceYears: 16,
    description: 'Specializing in residential bungalow blueprints, high-rise architectural sanctioning with CIDCO Town Planning, and Vastu compliance.',
    bio: 'Council of Architecture (COA) certified firm with 120+ sanctioned residential & commercial landmarks in Sambhajinagar.',
    documents: ['COA Registration CA/2008/44129', 'GST Certificate', 'CIDCO Empanelled License'],
    portfolioUrl: 'https://kulkarni-architects.auricity.in',
    website: 'https://kulkarni-architects.auricity.in',
    registrationDate: '2026-08-10',
    status: 'approved',
    rating: 4.9,
    verifiedBadge: true,
    published: true,
    notes: 'Premier architectural firm with 120+ sanctioned projects in Sambhajinagar.',
    approvedAt: '2026-08-12'
  },
  {
    id: 'sp-02',
    name: 'Pt. Vijayendra Joshi',
    businessName: 'Vastu Vigyan Kendra',
    serviceCategory: 'Vastu Consultant',
    serviceId: 'srv-04',
    phone: '+91 94227 88990',
    email: 'vastu.sambhajinagar@gmail.com',
    officeAddress: 'Shop 14, Cannought Place, CIDCO N-4, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'CIDCO N-1 to N-4',
    area: 'Cannought Place',
    experienceYears: 22,
    description: 'Vedic Vastu Shastra consultation for commercial office layouts, residential plots, and industrial plant orientations in Shendra & Waluj MIDC.',
    bio: 'Gold medalist Vastu Visharad with 350+ commercial & residential consultations across Marathwada. Zero structural breakage solutions.',
    documents: ['Vastu Visharad Sanad', 'Identity Proof'],
    registrationDate: '2026-08-18',
    status: 'approved',
    rating: 4.8,
    verifiedBadge: true,
    published: true,
    notes: 'Consulted for over 350+ commercial & residential units across Marathwada.',
    approvedAt: '2026-08-19'
  },
  {
    id: 'sp-03',
    name: 'Decora Luxury Interiors',
    businessName: 'Decora Interiors Pvt Ltd',
    serviceCategory: 'Interior Designer',
    serviceId: 'srv-03',
    phone: '+91 88882 11993',
    email: 'contact@decorainteriors.in',
    officeAddress: 'Station Road, Near Osmanpura Circle, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Samarth Nagar & Nirala Bazar',
    area: 'Osmanpura',
    experienceYears: 9,
    description: 'Turnkey 2BHK/3BHK modular kitchens, false ceiling, acoustic panelling, and Italian wardrobe designs with 10-year warranty.',
    bio: 'Modern interior design studio with in-house automated factory for high-pressure laminate & PU acrylic modular furniture.',
    documents: ['MSME Registration', 'Portfolio PDF', 'GSTIN'],
    portfolioUrl: 'https://decorainteriors.auricity.in',
    website: 'https://decorainteriors.auricity.in',
    registrationDate: '2026-08-22',
    status: 'approved',
    rating: 4.7,
    verifiedBadge: true,
    published: true,
    notes: 'Application approved with 15 completed project showcases.'
  },
  {
    id: 'sp-04',
    name: 'Marathwada Infra & Construction Co.',
    businessName: 'Marathwada Infra Build LLP',
    serviceCategory: 'Construction Contractor',
    serviceId: 'srv-05',
    phone: '+91 94231 66774',
    email: 'marathwada.infra@yahoo.com',
    officeAddress: 'MIDC Road, Waluj Industrial Area, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Waluj Industrial Area',
    area: 'MIDC Sector B',
    experienceYears: 14,
    description: 'Civil construction, RCC structural works, industrial shed fabrication, and turnkey residential villa construction with PWD Class 1 standards.',
    bio: 'PWD Class-1 registered civil contractors with 45+ completed bungalows and commercial shopping complexes.',
    documents: ['PWD Class 1 Contractor License', 'Labor License', 'GSTIN'],
    registrationDate: '2026-08-24',
    status: 'approved',
    rating: 4.8,
    verifiedBadge: true,
    published: true,
    notes: 'Approved after verification of PWD Class-1 contractor certificate.'
  },
  {
    id: 'sp-05',
    name: 'Adv. Suresh Deshpande',
    businessName: 'Deshpande Legal Associates',
    serviceCategory: 'Legal & Documentation',
    serviceId: 'srv-01',
    phone: '+91 98220 33412',
    email: 'deshpande.advocates@yahoo.in',
    officeAddress: 'Court Road, Adalat Road, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Jalna Road (Golden Mile)',
    area: 'Adalat Road',
    experienceYears: 24,
    description: 'High Court advocate specializing in Maharashtra property law, 30-year title searches, RERA consumer appeals, and Sub-Registrar deed registrations.',
    bio: '24 years of legal practice at District & Sessions Court and Bombay High Court Aurangabad Bench.',
    documents: ['Bar Council of Maharashtra Enrollment', 'Sanad Certificate'],
    registrationDate: '2026-08-05',
    status: 'approved',
    rating: 4.9,
    verifiedBadge: true,
    published: true,
    notes: 'Senior empanelled advocate for Auricity legal due diligence.'
  },
  {
    id: 'sp-06',
    name: 'Ajanta Paint Care & Waterproofing',
    businessName: 'Ajanta Surface Solutions',
    serviceCategory: 'Painting Contractor',
    serviceId: 'srv-06',
    phone: '+91 94033 88123',
    email: 'ajanta.paints@gmail.com',
    officeAddress: 'Shop 8, Garkheda Main Road, Chhatrapati Sambhajinagar',
    city: 'Chhatrapati Sambhajinagar',
    locality: 'Garkheda Parisar',
    area: 'Garkheda',
    experienceYears: 11,
    description: 'Asian Paints certified applicators, exterior Apex Ultima waterproofing, roof PU coatings, and mechanized dust-free painting.',
    bio: 'Asian Paints Master Applicator certified team covering 500+ homes and societies in Sambhajinagar.',
    documents: ['Asian Paints Applicator Certificate', 'Aadhaar Card'],
    registrationDate: '2026-08-15',
    status: 'approved',
    rating: 4.7,
    verifiedBadge: true,
    published: true,
    notes: 'Approved applicator with high customer satisfaction score.'
  }
];

export const INITIAL_REFERRALS: PropertyReferral[] = [
  {
    id: 'ref-101',
    referrerName: 'Aniket Deshmukh',
    referrerPhone: '+91 98231 44556',
    referrerEmail: 'aniket.d@gmail.com',
    propertyType: 'Commercial Shop',
    location: 'Opposite Prozone Mall, Main CIDCO N-1 Road',
    locality: 'CIDCO N-1 to N-4',
    ownerName: 'Shri Babanrao Patil',
    ownerPhone: '+91 94221 33445',
    approxPrice: '₹ 45,000 / month Rent',
    estimatedValue: '₹ 45,000 / month Rent',
    listingNature: 'Rent',
    propertyImages: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80'
    ],
    additionalDetails: 'Corner shop on prime commercial stretch. Board placed yesterday for To Let / Lease. Approx 450 sq.ft carpet with water connection.',
    submittedAt: '2026-08-24T14:30:00Z',
    status: 'assigned',
    assignedBrokerId: 'realtor-01',
    assignedBrokerName: 'Rajesh Patil',
    dealStatus: 'In Negotiation',
    dealAmount: 540000,
    commissionAmount: 45000,
    referralReward: 10000,
    brokerShare: 35000,
    payoutStatus: 'Pending',
    adminNotes: 'Called owner, verified that shop is available for lease at ₹45k/month. Handed over to Rajesh Patil.',
    outcomeNotes: 'Site inspection conducted on 25 Aug with prospective pharmacy tenant.',
    commissionOutcome: '₹ 10,000 Spot Referral Incentive upon lease registration.'
  },
  {
    id: 'ref-102',
    referrerName: 'Pooja Kale',
    referrerPhone: '+91 88055 99221',
    referrerEmail: 'poojakale92@gmail.com',
    propertyType: 'Independent House / Villa',
    location: 'Plot 78, Gulmohar Colony, Beed Bypass',
    locality: 'Beed Bypass Road',
    ownerName: 'Col. S. K. Shinde (Retd.)',
    ownerPhone: '+91 98900 11223',
    approxPrice: '₹ 1.25 Crore',
    estimatedValue: '₹ 1.25 Crore',
    listingNature: 'Sale',
    propertyImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ],
    additionalDetails: 'Direct owner sale board spotted outside 4 BHK independent bungalow. Clear NA-47 sanctioned title with borewell.',
    submittedAt: '2026-08-25T09:15:00Z',
    status: 'under_review',
    dealStatus: 'Open',
    adminNotes: 'Super Admin reviewing property photo and title search details before broker allocation.',
    commissionOutcome: '₹ 25,000 Spot Referral Bounty upon deal closure.'
  },
  {
    id: 'ref-103',
    referrerName: 'Mahesh Solanke',
    referrerPhone: '+91 91588 33441',
    referrerEmail: 'mahesh.solanke@gmail.com',
    propertyType: 'Industrial / MIDC Plot',
    location: 'Sector 18, Shendra AURIC Smart City Industrial Belt',
    locality: 'Shendra MIDC / AURIC Smart City',
    ownerName: 'M/s Marathwada Logistics Hub',
    ownerPhone: '+91 98220 77112',
    approxPrice: '₹ 3.80 Crore',
    estimatedValue: '₹ 3.80 Crore',
    listingNature: 'Sale',
    propertyImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    additionalDetails: '2.5 Acre industrial plot with power substation connectivity. Suitable for auto component manufacturing or warehousing.',
    submittedAt: '2026-08-25T17:45:00Z',
    status: 'new',
    dealStatus: 'Open',
    adminNotes: 'New referral submission received via crowd lead.',
    commissionOutcome: 'High-Ticket Industrial Referral Tier (₹50,000 Bounty)'
  }
];

export const INITIAL_OFFERS: OfferItem[] = [
  {
    id: 'off-01',
    title: 'Zero Stamp Duty & Registration Festival',
    subtitle: '100% government registration charges absorbed by builder for first 15 bookings',
    tag: '0% STAMP DUTY',
    discountTag: '0% Stamp Duty',
    discountValue: '100% Stamp Duty Waiver',
    description: 'Auricity Developers covers entire stamp duty charges on spot registration for selected township units.',
    validTill: '2026-11-30',
    applicableProjects: ['proj-01', 'proj-02'],
    applicableLocalities: ['CIDCO N-1 to N-4', 'Jalna Road (Golden Mile)'],
    bannerUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    terms: 'Applicable exclusively on 2 BHK and 3 BHK standard configurations upon initial token booking.',
    published: true,
    featured: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'off-02',
    title: 'AURIC Industrial Plot Special - 2 Year Tax Subsidy Assistance',
    subtitle: 'Direct facilitation of Marathwada Industrial Policy Subsidies and zero processing fee',
    tag: 'AURIC SPECIAL',
    discountTag: 'Subsidized Industrial Clearance',
    discountValue: 'Single Window Clearance',
    description: 'Complete facilitation of industrial subsidies and MIDC clearances for businesses in AURIC Shendra.',
    validTill: '2026-12-31',
    applicableProjects: ['proj-03'],
    applicableLocalities: ['Shendra MIDC / AURIC Smart City'],
    bannerUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    terms: 'Valid for MSMEs and EV/Electronics ancillaries establishing units in AURIC Shendra phase 1.',
    published: true,
    featured: false,
    createdAt: '2026-08-15'
  }
];

export const INITIAL_TRAINING_BLOGS: TrainingBlog[] = [
  {
    id: 'tb-01',
    title: 'MahaRERA Agent Compliance: Rules for Advertisement & Form 4 Verification',
    slug: 'maharera-agent-compliance-guide',
    excerpt: 'Detailed checklist for Sambhajinagar brokers to ensure every flyer, social post, and billboard complies with MahaRERA circular 24/2023.',
    content: `### 1. Mandatory Display of MahaRERA Agent Number\nEvery certified real estate agent operating in Maharashtra must prominently mention their 12-digit agent registration number along with the official website URL (https://maharera.mahaonline.gov.in) in all marketing collateral.\n\n### 2. Form 4 Quarterly Filing\nBrokers facilitating sales in registered new projects must maintain transaction records and upload quarterly compliance declarations to safeguard against license revocation.\n\n### 3. Clear Title Due Diligence\nBefore listing any independent plot in Beed Bypass or Satara Parisar, always verify:\n- 7/12 Extract (Satbara) with mutation entries\n- Town Planning (TP) Sanctioned Layout\n- NA-47 conversion order issued by the Collectorate`,
    category: 'MahaRERA Compliance',
    author: 'Auricity Legal & Compliance Desk',
    readTimeMinutes: 6,
    readingTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-14',
    published: true,
    tags: ['MahaRERA', 'Compliance', 'RERA Law', 'Legal Sanction'],
    targetAudience: 'realtor_academy',
    createdAt: '2026-08-14T10:00:00Z'
  },
  {
    id: 'tb-02',
    title: 'Closing High-Ticket Industrial Deals in AURIC Shendra & Bidkin',
    slug: 'closing-industrial-deals-auric',
    excerpt: 'Proven client presentation frameworks for MNC supply-chain directors looking for plug-and-play smart city plots.',
    content: `### Understanding AURIC Smart City Infrastructure\nAURIC Shendra offers 24x7 recycled water supply, underground electrical cabling with dual grid redundancies, and optical fiber broadband to plot boundaries.\n\n### Key Talking Points for Industrial Clients:\n1. Proximity to Samruddhi Mahamarg (Mumbai-Nagpur Expressway interchange).\n2. DMIC (Delhi Mumbai Industrial Corridor) single-window fast-track licensing.\n3. Plug-and-play water treatment plants with zero liquid discharge standards.`,
    category: 'Sales Mastery',
    author: 'Adv. Suresh Deshpande (Industrial Land Consultant)',
    readTimeMinutes: 8,
    readingTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-20',
    published: true,
    tags: ['AURIC', 'Industrial Real Estate', 'Sales Strategy', 'Marathwada Growth'],
    targetAudience: 'realtor_academy',
    createdAt: '2026-08-20T11:00:00Z'
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContentConfig = {
  heroTitle: 'Find Your Verified Dream Property in Chhatrapati Sambhajinagar',
  heroSubtitle: 'Direct Developer Townships, Premium Plots, Commercial Hubs & Verified Residences with 0% Brokerage Guarantee.',
  heroHeadline: 'Architectural Living & Verified MahaRERA Real Estate',
  heroSubheadline: 'Discover verified apartments, luxury row houses, commercial spaces, and NA 44 collector plots across CIDCO, Jalna Road, Beed Bypass, and AURIC Smart City.',
  brandTagline: '0% Brokerage | 100% Trust',
  companyName: 'Auricity Developers',
  supportPhone: '+91 8010506030',
  contactPhone: '+91 8010506030',
  supportEmail: 'info@auricity.com',
  contactEmail: 'info@auricity.com',
  officeAddress: 'Town Centre, CIDCO, Chhatrapati Sambhajinagar - 431003, Maharashtra',
  announcementActive: true,
  announcementEnabled: true,
  announcementText: '🚀 ZERO Brokerage Festival: Direct Builder Deals in Chhatrapati Sambhajinagar!',
  featuredLocalities: [
    'CIDCO N-1 to N-4',
    'Jalna Road (Golden Mile)',
    'Beed Bypass Road',
    'Shendra MIDC / AURIC Smart City',
    'Garkheda Parisar',
    'Seven Hills / Cannought Place'
  ],
  promoBannerText: 'Looking for Due Diligence or Property Legal Verification? Consult our verified Real Estate Advocates today.',
  promoBannerActive: true,
  legalDisclaimer: 'Auricity is a technology-enabled real estate marketing aggregator. All property transactions and agreements are executed in full compliance with Maharashtra Real Estate Regulatory Authority (MahaRERA) guidelines.',
  statsCounter: {
    propertiesListed: '1,250+',
    happyFamilies: '850+',
    activeRealtors: '120+',
    brokerageSaved: '₹ 4.8 Cr+'
  }
};

export const INITIAL_REALTOR_PLANS: RealtorPlan[] = [
  {
    id: 'plan_starter',
    name: 'Starter Realtor',
    tier: 'Starter',
    price: 0,
    period: 'Forever Free',
    description: 'Essential launchpad for newly certified MahaRERA brokers building their local footprint.',
    badge: 'Free Tier',
    featured: false,
    published: true,
    subscribersCount: 8,
    limits: {
      listingsQuota: 5,
      featuredQuota: 0,
      leadsQuota: 10,
      projectAccess: false,
      digitalCard: true,
      trainingAccess: true,
      analytics: false,
      customSubdomain: false
    },
    features: [
      'Up to 5 Active Property Listings',
      'Branded Digital Business Card with QR',
      'Direct WhatsApp & Call Inquiries',
      'MahaRERA Verification Trust Badge',
      'Basic Lead Pipeline Dashboard',
      'Access to Free Broker Training Blogs'
    ],
    createdAt: '2026-01-01'
  },
  {
    id: 'plan_pro',
    name: 'Pro Real Estate Partner',
    tier: 'Pro',
    price: 1499,
    period: 'Monthly',
    description: 'Designed for active brokers seeking central lead distribution, automated SMS alerts and priority listing visibility.',
    badge: 'Most Popular',
    featured: true,
    published: true,
    subscribersCount: 22,
    limits: {
      listingsQuota: 25,
      featuredQuota: 5,
      leadsQuota: 50,
      projectAccess: true,
      digitalCard: true,
      trainingAccess: true,
      analytics: true,
      customSubdomain: true
    },
    features: [
      'Up to 25 Active Property Listings (5 Featured)',
      'Direct Central Lead Inflow Dispatch',
      'Dynamic Digital Card with Custom Theme & vCard',
      'Automated SMS Alerts on Lead Inquiries',
      'Full CRM Stages & Follow-up Calendar',
      'Exclusive Builder Project Co-Brokerage Access',
      'Advanced Lead Conversion Analytics & AI Valuations'
    ],
    createdAt: '2026-01-01'
  },
  {
    id: 'plan_elite',
    name: 'Elite Agency & Township Mandate',
    tier: 'Elite',
    price: 3999,
    period: 'Monthly',
    description: 'For high-volume real estate agencies managing builder mandates, commercial portfolios and large sales teams.',
    badge: 'Agency Power',
    featured: false,
    published: true,
    subscribersCount: 6,
    limits: {
      listingsQuota: 100,
      featuredQuota: 20,
      leadsQuota: 200,
      projectAccess: true,
      digitalCard: true,
      trainingAccess: true,
      analytics: true,
      customSubdomain: true
    },
    features: [
      'Up to 100 Active Listings with Top Category Pinning',
      'VIP Direct Lead Allocation from Hero Portals',
      'Sole Selling Builder Mandates Assignment',
      'Dedicated Auricity Relationship Account Manager',
      'Unlimited vCard Downloads & High-Res QR Marketing Kit',
      'Complete MahaRERA Legal Advisory Desk Support',
      'Team Multi-Agent Access & Sub-Accounts (Roadmap)'
    ],
    createdAt: '2026-01-01'
  }
];

export const INITIAL_BROKER_REVIEWS: BrokerReview[] = [
  {
    id: 'rev-01',
    brokerId: 'realtor-01',
    brokerName: 'Rajesh Patil',
    userName: 'Kailashnath Agarwal',
    clientName: 'Kailashnath Agarwal',
    userPhone: '+91 98220 11223',
    clientPhone: '+91 98220 11223',
    userEmail: 'kailash.agarwal@gmail.com',
    rating: 5,
    transactionType: 'Commercial Space',
    comment: 'Rajesh Patil guided us through our showroom acquisition on Jalna Road. 100% clear title documentation and handled registration smoothly. Highly recommended!',
    reviewText: 'Rajesh Patil guided us through our showroom acquisition on Jalna Road. 100% clear title documentation and handled registration smoothly. Highly recommended!',
    status: 'approved',
    featured: true,
    createdAt: '2026-07-15T14:30:00Z',
    approvedAt: '2026-07-16T10:00:00Z'
  },
  {
    id: 'rev-02',
    brokerId: 'realtor-01',
    brokerName: 'Rajesh Patil',
    userName: 'Pooja Kulkarni',
    clientName: 'Pooja Kulkarni',
    userPhone: '+91 94221 44556',
    clientPhone: '+91 94221 44556',
    rating: 5,
    transactionType: 'Home Purchase',
    comment: 'Found our 3 BHK flat in CIDCO N-4 through Mr. Rajesh. Zero hassle with home loan paperwork and no hidden charges.',
    reviewText: 'Found our 3 BHK flat in CIDCO N-4 through Mr. Rajesh. Zero hassle with home loan paperwork and no hidden charges.',
    status: 'approved',
    featured: true,
    createdAt: '2026-08-02T09:15:00Z',
    approvedAt: '2026-08-02T16:00:00Z'
  },
  {
    id: 'rev-03',
    brokerId: 'realtor-02',
    brokerName: 'Amitabh Deshmukh',
    userName: 'Dr. Anand Joshi',
    clientName: 'Dr. Anand Joshi',
    userPhone: '+91 94220 55112',
    clientPhone: '+91 94220 55112',
    rating: 5,
    transactionType: 'Collector NA Plot',
    comment: 'Amitabh is the go-to consultant for Beed Bypass and South Sambhajinagar properties. Verified all 7/12 records meticulously.',
    reviewText: 'Amitabh is the go-to consultant for Beed Bypass and South Sambhajinagar properties. Verified all 7/12 records meticulously.',
    status: 'approved',
    featured: true,
    createdAt: '2026-08-10T11:45:00Z',
    approvedAt: '2026-08-11T12:00:00Z'
  },
  {
    id: 'rev-04',
    brokerId: 'realtor-03',
    brokerName: 'Pooja Shinde',
    userName: 'Vikramaditya Rao (Industrialist)',
    clientName: 'Vikramaditya Rao (Industrialist)',
    userPhone: '+91 98811 00223',
    clientPhone: '+91 98811 00223',
    rating: 5,
    transactionType: 'Industrial Lease',
    comment: 'Pooja helped our manufacturing firm secure a 2-acre plot in AURIC Shendra Smart City with single-window sanction support.',
    reviewText: 'Pooja helped our manufacturing firm secure a 2-acre plot in AURIC Shendra Smart City with single-window sanction support.',
    status: 'approved',
    featured: true,
    createdAt: '2026-08-18T16:20:00Z',
    approvedAt: '2026-08-19T08:30:00Z'
  }
];

export const INITIAL_REALTOR_NOTIFICATIONS: RealtorNotification[] = [
  {
    id: 'notif-01',
    realtorId: 'realtor-01',
    title: 'New Lead Assigned by Super Admin',
    message: 'Dr. Swapnil Jadhav inquired for a 3 BHK near Prozone Mall (Budget ₹85L - ₹95L). Follow up scheduled.',
    type: 'lead_assigned',
    read: false,
    createdAt: '2026-08-24T10:15:00Z',
    actionUrl: 'leads'
  },
  {
    id: 'notif-02',
    realtorId: 'realtor-01',
    title: 'Township Mandate Assigned: Samarth Imperial Heights',
    message: 'Super Admin has assigned you as an authorized advisory broker for Samarth Imperial Heights on Beed Bypass Road.',
    type: 'project_assigned',
    read: true,
    createdAt: '2026-08-20T12:00:00Z',
    actionUrl: 'projects'
  },
  {
    id: 'notif-03',
    realtorId: 'realtor-01',
    title: 'Property Approved & Published',
    message: 'Your listing "Luxury 3 BHK High-Rise Apartment with Panoramic Hills View" has been approved and is now live.',
    type: 'property_approval',
    read: true,
    createdAt: '2026-08-15T09:30:00Z',
    actionUrl: 'properties'
  },
  {
    id: 'notif-04',
    realtorId: 'realtor-01',
    title: 'MahaRERA KYC Status: Verified',
    message: 'Your MahaRERA broker license A51500001892 has been authenticated by Super Admin. Platinum Club badge active.',
    type: 'kyc_status',
    read: true,
    createdAt: '2026-08-01T08:00:00Z',
    actionUrl: 'subscription'
  }
];

export const INITIAL_PROJECT_ASSIGNMENTS: ProjectBrokerAssignment[] = [
  {
    id: 'pba-01',
    projectId: 'proj-02',
    projectName: 'Samarth Imperial Heights',
    brokerId: 'realtor-01',
    brokerName: 'Rajesh Patil',
    assignedAt: '2026-08-01T10:00:00Z',
    status: 'Active',
    leadsGenerated: 14,
    notes: 'Primary advisory mandate for 3.5 BHK and 4 BHK Sky Villas.'
  },
  {
    id: 'pba-02',
    projectId: 'proj-03',
    projectName: 'Pride City Smart Habitat Phase 2',
    brokerId: 'realtor-03',
    brokerName: 'Pooja Shinde',
    assignedAt: '2026-08-05T14:00:00Z',
    status: 'Active',
    leadsGenerated: 21,
    notes: 'Exclusive corporate allocation broker for AURIC Shendra zone executives.'
  }
];

export const INITIAL_KNOWLEDGE_HUB_CONFIG: KnowledgeHubConfig = {
  titleCard: {
    badge: 'Auricity Knowledge Hub',
    heading: "Auricity's Knowledge Hub",
    subheading: 'Blogs, News & Articles',
    description: 'Expert insights, RERA compliance advisories, local market trends, and private training modules for certified brokers.',
    ctaText: 'Explore Knowledge Hub',
    ctaView: 'knowledge-hub'
  },
  card1Broker: {
    title: 'Auricity Brokers Career & Development',
    badge: 'Private & Gated',
    description: 'Exclusive MahaRERA masterclasses, high-ticket deal frameworks, sales playbooks, and direct messaging desk with Super Admin.',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    buttonTextNotLoggedIn: 'Get Access',
    buttonTextRequestAccess: 'Request Access',
    buttonTextPending: 'Pending Admin Approval',
    buttonTextApproved: 'Enter Knowledge Hub'
  },
  card2BuyersGuide: {
    title: 'Real Estate Buyers Guide',
    badge: 'Public Guide',
    description: 'Comprehensive advice on buying flats, independent houses, NA collector plots, 30-year title searches & legal safeguards.',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    buttonText: 'Read More'
  },
  card3TrendsNews: {
    title: 'Real Estate Trends & News',
    badge: 'Market Insights',
    description: 'Stay ahead with AURIC Smart City updates, Samruddhi Mahamarg real estate growth, and Sambhajinagar rental yield reports.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    buttonText: 'Read More'
  }
};

export const INITIAL_BROKER_ACCESS_REQUESTS: BrokerAccessRequest[] = [
  {
    id: 'bar-01',
    brokerId: 'realtor-01',
    brokerName: 'Rajesh Patil',
    agencyName: 'Patil Real Estate & Investment Advisory',
    phone: '+91 98220 12345',
    email: 'rajesh.patil@auricity.com',
    reraNumber: 'A51500001892',
    requestedAt: '2026-08-20T10:30:00Z',
    status: 'approved',
    reviewedAt: '2026-08-20T12:00:00Z',
    adminNotes: 'Verified MahaRERA certificate. Approved for full broker academy & admin chat.'
  },
  {
    id: 'bar-02',
    brokerId: 'realtor-02',
    brokerName: 'Sanjay Deshmukh',
    agencyName: 'Marathwada Land Bankers',
    phone: '+91 94222 34567',
    email: 'sanjay.deshmukh@gmail.com',
    reraNumber: 'A51500004521',
    requestedAt: '2026-08-28T09:15:00Z',
    status: 'pending',
    adminNotes: 'RERA verification in progress.'
  },
  {
    id: 'bar-03',
    brokerId: 'realtor-03',
    brokerName: 'Pooja Shinde',
    agencyName: 'AURIC Property Hub',
    phone: '+91 98900 87654',
    email: 'pooja.shinde@auricrealty.in',
    reraNumber: 'A51500009822',
    requestedAt: '2026-08-27T16:45:00Z',
    status: 'pending',
    adminNotes: 'Requested fast-track access for industrial playbook.'
  }
];

export const INITIAL_BROKER_MESSAGES: BrokerDirectMessage[] = [
  {
    id: 'msg-01',
    brokerId: 'realtor-01',
    brokerName: 'Rajesh Patil',
    senderRole: 'broker',
    message: 'Hello Admin team, could you please share the updated MahaRERA draft agreement template for resale transactions in CIDCO N-2?',
    timestamp: '2026-08-28T11:20:00Z',
    read: true
  },
  {
    id: 'msg-02',
    brokerId: 'realtor-01',
    brokerName: 'Super Admin',
    senderRole: 'admin',
    message: 'Hi Rajesh! The updated draft has been uploaded to the Legal & Documentation module in your Broker Hub. Let us know if you need any customized clause checks.',
    timestamp: '2026-08-28T11:45:00Z',
    read: true
  }
];

