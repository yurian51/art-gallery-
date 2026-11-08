import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, FileText } from 'lucide-react';

export const ProvenanceModal: React.FC = () => {
  const { inspectedProvenance, setInspectedProvenance } = useApp();
  if (!inspectedProvenance) return null;

  const { provenance, title, artistName, creationYear, medium, origin, dimensions } = inspectedProvenance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="record-title" className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#B89B62]/40 bg-[#F7F5F0] p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={() => setInspectedProvenance(null)} aria-label="Close artwork documentation" className="absolute right-5 top-5 p-2 text-[#817C73] hover:text-[#171717]">
          <X className="h-5 w-5" />
        </button>
        <div className="mb-6 flex items-center gap-3 border-b border-[#817C73]/20 pb-5">
          <span className="flex h-11 w-11 items-center justify-center border border-[#B89B62]/50 bg-white"><FileText className="h-5 w-5 text-[#B89B62]" /></span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89B62]">Artwork documentation</p>
            <h2 id="record-title" className="font-serif text-2xl font-semibold text-[#171717]">{title}</h2>
          </div>
        </div>
        <div className="mb-6 flex gap-3 border border-amber-300/70 bg-amber-50 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Independent verification is unavailable</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-900/80">No live registry or certificate service is connected. This page is not proof of authenticity, ownership, or provenance.</p>
          </div>
        </div>
        <dl className="grid grid-cols-1 gap-4 border border-[#817C73]/20 bg-white p-5 text-sm sm:grid-cols-2">
          <div><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Artist</dt><dd className="mt-1 text-[#171717]">{artistName || 'Not provided'}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Year</dt><dd className="mt-1 text-[#171717]">{creationYear || 'Not provided'}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Medium</dt><dd className="mt-1 text-[#171717]">{medium || 'Not provided'}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Origin</dt><dd className="mt-1 text-[#171717]">{origin || 'Not provided'}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Dimensions</dt><dd className="mt-1 text-[#171717]">{dimensions.heightCm} × {dimensions.widthCm} cm{dimensions.depthCm ? ` × ${dimensions.depthCm} cm` : ''}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Documentation status</dt><dd className="mt-1 text-[#171717]">{provenance.isAuthentic ? 'Requires independent confirmation' : 'Not verified'}</dd></div>
          <div className="sm:col-span-2"><dt className="text-[10px] uppercase tracking-wider text-[#817C73]">Registry</dt><dd className="mt-1 text-[#171717]">{provenance.network}</dd></div>
        </dl>
        <button type="button" onClick={() => setInspectedProvenance(null)} className="mt-6 w-full bg-[#171717] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] hover:bg-[#B89B62] hover:text-[#171717]">Close</button>
      </section>
    </div>
  );
};
