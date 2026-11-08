import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Clock, Mail, Phone, Check, Award, Compass, Sparkles, Quote } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Editorial Header */}
      <div className="border-b border-[#817C73]/20 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
            Institutional Overview & Curatorial Charter
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
            About Mrisho Art Gallery
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#B89B62] mt-2">
            "Art Beyond Boundaries. Sanaa Bila Mipaka."
          </p>
        </div>
        <div className="bg-white p-3 border border-[#817C73]/20 shadow-sm shrink-0">
          <img
            src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
            alt="Official Logo of Mrisho Art Gallery"
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>

      {/* Origin Story & Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5 text-[#171717] font-sans">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            Rooted in African Heritage, Connected to Global Collectors
          </h2>

          <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed">
            Headquartered in Arusha, Tanzania, Mrisho Art Gallery was founded with a singular conviction:
            that African visual art, master wood sculpture, fine textiles, and contemporary paintings
            belong in the forefront of international cultural dialogues, museums, and private collections.
          </p>

          <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed">
            From the creative frontiers of Tanzania and East Africa to the international stage, our mission
            is to provide exceptional artists with sovereign accreditation, fair primary market valuation,
            and transparent digital blockchain provenance under the banner of Art Beyond Boundaries.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <button
              onClick={() => navigateTo('/gallery')}
              className="px-5 py-2.5 bg-[#171717] text-[#F7F5F0] hover:bg-[#B89B62] hover:text-[#171717] transition-all"
            >
              Explore Permanent Catalog
            </button>
            <button
              onClick={() => navigateTo('/artists')}
              className="px-5 py-2.5 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
            >
              Master Artists Roster
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 border-2 border-[#817C73]/25 overflow-hidden shadow-xl bg-[#EBE6DF]">
          <img
            src="/src/assets/images/gallery_interior_dar_1794114974688.jpg"
            alt="Interior of Mrisho Art Gallery, Arusha Pavilion"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
      </div>

      {/* Founder & CEO Visionary Profile */}
      <div className="bg-gradient-to-br from-[#171717] via-[#1f1d1b] to-[#121212] text-[#F7F5F0] border-2 border-[#B89B62]/40 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none">
          <img
            src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
            alt=""
            className="w-full h-full object-contain filter invert"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-16 relative z-10">
          {/* Executive Portrait Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer decorative gold frame border */}
              <div className="absolute -inset-2.5 border border-[#B89B62]/40 translate-x-2 translate-y-2 pointer-events-none transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-500"></div>
              
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] bg-[#0E0E0E] overflow-hidden shadow-2xl border-2 border-[#B89B62]">
                <img
                  src="/assets/aistudio/file_000000007ed88211923be0350c1162b0_d5208529.png"
                  alt="Hussein Sadiki Gumbo, Founder & CEO of Mrisho Art Gallery"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#171717]/90 backdrop-blur-md border border-[#B89B62]/60 px-3.5 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B89B62]" />
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B89B62]">
                      {language === 'sw' ? 'Mwanzilishi & CEO' : 'Founder & CEO'}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#F7F5F0]/70">
                    Mrisho Gallery
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B62] font-semibold block">
                Mrisho Art Gallery
              </span>
              <p className="text-xs text-[#F7F5F0]/60">
                Arusha, Tanzania
              </p>
              <div className="pt-2 flex flex-col items-center gap-0.5 text-[11px] text-[#F7F5F0]/85 font-mono">
                <div className="flex items-center gap-2">
                  <a href="tel:+255639827831" className="hover:text-[#B89B62] transition-colors">+255 639 827 831</a>
                  <span>·</span>
                  <a href="tel:+255782400311" className="hover:text-[#B89B62] transition-colors">+255 782 400 311</a>
                </div>
                <a href="mailto:mrishoartist@gmail.com" className="text-[#B89B62] hover:underline font-sans text-[11px]">
                  mrishoartist@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Executive Vision Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89B62]/15 border border-[#B89B62]/30 text-[#B89B62] text-[10px] uppercase tracking-[0.25em] font-semibold">
                <Sparkles className="w-3 h-3 text-[#B89B62]" />
                {language === 'sw' ? 'Uongozi wa Galari' : 'Executive Leadership'}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F5F0] tracking-tight">
                {language === 'sw' ? 'Mwanzilishi & Afisa Mtendaji Mkuu' : 'Founder & Chief Executive Officer'}
              </h2>

              <p className="font-serif italic text-2xl sm:text-3xl text-[#B89B62]">
                Hussein Sadiki Gumbo
              </p>
              <p className="text-xs uppercase tracking-widest text-[#F7F5F0]/70 font-mono">
                {language === 'sw'
                  ? 'Mwanzilishi na Afisa Mtendaji Mkuu · Arusha, Tanzania'
                  : 'Founder & CEO · Arusha, Tanzania'}
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#B89B62] space-y-3">
              <Quote className="w-8 h-8 text-[#B89B62]/30 absolute -top-3 -left-3.5 fill-[#B89B62]/20" />
              <p className="font-serif italic text-lg sm:text-xl text-[#F7F5F0] leading-relaxed">
                {language === 'sw'
                  ? '"Sanaa ni sauti yetu kuu na daraja la kitamaduni. Kutoka Arusha kuelekea ulimwenguni, lengo letu ni kuonyesha ubunifu na uzuri wa sanaa ya Kiafrika kwa ubora na heshima ya juu ya kimataifa."'
                  : '"Art is our sovereign voice and cultural bridge. From Arusha to the world, our mission is to present African brilliance with unapologetic museum excellence and authenticity."'}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#F7F5F0]/80 leading-relaxed font-sans">
              <p>
                {language === 'sw'
                  ? 'Chini ya uongozi wa Hussein Sadiki Gumbo, Mrisho Art Gallery imekuwa kitovu cha heshima kwa sanaa asilia na ya kisasa ya Kiafrika—kikijumuisha michoro, sanamu za miti ya Mpingo, picha za asili, na mikusanyiko ya kipekee. Kila kazi ya sanaa inapewa uthibitisho wa kimaabara na usajili wa blockchain, ikiwapa wakusanyaji ujasiri kamili wa umiliki.'
                  : 'Under the vision of Hussein Sadiki Gumbo, Mrisho Art Gallery operates as a premier institution for visual arts, monumental canvases, African modernist wood sculptures, and fine art prints. Every artwork accessioned undergoes rigorous verification and cryptographic provenance, setting an unassailable benchmark for global art commerce.'}
              </p>
            </div>

            <div className="pt-4 border-t border-[#817C73]/30 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B89B62]/20 border border-[#B89B62] flex items-center justify-center text-[#B89B62] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B89B62] font-semibold block">
                    {language === 'sw' ? 'Mamlaka ya Uratibu' : 'Curatorial Authority'}
                  </span>
                  <span className="text-xs text-[#F7F5F0] font-medium">
                    {language === 'sw' ? 'Dhamana ya Uhalisi wa Kudumu' : 'Verified African Fine Art Registry'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B89B62]/20 border border-[#B89B62] flex items-center justify-center text-[#B89B62] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B89B62] font-semibold block">
                    {language === 'sw' ? 'Makao Makuu' : 'Institutional Headquarters'}
                  </span>
                  <span className="text-xs text-[#F7F5F0] font-medium">
                    Arusha, Tanzania
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 4-Pillar Blockchain Provenance Protocol */}
      <div className="bg-white border border-[#817C73]/25 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
            Institutional Authenticity
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            The Mrisho Blockchain Provenance Standard
          </h2>
          <p className="text-xs sm:text-sm text-[#817C73] mt-2">
            Every artwork accessioned into our gallery undergoes a rigorous four-stage physical and
            cryptographic certification process before becoming available to patrons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">01</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Chemical & UV Spectrometry</h3>
            <p className="text-[#817C73] leading-relaxed">
              Raw earth pigments, organic binders, and wood species (e.g. Tanzanian Mpingo) are verified
              by our senior conservator at our Arusha Pavilion.
            </p>
          </div>

          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">02</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Genesis Block Minting</h3>
            <p className="text-[#817C73] leading-relaxed">
              The artwork’s unique photographic signature and accession metadata are minted onto the
              Polygon African Art Consortium (PAAC) private smart escrow.
            </p>
          </div>

          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">03</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Wax-Sealed Certificate</h3>
            <p className="text-[#817C73] leading-relaxed">
              A physical Certificate of Authenticity embossed with the gallery's wax seal, signed by the
              master artist and chief curator, accompanies the work.
            </p>
          </div>

          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">04</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">ISPM-15 Timber Crating</h3>
            <p className="text-[#817C73] leading-relaxed">
              All acquisitions are crated in bespoke treated timber, climate-sealed against humidity,
              and dispatched with DHL Express international transit insurance.
            </p>
          </div>
        </div>
      </div>

      {/* Physical Locations & Contact Curatorial Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Gallery Locations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#171717]">
            Visit Our Salons
          </h3>

          <div className="space-y-4 text-xs text-[#817C73]">
            <div className="p-5 bg-white border border-[#817C73]/20 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] block">Gallery Headquarters & Exhibition Pavilion</span>
              <h4 className="font-serif font-bold text-base text-[#171717]">Arusha, Tanzania</h4>
              <p className="text-[#817C73]">
                {language === 'sw'
                  ? 'Kituo kikuu cha maonyesho ya sanaa asilia, mikusanyiko ya kisasa na usimamizi wa wasanii.'
                  : 'Main institutional pavilion for visual art exhibitions, curated collections, and artist management.'}
              </p>
              <div className="pt-2 text-[11px] text-[#171717] font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B89B62]" />
                <span>Mon – Sat: 10:00 – 19:00 EAT</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#817C73]/20 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] block">International Client Services</span>
              <h4 className="font-serif font-bold text-base text-[#171717]">Tanzania & Global Advisory</h4>
              <p className="text-[#817C73]">
                {language === 'sw'
                  ? 'Huduma za ununuzi wa sanaa kwa wakusanyaji binafsi, makampuni, na taasisi za kimataifa.'
                  : 'White-glove international shipping, museum crating, and private curatorial acquisition advisory.'}
              </p>
              <div className="pt-2 text-[11px] text-[#171717] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89B62]" />
                <span>Verified Blockchain Registry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#817C73]/25 p-6 sm:p-8 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#171717]">
            Curatorial Enquiries & Advisory
          </h3>
          <p className="text-xs text-[#817C73]">
            For private acquisitions, museum loans, or private estate curatorial advisory,
            our directors will respond within 24 hours.
          </p>

          {sent ? (
            <div className="py-8 text-center space-y-2">
              <Check className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-[#171717]">Message Received</h4>
              <p className="text-xs text-[#817C73]">
                Thank you. Our Chief Curator will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#817C73] mb-1">Full Name *</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  required
                  placeholder="e.g. Ambassador Mwinyi"
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <div>
                <label className="block text-[#817C73] mb-1">Email Address *</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  required
                  placeholder="name@organization.com"
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <div>
                <label className="block text-[#817C73] mb-1">Enquiry Details *</label>
                <textarea
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Please specify artworks, curatorial projects, or collection inquiries..."
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
              >
                Send Message to Curatorial Board
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
