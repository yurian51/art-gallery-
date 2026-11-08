import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Collection, Artwork } from '../../types';
import { ArtworkCard } from '../gallery/ArtworkCard';
import { Layers, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { collections, artworks, language, navigateTo } = useApp();
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(collections[0] || null);

  const activeArtworks: Artwork[] = selectedCollection
    ? artworks.filter(a => selectedCollection.artworkIds.includes(a.id))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#817C73]/20 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
            Curatorial Suites & Thematic Portfolios
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
            {language === 'sw' ? 'Mikusanyiko Maalumu ya Sanaa' : 'Curated Collections'}
          </h1>
          <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
            {language === 'sw'
              ? 'Mikusanyiko iliyoratibiwa kwa uangalifu na jopo letu la wataalamu jijini Arusha, ikiangazia historia, nyenzo, na falsafa za wasanii nguli.'
              : 'Institutional suites assembled by our curatorial board in Arusha, Tanzania, uniting related masterworks under cohesive thematic narratives.'}
          </p>
        </div>

        <button
          onClick={() => navigateTo('/gallery')}
          className="px-5 py-2.5 border border-[#171717] text-xs font-semibold uppercase tracking-wider hover:bg-[#171717] hover:text-white transition-colors"
        >
          {language === 'sw' ? 'Tazama Sanaa Zote' : 'Full Catalog'}
        </button>
      </div>

      {/* Collection Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map(col => {
          const isSelected = selectedCollection?.id === col.id;
          return (
            <div
              key={col.id}
              onClick={() => setSelectedCollection(col)}
              className={`p-6 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#B89B62] shadow-md ring-1 ring-[#B89B62]'
                  : 'bg-[#F7F5F0] border-[#817C73]/25 hover:border-[#171717]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-[#B89B62]">
                  <span>{col.subtitle}</span>
                  <span className="font-mono text-[#817C73]">{col.artworkIds.length} Artworks</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#171717]">
                  {language === 'sw' && col.titleSwahili ? col.titleSwahili : col.title}
                </h3>

                <p className="text-xs text-[#817C73] leading-relaxed line-clamp-3">
                  {col.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#817C73]/15 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#817C73]">
                  Curator Verified
                </span>
                <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-[#B89B62]' : 'text-[#171717]'}`}>
                  {isSelected ? (language === 'sw' ? 'Inatazamwa' : 'Viewing Suite') : (language === 'sw' ? 'Chagua Mkusanyiko' : 'Select Suite')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Collection Showcase Banner */}
      {selectedCollection && (
        <div className="bg-white border border-[#817C73]/25 p-8 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89B62]/10 border border-[#B89B62]/30 text-[#B89B62] text-[10px] uppercase tracking-widest font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Active Suite Showcase</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                {language === 'sw' && selectedCollection.titleSwahili ? selectedCollection.titleSwahili : selectedCollection.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed max-w-2xl">
                {selectedCollection.description}
              </p>

              <div className="p-4 bg-[#F7F5F0] border-l-2 border-[#B89B62] text-xs text-[#171717] space-y-1">
                <span className="font-bold text-[10px] uppercase text-[#B89B62] tracking-wider block">
                  Curatorial Notes
                </span>
                <p className="font-serif italic text-sm text-[#171717]">
                  "{selectedCollection.curatorNotes}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 aspect-[4/3] overflow-hidden border border-[#817C73]/30 bg-[#EBE6DF]">
              <img
                src={selectedCollection.coverImage}
                alt={selectedCollection.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Artworks in this Collection */}
          <div className="pt-6 border-t border-[#817C73]/20 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#171717]">
                {language === 'sw' ? 'Kazi Zilizo Kwenye Mkusanyiko Huu' : 'Artworks in this Curated Suite'}
              </h3>
              <span className="text-xs text-[#817C73]">
                {activeArtworks.length} {language === 'sw' ? 'kazi asilia' : 'original works'}
              </span>
            </div>

            {activeArtworks.length === 0 ? (
              <p className="text-xs text-[#817C73] py-8 text-center bg-[#F7F5F0]">
                {language === 'sw' ? 'Hakuna kazi za sanaa zilizopatikana kwenye mkusanyiko huu.' : 'No artworks currently listed in this suite.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeArtworks.map(artwork => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
