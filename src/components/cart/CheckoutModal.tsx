import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import { Order } from '../../types';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building,
  ArrowRight,
  Package,
  QrCode,
  Printer,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    language,
    currency,
    cart,
    placeOrder,
    setInspectedProvenance,
    artworks,
  } = useApp();

  const [step, setStep] = useState<'FORM' | 'PROCESSING' | 'SUCCESS'>('FORM');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('Dr. Amina Rashidi');
  const [customerEmail, setCustomerEmail] = useState('amina.rashidi@dar-heritage.tz');
  const [customerPhone, setCustomerPhone] = useState('+255 754 312 908');
  const [street, setStreet] = useState('Central Arusha');
  const [city, setCity] = useState('Arusha');
  const [country, setCountry] = useState('Tanzania');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<
    'M-PESA' | 'AIRTEL_MONEY' | 'MIXX_YAS' | 'HALOPESA' | 'CARD' | 'BANK_WIRE'
  >('M-PESA');
  const [mobileNumber, setMobileNumber] = useState('0754312908');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  if (!isOpen) return null;

  const t = translations[language];

  const subtotalTzs = cart.reduce((acc, item) => acc + item.artwork.priceTzs, 0);
  const shippingTzs = cart.length > 0 ? 350000 * cart.length : 0;
  const totalTzs = subtotalTzs + shippingTzs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PROCESSING');

    setTimeout(() => {
      const order = placeOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: {
          street,
          city,
          region: city,
          country,
        },
        items: cart.map(item => ({
          artworkId: item.artwork.id,
          title: item.artwork.title,
          artistName: item.artwork.artistName,
          priceTzs: item.artwork.priceTzs,
          image: item.artwork.images[0],
          provenanceHash: item.artwork.provenance.verificationHash,
        })),
        subtotalTzs,
        shippingTzs,
        totalTzs,
        currencyPaid: currency,
        paymentMethod,
        paymentReference: `${paymentMethod}_TX_${Math.floor(100000 + Math.random() * 900000)}`,
        paymentStatus: 'PAID',
        fulfillmentStatus: 'ORDER_PLACED',
        trackingNumber: `DHL-TZ-${Math.floor(1000000 + Math.random() * 9000000)}`,
      });

      setCompletedOrder(order);
      setStep('SUCCESS');
    }, 1800);
  };

  const handleInspectOrderedProvenance = () => {
    if (!completedOrder || completedOrder.items.length === 0) return;
    const firstArtId = completedOrder.items[0].artworkId;
    const art = artworks.find(a => a.id === firstArtId);
    if (art) {
      setInspectedProvenance(art);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#F7F5F0] border border-[#817C73]/30 max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#817C73] hover:text-[#171717]"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'FORM' && (
          <div>
            <div className="border-b border-[#817C73]/20 pb-4 mb-6">
              <span className="text-[10px] tracking-widest uppercase text-[#B89B62] font-semibold block">
                Acquisition Checkout & Registry Escrow
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#171717]">
                Complete Original Artwork Acquisition
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patron Information */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                  01. Patron & Recipient Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#817C73] mb-1">Legal Full Name / Trust</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#817C73] mb-1">Primary Email (for Provenance Deed)</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#817C73] mb-1">Phone Number (WhatsApp Delivery Notifications)</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      required
                      className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                  02. White-Glove Crating Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-3">
                    <label className="block text-[#817C73] mb-1">Street Address / Estate / Residence</label>
                    <input
                      type="text"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      required
                      className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#817C73] mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      required
                      className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#817C73] mb-1">Country</label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                    >
                      <option value="Tanzania">Tanzania</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="South Africa">South Africa</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Gateways */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                  03. Payment Gateway & Settlement
                </h3>

                {/* Tanzanian Mobile Money Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'M-PESA', label: 'Vodacom M-Pesa', icon: <Smartphone className="w-4 h-4 text-[#B89B62]" /> },
                    { id: 'AIRTEL_MONEY', label: 'Airtel Money', icon: <Smartphone className="w-4 h-4 text-[#B89B62]" /> },
                    { id: 'MIXX_YAS', label: 'Mixx by Yas', icon: <Smartphone className="w-4 h-4 text-[#B89B62]" /> },
                    { id: 'HALOPESA', label: 'HaloPesa', icon: <Smartphone className="w-4 h-4 text-[#B89B62]" /> },
                  ].map(provider => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => setPaymentMethod(provider.id as any)}
                      className={`p-3 border text-left transition-all ${
                        paymentMethod === provider.id
                          ? 'border-[#B89B62] bg-[#B89B62]/10 font-bold text-[#171717]'
                          : 'border-[#817C73]/30 bg-white hover:border-[#171717]'
                      }`}
                    >
                      <div className="mb-1">{provider.icon}</div>
                      <span className="block text-[11px]">{provider.label}</span>
                    </button>
                  ))}
                </div>

                {/* International Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 border text-left transition-all flex items-center gap-2.5 ${
                      paymentMethod === 'CARD'
                        ? 'border-[#B89B62] bg-[#B89B62]/10 font-bold text-[#171717]'
                        : 'border-[#817C73]/30 bg-white hover:border-[#171717]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#B89B62]" />
                    <div>
                      <span className="block font-semibold">International Card</span>
                      <span className="text-[10px] text-[#817C73]">Visa, Mastercard, Amex</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('BANK_WIRE')}
                    className={`p-3 border text-left transition-all flex items-center gap-2.5 ${
                      paymentMethod === 'BANK_WIRE'
                        ? 'border-[#B89B62] bg-[#B89B62]/10 font-bold text-[#171717]'
                        : 'border-[#817C73]/30 bg-white hover:border-[#171717]'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#B89B62]" />
                    <div>
                      <span className="block font-semibold">Bank Wire / SWIFT</span>
                      <span className="text-[10px] text-[#817C73]">Institutional Escrow Settlement</span>
                    </div>
                  </button>
                </div>

                {/* Selected Provider Details Input */}
                {['M-PESA', 'AIRTEL_MONEY', 'MIXX_YAS', 'HALOPESA'].includes(paymentMethod) && (
                  <div className="p-3 bg-white border border-[#817C73]/25 text-xs space-y-1.5">
                    <label className="block text-[#817C73]">
                      Enter {paymentMethod.replace('_', ' ')} Mobile Number to receive USSD Prompt:
                    </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      required
                      placeholder="e.g. 0754 123 456"
                      className="w-full p-2 border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                    />
                    <p className="text-[10px] text-[#817C73]">
                      A secure USSD push will be initiated on your handset to authorize the transfer.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Total Review */}
              <div className="bg-white border border-[#817C73]/30 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#817C73]">
                  <span>Artworks in Bag ({cart.length}):</span>
                  <span className="font-mono text-[#171717]">{formatPrice(subtotalTzs, currency)}</span>
                </div>
                <div className="flex justify-between text-[#817C73]">
                  <span>Custom Timber Crating & Insurance:</span>
                  <span className="font-mono text-[#171717]">{formatPrice(shippingTzs, currency)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#171717] pt-2 border-t border-[#817C73]/20">
                  <span>Total Settlement Amount:</span>
                  <span className="font-mono text-base text-[#171717]">{formatPrice(totalTzs, currency)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-widest hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center justify-center gap-2"
              >
                <span>Authorize Settlement & Issue Deed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 'PROCESSING' && (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-[#B89B62] border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#171717]">
              Settling Transaction & Signing Blockchain Deed...
            </h3>
            <p className="text-xs text-[#817C73] max-w-sm mx-auto">
              Reconciling payment with {paymentMethod.replace('_', ' ')} network and appending legal ownership transfer block to consortium ledger.
            </p>
          </div>
        )}

        {step === 'SUCCESS' && completedOrder && (
          <div className="space-y-6 pt-2">
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-[#B89B62] mx-auto" />
              <span className="text-[10px] uppercase tracking-widest text-[#B89B62] font-semibold block">
                Acquisition Confirmed & Ledger Appended
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                Welcome to Ownership
              </h2>
              <p className="text-xs text-[#817C73] max-w-md mx-auto">
                Your purchase of original East African art has been executed. The blockchain deed has transferred
                to your registered collector profile.
              </p>
            </div>

            {/* Official Order Receipt Card */}
            <div className="bg-white border-2 border-[#B89B62]/40 p-6 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#817C73]/20 pb-3">
                <div>
                  <span className="text-[10px] uppercase text-[#817C73] block">Official Order Ref</span>
                  <span className="font-mono font-bold text-sm text-[#171717]">{completedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#817C73] block">Carrier Tracking Code</span>
                  <span className="font-mono font-bold text-xs text-[#B89B62]">{completedOrder.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#817C73] block">Settlement Gateway</span>
                  <span className="font-bold text-[#171717]">{completedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items Acquired */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#171717]">
                  Acquired Artwork(s) & Provenance
                </h4>
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#F7F5F0] p-3 border border-[#817C73]/15">
                    <img src={item.image} alt={item.title} className="w-14 h-14 object-cover border border-[#817C73]/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-sm text-[#171717] truncate">{item.title}</p>
                      <p className="text-xs text-[#817C73]">{item.artistName}</p>
                      <p className="font-mono text-[10px] text-[#B89B62] truncate">Tx: {item.provenanceHash}</p>
                    </div>
                    <span className="font-mono font-semibold text-xs text-[#171717]">
                      {formatPrice(item.priceTzs, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#817C73]/20 pt-3 flex justify-between font-bold text-sm text-[#171717]">
                <span>Total Settled:</span>
                <span className="font-mono">{formatPrice(completedOrder.totalTzs, currency)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleInspectOrderedProvenance}
                className="px-5 py-2.5 bg-[#171717] text-[#F7F5F0] text-xs font-semibold hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
                <span>View Transferred Blockchain Deed</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-[#171717] text-xs font-semibold text-[#171717] hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
