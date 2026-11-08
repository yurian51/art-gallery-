import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import {
  X,
  ShieldCheck,
  Package,
  Clock,
  Heart,
  Share2,
  Check,
  ChevronRight,
  ZoomIn,
  MessageSquare,
} from 'lucide-react';

export const ArtworkDetailModal: React.FC = () => {
  const {
    language,
    currency,
    inspectedArtwork,
    setInspectedArtwork,
    setInspectedProvenance,
    addToCart,
    toggleFavorite,
    isFavorite,
    setIsCartOpen,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');

  if (!inspectedArtwork) return null;

  const t = translations[language];
  const isFav = isFavorite(inspectedArtwork.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAcquire = () => {
    addToCart(inspectedArtwork);
    setInspectedArtwork(null);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#F7F5F0] border border-[#817C73]/30 max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setInspectedArtwork(null)}
          className="absolute top-5 right-5 p-1 text-[#817C73] hover:text-[#171717] transition-colors"
          aria-label="Close artwork detail"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Artwork Imagery Viewer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative bg-[#EBE6DF] border border-[#817C73]/20 overflow-hidden group">
              <img
                src={inspectedArtwork.images[activeImageIndex] || inspectedArtwork.images[0]}
                alt={inspectedArtwork.title}
                className="w-full max-h-[580px] object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-xs">
                <ZoomIn className="w-3 h-3" />
                <span>Museum High-Resolution View</span>
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {inspectedArtwork.images.length > 1 && (
              <div className="flex gap-2">
                {inspectedArtwork.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#B89B62] ring-1 ring-[#B89B62]'
                        : 'border-[#817C73]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Detail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Artwork documentation status */}
            <div className="bg-white border border-[#B89B62]/40 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#B89B62]/10 border border-[#B89B62] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#B89B62]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#171717]">
                    Verification service not connected
                  </h4>
                  <p className="font-mono text-[11px] text-[#817C73]">
                    No authenticity certificate has been issued
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectedProvenance(inspectedArtwork)}
                className="px-3 py-1.5 border border-[#171717] text-xs font-medium text-[#171717] hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors whitespace-nowrap"
              >
                View documentation status
              </button>
            </div>
          </div>

          {/* Right Column: Curatorial Specifications & Acquisition (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-[#817C73]">
                <div className="flex items-center gap-1.5 font-sans">
                  <span>{inspectedArtwork.category}</span>
                  <span>·</span>
                  <span>{inspectedArtwork.classification === 'ORIGINAL' ? 'Original Masterpiece' : 'Limited Edition'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFavorite(inspectedArtwork.id)}
                    aria-label="Save to favorites"
                    className="p-1 hover:text-[#B89B62] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B89B62] text-[#B89B62]' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    aria-label="Share artwork link"
                    className="p-1 hover:text-[#B89B62] transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] leading-tight">
                {language === 'sw' && inspectedArtwork.titleSwahili
                  ? inspectedArtwork.titleSwahili
                  : inspectedArtwork.title}
              </h2>

              <p className="font-serif italic text-base text-[#171717] mt-1">
                By {inspectedArtwork.artistName}
              </p>
              <p className="text-xs text-[#817C73]">
                Studio Location: {inspectedArtwork.origin}
              </p>
            </div>

            {/* Price & Commercial State */}
            <div className="py-3 px-4 bg-white border border-[#817C73]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#817C73] block">
                  Artwork price
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#171717] tabular-nums">
                  {formatPrice(inspectedArtwork.priceTzs, currency)}
                </span>
              </div>

              {inspectedArtwork.status === 'SOLD' ? (
                <span className="px-3 py-1 bg-[#817C73]/20 text-xs font-semibold uppercase tracking-wider text-[#817C73]">
                  Acquired & In Custody
                </span>
              ) : (
                <button
                  onClick={handleAcquire}
                  className="px-5 py-2.5 bg-[#171717] text-[#F7F5F0] text-xs font-semibold hover:bg-[#B89B62] hover:text-[#171717] transition-all tracking-wider uppercase"
                >
                  Acquire Work
                </button>
              )}
            </div>

            {/* Curatorial Essay / Description */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                Curatorial Note
              </h4>
              <p className="text-xs text-[#171717]/85 leading-relaxed font-sans">
                {language === 'sw' && inspectedArtwork.descriptionSwahili
                  ? inspectedArtwork.descriptionSwahili
                  : inspectedArtwork.description}
              </p>
            </div>

            {/* Museum Accession Metadata Definition List */}
            <div className="border-t border-b border-[#817C73]/20 py-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#817C73]">Medium:</span>
                <span className="font-medium text-[#171717] text-right">{inspectedArtwork.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#817C73]">Materials:</span>
                <span className="font-medium text-[#171717] text-right">{inspectedArtwork.materials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#817C73]">Dimensions:</span>
                <span className="font-mono text-[#171717]">
                  {inspectedArtwork.dimensions.heightCm} × {inspectedArtwork.dimensions.widthCm}
                  {inspectedArtwork.dimensions.depthCm ? ` × ${inspectedArtwork.dimensions.depthCm}` : ''} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#817C73]">Year of Creation:</span>
                <span className="font-mono text-[#171717]">{inspectedArtwork.creationYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#817C73]">Classification:</span>
                <span className="font-medium text-[#171717]">
                  {inspectedArtwork.classification === 'ORIGINAL'
                    ? '1 of 1 Unique Original'
                    : `Limited Edition #${inspectedArtwork.editionInfo?.current} of ${inspectedArtwork.editionInfo?.total}`}
                </span>
              </div>
            </div>

            {/* Delivery information */}
            <div className="space-y-2 bg-[#EBE6DF]/40 p-3.5 border border-[#817C73]/20 text-xs text-[#817C73]">
              <div className="flex items-center gap-2 text-[#171717] font-semibold">
                <Package className="w-4 h-4 text-[#B89B62]" />
                <span>Delivery arrangements</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Delivery options, packaging, insurance and timing have not been configured. Details must be confirmed individually before an acquisition.
              </p>
            </div>

            {/* Curator Inquiry Options */}
            {!showInquiryForm ? (
              <div className="space-y-2">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full py-2.5 border border-[#171717] text-xs font-medium text-[#171717] hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
                >
                  {language === 'sw' ? 'Wasiliana na Mkurugenzi wa Uratibu' : 'Inquire with Chief Curator'}
                </button>
                <a
                  href={`https://wa.me/255639827831?text=${encodeURIComponent(
                    `Habari Hussein Sadiki Gumbo (Mrisho Art Gallery), ninaulizia kuhusu kazi ya sanaa: "${inspectedArtwork.title}" (Ref: ${inspectedArtwork.id}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>
                    {language === 'sw' ? 'Wasiliana Moja kwa Moja WhatsApp (+255 639 827 831)' : 'Direct WhatsApp Concierge (+255 639 827 831)'}
                  </span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="p-3 bg-white border border-[#817C73]/30 space-y-2">
                <span className="text-[10px] uppercase font-semibold text-[#817C73] block">
                  Artwork enquiry
                </span>
                <textarea
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  placeholder="Write your enquiry. The sending service is not connected yet."
                  required
                  rows={3}
                  className="w-full p-2 text-xs border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="px-3 py-1 text-xs text-[#817C73]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled
                    className="px-4 py-1.5 opacity-50 cursor-not-allowed bg-[#171717] text-white text-xs font-medium hover:bg-[#B89B62] transition-colors"
                  >
                    Enquiry service unavailable
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
