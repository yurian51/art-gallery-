import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../services/currencyService';
import { ArtCategory, Artwork } from '../../types';
import {
  Palette,
  PlusCircle,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Send,
  Eye,
} from 'lucide-react';

export const ArtistDashboard: React.FC = () => {
  const {
    currency,
    artworks,
    artists,
    commissions,
    submitArtwork,
    setInspectedArtwork,
    setInspectedProvenance,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SUBMIT' | 'CATALOG' | 'COMMISSIONS'>('OVERVIEW');

  // Submit Artwork Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArtCategory>('Paintings');
  const [medium, setMedium] = useState('Natural Earth Pigments & Gold Leaf on Linen');
  const [materials, setMaterials] = useState('Ground ochre, gum arabic, pure gold leaf, master stretcher bars');
  const [heightCm, setHeightCm] = useState(140);
  const [widthCm, setWidthCm] = useState(120);
  const [depthCm, setDepthCm] = useState(5);
  const [creationYear, setCreationYear] = useState(2026);
  const [origin, setOrigin] = useState('Bagamoyo Atelier, Tanzania');
  const [priceTzs, setPriceTzs] = useState(11500000);
  const [classification, setClassification] = useState<'ORIGINAL' | 'LIMITED_EDITION'>('ORIGINAL');
  const [description, setDescription] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Active Artist (Mwl. Juma Mwinyi as primary persona)
  const activeArtist = artists[0];
  const artistArtworks = activeArtist ? artworks.filter(a => a.artistId === activeArtist.id || a.artistName === activeArtist.name) : [];
  const pendingArtworks = artworks.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW');

  const handleArtworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitArtwork({
      title,
      artistId: activeArtist?.id ?? '',
      artistName: activeArtist?.name ?? '',
      artistOrigin: origin,
      category,
      medium,
      materials,
      dimensions: { heightCm: Number(heightCm), widthCm: Number(widthCm), depthCm: Number(depthCm) },
      creationYear: Number(creationYear),
      origin,
      priceTzs: Number(priceTzs),
      classification,
      description,
      images: [],
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('CATALOG');
      setTitle('');
      setDescription('');
    }, 2000);
  };

  if (!activeArtist) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="border border-[#817C73]/20 bg-white p-8 sm:p-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89B62]">Artist workspace</p>
          <h1 className="mt-2 font-serif text-3xl text-[#171717] sm:text-4xl">Artist portal</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#817C73]">No artist account is connected. Secure sign-in and server-side artist permissions are not configured, so this workspace is a visual preview only.</p>
        </section>
      </main>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold">
                Artist workspace preview
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Atelier Management: {activeArtist.name}
            </h1>
            <p className="text-xs text-[#817C73] mt-1">
              No artist account connected · Preview data only
            </p>
          </div>

          <button
            onClick={() => setActiveTab('SUBMIT')}
            className="px-4 py-2 bg-[#171717] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit New Masterwork</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1">
          {[
            { id: 'OVERVIEW', label: 'Studio Overview' },
            { id: 'SUBMIT', label: 'Submit Artwork' },
            { id: 'CATALOG', label: `My Artworks (${artistArtworks.length})` },
            { id: 'COMMISSIONS', label: `Commission Requests (${commissions.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#171717] text-[#F7F5F0]'
                  : 'bg-white text-[#817C73] border border-[#817C73]/20 hover:text-[#171717]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Cataloged Artworks</span>
              <span className="font-serif text-3xl font-bold text-[#171717]">{artistArtworks.length}</span>
              <span className="text-[11px] text-emerald-700 block mt-1">All Authenticated</span>
            </div>

            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Total Valuation in Gallery</span>
              <span className="font-mono text-xl font-bold text-[#171717] tabular-nums">
                {formatPrice(
                  artistArtworks.reduce((acc, a) => acc + a.priceTzs, 0),
                  currency
                )}
              </span>
              <span className="text-[11px] text-[#817C73] block mt-1">Insured & Crated</span>
            </div>

            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Artist Royalty Share</span>
              <span className="font-serif text-3xl font-bold text-[#B89B62]">70%</span>
              <span className="text-[11px] text-[#817C73] block mt-1">Direct Escrow Settlement</span>
            </div>

            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Active Commissions</span>
              <span className="font-serif text-3xl font-bold text-[#171717]">2</span>
              <span className="text-[11px] text-[#B89B62] block mt-1">In Studio Production</span>
            </div>
          </div>

          {/* Recent Submissions Status */}
          <div className="bg-white border border-[#817C73]/25 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#171717]">
              Current Registry Status & Submissions
            </h3>

            <div className="divide-y divide-[#817C73]/15">
              {artistArtworks.map(art => (
                <div key={art.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={art.images[0]} alt={art.title} className="w-16 h-16 object-cover border border-[#817C73]/20" />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#171717]">{art.title}</h4>
                      <p className="text-xs text-[#817C73]">{art.medium} · {art.creationYear}</p>
                      <span className="font-mono text-[10px] text-[#B89B62]">
                        Deed #{art.provenance.certificateNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <span className="font-mono font-bold text-sm text-[#171717]">
                      {formatPrice(art.priceTzs, currency)}
                    </span>

                    <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      art.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : art.status === 'SOLD'
                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {art.status}
                    </span>

                    <button
                      onClick={() => setInspectedProvenance(art)}
                      className="p-1.5 text-[#817C73] hover:text-[#B89B62] transition-colors"
                      title="Inspect blockchain deed"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Submit Artwork */}
      {activeTab === 'SUBMIT' && (
        <div className="bg-white border border-[#817C73]/25 p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
          <div className="border-b border-[#817C73]/15 pb-4 mb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B89B62] font-semibold block">
              Curatorial Accession Registry
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#171717]">
              Submit New Masterwork for Review & Blockchain Deed
            </h2>
          </div>

          {submittedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#171717]">
                Masterwork Submitted to Curatorial Board
              </h3>
              <p className="text-xs text-[#817C73]">
                Initial Genesis Provenance hash minted. Chief Curator will review UV spectrometry notes and approve for cataloging.
              </p>
            </div>
          ) : (
            <form onSubmit={handleArtworkSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#817C73] mb-1 font-medium">Artwork Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Whispers of the Coral Stone"
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Art Category *</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ArtCategory)}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  >
                    <option value="Paintings">Paintings</option>
                    <option value="Sculpture">Sculpture</option>
                    <option value="Portraiture">Portraiture</option>
                    <option value="Contemporary Art">Contemporary Art</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Fine Art Prints">Fine Art Prints</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Classification *</label>
                  <select
                    value={classification}
                    onChange={e => setClassification(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  >
                    <option value="ORIGINAL">1 of 1 Unique Original Masterwork</option>
                    <option value="LIMITED_EDITION">Limited Edition Archival Print</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#817C73] mb-1 font-medium">Medium & Technique *</label>
                <input
                  type="text"
                  value={medium}
                  onChange={e => setMedium(e.target.value)}
                  required
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <div>
                <label className="block text-[#817C73] mb-1 font-medium">Specific Physical Materials & Pigments *</label>
                <input
                  type="text"
                  value={materials}
                  onChange={e => setMaterials(e.target.value)}
                  required
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Height (cm) *</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={e => setHeightCm(Number(e.target.value))}
                    required
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Width (cm) *</label>
                  <input
                    type="number"
                    value={widthCm}
                    onChange={e => setWidthCm(Number(e.target.value))}
                    required
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Depth (cm)</label>
                  <input
                    type="number"
                    value={depthCm}
                    onChange={e => setDepthCm(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Asking Price (TZS) *</label>
                  <input
                    type="number"
                    value={priceTzs}
                    onChange={e => setPriceTzs(Number(e.target.value))}
                    required
                    step={100000}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 font-mono focus:outline-none focus:border-[#B89B62]"
                  />
                  <span className="text-[10px] text-[#817C73] block mt-0.5">
                    Approx: {formatPrice(priceTzs, currency)} (Artist retains 70%)
                  </span>
                </div>

                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Studio Origin *</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    required
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#817C73] mb-1 font-medium">Curatorial Description & Narrative *</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Explain the conceptual foundation, spiritual lineage, and cultural symbolism of the work..."
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-widest hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Masterwork to Curatorial Registry</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab: Catalog */}
      {activeTab === 'CATALOG' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistArtworks.map(art => (
            <div key={art.id} className="bg-white border border-[#817C73]/25 p-4 flex flex-col justify-between">
              <div>
                <img src={art.images[0]} alt={art.title} className="w-full h-48 object-cover mb-3" />
                <span className="text-[10px] text-[#817C73] uppercase tracking-wider block">{art.category} · {art.creationYear}</span>
                <h4 className="font-serif font-bold text-lg text-[#171717]">{art.title}</h4>
                <p className="font-mono text-xs font-semibold text-[#171717] mt-1">{formatPrice(art.priceTzs, currency)}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#817C73]/15 flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#B89B62]">{art.status}</span>
                <button
                  onClick={() => setInspectedProvenance(art)}
                  className="text-xs text-[#171717] hover:text-[#B89B62] flex items-center gap-1 font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89B62]" />
                  <span>Ledger Deed</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Commissions */}
      {activeTab === 'COMMISSIONS' && (
        <div className="space-y-4">
          <p className="text-xs text-[#817C73]">
            Patrons requesting custom creations directly from your atelier.
          </p>
          {commissions.map(c => (
            <div key={c.id} className="bg-white border border-[#817C73]/25 p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-[#817C73]">{c.id}</span>
                  <h3 className="font-serif font-bold text-lg text-[#171717]">
                    {c.category} · {c.dimensionsRequired}
                  </h3>
                  <p className="text-xs text-[#817C73]">Client: {c.customerName} ({c.deliveryCity})</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#B89B62]">
                  {formatPrice(c.budgetTzs, currency)}
                </span>
              </div>
              <p className="text-xs text-[#171717]/85 italic bg-[#F7F5F0] p-3 border border-[#817C73]/15">
                "{c.brief}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
