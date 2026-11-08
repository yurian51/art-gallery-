import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import { ShieldCheck, ArrowRight, Compass, Clock, MapPin, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, currency, navigateTo, artworks, setInspectedArtwork } = useApp();
  const t = translations[language];

  const featuredArt = artworks.find(a => a.id === 'art-mrisho-01') || artworks[0];

  return (
    <section className="relative bg-[#F7F5F0] border-b border-[#817C73]/20 overflow-hidden">
      {/* 2-Column Desktop Grid Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Editorial Marquee (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B89B62]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#817C73] font-sans font-semibold">
                  Tanzanian & Pan-African Fine Art Institution
                </span>
              </div>

              {/* Master Headline with text-wrap: balance */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717] leading-[1.15] text-balance">
                {t.hero.headline}
              </h1>

              <p className="text-sm sm:text-base text-[#817C73] leading-relaxed max-w-xl font-sans font-light">
                {t.hero.subhead}
              </p>
            </div>

            {/* CTAs & Trust Badges */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('/gallery')}
                  className="px-6 py-3.5 bg-[#171717] text-[#F7F5F0] text-xs font-semibold tracking-wider uppercase hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>{t.hero.exploreGallery}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('/artists')}
                  className="px-6 py-3.5 border border-[#171717] text-[#171717] text-xs font-semibold tracking-wider uppercase hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
                >
                  <span>{t.hero.discoverArtists}</span>
                </button>
              </div>

              {/* Blockchain Provenance Guarantee Marker */}
              <div className="pt-3 border-t border-[#817C73]/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-none border border-[#B89B62] bg-[#B89B62]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#171717] block">
                    Cryptographic Provenance Deed on Every Artwork
                  </span>
                  <span className="text-[#817C73] text-[11px]">
                    Direct curatorial verification, tamper-proof registry, and physical Certificate of Authenticity.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Centerpiece Masterwork (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div
              onClick={() => featuredArt && setInspectedArtwork(featuredArt)}
              className="relative group cursor-pointer bg-[#EBE6DF] border border-[#817C73]/25 overflow-hidden shadow-md h-full flex flex-col justify-end min-h-[380px] lg:min-h-[480px]"
            >
              <img
                src={featuredArt.images[0]}
                alt={featuredArt.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Curatorial Scrim Overlay */}
              <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-[#F7F5F0]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#B89B62] font-semibold">
                    {language === 'sw' ? 'Kazi Kuu ya Sanaa · Mkusanyiko wa Mwanzilishi' : 'Curatorial Centerpiece · Founder Masterwork'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#B89B62] transition-colors">
                  {language === 'sw' && featuredArt.titleSwahili ? featuredArt.titleSwahili : featuredArt.title}
                </h3>
                <p className="text-xs text-white/80 font-sans mt-0.5">
                  {featuredArt.artistName} · {featuredArt.medium}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/20">
                  <span className="font-mono text-sm font-bold text-[#B89B62] tabular-nums">
                    {formatPrice(featuredArt.priceTzs, currency)} · Blockchain Deed
                  </span>
                  <span className="text-[11px] underline underline-offset-2 flex items-center gap-1">
                    <span>{language === 'sw' ? 'Tazama Kazi Hii' : 'Examine Masterwork'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Utility Ribbon below the Hero (Pattern A from references) */}
      <div className="border-t border-[#817C73]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#171717]">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#B89B62] shrink-0" />
              <div>
                <span className="font-semibold block leading-tight">Main Gallery Pavilion</span>
                <span className="text-[11px] text-[#817C73]">Arusha, Tanzania</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#B89B62] shrink-0" />
              <div>
                <span className="font-semibold block leading-tight">Visiting Hours</span>
                <span className="text-[11px] text-[#817C73]">Mon–Sat: 10:00 – 19:00 EAT</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#B89B62] shrink-0" />
              <div>
                <span className="font-semibold block leading-tight">Authenticity Deed</span>
                <span className="text-[11px] text-[#817C73]">Cryptographic Blockchain Proof</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#B89B62] shrink-0" />
              <div>
                <span className="font-semibold block leading-tight">Global Logistics</span>
                <span className="text-[11px] text-[#817C73]">ISPM-15 Timber Crate Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
