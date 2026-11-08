import React, { useState } from 'react';
import galleryInteriorImage from '../../assets/images/gallery_interior_dar_1794114974688.jpg';
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
          <p className="text-xs uppercase tracking-[0.16em] text-[#817C73] mt-3">
            Led by <span className="font-semibold text-[#171717]">Hussein Sadiki Gumbo</span>, CEO
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
            Rooted in East African Heritage, Connected to Global Collectors
          </h2>

          <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed">
            Based in Arusha, Tanzania, Mrisho Art Gallery is an independent gallery focused on presenting African visual creativity.
            The gallery's digital space introduces visual work and provides a place to learn about the people and ideas behind it.
          </p>

          <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed">
            Our aim is to make African art more visible and give artists a thoughtful space to present their work and connect with interested collectors.
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
            src={galleryInteriorImage}
            alt="Gallery interior reference image"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
      </div>


      {/* Chief Executive Officer */}
      <section
        aria-labelledby="founder-title"
        className="relative overflow-hidden border border-[#B89B62]/35 bg-[#171717] text-[#F7F5F0] shadow-xl"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#B89B62]/10" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#B89B62]/10" />

        <div className="relative grid grid-cols-1 items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col items-center text-center lg:col-span-5">
            <div className="relative mb-7">
              <div className="absolute -inset-3 rounded-full border border-[#B89B62]/45" />
              <div className="absolute -inset-6 rounded-full border border-[#B89B62]/15" />
              <div className="relative h-52 w-52 overflow-hidden rounded-full border-[5px] border-[#B89B62] bg-[#282521] shadow-[0_18px_55px_rgba(0,0,0,0.45)] sm:h-64 sm:w-64">
                <img
                  src="/assets/aistudio/file_000000007ed88211923be0350c1162b0_d5208529.png"
                  alt="Hussein Sadiki Gumbo, CEO of Mrisho Art Gallery"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover object-[center_18%]"
                />
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89B62]">
              {language === 'sw' ? 'Afisa Mtendaji Mkuu' : 'Founder & CEO'}
            </span>
            <p className="mt-2 text-xs tracking-[0.16em] text-[#F7F5F0]/65">
              Mrisho Art Gallery · Arusha, Tanzania
            </p>
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B89B62]">
                <Sparkles className="h-3.5 w-3.5" />
                {language === 'sw' ? 'Uongozi wa Galari' : 'Gallery Leadership'}
              </span>
              <h2 id="founder-title" className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#F7F5F0] sm:text-4xl">
                {language === 'sw' ? 'Afisa Mtendaji Mkuu' : 'Chief Executive Officer'}
              </h2>
              <p className="font-serif text-2xl italic text-[#B89B62] sm:text-3xl">
                Hussein Sadiki Gumbo
              </p>
            </div>

            <div className="flex gap-4 border-l-2 border-[#B89B62] pl-5">
              <Quote className="mt-1 h-6 w-6 shrink-0 text-[#B89B62]/70" />
              <p className="font-serif text-base italic leading-relaxed text-[#F7F5F0]/85 sm:text-lg">
                {language === 'sw'
                  ? '“Kutoka Arusha kuelekea ulimwenguni, tunalenga kuunganisha watu na sanaa ya Kiafrika kupitia ubunifu, urithi na mawasiliano ya moja kwa moja.”'
                  : '“From Arusha to the world, we aim to connect people with African art through creativity, heritage and meaningful conversation.”'}
              </p>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#F7F5F0]/70">
              {language === 'sw'
                ? 'Hussein Sadiki Gumbo anaongoza Mrisho Art Gallery kwa dhamira ya kuwasilisha kazi za sanaa za Kiafrika kwa hadhira ya ndani na ya kimataifa. Galari inajikita katika kuwatambulisha wasanii, kusimulia historia ya kazi zao na kuwapa wakusanyaji njia rahisi ya kuwasiliana kuhusu kazi wanazozipenda.'
                : 'Hussein Sadiki Gumbo leads Mrisho Art Gallery with a commitment to presenting African art to local and international audiences. The gallery focuses on introducing artists, sharing the stories behind their work, and making it easier for collectors to enquire about pieces that inspire them.'}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-xs">
              <span className="inline-flex items-center gap-2 text-[#F7F5F0]/75">
                <MapPin className="h-4 w-4 text-[#B89B62]" />
                Arusha, Tanzania
              </span>
              <span className="inline-flex items-center gap-2 text-[#F7F5F0]/75">
                <Award className="h-4 w-4 text-[#B89B62]" />
                {language === 'sw' ? 'Uongozi wa Galari' : 'Gallery Executive'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery principles */}
      <div className="bg-white border border-[#817C73]/25 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
            Our approach
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            Our Approach to Art & Artists
          </h2>
          <p className="text-xs sm:text-sm text-[#817C73] mt-2">
            We focus on clear artwork information, respect for the artist, careful presentation, and direct communication with people interested in a work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">01</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Artist & Artwork Context</h3>
            <p className="text-[#817C73] leading-relaxed">
              We present the artist, medium, materials, dimensions, and background information when supplied and confirmed.
            </p>
          </div>

          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">02</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Clear Artwork Details</h3>
            <p className="text-[#817C73] leading-relaxed">
              Each listing should give visitors useful details to understand the artwork before making an enquiry.
            </p>
          </div>

          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">03</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Artist Recognition</h3>
            <p className="text-[#817C73] leading-relaxed">
              Artists remain central to the story of every work, with their names and creative practice presented clearly.
            </p>
          </div>

          <div className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-2">
            <span className="font-mono text-base font-bold text-[#B89B62]">04</span>
            <h3 className="font-serif font-bold text-base text-[#171717]">Collector Enquiries</h3>
            <p className="text-[#817C73] leading-relaxed">
              Interested collectors can contact the gallery to discuss availability, pricing, delivery, and artwork details.
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
            <div className="p-5 bg-white border border-[#817C73]/20 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] block">Gallery location</span>
              <h4 className="font-serif font-bold text-base text-[#171717]">Arusha, Tanzania</h4>
              <p>Mrisho Art Gallery</p>
              <div className="pt-2 text-[11px] text-[#171717] font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B89B62]" />
                <span>Arusha, Tanzania</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#817C73]/20 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] block">Online gallery</span>
              <h4 className="font-serif font-bold text-base text-[#171717]">Online Gallery</h4>
              <p>Gallery information and artwork listings.</p>
              
              <div className="pt-2 text-[11px] text-[#171717] font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B89B62]" />
                <span>Online enquiries welcome</span>
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
            Contact form delivery is not configured yet, so this form cannot notify the gallery.
          </p>

          {false ? (
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
                disabled
                className="w-full py-3 opacity-50 cursor-not-allowed bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
              >
                Contact form unavailable
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
