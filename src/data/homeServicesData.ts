export interface HomeServiceItem {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  shortDescription: string;
  startingPrice: number;
  priceDisplay: string;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  popular?: boolean;
  features: string[];
}

export interface HomeServiceCategory {
  id: string;
  title: string;
  shortTitle: string;
  icon: string; // Lucide icon identifier
  startingPrice: string;
  badge?: string;
  offerBadge: string;
  description: string;
  image: string;
  services: HomeServiceItem[];
}

export const HOME_SERVICE_CATEGORIES: HomeServiceCategory[] = [
  {
    id: 'packers-movers',
    title: 'Packers & Movers',
    shortTitle: 'Packers & Movers',
    icon: 'Truck',
    startingPrice: 'From ₹1,499',
    badge: 'Lowest Price Guaranteed',
    offerBadge: 'UPTO 20% OFF',
    description: 'Local & intercity shifting, safe handling',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'pm-local-shifting',
        categoryId: 'packers-movers',
        categoryName: 'Packers & Movers',
        name: 'Local Home Shifting (1/2/3 BHK)',
        shortDescription: 'Doorstep multi-layer bubble packing, loading, dedicated closed container transit & unpacking in Sambhajinagar.',
        startingPrice: 2499,
        priceDisplay: 'From ₹2,499',
        rating: 4.9,
        reviewCount: 342,
        duration: 'Same Day (3 - 6 hrs)',
        image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['3-Layer Bubble & Corrugated Packing', 'Free Transit Insurance Cover', 'Dedicated Loading Crew', 'Zero Hidden Toll/Charges']
      },
      {
        id: 'pm-intercity-shifting',
        categoryId: 'packers-movers',
        categoryName: 'Packers & Movers',
        name: 'Intercity Relocation (Pune / Mumbai / Nashik)',
        shortDescription: 'Seamless expressway transport via Samruddhi Mahamarg with dedicated vehicle tracking & doorstep delivery.',
        startingPrice: 7999,
        priceDisplay: 'From ₹7,999',
        rating: 4.8,
        reviewCount: 218,
        duration: '24 - 48 Hours',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Samruddhi Fast-Track Transit', 'Live GPS Consignment Tracking', 'Complete Wooden Crating for Fragile', 'Unloading & Reassembly Included']
      }
    ]
  },
  {
    id: 'painting',
    title: 'Painting',
    shortTitle: 'Painting',
    icon: 'Paintbrush',
    startingPrice: 'From ₹9/sq.ft',
    badge: '1-Year Warranty',
    offerBadge: 'FLAT ₹1,000 OFF',
    description: 'Interior & exterior painting by trusted pros',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'pnt-interior',
        categoryId: 'painting',
        categoryName: 'Painting',
        name: 'Full Home Interior Painting',
        shortDescription: '2 coats of premium Asian Paints Royale or tractor emulsion with automated laser wall sanding.',
        startingPrice: 5999,
        priceDisplay: 'From ₹5,999 (₹9/sq.ft)',
        rating: 4.9,
        reviewCount: 428,
        duration: '2 - 4 Days',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['100% Genuine Sealed Paint Buckets', 'Dust-Free Mechanized Sanding', 'Furniture & Floor Masking Protection', 'Post-Paint Deep Clean Up']
      },
      {
        id: 'pnt-exterior',
        categoryId: 'painting',
        categoryName: 'Painting',
        name: 'Exterior Weatherproof Protection',
        shortDescription: 'Anti-fungal, rain-resistant exterior coat (Apex Ultima) with 5-year anti-cracking warranty.',
        startingPrice: 12499,
        priceDisplay: 'From ₹12,499',
        rating: 4.8,
        reviewCount: 184,
        duration: '3 - 7 Days',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        popular: false,
        features: ['High-Pressure Wall Jet Washing', 'Dr. Fixit Crack-Bridging Primer', 'UV Sun & Rain Resistant Coating', 'Scaffolding & Safety Gear Insured']
      }
    ]
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    shortTitle: 'Cleaning',
    icon: 'Sparkles',
    startingPrice: 'From ₹499',
    badge: 'Eco-Friendly Chemicals',
    offerBadge: 'UPTO 30% OFF',
    description: 'Deep home, sofa & bathroom cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'cln-full-home',
        categoryId: 'cleaning',
        categoryName: 'Cleaning',
        name: 'Complete Home Deep Sanitization',
        shortDescription: 'Single/multi-storey deep scrub, floor single-disc buffing, cobweb extraction, window track steam cleaning.',
        startingPrice: 2199,
        priceDisplay: 'From ₹2,199',
        rating: 4.9,
        reviewCount: 512,
        duration: '4 - 7 Hours',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Taski Diversey Chemical Solutions', 'Industrial Single Disc Floor Buffing', 'Kitchen Chimney & Degreasing', 'Balcony & Window Grill Steam Wash']
      },
      {
        id: 'cln-bathroom',
        categoryId: 'cleaning',
        categoryName: 'Cleaning',
        name: 'Intense Bathroom & Tile Descaling',
        shortDescription: 'Hard-water stain removal, grout scrub, sanitaryware disinfection, and glass partition shining.',
        startingPrice: 549,
        priceDisplay: 'From ₹549 / Bath',
        rating: 4.8,
        reviewCount: 630,
        duration: '1 - 2 Hours',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Hard Water Salt Scale Remover', 'Tap & Chrome Polish Buffing', '99.9% Bacteria Disinfection', 'High Pressure Jet Wash']
      }
    ]
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    shortTitle: 'Pest Control',
    icon: 'ShieldAlert',
    startingPrice: 'From ₹799',
    badge: '100% Odorless & Safe',
    offerBadge: 'UPTO 25% OFF',
    description: 'General pest, termite & rodent treatment',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'pest-general',
        categoryId: 'pest-control',
        categoryName: 'Pest Control',
        name: 'General Cockroach & Ant Gel Treatment',
        shortDescription: 'Advanced odorless Bayer herbal gel baiting in kitchen cabinets, bathroom drains & corners. No kitchen emptying needed.',
        startingPrice: 799,
        priceDisplay: 'From ₹799',
        rating: 4.9,
        reviewCount: 460,
        duration: '45 Minutes',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Bayer Maxforce Herbal Gel', 'Zero Odor & Zero Evacuation', 'Kitchen Cabinets Remain Intact', '6-Month Free Retreatment Guarantee']
      },
      {
        id: 'pest-termite',
        categoryId: 'pest-control',
        categoryName: 'Pest Control',
        name: 'Anti-Termite (White Ant) Chemical Shield',
        shortDescription: 'Drill-fill-seal subterranean piping technology protecting all wood doors, wardrobes, and structural foundation.',
        startingPrice: 2999,
        priceDisplay: 'From ₹2,999',
        rating: 4.8,
        reviewCount: 210,
        duration: '3 - 5 Hours',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        popular: false,
        features: ['Precision 12mm Wall Drilling & Sealing', 'Chlorpyrifos Govt Certified Chemicals', '5-Year Stamp Paper Warranty', 'Annual Free Inspection Audits']
      }
    ]
  },
  {
    id: 'legal-services',
    title: 'Legal Services',
    shortTitle: 'Legal Services',
    icon: 'Scale',
    startingPrice: 'From ₹999',
    badge: 'Govt. Sub-Registrar Verified',
    offerBadge: 'GOVT VERIFIED',
    description: 'Rental agreements, document verification',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'lgl-rent-agreement',
        categoryId: 'legal-services',
        categoryName: 'Legal Services',
        name: 'Doorstep Biometric Registered Rent Agreement',
        shortDescription: 'Official Maharashtra IGR-registered leave and license agreement with doorstep fingerprint capture & stamp duty.',
        startingPrice: 1499,
        priceDisplay: 'From ₹1,499 (All Inclusive)',
        rating: 4.9,
        reviewCount: 890,
        duration: '24 Hours Delivery',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Govt. Maharashtra IGR Approved e-Stamp', 'Doorstep Biometric Device Verification', 'Draft Customization by Property Advocates', 'Instant PDF & Hardcopy Delivery']
      },
      {
        id: 'lgl-title-verification',
        categoryId: 'legal-services',
        categoryName: 'Legal Services',
        name: '30-Year Property Title Search & Certificate',
        shortDescription: 'High Court advocate examination of Sambhajinagar Sub-Registrar Index-II, 7/12 Ferfar, NA & encumbrance clearance.',
        startingPrice: 4499,
        priceDisplay: '₹4,499 / Report',
        rating: 4.9,
        reviewCount: 310,
        duration: '3 Working Days',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Physical 30-Year SRO Records Audit', '7/12 & 8A Mutation Chain Analysis', 'Bank Loan Admissible Search Certificate', 'Direct Advocate Tele-Consultation']
      }
    ]
  },
  {
    id: 'appliances-repair',
    title: 'Appliances Repair',
    shortTitle: 'Appliances',
    icon: 'Cpu',
    startingPrice: 'From ₹399',
    badge: 'OEM Spares Warranty',
    offerBadge: 'UPTO 15% OFF',
    description: 'AC, washing machine, fridge repair',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'app-ac-service',
        categoryId: 'appliances-repair',
        categoryName: 'Appliances Repair',
        name: 'Split / Window AC Jet Service & Gas Charging',
        shortDescription: 'Deep indoor & outdoor unit power jet wash with foam spray, drain tray clearing, and eco-friendly gas top-up.',
        startingPrice: 499,
        priceDisplay: 'From ₹499',
        rating: 4.9,
        reviewCount: 680,
        duration: '1 Hour',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['High-Pressure Water Jet Washer', 'Anti-Bacterial Coil Foam Cleaning', 'Amperage & Refrigerant Gas Leakage Check', 'Drop-Catch Protection Jacket Used']
      },
      {
        id: 'app-refrigerator-wm',
        categoryId: 'appliances-repair',
        categoryName: 'Appliances Repair',
        name: 'Washing Machine & Refrigerator Repair',
        shortDescription: 'Drum vibration troubleshooting, cooling coil repair, thermostat & inverter PCB diagnostics for all major brands.',
        startingPrice: 399,
        priceDisplay: 'From ₹399',
        rating: 4.8,
        reviewCount: 390,
        duration: '1 - 2 Hours',
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
        popular: false,
        features: ['OEM Inverter Circuit Diagnostics', 'Front/Top Load Drum Suspension Fix', 'Compressor Relay & Gas Refill', '90-Day Guarantee on Replaced Spares']
      }
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    shortTitle: 'Plumbing',
    icon: 'Droplets',
    startingPrice: 'From ₹199',
    badge: '30-Min Rapid Visit',
    offerBadge: 'FROM ₹199',
    description: 'Leak fixes, fittings, installations',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'rep-plumber',
        categoryId: 'plumbing',
        categoryName: 'Plumbing',
        name: 'Expert Plumber & Leakage Repair',
        shortDescription: 'Tap/flush repair, pipe blockage clearing, motor installation, geyser plumbing, and water tank pipeline fittings.',
        startingPrice: 199,
        priceDisplay: 'From ₹199',
        rating: 4.8,
        reviewCount: 650,
        duration: 'Within 60 Mins',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['High-Pressure Drain Clearing Snake Tool', 'Leakage & Seepage Diagnosis', 'Genuine CPVC/PVC Spares Guarantee', 'Clean & Dry Workspace Post Work']
      }
    ]
  },
  {
    id: 'electrician',
    title: 'Electrician',
    shortTitle: 'Electrician',
    icon: 'Zap',
    startingPrice: 'From ₹199',
    badge: 'Safety Certified',
    offerBadge: '30-MIN ARRIVAL',
    description: 'Wiring, repairs, installations',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'rep-electrician',
        categoryId: 'electrician',
        categoryName: 'Electrician',
        name: 'Certified Electrician on Demand',
        shortDescription: 'Fan/light fitting, MCB fuse troubleshooting, short circuit repair, inverter wiring, and appliance installation.',
        startingPrice: 199,
        priceDisplay: 'From ₹199',
        rating: 4.8,
        reviewCount: 780,
        duration: 'Within 30-60 Mins',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Verified & Tool-Equipped Electricians', 'Standard Rate Card with Zero Overcharging', '30-Day Workmanship Warranty', 'Emergency Short-Circuit Response']
      }
    ]
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    shortTitle: 'Carpentry',
    icon: 'Wrench',
    startingPrice: 'From ₹299',
    badge: 'Master Woodworkers',
    offerBadge: 'EXPERTS AT DOOR',
    description: 'Furniture repair, custom fittings',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'rep-carpenter',
        categoryId: 'carpentry',
        categoryName: 'Carpentry',
        name: 'Skilled Carpenter & Furniture Fix',
        shortDescription: 'Door lock installation, hinge replacement, modular wardrobe repairs, bed assembly, and customized woodwork.',
        startingPrice: 299,
        priceDisplay: 'From ₹299',
        rating: 4.7,
        reviewCount: 420,
        duration: 'Within 90 Mins',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Godrej / Yale Lock Specialists', 'Hydraulic Soft-Close Hinge Fitting', 'Drilling & Wall Hanging Montage', 'Solid Wood & Plywood Repair']
      }
    ]
  },
  {
    id: 'ro-water-purifier',
    title: 'RO/Water Purifier Service',
    shortTitle: 'RO Service',
    icon: 'Droplets',
    startingPrice: 'From ₹349',
    badge: '100% Genuine Filters',
    offerBadge: 'FREE TDS CHECK',
    description: 'Install & annual maintenance',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    services: [
      {
        id: 'app-ro-service',
        categoryId: 'ro-water-purifier',
        categoryName: 'RO/Water Purifier Service',
        name: 'RO Water Purifier Repair & Membrane Filter Replacement',
        shortDescription: 'TDS water quality check, pre-carbon sediment filter change, RO membrane replacement & pump repair for Kent, Aquaguard, Pureit.',
        startingPrice: 349,
        priceDisplay: 'From ₹349',
        rating: 4.9,
        reviewCount: 560,
        duration: '45 - 60 Mins',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        popular: true,
        features: ['Calibrated Digital TDS Audit (Before/After)', 'Certified 100% Genuine RO Membrane', 'Pump Leakage & Solenoid Valve Fix', '60-Day Replacement Warranty']
      }
    ]
  }
];

export const ALL_HOME_SERVICES: HomeServiceItem[] = HOME_SERVICE_CATEGORIES.flatMap(c => c.services);

export const HOME_SERVICES_CATALOG = HOME_SERVICE_CATEGORIES.map(cat => ({
  id: cat.id,
  title: cat.title,
  shortDesc: cat.description,
  pricing: cat.startingPrice,
  offerBadge: cat.offerBadge,
  image: cat.image,
  rating: 4.9,
  reviewsCount: 380,
  features: cat.services[0]?.features || ['100% Verified Pros', 'Doorstep Service', 'Warranty Included']
}));


