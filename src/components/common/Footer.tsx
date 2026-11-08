import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-[#171717] text-[#F7F5F0] pt-16 pb-12 border-t border-[#817C73]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#817C73]/20">
          {/* Col 1 & 2: Gallery Identity & Curatorial Charter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center px-1 py-1">
              <img
                src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
                alt="Mrisho Art Gallery — Art Beyond Boundaries"
                className="h-16 w-auto object-contain [mix-blend-mode:screen]"
              />
            </div>

            <p className="text-xs text-[#817C73] leading-relaxed max-w-md">
              An independent art gallery based in Arusha, Tanzania, sharing visual work and connecting artists with interested collectors.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#B89B62]">
              <MapPin className="w-4 h-4 text-[#B89B62]" />
              <span className="font-mono text-[11px]">Arusha, Tanzania · Art Beyond Boundaries</span>
            </div>
          </div>

          {/* Col 3: Gallery Location */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#F7F5F0] uppercase">
              Find the Gallery
            </h4>
            <div className="space-y-3 text-xs text-[#817C73]">
              <div>
                <p className="text-[#F7F5F0] font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B62]" />
                  Arusha, Tanzania
                </p>
                <p className="mt-0.5">Contact us to arrange a visit.</p>
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

          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#F7F5F0] uppercase">Gallery updates</h4>
            <p className="text-xs leading-relaxed text-[#817C73]">Newsletter registration will be available when the gallery mailing service is connected.</p>
          </div>
        </div>

        {/* Bottom Operational Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817C73]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Mrisho Art Gallery</span>
            <span>·</span>
            <span>All Rights Reserved</span>
            <span>·</span>
            <span className="font-serif italic text-[#B89B62]">Sanaa Bila Mipaka</span>
          </div>

          <div className="text-[11px]">Arusha, Tanzania</div>>
        </div>
      </div>
    </footer>
  );
};
