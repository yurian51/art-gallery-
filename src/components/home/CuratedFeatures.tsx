import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArtworkCard } from '../gallery/ArtworkCard';
import sculptureImage from '../../assets/images/artwork_makonde_sculpture_1794114972660.jpg';
import portraitImage from '../../assets/images/artwork_swahili_portrait_1794114974703.jpg';
import galleryImage from '../../assets/images/gallery_interior_dar_1794114974688.jpg';
import heroImage from '../../assets/images/hero_african_art_gallery_1794114972525.jpg';
import { ArrowRight, ArrowUpRight, Sparkles, Palette, Compass, BookOpen } from 'lucide-react';

const disciplines = [
  { title: 'Paintings & Landscapes', query: 'Paintings', image: heroImage, description: 'Colour, place and perspective across African visual culture.' },
  { title: 'Sculpture & Form', query: 'Sculpture', image: sculptureImage, description: 'Discover form, material, craft and dimensional expression.' },
  { title: 'Portraiture', query: 'Portraiture', image: portraitImage, description: 'Personal stories and identities expressed through portrait art.' },
  { title: 'Gallery & Culture', query: 'Traditional Art', image: galleryImage, description: 'Explore the spaces, practices and stories around art.' },
];

const journeySteps = [
  { title: 'Explore', body: 'Browse the gallery and discover the disciplines that interest you.' },
  { title: 'Discover', body: 'Open an artwork to review its available details and images.' },
  { title: 'Enquire', body: 'Contact the gallery with the title and any questions you have.' },
  { title: 'Discuss', body: 'Confirm availability, pricing and any additional information directly.' },
  { title: 'Arrange', body: 'Agree on payment, collection or delivery details with the gallery.' },
  { title: 'Collect', body: 'Complete the handover once all arrangements are confirmed.' },
];

const questions = [
  { q: 'How do I enquire about an artwork?', a: 'Open the artwork details and use the gallery contact options. Include the artwork title so the team can identify the work you mean.' },
  { q: 'Are all artworks available for purchase?', a: 'Availability and pricing are confirmed individually by the gallery. An artwork appearing online is not a payment or availability confirmation.' },
  { q: 'Can I request a custom artwork?', a: 'Yes. Use the commissions enquiry page to describe your idea, preferred medium, dimensions and budget.' },
  { q: 'Where is Mrisho Art Gallery based?', a: 'Mrisho Art Gallery is based in Arusha, Tanzania. Confirm the visit arrangements and precise meeting location with the gallery before travelling.' },
];

export const CuratedFeatures: React.FC = () => {
  const { language, artworks, artists, exhibitions, journalArticles, navigateTo, setSearchQuery } = useApp();
  const sw = language === 'sw';
  const featured = artworks.filter(item => item.featured).slice(0, 4);
  const currentExhibition = exhibitions.find(item => item.status === 'CURRENT');
  const visibleArtists = artists.slice(0, 3);
  const visibleStories = journalArticles.slice(0, 2);

  return (
    <div className="bg-[#F7F5F0] text-[#171717]">
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Mkusanyiko uliochaguliwa' : 'Selected collection'}</span>
              <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">{sw ? 'Sanaa inayobeba simulizi.' : 'Art that carries a story.'}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#70695F]">{sw ? 'Chunguza kazi zinazowasilishwa na Mrisho Art Gallery na upate maelezo kutoka kwenye katalogi.' : 'Explore works presented by Mrisho Art Gallery and review the information available in the catalogue.'}</p>
            </div>
            <button onClick={() => navigateTo('/gallery')} className="inline-flex items-center gap-3 border-b border-[#B89B62] pb-2 text-xs font-bold uppercase tracking-[0.15em] hover:text-[#9A7B43]">
              {sw ? 'Tazama galari yote' : 'View the gallery'} <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map(item => <ArtworkCard key={item.id} artwork={item} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-[#DED7CB] sm:min-h-[440px]">
                <img src={heroImage} alt="African art gallery collection" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 text-white sm:p-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2C98E]">{sw ? 'Mkusanyiko wa galari' : 'The gallery collection'}</span>
                  <h3 className="mt-3 max-w-lg font-serif text-3xl leading-tight sm:text-4xl">{sw ? 'Gundua sanaa na mitazamo mipya.' : 'Discover art and new perspectives.'}</h3>
                </div>
              </div>
              <div className="flex flex-col justify-between border border-[#817C73]/20 bg-[#F7F5F0] p-7 sm:p-10">
                <Sparkles className="h-7 w-7 text-[#A88B54]" />
                <div>
                  <h3 className="font-serif text-2xl font-semibold">{sw ? 'Katalogi inaboreshwa' : 'The catalogue is growing'}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#70695F]">{sw ? 'Kazi zitaonekana hapa baada ya taarifa na picha zake kuthibitishwa na kuwekwa kwenye katalogi.' : 'Artwork listings will appear here as verified details and images are added to the catalogue.'}</p>
                  <button onClick={() => navigateTo('/commissions')} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider">{sw ? 'Ulizia kazi maalum' : 'Enquire about a commission'} <ArrowRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Chunguza kwa aina' : 'Explore by discipline'}</span>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">{sw ? 'Tafuta mtindo unaokuvutia.' : 'Find the art that moves you.'}</h2>
            <p className="mt-4 text-sm leading-7 text-[#70695F]">{sw ? 'Chagua kundi ili kuchunguza kazi zinazohusiana nalo.' : 'Choose a discipline to explore related works in the gallery.'}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {disciplines.map((item, index) => (
              <button key={item.query} type="button" onClick={() => { setSearchQuery(item.query); navigateTo('/gallery'); }} className="group relative min-h-[340px] overflow-hidden bg-[#DED7CB] text-left sm:min-h-[420px]">
                <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <span className="absolute left-5 top-5 text-[10px] font-bold tracking-[0.2em] text-white">0{index + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <h3 className="font-serif text-2xl font-semibold">{sw ? ['Uchoraji na mandhari','Sanamu na maumbo','Picha za watu','Galari na utamaduni'][index] : item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/75">{sw ? ['Rangi, maeneo na mitazamo katika sanaa ya Afrika.','Chunguza maumbo, vifaa na ufundi wa sanaa.','Hadithi na utambulisho kupitia picha za watu.','Gundua mazingira na simulizi zinazozunguka sanaa.'][index] : item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E2C98E]">{sw ? 'Chunguza kundi' : 'Explore discipline'} <ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#171717] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="max-w-2xl">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D7B873]">{sw ? 'Safari ya mteja' : 'The collector journey'}</span>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">{sw ? 'Kutoka ugunduzi hadi kumiliki.' : 'From discovery to acquisition.'}</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">{sw ? 'Hatua zilizo wazi za kuulizia, kujifunza na kupanga upatikanaji wa kazi.' : 'A clear path for exploring, enquiring and arranging an artwork acquisition.'}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="bg-[#171717] p-7 sm:p-8">
                <span className="font-serif text-4xl text-[#D7B873]">0{index + 1}</span>
                <h3 className="mt-6 font-serif text-xl font-semibold">{sw ? ['Gundua','Chunguza','Ulizia','Jadili','Panga','Pokea'][index] : step.title}</h3>
                <p className="mt-3 text-xs leading-7 text-white/60">{sw ? ['Chunguza galari na ugundue aina za sanaa zinazokuvutia.','Fungua kazi na soma taarifa zilizopo.','Wasiliana na galari kuhusu kazi unayoipenda.','Thibitisha upatikanaji, bei na maelezo ya ziada.','Kubalianeni kuhusu malipo na usafirishaji.','Kamilisha makabidhiano baada ya makubaliano.'][index] : step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {currentExhibition && (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 overflow-hidden border border-[#817C73]/20 lg:grid-cols-2">
            <div className="relative min-h-[300px] bg-[#DED7CB] sm:min-h-[440px]">
              <img src={currentExhibition.coverImage} alt={currentExhibition.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A88B54]">{sw ? 'Maonesho' : 'Exhibition spotlight'}</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-5xl">{currentExhibition.title}</h2>
              <p className="mt-5 text-sm leading-7 text-[#70695F]">{currentExhibition.description}</p>
              <p className="mt-5 text-xs text-[#70695F]">{currentExhibition.venue} · {currentExhibition.location}</p>
              <button onClick={() => navigateTo('/exhibitions')} className="mt-8 inline-flex items-center gap-3 self-start bg-[#171717] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#B89B62] hover:text-[#171717]">{sw ? 'Tazama maonesho' : 'Explore exhibitions'} <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      )}

      {visibleArtists.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="mb-10 flex items-end justify-between gap-5">
              <div><span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Wasanii' : 'Artists & makers'}</span><h2 className="font-serif text-3xl font-semibold sm:text-5xl">{sw ? 'Watu nyuma ya sanaa.' : 'Meet the artists.'}</h2></div>
              <button onClick={() => navigateTo('/artists')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider">{sw ? 'Wasanii wote' : 'All artists'} <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {visibleArtists.map(artist => <div key={artist.id} className="border border-[#817C73]/20 bg-[#F7F5F0] p-5"><div className="aspect-[4/3] overflow-hidden bg-[#DED7CB]"><img src={artist.profileImage} alt={artist.name} className="h-full w-full object-cover" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#A88B54]">{artist.origin}</p><h3 className="mt-2 font-serif text-2xl font-semibold">{artist.name}</h3><p className="mt-2 text-xs leading-6 text-[#70695F]">{artist.title}</p></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Kwa nini Mrisho' : 'The gallery experience'}</span><h2 className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">{sw ? 'Sanaa, utamaduni na mawasiliano ya karibu.' : 'Art, culture and a considered experience.'}</h2><p className="mt-5 text-sm leading-7 text-[#70695F]">{sw ? 'Tunawapa wageni nafasi ya kuchunguza sanaa na kuwasiliana moja kwa moja kuhusu kazi wanazozipenda.' : 'A welcoming place to explore art, learn about creative perspectives and speak directly with the gallery about the works that interest you.'}</p></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: Palette, title: sw ? 'Sanaa ya Kiafrika' : 'African perspectives', body: sw ? 'Mitindo, urithi na ubunifu wa wasanii wa Afrika.' : 'Artistic practices, heritage and contemporary creativity.' },
                { icon: Compass, title: sw ? 'Ugunduzi rahisi' : 'Easy discovery', body: sw ? 'Chunguza galari kwa aina na maelezo ya kazi.' : 'Explore the gallery by discipline and available artwork details.' },
                { icon: BookOpen, title: sw ? 'Maarifa na simulizi' : 'Stories & context', body: sw ? 'Jifunze kuhusu kazi na mazingira yake.' : 'Learn about artworks and the context around them.' },
                { icon: Sparkles, title: sw ? 'Huduma ya karibu' : 'Personal enquiries', body: sw ? 'Wasiliana na galari kwa maelekezo ya hatua zinazofuata.' : 'Speak with the gallery for guidance on the next steps.' },
              ].map(({ icon: Icon, title, body }) => <div key={title} className="border border-[#817C73]/20 bg-white p-6"><Icon className="h-6 w-6 text-[#A88B54]" /><h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3><p className="mt-2 text-xs leading-6 text-[#70695F]">{body}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-14">
          <div><span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Maswali ya kawaida' : 'Questions, answered'}</span><h2 className="font-serif text-3xl font-semibold sm:text-5xl">{sw ? 'Ungependa kujua nini?' : 'Good to know.'}</h2><p className="mt-4 text-sm leading-7 text-[#70695F]">{sw ? 'Taarifa muhimu kabla ya kuulizia kazi au kupanga ziara.' : 'Useful information before making an enquiry or arranging a visit.'}</p><button onClick={() => navigateTo('/contact')} className="mt-8 inline-flex items-center gap-2 border-b border-[#B89B62] pb-2 text-xs font-bold uppercase tracking-wider">{sw ? 'Wasiliana nasi' : 'Contact the gallery'} <ArrowUpRight className="h-4 w-4" /></button></div>
          <div className="border-t border-[#817C73]/25">{questions.map((item,index)=><details key={item.q} className="group border-b border-[#817C73]/25 py-5" open={index===0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-semibold marker:hidden">{sw ? ['Ninawezaje kuulizia kazi ya sanaa?','Je, kazi zote zinapatikana kwa kununua?','Naweza kuagiza kazi maalum?','Galari ipo wapi?'][index] : item.q}<span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#B89B62]/50 text-[#A88B54] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-4 pr-10 text-xs leading-7 text-[#70695F]">{sw ? ['Fungua maelezo ya kazi na utumie njia za mawasiliano ya galari. Taja jina la kazi ili timu iweze kukuelekeza.','Upatikanaji na bei huthibitishwa moja kwa moja na galari kabla ya makubaliano.','Tumia ukurasa wa maombi ya kazi maalum kueleza wazo, vipimo na bajeti.','Mrisho Art Gallery ipo Arusha, Tanzania. Thibitisha mahali na muda wa ziara kabla ya kusafiri.'][index] : item.a}</p></details>)}</div>
        </div>
      </section>

      {visibleStories.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="mb-10 flex items-end justify-between gap-5"><div><span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#A88B54]">{sw ? 'Jarida la galari' : 'From the gallery journal'}</span><h2 className="font-serif text-3xl font-semibold sm:text-5xl">{sw ? 'Hadithi na mitazamo.' : 'Stories & perspectives.'}</h2></div><button onClick={() => navigateTo('/journal')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider">{sw ? 'Soma zaidi' : 'Read the journal'} <ArrowRight className="h-4 w-4" /></button></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{visibleStories.map(story=><article key={story.id} className="border border-[#817C73]/20 bg-white p-5"><div className="aspect-[16/9] overflow-hidden bg-[#DED7CB]"><img src={story.coverImage} alt={story.title} className="h-full w-full object-cover" /></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#A88B54]">{story.category}</p><h3 className="mt-2 font-serif text-2xl font-semibold">{story.title}</h3><p className="mt-3 text-xs leading-6 text-[#70695F]">{story.excerpt}</p></article>)}</div>
          </div>
        </section>
      )}

      <section className="bg-[#D7B873] py-16 sm:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div className="max-w-3xl"><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5B4826]">{sw ? 'Anza mazungumzo' : 'Start a conversation'}</span><h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-5xl">{sw ? 'Una wazo la sanaa au unatafuta kazi maalum?' : 'Looking for a particular artwork or a custom piece?'}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#3F3421]">{sw ? 'Tuambie unachotafuta. Galari itakuelekeza kuhusu taarifa zilizopo na hatua zinazofuata.' : 'Tell us what you have in mind. The gallery can guide you through available information and the next steps.'}</p></div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row"><button onClick={() => navigateTo('/commissions')} className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#171717] px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-[#171717]">{sw ? 'Ulizia sanaa maalum' : 'Make an enquiry'} <ArrowRight className="h-4 w-4" /></button><button onClick={() => navigateTo('/gallery')} className="inline-flex min-h-14 items-center justify-center border border-[#171717]/40 px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#171717] hover:bg-[#171717]/5">{sw ? 'Chunguza galari' : 'Browse gallery'}</button></div>
        </div>
      </section>
    </div>
  );
};
