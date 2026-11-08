import React from 'react';
import heroArtworkImage from '../../assets/images/hero_african_art_gallery_1794114972525.jpg';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import { ShieldCheck, ArrowRight, Compass, Clock, MapPin, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, currency, navigateTo, artworks, setInspectedArtwork } = useApp();
  const t = translations[language];

  const featuredArt = artworks.find(a => a.id === 'art-mrisho-01') || artworks[0];

  return (
    <section className="relative overflow-hidden bg-[#F7F5F0]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#B89B62]/15" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] rounded-full border border-[#B89B62]/20" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-12 pt-12 sm:px-8 lg:min-h-[650px] lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#B89B62]/40 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#80683D] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#B89B62]" />
            {sw ? 'Sanaa ya kipekee · Arusha, Tanzania' : 'A distinctive art destination · Arusha, Tanzania'}
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
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D7B873]">
                {sw ? 'Kazi iliyoangaziwa' : 'Featured artwork'}
              </p>
              <h2 className="max-w-lg font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                {featuredArt?.title || (sw ? 'Gundua sanaa ya kipekee' : 'Discover distinctive art')}
              </h2>
              <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-4">
                <span className="text-xs text-white/80">
                  {featuredArt ? featuredArt.artistName : (sw ? 'Mkusanyiko wa galari' : 'Gallery collection')}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition-all group-hover:border-[#D7B873] group-hover:bg-[#D7B873] group-hover:text-[#171717]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </button>

          <div className="absolute -bottom-7 right-4 z-20 max-w-[230px] border border-[#B89B62]/35 bg-white p-4 shadow-[0_16px_40px_rgba(23,23,23,0.12)] sm:-right-5 sm:bottom-8">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#F1EBDD] text-[#9A7B43]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#171717]">
                  {sw ? 'Mrisho Art Gallery' : 'Mrisho Art Gallery'}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-[#817C73]">
                  {sw ? 'Sanaa, wasanii na simulizi kutoka Arusha.' : 'Art, artists and stories from Arusha.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-[#817C73]/15 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-4 sm:px-8 lg:px-14">
          {[
            { label: sw ? 'Mahali' : 'Based in', value: 'Arusha, Tanzania' },
            { label: sw ? 'Chunguza' : 'Discover', value: sw ? 'Kazi za sanaa' : 'Original artworks' },
            { label: sw ? 'Kutana na' : 'Meet', value: sw ? 'Wasanii' : 'Artists & makers' },
            { label: sw ? 'Wasiliana nasi' : 'Connect with us', value: sw ? 'Maswali ya wateja' : 'Collector enquiries' },
          ].map((item, index) => (
            <div key={item.label} className={`flex flex-col gap-1 ${index > 0 ? 'sm:border-l sm:border-[#817C73]/15 sm:pl-6' : ''}`}>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A88B54]">{item.label}</span>
              <span className="text-xs font-semibold text-[#27231E]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
