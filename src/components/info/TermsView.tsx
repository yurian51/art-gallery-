import React from 'react';
import { useApp } from '../../context/AppContext';

export const TermsView: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#817C73]/20 pb-8 text-center sm:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Marketplace & Legal Framework
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          {language === 'sw' ? 'Vigezo na Masharti ya Huduma' : 'Terms of Service'}
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] mt-2 font-sans font-light">
          Mrisho Art Gallery Ltd. · Arusha, Tanzania · Technology by ALTAVOX TECH
        </p>
      </div>

      <div className="bg-white border border-[#817C73]/25 p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-[#171717]/85 font-sans leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            1. Institutional Framework
          </h2>
          <p>
            These terms govern acquisitions, salon attendance, private commissions, and artist submissions facilitated through Mrisho Art Gallery, operating in Arusha, Tanzania, and its digital marketplace engineered by ALTAVOX TECH. By engaging our platform, patrons and creators agree to these covenants.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            2. Authenticity Guarantee & Transfer of Title
          </h2>
          <p>
            Title to any acquired artwork transfers to the purchaser only upon complete settlement of the invoice price and execution of the blockchain deed of accession. All original pieces are guaranteed authentic for the lifetime of the work, backed by our wax-sealed certificate and laboratory chemical spectroscopy verification in Arusha.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            3. Resale Royalty & Artist Rights
          </h2>
          <p>
            In alignment with the East African Sovereign Arts Charter, our private smart escrow reserves a perpetual 5% royalty for living master artists on verified secondary market transfers recorded on the PAAC ledger. Artists retain all copyright and reproduction rights to their creations unless explicitly assigned in writing.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            4. Bespoke Commissions
          </h2>
          <p>
            Commissions require an upfront 40% non-refundable deposit upon brief and dimension approval by the curatorial board. Milestone studio previews will be shared digitally. Final balance plus shipping must be satisfied prior to timber crating and dispatch from Arusha.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            5. Jurisdiction & Governance
          </h2>
          <p>
            All agreements are governed by the commercial laws of the United Republic of Tanzania, with primary dispute arbitration seated in Arusha, Tanzania.
          </p>
        </section>
      </div>
    </div>
  );
};
