import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Currency,
  UserRole,
  Artwork,
  Artist,
  Exhibition,
  Collection,
  JournalArticle,
  CommissionRequest,
  Order,
  CartItem,
  AuditLog,
} from '../types';
import {
  SEED_ARTWORKS,
  SEED_ARTISTS,
  SEED_EXHIBITIONS,
  SEED_COLLECTIONS,
  SEED_JOURNAL_ARTICLES,
} from '../data/seedData';
import { createInitialProvenance } from '../services/blockchainProvenance';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  
  // Navigation
  currentRoute: string;
  navigateTo: (route: string) => void;

  // Data
  artworks: Artwork[];
  artists: Artist[];
  exhibitions: Exhibition[];
  collections: Collection[];
  journalArticles: JournalArticle[];
  commissions: CommissionRequest[];
  orders: Order[];
  auditLogs: AuditLog[];

  // Commerce
  cart: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (artworkId: string) => void;
  isFavorite: (artworkId: string) => boolean;

  // Modals & Inspectors
  inspectedArtwork: Artwork | null;
  setInspectedArtwork: (art: Artwork | null) => void;
  inspectedProvenance: Artwork | null;
  setInspectedProvenance: (art: Artwork | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Commission actions
  submitCommission: (request: Omit<CommissionRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => CommissionRequest;
  updateCommissionStatus: (id: string, status: CommissionRequest['status'], quoteAmountTzs?: number) => void;

  // Artist & Admin actions
  submitArtwork: (artworkData: Partial<Artwork>) => Artwork;
  approveArtwork: (artworkId: string) => void;
  rejectArtwork: (artworkId: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SEED_COMMISSIONS: CommissionRequest[] = [
  {
    id: 'comm-101',
    customerName: 'Victoria Sterling',
    customerEmail: 'v.sterling@mayfaircuratorial.co.uk',
    customerPhone: '+44 7700 900142',
    category: 'Paintings',
    mediumPreferred: 'Oil & Natural Ochre on Canvas',
    dimensionsRequired: '200cm x 150cm',
    budgetTzs: 24000000,
    deadline: '2026-08-30',
    deliveryCity: 'London',
    deliveryCountry: 'United Kingdom',
    brief: 'Commissioning a grand-scale dining pavilion canvas exploring the maritime migration routes of Zanzibar and Kilwa Kisiwani. Must feature deep lapis, raw earth umbers and 24k gold leaf highlights.',
    status: 'IN_PROGRESS',
    quoteAmountTzs: 24000000,
    assignedArtistName: 'Mwl. Juma Mwinyi',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-05T14:00:00Z',
    milestones: [
      { title: 'Composition Sketch Approved', completed: true, date: '2026-01-28' },
      { title: 'Ground Layer & Pigment Application', completed: true, date: '2026-02-15' },
      { title: '24k Gold Leaf Gilding', completed: false },
      { title: 'Curation Review & Crated Shipping', completed: false },
    ],
  },
  {
    id: 'comm-102',
    customerName: 'Kassim Salim Mwinyimvua',
    customerEmail: 'kassim.mwinyi@kilimanjaro-advisory.tz',
    customerPhone: '+255 754 889 012',
    category: 'Sculpture',
    mediumPreferred: 'Tanzanian Mpingo (African Blackwood)',
    dimensionsRequired: '130cm height x 50cm base',
    budgetTzs: 18000000,
    deadline: '2026-06-15',
    deliveryCity: 'Dar es Salaam',
    deliveryCountry: 'Tanzania',
    brief: 'Corporate boardroom sculpture symbolizing intergenerational leadership and sustainable development. Interlocking abstract forms inspired by the Makonde tree of life.',
    status: 'QUOTED',
    quoteAmountTzs: 18500000,
    assignedArtistName: 'Aloyce Masoud',
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-02-14T16:00:00Z',
  },
];

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-8801',
    orderNumber: 'MAG-ORD-2026-8801',
    customerName: 'Dr. Tariq Al-Hassan',
    customerEmail: 't.alhassan@emiratesheritage.ae',
    customerPhone: '+971 50 123 4567',
    shippingAddress: {
      street: 'Villa 14, Al Bateen Marina',
      city: 'Abu Dhabi',
      region: 'Abu Dhabi',
      country: 'United Arab Emirates',
      postalCode: '00000',
    },
    items: [
      {
        artworkId: 'art-003',
        title: 'Subira Huzaa Heri (Patience Bears Virtue)',
        artistName: 'Rehema Chande',
        priceTzs: 9500000,
        image: '/src/assets/images/artwork_swahili_portrait_1794114974703.jpg',
        provenanceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
    ],
    subtotalTzs: 9500000,
    shippingTzs: 850000,
    totalTzs: 10350000,
    currencyPaid: 'USD',
    paymentMethod: 'CARD',
    paymentReference: 'STRIPE_TX_94882194',
    paymentStatus: 'PAID',
    fulfillmentStatus: 'CRATING',
    trackingNumber: 'DHL-EXPRESS-TZ-772918',
    createdAt: '2026-02-14T09:15:00Z',
  },
];

const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-02-18T10:15:00Z',
    actor: 'Hussein Sadiki Gumbo',
    role: 'ART_CURATOR',
    action: 'PROVENANCE_BLOCK_MINTS',
    details: 'Minted Genesis and Verification blocks for new masterwork "Voices of Bagamoyo" (art-001).',
  },
  {
    id: 'log-2',
    timestamp: '2026-02-14T09:16:00Z',
    actor: 'Payment Gateway Escrow',
    role: 'FINANCE_MANAGER',
    action: 'PAYMENT_SETTLED',
    details: 'Received full acquisition settlement for Order MAG-ORD-2026-8801. Blockchain deed ownership recorded.',
  },
];

const writeStored = (key: string, value: unknown) => {
  try { window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); } catch { /* Storage may be unavailable. */ }
};

const APP_ROUTES = new Set(['/', '/gallery', '/artists', '/exhibitions', '/commissions', '/journal', '/about', '/account', '/artist-portal', '/admin']);
const normalizeRoute = (route: string) => {
  const normalized = route === '/' ? '/' : '/' + route.split('/').filter(Boolean).join('/');
  return APP_ROUTES.has(normalized) ? normalized : '/';
};
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => readStoredString('mag_lang', 'en') === 'sw' ? 'sw' : 'en');

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = readStoredString('mag_currency', 'TZS');
    return ['TZS', 'USD', 'EUR', 'GBP'].includes(stored) ? stored as Currency : 'TZS';
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('CUSTOMER');
  const [currentRoute, setCurrentRoute] = useState<string>(() => normalizeRoute(window.location.pathname));

  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('mag_artworks');
    if (!saved) return SEED_ARTWORKS;
    try {
      const parsed: Artwork[] = JSON.parse(saved);
      const savedIds = new Set(parsed.map(a => a.id));
      const missingSeeds = SEED_ARTWORKS.filter(s => !savedIds.has(s.id));
      return [...missingSeeds, ...parsed];
    } catch {
      return SEED_ARTWORKS;
    }
  });

  const [artists] = useState<Artist[]>(SEED_ARTISTS);
  const [exhibitions] = useState<Exhibition[]>(SEED_EXHIBITIONS);
  const [collections] = useState<Collection[]>(SEED_COLLECTIONS);
  const [journalArticles] = useState<JournalArticle[]>(SEED_JOURNAL_ARTICLES);

  const [commissions, setCommissions] = useState<CommissionRequest[]>(() => readStoredArray<CommissionRequest>('mag_commissions_v2'));

  const [orders, setOrders] = useState<Order[]>(() => readStoredArray<Order>('mag_orders_v2'));

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [cart, setCart] = useState<CartItem[]>(() => readStoredArray<CartItem>('mag_cart_v2'));

  const [favorites, setFavorites] = useState<string[]>(() => readStoredArray<string>('mag_favorites_v2'));

  const [inspectedArtwork, setInspectedArtwork] = useState<Artwork | null>(null);
  const [inspectedProvenance, setInspectedProvenance] = useState<Artwork | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    writeStored('mag_lang', language);
  }, [language]);

  useEffect(() => {
    writeStored('mag_currency', currency);
  }, [currency]);

  useEffect(() => {
    writeStored('mag_cart_v2', cart);
  }, [cart]);

  useEffect(() => {
    writeStored('mag_favorites_v2', favorites);
  }, [favorites]);

  useEffect(() => {
    writeStored('mag_artworks_v2', artworks);
  }, [artworks]);

  useEffect(() => {
    writeStored('mag_commissions_v2', commissions);
  }, [commissions]);

  useEffect(() => {
    writeStored('mag_orders_v2', orders);
  }, [orders]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
  };

  useEffect(() => {
    const syncRoute = () => setCurrentRoute(normalizeRoute(window.location.pathname));
    const normalized = normalizeRoute(window.location.pathname);
    if (normalized !== window.location.pathname) window.history.replaceState({}, '', normalized);
    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigateTo = (route: string) => {
    const nextRoute = normalizeRoute(route);
    if (window.location.pathname !== nextRoute) window.history.pushState({}, '', nextRoute);
    setCurrentRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (artwork: Artwork) => {
    if (cart.some(item => item.artwork.id === artwork.id)) {
      setIsCartOpen(true);
      return;
    }
    setCart(prev => [...prev, { artwork, addedAt: new Date().toISOString() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (artworkId: string) => {
    setCart(prev => prev.filter(item => item.artwork.id !== artworkId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (artworkId: string) => {
    setFavorites(prev => {
      if (prev.includes(artworkId)) {
        return prev.filter(id => id !== artworkId);
      } else {
        return [...prev, artworkId];
      }
    });
  };

  const isFavorite = (artworkId: string) => favorites.includes(artworkId);

  const submitCommission = (requestData: Omit<CommissionRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): CommissionRequest => {
    const newCommission: CommissionRequest = {
      ...requestData,
      id: `comm-${Date.now()}`,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCommissions(prev => [newCommission, ...prev]);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: requestData.customerName,
        role: 'CUSTOMER',
        action: 'COMMISSION_SUBMITTED',
        details: `Bespoke commission request for ${requestData.category} (${requestData.dimensionsRequired}) registered.`,
      },
      ...prev,
    ]);

    return newCommission;
  };

  const updateCommissionStatus = (id: string, status: CommissionRequest['status'], quoteAmountTzs?: number) => {
    setCommissions(prev =>
      prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            status,
            quoteAmountTzs: quoteAmountTzs ?? c.quoteAmountTzs,
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  const submitArtwork = (artworkData: Partial<Artwork>): Artwork => {
    const id = `art-${Date.now().toString().slice(-4)}`;
    const title = artworkData.title || 'Untitled Masterpiece';
    const artistName = artworkData.artistName || 'Artist submission';
    const year = artworkData.creationYear || new Date().getFullYear();
    const origin = artworkData.origin || 'Arusha, Tanzania';

    const newArtwork: Artwork = {
      id,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: artworkData.description || 'Artwork submitted for gallery review.',
      artistId: artworkData.artistId || 'artist-submission',
      artistName,
      artistOrigin: origin,
      category: artworkData.category || 'Paintings',
      medium: artworkData.medium || 'Not provided',
      materials: artworkData.materials || 'Not provided',
      dimensions: artworkData.dimensions || { heightCm: 0, widthCm: 0 },
      creationYear: year,
      origin,
      images: artworkData.images && artworkData.images.length > 0 ? artworkData.images : [],
      priceTzs: artworkData.priceTzs ?? 0,
      classification: artworkData.classification || 'ORIGINAL',
      status: 'SUBMITTED',
      featured: false,
      provenance: createInitialProvenance(id, artistName, year, title, origin),
      shippingInfo: {
        fragile: true,
        crated: true,
        domesticDays: 2,
        internationalDays: 5,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setArtworks(prev => [newArtwork, ...prev]);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: artistName,
        role: 'ARTIST',
        action: 'ARTWORK_SUBMITTED',
        details: `Artwork "${title}" submitted for curatorial review and blockchain registry.`,
      },
      ...prev,
    ]);

    return newArtwork;
  };

  const approveArtwork = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(art => {
        if (art.id === artworkId) {
          return { ...art, status: 'PUBLISHED', updatedAt: new Date().toISOString() };
        }
        return art;
      })
    );

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: 'Curatorial Board',
        role: 'ART_CURATOR',
        action: 'ARTWORK_APPROVED_AND_PUBLISHED',
        details: `Artwork ${artworkId} verified, assigned gallery catalog accreditation, and published to marketplace.`,
      },
      ...prev,
    ]);
  };

  const rejectArtwork = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(art => {
        if (art.id === artworkId) {
          return { ...art, status: 'REJECTED', updatedAt: new Date().toISOString() };
        }
        return art;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        currentRole,
        setCurrentRole,
        currentRoute,
        navigateTo,
        artworks,
        artists,
        exhibitions,
        collections,
        journalArticles,
        commissions,
        orders,
        auditLogs,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        inspectedArtwork,
        setInspectedArtwork,
        inspectedProvenance,
        setInspectedProvenance,
        isCartOpen,
        setIsCartOpen,
        submitCommission,
        updateCommissionStatus,
        submitArtwork,
        approveArtwork,
        rejectArtwork,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
