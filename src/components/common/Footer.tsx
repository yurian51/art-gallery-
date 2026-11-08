import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const sw = language === 'sw';
  const links = [
    { label: sw ? 'Kazi za sanaa' : 'Artworks', route: '/gallery' },
    { label: sw ? 'Wasanii' : 'Artists', route: '/artists' },
    { label: sw ? 'Maonesho' : 'Exhibitions', route: '/exhibitions' },
    { label: sw ? 'Sanaa maalum' : 'Commissions', route: '/commissions' },
    { label: sw ? 'Jarida' : 'Journal', route: '/journal' },
    { label: sw ? 'Kuhusu galari' : 'About the gallery', route: '/about' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#171717] pb-8 pt-16 text-[#F7F5F0]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <button onClick={() => navigateTo('/')} className="text-left">
              <span className="block font-serif text-3xl font-semibold tracking-[0.08em] text-white">MRISHO</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.34em] text-[#D7B873]">Art Gallery</span>
            </button>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">{sw ? 'Galari ya sanaa iliyopo Arusha, Tanzania, inayowasilisha sanaa na mitazamo ya wabunifu wa Afrika.' : 'An art gallery based in Arusha, Tanzania, presenting art and creative perspectives from Africa.'}</p>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7B873]">Art Beyond Boundaries · Sanaa Bila Mipaka</p>
          </div>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D7B873]">{sw ? 'Chunguza' : 'Explore'}</h2>
            <ul className="mt-5 space-y-3">
              {links.map(link => <li key={link.route}><button onClick={() => navigateTo(link.route)} className="text-sm text-white/60 transition-colors hover:text-white">{link.label}</button></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D7B873]">{sw ? 'Wasiliana nasi' : 'Contact the gallery'}</h2>
            <div className="mt-5 space-y-4 text-sm text-white/60">
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D7B873]" /><span>Arusha, Tanzania</span></p>
              <p className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D7B873]" /><span><a href="tel:+255639827831" className="hover:text-white">+255 639 827 831</a><br /><a href="tel:+255782400311" className="hover:text-white">+255 782 400 311</a></span></p>
              <p className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D7B873]" /><a href="mailto:mrishoartist@gmail.com" className="hover:text-white">mrishoartist@gmail.com</a></p>
            </div>
            <button onClick={() => navigateTo('/commissions')} className="mt-7 inline-flex items-center gap-2 border-b border-[#D7B873] pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D7B873] hover:text-white">{sw ? 'Tuma maulizo' : 'Make an enquiry'} <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mrisho Art Gallery. {sw ? 'Haki zote zimehifadhiwa.' : 'All rights reserved.'}</span>
          <span>{sw ? 'Ipo Arusha, Tanzania' : 'Based in Arusha, Tanzania'}</span>
        </div>
        <div className="mt-6 flex flex-col gap-1 border-t border-white/10 pt-4 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Digital platform by <strong className="font-semibold tracking-wide text-[#D7B873]">ALTAVOX TECH</strong></span>
          <span>Designed and maintained by ALTAVOX TECH</span>
        </div>
      </div>
    </footer>
  );
};
