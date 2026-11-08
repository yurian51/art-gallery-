import React from 'react';
import heroArtworkImage from '../../assets/images/hero_african_art_gallery_1794114972525.jpg';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, navigateTo, artworks } = useApp();
  const sw = language === 'sw';
  const featured = artworks.find(item => item.featured && item.images.length > 0);
  const image = featured?.images[0] || heroArtworkImage;

  return (
    <section className="relative overflow-hidden bg-[#F7F5F0]">
      <div className="mx-auto grid min-h-[680px] max-w-[1500px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-14 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 border border-[#B89B62]/40 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#80683D]">
            <MapPin className="h-3.5 w-3.5" />
            {sw ? 'Arusha, Tanzania' : 'Arusha, Tanzania'}
          </div>
          <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A88B54]">
            <Sparkles className="h-4 w-4" />
            {sw ? 'Sanaa ya Afrika, kwa mtazamo mpya' : 'African art, seen differently'}
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#171717] sm:text-6xl lg:text-7xl">
            {sw ? 'Sanaa yenye roho. Hadithi zisizosahaulika.' : 'Art with soul. Stories that stay.'}
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-8 text-[#70695F] sm:text-base">
            {sw
              ? 'Gundua sanaa ya Kiafrika, mitazamo ya wasanii na kazi zinazobeba utambulisho, ubunifu na urithi wa kitamaduni.'
              : 'Discover African art, the perspectives of its makers, and works shaped by identity, imagination and cultural heritage.'}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigateTo('/gallery')} className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#171717] px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#B89B62] hover:text-[#171717]">
              {sw ? 'Chunguza galari' : 'Explore the gallery'} <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigateTo('/about')} className="inline-flex min-h-14 items-center justify-center border border-[#171717]/25 px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#171717] transition-colors hover:border-[#B89B62] hover:bg-white">
              {sw ? 'Kuhusu galari' : 'Discover our story'}
            </button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#817C73]/20 pt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#70695F]">
            <span>{sw ? 'Sanaa ya Kiafrika' : 'African art'}</span>
            <span>{sw ? 'Wasanii na wabunifu' : 'Artists & makers'}</span>
            <span>{sw ? 'Arusha, Tanzania' : 'Based in Arusha'}</span>
          </div>
        </div>

        <div className="relative min-h-[440px] sm:min-h-[560px] lg:min-h-[610px]">
          <div className="absolute inset-0 translate-x-3 translate-y-3 border border-[#B89B62]/60 sm:translate-x-5 sm:translate-y-5" />
          <div className="group relative h-full min-h-[440px] overflow-hidden bg-[#DED7CB] sm:min-h-[560px] lg:min-h-[610px]">
            <img src={image} alt={featured?.title || (sw ? 'Sanaa ya Kiafrika katika galari' : 'African art in the gallery')} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#E2C98E]">{sw ? 'Karibu Mrisho Art Gallery' : 'Welcome to Mrisho Art Gallery'}</span>
              <h2 className="mt-3 max-w-lg font-serif text-3xl font-semibold leading-tight sm:text-4xl">{featured?.title || (sw ? 'Gundua uzuri wa sanaa ya Kiafrika' : 'Explore the beauty of African art')}</h2>
              <p className="mt-3 max-w-md text-xs leading-6 text-white/80">{sw ? 'Kutoka Arusha, Tanzania.' : 'Rooted in Arusha, Tanzania.'}</p>
            </div>
            <div className="absolute right-5 top-5 border border-white/40 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              {sw ? 'Sanaa bila mipaka' : 'Art beyond boundaries'}
            </div>
          </div>
        </div>
      </div>
      <div className="border-y border-[#817C73]/15 bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-4 sm:px-8 lg:px-14">
          {[
            [sw ? 'Mahali' : 'Location', 'Arusha, Tanzania'],
            [sw ? 'Chunguza' : 'Discover', sw ? 'Kazi za sanaa' : 'Artworks'],
            [sw ? 'Kutana na' : 'Meet', sw ? 'Wasanii' : 'Artists'],
            [sw ? 'Wasiliana' : 'Connect', sw ? 'Maswali ya wateja' : 'Collector enquiries'],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A88B54]">{label}</span>
              <span className="text-xs font-semibold text-[#27231E]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
