import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exhibition } from '../../types';
import { Calendar, MapPin, Users, ArrowRight, Check, X, ShieldCheck } from 'lucide-react';

export const ExhibitionsView: React.FC = () => {
  const { exhibitions, artworks, navigateTo } = useApp();
  const [selectedExhibitionForRsvp, setSelectedExhibitionForRsvp] = useState<Exhibition | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('2');

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Salon Calendar & Program
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          Exhibitions & Salons
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
          On-site presentations at our Arusha Pavilion in Arusha, Tanzania, international museum partnerships,
          and virtual 3D spatial showcases.
        </p>
      </div>

      {/* Exhibitions List */}
      <div className="space-y-12">
        {exhibitions.length === 0 ? (
          <div className="border border-[#817C73]/20 bg-white px-6 py-16 text-center"><h2 className="font-serif text-2xl text-[#171717]">No exhibitions announced</h2><p className="mx-auto mt-2 max-w-xl text-sm text-[#817C73]">Confirmed exhibition dates, venues and participating artists will be published here.</p></div>
        ) : exhibitions.map(ex => {
          const exhibitedArtworks = artworks.filter(a => ex.artworkIds.includes(a.id));

          return (
            <div
              key={ex.id}
              className="bg-white border border-[#817C73]/20 overflow-hidden hover:border-[#171717] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Cover (5 cols) */}
                <div className="lg:col-span-5 bg-[#EBE6DF] relative overflow-hidden min-h-[300px]">
                  <img
                    src={ex.coverImage}
                    alt={ex.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#171717] text-[#F7F5F0] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1">
                    {ex.status} EXHIBITION
                  </div>
                </div>

                {/* Content & Curatorial Notes (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#817C73] mb-2 font-sans">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#B89B62]" />
                        {ex.startDate} — {ex.endDate}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B89B62]" />
                        {ex.location}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] leading-tight">
                      {ex.title}
                    </h2>

                    <p className="font-serif italic text-xs text-[#817C73] mt-1">
                      Curated by {ex.curator} · {ex.venue}
                    </p>

                    <p className="text-xs sm:text-sm text-[#171717]/85 mt-4 leading-relaxed font-sans">
                      {ex.description}
                    </p>
                  </div>

                  {/* Exhibited Artworks Thumbnails */}
                  {exhibitedArtworks.length > 0 && (
                    <div className="pt-4 border-t border-[#817C73]/15">
                      <span className="text-[10px] uppercase tracking-wider text-[#817C73] block mb-2 font-semibold">
                        Selected artworks ({exhibitedArtworks.length})
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {exhibitedArtworks.map(art => (
                          <div
                            key={art.id}
                            onClick={() => navigateTo('/gallery')}
                            className="w-20 group cursor-pointer shrink-0"
                          >
                            <img
                              src={art.images[0]}
                              alt={art.title}
                              className="w-20 h-16 object-cover border border-[#817C73]/20 group-hover:border-[#B89B62]"
                            />
                            <p className="text-[10px] text-[#171717] truncate mt-1">
                              {art.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Operational Footer / Actions */}
                  <div className="pt-4 border-t border-[#817C73]/15 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#817C73]">
                      <Users className="w-4 h-4 text-[#B89B62]" />
                      <span>{ex.registeredCount} Patrons Registered</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedExhibitionForRsvp(ex)}
                        className="px-5 py-2.5 bg-[#171717] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
                      >
                        Reserve Private Viewing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RSVP Modal */}
      {selectedExhibitionForRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F7F5F0] border border-[#817C73]/30 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedExhibitionForRsvp(null)}
              className="absolute top-5 right-5 p-1 text-[#817C73] hover:text-[#171717]"
              aria-label="Close RSVP modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#B89B62] font-semibold block mb-1">
              Private Curatorial Salon RSVP
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">
              {selectedExhibitionForRsvp.title}
            </h3>
            <p className="text-xs text-[#817C73] mt-1">
              {selectedExhibitionForRsvp.venue} · {selectedExhibitionForRsvp.location}
            </p>

            <div className="mb-4 border border-[#B89B62]/35 bg-[#F7F5F0] p-3 text-xs text-[#817C73]">RSVP delivery is not connected. This form cannot confirm a visit.</div>
              <form onSubmit={handleRsvpSubmit} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block text-[#817C73] mb-1">Patron Full Name</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={e => setRsvpName(e.target.value)}
                    required
                    placeholder="e.g. Lady Catherine Sterling"
                    className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
                <div>
                  <label className="block text-[#817C73] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={rsvpEmail}
                    onChange={e => setRsvpEmail(e.target.value)}
                    required
                    placeholder="patron@institution.org"
                    className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
                <div>
                  <label className="block text-[#817C73] mb-1">Party Size</label>
                  <select
                    value={rsvpGuests}
                    onChange={e => setRsvpGuests(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#817C73]/30 text-[#171717] focus:outline-none focus:border-[#B89B62]"
                  >
                    <option value="1">1 Guest (Solo Private Tour)</option>
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">Private Delegation (6+ Guests)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled
                    className="w-full py-3 opacity-50 cursor-not-allowed bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
                  >
                    RSVP service unavailable
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};
