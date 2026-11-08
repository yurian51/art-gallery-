import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#817C73]/20 pb-8 text-center sm:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Institutional Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          {language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy'}
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] mt-2 font-sans font-light">
          Effective: January 2026 · Mrisho Art Gallery Ltd., Arusha, Tanzania · Powered by ALTAVOX TECH
        </p>
      </div>

      <div className="bg-white border border-[#817C73]/25 p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-[#171717]/85 font-sans leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            1. Institutional Commitment & Data Stewardship
          </h2>
          <p>
            Mrisho Art Gallery ("the Gallery", "we", "us"), headquartered in Arusha, Tanzania, and its technology engineering partner ALTAVOX TECH, respect the privacy and anonymity preferences of art collectors, living master artists, and institutional patrons. We collect only information essential to authenticating artwork ownership, arranging secure logistics, and maintaining verified ledger records.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            2. Information Collected
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-[#817C73]">
            <li>Contact details provided during inquiries, acquisitions, and commissions (name, email, phone).</li>
            <li>Delivery and customs documentation addresses for ISPM-15 white-glove crated shipping.</li>
            <li>Cryptographic public wallet addresses or institutional escrow identifiers for blockchain accession deeds.</li>
            <li>Transactional records and order references (raw payment card details are never stored on gallery servers).</li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            3. Blockchain Ledger Transparency
          </h2>
          <p>
            When an acquisition is finalized, the deed transfer is inscribed onto our private African Art Consortium ledger. While the physical certificate and transaction hash are permanent and immutable, personal collector identities are encrypted to protect patron anonymity and private estate security.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            4. Technology & Infrastructure Partner
          </h2>
          <p>
            The digital platform and database architecture are designed, engineered, and maintained by ALTAVOX TECH under strict data protection protocols, industry-standard SSL encryption, and server-side authorization checks.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#817C73]/15 pt-4">
          <h2 className="font-serif text-xl font-bold text-[#171717]">
            5. Enquiries & Data Rights
          </h2>
          <p>
            To review, update, or request the deletion of your account records, please contact our data governance officer at privacy@mrishoartgallery.com or visit our main pavilion in Arusha, Tanzania.
          </p>
        </section>
      </div>
    </div>
  );
};
