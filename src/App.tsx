import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CuratedFeatures } from './components/home/CuratedFeatures';
import { GalleryView } from './components/gallery/GalleryView';
import { ArtworkDetailModal } from './components/gallery/ArtworkDetailModal';
import { ProvenanceModal } from './components/common/ProvenanceModal';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ArtistsView } from './components/artists/ArtistsView';
import { ExhibitionsView } from './components/exhibitions/ExhibitionsView';
import { CommissionPortal } from './components/commissions/CommissionPortal';
import { CustomerDashboard } from './components/account/CustomerDashboard';
import { ArtistDashboard } from './components/artist-portal/ArtistDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { JournalView } from './components/journal/JournalView';
import { AboutView } from './components/about/AboutView';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const renderRoute = () => {
    switch (currentRoute) {
      case '/gallery':
        return <GalleryView />;
      case '/artists':
        return <ArtistsView />;
      case '/exhibitions':
        return <ExhibitionsView />;
      case '/commissions':
        return <CommissionPortal />;
      case '/journal':
        return <JournalView />;
      case '/about':
        return <AboutView />;
      case '/account':
        return <CustomerDashboard />;
      case '/artist-portal':
        return <ArtistDashboard />;
      case '/admin':
        return <AdminDashboard />;
      case '/':
      default:
        return (
          <>
            <HeroSection />
            <CuratedFeatures />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#171717]">
      {/* Universal Top Bar */}
      <Header
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Universal Museum Editorial Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <ArtworkDetailModal />
      <ProvenanceModal />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <RoleSwitcherModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
