import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { ShieldCheck, Mail, MapPin, Clock, Phone, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[language];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#171717] text-[#F7F5F0] pt-16 pb-12 border-t border-[#817C73]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#817C73]/20">
          {/* Col 1 & 2: Gallery Identity & Curatorial Charter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 px-4 py-2 border border-[#B89B62]/40 shadow-sm inline-block">
              <img
                src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
                alt="Mrisho Art Gallery — Art Beyond Boundaries"
                className="h-16 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-[#817C73] leading-relaxed max-w-md">
              A premier African contemporary art institution celebrating sovereign artistic expression,
              curating masterworks, and pioneering immutable blockchain provenance for international collectors,
              institutions, and private estates.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#B89B62]">
              <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
              <span className="font-mono text-[11px]">
                Consortium Blockchain Node: PAAC-DAR-01
              </span>
            </div>
          </div>

          {/* Col 3: Gallery Salons & Visit */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#F7F5F0] uppercase">
              Galleries & Salons
            </h4>
            <div className="space-y-3 text-xs text-[#817C73]">
              <div>
                <p className="text-[#F7F5F0] font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B62]" />
                  Dar es Salaam Pavilion
                </p>
                <p className="mt-0.5">Plot 44, Toure Drive, Oysterbay</p>
                <p>Dar es Salaam, Tanzania</p>
              </div>
              <div>
                <p className="text-[#F7F5F0] font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B62]" />
                  Zanzibar Atelier
                </p>
                <p className="mt-0.5">Shangani St, Stone Town</p>
                <p>Zanzibar, Tanzania</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] pt-1 text-[#817C73]">
                <Clock className="w-3 h-3 text-[#B89B62]" />
                <span>Mon – Sat: 10:00 – 19:00 EAT</span>
              </div>
            </div>
          </div>

          {/* Col 4: Curation & Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#F7F5F0] uppercase">
              Curatorial Index
            </h4>
            <ul className="space-y-2 text-xs text-[#817C73]">
              <li>
                <button
                  onClick={() => navigateTo('/gallery')}
                  className="hover:text-[#F7F5F0] transition-colors"
                >
                  All Artworks & Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/artists')}
                  className="hover:text-[#F7F5F0] transition-colors"
                >
                  Master Artists Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/exhibitions')}
                  className="hover:text-[#F7F5F0] transition-colors"
                >
                  Salons & Exhibitions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/commissions')}
                  className="hover:text-[#F7F5F0] transition-colors"
                >
                  Custom Art Commissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/journal')}
                  className="hover:text-[#F7F5F0] transition-colors"
                >
                  Art Journal & Critical Essays
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-[#F7F5F0] transition-colors"
                >
                  Provenance & Conservation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Private Collector Gazette Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#F7F5F0] uppercase">
              Collector Gazette
            </h4>
            <p className="text-xs text-[#817C73] leading-relaxed">
              Receive private catalog previews, curatorial essays, and invitations to international salons.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="collector@domain.com"
                  required
                  className="w-full bg-[#171717] border border-[#817C73]/40 px-3 py-2 text-xs text-[#F7F5F0] placeholder:text-[#817C73]/60 focus:outline-none focus:border-[#B89B62]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#B89B62] text-[#171717] py-2 text-xs font-semibold hover:bg-[#B89B62]/90 transition-colors flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed to Gazette</span>
                  </>
                ) : (
                  <>
                    <span>Request Subscription</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Operational Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817C73]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Mrisho Art Gallery Ltd.</span>
            <span>·</span>
            <span>All Rights Reserved</span>
            <span>·</span>
            <span className="font-serif italic text-[#B89B62]">Sanaa Bila Mipaka</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button onClick={() => navigateTo('/about')} className="hover:text-[#F7F5F0]">
              Provenance Protocol
            </button>
            <button onClick={() => navigateTo('/about')} className="hover:text-[#F7F5F0]">
              White-Glove Shipping
            </button>
            <button onClick={() => navigateTo('/about')} className="hover:text-[#F7F5F0]">
              Institutional Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
