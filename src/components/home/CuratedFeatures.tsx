import React from 'react';
import heroArtworkImage from '../../assets/images/hero_african_art_gallery_1794114972525.jpg';
import makondeSculptureImage from '../../assets/images/artwork_makonde_sculpture_1794114972660.jpg';
import swahiliPortraitImage from '../../assets/images/artwork_swahili_portrait_1794114974703.jpg';
import galleryInteriorImage from '../../assets/images/gallery_interior_dar_1794114974688.jpg';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { ArtworkCard } from '../gallery/ArtworkCard';
import { ArrowRight, ShieldCheck, Compass, Sparkles, BookOpen, Layers } from 'lucide-react';

export const CuratedFeatures: React.FC = () => {
  const {
    language,
    artworks,
    artists,
    exhibitions,
    journalArticles,
    navigateTo,
    setInspectedArtwork,
  } = useApp();

  const t = translations[language];

  const featuredArtworks = artworks.filter(a => a.featured).slice(0, 4);
  const currentExhibition = exhibitions.find(e => e.status === 'CURRENT') || exhibitions[0];

  const categories = [
    {
      title: 'Original Paintings',
      titleSwahili: 'Michoro Asilia',
      description: 'Explore paintings and visual expressions from the gallery.',
      image: heroArtworkImage,
      category: 'Paintings',
    },
    {
      title: 'Sculpture',
      titleSwahili: 'Sanamu za Kimakonde',
      description: 'Discover sculptural forms, materials and three-dimensional work.',
      image: makondeSculptureImage,
      category: 'Sculpture',
    },
    {
      title: 'Portraiture',
      titleSwahili: 'Picha za Pwani ya Waswahili',
      description: 'Explore portraiture, people and stories through visual art.',
      image: swahiliPortraitImage,
      category: 'Portraiture',
    },
    {
      title: 'Photography & Prints',
      titleSwahili: 'Picha na Machapisho ya Kisasa',
      description: 'Discover photography and fine-art printmaking.',
      image: galleryInteriorImage,
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
              Selected gallery imagery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Explore the gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] font-sans mt-1">
              Artwork listings will appear here when verified gallery records are connected.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/gallery')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#B89B62] transition-colors whitespace-nowrap"
          >
            <span>View Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredArtworks.length === 0 ? (
            <div className="col-span-full border border-[#817C73]/20 bg-white px-6 py-12 text-center"><p className="font-serif text-xl text-[#171717]">The gallery collection is being prepared.</p><p className="mt-2 text-sm text-[#817C73]">Verified artwork listings will appear here when the catalogue is connected.</p></div>
          ) : featuredArtworks.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* 2. Explore Disciplines / Categorical Curations */}
      <section className="bg-white py-16 border-y border-[#817C73]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
              Art disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Explore Art Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] mt-2">
              Explore different forms of visual expression.
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

      {/* 3. Major Salon Exhibition Showcase */}
      {currentExhibition && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#171717] text-[#F7F5F0] p-8 sm:p-12 border border-[#817C73]/25">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B89B62]" />
                  <span className="text-xs uppercase tracking-widest text-[#B89B62] font-semibold">
                    Exhibition programme
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

      {/* 4. Artist profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#817C73]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold font-sans block mb-1">
              People and practice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Artists
            </h2>
            <p className="text-xs sm:text-sm text-[#817C73] font-sans mt-1">
              Artist profiles will appear here when verified records are available.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.length === 0 ? (
            <div className="col-span-full border border-[#817C73]/20 bg-white px-6 py-10 text-center text-sm text-[#817C73]">Artist profiles will be published here when confirmed by the gallery.</div>
          ) : artists.map(artist => (
            <div
              key={artist.id}
              onClick={() => navigateTo('/artists')}
              className="bg-white border border-[#817C73]/20 p-5 group cursor-pointer hover:border-[#171717] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 rounded-none border border-[#817C73]/30 overflow-hidden mb-4 bg-[#EBE6DF]">
                  <img
                    src={artist.profileImage}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[#B89B62] font-semibold mb-1">
                  <span>ARTIST PROFILE</span>
                  <span>·</span>
                  <span>{artist.origin}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#171717] group-hover:text-[#B89B62] transition-colors">
                  {artist.name}
                </h3>
                <p className="text-xs text-[#817C73] font-medium mt-0.5">
                  {artist.title}
                </p>

                <p className="text-xs text-[#171717]/80 line-clamp-3 mt-3 font-sans leading-relaxed">
                  "{artist.statement}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#817C73]/15 flex items-center justify-between text-xs text-[#817C73]">
                <span>{artist.exhibitionsCount} Exhibitions</span>
                <span className="font-semibold text-[#171717] flex items-center gap-1">
                  Portfolio <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Commission enquiries */}
      <section className="bg-[#EBE6DF]/40 border-y border-[#817C73]/25 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block">
                Bespoke Art Advisory & Production
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717]">
                Start a commission enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl leading-relaxed">
                Share your idea, preferred art discipline and practical requirements. The gallery can review the enquiry when its submission and communication services are connected.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                <button
                  onClick={() => navigateTo('/commissions')}
                  className="px-6 py-3 bg-[#171717] text-[#F7F5F0] uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
                >
                  Start an enquiry
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="px-6 py-3 border border-[#171717] text-[#171717] uppercase tracking-wider hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
                >
                  About the gallery
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#817C73]/25 p-6 space-y-3 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#171717]">
                Prepare your enquiry
              </h4>
              <ul className="space-y-2 text-[#817C73]">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">1</span>
                  <span>Describe your idea and dimensions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">2</span>
                  <span>Share preferred artist, if known</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">3</span>
                  <span>Include timing and delivery needs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B89B62] text-[#171717] flex items-center justify-center font-mono text-[10px] font-bold">4</span>
                  <span>Discuss next steps with the gallery</span>
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
    </div>
  );
};
