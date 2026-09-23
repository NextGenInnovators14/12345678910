import { 
  CmsPageData, 
  MediaItem, 
  BannerAdItem, 
  NavigationConfig, 
  BlogPost, 
  TrainingBlog,
  OfferItem 
} from '../types';

export const INITIAL_CMS_PAGES: Record<string, CmsPageData> = {
  home: {
    id: 'home',
    title: 'Home Page',
    slug: '/',
    metaTitle: 'Auricity — Direct Real Estate & 0% Brokerage in Chhatrapati Sambhajinagar',
    metaDescription: 'Find 100% verified direct owner flats, plots, commercial spaces, and RERA projects across Sambhajinagar with 0% brokerage.',
    lastUpdated: '2026-08-29',
    sections: {
      hero: {
        id: 'hero',
        name: 'Hero Banner & Search',
        badge: '100% Owner Properties • Zero Brokerage • Verified Homes',
        heading: 'Find Your Perfect Home in Chhatrapati Sambhajinagar',
        subheading: 'Connect directly with verified owners and discover trusted homes without unnecessary brokerage across CIDCO, Garkheda, Samarth Nagar, and Shendra DMIC.',
        ctaText: 'Search Properties',
        ctaLink: 'properties',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        customFields: {
          tabBuyText: 'Buy Properties',
          tabRentText: 'Rent Direct',
          tabCommercialText: 'Commercial',
          tabPgText: 'PG / Co-Living'
        }
      },
      trustBadges: {
        id: 'trustBadges',
        name: 'Trust Highlights Strip',
        heading: 'Why Buyers & Tenants Trust Auricity',
        subheading: 'Maharashtra’s #1 zero-brokerage verified real estate network.',
        items: [
          { title: '0% Brokerage Guarantee', desc: 'Direct owner transactions with zero commission fees', icon: 'Percent' },
          { title: '100% Physical Verification', desc: 'Every property geo-tagged and title verified', icon: 'ShieldCheck' },
          { title: '30-Year Title Search', desc: 'Empanelled High Court advocates for due diligence', icon: 'FileText' },
          { title: 'Instant Home Loan Desk', desc: 'Pre-approved home loans at lowest interest rates', icon: 'Landmark' }
        ]
      },
      whyChooseUs: {
        id: 'whyChooseUs',
        name: 'Why Choose Us (3 Stacked Blocks)',
        badge: 'The Auricity Advantage',
        heading: 'Why Choose Us?',
        subheading: 'Setting the highest standards in transparency, zero brokerage, and end-to-end doorstep solutions in Chhatrapati Sambhajinagar.',
        customFields: {
          block1Title: 'Zero Brokerage',
          block1Desc: 'Direct owner-to-buyer transactions with 0% brokerage fees. Save ₹50,000 to ₹3,00,000 on your home purchase or rental across Sambhajinagar without paying any middlemen commission.',
          block1Icon: 'ShieldCheck',
          block2Title: 'One Roof Services',
          block2Desc: 'Everything under one roof: 30-year High Court advocate title search, CTS/7-12 extract verification, verified packers & movers, deep cleaning, and expert home painting contractors.',
          block2Icon: 'ThumbsUp',
          block3Title: 'Exciting Offers',
          block3Desc: 'Exclusive festive developer discounts, 0% stamp duty subsidies, instant pre-approved home loan waivers, and free VIP site visit cab assistance for family inspections.',
          block3Icon: 'Award'
        }
      },
      featuredProjects: {
        id: 'featuredProjects',
        name: 'Featured Projects Carousel/Grid',
        badge: 'Premier Builder Mandates',
        heading: 'Featured Projects',
        subheading: 'Handpicked RERA-approved townships and luxury residences with direct developer pricing and zero brokerage.',
        ctaText: 'View All Projects',
        ctaLink: 'projects'
      },
      statsCounter: {
        id: 'statsCounter',
        name: 'Platform Growth Metrics',
        heading: 'Marathwada’s Fastest Growing Real Estate Network',
        items: [
          { label: 'Active Listings', value: '1,250+', highlight: '100% Verified' },
          { label: 'Happy Families Moved', value: '850+', highlight: 'Zero Brokerage' },
          { label: 'MahaRERA Certified Partners', value: '120+', highlight: 'KYC Authenticated' },
          { label: 'Commission Saved', value: '₹4.8 Cr+', highlight: 'Direct to Buyers' }
        ]
      },
      loanBanner: {
        id: 'loanBanner',
        name: 'Home Loan & Bank Partners Banner',
        badge: 'Instant Paperless Sanctions',
        heading: 'Every Loan You Need, All in One Place',
        subheading: 'Home Loans, Plot Loans, Balance Transfers & Commercial Finance starting at 8.25% ROI with 10+ leading nationalized banks in Sambhajinagar.',
        ctaText: 'Apply Now',
        ctaLink: 'https://wa.me/918010506030?text=Hi%20Auricity,%20I%20want%20to%20apply%20for%20a%20Home%20Loan.',
        customFields: {
          calcCtaText: 'EMI Calculator',
          subFeature1: 'Zero Processing Fee',
          subFeature2: 'Doorstep Document Pickup',
          subFeature3: '48-Hour In-Principle Sanction',
          partnersJson: JSON.stringify([
            { name: 'State Bank of India', code: 'SBI', rate: '8.30%', color: 'bg-sky-600' },
            { name: 'HDFC Bank', code: 'HDFC', rate: '8.35%', color: 'bg-blue-800' },
            { name: 'ICICI Bank', code: 'ICICI', rate: '8.40%', color: 'bg-orange-700' },
            { name: 'Bank of Baroda', code: 'BOB', rate: '8.25%', color: 'bg-amber-700' },
            { name: 'Axis Bank', code: 'AXIS', rate: '8.50%', color: 'bg-rose-800' },
            { name: 'Punjab National Bank', code: 'PNB', rate: '8.35%', color: 'bg-red-800' },
            { name: 'Kotak Mahindra', code: 'KOTAK', rate: '8.40%', color: 'bg-red-600' },
            { name: 'Canara Bank', code: 'CANARA', rate: '8.30%', color: 'bg-blue-600' },
            { name: 'Bank of Maharashtra', code: 'BOM', rate: '8.25%', color: 'bg-blue-950' },
            { name: 'LIC Housing Finance', code: 'LIC HFL', rate: '8.45%', color: 'bg-amber-600' }
          ])
        }
      }
    }
  },
  about: {
    id: 'about',
    title: 'About Us',
    slug: '/about',
    metaTitle: 'About Us — Auricity Developers',
    metaDescription: 'Founded in 2023, Auricity Developers is one of the most esteemed real estate management companies in Chhatrapati Sambhajinagar (Aurangabad). Delivering Dreams, Trust, and Customer Excellence.',
    lastUpdated: '2026-09-02',
    sections: {
      mainContent: {
        id: 'mainContent',
        name: 'About Us Content',
        heading: 'About Us',
        subheading: 'Delivering Dreams, Trust, and Customer Excellence.',
        customFields: {
          tagline: 'Delivering Dreams, Trust, and Customer Excellence.',
          paragraphs: [
            "Founded in 2023, Auricity Developers is one of the most esteemed real estate management companies in Chhatrapati Sambhajinagar (Aurangabad). We have helped hundreds of clients achieve their property goals. Whether you want to buy or sell a residential property or rent/lease an office space, we have got you covered.",
            "Auricity Developers has built a legacy of trust, quality, and customer satisfaction. We put our clients first, and every decision we make is towards the welfare of our clients. When you work with us, you not only get access to expertise and years of experience but also trust and a stamp of approval from hundreds of clients we have served.",
            "We assure you a niche experience with personalised services, step-by-step guidance, transparent dealings, fair market pricing, honest commitments, and a well-organised programme to make your next real estate transaction a smooth and memorable one. We believe in educating our customers with in-depth analysis of the latest Real estate market information, current design trends, and prevailing prices.",
            "We only work with Reputed Builders who are known for their exceptional workmanship, solid aesthetically beautiful buildings, fair dealings, timely delivery and have proven track record.",
            "For buying, we truly aspire to get you:\nThe Right property at The Right Location at The Right Price.",
            "And for sellers, we aim to fetch the best price, reliable legal guidance, and a streamlined process with a one-stop solution to sum up all your real estate aspirations on a single table."
          ],
          ownerName: 'Vinod Sonawane',
          ownerRole: 'Director - Auricity Developers',
          ownerPhoto: 'https://cdn.postimage.me/2026/09/02/1000001101.png',
          logoUrl: ''
        }
      }
    }
  },
  projects: {
    id: 'projects',
    title: 'Projects Page',
    slug: '/projects',
    metaTitle: 'New RERA Registered Residential & Commercial Projects in Sambhajinagar',
    metaDescription: 'Explore ready-to-move and under-construction township projects with exclusive builder launch offers.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Projects Hero Header',
        badge: 'MahaRERA Approved Townships',
        heading: 'Premier Builder Projects & Mega Townships',
        subheading: 'Discover upcoming and ready-to-move residential apartments, luxury villas, and industrial plots with zero brokerage and direct developer pricing.',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
      },
      developerOffer: {
        id: 'developerOffer',
        name: 'Exclusive Developer Offer Highlight',
        heading: 'Special 0% Stamp Duty & Modular Kitchen Package',
        subheading: 'Claim developer subsidies on select 2 BHK and 3 BHK bookings across CIDCO and Beed Bypass.',
        ctaText: 'Claim Festive Offer',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      }
    }
  },
  properties: {
    id: 'properties',
    title: 'Properties Page',
    slug: '/properties',
    metaTitle: 'Properties for Sale & Rent in Chhatrapati Sambhajinagar',
    metaDescription: 'Browse 1000+ verified apartments, row houses, collector NA plots, and commercial shops with direct owner contacts.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Properties Explorer Header',
        badge: '0% Brokerage Guarantee',
        heading: 'Explore Verified Properties Across Sambhajinagar',
        subheading: 'Direct contact with property owners and certified MahaRERA consultants. Filter by budget, BHK, locality, and property type.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      },
      safetyNotice: {
        id: 'safetyNotice',
        name: 'Verification Guarantee Banner',
        heading: 'Every Property is Physically & Legally Checked',
        bodyText: 'We verify property photographs, carpet area documentation, and ownership records to ensure hassle-free site visits.'
      }
    }
  },
  offers: {
    id: 'offers',
    title: 'Offers & Deals',
    slug: '/offers',
    metaTitle: 'Exclusive Real Estate Offers & Cashback Deals — Auricity',
    metaDescription: 'Save lakhs on stamp duty, registration fees, and home loan processing charges.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Offers Page Header',
        badge: 'Limited Period Festival Offers',
        heading: 'Exclusive Property Offers & Stamp Duty Waivers',
        subheading: 'Handcrafted promotional deals and instant cashback vouchers on verified projects across Chhatrapati Sambhajinagar.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
      }
    }
  },
  services: {
    id: 'services',
    title: 'Services Page',
    slug: '/services',
    metaTitle: 'Doorstep Real Estate Services in Sambhajinagar — Legal, Packers & Painting',
    metaDescription: 'Book 30-Year Title Searches, Registered Rent Agreements, Packers & Movers, Deep Cleaning, and Painting contractors.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Services Hero Header',
        badge: 'Verified Doorstep Assistance',
        heading: 'End-to-End Real Estate & Home Services',
        subheading: 'From 30-year legal title searches to professional movers and painters, get verified experts delivered right to your doorstep.',
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80'
      },
      guarantee: {
        id: 'guarantee',
        name: 'Service Quality Assurance',
        heading: 'The Auricity Service Assurance',
        bodyText: 'All service providers are background-checked, insured, and monitored with transparent upfront pricing.'
      }
    }
  },
  realtors: {
    id: 'realtors',
    title: 'Realtors & Brokers',
    slug: '/realtors',
    metaTitle: 'MahaRERA Registered Real Estate Brokers in Sambhajinagar',
    metaDescription: 'Find certified real estate consultants and join our broker partner network.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Realtor Hub Header',
        badge: 'MahaRERA Partner Ecosystem',
        heading: 'Verified MahaRERA Real Estate Consultants',
        subheading: 'Connect with certified local property advisors who adhere to MahaRERA transparency standards.',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80'
      },
      joinCta: {
        id: 'joinCta',
        name: 'Join As Realtor Partner CTA',
        heading: 'Are You a Certified MahaRERA Agent?',
        subheading: 'Grow your business with branded digital cards, central lead inflow, and builder township mandates.',
        ctaText: 'Register as Partner Broker',
        ctaLink: 'realtor-register'
      }
    }
  },
  blogs: {
    id: 'blogs',
    title: 'Blogs & News',
    slug: '/blogs',
    metaTitle: 'Sambhajinagar Real Estate News, RERA Law & Investment Guides',
    metaDescription: 'Read the latest property market insights, infrastructure updates on AURIC Smart City, and buyer guides.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Blog Page Header',
        badge: 'Market Insights & Law',
        heading: 'Real Estate News, Insights & Guides',
        subheading: 'Authoritative analysis on property valuation, title search due diligence, and smart city infrastructure in Chhatrapati Sambhajinagar.',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
      }
    }
  },
  contact: {
    id: 'contact',
    title: 'Contact Us',
    slug: '/contact',
    metaTitle: 'Contact Auricity — Support Helpline & Office Address',
    metaDescription: 'Get in touch with our customer support and property advisory desk in Chhatrapati Sambhajinagar.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Contact Header',
        badge: 'We are Here to Help',
        heading: 'Connect with Our Sambhajinagar Advisory Desk',
        subheading: 'Whether you need help finding a property, posting a free listing, or booking a legal title search, our local team is at your service.',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
      },
      officeInfo: {
        id: 'officeInfo',
        name: 'Office & Timings',
        heading: 'Auricity Experience Lounge',
        bodyText: 'Town Centre, CIDCO Cannaught Place & Jalna Road, Chhatrapati Sambhajinagar, Maharashtra 431003',
        customFields: {
          timings: 'Monday to Saturday: 9:00 AM – 8:00 PM (Sunday by Appointment)',
          phone: '+91 8010506030',
          email: 'support@auricity.com',
          whatsapp: '+918010506030'
        }
      }
    }
  },
  legal: {
    id: 'legal',
    title: 'Legal & MahaRERA Disclaimer',
    slug: '/legal',
    metaTitle: 'Terms of Service, Privacy Policy & MahaRERA Compliance — Auricity',
    metaDescription: 'Review legal terms, user privacy policy, and Maharashtra Real Estate Regulatory Authority disclosures.',
    lastUpdated: '2026-08-29',
    sections: {
      header: {
        id: 'header',
        name: 'Legal Header',
        badge: 'Transparency & Compliance',
        heading: 'Terms of Service & Regulatory Compliance',
        subheading: 'Auricity operates in strict compliance with MahaRERA guidelines and consumer protection laws.',
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
      },
      disclaimer: {
        id: 'disclaimer',
        name: 'MahaRERA Regulatory Disclaimer',
        heading: 'Statutory Disclaimer',
        bodyText: 'Auricity is a technology-enabled real estate aggregator and marketing platform. All project information, carpet areas, prices, and possession dates are sourced directly from project developers and public MahaRERA filings. Users are advised to independently verify all documentation prior to executing agreements.'
      }
    }
  }
};

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'med-01',
    title: 'SkyHeights Luxury High-Rise Exterior Elevation',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    category: 'Project: SkyHeights CIDCO N-4',
    tags: ['Apartment', 'Exterior', 'High-Rise', 'CIDCO'],
    fileSize: '1.4 MB',
    dimensions: '1920x1080',
    uploadedAt: '2026-08-20T10:30:00Z',
    description: 'High-res exterior rendering of luxury 3 BHK tower in CIDCO N-4.'
  },
  {
    id: 'med-02',
    title: '3 BHK Typical Floor Plan Blueprint',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    type: 'floorplan',
    category: 'Floorplans',
    tags: ['Floorplan', 'Blueprint', '3 BHK', 'Vastu'],
    fileSize: '840 KB',
    dimensions: '1600x1200',
    uploadedAt: '2026-08-21T14:15:00Z',
    description: 'Sanctioned architectural 3 BHK layout with carpet area measurements.'
  },
  {
    id: 'med-03',
    title: 'Samarth Imperial Heights Video Walkthrough',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'video',
    category: 'Project: Samarth Imperial Heights',
    tags: ['Video Walkthrough', 'Beed Bypass', 'Drone View'],
    fileSize: 'N/A (YouTube)',
    uploadedAt: '2026-08-22T09:00:00Z',
    description: 'Complete 4K drone walkthrough and sample flat tour.'
  },
  {
    id: 'med-04',
    title: 'AURIC Shendra Smart City Reel / Short (9:16)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-buildings-and-skyscrapers-41551-large.mp4',
    type: 'shorts',
    category: 'Reels & Shorts',
    tags: ['Shorts', 'Reel', 'Vertical Video', 'AURIC'],
    fileSize: '4.2 MB',
    dimensions: '1080x1920',
    uploadedAt: '2026-08-23T16:20:00Z',
    description: '15-second vertical video spotlighting industrial infrastructure.'
  },
  {
    id: 'med-05',
    title: 'MahaRERA Sanction Certificate & Brochure PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    type: 'document',
    category: 'Legal Documents & Brochures',
    tags: ['MahaRERA', 'Certificate', 'PDF', 'Brochure'],
    fileSize: '2.1 MB',
    uploadedAt: '2026-08-24T11:00:00Z',
    description: 'MahaRERA project registration document and official sales brochure.'
  },
  {
    id: 'med-06',
    title: 'Living Room Italian Marble Interior View',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    category: 'Interiors',
    tags: ['Living Room', 'Interior', 'Luxury', 'Marble'],
    fileSize: '1.8 MB',
    dimensions: '1920x1080',
    uploadedAt: '2026-08-25T13:45:00Z',
    description: 'Interior view showing modern false ceiling and balcony integration.'
  },
  {
    id: 'med-07',
    title: 'Independent Villa Private Garden & Lawn',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    category: 'Villas & Bungalows',
    tags: ['Villa', 'Garden', 'Beed Bypass', 'Luxury'],
    fileSize: '2.2 MB',
    dimensions: '1920x1080',
    uploadedAt: '2026-08-26T17:10:00Z',
    description: 'Landscaped private garden attached to 4 BHK independent bungalow.'
  },
  {
    id: 'med-08',
    title: 'Doorstep Painting & Surface Preparation',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    category: 'Category: Painting Service',
    tags: ['Services', 'Painting', 'Asian Paints', 'Renovation'],
    fileSize: '1.1 MB',
    dimensions: '1200x800',
    uploadedAt: '2026-08-27T08:30:00Z',
    description: 'Professional mechanized painting service by certified contractors.'
  }
];

export const INITIAL_BANNER_ADS: BannerAdItem[] = [
  {
    id: 'ad-1',
    tag: 'FESTIVAL HOME LOAN OFFER',
    tagBg: 'bg-[#1E4FA8] text-white',
    title: 'Get Instant Pre-Approved Home Loans @ 8.25% ROI',
    subtitle: 'Zero Processing Fees with SBI, HDFC & ICICI Bank Tie-ups',
    desc: 'Exclusive doorstep document pickup in Chhatrapati Sambhajinagar with guaranteed sanction within 48 working hours.',
    ctaText: 'Calculate EMI & Apply',
    ctaActionType: 'emi_modal',
    ctaLink: 'mortgage-calc',
    bgGradient: 'from-[#F7F2E6] via-[#EFE7D5] to-[#E7DEC5] border border-[#DDD3BC]',
    titleColor: 'text-[#1E4FA8]',
    subtitleColor: 'text-[#F2621E]',
    descColor: 'text-slate-700',
    badge: 'Limited Period',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300/80',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    active: true,
    order: 1
  },
  {
    id: 'ad-2',
    tag: 'AURIC SMART CITY MEGA LAUNCH',
    tagBg: 'bg-emerald-700 text-white',
    title: 'Collector Sanctioned NA Plots in Shendra DMIC',
    subtitle: 'Immediate 7/12 Extract Registration & Underground Utilities',
    desc: 'Plug-and-play industrial & residential plots directly connected to Samruddhi Mahamarg Interchange. High appreciation potential.',
    ctaText: 'Explore Project Plots',
    ctaActionType: 'view',
    ctaLink: 'properties',
    bgGradient: 'from-[#EBF7F0] via-[#E2F2E9] to-[#D5EADC] border border-[#C5E2D1]',
    titleColor: 'text-emerald-950',
    subtitleColor: 'text-emerald-700',
    descColor: 'text-slate-700',
    badge: 'RERA Approved',
    badgeStyle: 'bg-emerald-100 text-emerald-900 border-emerald-300/80',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    active: true,
    order: 2
  },
  {
    id: 'ad-3',
    tag: '0% BROKERAGE OWNER CARNIVAL',
    tagBg: 'bg-[#F2621E] text-white',
    title: 'List Your Flat & Get Up to 10 Verified Buyer Leads in 24 Hours',
    subtitle: '100% Free Listing for Sambhajinagar Homeowners',
    desc: 'No middlemen. Direct WhatsApp calls from genuine home seekers looking in CIDCO, Garkheda, Beed Bypass, and Samarth Nagar.',
    ctaText: 'Post Property for FREE',
    ctaActionType: 'post_property',
    ctaLink: 'post-property',
    bgGradient: 'from-[#FFF4ED] via-[#FDECE2] to-[#FCE0D2] border border-[#F6D0BC]',
    titleColor: 'text-orange-950',
    subtitleColor: 'text-[#F2621E]',
    descColor: 'text-slate-700',
    badge: '100% Free',
    badgeStyle: 'bg-orange-100 text-orange-900 border-orange-300/80',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    active: true,
    order: 3
  },
  {
    id: 'ad-4',
    tag: 'FESTIVE OFFER ON BOOKINGS',
    tagBg: 'bg-amber-600 text-white',
    title: 'Zero Brokerage Deals & Flat ₹50,000 Modular Kitchen Voucher',
    subtitle: 'Exclusive Festive Offer with Top Sambhajinagar Builders',
    desc: 'Book select RERA-approved flats in Beed Bypass and Garkheda through Auricity to claim instant home decor cashback vouchers.',
    ctaText: 'View Festive Deals',
    ctaActionType: 'view',
    ctaLink: 'properties',
    bgGradient: 'from-[#FEF9EE] via-[#FDF3DE] to-[#FCECCC] border border-[#EFE0BC]',
    titleColor: 'text-[#1E4FA8]',
    subtitleColor: 'text-[#F2621E]',
    descColor: 'text-slate-700',
    badge: 'Festive Special',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300/80',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    active: true,
    order: 4
  }
];

export const INITIAL_CMS_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'AURIC Smart City Shendra Node Attracts ₹12,000 Cr Global Manufacturing Investments',
    slug: 'auric-smart-city-shendra-investments',
    excerpt: 'With direct Samruddhi Mahamarg connectivity, Shendra and Bidkin nodes are witnessing rapid industrial and high-yield residential real estate demand.',
    content: `### Industrial Renaissance in Chhatrapati Sambhajinagar\nChhatrapati Sambhajinagar is emerging as Maharashtra’s fastest growing smart industrial hub. AURIC (Aurangabad Industrial City) under the Delhi-Mumbai Industrial Corridor (DMIC) has secured major investment commitments in automobile, defence, electronics, and EV manufacturing.\n\n### Why Investors Are Flocking to Shendra & Bidkin Nodes:\n1. **Samruddhi Mahamarg Interchange**: Seamless high-speed cargo transit to JNPT Mumbai within 5 hours.\n2. **Plug-and-Play Utilities**: Underground 400kV substations, recycled industrial water grids, and dual optical fiber backbones.\n3. **Residential Spillover**: Surge in demand for 2 BHK & 3 BHK gated communities on Jalna Road and CIDCO N-1 to N-4.`,
    category: 'AURIC & Infrastructure',
    author: 'Auricity Research Desk',
    authorRole: 'Chief Market Analyst',
    readTimeMinutes: 4,
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-08-24',
    published: true,
    tags: ['AURIC', 'Infrastructure', 'DMIC', 'Industrial Real Estate']
  },
  {
    id: 'blog-02',
    title: 'MahaRERA 2026 Guidelines: Why 30-Year Title Search is Essential Before Buying Resale Flats',
    slug: 'maharera-30-year-title-search-guide',
    excerpt: 'Legal experts break down how title deed checks, CTS extract audits, and occupancy certificate verification safeguard your hard-earned savings.',
    content: `### The Legal Imperative of Title Searches\nPurchasing a resale apartment or NA plot requires comprehensive due diligence. Under MahaRERA and Maharashtra Land Revenue Code regulations, verifying the 30-year chain of title ownership protects buyers from boundary disputes and illegal encumbrances.\n\n### Crucial Documents Every Buyer Must Demand:\n- **7/12 Extract (Satbara)** and Mutation Entries (Ferfar Patrak)\n- **Town Planning (TP) Sanctioned Layout**\n- **Non-Agricultural (NA-47) Sanction Order** from Collectorate\n- **Occupancy Certificate (OC)** from Sambhajinagar Municipal Corporation\n- **Sub-Registrar Search Report** confirming zero mortgages or bank attachments.`,
    category: 'Legal & RERA',
    author: 'Adv. Suresh Deshpande',
    authorRole: 'Empanelled High Court Advocate',
    readTimeMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-08-18',
    published: true,
    tags: ['MahaRERA', 'Title Search', 'Legal Verification', 'Property Law']
  },
  {
    id: 'blog-03',
    title: 'Why Beed Bypass & CIDCO Continue to Be Top Rental Yield Hotspots in Sambhajinagar',
    slug: 'beed-bypass-cidco-rental-yields',
    excerpt: 'Close proximity to coaching hubs, hospitals, and educational institutes keeps rental vacancy rates below 3% in central Sambhajinagar.',
    content: `### High Rental Yields in Prime Micro-Markets\nInvestors seeking 4.5% to 6.2% annual rental yields are heavily focusing on 2 BHK and 3 BHK apartments in CIDCO N-1 to N-8, Garkheda Parisar, and Beed Bypass Road.\n\n### Growth Catalysts:\n- **Medical & Coaching Hubs**: Over 40,000 students and junior doctors require quality rental apartments each academic year.\n- **Modern Amenities**: Gated communities with gyms and power backup command a 20% rental premium over standalone buildings.`,
    category: 'Market Trends',
    author: 'Pooja Kulkarni',
    authorRole: 'Senior Property Consultant',
    readTimeMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-08-12',
    published: true,
    tags: ['Rental Yield', 'CIDCO', 'Beed Bypass', 'Investment']
  }
];

export const INITIAL_NAVIGATION_CONFIG: NavigationConfig = {
  topBarBadge: 'FREE',
  topBarText: 'Are You A Property Owner? List Your Property',
  topBarPhone: '+91 8010506030',
  topAnnouncementPillText: 'FREE',
  topAnnouncementPillAction: 'post-property',
  joinAuricityText: 'Join Auricity',
  joinAuricityLink: 'https://wa.me/918010506030',
  headerButtonText: 'Menu',
  headerPhoneText: '+91 8010506030',
  headerPhoneDisplay: 'Call +91 8010506030',
  loanButtonText: 'Loan',
  loanButtonLink: 'loan',
  navItems: [
    { id: 'nav-home', label: 'Home', viewOrUrl: 'home', order: 1, published: true },
    { id: 'nav-about', label: 'About Us', viewOrUrl: 'about', order: 2, published: true },
    { 
      id: 'nav-projects', 
      label: 'Our Projects', 
      viewOrUrl: 'projects', 
      isDropdown: true, 
      order: 3, 
      published: true,
      subItems: [
        { id: 'sub-proj-all', label: 'All Projects', viewOrUrl: 'projects' },
        { id: 'sub-proj-res', label: 'Residential', viewOrUrl: 'projects', filterParam: 'Residential' },
        { id: 'sub-proj-comm', label: 'Commercial', viewOrUrl: 'projects', filterParam: 'Commercial' },
        { id: 'sub-proj-ind', label: 'Industrial', viewOrUrl: 'projects', filterParam: 'Industrial' },
        { id: 'sub-proj-plot', label: 'Plot-Land', viewOrUrl: 'projects', filterParam: 'Plots' }
      ]
    },
    { 
      id: 'nav-props', 
      label: 'Properties', 
      viewOrUrl: 'properties', 
      isDropdown: true, 
      order: 4, 
      published: true,
      subItems: [
        { id: 'sub-prop-all', label: 'All Properties', viewOrUrl: 'properties' },
        { id: 'sub-prop-res', label: 'Residential', viewOrUrl: 'properties', filterParam: 'Residential' },
        { id: 'sub-prop-comm', label: 'Commercial', viewOrUrl: 'commercial', filterParam: 'Commercial' },
        { id: 'sub-prop-ind', label: 'Industrial', viewOrUrl: 'properties', filterParam: 'Industrial' },
        { id: 'sub-prop-plot', label: 'Plot-Land', viewOrUrl: 'plots', filterParam: 'Plots' }
      ]
    },
    { id: 'nav-offers', label: 'Offers', viewOrUrl: 'offers', order: 5, published: true, badge: 'Festive' },
    { id: 'nav-services', label: 'Services', viewOrUrl: 'services', order: 6, published: true },
    { id: 'nav-realtors', label: 'Realtors', viewOrUrl: 'realtors', order: 7, published: true },
    { id: 'nav-contact', label: 'Contact Us', viewOrUrl: 'contact', order: 8, published: true }
  ],
  footerTagline: 'Chhatrapati Sambhajinagar\'s authoritative direct real estate portal & verified service ecosystem. Connecting genuine buyers, tenants, owners, and developers with 0% Brokerage and 100% legal transparency.',
  footerAddress: 'CIDCO Cannaught Place & Jalna Road, Chhatrapati Sambhajinagar, MH 431005',
  footerPhone: '+91 8010506030',
  footerEmail: 'support@auricity.com',
  companyAddress: 'CIDCO Cannaught Place & Jalna Road, Chhatrapati Sambhajinagar, MH 431005',
  rocCin: 'U70109MH2024PTC418920',
  panNo: 'AAACA9812E',
  contactPhones: ['+91 8010506030', '+91 240 2345678'],
  contactEmails: ['support@auricity.com', 'contact@auricity.com'],
  disclaimerText: 'Disclaimer: Auricity Developers is an authorized direct real estate facilitation and property technology platform. All property and project specifications, plans, prices, and amenities are compiled directly from verified owners and MahaRERA-registered developers.',
  copyrightText: '© 2026 Auricity. All Rights Reserved.',
  socialLinks: {
    facebook: 'https://facebook.com/auricity',
    instagram: 'https://instagram.com/auricity.official',
    linkedin: 'https://linkedin.com/company/auricity',
    youtube: 'https://youtube.com/@auricity',
    whatsapp: 'https://wa.me/918010506030',
    twitter: 'https://x.com/auricity_in'
  },
  partnerLogos: [
    { id: 'partner-app', name: 'Google Play', category: 'app_store', subtext: 'Get it on Google Play' },
    { id: 'partner-sbi', name: 'State Bank of India', category: 'bank', subtext: 'Preferred Home Loan Partner' },
    { id: 'partner-hdfc', name: 'HDFC Bank', category: 'bank', subtext: 'Instant Sanction Support' },
    { id: 'partner-icici', name: 'ICICI Bank', category: 'bank', subtext: 'Fast-Track Processing' },
    { id: 'partner-bob', name: 'Bank of Baroda', category: 'bank', subtext: 'Special ROI Rates' },
    { id: 'partner-maharera', name: 'MahaRERA Registered', category: 'compliance', subtext: 'RERA Compliance Standard' },
    { id: 'partner-razorpay', name: 'Razorpay Verified', category: 'payment', subtext: '100% Encrypted Transactions' },
    { id: 'partner-ssl', name: '256-Bit SSL Security', category: 'compliance', subtext: 'Bank-Grade Data Protection' }
  ],
  footerCorporateLinks: [
    { id: 'corp-1', label: 'About Us', viewOrUrl: 'about' },
    { id: 'corp-2', label: 'Home', viewOrUrl: 'home' },
    { id: 'corp-3', label: 'Projects', viewOrUrl: 'projects' },
    { id: 'corp-4', label: 'Blog & News', viewOrUrl: 'blogs' },
    { id: 'corp-5', label: 'Contact Us', viewOrUrl: 'contact' },
    { id: 'corp-6', label: 'Refund & Privacy Policy', viewOrUrl: 'legal' }
  ],
  footerColumns: [
    {
      id: 'col-properties',
      title: 'Properties & Townships',
      links: [
        { label: 'Flats for Sale in Sambhajinagar', viewOrUrl: 'properties' },
        { label: 'Direct Owner Rental Homes', viewOrUrl: 'rentals' },
        { label: 'Student & Working PG / Hostels', viewOrUrl: 'pgs' },
        { label: 'RERA Registered New Projects', viewOrUrl: 'projects' },
        { label: '+ Post Free Property Listing', viewOrUrl: 'post-property' }
      ]
    },
    {
      id: 'col-services',
      title: 'Doorstep Services',
      links: [
        { label: '30-Year Title Search & Legal Opinion', viewOrUrl: 'services' },
        { label: 'Packers & Movers Sambhajinagar', viewOrUrl: 'services' },
        { label: 'Deep Cleaning & Sanitization', viewOrUrl: 'services' },
        { label: 'Asian Paints Wall Painting', viewOrUrl: 'services' },
        { label: 'Online Rent Agreement Registration', viewOrUrl: 'services' }
      ]
    },
    {
      id: 'col-realtors',
      title: 'For Realtors & Partners',
      links: [
        { label: 'Realtor CRM Portal', viewOrUrl: 'realtor-portal' },
        { label: 'Join Partner Network (FREE)', viewOrUrl: 'realtor-register' },
        { label: 'Digital Business Card Generator', viewOrUrl: 'realtor-card' },
        { label: 'MahaRERA Broker Academy', viewOrUrl: 'blogs' },
        { label: 'Builder Mandates Desk', viewOrUrl: 'projects' }
      ]
    },
    {
      id: 'col-company',
      title: 'Company & Compliance',
      links: [
        { label: 'About Auricity Story', viewOrUrl: 'about' },
        { label: 'Sambhajinagar Real Estate News', viewOrUrl: 'blogs' },
        { label: 'Terms of Service & Rules', viewOrUrl: 'legal' },
        { label: 'Privacy & Refund Policy', viewOrUrl: 'legal' },
        { label: 'Contact Customer Support', viewOrUrl: 'contact' }
      ]
    }
  ]
};
