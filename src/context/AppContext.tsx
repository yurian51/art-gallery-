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

const writeStored = (key: string, value: unknown) => {
  try { window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); } catch { /* Storage may be unavailable. */ }
};

const readStoredString = (key: string, fallback: string): string => {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

const readStoredArray = <T,>(key: string, fallback: T[] = []): T[] => {
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as T[] : fallback;
  } catch {
    return fallback;
  }
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

  const [artworks, setArtworks] = useState<Artwork[]>(() =>
    readStoredArray<Artwork>('mag_artworks_v2', SEED_ARTWORKS)
  );

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
