import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, ChevronUp, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqItem {
  q: string;
  qSw: string;
  a: string;
  aSw: string;
  category: string;
}

export const FaqView: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'How does Mrisho Art Gallery verify the authenticity of original artworks?',
      qSw: 'Je, Mrisho Art Gallery inathibitishaje uhalisi wa kazi asilia za sanaa?',
      a: 'Every artwork physically accessioned into our gallery in Arusha undergoes material spectroscopy (verifying pigments, natural binders, and wood species like Tanzanian Mpingo). Upon curation approval, a tamper-proof cryptographic token is minted on our private consortium ledger, and a physical wax-sealed Certificate of Authenticity signed by the artist and Founder & CEO Hussein Sadiki Gumbo accompanies the piece.',
      aSw: 'Kila kazi ya sanaa inayopokelewa kwenye jumba letu jijini Arusha inapimwa uhalisi wa nyenzo (rangi asilia na mbao za Mpingo). Baada ya kupitishwa, cheti cha kidijitali cha blockchain kinatolewa pamoja na Cheti halisi cha Uhalisi kilichotiwa lakiri na saini ya msanii na Mwanzilishi Hussein Sadiki Gumbo.',
      category: 'Authenticity & Provenance',
    },
    {
      q: 'Where is Mrisho Art Gallery located?',
      qSw: 'Mrisho Art Gallery inapatikana wapi?',
      a: 'Mrisho Art Gallery is headquartered in Arusha, Tanzania, serving patrons and institutions across Tanzania, East Africa, and internationally. Private viewing salon appointments are arranged directly through our curatorial advisory.',
      aSw: 'Mrisho Art Gallery ina makao yake makuu jijini Arusha, Tanzania, ikihudumia wapenzi wa sanaa na taasisi nchini, Afrika Mashariki na duniani kote.',
      category: 'Gallery & Location',
    },
    {
      q: 'How does international shipping and crating work?',
      qSw: 'Usafirishaji wa kimataifa na ufungashaji unafanyikaje?',
      a: 'All original paintings and sculptures are packed in ISPM-15 heat-treated museum-grade timber crates, lined with shock-absorbent archival foam and climate-sealed barrier foil against humidity. Shipments are handled via DHL Express International with full transit insurance and tracking.',
      aSw: 'Michoro na sanamu zote hufungwa kwenye masanduku maalum ya mbao yaliyothibitishwa kimataifa (ISPM-15), yakizuia unyevu na mshtuko, na kusafirishwa kwa usalama na bima kamili kupitia DHL Express.',
      category: 'Shipping & Logistics',
    },
    {
      q: 'Can I commission a bespoke artwork from a featured master artist?',
      qSw: 'Je, ninaweza kuagiza kazi maalum ya sanaa kutoka kwa msanii mahiri?',
      a: 'Yes. Our bespoke commission portal allows collectors, architects, and corporate clients to submit custom dimensions, mediums, and themes. Our curatorial board pairs you with accredited artists, provides transparent milestone pricing, and tracks production until crated delivery.',
      aSw: 'Ndiyo. Mlango wetu wa maagizo maalum (Commissions) unaruhusu wateja kueleza vipimo, maudhui na nyenzo wanazotaka. Bodi yetu ya uratibu inakuunganisha na msanii na kusimamia hatua zote hadi kukamilika.',
      category: 'Commissions',
    },
    {
      q: 'What payment methods are supported for art acquisitions?',
      qSw: 'Ni njia zipi za malipo zinazokubalika?',
      a: 'Within Tanzania and East Africa, we accept all primary mobile money providers including M-Pesa, Airtel Money, Mixx by Yas, and HaloPesa. For international clients, we support secure card processing and direct international bank wire transfers (SWIFT).',
      aSw: 'Ndani ya Tanzania tunapokea mitandao ya simu (M-Pesa, Airtel Money, Mixx by Yas, HaloPesa), na kwa wateja wa kimataifa tunapokea kadi za benki na uhamisho wa kibenki (SWIFT).',
      category: 'Payments & Currencies',
    },
    {
      q: 'How can living African artists apply for gallery representation?',
      qSw: 'Wasanii wa Kiafrika wanawezaje kutuma maombi ya kuwakilishwa na galari?',
      a: 'Professional and emerging fine artists can submit their portfolios through our Artist Portal. Submissions are reviewed bi-weekly by the curatorial board under strict criteria of material authenticity, thematic depth, and cultural provenance.',
      aSw: 'Wasanii wanaweza kuwasilisha wasifu na picha za kazi zao kupitia Tovuti ya Wasanii (Artist Portal). Maombi yanakaguliwa kila wiki mbili na bodi ya uratibu.',
      category: 'Artist Submissions',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#817C73]/20 pb-8 text-center sm:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Collector & Artist Assistance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          {language === 'sw' ? 'Maswali Yanayoulizwa Mara kwa Mara' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] mt-2 font-sans font-light max-w-2xl">
          Everything you need to know about acquisitions, blockchain provenance, white-glove shipping from Arusha, and custom commissions.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border transition-all ${
                isOpen ? 'bg-white border-[#B89B62] shadow-sm' : 'bg-[#F7F5F0] border-[#817C73]/20 hover:border-[#171717]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B89B62] tracking-wider block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#171717]">
                    {language === 'sw' ? faq.qSw : faq.q}
                  </h3>
                </div>
                <div className="shrink-0 text-[#B89B62]">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#817C73] leading-relaxed border-t border-[#817C73]/15">
                  <p>{language === 'sw' ? faq.aSw : faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Advisory Callout */}
      <div className="bg-white border border-[#817C73]/25 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-serif font-bold text-lg text-[#171717]">
            {language === 'sw' ? 'Una swali maalum ambalo halijajibiwa hapa?' : 'Have a specific acquisition inquiry?'}
          </h4>
          <p className="text-xs text-[#817C73] mt-1">
            Our directors in Arusha are available for one-on-one curatorial advisory.
          </p>
        </div>
        <button
          onClick={() => navigateTo('/contact')}
          className="px-6 py-3 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all whitespace-nowrap"
        >
          {language === 'sw' ? 'Wasiliana Nasi' : 'Contact Curatorial Board'}
        </button>
      </div>
    </div>
  );
};
