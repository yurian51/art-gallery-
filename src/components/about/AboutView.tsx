import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Clock, Mail, Phone, Check, Award, Compass, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();
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
            Rooted in East African Heritage, Connected to Global Collectors
          </h2>

          <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed">
            Established on the Oysterbay Peninsula overlooking the Indian Ocean in Dar es Salaam,
            Mrisho Art Gallery was founded with a singular conviction: that East African visual art,
            Makonde sculpture, coastal textiles, and figurative contemporary masters belong in the
            forefront of international cultural dialogues and institutional collections.
          </p>

          <p className="text-xs sm:text-sm text-[#817C73] leading-relaxed">
            For generations, the artistic legacy of Bagamoyo, Zanzibar, and the Makonde highlands
            has influenced world modernism. Our mission is to provide these creators with sovereign
            accreditation, fair primary market valuation, and transparent digital provenance.
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
            alt="Interior of Mrisho Art Gallery, Dar es Salaam Pavilion"
            className="w-full h-80 sm:h-96 object-cover"
          />
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
              by our senior conservator in Dar es Salaam.
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
            <div className="p-5 bg-white border border-[#817C73]/20 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] block">Main Pavilion & Sculpture Gardens</span>
              <h4 className="font-serif font-bold text-base text-[#171717]">Dar es Salaam</h4>
              <p>Plot 44, Toure Drive, Oysterbay Peninsula</p>
              <p>Dar es Salaam, Tanzania</p>
              <div className="pt-2 text-[11px] text-[#171717] font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B89B62]" />
                <span>Mon – Sat: 10:00 – 19:00 EAT</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#817C73]/20 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] block">Textile & Portrait Atelier</span>
              <h4 className="font-serif font-bold text-base text-[#171717]">Stone Town, Zanzibar</h4>
              <p>Shangani Street, Near Old Customs House</p>
              <p>Zanzibar, Tanzania</p>
              <div className="pt-2 text-[11px] text-[#171717] font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B89B62]" />
                <span>Tue – Sun: 11:00 – 18:00 EAT</span>
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
