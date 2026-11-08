import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { Currency, Language, UserRole } from '../../types';
import { Search, ShoppingBag, Heart, ShieldCheck, UserCheck, Menu, X, Globe } from 'lucide-react';

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
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navLinks = [
    { label: t.nav.gallery, route: '/gallery' },
    { label: language === 'sw' ? 'Mikusanyiko' : 'Collections', route: '/collections' },
    { label: t.nav.artists, route: '/artists' },
    { label: t.nav.exhibitions, route: '/exhibitions' },
    { label: t.nav.commissions, route: '/commissions' },
    { label: t.nav.journal, route: '/journal' },
    { label: t.nav.about, route: '/about' },
    { label: language === 'sw' ? 'Mawasiliano' : 'Contact', route: '/contact' },
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
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#817C73]/20 transition-colors">
      {/* Editorial Announcement Banner */}
      <div className="bg-[#171717] text-[#F7F5F0] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B89B62]" />
            <span className="font-serif italic tracking-wide text-xs">
              {language === 'sw'
                ? 'Onyesho la Sasa: "Mwangwi wa Pwani ya Waswahili" · Jumba Kuu la Arusha, Tanzania'
                : 'Current Salon: "Echoes of the Swahili Coast" · Main Pavilion, Arusha, Tanzania'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#817C73]">
            <a
              href="tel:+255639827831"
              className="text-[#B89B62] hover:underline font-mono"
            >
              Tel: +255 639 827 831
            </a>
            <span>·</span>
            <span className="text-[#F7F5F0]/80">Arusha, Tanzania</span>
            <span>·</span>
            <button
              onClick={() => handleNav('/contact')}
              className="hover:text-[#B89B62] transition-colors underline underline-offset-2"
            >
              {language === 'sw' ? 'Wasiliana Nasi' : 'Client Advisory'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (Utility/Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
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
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
        </div>

        {/* Zone 2: Clean 4–6 Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#171717]/80">
          {navLinks.map(link => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#171717] ${
                  isActive ? 'text-[#171717] font-semibold' : 'text-[#171717]/70'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B89B62]" />
                )}
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
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F0] border-b border-[#817C73]/30 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
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
