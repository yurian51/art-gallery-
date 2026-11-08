import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../services/currencyService';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Layers,
  ShoppingBag,
  DollarSign,
  Palette,
  FileText,
  Activity,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currency,
    artworks,
    artists,
    exhibitions,
    commissions,
    orders,
    auditLogs,
    approveArtwork,
    rejectArtwork,
    updateCommissionStatus,
    setInspectedArtwork,
    setInspectedProvenance,
  } = useApp();

  const [activeModule, setActiveModule] = useState<
    'OVERVIEW' | 'ARTWORKS' | 'COMMISSIONS' | 'EXHIBITIONS' | 'ORDERS' | 'LEDGER' | 'AUDIT'
  >('OVERVIEW');

  // Quotation input state
  const [selectedCommId, setSelectedCommId] = useState<string | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<number>(20000000);

  const pendingArtworks = artworks.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW');
  const totalRevenueTzs = orders.reduce((acc, o) => acc + o.totalTzs, 0);

  const handleIssueQuote = (commId: string) => {
    updateCommissionStatus(commId, 'QUOTED', quoteAmount);
    setSelectedCommId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 border border-[#B89B62]/40 bg-white p-4 text-sm leading-relaxed text-[#817C73]">Preview only. No administrator is authenticated, no live database is connected, and changes made here are stored only in this browser.</div>
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B89B62]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold">
                Administration workspace preview
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Gallery administration
            </h1>
            <p className="text-xs text-[#817C73] mt-1">
              Workspace preview · No live database or secure administrator session is connected
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white border border-[#817C73]/25 font-mono text-[#171717]">
              Local preview
            </span>
          </div>
        </div>

        {/* Module Navigation */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1">
          {[
            { id: 'OVERVIEW', label: 'Executive Metrics' },
            { id: 'ARTWORKS', label: `Artwork Approvals (${pendingArtworks.length})` },
            { id: 'COMMISSIONS', label: `Commissions (${commissions.length})` },
            { id: 'ORDERS', label: `Orders & Settlements (${orders.length})` },
            { id: 'EXHIBITIONS', label: `Salons (${exhibitions.length})` },
            { id: 'LEDGER', label: 'Artwork documentation' },
            { id: 'AUDIT', label: `Audit Trail (${auditLogs.length})` },
          ].map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id as any)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeModule === mod.id
                  ? 'bg-[#171717] text-[#F7F5F0]'
                  : 'bg-white text-[#817C73] border border-[#817C73]/20 hover:text-[#171717]'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      {/* Module 1: Overview */}
      {activeModule === 'OVERVIEW' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Total Cataloged Works</span>
              <span className="font-serif text-3xl font-bold text-[#171717]">{artworks.length}</span>
              <span className="text-[11px] text-[#817C73] block mt-1">
                {artworks.filter(a => a.classification === 'ORIGINAL').length} Unique Originals
              </span>
            </div>

            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Recorded order value</span>
              <span className="font-mono text-2xl font-bold text-[#171717] tabular-nums">
                {orders.length ? formatPrice(totalRevenueTzs, currency) : 'Not connected'}
              </span>
              <span className="text-[11px] text-emerald-700 block mt-1">{orders.length ? 'Local preview records only' : 'No live order data connected'}</span>
            </div>

            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Pending Curatorial Review</span>
              <span className="font-serif text-3xl font-bold text-[#B89B62]">{pendingArtworks.length}</span>
              <span className="text-[11px] text-[#817C73] block mt-1">From East African Ateliers</span>
            </div>

            <div className="bg-white border border-[#817C73]/25 p-5">
              <span className="text-[10px] uppercase text-[#817C73] block mb-1">Exhibition records</span>
              <span className="font-serif text-3xl font-bold text-[#171717]">
                {exhibitions.length}
              </span>
              <span className="text-[11px] text-[#817C73] block mt-1">No venue data connected</span>
            </div>
          </div>

          {/* Quick Actions / Review Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-[#817C73]/25 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-lg text-[#171717]">
                  Pending Artworks for Curatorial Accreditation
                </h3>
                <span className="text-xs font-mono text-[#B89B62] font-semibold">{pendingArtworks.length} Pending</span>
              </div>

              {pendingArtworks.length === 0 ? (
                <p className="text-xs text-[#817C73] py-4">No artwork submissions are available in this preview.</p>
              ) : (
                <div className="space-y-3">
                  {pendingArtworks.map(art => (
                    <div key={art.id} className="p-3 bg-[#F7F5F0] border border-[#817C73]/15 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#171717]">{art.title}</h4>
                        <p className="text-[#817C73]">{art.artistName} · {art.category}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approveArtwork(art.id)}
                          className="px-2.5 py-1 bg-[#171717] text-white text-[11px] font-semibold hover:bg-[#B89B62]"
                        >
                          Approve & Publish
                        </button>
                        <button
                          onClick={() => rejectArtwork(art.id)}
                          className="px-2.5 py-1 border border-stone-300 text-stone-600 text-[11px] hover:text-rose-600"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#817C73]/25 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-lg text-[#171717]">
                  Recent Security & Audit Logs
                </h3>
                <button onClick={() => setActiveModule('AUDIT')} className="text-xs text-[#B89B62] hover:underline">
                  View Full Audit
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                {auditLogs.slice(0, 4).map(log => (
                  <div key={log.id} className="p-2.5 bg-[#F7F5F0] border border-[#817C73]/15">
                    <div className="flex justify-between text-[10px] text-[#817C73] mb-1 font-mono">
                      <span>{log.actor} ({log.role})</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-[#171717] font-medium">{log.action}</p>
                    <p className="text-[#817C73] text-[11px] mt-0.5">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module 2: Artworks Review & Approvals */}
      {activeModule === 'ARTWORKS' && (
        <div className="bg-white border border-[#817C73]/25 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[#817C73]/15 pb-4">
            <h3 className="font-serif font-bold text-xl text-[#171717]">
              Catalog Accreditation & Accession Registry ({artworks.length})
            </h3>
            <span className="text-xs text-[#817C73]">
              Enforces chemical spectrometry notes and ultraviolet photo verification
            </span>
          </div>

          <div className="divide-y divide-[#817C73]/15">
            {artworks.map(art => (
              <div key={art.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img src={art.images[0]} alt={art.title} className="w-16 h-16 object-cover border border-[#817C73]/20 shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#171717]">{art.title}</h4>
                    <p className="text-[#817C73]">{art.artistName} · {art.category} · {art.origin}</p>
                    <p className="font-mono text-[10px] text-[#B89B62]">
                      Cert #{art.provenance.certificateNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <span className="font-mono font-bold text-sm text-[#171717]">
                    {formatPrice(art.priceTzs, currency)}
                  </span>

                  <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    art.status === 'PUBLISHED'
                      ? 'bg-emerald-50 text-emerald-800'
                      : art.status === 'SOLD'
                      ? 'bg-purple-50 text-purple-800'
                      : 'bg-amber-50 text-amber-800'
                  }`}>
                    {art.status}
                  </span>

                  {art.status !== 'PUBLISHED' && art.status !== 'SOLD' && (
                    <button
                      onClick={() => approveArtwork(art.id)}
                      className="px-3 py-1 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62]"
                    >
                      Approve & Publish
                    </button>
                  )}

                  <button
                    onClick={() => setInspectedProvenance(art)}
                    className="p-1 text-[#817C73] hover:text-[#B89B62]"
                    title="Examine provenance"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#B89B62]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module 3: Commissions Management */}
      {activeModule === 'COMMISSIONS' && (
        <div className="bg-white border border-[#817C73]/25 p-6 space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#171717] border-b border-[#817C73]/15 pb-4">
            Patron Commission Briefs & Atelier Quotations
          </h3>

          <div className="space-y-4">
            {commissions.length === 0 ? <p className="py-8 text-center text-sm text-[#817C73]">No commission enquiries are connected.</p> : commissions.map(c => (
              <div key={c.id} className="p-5 bg-[#F7F5F0] border border-[#817C73]/20 space-y-4 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#817C73]">{c.id}</span>
                    <h4 className="font-serif font-bold text-lg text-[#171717]">
                      {c.category} · {c.dimensionsRequired}
                    </h4>
                    <p className="text-[#817C73]">Client: {c.customerName} ({c.customerEmail} · {c.customerPhone})</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#171717] block">
                      Target Budget: {formatPrice(c.budgetTzs, currency)}
                    </span>
                    <span className="font-mono text-xs text-[#B89B62] block">
                      Issued Quote: {c.quoteAmountTzs ? formatPrice(c.quoteAmountTzs, currency) : 'Pending Quote'}
                    </span>
                  </div>
                </div>

                <p className="italic text-[#171717]/85 bg-white p-3 border border-[#817C73]/15">
                  "{c.brief}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#817C73]/15">
                  <span className="text-[#817C73]">
                    Assigned Master Artist: <strong>{c.assignedArtistName || 'Unassigned'}</strong> · Delivery: {c.deliveryCity}, {c.deliveryCountry}
                  </span>

                  {selectedCommId === c.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={quoteAmount}
                        onChange={e => setQuoteAmount(Number(e.target.value))}
                        className="p-1 border border-[#817C73]/30 font-mono text-xs"
                      />
                      <button
                        onClick={() => handleIssueQuote(c.id)}
                        className="px-3 py-1 bg-[#171717] text-white text-xs font-semibold"
                      >
                        Confirm Quote
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedCommId(c.id)}
                      className="px-3 py-1.5 border border-[#171717] text-xs font-semibold hover:bg-[#171717] hover:text-white"
                    >
                      Update Atelier Quote
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module 4: Orders & Settlements */}
      {activeModule === 'ORDERS' && (
        <div className="bg-white border border-[#817C73]/25 p-6 space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#171717] border-b border-[#817C73]/15 pb-4">
            Order records
          </h3>

          <div className="space-y-4">
            {orders.length === 0 ? <p className="py-8 text-center text-sm text-[#817C73]">No order records are connected.</p> : orders.map(o => (
              <div key={o.id} className="p-4 border border-[#817C73]/20 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#817C73]/10 pb-2">
                  <span className="font-mono font-bold text-sm text-[#171717]">{o.orderNumber}</span>
                  <span className="font-mono font-bold text-[#B89B62]">{formatPrice(o.totalTzs, currency)}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[#817C73]">
                  <div>Patron: {o.customerName} ({o.customerEmail})</div>
                  <div>Gateway: {o.paymentMethod} (Ref: {o.paymentReference})</div>
                  <div>Tracking: {o.trackingNumber}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module 5: Artwork documentation Console */}
      {activeModule === 'LEDGER' && (
        <section className="border border-[#817C73]/25 bg-white p-6 sm:p-8 space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89B62]">Artwork documentation</p>
            <h3 className="mt-1 font-serif text-2xl text-[#171717]">Verification service not connected</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#817C73]">No external registry, certificate issuer, or ownership ledger is connected. Records shown here are not independently verified.</p>
          </div>
          {artworks.length === 0 ? (
            <div className="border border-[#817C73]/15 bg-[#F7F5F0] p-6 text-sm text-[#817C73]">No artwork documentation records are available.</div>
          ) : artworks.map((artwork) => (
            <div key={artwork.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-[#817C73]/15 pt-4">
              <div><p className="font-serif text-lg text-[#171717]">{artwork.title}</p><p className="text-xs text-[#817C73]">{artwork.artistName} · {artwork.provenance.isAuthentic ? 'Requires independent confirmation' : 'Not verified'}</p></div>
              <button onClick={() => setInspectedProvenance(artwork)} className="border border-[#171717] px-3 py-2 text-xs text-[#171717] hover:bg-[#171717] hover:text-white">View record</button>
            </div>
          ))}
        </section>
      )}

      {/* Module 6: Audit Trail */}
      {activeModule === 'AUDIT' && (
        <div className="bg-white border border-[#817C73]/25 p-6 space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#171717] border-b border-[#817C73]/15 pb-4">
            Local workspace activity
          </h3>

          <div className="space-y-3 text-xs">
            {auditLogs.length === 0 ? <p className="py-8 text-center text-sm text-[#817C73]">No activity records are available.</p> : auditLogs.map(log => (
              <div key={log.id} className="p-3 bg-[#F7F5F0] border border-[#817C73]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#B89B62] font-bold">{log.action}</span>
                    <span className="text-[#817C73]">·</span>
                    <span className="font-semibold text-[#171717]">{log.actor} ({log.role})</span>
                  </div>
                  <p className="text-[#817C73]">{log.details}</p>
                </div>
                <span className="font-mono text-[11px] text-[#817C73] shrink-0">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
