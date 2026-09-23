import React from 'react';
import {
  // Main Navigation
  Home,
  Building2,
  KeyRound,
  BedDouble,
  PlusCircle,
  Menu,
  X,
  LogIn,
  UserPlus,
  Heart,
  Bell,
  // Search & Filters
  MapPin,
  LayoutGrid,
  IndianRupee,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  // Trust & Verification
  BadgePercent,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  // Features & Highlights
  Smile,
  Sparkles,
  UserCheck,
  Truck,
  Zap,
  Layers,
  TrendingDown,
  // Categories
  LandPlot,
  Briefcase,
  Wrench,
  Landmark,
  // Home Services
  Paintbrush,
  ShieldAlert,
  Scale,
  Droplets,
  // Property Card Icons
  Award,
  Star,
  MessageSquare,
  Clock,
  CalendarCheck,
  Umbrella,
  Radio,
  Crosshair,
  Lock,
  PhoneCall,
  MessageCircle,
  // Payments & Offers
  Percent,
  Calculator,
  CreditCard,
  Gift,
  Tag,
  Banknote,
  // Support & Misc
  Headphones,
  Bot,
  Share2,
  Download,
  Bookmark,
  ArrowUp,
  // Nav / UI Utilities
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Eye,
  Trash2,
  Edit,
  FileText,
  Users,
  Copy,
  DollarSign,
  List,
  Maximize2,
  Mail,
  User,
  LucideIcon
} from 'lucide-react';

export type IconCategory = 
  | 'navigation'
  | 'search'
  | 'trust'
  | 'features'
  | 'categories'
  | 'services'
  | 'property-card'
  | 'payments'
  | 'support'
  | 'utility';

export type IconName =
  // Main Navigation
  | 'home'
  | 'buy-properties'
  | 'rent-direct'
  | 'pg-coliving'
  | 'post-listing'
  | 'menu'
  | 'close'
  | 'sign-in'
  | 'sign-up'
  | 'favorites'
  | 'notifications'
  // Search & Filters
  | 'location'
  | 'bhk-unit'
  | 'budget'
  | 'search'
  | 'filter'
  | 'sort'
  | 'clear'
  // Trust & Verification
  | 'zero-brokerage'
  | 'auricity-verified'
  | 'verified-partners'
  | 'trust-100'
  // Features & Highlights
  | 'happy-families'
  | 'instant-valuator'
  | 'trusted-owners'
  | 'doorstep-services'
  | 'instant-response'
  | 'easy-process'
  | 'best-price'
  // Categories
  | 'category-flats'
  | 'category-villas'
  | 'category-plots'
  | 'category-pg'
  | 'category-commercial'
  | 'category-services'
  | 'category-loans'
  // Home Services
  | 'service-packers-movers'
  | 'service-painting'
  | 'service-cleaning'
  | 'service-pest-control'
  | 'service-legal'
  | 'service-appliances'
  | 'service-plumbing'
  // Property Card Icons
  | 'top-rated'
  | 'rating-star'
  | 'reviews'
  | 'time-duration'
  | 'same-day'
  | 'verified'
  | 'insurance-cover'
  | 'live-tracking'
  | 'fast-transit'
  | 'gps-tracking'
  | 'secure'
  | 'call'
  | 'whatsapp'
  // Payments & Offers
  | 'zero-interest-loans'
  | 'emi-calculator'
  | 'secure-payments'
  | 'best-price-guarantee'
  | 'offers'
  | 'discount'
  | 'easy-emi'
  // Support & Misc
  | 'helpdesk'
  | 'support-24-7'
  | 'ai-advisor'
  | 'share'
  | 'download'
  | 'bookmark'
  | 'back-to-top'
  // Utility
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'eye'
  | 'trash'
  | 'edit'
  | 'document'
  | 'users'
  | 'copy'
  | 'dollar-sign'
  | 'grid'
  | 'list'
  | 'area';

export interface AuricityIconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  active?: boolean;
  variant?: 'blue' | 'orange' | 'default' | 'muted' | 'white' | 'success' | 'green';
  title?: string;
}

// Icon Mapping Registry with Lucide Icons
export const ICON_REGISTRY: Record<IconName, { icon: LucideIcon; defaultCategory: IconCategory; label: string }> = {
  // Main Navigation
  'home': { icon: Home, defaultCategory: 'navigation', label: 'Home' },
  'buy-properties': { icon: Building2, defaultCategory: 'navigation', label: 'Buy Properties' },
  'rent-direct': { icon: KeyRound, defaultCategory: 'navigation', label: 'Rent Direct' },
  'pg-coliving': { icon: BedDouble, defaultCategory: 'navigation', label: 'PG / Co-Living' },
  'post-listing': { icon: PlusCircle, defaultCategory: 'navigation', label: 'Post Listing' },
  'menu': { icon: Menu, defaultCategory: 'navigation', label: 'Menu' },
  'close': { icon: X, defaultCategory: 'navigation', label: 'Close' },
  'sign-in': { icon: LogIn, defaultCategory: 'navigation', label: 'Sign In' },
  'sign-up': { icon: UserPlus, defaultCategory: 'navigation', label: 'Sign Up' },
  'favorites': { icon: Heart, defaultCategory: 'navigation', label: 'Favorites' },
  'notifications': { icon: Bell, defaultCategory: 'navigation', label: 'Notifications' },
  // Search & Filters
  'location': { icon: MapPin, defaultCategory: 'search', label: 'Location' },
  'bhk-unit': { icon: LayoutGrid, defaultCategory: 'search', label: 'BHK / Unit' },
  'budget': { icon: IndianRupee, defaultCategory: 'search', label: 'Budget' },
  'search': { icon: Search, defaultCategory: 'search', label: 'Search' },
  'filter': { icon: SlidersHorizontal, defaultCategory: 'search', label: 'Filter' },
  'sort': { icon: ArrowUpDown, defaultCategory: 'search', label: 'Sort' },
  'clear': { icon: RotateCcw, defaultCategory: 'search', label: 'Clear' },
  // Trust & Verification
  'zero-brokerage': { icon: BadgePercent, defaultCategory: 'trust', label: 'Zero Brokerage' },
  'auricity-verified': { icon: ShieldCheck, defaultCategory: 'trust', label: 'Auricity Verified' },
  'verified-partners': { icon: Handshake, defaultCategory: 'trust', label: 'Verified Partners' },
  'trust-100': { icon: CheckCircle2, defaultCategory: 'trust', label: '100% Trust' },
  // Features & Highlights
  'happy-families': { icon: Smile, defaultCategory: 'features', label: 'Happy Families' },
  'instant-valuator': { icon: Sparkles, defaultCategory: 'features', label: 'Instant Valuator' },
  'trusted-owners': { icon: UserCheck, defaultCategory: 'features', label: 'Trusted Owners' },
  'doorstep-services': { icon: Truck, defaultCategory: 'features', label: 'Doorstep Services' },
  'instant-response': { icon: Zap, defaultCategory: 'features', label: 'Instant Response' },
  'easy-process': { icon: Layers, defaultCategory: 'features', label: 'Easy Process' },
  'best-price': { icon: TrendingDown, defaultCategory: 'features', label: 'Best Price' },
  // Categories
  'category-flats': { icon: Building2, defaultCategory: 'categories', label: 'Flats' },
  'category-villas': { icon: Home, defaultCategory: 'categories', label: 'Villas' },
  'category-plots': { icon: LandPlot, defaultCategory: 'categories', label: 'Plots' },
  'category-pg': { icon: BedDouble, defaultCategory: 'categories', label: 'PG / Co-Living' },
  'category-commercial': { icon: Briefcase, defaultCategory: 'categories', label: 'Commercial' },
  'category-services': { icon: Wrench, defaultCategory: 'categories', label: 'Home Services' },
  'category-loans': { icon: Landmark, defaultCategory: 'categories', label: 'Loans' },
  // Home Services
  'service-packers-movers': { icon: Truck, defaultCategory: 'services', label: 'Packers & Movers' },
  'service-painting': { icon: Paintbrush, defaultCategory: 'services', label: 'Painting' },
  'service-cleaning': { icon: Sparkles, defaultCategory: 'services', label: 'Cleaning' },
  'service-pest-control': { icon: ShieldAlert, defaultCategory: 'services', label: 'Pest Control' },
  'service-legal': { icon: Scale, defaultCategory: 'services', label: 'Legal Services' },
  'service-appliances': { icon: Wrench, defaultCategory: 'services', label: 'Appliances Repair' },
  'service-plumbing': { icon: Droplets, defaultCategory: 'services', label: 'Plumbing' },
  // Property Card Icons
  'top-rated': { icon: Award, defaultCategory: 'property-card', label: 'Top Rated' },
  'rating-star': { icon: Star, defaultCategory: 'property-card', label: 'Rating Star' },
  'reviews': { icon: MessageSquare, defaultCategory: 'property-card', label: 'Reviews' },
  'time-duration': { icon: Clock, defaultCategory: 'property-card', label: 'Time Duration' },
  'same-day': { icon: CalendarCheck, defaultCategory: 'property-card', label: 'Same Day' },
  'verified': { icon: ShieldCheck, defaultCategory: 'property-card', label: 'Verified' },
  'insurance-cover': { icon: Umbrella, defaultCategory: 'property-card', label: 'Insurance Cover' },
  'live-tracking': { icon: Radio, defaultCategory: 'property-card', label: 'Live Tracking' },
  'fast-transit': { icon: Truck, defaultCategory: 'property-card', label: 'Fast Transit' },
  'gps-tracking': { icon: Crosshair, defaultCategory: 'property-card', label: 'GPS Tracking' },
  'secure': { icon: Lock, defaultCategory: 'property-card', label: 'Secure' },
  'call': { icon: PhoneCall, defaultCategory: 'property-card', label: 'Call' },
  'whatsapp': { icon: MessageCircle, defaultCategory: 'property-card', label: 'WhatsApp' },
  // Payments & Offers
  'zero-interest-loans': { icon: Percent, defaultCategory: 'payments', label: '0% Interest Loans' },
  'emi-calculator': { icon: Calculator, defaultCategory: 'payments', label: 'EMI Calculator' },
  'secure-payments': { icon: CreditCard, defaultCategory: 'payments', label: 'Secure Payments' },
  'best-price-guarantee': { icon: BadgePercent, defaultCategory: 'payments', label: 'Best Price Guarantee' },
  'offers': { icon: Gift, defaultCategory: 'payments', label: 'Offers' },
  'discount': { icon: Tag, defaultCategory: 'payments', label: 'Discount' },
  'easy-emi': { icon: Banknote, defaultCategory: 'payments', label: 'Easy EMI' },
  // Support & Misc
  'helpdesk': { icon: Headphones, defaultCategory: 'support', label: 'Helpdesk' },
  'support-24-7': { icon: PhoneCall, defaultCategory: 'support', label: '24/7 Support' },
  'ai-advisor': { icon: Bot, defaultCategory: 'support', label: 'AI Advisor' },
  'share': { icon: Share2, defaultCategory: 'support', label: 'Share' },
  'download': { icon: Download, defaultCategory: 'support', label: 'Download' },
  'bookmark': { icon: Bookmark, defaultCategory: 'support', label: 'Bookmark' },
  'back-to-top': { icon: ArrowUp, defaultCategory: 'support', label: 'Back to Top' },
  // Utility
  'chevron-down': { icon: ChevronDown, defaultCategory: 'utility', label: 'Chevron Down' },
  'chevron-right': { icon: ChevronRight, defaultCategory: 'utility', label: 'Chevron Right' },
  'chevron-left': { icon: ChevronLeft, defaultCategory: 'utility', label: 'Chevron Left' },
  'eye': { icon: Eye, defaultCategory: 'utility', label: 'View' },
  'trash': { icon: Trash2, defaultCategory: 'utility', label: 'Delete' },
  'edit': { icon: Edit, defaultCategory: 'utility', label: 'Edit' },
  'document': { icon: FileText, defaultCategory: 'utility', label: 'Document' },
  'users': { icon: Users, defaultCategory: 'utility', label: 'Users' },
  'copy': { icon: Copy, defaultCategory: 'utility', label: 'Copy' },
  'dollar-sign': { icon: DollarSign, defaultCategory: 'payments', label: 'Currency' },
  'grid': { icon: LayoutGrid, defaultCategory: 'utility', label: 'Grid View' },
  'list': { icon: List, defaultCategory: 'utility', label: 'List View' },
  'area': { icon: Maximize2, defaultCategory: 'property-card', label: 'Area' }
};

/**
 * Auricity Unified Icon Component
 */
export const AuricityIcon: React.FC<AuricityIconProps> = ({
  name,
  size = 20,
  className = '',
  strokeWidth = 1.8,
  active = false,
  variant,
  title
}) => {
  const item = ICON_REGISTRY[name];
  if (!item) {
    console.warn(`AuricityIcon: Icon "${name}" not found in registry.`);
    return null;
  }

  const LucideComponent = item.icon;

  let colorClass = 'text-[#1E4FA8]';
  if (active) {
    colorClass = 'text-[#F2621E]';
  } else if (variant === 'orange') {
    colorClass = 'text-[#F2621E]';
  } else if (variant === 'blue') {
    colorClass = 'text-[#1E4FA8]';
  } else if (variant === 'muted') {
    colorClass = 'text-[#64748B]';
  } else if (variant === 'white') {
    colorClass = 'text-white';
  } else if (variant === 'success' || variant === 'green') {
    colorClass = 'text-[#16A34A]';
  } else if (variant === 'default') {
    colorClass = 'text-current';
  }

  return (
    <LucideComponent
      size={size}
      strokeWidth={strokeWidth}
      className={`shrink-0 transition-colors duration-200 ${colorClass} ${className}`}
      aria-hidden="true"
      title={title || item.label}
    />
  );
};

export type ConvenienceIconProps = Omit<AuricityIconProps, 'name'>;

// 1. Navigation
export const IconHome: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="home" {...p} />;
export const IconBuyProperties: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="buy-properties" {...p} />;
export const IconRentDirect: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="rent-direct" {...p} />;
export const IconPgCoLiving: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="pg-coliving" {...p} />;
export const IconPostListing: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="post-listing" {...p} />;
export const IconMenu: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="menu" {...p} />;
export const IconClose: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="close" {...p} />;
export const IconSignIn: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="sign-in" {...p} />;
export const IconSignUp: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="sign-up" {...p} />;
export const IconFavorites: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="favorites" {...p} />;
export const IconNotifications: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="notifications" {...p} />;

// 2. Search & Filters
export const IconLocation: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="location" {...p} />;
export const IconBhkUnit: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="bhk-unit" {...p} />;
export const IconBudget: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="budget" {...p} />;
export const IconSearch: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="search" {...p} />;
export const IconFilter: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="filter" {...p} />;
export const IconSort: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="sort" {...p} />;
export const IconClear: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="clear" {...p} />;

// 3. Trust & Verification
export const IconZeroBrokerage: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="zero-brokerage" {...p} />;
export const IconAuricityVerified: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="auricity-verified" {...p} />;
export const IconVerifiedPartners: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="verified-partners" {...p} />;
export const IconTrust100: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="trust-100" {...p} />;

// 4. Features & Highlights
export const IconHappyFamilies: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="happy-families" {...p} />;
export const IconInstantValuator: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="instant-valuator" {...p} />;
export const IconTrustedOwners: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="trusted-owners" {...p} />;
export const IconDoorstepServices: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="doorstep-services" {...p} />;
export const IconInstantResponse: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="instant-response" {...p} />;
export const IconEasyProcess: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="easy-process" {...p} />;
export const IconBestPrice: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="best-price" {...p} />;

// 5. Categories
export const IconCategoryFlats: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-flats" {...p} />;
export const IconCategoryVillas: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-villas" {...p} />;
export const IconCategoryPlots: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-plots" {...p} />;
export const IconCategoryPg: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-pg" {...p} />;
export const IconCategoryCommercial: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-commercial" {...p} />;
export const IconCategoryHomeServices: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-services" {...p} />;
export const IconCategoryLoans: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="category-loans" {...p} />;

// 6. Home Services
export const IconPackersMovers: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-packers-movers" {...p} />;
export const IconPainting: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-painting" {...p} />;
export const IconCleaning: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-cleaning" {...p} />;
export const IconPestControl: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-pest-control" {...p} />;
export const IconLegalServices: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-legal" {...p} />;
export const IconAppliancesRepair: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-appliances" {...p} />;
export const IconPlumbing: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="service-plumbing" {...p} />;

// 7. Property Card Icons
export const IconTopRated: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="top-rated" {...p} />;
export const IconRatingStar: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="rating-star" {...p} />;
export const IconReviews: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="reviews" {...p} />;
export const IconTimeDuration: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="time-duration" {...p} />;
export const IconSameDay: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="same-day" {...p} />;
export const IconVerified: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="verified" {...p} />;
export const IconInsuranceCover: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="insurance-cover" {...p} />;
export const IconLiveTracking: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="live-tracking" {...p} />;
export const IconFastTransit: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="fast-transit" {...p} />;
export const IconGpsTracking: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="gps-tracking" {...p} />;
export const IconSecure: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="secure" {...p} />;
export const IconCall: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="call" {...p} />;
export const IconWhatsApp: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="whatsapp" {...p} />;

// 8. Payments & Offers
export const IconZeroInterestLoans: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="zero-interest-loans" {...p} />;
export const IconEmiCalculator: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="emi-calculator" {...p} />;
export const IconSecurePayments: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="secure-payments" {...p} />;
export const IconBestPriceGuarantee: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="best-price-guarantee" {...p} />;
export const IconOffers: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="offers" {...p} />;
export const IconDiscount: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="discount" {...p} />;
export const IconEasyEmi: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="easy-emi" {...p} />;

// 9. Support & Misc
export const IconHelpdesk: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="helpdesk" {...p} />;
export const IconSupport247: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="support-24-7" {...p} />;
export const IconAiAdvisor: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="ai-advisor" {...p} />;
export const IconShare: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="share" {...p} />;
export const IconDownload: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="download" {...p} />;
export const IconBookmark: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="bookmark" {...p} />;
export const IconBackToTop: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="back-to-top" {...p} />;

// 10. Shorthand Convenience Aliases
export const IconBuy = IconBuyProperties;
export const IconRent = IconRentDirect;
export const IconPG = IconPgCoLiving;
export const IconCommercial = IconCategoryCommercial;
export const IconProperty = IconCategoryFlats;
export const IconRealtorCRM = IconCategoryCommercial;
export const IconCalculator = IconEmiCalculator;

// 11. Utility Actions
export const IconTrash: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="trash" {...p} />;
export const IconEdit: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="edit" {...p} />;
export const IconEye: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="eye" {...p} />;
export const IconDocument: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="document" {...p} />;
export const IconUsers: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="users" {...p} />;
export const IconCopy: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="copy" {...p} />;
export const IconDollarSign: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="dollar-sign" {...p} />;
export const IconLegalOpinion = IconLegalServices;
export const IconTitleSearch = IconDocument;
export const IconReferralBounty = IconOffers;

export const IconEmail: React.FC<ConvenienceIconProps> = ({ size = 16, strokeWidth = 2, className = '', variant = 'blue' }) => {
  let colorClass = 'text-[#1E4FA8]';
  if (variant === 'orange') colorClass = 'text-[#F2621E]';
  else if (variant === 'muted') colorClass = 'text-[#64748B]';
  else if (variant === 'white') colorClass = 'text-white';
  else if (variant === 'success' || variant === 'green') colorClass = 'text-[#16A34A]';
  else if (variant === 'default') colorClass = 'text-current';
  return <Mail size={size} strokeWidth={strokeWidth} className={`shrink-0 transition-colors duration-200 ${colorClass} ${className}`} />;
};

export const IconProfile: React.FC<ConvenienceIconProps> = ({ size = 16, strokeWidth = 2, className = '', variant = 'blue' }) => {
  let colorClass = 'text-[#1E4FA8]';
  if (variant === 'orange') colorClass = 'text-[#F2621E]';
  else if (variant === 'muted') colorClass = 'text-[#64748B]';
  else if (variant === 'white') colorClass = 'text-white';
  else if (variant === 'success' || variant === 'green') colorClass = 'text-[#16A34A]';
  else if (variant === 'default') colorClass = 'text-current';
  return <User size={size} strokeWidth={strokeWidth} className={`shrink-0 transition-colors duration-200 ${colorClass} ${className}`} />;
};

export const IconChevronDown: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="chevron-down" {...p} />;
export const IconChevronRight: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="chevron-right" {...p} />;
export const IconChevronLeft: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="chevron-left" {...p} />;
export const IconGrid: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="grid" {...p} />;
export const IconList: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="list" {...p} />;
export const IconArea: React.FC<ConvenienceIconProps> = (p) => <AuricityIcon name="area" {...p} />;
