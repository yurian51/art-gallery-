import React from 'react';
import heroArtworkImage from '../../assets/images/hero_african_art_gallery_1794114972525.jpg';
import makondeSculptureImage from '../../assets/images/artwork_makonde_sculpture_1794114972660.jpg';
import swahiliPortraitImage from '../../assets/images/artwork_swahili_portrait_1794114974703.jpg';
import galleryInteriorImage from '../../assets/images/gallery_interior_dar_1794114974688.jpg';
import { useApp } from '../../context/AppContext';
import { ArtworkCard } from '../gallery/ArtworkCard';
import { ArrowRight, ArrowUpRight, Palette, Shapes, Camera, Frame, MessageCircle, Eye, Handshake, PackageCheck, Sparkles } from 'lucide-react';

export const CuratedFeatures: React.FC = () => {
  const {
    language,
    artworks,
    artists,
    exhibitions,
    journalArticles,
    navigateTo,
    setSearchQuery,
  } = useApp();
  const sw = language === 'sw';
  const featuredArtworks = artworks.filter(artwork => artwork.featured).slice(0, 4);
  const currentExhibition = exhibitions.find(exhibition => exhibition.status === 'CURRENT');
  const publishedArtists = artists.slice(0, 3);
  const publishedStories = journalArticles.slice(0, 2);

  const categories = [
    {
      title: sw ? 'Michoro asilia' : 'Original paintings',
      description: sw ? 'Rangi, hisia na simulizi katika kila kazi.' : 'Colour, emotion and storytelling in every composition.',
      image: heroArtworkImage,
      query: 'Paintings',
      icon: Palette,
      number: '01',
    },
    {
      title: sw ? 'Sanamu na uchongaji' : 'Sculpture & carving',
      description: sw ? 'Sanaa yenye umbo, kina na mguso wa mikono.' : 'Form, texture and the character of hand-crafted work.',
      image: makondeSculptureImage,
      query: 'Sculpture',
      icon: Shapes,
      number: '02',
    },
    {
      title: sw ? 'Picha za kisanaa' : 'Portraiture',
      description: sw ? 'Watu, utambulisho na hadithi zinazoonekana.' : 'People, identity and stories captured through art.',
      image: swahiliPortraitImage,
      query: 'Portraiture',
      icon: Camera,
      number: '03',
    },
    {
      title: sw ? 'Picha na machapisho' : 'Photography & prints',
      description: sw ? 'Mitazamo ya kisasa na kazi za kuchapishwa.' : 'Contemporary perspectives and fine-art prints.',
      image: galleryInteriorImage,
      query: 'Fine Art Prints',
      icon: Frame,
      number: '04',
    },
  ];

  const benefits = [
    {
      icon: Eye,
      title: sw ? 'Chunguza kwa utulivu' : 'Explore with clarity',
      body: sw ? 'Tazama kazi, maelezo na taarifa zilizopo kabla ya kufanya uamuzi.' : 'Review available artwork details and information before making a decision.',
    },
    {
      icon: MessageCircle,
      title: sw ? 'Wasiliana moja kwa moja' : 'Speak with the gallery',
      body: sw ? 'Uliza kuhusu kazi, wasanii au uwezekano wa kuagiza sanaa maalum.' : 'Ask about an artwork, an artist or a potential custom commission.',
    },
    {
      icon: Handshake,
      title: sw ? 'Pata mwongozo wa ununuzi' : 'Get acquisition guidance',
      body: sw ? 'Jadili mahitaji yako na upate maelezo ya hatua zinazofuata.' : 'Discuss your requirements and understand the next steps.',
    },
    {
      icon: PackageCheck,
      title: sw ? 'Thibitisha maelezo kwanza' : 'Confirm details first',
      body: sw ? 'Bei, upatikanaji na usafirishaji huthibitishwa kwa kila kazi.' : 'Pricing, availability and delivery are confirmed individually.',
    },
  ];

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

      <section className="bg-[#171717] py-14 text-[#F7F5F0] sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col gap-5 border-b border-white/15 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D7B873]">{sw ? 'Chunguza mitindo' : 'Explore popular art forms'}</span>
              <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">{sw ? 'Gundua sanaa kwa mtazamo wako.' : 'Find your place in the world of art.'}</h2>
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

      <section className="border-y border-[#817C73]/15 bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-14">
          <div className="relative min-h-[340px] overflow-hidden sm:min-h-[500px]">
            <img src={galleryInteriorImage} alt={sw ? 'Mazingira ya galari ya sanaa' : 'Art gallery interior'} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 border border-white/40 bg-[#171717]/80 px-5 py-4 text-white backdrop-blur-sm sm:bottom-8 sm:left-8">
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#E2C98E]">{sw ? 'Arusha, Tanzania' : 'Arusha, Tanzania'}</span>
              <span className="mt-1 block font-serif text-xl">{sw ? 'Sanaa, utamaduni na ubunifu' : 'Art, culture & creativity'}</span>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow={sw ? 'Huduma za galari' : 'A more personal art experience'}
              title={sw ? 'Mwongozo sahihi. Uamuzi wenye uhakika.' : 'Personal guidance. A considered choice.'}
              description={sw ? 'Tunataka kila mpenda sanaa apate taarifa anazohitaji kabla ya kuchagua au kuagiza kazi.' : 'We want every art enthusiast and collector to have the information needed before selecting or commissioning a work.'}
            />
            <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, title, body }, index) => (
                <div key={title} className="border-t border-[#B89B62]/50 pt-4">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-[#F1EBDD] text-[#927443]"><Icon className="h-4 w-4" /></span>
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#A88B54]">0{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#171717]">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#70695F]">{body}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigateTo('/about')} className="mt-9 inline-flex items-center gap-3 bg-[#171717] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#B89B62] hover:text-[#171717]">
              {sw ? 'Kuhusu galari' : 'Discover the gallery'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
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
    </div>
  );
};
