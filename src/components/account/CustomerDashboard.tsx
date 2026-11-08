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
              Customer workspace
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Your gallery activity
            </h1>
            <p className="text-xs text-[#817C73] mt-1">
              Customer workspace preview · Secure sign-in is not configured
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
            { id: 'ORDERS', label: `Orders (${orders.length})`, icon: <ShoppingBag className="w-3.5 h-3.5" /> },
            { id: 'FAVORITES', label: `Saved artworks (${favorites.length})`, icon: <Heart className="w-3.5 h-3.5" /> },
            { id: 'COMMISSIONS', label: `Enquiries (${commissions.length})`, icon: <Palette className="w-3.5 h-3.5" /> },
            { id: 'DEEDS', label: `Artwork records`, icon: <ShieldCheck className="w-3.5 h-3.5 text-[#B89B62]" /> },
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

      <div className="mb-6 border border-[#B89B62]/40 bg-white p-4 text-sm text-[#817C73]">Preview only. No customer is signed in and no private account data is connected.</div>

      {/* Tab 1: Orders */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white border border-[#817C73]/20 py-16 text-center space-y-3">
              <p className="font-serif italic text-lg text-[#817C73]">No orders are available for this customer workspace.</p>
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
              <p className="font-serif italic text-lg text-[#817C73]">No artworks have been saved in this browser.</p>
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
              Review commission enquiries saved in this browser.
            </span>
            <button
              onClick={() => navigateTo('/commissions')}
              className="px-3.5 py-1.5 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62]"
            >
              Request New Commission
            </button>
          </div>

          {commissions.length === 0 ? <p className="border border-[#817C73]/20 bg-white py-10 text-center text-sm text-[#817C73]">No commission enquiries are saved in this browser.</p> : commissions.map(c => (
            <div key={c.id} className="bg-white border border-[#817C73]/25 p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-[#817C73]">{c.id}</span>
                  <h3 className="font-serif font-bold text-lg text-[#171717]">
                    {c.category} Commission · {c.dimensionsRequired}
                  </h3>
                  <p className="text-xs text-[#817C73]">Artist: {c.assignedArtistName || 'Not assigned'}</p>
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

      {/* Tab 4: Artwork documentation */}
      {activeTab === 'DEEDS' && (
        <div className="border border-[#817C73]/20 bg-white p-6 sm:p-8 space-y-3">
          <h3 className="font-serif text-xl text-[#171717]">Artwork documentation</h3>
          <p className="text-sm leading-relaxed text-[#817C73]">No live verification or ownership registry is connected. Any artwork documents must be reviewed independently; this workspace does not issue certificates.</p>
          {artworks.length === 0 && <p className="border-t border-[#817C73]/15 pt-4 text-xs text-[#817C73]">No artwork records are available for this customer preview.</p>}
        </div>
      )}

    </div>
  );
};
