import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Artist } from '../../types';
import { ArtworkCard } from '../gallery/ArtworkCard';
import { ShieldCheck, Award, MapPin, ArrowRight, Instagram, Globe, Sparkles, Phone, Mail, MessageSquare } from 'lucide-react';

export const ArtistsView: React.FC = () => {
  const { artists, artworks, navigateTo } = useApp();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(artists[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Artists
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          Artist Directory & Roster
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
          Artist profiles and portfolios will appear here when verified gallery records are available.
        </p>
      </div>

      {/* Two-Column Layout: Artist Selector / Cards (Left) & Active Portfolio Showcase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Artists List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {artists.length === 0 ? (
            <div className="border border-[#817C73]/20 bg-white p-6 text-sm leading-relaxed text-[#817C73]">Artist profiles are not connected yet. Confirmed artist information will appear here.</div>
          ) : artists.map(artist => {
            const isSelected = selectedArtist?.id === artist.id;
            return (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className={`p-5 border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#B89B62] bg-white shadow-md'
                    : 'border-[#817C73]/20 bg-[#F7F5F0] hover:border-[#171717]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-none border border-[#817C73]/30 overflow-hidden bg-[#EBE6DF] shrink-0">
                    <img
                      src={artist.profileImage}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#B89B62] font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{artist.id === 'artist-mrisho' ? 'FOUNDER & CEO' : 'ACCREDITED MASTER'}</span>
                      <span>·</span>
                      <span className="text-[#817C73]">{artist.origin}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#171717] truncate">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-[#817C73] truncate">
                      {artist.title}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#817C73]/15 flex items-center justify-between text-xs text-[#817C73]">
                  <span>{artist.disciplines.join(' · ')}</span>
                  <span className="font-medium text-[#171717] flex items-center gap-1">
                    Examine <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Artist Detailed Dossier & Works (7 cols) */}
        {selectedArtist && (
          <div className="lg:col-span-7 bg-white border border-[#817C73]/25 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#817C73]/20 pb-6">
              <div className="flex items-center gap-5">
                <div className="w-20 sm:w-24 h-24 sm:h-28 border-2 border-[#B89B62] overflow-hidden bg-[#0E0E0E] shrink-0 shadow-md">
                  <img
                    src={selectedArtist.profileImage}
                    alt={selectedArtist.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#B89B62] font-semibold">
                      {selectedArtist.id === 'artist-mrisho' ? 'Founder & CEO Dossier' : 'Curatorial Dossier'}
                    </span>
                    {selectedArtist.acceptingCommissions && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                        Accepting Commissions
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                    {selectedArtist.name}
                  </h2>
                  <p className="text-sm font-serif italic text-[#817C73] mt-0.5">
                    {selectedArtist.title} · {selectedArtist.origin}
                  </p>

                  {selectedArtist.socials && (
                    <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-[#817C73]/15 text-xs">
                      {selectedArtist.socials.phone && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#171717] bg-[#F7F5F0] px-2.5 py-1 border border-[#817C73]/25 font-mono">
                          <Phone className="w-3 h-3 text-[#B89B62]" />
                          <a href="tel:+255639827831" className="hover:text-[#B89B62]">+255 639 827 831</a>
                          <span>/</span>
                          <a href="tel:+255782400311" className="hover:text-[#B89B62]">+255 782 400 311</a>
                        </div>
                      )}
                      {selectedArtist.socials.whatsapp && (
                        <a
                          href="https://wa.me/255639827831"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-300 font-semibold hover:bg-emerald-100 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      {selectedArtist.socials.email && (
                        <a
                          href={`mailto:${selectedArtist.socials.email}`}
                          className="flex items-center gap-1 text-[11px] text-[#171717] bg-[#F7F5F0] px-2.5 py-1 border border-[#817C73]/25 hover:text-[#B89B62] transition-colors"
                        >
                          <Mail className="w-3 h-3 text-[#B89B62]" />
                          <span>{selectedArtist.socials.email}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Artist Statement */}
            <div className="bg-[#F7F5F0] p-4 sm:p-5 border-l-2 border-[#B89B62] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#817C73] tracking-wider block">
                Artist Statement & Philosophy
              </span>
              <p className="font-serif italic text-sm text-[#171717] leading-relaxed">
                "{selectedArtist.statement}"
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                Curatorial Biography
              </h4>
              <p className="text-xs text-[#171717]/85 font-sans leading-relaxed">
                {selectedArtist.bio}
              </p>
            </div>

            {/* Honours & Awards */}
            {selectedArtist.awards && selectedArtist.awards.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                  Institutional Honours & Collections
                </h4>
                <div className="space-y-1.5">
                  {selectedArtist.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#171717]">
                      <Award className="w-3.5 h-3.5 text-[#B89B62]" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Artworks by This Artist */}
            <div className="pt-4 border-t border-[#817C73]/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-[#171717]">
                  Artworks in Gallery Catalog by {selectedArtist.name}
                </h4>
                <span className="text-xs text-[#817C73]">
                  {artworks.filter(a => a.artistId === selectedArtist.id).length} recorded
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artworks
                  .filter(a => a.artistId === selectedArtist.id)
                  .map(art => (
                    <ArtworkCard key={art.id} artwork={art} />
                  ))}
              </div>
            </div>

            {/* Commission Direct Action */}
            <div className="pt-4 flex items-center justify-between border-t border-[#817C73]/20">
              <div className="text-xs text-[#817C73]">
                Interested in custom dimensions or bespoke commission with {selectedArtist.name}?
              </div>
              <button
                onClick={() => navigateTo('/commissions')}
                className="px-4 py-2 bg-[#171717] text-[#F7F5F0] text-xs font-semibold hover:bg-[#B89B62] hover:text-[#171717] transition-all"
              >
                Inquire Commission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
