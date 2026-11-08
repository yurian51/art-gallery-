import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { ArtworkCard } from '../gallery/ArtworkCard';
import { ArrowRight, ShieldCheck, Compass, Sparkles, BookOpen, Layers, Award, Quote, Mail, Check, Phone, MessageSquare } from 'lucide-react';

export const CuratedFeatures: React.FC = () => {
  const {
    language,
    artworks,
    artists,
    exhibitions,
    collections,
    journalArticles,
    navigateTo,
    setInspectedArtwork,
  } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const t = translations[language];

  const featuredArtworks = artworks.filter(a => a.featured).slice(0, 6);
  const currentExhibition = exhibitions.find(e => e.status === 'CURRENT') || exhibitions[0];

  const categories = [
    {
      title: 'Original Paintings',
      titleSwahili: 'Michoro Asilia',
      description: 'Monumental contemporary canvases using natural earth pigments and 24k gold leaf.',
      image: '/src/assets/images/hero_african_art_gallery_1794114972525.jpg',
      category: 'Paintings',
    },
    {
      title: 'Makonde Modernist Sculpture',
      titleSwahili: 'Sanamu za Kimakonde',
      description: 'Aerodynamic abstract forms sculpted from sustainably harvested Tanzanian Mpingo (Blackwood).',
      image: '/src/assets/images/artwork_makonde_sculpture_1794114972660.jpg',
      category: 'Sculpture',
    },
    {
      title: 'Swahili Coastal Portraiture',
      titleSwahili: 'Picha za Pwani ya Waswahili',
      description: 'Intimate figurative studies capturing matriarchal lineage and rich kanga textile heritage.',
      image: '/src/assets/images/artwork_swahili_portrait_1794114974703.jpg',
      category: 'Portraiture',
    },
    {
      title: 'Fine Art Photography & Prints',
      titleSwahili: 'Picha na Machapisho ya Kisasa',
      description: 'Museum-grade silver gelatin and 12-color archival giclée impressions on cotton rag.',
      image: '/src/assets/images/gallery_interior_dar_1794114974688.jpg',
      category: 'Fine Art Prints',
    },
  ];

  return (
    <div className="space-y-24 py-16">
      {/* 1. Featured Masterworks Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#817C73]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold font-sans block mb-1">
              Curator’s Selection · Spring 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Featured Original Artworks
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] font-sans mt-1">
              Each piece carries verified blockchain deed registry and physical Certificate of Authenticity.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/gallery')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#B89B62] transition-colors whitespace-nowrap"
          >
            <span>View Complete Catalog ({artworks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredArtworks.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* 2. Explore Disciplines / Categorical Curations */}
      <section className="bg-white py-16 border-y border-[#817C73]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
              Curatorial Classification
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Explore Art Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] mt-2">
              From historic Makonde woodcarving traditions to experimental contemporary mixed media.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigateTo('/gallery')}
                className="group cursor-pointer bg-[#F7F5F0] border border-[#817C73]/20 overflow-hidden hover:border-[#171717] transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EBE6DF]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-serif font-bold text-lg text-[#171717] group-hover:text-[#B89B62] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#817C73] mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#171717] group-hover:translate-x-1 transition-transform">
                    <span>Examine Collection</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Collections Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#817C73]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold font-sans block mb-1">
              Curatorial Suites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Curated Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] font-sans mt-1">
              Thematic and regional suites assembled for serious collectors, institutions, and cultural archives.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/collections')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#B89B62] transition-colors"
          >
            <span>Explore All Suites ({collections.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map(col => (
            <div
              key={col.id}
              onClick={() => navigateTo('/collections')}
              className="bg-white border border-[#817C73]/25 group cursor-pointer hover:border-[#171717] transition-all flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#EBE6DF]">
                <img
                  src={col.coverImage}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#B89B62] font-semibold block">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B62] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#817C73] leading-relaxed line-clamp-2">
                  {col.description}
                </p>
                <div className="pt-3 border-t border-[#817C73]/15 flex items-center justify-between text-xs">
                  <span className="text-[#817C73]">{col.artworkIds.length} Catalogued Artworks</span>
                  <span className="font-semibold text-[#171717] flex items-center gap-1">
                    View Suite <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Major Salon Exhibition Showcase */}
      {currentExhibition && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#171717] text-[#F7F5F0] p-8 sm:p-12 border border-[#817C73]/25">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B89B62]" />
                  <span className="text-xs uppercase tracking-widest text-[#B89B62] font-semibold">
                    Current Major Salon Exhibition
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                  {currentExhibition.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed max-w-xl">
                  {currentExhibition.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#F7F5F0]">
                  <div>
                    <span className="text-[#817C73] block text-[10px] uppercase">Venue</span>
                    <span>{currentExhibition.venue}</span>
                  </div>
                  <div>
                    <span className="text-[#817C73] block text-[10px] uppercase">Curator</span>
                    <span>{currentExhibition.curator}</span>
                  </div>
                  <div>
                    <span className="text-[#817C73] block text-[10px] uppercase">Dates</span>
                    <span>
                      {currentExhibition.startDate} — {currentExhibition.endDate}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigateTo('/exhibitions')}
                    className="px-5 py-2.5 bg-[#B89B62] text-[#171717] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62]/90 transition-colors"
                  >
                    Exhibition Catalog & RSVP
                  </button>
                  <button
                    onClick={() => navigateTo('/gallery')}
                    className="px-5 py-2.5 border border-[#F7F5F0]/40 text-xs font-semibold hover:border-white transition-colors"
                  >
                    View Exhibited Artworks
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border-2 border-[#817C73]/30 overflow-hidden shadow-2xl">
                  <img
                    src={currentExhibition.coverImage}
                    alt={currentExhibition.title}
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Master Artists Directory Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#817C73]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold font-sans block mb-1">
              Living Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Master Artists & Ateliers
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] font-sans mt-1">
              Meet the creators defining modern African visual language and material sovereignty.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/artists')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#B89B62] transition-colors"
          >
            <span>All Artists Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {artists.map(artist => {
            const isFounder = artist.id === 'artist-mrisho';
            return (
              <div
                key={artist.id}
                onClick={() => navigateTo('/artists')}
                className={`p-5 group cursor-pointer transition-all flex flex-col justify-between ${
                  isFounder
                    ? 'bg-gradient-to-b from-[#1C1A18] to-[#121212] text-white border-2 border-[#B89B62] shadow-lg hover:shadow-xl'
                    : 'bg-white border border-[#817C73]/20 hover:border-[#171717]'
                }`}
              >
                <div>
                  <div className={`w-20 h-20 rounded-none overflow-hidden mb-4 shrink-0 ${
                    isFounder ? 'border-2 border-[#B89B62] bg-[#0E0E0E]' : 'border border-[#817C73]/30 bg-[#EBE6DF]'
                  }`}>
                    <img
                      src={artist.profileImage}
                      alt={artist.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#B89B62] font-semibold mb-1">
                    <span>{isFounder ? 'FOUNDER & CEO' : 'VERIFIED ATELIER'}</span>
                    <span>·</span>
                    <span className={isFounder ? 'text-white/60' : 'text-[#817C73]'}>{artist.origin}</span>
                  </div>

                  <h3 className={`font-serif text-lg font-bold transition-colors ${
                    isFounder ? 'text-white group-hover:text-[#B89B62]' : 'text-[#171717] group-hover:text-[#B89B62]'
                  }`}>
                    {artist.name}
                  </h3>
                  <p className={`text-xs font-medium mt-0.5 truncate ${
                    isFounder ? 'text-[#B89B62]' : 'text-[#817C73]'
                  }`}>
                    {artist.title}
                  </p>

                  <p className={`text-xs line-clamp-3 mt-3 font-sans leading-relaxed ${
                    isFounder ? 'text-white/80' : 'text-[#171717]/80'
                  }`}>
                    "{artist.statement}"
                  </p>
                </div>

                <div className={`mt-4 pt-3 flex items-center justify-between text-xs ${
                  isFounder ? 'border-t border-[#B89B62]/30 text-white/70' : 'border-t border-[#817C73]/15 text-[#817C73]'
                }`}>
                  <span>{artist.exhibitionsCount} Exhibitions</span>
                  <span className={`font-semibold flex items-center gap-1 ${
                    isFounder ? 'text-[#B89B62]' : 'text-[#171717]'
                  }`}>
                    Dossier <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Custom Commissions & Institutional Advisory Callout */}
      <section className="bg-[#EBE6DF]/40 border-y border-[#817C73]/25 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block">
                Bespoke Art Advisory & Production
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717]">
                Commission a Bespoke Original Masterpiece
              </h2>
              <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl leading-relaxed">
                Whether curating an international diplomatic residence, luxury safari lodge, or private estate,
                our curatorial board facilitates direct collaborations with East Africa's preeminent painters and sculptors.
                Full milestone tracking and cryptographic deed registration upon completion.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                <button
                  onClick={() => navigateTo('/commissions')}
                  className="px-6 py-3 bg-[#171717] text-[#F7F5F0] uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
                >
                  Initiate Commission Request
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="px-6 py-3 border border-[#171717] text-[#171717] uppercase tracking-wider hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
                >
                  Curatorial Advisory Services
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#817C73]/25 p-6 space-y-3 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#171717]">
                Commission Workflow Stages
              </h4>
              <ul className="space-y-2 text-[#817C73]">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">1</span>
                  <span>Brief & Dimensions Submission</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">2</span>
                  <span>Artist Assignment & Curatorial Quote</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">3</span>
                  <span>Studio Milestones & Patron Review</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B89B62] text-[#171717] flex items-center justify-center font-mono text-[10px] font-bold">4</span>
                  <span>Crated Delivery & Blockchain Deed Issuance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Art Journal & Critical Essays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#817C73]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold font-sans block mb-1">
              Curatorial Journal & Research
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Essays, Archives & Market Insights
            </h2>
          </div>

          <button
            onClick={() => navigateTo('/journal')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#B89B62] transition-colors"
          >
            <span>Read All Essays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {journalArticles.map(article => (
            <article
              key={article.id}
              onClick={() => navigateTo('/journal')}
              className="bg-white border border-[#817C73]/20 p-6 group cursor-pointer hover:border-[#171717] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-[#EBE6DF] mb-4">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-[#817C73] mb-2 font-sans">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{article.readTimeMinutes} min read</span>
                  <span>·</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#171717] group-hover:text-[#B89B62] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#817C73] mt-2 line-clamp-3 leading-relaxed font-sans">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#817C73]/15 flex items-center justify-between text-xs text-[#171717] font-medium">
                <span>By {article.author}</span>
                <span className="flex items-center gap-1 text-[#B89B62] group-hover:translate-x-1 transition-transform">
                  Read Essay <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 12: About the Founder */}
      <section className="bg-gradient-to-br from-[#171717] via-[#1E1B18] to-[#121212] text-white border-y border-[#B89B62]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="absolute -inset-2.5 border border-[#B89B62]/40 translate-x-2.5 translate-y-2.5 pointer-events-none transition-transform group-hover:translate-x-3.5 group-hover:translate-y-3.5 duration-500"></div>
                <div className="relative aspect-[3/4] bg-[#0E0E0E] overflow-hidden border-2 border-[#B89B62] shadow-2xl">
                  <img
                    src="/assets/aistudio/file_000000007ed88211923be0350c1162b0_d5208529.png"
                    alt="Hussein Sadiki Gumbo, Founder & CEO of Mrisho Art Gallery, Arusha, Tanzania"
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-3 left-3 right-3 bg-[#171717]/90 backdrop-blur-md border border-[#B89B62]/60 px-3.5 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#B89B62]" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B89B62]">
                        Founder & CEO
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-white/70">
                      Arusha, Tanzania
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89B62]/15 border border-[#B89B62]/30 text-[#B89B62] text-[10px] uppercase tracking-[0.25em] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#B89B62]" />
                  {language === 'sw' ? 'Uongozi wa Galari' : 'Gallery Leadership'}
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  Hussein Sadiki Gumbo
                </h2>

                <p className="text-xs uppercase tracking-widest text-[#B89B62] font-mono">
                  {language === 'sw' ? 'Mwanzilishi & Afisa Mtendaji Mkuu' : 'Founder & Chief Executive Officer'}
                </p>
                <p className="text-xs text-white/70">
                  Mrisho Art Gallery · Arusha, Tanzania
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
                  <a href="tel:+255639827831" className="hover:underline flex items-center gap-1 text-white hover:text-[#B89B62] transition-colors">
                    <Phone className="w-3 h-3 text-[#B89B62]" />
                    <span>+255 639 827 831</span>
                  </a>
                  <span className="text-white/40">·</span>
                  <a href="tel:+255782400311" className="hover:underline flex items-center gap-1 text-white hover:text-[#B89B62] transition-colors">
                    <Phone className="w-3 h-3 text-[#B89B62]" />
                    <span>+255 782 400 311</span>
                  </a>
                  <span className="text-white/40">·</span>
                  <a href="mailto:mrishoartist@gmail.com" className="hover:underline text-[#B89B62]">
                    mrishoartist@gmail.com
                  </a>
                </div>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#B89B62] space-y-3">
                <Quote className="w-8 h-8 text-[#B89B62]/30 absolute -top-3 -left-3.5 fill-[#B89B62]/20" />
                <p className="font-serif italic text-lg sm:text-xl text-white leading-relaxed">
                  {language === 'sw'
                    ? '"Sanaa ni sauti yetu kuu na daraja la kitamaduni. Kutoka Arusha kuelekea ulimwenguni, lengo letu ni kuonyesha ubunifu na uzuri wa sanaa ya Kiafrika kwa ubora na heshima ya juu ya kimataifa."'
                    : '"Art is our sovereign voice and cultural bridge. From Arusha to the world, our mission is to present African brilliance with unapologetic museum excellence and authenticity."'}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                {language === 'sw'
                  ? 'Mrisho Art Gallery ilianzishwa ikiwa na makao makuu yake jijini Arusha, Tanzania, kwa lengo la kuwawezesha wasanii mahiri wa Afrika, kulinda uhalisi kupitia teknolojia ya blockchain, na kutoa jukwaa la kimataifa la biashara ya sanaa bila mipaka.'
                  : 'Founded and based in Arusha, Tanzania, Mrisho Art Gallery is dedicated to elevating African visual arts into the forefront of global institutional and private collections with verified provenance and uncompromising curatorial integrity.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                <button
                  onClick={() => navigateTo('/about')}
                  className="px-6 py-3 bg-[#B89B62] text-[#171717] uppercase tracking-wider hover:bg-[#B89B62]/90 transition-all font-bold"
                >
                  {language === 'sw' ? 'Soma Wasifu wa Mwanzilishi' : 'Read Founder Charter'}
                </button>
                <button
                  onClick={() => navigateTo('/gallery')}
                  className="px-6 py-3 border border-white/40 text-white uppercase tracking-wider hover:border-white hover:bg-white/10 transition-colors"
                >
                  {language === 'sw' ? 'Tazama Kazi za Sanaa' : 'Explore Permanent Gallery'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Consent-Based Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#817C73]/25 p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block">
              Curatorial Gazette
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              {language === 'sw' ? 'Jiunge na Jarida Letu la Sanaa' : 'Subscribe to the Curatorial Gazette'}
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73]">
              {language === 'sw'
                ? 'Pokea mialiko ya maonyesho mapya, habari za wasanii wetu, na uchambuzi wa kina wa soko la sanaa.'
                : 'Receive private exhibition invitations, newly accessioned masterworks, and curatorial dispatches directly to your inbox.'}
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'sw'
                    ? 'Asante! Ombi lako la kujiunga na jarida limepokelewa.'
                    : 'Thank you! You are now subscribed to the Mrisho Art Gazette.'}
                </span>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (newsletterEmail && newsletterConsent) {
                    setNewsletterSubscribed(true);
                  }
                }}
                className="space-y-4 text-left pt-2"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    required
                    placeholder="name@collector.com"
                    className="flex-1 p-3 bg-[#F7F5F0] border border-[#817C73]/30 text-xs text-[#171717] focus:outline-none focus:border-[#B89B62]"
                  />
                  <button
                    type="submit"
                    disabled={!newsletterConsent}
                    className="px-6 py-3 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {language === 'sw' ? 'Jiunge Sasa' : 'Subscribe'}
                  </button>
                </div>

                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#817C73]">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={e => setNewsletterConsent(e.target.checked)}
                    required
                    className="mt-0.5 accent-[#B89B62]"
                  />
                  <span>
                    {language === 'sw'
                      ? 'Ninakubali kupokea taarifa za kielektroniki kutoka Mrisho Art Gallery. Unaweza kujiondoa wakati wowote.'
                      : 'I consent to receive electronic curatorial dispatches from Mrisho Art Gallery. You may unsubscribe at any time.'}
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
