import React from 'react';
import { useApp } from '../../context/AppContext';
import { Box, ShieldCheck, Truck, RefreshCw, CheckCircle2, Clock, Globe } from 'lucide-react';

export const ShippingReturnsView: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 text-center sm:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Logistics Charter & Collector Protection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          {language === 'sw' ? 'Usafirishaji Salama & Sera ya Kurudisha' : 'White-Glove Shipping & Returns'}
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] mt-2 font-sans font-light max-w-2xl">
          Museum-standard transit logistics from our Arusha Pavilion to domestic collectors, regional institutions, and international destinations worldwide.
        </p>
      </div>

      {/* 4 Pillars of Fine Art Transit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="bg-white border border-[#817C73]/25 p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#B89B62]/15 border border-[#B89B62] flex items-center justify-center text-[#B89B62]">
            <Box className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#171717]">
            ISPM-15 Timber Crating
          </h3>
          <p className="text-[#817C73] leading-relaxed">
            All original fine paintings, delicate textiles, and Makonde modernist wood sculptures are secured inside bespoke heat-treated timber crates conforming to international phytosanitary standards.
          </p>
        </div>

        <div className="bg-white border border-[#817C73]/25 p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#B89B62]/15 border border-[#B89B62] flex items-center justify-center text-[#B89B62]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#171717]">
            Comprehensive Transit Insurance
          </h3>
          <p className="text-[#817C73] leading-relaxed">
            Every shipment leaves Arusha with door-to-door fine art coverage. In the unlikely event of transit damage or loss, full restitution or curatorial restoration is immediately provided.
          </p>
        </div>

        <div className="bg-white border border-[#817C73]/25 p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#B89B62]/15 border border-[#B89B62] flex items-center justify-center text-[#B89B62]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#171717]">
            Global Express Delivery
          </h3>
          <p className="text-[#817C73] leading-relaxed">
            Dispatches are processed within 48 to 72 hours of curatorial sign-off. Domestic deliveries arrive within 1–3 business days; international destinations take 3–7 business days via DHL Express.
          </p>
        </div>

        <div className="bg-white border border-[#817C73]/25 p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#B89B62]/15 border border-[#B89B62] flex items-center justify-center text-[#B89B62]">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#171717]">
            14-Day Collector Examination Period
          </h3>
          <p className="text-[#817C73] leading-relaxed">
            Patrons enjoy a 14-calendar-day inspection window upon delivery. If an artwork fails to meet expectations or does not match verified condition reports, we coordinate crated return pickup.
          </p>
        </div>
      </div>

      {/* Detailed Shipping Regulations */}
      <div className="bg-white border border-[#817C73]/25 p-8 space-y-6 text-xs sm:text-sm text-[#171717]/85 font-sans leading-relaxed">
        <h3 className="font-serif text-2xl font-bold text-[#171717]">
          Customs, Tariffs, & Heritage Compliance
        </h3>
        <p>
          Mrisho Art Gallery handles all required Tanzanian cultural export permits, phytosanitary certificates, and export authorizations issued by relevant cultural authorities. All necessary documentation is physically attached to the crate exterior and cryptographically mirrored on the artwork’s blockchain accession deed.
        </p>

        <h3 className="font-serif text-2xl font-bold text-[#171717] pt-4 border-t border-[#817C73]/20">
          Return Protocol & Verification
        </h3>
        <p>
          To initiate an approved return, contact our curatorial office within 14 days of delivery. The artwork must remain in its original delivered condition, with its archival NFC tag, wax-sealed physical Certificate of Authenticity, and original ISPM-15 crating intact.
        </p>
      </div>
    </div>
  );
};
