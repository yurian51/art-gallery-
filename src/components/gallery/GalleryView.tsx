import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { ArtworkCard } from './ArtworkCard';
import { ArtCategory } from '../../types';
import { Search, SlidersHorizontal, RotateCcw, ShieldCheck } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { language, artworks, searchQuery, setSearchQuery } = useApp();
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedClassification, setSelectedClassification] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'FEATURED' | 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC'>('FEATURED');
  const [maxPriceTzs, setMaxPriceTzs] = useState<number>(20000000);

  const categories = [
    'ALL',
    'Paintings',
    'Sculpture',
    'Portraiture',
    'Traditional African Art',
    'Contemporary Art',
    'Landscape Art',
    'Fine Art Prints',
    'Photography',
    'Mixed Media',
    'Textiles',
  ];

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter(art => {
        // Status check
        if (art.status !== 'PUBLISHED' && art.status !== 'SOLD') return false;

        // Category filter
        if (selectedCategory !== 'ALL' && art.category !== selectedCategory) {
          return false;
        }

        // Classification filter
        if (selectedClassification !== 'ALL' && art.classification !== selectedClassification) {
          return false;
        }

        // Price filter
        if (art.priceTzs > maxPriceTzs) {
          return false;
        }

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            art.title.toLowerCase().includes(q) ||
            art.artistName.toLowerCase().includes(q) ||
            art.medium.toLowerCase().includes(q) ||
            art.origin.toLowerCase().includes(q);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'FEATURED') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === 'NEWEST') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'PRICE_ASC') {
          return a.priceTzs - b.priceTzs;
        }
        if (sortBy === 'PRICE_DESC') {
          return b.priceTzs - a.priceTzs;
        }
        return 0;
      });
  }, [artworks, selectedCategory, selectedClassification, sortBy, maxPriceTzs, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedClassification('ALL');
    setSortBy('FEATURED');
    setMaxPriceTzs(20000000);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B89B62]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#817C73] font-sans font-semibold">
                Accessioned Catalog · East African Fine Art
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
              {t.gallery.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
              {t.gallery.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#817C73] bg-white border border-[#817C73]/25 px-3 py-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
            <span>All cataloged works carry cryptographic blockchain deeds.</span>
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Bar (Functional Buttons) */}
      <div className="mb-6 flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#171717] text-[#F7F5F0]'
                  : 'bg-white text-[#817C73] border border-[#817C73]/20 hover:text-[#171717]'
              }`}
            >
              {cat === 'ALL' ? t.gallery.allArtworks : cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Search, Classification, Sort & Reset */}
      <div className="bg-white border border-[#817C73]/20 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#817C73] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.gallery.searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 border border-[#817C73]/30 bg-[#F7F5F0] text-[#171717] focus:outline-none focus:border-[#B89B62]"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Classification */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#817C73]">Type:</span>
            <select
              value={selectedClassification}
              onChange={e => setSelectedClassification(e.target.value)}
              className="border border-[#817C73]/30 px-2 py-1 bg-[#F7F5F0] text-[#171717] focus:outline-none focus:border-[#B89B62]"
            >
              <option value="ALL">All Editions</option>
              <option value="ORIGINAL">Originals Only</option>
              <option value="LIMITED_EDITION">Limited Editions</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#817C73]">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="border border-[#817C73]/30 px-2 py-1 bg-[#F7F5F0] text-[#171717] focus:outline-none focus:border-[#B89B62]"
            >
              <option value="FEATURED">{t.gallery.sortFeatured}</option>
              <option value="NEWEST">{t.gallery.sortNewest}</option>
              <option value="PRICE_ASC">{t.gallery.sortPriceAsc}</option>
              <option value="PRICE_DESC">{t.gallery.sortPriceDesc}</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'ALL' || selectedClassification !== 'ALL' || searchQuery.trim() !== '') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#817C73] hover:text-[#171717] px-2 py-1 border border-[#817C73]/30 bg-[#F7F5F0] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between text-xs text-[#817C73] mb-6">
        <span>
          {t.gallery.showingCount} <strong className="text-[#171717]">{filteredArtworks.length}</strong> {t.gallery.ofTotal} {artworks.length} {t.gallery.artworksLabel}
        </span>
        <span className="font-mono text-[11px]">
          Registry Network: Polygon Fine Art Consortium
        </span>
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="bg-white border border-[#817C73]/20 py-20 text-center space-y-3">
          <p className="font-serif italic text-lg text-[#817C73]">
            {t.gallery.noResults}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62] transition-colors"
          >
            {t.gallery.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
};
