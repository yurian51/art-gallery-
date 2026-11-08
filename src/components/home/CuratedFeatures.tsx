import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
    setSearchQuery,
  } = useApp();
  const sw = language === 'sw';
  const featuredArtworks = artworks.filter(artwork => artwork.featured).slice(0, 4);
  const currentExhibition = exhibitions.find(exhibition => exhibition.status === 'CURRENT');
  const publishedArtists = artists.slice(0, 3);
  const publishedStories = journalArticles.slice(0, 2);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const t = translations[language];

  const featuredArtworks = artworks.filter(a => a.featured).slice(0, 6);
  const currentExhibition = exhibitions.find(e => e.status === 'CURRENT') || exhibitions[0];

  const journey = [
    {
      number: '01',
      title: sw ? 'Gundua mkusanyiko' : 'Explore the collection',
      body: sw ? 'Chunguza michoro, sanamu, picha na mitindo mbalimbali ya sanaa.' : 'Explore paintings, sculpture, photography and a range of artistic disciplines.',
    },
    {
      number: '02',
      title: sw ? 'Chagua kazi unayoipenda' : 'Find a work that speaks to you',
      body: sw ? 'Hifadhi au kusanya kazi unazotaka kuzifanyia utafiti zaidi.' : 'Shortlist artworks that match your taste, space or collection.',
    },
    {
      number: '03',
      title: sw ? 'Jifunze kuhusu kazi' : 'Learn about the artwork',
      body: sw ? 'Soma maelezo ya kazi, msanii, vipimo na taarifa zilizopo.' : 'Review the available details about the work, artist, medium and dimensions.',
    },
    {
      number: '04',
      title: sw ? 'Wasiliana na galari' : 'Speak with the gallery',
      body: sw ? 'Uliza kuhusu bei, upatikanaji, asili na namna ya kupata kazi.' : 'Ask about pricing, availability, provenance information and acquisition.',
    },
    {
      number: '05',
      title: sw ? 'Thibitisha mpango' : 'Confirm the arrangements',
      body: sw ? 'Jadili malipo, usafirishaji au namna ya kuchukua kazi.' : 'Agree on payment, collection or delivery arrangements directly with the gallery.',
    },
    {
      number: '06',
      title: sw ? 'Karibisha sanaa yako' : 'Welcome art into your space',
      body: sw ? 'Pokea maelekezo ya mwisho na panga hatua ya kukabidhi kazi.' : 'Complete the handover with the details and arrangements confirmed by the gallery.',
    },
  ];

  const faqs = [
    {
      q: sw ? 'Ninawezaje kuulizia kazi ya sanaa?' : 'How do I enquire about an artwork?',
      a: sw ? 'Fungua ukurasa wa kazi husika au sehemu ya mawasiliano ya galari. Taja jina la kazi unayoulizia ili timu iweze kukuelekeza.' : 'Open the artwork details or the gallery contact area. Include the artwork title in your enquiry so the team can guide you.',
    },
    {
      q: sw ? 'Je, kazi zote zina bei na upatikanaji unaoonekana?' : 'Are prices and availability shown for every artwork?',
      a: sw ? 'Si lazima. Bei na upatikanaji huthibitishwa moja kwa moja kwa kila kazi kabla ya makubaliano.' : 'Not necessarily. Pricing and availability are confirmed individually before any agreement.',
    },
    {
      q: sw ? 'Je, naweza kuagiza kazi maalum?' : 'Can I request a custom artwork?',
      a: sw ? 'Ndiyo. Tumia sehemu ya Sanaa Maalum kueleza wazo, vipimo na mahitaji yako.' : 'Yes. Use the Commissions section to describe your idea, dimensions and requirements.',
    },
    {
      q: sw ? 'Galari ipo wapi?' : 'Where is the gallery based?',
      a: sw ? 'Mrisho Art Gallery ipo Arusha, Tanzania. Maelezo ya anuani ya kutembelea yatathibitishwa kabla ya ziara.' : 'Mrisho Art Gallery is based in Arusha, Tanzania. Visit arrangements and the precise address should be confirmed before travelling.',
    },
  ];

  const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
    <div className="max-w-2xl">
      <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{eyebrow}</span>
      <h2 className="font-serif text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-[#171717] sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-xl text-sm leading-7 text-[#70695F] sm:text-base">{description}</p>}
    </div>
  );

  return (
    <div className="bg-[#F7F5F0]">
      <section className="border-b border-[#817C73]/15 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={sw ? 'Mkusanyiko uliochaguliwa' : 'A considered collection'}
              title={sw ? 'Sanaa inayobeba simulizi.' : 'Art that carries a story.'}
              description={sw ? 'Gundua kazi za sanaa zinazowasilishwa na Mrisho Art Gallery. Kila kazi ina nafasi yake, mtazamo wake na historia yake.' : 'Discover artworks presented by Mrisho Art Gallery. Each work has its own character, perspective and story.'}
            />
            <button onClick={() => navigateTo('/gallery')} className="group inline-flex items-center gap-3 self-start border-b border-[#B89B62] pb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#171717] transition-colors hover:text-[#9A7B43] md:self-auto">
              {sw ? 'Tazama galari yote' : 'Explore the gallery'}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
          {featuredArtworks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 md:gap-7">
              {featuredArtworks.map(artwork => <ArtworkCard key={artwork.id} artwork={artwork} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[300px] overflow-hidden bg-[#DED7CB] sm:min-h-[420px]">
                <img src={heroArtworkImage} alt={sw ? 'Sanaa katika mkusanyiko wa galari' : 'Artwork from the gallery collection'} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 text-white sm:p-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2C98E]">{sw ? 'Mkusanyiko wa galari' : 'Gallery collection'}</span>
                  <h3 className="mt-3 max-w-lg font-serif text-3xl leading-tight sm:text-4xl">{sw ? 'Gundua kazi za sanaa na mitazamo mipya.' : 'Discover artworks and new perspectives.'}</h3>
                </div>
              </div>
              <div className="flex flex-col justify-between border border-[#817C73]/20 bg-[#F7F5F0] p-7 sm:p-10">
                <Sparkles className="h-7 w-7 text-[#A88B54]" />
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#171717]">{sw ? 'Kazi mpya zitaonekana hapa' : 'New works will appear here'}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#70695F]">{sw ? 'Orodha ya kazi itaonyeshwa pale taarifa zilizothibitishwa zitakapowekwa kwenye katalogi.' : 'Artwork listings will appear here as verified records are added to the catalogue.'}</p>
                  <button onClick={() => navigateTo('/gallery')} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#A88B54]">
                    {sw ? 'Fungua katalogi' : 'Open catalogue'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={sw ? 'Aina za sanaa' : 'Explore by discipline'}
              title={sw ? 'Tafuta mtindo unaokuvutia.' : 'Find the art that moves you.'}
              description={sw ? 'Anza kwa kuchagua aina ya sanaa unayotaka kuchunguza.' : 'Start with the form of art you would like to explore.'}
            />
            <span className="text-xs font-medium text-[#817C73]">{sw ? 'Makundi 04' : '04 art disciplines'}</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map(({ title, description, image, query, icon: Icon, number }) => (
              <button key={query} type="button" aria-label={title} onClick={() => { setSearchQuery(query); navigateTo('/gallery'); }} className="group relative min-h-[340px] overflow-hidden bg-[#DED7CB] text-left sm:min-h-[410px]">
                <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 transition-opacity group-hover:from-black/90" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-white">
                  <span className="text-[10px] font-bold tracking-[0.2em]">{number}</span>
                  <Icon className="h-5 w-5 text-[#E2C98E]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <h3 className="font-serif text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-6 text-white/75">{description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E2C98E]">
                    {sw ? 'Chunguza kundi' : 'Explore category'} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
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
            <p className="max-w-md text-xs leading-6 text-white/60">{sw ? 'Chagua aina ya sanaa ili kuona kazi zinazohusiana kwenye katalogi.' : 'Choose a discipline to explore related works in the gallery catalogue.'}</p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              { label: sw ? 'Sanaa za kisasa' : 'Contemporary art', query: 'Contemporary Art' },
              { label: sw ? 'Sanaa za jadi' : 'Traditional art', query: 'Traditional Art' },
              { label: sw ? 'Sanaa dhahania' : 'Abstract art', query: 'Abstract Art' },
              { label: sw ? 'Mandhari na mazingira' : 'Landscape art', query: 'Landscape Art' },
              { label: sw ? 'Picha za watu' : 'Portraiture', query: 'Portraiture' },
              { label: sw ? 'Sanaa mchanganyiko' : 'Mixed media', query: 'Mixed Media' },
              { label: sw ? 'Sanaa za kidijitali' : 'Digital art', query: 'Digital Art' },
              { label: sw ? 'Machapisho ya sanaa' : 'Fine-art prints', query: 'Fine Art Prints' },
            ].map((item, index) => (
              <button key={item.query} type="button" onClick={() => { setSearchQuery(item.query); navigateTo('/gallery'); }} className="group flex min-h-[82px] items-center justify-between gap-3 bg-[#171717] px-4 py-5 text-left transition-colors hover:bg-[#28251F] sm:px-6">
                <span className="text-xs font-semibold text-white/85 transition-colors group-hover:text-[#E2C98E]">{item.label}</span>
                <span className="font-serif text-sm text-[#B89B62]">0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Safari ya mpenda sanaa' : 'The collector journey'}</span>
            <h2 className="font-serif text-3xl font-semibold tracking-[-0.025em] text-[#171717] sm:text-4xl lg:text-5xl">{sw ? 'Kutoka kugundua hadi kumiliki.' : 'From discovery to acquisition.'}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#70695F]">{sw ? 'Mchakato ulio wazi unaokuwezesha kuuliza, kuthibitisha na kupanga hatua zinazofuata.' : 'A clear process that helps you enquire, confirm the details and arrange the next step.'}</p>
          </div>
          <div className="grid grid-cols-1 gap-0 border-y border-[#817C73]/20 md:grid-cols-2 xl:grid-cols-3">
            {journey.map((step, index) => (
              <div key={step.number} className={`relative px-6 py-9 sm:px-9 sm:py-12 ${index > 0 ? 'border-t border-[#817C73]/20 md:border-l md:border-t-0' : ''}`}>
                <span className="font-serif text-5xl font-semibold text-[#D9CCB1]">{step.number}</span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-[#171717]">{step.title}</h3>
                <p className="mt-3 max-w-sm text-xs leading-7 text-[#70695F]">{step.body}</p>
                {index < 2 && <ArrowRight className="absolute right-7 top-10 hidden h-5 w-5 text-[#B89B62] md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {currentExhibition && (
        <section className="bg-[#171717] py-16 text-[#F7F5F0] sm:py-24">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-14">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D7B873]"><span className="h-1.5 w-1.5 rounded-full bg-[#D7B873]" />{sw ? 'Maonesho' : 'Exhibition spotlight'}</span>
              <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">{currentExhibition.title}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">{currentExhibition.description}</p>
              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4 text-xs">
                <div><span className="mb-1 block text-[9px] uppercase tracking-widest text-[#D7B873]">{sw ? 'Mahali' : 'Venue'}</span>{currentExhibition.venue}</div>
                <div><span className="mb-1 block text-[9px] uppercase tracking-widest text-[#D7B873]">{sw ? 'Tarehe' : 'Dates'}</span>{currentExhibition.startDate} – {currentExhibition.endDate}</div>
              </div>
              <button onClick={() => navigateTo('/exhibitions')} className="mt-9 inline-flex items-center gap-3 bg-[#D7B873] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#171717] transition-colors hover:bg-white">
                {sw ? 'Tazama maonesho' : 'Explore exhibitions'} <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative min-h-[300px] overflow-hidden sm:min-h-[440px]">
              <img src={currentExhibition.coverImage} alt={currentExhibition.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {publishedArtists.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow={sw ? 'Watu nyuma ya sanaa' : 'The people behind the work'} title={sw ? 'Kutana na wasanii.' : 'Meet the artists.'} description={sw ? 'Gundua wasanii na mitazamo inayochangia mkusanyiko wa galari.' : 'Discover the artists and perspectives represented in the gallery.'} />
              <button onClick={() => navigateTo('/artists')} className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#A88B54]">{sw ? 'Wasanii wote' : 'All artists'} <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {publishedArtists.map(artist => (
                <button key={artist.id} onClick={() => navigateTo('/artists')} className="group border border-[#817C73]/15 bg-[#F7F5F0] p-5 text-left transition-colors hover:border-[#B89B62]">
                  <div className="aspect-[4/3] overflow-hidden bg-[#DED7CB]">
                    <img src={artist.profileImage} alt={artist.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span className="mt-5 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#A88B54]">{artist.origin}</span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#171717]">{artist.name}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#70695F]">{artist.title}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#171717]">{sw ? 'Tazama wasifu' : 'View artist profile'} <ArrowUpRight className="h-4 w-4" /></span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-14">
          <div>
            <SectionHeading eyebrow={sw ? 'Maswali ya kawaida' : 'Questions, answered'} title={sw ? 'Ungependa kujua nini?' : 'What would you like to know?'} description={sw ? 'Maelezo muhimu kabla ya kuchagua kazi au kupanga ziara.' : 'Useful information before choosing an artwork or arranging a visit.'} />
            <button onClick={() => navigateTo('/commissions')} className="mt-8 inline-flex items-center gap-2 border-b border-[#B89B62] pb-2 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#A88B54]">{sw ? 'Wasiliana na galari' : 'Contact the gallery'} <ArrowUpRight className="h-4 w-4" /></button>
          </div>
          <div className="border-t border-[#817C73]/25">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="group border-b border-[#817C73]/25 py-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-semibold text-[#171717] marker:hidden">
                  {faq.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#B89B62]/50 text-[#A88B54] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pt-4 pr-10 text-xs leading-7 text-[#70695F]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {publishedStories.length > 0 && (
        <section className="border-y border-[#817C73]/15 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow={sw ? 'Jarida la galari' : 'From the gallery journal'} title={sw ? 'Hadithi na mitazamo.' : 'Stories & perspectives.'} />
              <button onClick={() => navigateTo('/journal')} className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#A88B54]">{sw ? 'Soma zaidi' : 'Read the journal'} <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {publishedStories.map(story => (
                <button key={story.id} onClick={() => navigateTo('/journal')} className="group grid grid-cols-1 gap-5 text-left sm:grid-cols-[0.85fr_1.15fr]">
                  <div className="aspect-[5/4] overflow-hidden bg-[#DED7CB]"><img src={story.coverImage} alt={story.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A88B54]">{story.category} · {story.readTimeMinutes} {sw ? 'dakika' : 'min read'}</span>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#171717] group-hover:text-[#A88B54]">{story.title}</h3>
                    <p className="mt-3 text-xs leading-6 text-[#70695F]">{story.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#171717]">{sw ? 'Soma simulizi' : 'Read story'} <ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#D7B873] py-16 sm:py-24">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-[#171717]/15" />
        <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full border border-[#171717]/15" />
        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5B4826]">{sw ? 'Anza mazungumzo' : 'Start a conversation'}</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#171717] sm:text-5xl">{sw ? 'Una wazo la sanaa au unatafuta kazi maalum?' : 'Looking for a particular artwork or a custom piece?'}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3F3421]">{sw ? 'Tuambie unachotafuta. Timu ya galari inaweza kukuelekeza kuhusu kazi, wasanii na hatua zinazofuata.' : 'Tell us what you have in mind. The gallery can guide you through available works, artists and the next steps.'}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button onClick={() => navigateTo('/commissions')} className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#171717] px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#171717]">{sw ? 'Ulizia sanaa' : 'Make an enquiry'} <ArrowRight className="h-4 w-4" /></button>
            <button onClick={() => navigateTo('/gallery')} className="inline-flex min-h-14 items-center justify-center border border-[#171717]/40 px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#171717] transition-colors hover:bg-[#171717]/5">{sw ? 'Chunguza galari' : 'Browse gallery'}</button>
          </div>
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
