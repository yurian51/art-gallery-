import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShoppingBag, Info } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { language, cart } = useApp();
  if (!isOpen) return null;
  const sw = language === 'sw';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="presentation" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={event => event.stopPropagation()} className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-[#B89B62]/40 bg-[#F7F5F0] p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={onClose} aria-label={sw ? 'Funga' : 'Close'} className="absolute right-5 top-5 p-2 text-[#817C73] hover:text-[#171717]"><X className="h-5 w-5" /></button>
        <div className="mb-6 flex items-center gap-3 border-b border-[#817C73]/20 pb-5">
          <span className="flex h-11 w-11 items-center justify-center border border-[#B89B62]/50 bg-white"><ShoppingBag className="h-5 w-5 text-[#B89B62]" /></span>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89B62]">{sw ? 'Ombi la ununuzi' : 'Acquisition enquiry'}</p><h2 id="checkout-title" className="font-serif text-2xl font-semibold text-[#171717]">{sw ? 'Kazi ulizochagua' : 'Your selected artworks'}</h2></div>
        </div>
        <div className="mb-6 space-y-3">
          {cart.length === 0 ? <p className="text-sm text-[#817C73]">{sw ? 'Hujachagua kazi yoyote ya sanaa.' : 'Your selection is currently empty.'}</p> : cart.map(item => <div key={item.artwork.id} className="flex items-start justify-between gap-4 border-b border-[#817C73]/15 pb-3"><div><p className="font-serif text-lg text-[#171717]">{item.artwork.title}</p><p className="text-xs text-[#817C73]">{item.artwork.artistName}</p></div><span className="text-[10px] uppercase tracking-wider text-[#817C73]">{sw ? 'Imehifadhiwa hapa' : 'Saved locally'}</span></div>)}
        </div>
        <div className="border border-[#B89B62]/40 bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-[#9A7B43]"><Info className="h-4 w-4" /><p className="text-xs font-semibold uppercase tracking-wider">{sw ? 'Malipo ya mtandaoni hayajaunganishwa' : 'Online payment is not connected'}</p></div>
          <p className="text-sm leading-relaxed text-[#817C73]">{sw ? 'Hakuna malipo yatakayochukuliwa na hakuna oda itakayoundwa. Orodha yako imehifadhiwa kwenye kifaa hiki pekee. Huduma za malipo na mawasiliano lazima ziunganishwe kabla ya ununuzi kukamilika.' : 'No payment will be collected and no order will be created. Your selection is stored on this device only. Payment and gallery contact services must be connected before an acquisition can be completed.'}</p>
        </div>
        <button type="button" onClick={onClose} className="mt-6 w-full bg-[#171717] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] hover:bg-[#B89B62] hover:text-[#171717]">{sw ? 'Rudi kwenye galari' : 'Return to gallery'}</button>
      </section>
    </div>
  );
};
