import React from 'react';
import { useApp } from '../../context/AppContext';
import { Artwork } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { ShieldCheck, Heart, Eye } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const {
    currency,
    setInspectedArtwork,
    setInspectedProvenance,
    toggleFavorite,
    isFavorite,
    addToCart,
  } = useApp();

  const isFav = isFavorite(artwork.id);

  return (
    <article className="group bg-white border border-[#817C73]/20 flex flex-col justify-between transition-all duration-300 hover:border-[#171717] hover:shadow-lg">
      {/* Artwork Imagery Viewport */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE6DF]">
        <img
          src={artwork.images[0]}
          alt={artwork.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Favorite Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(artwork.id);
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-[#171717] hover:text-[#B89B62] transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFav ? 'fill-[#B89B62] text-[#B89B62]' : 'text-[#171717]'
            }`}
          />
        </button>

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between">
          <button
            onClick={() => setInspectedArtwork(artwork)}
            className="text-xs text-white hover:text-[#B89B62] flex items-center gap-1.5 font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Masterwork</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setInspectedProvenance(artwork);
            }}
            className="text-[11px] text-[#B89B62] hover:text-white flex items-center gap-1 transition-colors"
            title="Inspect blockchain block verification"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify Provenance</span>
          </button>
        </div>
      </div>

      {/* Artwork Metadata — Strict Zero-Pill & Unboxed Typographic Cadence */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center gap-1.5 text-xs text-[#817C73] mb-1.5 font-sans">
            <span>{artwork.category}</span>
            <span aria-hidden="true">·</span>
            <span>{artwork.creationYear}</span>
            <span aria-hidden="true">·</span>
            <span className="italic">{artwork.origin}</span>
          </div>

          {/* Masterwork Title */}
          <h3
            onClick={() => setInspectedArtwork(artwork)}
            className="font-serif text-lg sm:text-xl font-bold text-[#171717] hover:text-[#B89B62] cursor-pointer transition-colors line-clamp-1"
          >
            {artwork.title}
          </h3>

          {/* Artist & Medium */}
          <p className="text-xs text-[#171717] font-medium mt-0.5">
            {artwork.artistName}
          </p>
          <p className="text-xs text-[#817C73] line-clamp-1 mt-0.5">
            {artwork.medium}
          </p>
        </div>

        {/* Bottom Commercial & Provenance Strip */}
        <div className="mt-4 pt-3 border-t border-[#817C73]/15 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#817C73] block uppercase tracking-wider">
              {artwork.classification === 'ORIGINAL' ? 'Original Piece' : `Ed. ${artwork.editionInfo?.current}/${artwork.editionInfo?.total}`}
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#171717] tabular-nums">
              {formatPrice(artwork.priceTzs, currency)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInspectedProvenance(artwork)}
              className="p-1.5 text-[#817C73] hover:text-[#B89B62] transition-colors"
              title="Inspect cryptographic ledger deed"
              aria-label="Inspect provenance"
            >
              <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
            </button>

            {artwork.status === 'SOLD' ? (
              <span className="text-xs font-semibold uppercase tracking-wider text-[#817C73]">
                Acquired
              </span>
            ) : (
              <button
                onClick={() => addToCart(artwork)}
                className="px-3 py-1.5 bg-[#171717] text-[#F7F5F0] text-xs font-medium hover:bg-[#171717]/85 transition-colors whitespace-nowrap"
              >
                Acquire
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
