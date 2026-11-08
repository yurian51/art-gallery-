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

        {viewMode === 'LEDGER' ? (
          <div className="pt-6 space-y-6">
            {/* Top Cryptographic Specs Card */}
            <div className="bg-white border border-[#817C73]/20 p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#817C73] block mb-0.5">
                    Certificate Number
                  </span>
                  <span className="font-mono font-medium text-[#171717]">
                    {provenance.certificateNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#817C73] block mb-0.5">
                    Token ID / Consensus Registry
                  </span>
                  <span className="font-mono font-medium text-[#171717]">
                    #{provenance.tokenId} · {provenance.network}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#817C73] block mb-0.5">
                    Smart Contract Address
                  </span>
                  <span className="font-mono text-[11px] text-[#171717] truncate block" title={provenance.contractAddress}>
                    {provenance.contractAddress.slice(0, 10)}...{provenance.contractAddress.slice(-8)}
                  </span>
                </div>
              </div>

              {/* Master Cryptographic Verification Hash */}
              <div className="mt-4 pt-3 border-t border-[#817C73]/15">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase text-[#817C73]">
                    SHA-256 Provenance Fingerprint
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="flex items-center gap-1 text-[11px] text-[#B89B62] hover:text-[#171717] transition-colors"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-[11px] sm:text-xs bg-[#F7F5F0] p-2.5 border border-[#817C73]/20 text-[#171717] break-all">
                  {provenance.verificationHash}
                </div>
              </div>
            </div>

            {/* Chronological Immutable Blocks Timeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base text-[#171717]">
                  Chain of Custody & Historical Blocks ({provenance.blocks.length})
                </h3>
                <span className="text-xs text-[#817C73] font-mono">
                  State: VERIFIED_IMMUTABLE
                </span>
              </div>

              <div className="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-[1px] before:bg-[#817C73]/30">
                {provenance.blocks.map((block) => (
                  <div
                    key={block.blockIndex}
                    className="relative pl-10 group"
                  >
                    {/* Block Marker */}
                    <div className="absolute left-2.5 top-3 w-3 h-3 rounded-full bg-[#B89B62] border-2 border-[#F7F5F0] -translate-x-1/2" />

                    <div className="bg-white border border-[#817C73]/20 p-4 hover:border-[#B89B62] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#171717]">
                            BLOCK #{block.blockIndex}
                          </span>
                          <span className="text-[#817C73] text-xs">·</span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#B89B62]">
                            {block.eventType.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#817C73]">
                          {new Date(block.timestamp).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <p className="text-xs text-[#171717] font-medium mb-1">
                        {block.actor} <span className="text-[#817C73] font-normal">({block.role})</span>
                      </p>
                      <p className="text-xs text-[#817C73] mb-2">
                        {block.notes}
                      </p>
                      <div className="text-[10px] text-[#817C73] flex items-center justify-between pt-2 border-t border-[#817C73]/10">
                        <span className="truncate max-w-[280px]">
                          Tx: <span className="font-mono">{block.transactionHash.slice(0, 20)}...</span>
                        </span>
                        <span className="italic">{block.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Official Museum Certificate of Authenticity View */
          <div className="pt-6">
            <div
              id="printable-certificate"
              className="bg-[#FFFDF9] border-2 border-[#B89B62] p-8 sm:p-10 relative shadow-inner text-[#171717]"
            >
              {/* Ornate corner motifs */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#B89B62]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#B89B62]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#B89B62]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#B89B62]" />

              <div className="text-center mb-6">
                <img
                  src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
                  alt="Mrisho Art Gallery Official Insignia"
                  className="h-20 w-auto mx-auto object-contain mb-3"
                />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#817C73] block">
                  MRISHO ART GALLERY · DAR ES SALAAM
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                  Certificate of Authenticity
                </h3>
                <p className="font-serif italic text-xs text-[#817C73] mt-0.5">
                  Official Cryptographic Accession Deed & Provenance Warranty
                </p>
              </div>

              <div className="max-w-xl mx-auto space-y-4 text-xs text-[#171717]">
                <p className="text-center text-sm font-serif leading-relaxed">
                  This document certifies that the artwork cataloged below is an authentic, original creation
                  by the acknowledged master artist, registered under the permanent ledger of Mrisho Art Gallery.
                </p>

                <div className="bg-[#F7F5F0] p-4 border border-[#817C73]/20 space-y-2">
                  <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                    <span className="text-[#817C73]">Title of Masterwork:</span>
                    <span className="font-serif font-bold text-sm text-[#171717]">{title}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                    <span className="text-[#817C73]">Master Artist:</span>
                    <span className="font-bold">{artistName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                    <span className="text-[#817C73]">Medium & Technique:</span>
                    <span className="italic">{medium}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                    <span className="text-[#817C73]">Dimensions:</span>
                    <span>{dimensions.heightCm} × {dimensions.widthCm} cm {dimensions.depthCm ? `× ${dimensions.depthCm} cm` : ''}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                    <span className="text-[#817C73]">Creation Year & Origin:</span>
                    <span>{creationYear} · {origin}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#817C73]">Certificate Deed No:</span>
                    <span className="font-mono font-bold text-[#B89B62]">{provenance.certificateNumber}</span>
                  </div>
                </div>

                {/* Wax seal & Signatures */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Wax Seal Graphic */}
                  <div className="w-20 h-20 rounded-full border-2 border-[#B89B62] bg-[#B89B62]/15 flex flex-col items-center justify-center p-2 text-center shrink-0">
                    <span className="font-serif text-[9px] uppercase tracking-wider font-bold text-[#171717]">MRISHO</span>
                    <span className="font-serif text-lg font-bold text-[#B89B62] leading-none">SEAL</span>
                    <span className="text-[7px] text-[#817C73] uppercase tracking-tighter">VERIFIED</span>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="border-b border-[#171717] w-48 ml-auto pb-1">
                      <span className="font-serif italic text-base text-[#171717]">Hussein Sadiki Gumbo</span>
                    </div>
                    <p className="text-[10px] text-[#817C73]">
                      Founder & CEO · Mrisho Art Gallery, Arusha
                    </p>
                    <p className="font-mono text-[9px] text-[#817C73]">
                      Ledger Block Hash: {provenance.verificationHash.slice(0, 24)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 border border-[#171717] text-xs font-medium text-[#171717] hover:bg-[#171717] hover:text-[#F7F5F0] transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>
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
