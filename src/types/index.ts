export type Language = 'en' | 'sw';

export type Currency = 'TZS' | 'USD' | 'EUR' | 'GBP';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'ART_CURATOR'
  | 'ARTIST'
  | 'CONTENT_EDITOR'
  | 'FINANCE_MANAGER'
  | 'CUSTOMER'
  | 'VISITOR';

export type ArtworkStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'RESERVED'
  | 'SOLD'
  | 'ARCHIVED'
  | 'REJECTED';

export type ArtCategory = 
  | 'Paintings'
  | 'Drawings'
  | 'Sculpture'
  | 'Photography'
  | 'Digital Art'
  | 'Traditional Art'
  | 'Contemporary Art'
  | 'Abstract Art'
  | 'Portraiture'
  | 'Fine Art Prints'
  | 'Mixed Media'
  | 'Crafts'
  | 'Textiles'
  | 'Ceramics'
  | 'Jewelry'
  | 'Installation Art'
  | 'Illustration'
  | 'Decorative Art';

export interface ProvenanceBlock {
  blockIndex: number;
  timestamp: string;
  eventType: 'CREATION' | 'CURATION_VERIFIED' | 'EXHIBITION' | 'ACQUISITION' | 'TRANSFERRED' | 'CONSERVATION';
  location: string;
  actor: string;
  role: string;
  notes: string;
  transactionHash: string;
  previousHash: string;
}

export interface ProvenanceRecord {
  contractAddress: string;
  tokenId: string;
  certificateNumber: string;
  verificationHash: string;
  mintedDate: string;
  network: string; // e.g. "Polygon Fine Art Registry / Private Consortia"
  isAuthentic: boolean;
  blocks: ProvenanceBlock[];
}

export interface Artwork {
  id: string;
  title: string;
  titleSwahili?: string;
  slug: string;
  description: string;
  descriptionSwahili?: string;
  artistId: string;
  artistName: string;
  artistOrigin: string;
  category: ArtCategory;
  medium: string;
  materials: string;
  dimensions: {
    heightCm: number;
    widthCm: number;
    depthCm?: number;
  };
  weightKg?: number;
  creationYear: number;
  origin: string;
  images: string[];
  priceTzs: number;
  classification: 'ORIGINAL' | 'LIMITED_EDITION' | 'REPRODUCTION';
  editionInfo?: {
    current: number;
    total: number;
  };
  status: ArtworkStatus;
  featured: boolean;
  provenance: ProvenanceRecord;
  shippingInfo: {
    fragile: boolean;
    crated: boolean;
    domesticDays: number;
    internationalDays: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  bioSwahili?: string;
  statement: string;
  statementSwahili?: string;
  profileImage: string;
  coverImage?: string;
  origin: string;
  disciplines: string[];
  exhibitionsCount: number;
  awards: string[];
  verified: boolean;
  acceptingCommissions: boolean;
  socials?: {
    instagram?: string;
    website?: string;
  };
}

export interface Exhibition {
  id: string;
  slug: string;
  title: string;
  titleSwahili?: string;
  curator: string;
  status: 'CURRENT' | 'UPCOMING' | 'PAST';
  type: 'SOLO' | 'GROUP' | 'PHYSICAL' | 'VIRTUAL';
  coverImage: string;
  description: string;
  descriptionSwahili?: string;
  venue: string;
  location: string;
  startDate: string;
  endDate: string;
  artworkIds: string[];
  participatingArtistIds: string[];
  capacity?: number;
  registeredCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  titleSwahili?: string;
  subtitle: string;
  description: string;
  coverImage: string;
  artworkIds: string[];
  curatorNotes: string;
}

export interface CartItem {
  artwork: Artwork;
  addedAt: string;
}

export type CommissionStatus = 
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'QUOTED'
  | 'APPROVED'
  | 'DEPOSIT_PAID'
  | 'IN_PROGRESS'
  | 'CUSTOMER_REVIEW'
  | 'REVISION_REQUESTED'
  | 'COMPLETED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface CommissionRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredArtistId?: string;
  category: ArtCategory;
  mediumPreferred: string;
  dimensionsRequired: string;
  budgetTzs: number;
  deadline: string;
  deliveryCity: string;
  deliveryCountry: string;
  brief: string;
  status: CommissionStatus;
  quoteAmountTzs?: number;
  assignedArtistName?: string;
  milestones?: {
    title: string;
    completed: boolean;
    date?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  items: {
    artworkId: string;
    title: string;
    artistName: string;
    priceTzs: number;
    image: string;
    provenanceHash: string;
  }[];
  subtotalTzs: number;
  shippingTzs: number;
  totalTzs: number;
  currencyPaid: Currency;
  paymentMethod: 'M-PESA' | 'AIRTEL_MONEY' | 'MIXX_YAS' | 'HALOPESA' | 'CARD' | 'BANK_WIRE';
  paymentReference: string;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED' | 'FAILED';
  fulfillmentStatus: 'ORDER_PLACED' | 'CRATING' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  trackingNumber?: string;
  createdAt: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  titleSwahili?: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTimeMinutes: number;
  category: string;
  excerpt: string;
  coverImage: string;
  content: string;
  contentSwahili?: string;
  tags: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  details: string;
}
