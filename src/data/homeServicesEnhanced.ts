import { HOME_SERVICE_CATEGORIES, HomeServiceCategory } from './homeServicesData';

export interface ServicePricingTier {
  id: string;
  name: string;
  price: string;
  priceNumeric: number;
  description: string;
  duration: string;
  turnaround?: string;
  popular?: boolean;
  features: string[];
  deliverables?: string[];
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface DetailedServiceCategory extends HomeServiceCategory {
  heroImage?: string;
  galleryPhotos: string[];
  detailedDescription: string;
  turnaroundTime?: string;
  guarantee?: string;
  inclusions: string[];
  exclusions: string[];
  pricingTable: ServicePricingTier[];
  pricingTiers?: ServicePricingTier[];
  processSteps: ServiceProcessStep[];
  termsAndConditions: string[];
}

export type EnhancedServiceDetail = DetailedServiceCategory & {
  heroImage: string;
  pricingTiers: ServicePricingTier[];
  turnaroundTime: string;
  guarantee: string;
  serviceGuarantee?: string;
  tagline?: string;
  gallery?: string[];
  faqs?: { q: string; a: string }[];
};

export const ENHANCED_SERVICE_DETAILS: Record<string, DetailedServiceCategory> = {
  'packers-movers': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'packers-movers')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Auricity Packers & Movers offers premier local shifting within Chhatrapati Sambhajinagar (CIDCO, Jalna Road, Beed Bypass, Garkheda, Waluj, Shendra) and intercity relocations across Maharashtra. Our trained crew handles every possession with multi-layer bubble wrap, foam corner guards, and heavy-duty corrugated cartons. Enjoy complete transit insurance, closed container GPS-tracked trucks, and zero hidden toll or fuel charges.`,
    inclusions: [
      '3-layer heavy-duty bubble & corrugated cardboard packing for fragile chinaware and electronics',
      'Dedicated closed container truck with hydraulic tailgate for smooth loading',
      'Disassembly and reassembly of standard beds, dining tables, and wardrobes',
      'Unloading, placement in designated rooms, and debris removal',
      'Free transit insurance cover up to ₹1,00,000 against transit mishaps',
      'Live GPS consignment tracking link shared via WhatsApp'
    ],
    exclusions: [
      'Disconnection or reconnection of split AC copper piping and gas refilling (can be booked via appliance service)',
      'Carpentry structural wall drilling for TV wall mounts and geysers (available as add-on)',
      'Movement of hazardous flammable liquids, chemicals, or unboxed jewelry/cash',
      'Staircase porterage beyond 3rd floor without elevator access (nominal surcharge applies)'
    ],
    pricingTable: [
      {
        id: 'pm-1bhk',
        name: '1 BHK / Studio Shifting',
        price: '₹ 2,499 - ₹ 3,999',
        priceNumeric: 2499,
        description: 'Ideal for bachelor or small family moving within 15 km in Sambhajinagar.',
        duration: '3 - 4 Hours',
        features: ['1 Mini Truck (Tata Ace/Bolero)', '2 Dedicated Packing Technicians', 'Complete bubble wrap for fridge & TV', 'Basic loading & unloading']
      },
      {
        id: 'pm-2bhk',
        name: '2 BHK Complete Home Relocation',
        price: '₹ 4,499 - ₹ 6,999',
        priceNumeric: 4499,
        popular: true,
        description: 'Most chosen plan for 2 BHK flats across CIDCO, Garkheda, and Beed Bypass.',
        duration: '4 - 6 Hours',
        features: ['14-ft Closed Container Truck', '4 Professional Handlers & Packer', '3-layer packing for all furniture', 'Furniture dismantling & reassembly', 'Transit Insurance included']
      },
      {
        id: 'pm-3bhk',
        name: '3 BHK / Villa Premium Move',
        price: '₹ 7,999 - ₹ 11,999',
        priceNumeric: 7999,
        description: 'Complete white-glove relocation with customized wooden crating for delicate art & electronics.',
        duration: 'Full Day (6 - 8 Hours)',
        features: ['17-ft Heavy Duty Container Truck', '6 Expert Packing Specialists', 'Custom wooden crating for TV & marble', 'Full unpacking & room placement', 'Priority Samruddhi Expressway route']
      }
    ],
    processSteps: [
      { step: 1, title: 'Instant Quote & Video Survey', desc: 'Share inventory list or quick WhatsApp video walkthrough to get a guaranteed fixed price.' },
      { step: 2, title: 'Doorstep Multi-Layer Packing', desc: 'Our uniformed crew arrives on time with corrugated cartons, bubble wraps, and stretch film.' },
      { step: 3, title: 'Safe Transit & GPS Tracking', desc: 'Transport in closed weather-proof vehicles with real-time driver tracking.' },
      { step: 4, title: 'Unloading & Setup', desc: 'Careful unloading, furniture assembly, and zero-mess debris cleanup.' }
    ],
    termsAndConditions: [
      'Booking amount of ₹500 is adjustable against final bill.',
      'Rescheduling is 100% free up to 24 hours prior to slot time.',
      'Valuable personal documents, gold, cash, and laptops must be transported personally.'
    ]
  },
  'painting': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'painting')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Transform your home with Auricity Certified Painting Services. We use 100% genuine sealed paint containers from Asian Paints, Berger, and Dulux with laser mechanized sanding for ultra-smooth dust-free walls. Our service includes full furniture masking with plastic sheets, waterproofing primer coat, and a comprehensive 1-year anti-peeling warranty card.`,
    inclusions: [
      'Laser-guided dust-free mechanized wall sanding for glass-finish smoothness',
      'Full floor, switchboard, and furniture masking with heavy polyethylene film',
      '1 coat of anti-fungal primer + 2 coats of premium washable interior emulsion',
      'Minor crack filling and putty touch-ups for seamless wall contours',
      'Post-painting deep floor scrub and window paint-speck cleaning',
      '1-Year Auricity written warranty against flaking or peeling'
    ],
    exclusions: [
      'Major structural civil repairs or deep damp plaster replacement (charged after inspection)',
      'Ceiling POP false-ceiling installation (available under interior carpentry)',
      'Texture stencils or Italian marble wall effects unless explicitly selected in package'
    ],
    pricingTable: [
      {
        id: 'pnt-fresh-rental',
        name: 'Rental Refresh (Tractor Emulsion)',
        price: '₹ 8.5 / sq.ft',
        priceNumeric: 8.5,
        description: 'Perfect for rental turnover or quick freshening up before tenant moves in.',
        duration: '1 - 2 Days',
        features: ['2 Coats Asian Paints Tractor Emulsion', 'Full Furniture Masking', 'Minor Nail-hole putty filling', 'Floor Cleaning post job']
      },
      {
        id: 'pnt-royale-luxury',
        name: 'Luxury Royale Luxury Sheen',
        price: '₹ 15.5 / sq.ft',
        priceNumeric: 15.5,
        popular: true,
        description: 'Teflon-coated stain-resistant washable paint with rich velvet sheen.',
        duration: '3 - 5 Days',
        features: ['1 Coat Primer + 2 Coats Royale Luxury Emulsion', 'Automated Mechanized Sanding', 'Stain-Resistant & Washable Formula', '1-Year Written Warranty Card']
      },
      {
        id: 'pnt-exterior-shield',
        name: 'Exterior Apex Ultima All-Weather Shield',
        price: '₹ 18.0 / sq.ft',
        priceNumeric: 18.0,
        description: 'Anti-algal, sun-reflective and rain-shield coating engineered for Sambhajinagar climate.',
        duration: '4 - 7 Days',
        features: ['High-Pressure Water Jet Washing', 'Dr. Fixit Damp-Proof Primer', 'Apex Ultima Anti-Algal Coating', '5-Year Anti-Fade Guarantee']
      }
    ],
    processSteps: [
      { step: 1, title: 'Free Laser Measurement', desc: 'Our technical surveyor measures wall square footage with digital laser and provides a transparent itemized estimate.' },
      { step: 2, title: 'Complete Masking & Prep', desc: 'Every sofa, bed, floor tile, and switchboard is meticulously sealed with protective masking tape.' },
      { step: 3, title: 'Mechanized Sanding & Painting', desc: 'Vacuum-assisted dust-free sanders smooth the walls followed by roller application of 2 coats.' },
      { step: 4, title: 'Cleanup & Warranty Handover', desc: 'Tape removal, floor scrubbing, client inspection walk-through, and digital warranty certificate issuance.' }
    ],
    termsAndConditions: [
      'Paint materials are delivered in sealed, barcode-verifiable manufacturer tins.',
      'Color consulting is complimentary on confirmed bookings.'
    ]
  },
  'cleaning': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'cleaning')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Experience hospital-grade sanitization with Auricity Deep Home Cleaning. Using Diversey Taski R-series eco-safe chemicals, single-disc floor buffing machines, and high-pressure steam washers, our team purges hidden grime, stubborn limescale, kitchen grease, and bathroom bacteria.`,
    inclusions: [
      'Single-disc mechanized floor scrubbing & buffing for vitrified, marble, and granite tiles',
      'Intense bathroom tile descaling, hard-water stain eradication, and tap chrome buffing',
      'Kitchen degreasing, chimney exterior wipe-down, counter scrub, and cabinet sanitization',
      'Window glass & track high-pressure vacuuming and steam extraction',
      'Balcony washing, railing wiping, and cobweb removal across all ceiling corners'
    ],
    exclusions: [
      'Inside cleaning of personal clothes wardrobes unless emptied by client',
      'Chandelier crystal disassembly (wiped externally with feather dusters)',
      'Terrace waterproofing or civil debris clearance'
    ],
    pricingTable: [
      {
        id: 'cln-1bhk',
        name: '1 BHK Complete Deep Clean',
        price: '₹ 1,799',
        priceNumeric: 1799,
        description: 'Full sanitization for 1 BHK apartment including 1 bath & 1 balcony.',
        duration: '3 - 4 Hours',
        features: ['2 Trained Cleaners', 'Mechanized Floor Scrubbing', 'Kitchen & Bathroom Descaling', 'Diversey Taski Chemicals']
      },
      {
        id: 'cln-2bhk',
        name: '2 BHK Complete Deep Clean',
        price: '₹ 2,499',
        priceNumeric: 2499,
        popular: true,
        description: 'Comprehensive scrub down for 2 BHK flat with 2 bathrooms and kitchen.',
        duration: '4 - 6 Hours',
        features: ['3 Trained Cleaners', 'Heavy-Duty Single Disc Buffing', '2 Bathrooms Scale Removal', 'Window Tracks Steam Clean', 'Kitchen Degreasing']
      },
      {
        id: 'cln-3bhk',
        name: '3 BHK / Duplex Villa Sanitization',
        price: '₹ 3,499',
        priceNumeric: 3499,
        description: 'Intensive deep wash for spacious 3 BHK residences and independent villas.',
        duration: '5 - 7 Hours',
        features: ['4 Professional Technicians', '3 Bathrooms Deep Scrub', 'Living Room Sofa Shampooing Add-on', 'Balconies & Grills Pressure Wash']
      }
    ],
    processSteps: [
      { step: 1, title: 'Dry Vacuuming & Cobwebs', desc: 'Ceiling fans, cobwebs, and loose dust extraction using high-suction HEPA industrial vacuums.' },
      { step: 2, title: 'Chemical Pre-Treatment', desc: 'Eco-friendly Taski solutions applied to tiles, taps, and grease-prone kitchen slabs.' },
      { step: 3, title: 'Mechanized Floor Buffing', desc: 'Single-disc rotary scrubbers lift deep-set grime without scratching polished floor tiles.' },
      { step: 4, title: 'Quality Audit Walkthrough', desc: 'Client inspects each room; free immediate touch-up if any spot requires extra attention.' }
    ],
    termsAndConditions: [
      'Uninterrupted water and electricity supply required during the service period.',
      'Our chemicals are 100% pet-safe and child-safe.'
    ]
  },
  'pest-control': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'pest-control')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Protect your home and loved ones against cockroaches, ants, termites, bedbugs, and rodents with Auricity Pest Control. We employ Govt.-approved Bayer odorless herbal gel baiting and subterranean drill-fill-seal barrier technologies. Safe for infants, elderly residents, and pets with zero kitchen evacuation needed.`,
    inclusions: [
      'Bayer Maxforce odorless herbal gel application inside kitchen cabinets and electrical sockets',
      'Specialized drain spray to eliminate nocturnal American cockroaches from sewage pipes',
      'Insect growth regulator (IGR) spray across skirting boards and bathroom corners',
      'Written 6-Month Retreatment Guarantee (free second visit if pests persist)'
    ],
    exclusions: [
      'Outdoor garden agricultural crop spraying',
      'Deep wood termite drill treatment is charged separately as anti-termite plan'
    ],
    pricingTable: [
      {
        id: 'pest-cockroach',
        name: 'General Cockroach & Ant Control',
        price: '₹ 799 - ₹ 1,199',
        priceNumeric: 799,
        popular: true,
        description: 'Odorless herbal gel baiting with zero kitchen emptying.',
        duration: '45 Minutes',
        features: ['100% Odorless Bayer Gel', 'No Need to Empty Cabinets', 'Safe for Infants & Pets', '6-Month Free Retreatment']
      },
      {
        id: 'pest-termite',
        name: 'Drill-Fill-Seal Anti-Termite Protection',
        price: '₹ 2,999 - ₹ 4,999',
        priceNumeric: 2999,
        description: 'Complete subterranean chemical barrier protecting woodwork and door frames.',
        duration: '3 - 5 Hours',
        features: ['12mm Precision Floor/Wall Drilling', 'Govt Certified Termiticide Injection', 'Color-matched Hole Sealing', '5-Year Written Stamp Paper Warranty']
      }
    ],
    processSteps: [
      { step: 1, title: 'Targeted Inspection', desc: 'Identify nesting hotspots in modular kitchens, dry balconies, and drainage duct lines.' },
      { step: 2, title: 'Precision Gel Dispensing', desc: 'Herbal bait drops placed in hinges, under sinks, and behind refrigerators where pests hide.' },
      { step: 3, title: 'Drainage Pipe Flushing', desc: 'Non-staining emulsion applied inside floor traps to block pipe ingress.' },
      { step: 4, title: 'Warranty Card Handover', desc: 'Digital certificate activated for 6 months of guaranteed pest-free living.' }
    ],
    termsAndConditions: [
      'Gel stays active for up to 180 days even after regular kitchen cleaning.',
      'Avoid washing directly over gel bait points for 48 hours post application.'
    ]
  },
  'legal-services': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'legal-services')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Navigate Maharashtra property regulations with complete confidence through Auricity Legal Services. From doorstep registered rent agreements with biometric UIDAI authentication to 30-year sub-registrar title search reports and MahaRERA buyer rights consultation, our panel of High Court real estate advocates safeguards your property investments in Sambhajinagar.`,
    inclusions: [
      'Doorstep biometric fingerprint device verification for Owner and Tenant',
      'Maharashtra Govt. Inspector General of Registration (IGR) approved stamp duty filing',
      'Government verified registration receipt with unique legal registration number',
      'Digital softcopy PDF sent via WhatsApp/email plus 2 original hardcopies delivered to doorstep'
    ],
    exclusions: [
      'Court litigation or civil disputes representation (quoted separately on retainer)',
      'Government stamp duty charges for properties outside Maharashtra jurisdiction'
    ],
    pricingTable: [
      {
        id: 'lgl-rent-agree',
        name: 'Doorstep Registered Rent Agreement',
        price: '₹ 1,499 (All Inclusive)',
        priceNumeric: 1499,
        popular: true,
        description: 'Official Maharashtra IGR registered 11-month agreement with biometric doorstep visit.',
        duration: '24 Hours Delivery',
        features: ['Govt. Maharashtra IGR Approved', 'Doorstep Biometric Capture', 'Customizable Clauses', 'Free Doorstep Courier Delivery']
      },
      {
        id: 'lgl-title-report',
        name: '30-Year Property Title Search Report',
        price: '₹ 4,499 / Report',
        priceNumeric: 4499,
        description: 'Comprehensive advocate inspection of Sub-Registrar Index-II, 7/12 records, and bank NOCs.',
        duration: '3 - 4 Working Days',
        features: ['Physical Sub-Registrar Records Check', '7/12 & Ferfar Mutation Tracking', 'Bank Loan Admissibility Certificate', 'Advocate Telephonic Advisory']
      }
    ],
    processSteps: [
      { step: 1, title: 'Drafting & Verification', desc: 'Fill online agreement details; advocate drafts clauses within 2 hours.' },
      { step: 2, title: 'Doorstep Biometric Scan', desc: 'Field executive visits your address with biometric scanner for party authentication.' },
      { step: 3, title: 'IGR Government Filing', desc: 'Draft submitted directly to Maharashtra Sub-Registrar online server.' },
      { step: 4, title: 'Registered PDF & Hardcopy', desc: 'Receive Govt-stamped agreement PDF instantly and laminated copy at doorstep.' }
    ],
    termsAndConditions: [
      'Valid Aadhaar card and PAN card required for both owner and tenant.',
      'Two witnesses with Aadhaar authentication required for registration.'
    ]
  },
  'appliances-repair': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'appliances-repair')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Swift doorstep repair and servicing for air conditioners, refrigerators, washing machines, microwaves, and geysers across Sambhajinagar. Our background-checked technicians use 100% genuine manufacturer spares and provide a 90-day service warranty on all replaced parts.`,
    inclusions: [
      'Full multi-point diagnosis of appliance electricals, motors, and cooling coils',
      'Use of certified original OEM spare parts with invoice',
      '90-day post-repair warranty on service and replaced parts',
      'Safety grounding and voltage fluctuation check before handover'
    ],
    exclusions: [
      'Compressor replacement without manufacturer core exchange',
      'Physical body aesthetic dents or rust restoration'
    ],
    pricingTable: [
      {
        id: 'app-ac-service',
        name: 'AC Jet Cleaning & Gas Top-Up',
        price: '₹ 499 - ₹ 1,499',
        priceNumeric: 499,
        popular: true,
        description: 'Foam jet wash for indoor and outdoor units, filter clean and cooling pressure check.',
        duration: '45 - 60 Minutes',
        features: ['High-Pressure Jet Wash', 'Indoor AC Foam Cleaning', 'Gas Pressure Audit', '90-Day Cooling Warranty']
      },
      {
        id: 'app-fridge-wm',
        name: 'Washing Machine / Refrigerator Repair',
        price: '₹ 299 Inspection Fee',
        priceNumeric: 299,
        description: 'Expert troubleshooting for front/top load washers and double door refrigerators.',
        duration: '1 Hour',
        features: ['Full Diagnostic Inspection', 'Transparent Spares Rate Card', 'Adjustable Inspection Fee', 'Doorstep Repair']
      }
    ],
    processSteps: [
      { step: 1, title: 'Book Doorstep Slot', desc: 'Select preferred date and time; technician dispatched within 60 minutes.' },
      { step: 2, title: 'Transparent Diagnosis', desc: 'Technician tests appliance and shares itemized estimate before starting work.' },
      { step: 3, title: 'Genuine Spares Repair', desc: 'Faulty components replaced with sealed OEM parts in your presence.' },
      { step: 4, title: 'Testing & 90-Day Warranty', desc: 'Live operational check and digital warranty receipt provided.' }
    ],
    termsAndConditions: [
      'Inspection fee is waived if repair work is accepted.',
      'Replaced old parts are returned to the client.'
    ]
  },
  'plumbing': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'plumbing')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Certified plumbing experts for tap leaks, water tank installations, motorized pump repairs, bathroom fitting upgrades (Jaquar, Kohler, Hindware), and concealed pipeline seepage resolution across Sambhajinagar.`,
    inclusions: [
      'Leakage diagnosis and washer/spindle replacements',
      'Concealed pipe acoustic leak detection',
      'Sanitaryware installation (commode, wash basin, sink, geyser plumbing)',
      '30-day rework warranty on plumbing joints and fittings'
    ],
    exclusions: [
      'Cost of sanitaryware fixtures, pipes, or taps (procured by client or invoiced separately)',
      'Main municipal water line street trenching'
    ],
    pricingTable: [
      {
        id: 'plumb-minor',
        name: 'Minor Leakage & Tap Fix',
        price: '₹ 199 - ₹ 349',
        priceNumeric: 199,
        popular: true,
        description: 'Quick resolution for leaking faucets, flush valves, and shower heads.',
        duration: '30 - 45 Minutes',
        features: ['Up to 3 Fittings Servicing', 'Washer & Spindle Replacement', 'Pressure Testing', '30-Day Joint Warranty']
      },
      {
        id: 'plumb-fitting',
        name: 'Complete Bathroom Fixture Installation',
        price: '₹ 899 - ₹ 1,499',
        priceNumeric: 899,
        description: 'Installation of western commode, vanity basin, mixer unit, and health faucet.',
        duration: '2 - 3 Hours',
        features: ['New Fixtures Mounting', 'Silicone Waterproof Sealing', 'Inlet/Outlet Alignment', 'Leak-Free Guarantee']
      }
    ],
    processSteps: [
      { step: 1, title: 'Book Technician', desc: 'Select quick visit slot; technician arrives with comprehensive plumbing toolkit.' },
      { step: 2, title: 'Inspection & Quote', desc: 'Water pressure and leakage root-cause identified with upfront pricing.' },
      { step: 3, title: 'Precision Execution', desc: 'Standard CPVC/UPVC joints fitted with high-grade plumbing sealant.' },
      { step: 4, title: 'Pressure Testing', desc: 'Lines pressurized to verify zero-drip operation.' }
    ],
    termsAndConditions: [
      'Spare parts will be charged at MRP with original invoice.',
      'Main water shut-off valve access needed during repair.'
    ]
  },
  'electrician': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'electrician')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Licensed electricians for home rewiring, short-circuit troubleshooting, ceiling fan installations, modular switchboards, LED strip lighting, inverter-battery setups, and smart home automation switches.`,
    inclusions: [
      'Safety multimeter load testing and circuit breaker trip check',
      'Concealed wiring repair and socket replacement (Anchor, Havells, Legrand)',
      'Inverter and battery setup with backup load distribution',
      '30-day warranty on all electrical connections and wiring work'
    ],
    exclusions: [
      'MSEDCL meter seal tampering or high-voltage transformer work',
      'Cost of light fixtures, MCBs, and switches (procured by client or billed at MRP)'
    ],
    pricingTable: [
      {
        id: 'elec-switch',
        name: 'Switch, Fan & Light Installation',
        price: '₹ 149 - ₹ 299 / unit',
        priceNumeric: 149,
        popular: true,
        description: 'Mounting and connection of fans, fancy chandeliers, tubelights, and modular plates.',
        duration: '30 Minutes',
        features: ['Precision Wall Anchoring', 'Safe Insulated Connections', 'Load Testing', '30-Day Connection Warranty']
      },
      {
        id: 'elec-inverter',
        name: 'Inverter Setup & Rewiring',
        price: '₹ 799 - ₹ 1,299',
        priceNumeric: 799,
        description: 'Wiring dedicated essential load line for uninterrupted lights & fans during power cuts.',
        duration: '2 Hours',
        features: ['Battery Acid/Terminal Check', 'Dedicated Inverter MCB Box', 'Phase Wire Balancing', 'Complete System Demonstration']
      }
    ],
    processSteps: [
      { step: 1, title: 'Book Service', desc: 'Choose service type or request diagnostic inspection.' },
      { step: 2, title: 'Safety Audit', desc: 'Electrician cuts main breaker and diagnoses circuits using calibrated tools.' },
      { step: 3, title: 'Workmanship', desc: 'Wires neatly bundled and joints insulated with heat-shrink sleeves.' },
      { step: 4, title: 'Live Testing', desc: 'Main power restored; voltages and earthing verified under load.' }
    ],
    termsAndConditions: [
      'Earthing line must be functional in the building for appliance safety.',
      'All technicians carry insulated tools rated up to 1000V.'
    ]
  },
  'carpentry': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'carpentry')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Expert carpenters for modular kitchen repairs, hydraulic hinge replacements, door lock and handle installations (Godrej, Yale), custom TV units, wardrobe drawer alignments, and wooden furniture repairs.`,
    inclusions: [
      'Precision laser alignment for sliding door tracks and modular cabinets',
      'Hydraulic soft-close hinge fitting and drawer channel repair',
      'Godrej / Yale main door lock installations with brass deadbolts',
      '30-day rework warranty on carpentry craftsmanship'
    ],
    exclusions: [
      'Raw timber, laminate sheets, and hardware costs (billed separately or client provided)',
      'Large scale factory pre-laminated sheet fabrication'
    ],
    pricingTable: [
      {
        id: 'carp-door-lock',
        name: 'Door Lock & Handle Fitting',
        price: '₹ 299 - ₹ 499 / door',
        priceNumeric: 299,
        popular: true,
        description: 'Chiseling and installation of mortise locks, rim locks, and tower bolts.',
        duration: '45 Minutes',
        features: ['Godrej & Yale Lock Specialization', 'Clean Edge Chiseling', 'Smooth Latch Movement', '30-Day Fitting Guarantee']
      },
      {
        id: 'carp-kitchen-hinges',
        name: 'Modular Kitchen Hinge & Channel Overhaul',
        price: '₹ 699 - ₹ 1,199',
        priceNumeric: 699,
        description: 'Replace squeaky or loose cabinet hinges with stainless steel hydraulic soft-close hinges.',
        duration: '1.5 - 2 Hours',
        features: ['Up to 8 Hinges Adjustment', 'Drawer Slider Lubrication', 'Shutter Gap Realignment', 'Smooth Damper Motion']
      }
    ],
    processSteps: [
      { step: 1, title: 'Schedule Visit', desc: 'Share your furniture or lock requirement.' },
      { step: 2, title: 'Measurement & Hardware', desc: 'Carpenter advises required hardware dimensions and specs.' },
      { step: 3, title: 'Precision Craft', desc: 'Clean drill holes, accurate chiseling, and tight screw fastenings.' },
      { step: 4, title: 'Smooth Test', desc: 'Doors and drawers tested 10+ times to guarantee fluid movement.' }
    ],
    termsAndConditions: [
      'Hardware materials can be procured by customer or technician on reimbursement.',
      'Noise-free cordless tools utilized where possible.'
    ]
  },
  'ro-water-purifier': {
    ...HOME_SERVICE_CATEGORIES.find(c => c.id === 'ro-water-purifier')!,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: `Pure and safe drinking water for your family with Auricity Certified RO Service. We service all brands including Kent, Aquaguard, Pureit, Livpure, and Havells. Services include TDS testing, sediment filter replacement, activated carbon change, RO membrane replacement, booster pump repair, and UV lamp testing.`,
    inclusions: [
      'Digital TDS water test before and after service',
      'Certified 100% genuine 75/80 GPD high-rejection RO membranes',
      'Booster pump pressure test and leakage check',
      '60-day replacement warranty on all replaced filters and membrane'
    ],
    exclusions: [
      'Complete machine body replacement',
      'External water supply pipeline plumbing beyond 2 meters'
    ],
    pricingTable: [
      {
        id: 'ro-basic',
        name: 'Basic Service & Filter Replacement',
        price: '₹ 349 - ₹ 699',
        priceNumeric: 349,
        popular: true,
        description: 'Complete inspection, sediment & pre-carbon filter replacement with TDS audit.',
        duration: '45 Minutes',
        features: ['Digital TDS Audit', 'Pre-Carbon Sediment Filter Change', 'Tank Sanitization', '60-Day Warranty']
      },
      {
        id: 'ro-complete-overhaul',
        name: 'Complete Filter Kit & RO Membrane',
        price: '₹ 1,899 - ₹ 2,499',
        priceNumeric: 1899,
        description: 'Full overhaul replacing all filters + genuine 80 GPD membrane for sweet, crystal-pure water.',
        duration: '1 Hour',
        features: ['New 80 GPD RO Membrane', 'Sediment + Carbon + Post-Carbon', 'UV Lamp Inspection', 'Pump Leakage Fix', '60-Day Comprehensive Warranty']
      }
    ],
    processSteps: [
      { step: 1, title: 'Inflow TDS Testing', desc: 'Technician checks raw water TDS and output water TDS to assess membrane health.' },
      { step: 2, title: 'Filter Replacement', desc: 'Old clogged cartridges replaced with sealed food-grade certified filters.' },
      { step: 3, title: 'Leakage & Pump Pressure', desc: 'All push-fit joints and solenoid valve tested under full operating pressure.' },
      { step: 4, title: 'Sweet Water Audit', desc: 'Output water tested to ensure optimal healthy mineral TDS range (80-150 ppm).' }
    ],
    termsAndConditions: [
      'Only food-grade certified filter media installed.',
      'Free follow-up visit if taste changes within warranty period.'
    ]
  }
};

export const getEnhancedServiceDetail = (categoryId: string): DetailedServiceCategory => {
  if (ENHANCED_SERVICE_DETAILS[categoryId]) {
    return ENHANCED_SERVICE_DETAILS[categoryId];
  }
  // Fallback to basic category
  const base = HOME_SERVICE_CATEGORIES.find(c => c.id === categoryId) || HOME_SERVICE_CATEGORIES[0];
  return {
    ...base,
    galleryPhotos: [
      base.image,
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80'
    ],
    detailedDescription: base.description + '. Professional doorstep assistance across Chhatrapati Sambhajinagar with verified pros and upfront guaranteed pricing.',
    inclusions: [
      'Doorstep inspection & verified technician visit',
      'Complete task execution with professional tools',
      'Quality checklist audit with client',
      'Post-service written warranty support'
    ],
    exclusions: [
      'Major structural civil alterations',
      'Unrelated third-party material expenses'
    ],
    pricingTable: [
      {
        id: `${base.id}-standard`,
        name: 'Standard Doorstep Service',
        price: base.startingPrice,
        priceNumeric: 499,
        popular: true,
        description: 'Comprehensive service execution by Auricity certified technicians.',
        duration: '1 - 2 Hours',
        features: ['Doorstep Visit Included', 'Trained Professionals', 'Transparent Pricing', 'Satisfaction Guarantee']
      }
    ],
    processSteps: [
      { step: 1, title: 'Book Online', desc: 'Choose your preferred date and locality in Sambhajinagar.' },
      { step: 2, title: 'Technician Visit', desc: 'Background-verified professional arrives on time with ID card.' },
      { step: 3, title: 'Execution', desc: 'Transparent task completion following Auricity safety standards.' },
      { step: 4, title: 'Warranty & Support', desc: 'Digital invoice and post-service warranty coverage.' }
    ],
    termsAndConditions: [
      'All bookings backed by Auricity Happiness Guarantee.',
      'Flexible rescheduling available.'
    ]
  };
};

export const ENHANCED_HOME_SERVICES: EnhancedServiceDetail[] = HOME_SERVICE_CATEGORIES.map(cat => {
  const enhanced = getEnhancedServiceDetail(cat.id);
  const tiers = (enhanced.pricingTable || []).map(t => ({
    ...t,
    turnaround: t.duration || '1 - 2 Hours',
    deliverables: t.features || []
  }));
  return {
    ...enhanced,
    heroImage: enhanced.image,
    pricingTiers: tiers,
    turnaroundTime: 'Within 2 hours',
    guarantee: 'Auricity 30-Day Happiness Guarantee',
    serviceGuarantee: '100% verified Sambhajinagar technicians, background-checked ID verification, transparent upfront invoicing, and re-work guarantee if not satisfied.',
    tagline: enhanced.description || 'Professional doorstep home assistance in Chhatrapati Sambhajinagar.',
    gallery: enhanced.galleryPhotos || [enhanced.image],
    faqs: [
      {
        q: `How quickly can an Auricity pro arrive in Sambhajinagar?`,
        a: `Most standard service requests can be dispatched within 60 to 120 minutes across Cidco, Waluj, Beed Bypass, Garkheda, and Jalna Road.`
      },
      {
        q: `Are the service charges fixed or subject to change?`,
        a: `All initial visit rates and standard service charges are pre-fixed with zero hidden costs. Any additional material replacement is charged at MRP with customer approval.`
      },
      {
        q: `What is the Auricity Happiness Guarantee?`,
        a: `If you are not satisfied with the work or experience any recurrence within the warranty period, we provide a free inspection and complimentary rework.`
      }
    ]
  };
});

