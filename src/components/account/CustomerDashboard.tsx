import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import { ArtworkCard } from '../gallery/ArtworkCard';
import {
  User,
  ShoppingBag,
  Heart,
  Palette,
  ShieldCheck,
  Package,
  Clock,
  ArrowRight,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    language,
    currency,
    orders,
    favorites,
    artworks,
    commissions,
    setInspectedProvenance,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ORDERS' | 'FAVORITES' | 'COMMISSIONS' | 'DEEDS'>('ORDERS');
  const t = translations[language];

  const favoriteArtworks = artworks.filter(a => favorites.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
              Collector Custody & Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Patron Account & Acquisition Registry
            </h1>
            <p className="text-xs text-[#817C73] mt-1">
              Registered Patron: <strong className="text-[#171717]">Dr. Amina Rashidi</strong> · Dar es Salaam Registry Node
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('/gallery')}
              className="px-4 py-2 border border-[#171717] text-xs font-semibold hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
            >
              Browse Gallery
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1">
          {[
            { id: 'ORDERS', label: `Acquisition Orders (${orders.length})`, icon: <ShoppingBag className="w-3.5 h-3.5" /> },
            { id: 'FAVORITES', label: `Saved Masterworks (${favorites.length})`, icon: <Heart className="w-3.5 h-3.5" /> },
            { id: 'COMMISSIONS', label: `Custom Commissions (${commissions.length})`, icon: <Palette className="w-3.5 h-3.5" /> },
            { id: 'DEEDS', label: `Blockchain Provenance Deeds`, icon: <ShieldCheck className="w-3.5 h-3.5 text-[#B89B62]" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#171717] text-[#F7F5F0]'
                  : 'bg-white text-[#817C73] border border-[#817C73]/20 hover:text-[#171717]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white border border-[#817C73]/20 py-16 text-center space-y-3">
              <p className="font-serif italic text-lg text-[#817C73]">No acquisition orders recorded yet.</p>
              <button
                onClick={() => navigateTo('/gallery')}
                className="px-4 py-2 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62]"
              >
                Explore Gallery
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-white border border-[#817C73]/25 p-6 space-y-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#817C73]/15 pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#171717] block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[11px] text-[#817C73]">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} · Paid via {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-[#817C73] block">Carrier Tracking</span>
                      <span className="font-mono font-bold text-[#B89B62]">
                        {order.trackingNumber || 'Pending DHL Booking'}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => {
                    const art = artworks.find(a => a.id === item.artworkId);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-[#F7F5F0] border border-[#817C73]/15"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover border border-[#817C73]/20 shrink-0"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#171717]">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#817C73]">{item.artistName}</p>
                            <p className="font-mono text-[10px] text-[#B89B62] truncate max-w-sm">
                              Deed Hash: {item.provenanceHash}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between sm:justify-end">
                          <span className="font-mono font-bold text-sm text-[#171717]">
                            {formatPrice(item.priceTzs, currency)}
                          </span>

                          {art && (
                            <button
                              onClick={() => setInspectedProvenance(art)}
                              className="px-3 py-1.5 bg-[#171717] text-[#F7F5F0] text-xs font-semibold hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center gap-1.5"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-[#B89B62]" />
                              <span>View Deed</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 border-t border-[#817C73]/15 text-xs">
                  <div className="text-[#817C73]">
                    Delivery: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country}
                  </div>
                  <div className="font-bold text-sm text-[#171717]">
                    Total Settled: <span className="font-mono">{formatPrice(order.totalTzs, currency)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Favorites */}
      {activeTab === 'FAVORITES' && (
        <div>
          {favoriteArtworks.length === 0 ? (
            <div className="bg-white border border-[#817C73]/20 py-16 text-center space-y-3">
              <p className="font-serif italic text-lg text-[#817C73]">No masterworks saved to your curatorial wishlist.</p>
              <button
                onClick={() => navigateTo('/gallery')}
                className="px-4 py-2 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62]"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {favoriteArtworks.map(artwork => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Commissions */}
      {activeTab === 'COMMISSIONS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#817C73]">
              Track your bespoke art commissions and atelier progress.
            </span>
            <button
              onClick={() => navigateTo('/commissions')}
              className="px-3.5 py-1.5 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62]"
            >
              Request New Commission
            </button>
          </div>

          {commissions.map(c => (
            <div key={c.id} className="bg-white border border-[#817C73]/25 p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-[#817C73]">{c.id}</span>
                  <h3 className="font-serif font-bold text-lg text-[#171717]">
                    {c.category} Commission · {c.dimensionsRequired}
                  </h3>
                  <p className="text-xs text-[#817C73]">Artist: {c.assignedArtistName || 'Curatorial Allocation'}</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#171717]">
                  {formatPrice(c.budgetTzs, currency)}
                </span>
              </div>
              <p className="text-xs text-[#171717]/80 italic">"{c.brief}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Provenance Deeds in Custody */}
      {activeTab === 'DEEDS' && (
        <div className="space-y-4">
          <div className="bg-[#FFFDF9] border-2 border-[#B89B62] p-6 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#B89B62]" />
              <h3 className="font-serif font-bold text-lg text-[#171717]">
                Consortium Blockchain Ownership Registry
              </h3>
            </div>
            <p className="text-xs text-[#817C73] leading-relaxed">
              Below are the immutable cryptographic ownership deeds linked to your patron identity on the
              Polygon African Art Consortium (PAAC) smart escrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artworks.filter(a => a.status === 'SOLD' || a.id === 'art-003').map(art => (
              <div key={art.id} className="bg-white border border-[#817C73]/25 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={art.images[0]} alt={art.title} className="w-14 h-14 object-cover border border-[#817C73]/20" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif font-bold text-base text-[#171717] truncate">{art.title}</h4>
                    <p className="text-xs text-[#817C73]">{art.artistName}</p>
                    <span className="font-mono text-[10px] text-[#B89B62] block">
                      Cert #{art.provenance.certificateNumber}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7F5F0] border border-[#817C73]/15 font-mono text-[11px] space-y-1 text-[#171717]">
                  <div className="flex justify-between text-[#817C73]">
                    <span>Token ID:</span>
                    <span>#{art.provenance.tokenId}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[#817C73]">Hash: </span>
                    {art.provenance.verificationHash}
                  </div>
                </div>

                <button
                  onClick={() => setInspectedProvenance(art)}
                  className="w-full py-2 bg-[#171717] text-[#F7F5F0] text-xs font-semibold hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89B62]" />
                  <span>Inspect Official Certificate of Authenticity</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
