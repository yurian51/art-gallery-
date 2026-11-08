import React from 'react';
import heroArtworkImage from '../../assets/images/hero_african_art_gallery_1794114972525.jpg';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Eye, Palette } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, navigateTo, artworks, setInspectedArtwork } = useApp();
  const t = translations[language];
  const featuredArt = artworks.find(a => a.id === 'art-001') || artworks[0];
  const sw = language === 'sw';

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

          <h1 className="max-w-[760px] font-serif text-[clamp(3.1rem,6.1vw,6.3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#171717]">
            {t.hero.headline}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#625D55] sm:text-lg">
            {t.hero.subhead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => navigateTo('/gallery')}
              className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-sm bg-[#171717] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(23,23,23,0.14)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#B89B62] hover:text-[#171717]"
            >
              {t.hero.exploreGallery}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/artists')}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-sm border border-[#171717]/20 bg-white/50 px-7 text-xs font-bold uppercase tracking-[0.16em] text-[#171717] transition-all hover:border-[#B89B62] hover:bg-white"
            >
              {t.hero.discoverArtists}
            </button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#817C73]/20 py-5">
            <div className="pr-3">
              <Palette className="mb-2 h-5 w-5 text-[#A88B54]" />
              <p className="text-xs font-bold text-[#171717]">{sw ? 'Sanaa' : 'Art & craft'}</p>
              <p className="mt-1 text-[10px] leading-4 text-[#817C73]">{sw ? 'Kazi za ubunifu' : 'Creative expression'}</p>
            </div>
            <div className="border-x border-[#817C73]/20 px-4">
              <Eye className="mb-2 h-5 w-5 text-[#A88B54]" />
              <p className="text-xs font-bold text-[#171717]">{sw ? 'Mkusanyiko' : 'Collections'}</p>
              <p className="mt-1 text-[10px] leading-4 text-[#817C73]">{sw ? 'Gundua kazi' : 'Discover artworks'}</p>
            </div>
            <div className="pl-4">
              <MapPin className="mb-2 h-5 w-5 text-[#A88B54]" />
              <p className="text-xs font-bold text-[#171717]">Arusha</p>
              <p className="mt-1 text-[10px] leading-4 text-[#817C73]">Tanzania</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
          <div className="absolute -bottom-5 -left-5 z-0 hidden h-2/3 w-2/3 border border-[#B89B62]/50 sm:block" />
          <button
            type="button"
            onClick={() => { if (featuredArt) setInspectedArtwork(featuredArt); else navigateTo('/gallery'); }}
            aria-label={sw ? 'Tazama kazi ya sanaa iliyoangaziwa' : 'View featured artwork'}
            className="group relative z-10 block aspect-[4/4.5] w-full overflow-hidden bg-[#DED7CB] text-left shadow-[0_28px_70px_rgba(23,23,23,0.18)]"
          >
            <img
              src={heroArtworkImage}
              alt={sw ? 'Kazi ya sanaa ya Kiafrika katika galari' : 'African artwork in a curated gallery setting'}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5" />
            <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/35 bg-black/25 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:left-7 sm:top-7">
              <Sparkles className="h-3.5 w-3.5 text-[#D7B873]" />
              {sw ? 'Sanaa iliyochaguliwa' : 'Curated selection'}
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
