import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../services/currencyService';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { artworks, currency, setInspectedArtwork, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : artworks.filter(art => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.artistName.toLowerCase().includes(q) ||
          art.medium.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.origin.toLowerCase().includes(q) ||
          art.provenance.certificateNumber.toLowerCase().includes(q)
        );
      });

  const handleSelectArtwork = (art: (typeof artworks)[0]) => {
    setInspectedArtwork(art);
    onClose();
  };

  const handleQuickCategory = (cat: string) => {
    navigateTo('/gallery');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F7F5F0] border border-[#817C73]/30 max-w-2xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#817C73] hover:text-[#171717]"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#171717] pb-3 mb-4">
          <Search className="w-5 h-5 text-[#B89B62]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search masterworks, artists, mediums, certificate deeds..."
            autoFocus
            className="w-full bg-transparent text-lg font-serif text-[#171717] placeholder:text-[#817C73]/60 focus:outline-none"
          />
        </div>

        {/* Quick Suggestions when empty */}
        {query.trim() === '' && (
          <div className="py-4">
            <span className="text-[10px] uppercase tracking-widest text-[#817C73] block mb-2 font-sans">
              Curator Suggestions
            </span>
            <div className="flex flex-wrap gap-2">
              {['Mwl. Juma Mwinyi', 'Aloyce Masoud', 'Mpingo Sculptures', 'Swahili Coast', 'Oil & Gold Leaf', 'Bagamoyo'].map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-2.5 py-1 text-xs border border-[#817C73]/25 bg-white text-[#171717] hover:border-[#B89B62]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() !== '' && (
          <div className="max-h-[50vh] overflow-y-auto space-y-2 divide-y divide-[#817C73]/15">
            {filtered.length === 0 ? (
              <p className="text-xs text-[#817C73] py-6 text-center">
                No artworks found matching "{query}". Try searching by artist name or medium.
              </p>
            ) : (
              filtered.map(art => (
                <div
                  key={art.id}
                  onClick={() => handleSelectArtwork(art)}
                  className="pt-2 pb-2 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/80 p-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={art.images[0]}
                      alt={art.title}
                      className="w-12 h-12 object-cover border border-[#817C73]/20 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#171717]">
                        {art.title}
                      </h4>
                      <div className="text-xs text-[#817C73]">
                        {art.artistName} · {art.category}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono font-medium text-xs text-[#171717] block">
                      {formatPrice(art.priceTzs, currency)}
                    </span>
                    <span className="text-[10px] text-[#B89B62] flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
