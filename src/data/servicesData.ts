import { ServiceItem } from '../types';

export interface ServiceCategoryGroup {
  id: string;
  name: string;
  badge: string;
  description: string;
  services: ServiceItem[];
}

export const CATEGORIZED_SERVICES: ServiceItem[] = [
  // ==========================================
  // Category 1: Core Property Services
  // ==========================================
  {
    id: 'srv-buy',
    title: 'Buy Properties',
    name: 'Buy Properties in Chhatrapati Sambhajinagar',
    category: 'Core Property Services',
    priceDisplay: 'Verified Inventory',
    startingFee: '0% Brokerage Options',
    basePrice: 0,
    price: 0,
    estimatedDays: 'Immediate Viewings',
    turnaroundDays: 1,
    shortDescription: 'Explore 100% MahaRERA verified residential flats, luxury row houses, commercial spaces & NA plots.',
    description: 'Explore 100% MahaRERA verified residential flats, luxury row houses, commercial spaces & NA plots across prime localities of Sambhajinagar.',
    fullDescription: 'Discover your dream home or commercial property in Chhatrapati Sambhajinagar with complete transparency. Our extensive inventory covers CIDCO N-1 to N-12, Beed Bypass luxury row houses, Jalna Road prime commercial hubs, and Shendra AURIC Smart City nodes with verified clear titles and transparent pricing.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    features: [
      '100% MahaRERA & Title Checked Listings',
      'Free Assisted Site Visits with Local Area Experts',
      'Price Negotiation & Ready Reckoner Guidance',
      'End-to-End Registration & Home Loan Support'
    ],
    benefits: [
      'Zero fake or outdated listings guarantee',
      'Direct connect with verified owners & developers',
      'Instant AI Valuation to ensure fair purchase price',
      'Complimentary legal title verification on bookings'
    ],
    process: [
      'Browse verified listings or submit your requirements',
      'Schedule free guided site visits at your convenience',
      'Receive transparent price breakdown & legal documents',
      'Fast-track registration & hassle-free key handover'
    ],
    iconName: 'Building2',
    ctaText: 'Explore Properties to Buy',
    seoTitle: 'Buy Properties in Chhatrapati Sambhajinagar | Auricity Developers',
    seoDescription: 'Find verified flats, villas, plots, and commercial properties for sale in Chhatrapati Sambhajinagar.',
    order: 1,
    published: true,
    popular: true
  },
  {
    id: 'srv-sell',
    title: 'Sell Properties',
    name: 'Sell Your Property Fast with Auricity',
    category: 'Core Property Services',
    priceDisplay: 'Fast Closings',
    startingFee: 'Dedicated Relationship Manager',
    basePrice: 0,
    price: 0,
    estimatedDays: '15 - 30 Days Target',
    turnaroundDays: 20,
    shortDescription: 'Connect with genuine, pre-qualified buyers and get accurate market valuation for fast closings.',
    description: 'Connect with genuine, pre-qualified buyers and get accurate market valuation for fast closings with zero hassle.',
    fullDescription: 'Maximize your property\'s selling value with Auricity\'s extensive network of verified buyers, digital marketing reach, and localized Sambhajinagar real estate intelligence. We handle professional photography, listing verification, buyer screening, and legal sale deed paperwork for maximum peace of mind.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Verified Pre-Qualified Buyer Matching',
      'Free 360° Photography & Virtual Walkthrough',
      'High-Visibility Digital Promotion across Marathwada',
      'Sale Deed Drafting & Sub-Registrar Escort'
    ],
    benefits: [
      'Achieve top market value without distress pricing',
      'Zero spam calls — all buyers are pre-verified',
      'Assisted negotiation by senior property advisors',
      'Safe, bank-verified fund transfer protocols'
    ],
    process: [
      'Submit your property details & ownership proof',
      'Our team conducts site inspection & photography',
      'Listing promoted to active high-intent buyer pool',
      'Deal closure, sale agreement execution & payment'
    ],
    iconName: 'TrendingUp',
    ctaText: 'List Your Property to Sell',
    seoTitle: 'Sell Property Fast in Sambhajinagar | Auricity Developers',
    seoDescription: 'Sell your flat, plot, or commercial space in Chhatrapati Sambhajinagar at best market price.',
    order: 2,
    published: true,
    popular: true
  },
  {
    id: 'srv-rent',
    title: 'Rent / Lease Properties',
    name: 'Rent & Lease Residential / Commercial Properties',
    category: 'Core Property Services',
    priceDisplay: 'Verified Tenants',
    startingFee: 'Quick Move-in',
    basePrice: 0,
    price: 0,
    estimatedDays: '1 - 3 Days',
    turnaroundDays: 2,
    shortDescription: 'Find or lease verified homes, offices, and retail spaces with legally binding registered agreements.',
    description: 'Find or lease verified homes, offices, and retail spaces with legally binding registered agreements.',
    fullDescription: 'Whether you are a tenant looking for a furnished 2BHK in CIDCO or an owner wanting corporate lease tenants for commercial showrooms on Jalna Road, Auricity provides seamless rental matching, background-verified tenants, biometric police verification, and doorstep registered rental agreement execution.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Verified Residential & Commercial Lease Inventory',
      'Tenant Background & Police Verification Check',
      'Online Registered Rent Agreement at Doorstep',
      'Standardized Security Deposit & Inventory Audits'
    ],
    benefits: [
      'Move-in ready homes with zero hidden brokerage hassles',
      'Timely rent collection mechanisms & rent receipts',
      'Commercial lease structuring for high ROI retail/IT',
      'Legal tenancy dispute safeguards'
    ],
    process: [
      'Filter rentals by locality, furnishing & budget',
      'Instant video walkthrough & on-site visit',
      'Digital KYC verification of tenant and owner',
      'Biometric registered e-agreement & key handover'
    ],
    iconName: 'Key',
    ctaText: 'Browse Rentals & Leases',
    seoTitle: 'Flats & Offices for Rent in Sambhajinagar | Auricity',
    seoDescription: 'Find rental flats, shops, and commercial offices with verified agreements in Chhatrapati Sambhajinagar.',
    order: 3,
    published: true,
    popular: true
  },
  {
    id: 'srv-free-listing',
    title: 'Free Property Listing for Owners',
    name: 'Free Property Listing for Property Owners',
    category: 'Core Property Services',
    priceDisplay: '100% FREE',
    startingFee: '₹0 Upfront Charge',
    basePrice: 0,
    price: 0,
    estimatedDays: 'Live in 2 Hours',
    turnaroundDays: 1,
    shortDescription: 'Post your property for free with high-visibility exposure & zero upfront listing charges.',
    description: 'Post your property for free with high-visibility exposure & zero upfront listing charges.',
    fullDescription: 'Property owners in Chhatrapati Sambhajinagar can post residential flats, independent bungalows, collector NA plots, or commercial retail units at zero cost. Gain direct exposure to over 25,000 monthly active buyers and tenants with verified badges and instant WhatsApp inquiry notifications.',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89ab11?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1560520653-9e0e4c89ab11?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Zero Listing Fees & No Hidden Platform Commissions',
      'Instant SMS & WhatsApp Lead Alerts for Inquiries',
      'High-Resolution Photo Gallery & Video Embeds',
      'Direct Control over Price & Availability Status'
    ],
    benefits: [
      '100% free forever for direct property owners',
      'Higher ranking on Auricity search results with verified badge',
      'Reach corporate buyers from Shendra AURIC & MIDC',
      'Dedicated seller dashboard to manage inquiries'
    ],
    process: [
      'Click "List Your Property FREE" & enter property details',
      'Upload real photos, floor plan, and asking price',
      'Quick admin moderation & live publishing within 2 hours',
      'Receive verified buyer calls & WhatsApp messages directly'
    ],
    iconName: 'PlusCircle',
    ctaText: 'Post Free Listing Now',
    seoTitle: 'Free Property Listing in Sambhajinagar | Post Free Ad',
    seoDescription: 'Post property ad for free in Chhatrapati Sambhajinagar. Connect directly with genuine buyers & tenants.',
    order: 4,
    published: true,
    popular: true
  },
  // ==========================================
  // Category 2: Special Offers & Benefits
  // ==========================================
  {
    id: 'srv-zero-brokerage',
    title: 'Zero Brokerage Properties',
    name: '100% Zero Brokerage Properties',
    category: 'Special Offers & Benefits',
    priceDisplay: 'Save 100% Fee',
    startingFee: '₹0 Commission to Buyer',
    basePrice: 0,
    price: 0,
    estimatedDays: 'Instant Connect',
    turnaroundDays: 1,
    shortDescription: 'Direct owner-to-buyer transactions with 100% savings on brokerage fees.',
    description: 'Direct owner-to-buyer transactions with 100% savings on brokerage fees.',
    fullDescription: 'Save between ₹50,000 to ₹3,00,000 on standard broker commissions by browsing Auricity\'s dedicated Zero Brokerage catalog. Every property tagged with "0% Brokerage" connects you straight to genuine owners and builder-direct sales desks without middleman cut.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Direct Contact with Verified Property Owners',
      'Builder Direct Inventory with No Extra Agency Markups',
      'Complimentary Property Inspection Checklist',
      'Transparent Agreement Drafting Assistance'
    ],
    benefits: [
      'Save thousands of rupees in brokerage charges',
      'Transparent direct negotiations without middleman manipulation',
      'Full legal documentation support included',
      'Verified RERA registration status on all units'
    ],
    process: [
      'Filter listings by selecting the "0% Brokerage" tag',
      'View owner contact details or request a callback',
      'Inspect property directly with the owner/developer',
      'Close deal with Auricity legal registration guidance'
    ],
    iconName: 'Percent',
    ctaText: 'View Zero Brokerage Homes',
    seoTitle: 'Zero Brokerage Properties in Sambhajinagar | Direct Owner',
    seoDescription: 'Buy and rent properties in Chhatrapati Sambhajinagar with 0% brokerage fees. Direct owner contact.',
    order: 5,
    published: true,
    popular: true
  },
  {
    id: 'srv-zero-reg',
    title: 'Zero Charges on Property Registration',
    name: 'Zero Charges on Property Registration Desk',
    category: 'Special Offers & Benefits',
    priceDisplay: 'Free Legal Desk',
    startingFee: 'Exclusive Partner Offer',
    basePrice: 0,
    price: 0,
    estimatedDays: '1 Day Execution',
    turnaroundDays: 1,
    shortDescription: 'Free legal drafting & registration support on select developer projects across Sambhajinagar.',
    description: 'Free legal drafting & registration support on select developer projects across Sambhajinagar.',
    fullDescription: 'Enjoy zero service charges on property deed drafting, GRAS e-challan generation, and Sub-Registrar office VIP appointment scheduling when booking partner builder projects or verified Auricity inventory. Save on legal paperwork fees completely.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Free Advocate-Drafted Sale Deed & Agreement to Sale',
      'Maharashtra Ready Reckoner Computation at ₹0 Fee',
      'GRAS e-Challan Generation & Payment Coordination',
      'Sub-Registrar Office Biometric Slot Escort'
    ],
    benefits: [
      'Zero hidden agency charges on deed preparation',
      'Ensure 1% concession for female homebuyers is applied',
      'Accurate circle rate calculation preventing tax notices',
      'Doorstep registered original document delivery'
    ],
    process: [
      'Select qualifying Auricity verified project or property',
      'Submit buyer & seller KYC and property Index-II',
      'Our legal desk drafts deeds and books SRO slot',
      'Execute biometrics in 30 minutes at Sub-Registrar Office'
    ],
    iconName: 'FileCheck',
    ctaText: 'Avail Registration Offer',
    seoTitle: 'Free Property Registration Support Sambhajinagar | Auricity',
    seoDescription: 'Get zero service charges on property registration, deed drafting, and SRO slot booking in Sambhajinagar.',
    order: 6,
    published: true,
    popular: true
  },
  {
    id: 'srv-zero-loan',
    title: '0% Interest Home Loans',
    name: '0% Interest Subsidized Home Loan Assistance',
    category: 'Special Offers & Benefits',
    priceDisplay: 'Subsidized EMI',
    startingFee: 'Partner Bank Tie-ups',
    basePrice: 0,
    price: 0,
    estimatedDays: '3 - 5 Working Days',
    turnaroundDays: 4,
    shortDescription: 'Fast-track home loans with top banks, subsidized interest assistance & instant pre-approval.',
    description: 'Fast-track home loans with top banks, subsidized interest assistance & instant pre-approval.',
    fullDescription: 'Unlock special builder subvention schemes and government interest subsidies (PMAY) offering 0% effective interest periods or subsidized rates with partner banks (SBI, Bank of Maharashtra, HDFC, ICICI). Get doorstep document pickup and guaranteed lowest rate matches.',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Subvention Schemes with 0% Pre-EMI during Construction',
      'PMAY Credit-Linked Subsidy Scheme (CLSS) Assistance',
      'Multi-Bank Comparison: Lowest Interest Rates from 8.35%',
      '100% Free Doorstep Assistance in Sambhajinagar'
    ],
    benefits: [
      'Save lakhs on initial interest payouts during possession delay',
      'Maximum loan eligibility with co-applicant clubbing',
      'Zero processing fee waivers on select banking partners',
      'Quick in-principle sanction letter within 48 hours'
    ],
    process: [
      'Check eligibility using our Home Loan Calculator',
      'Submit income proofs for door-step executive pickup',
      'Bank legal & technical property valuation approval',
      'Sanction letter issued & prompt disbursement'
    ],
    iconName: 'Landmark',
    ctaText: 'Apply for Subsidized Loan',
    seoTitle: '0% Interest Home Loan Schemes Sambhajinagar | Auricity',
    seoDescription: 'Apply for home loans in Sambhajinagar with subvention schemes, low interest rates, and free processing.',
    order: 7,
    published: true,
    popular: true
  },
  {
    id: 'srv-smart-homes',
    title: 'Furnished Smart Homes',
    name: 'Ready Furnished Smart Homes & Automation',
    category: 'Special Offers & Benefits',
    priceDisplay: 'IoT Enabled',
    startingFee: 'Turnkey Luxury',
    basePrice: 0,
    price: 0,
    estimatedDays: 'Ready to Move',
    turnaroundDays: 3,
    shortDescription: 'Move into homes equipped with modular kitchens, smart lighting, biometric locks & ACs.',
    description: 'Move into homes equipped with modular kitchens, smart lighting, biometric locks & ACs.',
    fullDescription: 'Discover our exclusive collection of fully furnished smart homes in Sambhajinagar. Featuring automated IoT lighting, Alexa/Google voice control, smart video doorbells, digital biometric locks, designer modular kitchens, and energy-efficient appliances ready for immediate possession.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Smart IoT Home Automation & Voice Controls',
      'Digital Fingerprint & Video Intercom Security Locks',
      'Modular Acrylic Kitchen with Chimney & Hob',
      'Custom Wardrobes, LED False Ceilings & Premium Furniture'
    ],
    benefits: [
      'Skip months of noisy carpentry and interior execution',
      'Save up to 40% bundled cost compared to retail outfitting',
      '100% move-in ready with zero stress',
      'High rental yield potential for NRI & IT investors'
    ],
    process: [
      'Explore catalog of Furnished Smart Homes in CIDCO & Beed Bypass',
      'Take a 3D digital walkthrough or physical site inspection',
      'Choose custom appliance & smart device package',
      'Receive keys to your fully automated luxury home'
    ],
    iconName: 'Sparkles',
    ctaText: 'Explore Smart Homes',
    seoTitle: 'Furnished Smart Homes for Sale in Sambhajinagar | Auricity',
    seoDescription: 'Buy fully furnished smart homes with IoT automation and modular interiors in Chhatrapati Sambhajinagar.',
    order: 8,
    published: true,
    popular: true
  },
  // ==========================================
  // Category 3: Value-Added & One-Roof Services
  // ==========================================
  {
    id: 'srv-interior',
    title: 'Free Interior Consultancy',
    name: 'Free Interior Design & Space Planning Consultancy',
    category: 'Value-Added & One-Roof Services',
    priceDisplay: '100% Free 3D Plan',
    startingFee: 'Complimentary Session',
    basePrice: 0,
    price: 0,
    estimatedDays: '2 Days Concept',
    turnaroundDays: 2,
    shortDescription: 'Complimentary 3D layout, mood boards, and space optimization by certified interior designers.',
    description: 'Complimentary 3D layout, mood boards, and space optimization by certified interior designers.',
    fullDescription: 'Transform your residential or commercial space with Auricity\'s empanelled interior designers. Receive a free 1-on-1 design consultation, 3D space planning, modular kitchen layout, and transparent material quotation with no obligation.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Free 3D Layout & Photorealistic Renderings',
      'Modular Kitchen, Wardrobe & TV Unit Designs',
      'Material Selection Guide (Marine Ply, Acrylic, PU Finish)',
      'Accurate Budget & Timeline Estimation'
    ],
    benefits: [
      'Maximize living space with clever storage solutions',
      '10-year warranty on termite-proof modular cabinetry',
      'Transparent BOQ with zero hidden surprise charges',
      'Direct oversight by certified interior architects'
    ],
    process: [
      'Share your floor plan or schedule a site measurement',
      'Meet our interior designer for lifestyle & aesthetic briefing',
      'Receive customized 3D design concept & itemized quote',
      'Seamless execution with milestone-based quality checks'
    ],
    iconName: 'Compass',
    ctaText: 'Book Free Interior Consult',
    seoTitle: 'Interior Designers in Sambhajinagar | Free 3D Design Consult',
    seoDescription: 'Get free 3D interior design consultation, modular kitchen planning, and home decor in Sambhajinagar.',
    order: 9,
    published: true,
    popular: true
  },
  {
    id: 'srv-vastu',
    title: 'Vastu Consultancy',
    name: 'Scientific Vastu Shastra Consultation',
    category: 'Value-Added & One-Roof Services',
    priceDisplay: 'Expert Analysis',
    startingFee: 'Non-Destructive Solutions',
    basePrice: 1999,
    price: 1999,
    estimatedDays: '1 - 2 Days',
    turnaroundDays: 2,
    shortDescription: 'Harmonize your home or workplace with scientific Vastu audits and non-demolition remedies.',
    description: 'Harmonize your home or workplace with scientific Vastu audits and non-demolition remedies.',
    fullDescription: 'Ensure prosperity, health, and positive cosmic energy with certified Vastu Shastra experts. We evaluate directional alignments (Ishan, Agneya, Nairutya, Vayavya), main door placements, kitchen & master bedroom orientation, and provide effective non-destructive remedies.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Comprehensive 16-Zone Energy & Compass Audit',
      'Plot, Residential Flat & Commercial Vastu Checking',
      'Remedies without Structural Demolition',
      'Signed Vastu Compliance Certificate & Color Advice'
    ],
    benefits: [
      'Peace of mind before making high-value property purchases',
      'Enhance family harmony, mental clarity, and financial growth',
      'Zero alteration of load-bearing structural columns',
      'Scientific energy balancing with crystal & copper pyramids'
    ],
    process: [
      'Submit property floor plan with exact North direction',
      'Site visit or detailed online energy mapping session',
      'Delivery of comprehensive Vastu report with action points',
      'Follow-up review post-implementation'
    ],
    iconName: 'Sparkles',
    ctaText: 'Schedule Vastu Audit',
    seoTitle: 'Vastu Consultant in Sambhajinagar | Home & Office Vastu',
    seoDescription: 'Scientific Vastu Shastra consultation for flats, villas, and commercial spaces in Sambhajinagar.',
    order: 10,
    published: true,
    popular: false
  },
  {
    id: 'srv-renovation',
    title: 'Home Renovation',
    name: 'Turnkey Home Renovation & Remodeling',
    category: 'Value-Added & One-Roof Services',
    priceDisplay: 'Complete Makeover',
    startingFee: 'Quality Guaranteed',
    basePrice: 15000,
    price: 15000,
    estimatedDays: '7 - 21 Days',
    turnaroundDays: 14,
    shortDescription: 'Complete makeover including waterproofing, painting, tile flooring, bathroom & electrical upgrades.',
    description: 'Complete makeover including waterproofing, painting, tile flooring, bathroom & electrical upgrades.',
    fullDescription: 'Breathe new life into older apartments, independent houses, or commercial shops in Sambhajinagar. Our expert civil engineers and contractors handle tile replacement, modern bathroom transformations, Dr. Fixit chemical waterproofing, false ceiling LED illumination, and premium Asian Paints Royale finishing.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Bathroom & Kitchen Civil Remodeling',
      'High-Grade Terrace & Wall Waterproofing (Dr. Fixit)',
      'Italian Marble & Vitrified Tile Flooring (Kajaria / Somany)',
      'Asian Paints / Dulux Interior & Exterior Painting'
    ],
    benefits: [
      'Boost property resale and rental value by up to 35%',
      'Fixed-price contracts with zero cost escalation',
      'Daily photographic progress updates on WhatsApp',
      '1-year workmanship warranty on all civil works'
    ],
    process: [
      'Free site assessment & detailed scope of work identification',
      'Material sample presentation & fixed quotation signing',
      'Execution by supervised master masons, plumbers & painters',
      'Deep post-renovation cleaning and final handover'
    ],
    iconName: 'Layers',
    ctaText: 'Get Renovation Estimate',
    seoTitle: 'Home Renovation Services in Sambhajinagar | Remodeling',
    seoDescription: 'Turnkey house renovation, painting, tile flooring, and bathroom remodeling in Chhatrapati Sambhajinagar.',
    order: 11,
    published: true,
    popular: true
  },
  {
    id: 'srv-furniture',
    title: 'Furniture & Home Appliances Support',
    name: 'Furniture & Home Appliances Support',
    category: 'Value-Added & One-Roof Services',
    priceDisplay: 'Wholesale Rates',
    startingFee: 'Direct Brand Tie-ups',
    basePrice: 0,
    price: 0,
    estimatedDays: '3 - 5 Days Delivery',
    turnaroundDays: 4,
    shortDescription: 'Exclusive discount tie-ups with top furniture makers and appliance brands for your new home.',
    description: 'Exclusive discount tie-ups with top furniture makers and appliance brands for your new home.',
    fullDescription: 'Furnish your new residence affordably with Auricity\'s bulk buying alliances. Get exclusive 15% to 30% discounts on premium solid teakwood sofas, dining sets, orthopedic mattresses, and top appliance brands (Samsung, LG, Daikin, Haier) with free installation and extended warranties.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Direct Factory Discounts on Teakwood & Sheesham Furniture',
      'Exclusive Pricing on Smart TVs, Inverter ACs & Refrigerators',
      'Free Doorstep Delivery & Expert Assembly in Sambhajinagar',
      'Zero-Cost EMI Financing Options Available'
    ],
    benefits: [
      'Save thousands of rupees compared to local retail showrooms',
      'Curated aesthetic packages matching your apartment dimensions',
      'Brand manufacturer warranties with priority service support',
      'One-stop solution for seamless move-in preparation'
    ],
    process: [
      'Browse our curated furniture & appliance packages',
      'Select customized items or full apartment combo',
      'Our team coordinates doorstep delivery and installation',
      'Quality inspection & brand warranty card issuance'
    ],
    iconName: 'Building',
    ctaText: 'Explore Appliance Offers',
    seoTitle: 'Home Furniture & Appliances Sambhajinagar | Auricity Deals',
    seoDescription: 'Get discounted furniture packages and home appliances with free installation in Chhatrapati Sambhajinagar.',
    order: 12,
    published: true,
    popular: false
  },
  {
    id: 'srv-legal-doc',
    title: 'Legal Guidance & Documentation',
    name: 'Legal Guidance & 30-Year Title Search',
    category: 'Value-Added & One-Roof Services',
    priceDisplay: 'High Court Advocates',
    startingFee: '100% Title Clarity',
    basePrice: 4499,
    price: 4499,
    estimatedDays: '3 Working Days',
    turnaroundDays: 3,
    shortDescription: '30-year index title searches, 7/12 mutation check, encumbrance verification & advocate legal reports.',
    description: '30-year index title searches, 7/12 mutation check, encumbrance verification & advocate legal reports.',
    fullDescription: 'Protect your life savings with rigorous legal scrutiny. Our senior High Court property advocates examine 30 years of registered Index-II records at Sambhajinagar Sub-Registrar Offices, verify 7/12 (Satbara) mutation extracts (Ferfar), NA-47 orders, and town planning sanctions to deliver a certified Title Search Certificate.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    features: [
      '30-Year Sub-Registrar Index-II Physical Record Search',
      '7/12 & 8A Mutation (Ferfar) Chain-of-Title Audit',
      'Collector / CIDCO NA Sanction & Encumbrance Check',
      'Signed Legal Title Clearance Certificate by Advocate'
    ],
    benefits: [
      'Eliminate risks of bank loan rejection or fraudulent sellers',
      'Legally admissible search certificate for home loan sanction',
      'Identification of any undisclosed family partition or litigation',
      'Direct consultation with senior High Court property advocate'
    ],
    process: [
      'Submit property 7/12 or City Survey PR Card details',
      'Advocate conducts physical & digital record extraction at SRO',
      'Layout sanction & mutation verification analysis',
      'Delivery of Signed Legal Search Certificate in PDF & hardcopy'
    ],
    iconName: 'ShieldCheck',
    ctaText: 'Request Legal Title Search',
    seoTitle: 'Property Legal Search & Title Verification Sambhajinagar',
    seoDescription: 'Get 30-year title search, 7/12 verification, and legal due diligence by property advocates in Sambhajinagar.',
    order: 13,
    published: true,
    popular: true
  },
  {
    id: 'srv-market-analysis',
    title: 'Market Analysis & Price Guidance',
    name: 'Locality Market Analysis & Ready Reckoner Guidance',
    category: 'Value-Added & One-Roof Services',
    priceDisplay: 'AI Powered',
    startingFee: 'Data-Driven Insights',
    basePrice: 0,
    price: 0,
    estimatedDays: 'Instant Report',
    turnaroundDays: 1,
    shortDescription: 'Ready Reckoner rate benchmarks, 3-year price trends, capital appreciation & rental yield insights.',
    description: 'Ready Reckoner rate benchmarks, 3-year price trends, capital appreciation & rental yield insights.',
    fullDescription: 'Make data-backed real estate decisions in Chhatrapati Sambhajinagar. Access localized transaction data, micro-market price appreciation trends across CIDCO, Jalna Road, Beed Bypass, and AURIC Shendra, along with stamp duty calculations and rental yield analytics.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Micro-Market Price per Sq.Ft Analysis across 18 Localities',
      'Maharashtra Ready Reckoner SRO Benchmark Rates',
      '3-Year Capital Appreciation & Rental Yield Forecasts',
      'AI Fair Market Property Valuation Engine'
    ],
    benefits: [
      'Avoid overpaying for resale properties or under-pricing sales',
      'Pinpoint high-growth investment corridors near Samruddhi Highway',
      'Know exact stamp duty requirements with female buyer concessions',
      'Free instant valuation reports with confidence scores'
    ],
    process: [
      'Select locality, property type, carpet area, and age',
      'AI engine analyzes recent registration data and Ready Reckoner',
      'Receive instant fair price range & investment score report',
      'Consult with localized Auricity property analyst'
    ],
    iconName: 'Calculator',
    ctaText: 'Check Market Rates',
    seoTitle: 'Sambhajinagar Real Estate Market Rates & Price Trends | Auricity',
    seoDescription: 'Explore property price trends, Ready Reckoner rates, and locality growth analysis in Sambhajinagar.',
    order: 14,
    published: true,
    popular: true
  }
];

// The 6 specific homepage services requested:
export const HOMEPAGE_SERVICES = [
  CATEGORIZED_SERVICES.find(s => s.id === 'srv-buy')!,
  CATEGORIZED_SERVICES.find(s => s.id === 'srv-sell')!,
  CATEGORIZED_SERVICES.find(s => s.id === 'srv-rent')!,
  CATEGORIZED_SERVICES.find(s => s.id === 'srv-zero-brokerage')!,
  CATEGORIZED_SERVICES.find(s => s.id === 'srv-zero-loan')!,
  CATEGORIZED_SERVICES.find(s => s.id === 'srv-free-listing')!
];

export const SERVICE_CATEGORIES: { id: string; name: string; tag: string; description: string }[] = [
  {
    id: 'Core Property Services',
    name: 'Core Property Services',
    tag: 'Primary Transactions',
    description: 'Direct buying, selling, leasing, and free property listings for owners across Chhatrapati Sambhajinagar.'
  },
  {
    id: 'Special Offers & Benefits',
    name: 'Special Offers & Benefits',
    tag: 'Exclusive Savings',
    description: 'Zero brokerage, 0% interest subsidized home loans, zero registration charges, and furnished smart homes.'
  },
  {
    id: 'Value-Added & One-Roof Services',
    name: 'Value-Added & One-Roof Services',
    tag: 'Complete Ecosystem',
    description: 'Architectural planning, free interior design, scientific Vastu audits, renovations, and 30-year title due diligence.'
  }
];

export const AURICITY_SERVICES = CATEGORIZED_SERVICES;
export type PropertyService = ServiceItem;
export type ServiceCategory = string;
