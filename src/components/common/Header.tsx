import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { Currency, Language, UserRole } from '../../types';
import { Search, ShoppingBag, Heart, ShieldCheck, UserCheck, Menu, X, Globe, ChevronDown, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenRoleModal: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRoleModal, onOpenSearch }) => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    currentRole,
    currentRoute,
    navigateTo,
    cart,
    favorites,
    setIsCartOpen,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryMenuOpen, setGalleryMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);
  const t = translations[language];

  const navLinks = [
    { label: t.nav.artists, route: '/artists' },
    { label: t.nav.exhibitions, route: '/exhibitions' },
    { label: t.nav.commissions, route: '/commissions' },
    { label: t.nav.journal, route: '/journal' },
    { label: t.nav.about, route: '/about' },
  ];

  const handleNav = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  const getRoleBadgeLabel = (role: UserRole): string => {
    switch (role) {
      case 'ARTIST':
        return 'Artist Portal';
      case 'ART_CURATOR':
        return 'Curator Admin';
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return 'Director Admin';
      case 'FINANCE_MANAGER':
        return 'Treasury';
      default:
        return 'Collector View';
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-[#817C73]/20 bg-[#F7F5F0]/95 backdrop-blur-xl transition-colors">
      {/* Editorial Announcement Banner */}
      <div className="bg-[#171717] text-[#F7F5F0] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B89B62]" />
            <span className="font-serif italic tracking-wide text-xs">
              {language === 'sw'
                ? 'Karibu Mrisho Art Gallery · Arusha, Tanzania'
                : 'Welcome to Mrisho Art Gallery · Arusha, Tanzania'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#817C73]">
            <span className="text-[#F7F5F0]/80">Arusha, Tanzania</span>
            <span>·</span>
            <button
              onClick={() => handleNav('/about')}
              className="hover:text-[#B89B62] transition-colors underline underline-offset-2"
            >
              Visitor Guidelines
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (Utility/Actions) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-[88px] flex items-center justify-between gap-5">
        {/* Zone 1: Official Brand Logo & Wordmark */}
        <div className="flex items-center gap-4 shrink-0 py-1">
          <button
            onClick={() => handleNav('/')}
            className="text-left group focus:outline-none flex items-center"
            aria-label="Mrisho Art Gallery — Home"
          >
            <img
              src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
              alt="Mrisho Art Gallery — Art Beyond Boundaries"
              className="h-14 sm:h-[68px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
        </div>

        {/* Zone 2: Clean 4–6 Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-[#171717]/80">
          <div className="relative">
            <button
              type="button"
              onClick={() => setGalleryMenuOpen(value => !value)}
              aria-expanded={galleryMenuOpen}
              className={`flex items-center gap-1.5 py-3 whitespace-nowrap transition-colors hover:text-[#9A7B43] ${currentRoute === '/gallery' ? 'text-[#9A7B43]' : 'text-[#171717]/80'}`}
            >
              {t.nav.gallery}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${galleryMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {navLinks.map(link => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-3 whitespace-nowrap transition-colors hover:text-[#9A7B43] ${
                  isActive ? 'text-[#9A7B43] font-bold' : 'text-[#171717]/75'
                }`}
              >
                {link.label}
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B89B62]" />}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Utility & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Catalog"
            className="p-2 text-[#171717]/80 hover:text-[#171717] hover:bg-[#817C73]/10 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <div className="flex items-center text-xs font-medium border border-[#817C73]/30 px-2 py-1 bg-white">
            <Globe className="w-3 h-3 text-[#817C73] mr-1.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1 transition-colors ${
                language === 'en' ? 'font-bold text-[#171717]' : 'text-[#817C73] hover:text-[#171717]'
              }`}
            >
              EN
            </button>
            <span className="text-[#817C73]/40">/</span>
            <button
              onClick={() => setLanguage('sw')}
              className={`px-1 transition-colors ${
                language === 'sw' ? 'font-bold text-[#171717]' : 'text-[#817C73] hover:text-[#171717]'
              }`}
            >
              SW
            </button>
          </div>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as Currency)}
            className="text-xs font-medium border border-[#817C73]/30 px-2 py-1 bg-white text-[#171717] focus:outline-none focus:border-[#B89B62]"
          >
            <option value="TZS">TZS (Sh)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          <button
            type="button"
            onClick={() => handleNav('/commissions')}
            className="hidden xl:inline-flex min-h-10 items-center gap-2 bg-[#B89B62] px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171717] transition-colors hover:bg-[#171717] hover:text-white"
          >
            {language === 'sw' ? 'Wasiliana nasi' : 'Enquire'}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Role Perspective Switcher */}
          <button
            onClick={onOpenRoleModal}
            className="hidden md:flex items-center gap-1.5 text-xs border border-[#171717] px-2.5 py-1 text-[#171717] hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
            title="Switch platform view (Customer, Artist, Curator, Admin)"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#B89B62]" />
            <span className="font-medium whitespace-nowrap">{getRoleBadgeLabel(currentRole)}</span>
          </button>

          {/* Favorites */}
          <button
            onClick={() => handleNav('/account')}
            aria-label="Favorites"
            className="relative p-2 text-[#171717]/80 hover:text-[#171717] transition-colors"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#B89B62] text-white text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Bag / Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Acquisition Bag"
            className="flex items-center gap-2 bg-[#171717] text-[#F7F5F0] px-3.5 py-2 text-xs font-medium hover:bg-[#171717]/90 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#B89B62]" />
            <span className="hidden sm:inline whitespace-nowrap">{t.nav.cart}</span>
            <span className="bg-[#B89B62] text-[#171717] text-[10px] font-bold px-1.5 py-0.2">
              {cart.length}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#171717]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop gallery discovery menu */}
      {galleryMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 hidden border-b border-[#817C73]/20 bg-white shadow-[0_24px_55px_rgba(23,23,23,0.14)] lg:block">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-8 py-9 lg:px-14">
            <div className="col-span-4 border-r border-[#817C73]/15 pr-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{language === 'sw' ? 'Mkusanyiko wa sanaa' : 'The art collection'}</span>
              <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#171717]">{language === 'sw' ? 'Gundua kazi zenye simulizi.' : 'Discover art with a story.'}</h3>
              <p className="mt-3 max-w-xs text-xs leading-6 text-[#817C73]">{language === 'sw' ? 'Chunguza kazi za sanaa na mitindo mbalimbali kwenye mkusanyiko wa galari.' : 'Explore artworks, disciplines and creative perspectives from the gallery.'}</p>
              <button onClick={() => { handleNav('/gallery'); setGalleryMenuOpen(false); }} className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#171717] hover:text-[#A88B54]">
                {language === 'sw' ? 'Tazama galari yote' : 'Explore all artworks'} <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-7">
              {[
                { title: language === 'sw' ? 'Michoro' : 'Paintings', query: 'Paintings', desc: language === 'sw' ? 'Michoro na sanaa za kuona' : 'Original visual expressions' },
                { title: language === 'sw' ? 'Sanamu' : 'Sculpture', query: 'Sculpture', desc: language === 'sw' ? 'Sanaa za maumbo ya pande tatu' : 'Three-dimensional art forms' },
                { title: language === 'sw' ? 'Picha za watu' : 'Portraiture', query: 'Portraiture', desc: language === 'sw' ? 'Picha na simulizi za watu' : 'People, identity and stories' },
                { title: language === 'sw' ? 'Picha na machapisho' : 'Photography & prints', query: 'Fine Art Prints', desc: language === 'sw' ? 'Picha na uchapishaji wa sanaa' : 'Photography and fine-art prints' },
                { title: language === 'sw' ? 'Wasanii' : 'Artists', route: '/artists', desc: language === 'sw' ? 'Kutana na wabunifu' : 'Meet the artists and makers' },
                { title: language === 'sw' ? 'Maonesho' : 'Exhibitions', route: '/exhibitions', desc: language === 'sw' ? 'Maonesho ya sanaa' : 'Current and past exhibitions' },
              ].map(item => (
                <button key={item.title} onClick={() => { if (item.query) { setSearchQuery(item.query); handleNav('/gallery'); } else if (item.route) handleNav(item.route); setGalleryMenuOpen(false); }} className="group text-left">
                  <span className="block text-sm font-semibold text-[#171717] transition-colors group-hover:text-[#A88B54]">{item.title}</span>
                  <span className="mt-1 block text-[10px] leading-5 text-[#817C73]">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-[#F7F5F0] border-b border-[#817C73]/30 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <button onClick={() => handleNav('/gallery')} className="text-left font-serif text-lg text-[#171717] hover:text-[#B89B62] py-1 border-b border-[#817C73]/10">{t.nav.gallery}</button>
            {navLinks.map(link => (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className="text-left font-serif text-lg text-[#171717] hover:text-[#B89B62] py-1 border-b border-[#817C73]/10"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#817C73]/20 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenRoleModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-xs border border-[#171717] px-3 py-2 text-[#171717]"
            >
              <span>{t.roles.switchRole}</span>
              <span className="font-bold text-[#B89B62]">{getRoleBadgeLabel(currentRole)}</span>
            </button>

            <button
              onClick={() => handleNav('/account')}
              className="text-left text-xs text-[#817C73] hover:text-[#171717]"
            >
              {t.nav.account} & Order History
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
