import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    language,
    currency,
    cart,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    setInspectedArtwork,
  } = useApp();

  if (!isCartOpen) return null;

  const t = translations[language];

  const subtotalTzs = cart.reduce((acc, item) => acc + item.artwork.priceTzs, 0);
  // White-glove crating fee (e.g. 5% or fixed base 350,000 TZS per artwork)
  const shippingTzs = cart.length > 0 ? 350000 * cart.length : 0;
  const totalTzs = subtotalTzs + shippingTzs;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F0] border-l border-[#817C73]/25 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#817C73]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#B89B62]" />
              <h3 className="font-serif text-xl font-bold text-[#171717]">
                {t.commerce.cartTitle} ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#817C73] hover:text-[#171717] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto divide-y divide-[#817C73]/15">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="font-serif italic text-base text-[#817C73]">
                  {t.commerce.emptyCart}
                </p>
                <p className="text-xs text-[#817C73] max-w-xs mx-auto">
                  Explore our curated catalog of original East African paintings and modernist sculptures.
                </p>
              </div>
            ) : (
              cart.map(({ artwork }) => (
                <div key={artwork.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-16 h-16 object-cover border border-[#817C73]/20 shrink-0 cursor-pointer"
                    onClick={() => {
                      setInspectedArtwork(artwork);
                      setIsCartOpen(false);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setInspectedArtwork(artwork);
                        setIsCartOpen(false);
                      }}
                      className="font-serif font-bold text-sm text-[#171717] truncate hover:text-[#B89B62] cursor-pointer"
                    >
                      {artwork.title}
                    </h4>
                    <p className="text-xs text-[#817C73] truncate">
                      {artwork.artistName} · {artwork.category}
                    </p>
                    <p className="font-mono text-xs font-semibold text-[#171717] mt-1 tabular-nums">
                      {formatPrice(artwork.priceTzs, currency)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(artwork.id)}
                    className="p-1.5 text-[#817C73] hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#817C73]/20 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#817C73]">
                  <span>{t.commerce.subtotal}</span>
                  <span className="font-mono text-[#171717] tabular-nums">
                    {formatPrice(subtotalTzs, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[#817C73]">
                  <span>{t.commerce.shippingEstimate}</span>
                  <span className="font-mono text-[#171717] tabular-nums">
                    {formatPrice(shippingTzs, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#171717] pt-2 border-t border-[#817C73]/15">
                  <span>{t.commerce.total}</span>
                  <span className="font-mono text-base text-[#171717] tabular-nums">
                    {formatPrice(totalTzs, currency)}
                  </span>
                </div>
              </div>

              <div className="bg-[#F7F5F0] p-2.5 border border-[#B89B62]/40 flex items-center gap-2 text-[11px] text-[#817C73]">
                <ShieldCheck className="w-4 h-4 text-[#B89B62] shrink-0" />
                <span>
                  Includes blockchain ownership transfer deed & physical Certificate of Authenticity.
                </span>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-widest hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center justify-center gap-2"
              >
                <span>{t.commerce.proceedCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
