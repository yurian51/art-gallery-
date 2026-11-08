import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { formatPrice } from '../../services/currencyService';
import { ArtCategory, CommissionRequest, CommissionStatus } from '../../types';
import {
  Palette,
  Clock,
  CheckCircle,
  FileText,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

export const CommissionPortal: React.FC = () => {
  const {
    language,
    currency,
    artists,
    commissions,
    submitCommission,
  } = useApp();

  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'NEW' | 'TRACK'>('NEW');

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredArtistId, setPreferredArtistId] = useState('');
  const [category, setCategory] = useState<ArtCategory>('Paintings');
  const [mediumPreferred, setMediumPreferred] = useState('Oil, Natural Ochre & 24k Gold Leaf');
  const [dimensionsRequired, setDimensionsRequired] = useState('180cm × 140cm');
  const [budgetTzs, setBudgetTzs] = useState(15000000);
  const [deadline, setDeadline] = useState('2026-10-31');
  const [deliveryCity, setDeliveryCity] = useState('Arusha');
  const [deliveryCountry, setDeliveryCountry] = useState('Tanzania');
  const [brief, setBrief] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComm = submitCommission({
      customerName,
      customerEmail,
      customerPhone,
      preferredArtistId: preferredArtistId || undefined,
      category,
      mediumPreferred,
      dimensionsRequired,
      budgetTzs: Number(budgetTzs),
      deadline,
      deliveryCity,
      deliveryCountry,
      brief,
    });

    setSubmittedId(newComm.id);
    setActiveTab('TRACK');
  };

  const getStatusBadge = (status: CommissionStatus) => {
    const map: Record<CommissionStatus, { label: string; color: string }> = {
      SUBMITTED: { label: 'Brief Submitted', color: 'bg-stone-100 text-stone-800' },
      UNDER_REVIEW: { label: 'Curatorial Review', color: 'bg-amber-50 text-amber-900' },
      QUOTED: { label: 'Artist Quote Issued', color: 'bg-blue-50 text-blue-900' },
      APPROVED: { label: 'Quote Approved', color: 'bg-indigo-50 text-indigo-900' },
      DEPOSIT_PAID: { label: 'Deposit Settled', color: 'bg-emerald-50 text-emerald-900' },
      IN_PROGRESS: { label: 'Atelier In Production', color: 'bg-[#B89B62]/20 text-[#171717]' },
      CUSTOMER_REVIEW: { label: 'Patron Preview Ready', color: 'bg-purple-50 text-purple-900' },
      REVISION_REQUESTED: { label: 'Revisions in Atelier', color: 'bg-orange-50 text-orange-900' },
      COMPLETED: { label: 'Masterwork Completed', color: 'bg-emerald-100 text-emerald-900' },
      DELIVERED: { label: 'Deed & Work Delivered', color: 'bg-emerald-200 text-emerald-950' },
      CANCELLED: { label: 'Cancelled', color: 'bg-stone-200 text-stone-600' },
    };

    const b = map[status] || { label: status, color: 'bg-stone-100 text-stone-800' };
    return (
      <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${b.color}`}>
        {b.label}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 mb-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Bespoke Curatorial Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          {t.commissions.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
          {t.commissions.subtitle}
        </p>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('NEW')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'NEW'
                ? 'bg-[#171717] text-[#F7F5F0]'
                : 'bg-white text-[#817C73] border border-[#817C73]/20 hover:text-[#171717]'
            }`}
          >
            {t.commissions.startRequest}
          </button>
          <button
            onClick={() => setActiveTab('TRACK')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'TRACK'
                ? 'bg-[#171717] text-[#F7F5F0]'
                : 'bg-white text-[#817C73] border border-[#817C73]/20 hover:text-[#171717]'
            }`}
          >
            {t.commissions.activeCommissions} ({commissions.length})
          </button>
        </div>
      </div>

      {activeTab === 'NEW' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Commission Brief Submission Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#817C73]/25 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#171717] mb-6 pb-2 border-b border-[#817C73]/15">
              Submit Private Commission Brief
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Patron Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.name} *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    required
                    placeholder="e.g. Salim Al-Jabri"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.email} *</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    required
                    placeholder="patron@estate.org"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.phone} *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  required
                  placeholder="+255 754 000 000"
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              {/* Commission Art Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#817C73]/15">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.category} *</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ArtCategory)}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  >
                    <option value="Paintings">Paintings (Canvas / Linen)</option>
                    <option value="Sculpture">Sculpture (Mpingo Wood / Stone)</option>
                    <option value="Portraiture">Fine Art Portraiture</option>
                    <option value="Textiles">Textiles & Tapestries</option>
                    <option value="Contemporary Art">Contemporary Mixed Media</option>
                    <option value="Installation Art">Architectural Installation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Preferred Artist (Optional)</label>
                  <select
                    value={preferredArtistId}
                    onChange={e => setPreferredArtistId(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  >
                    <option value="">Curatorial Board Recommendation</option>
                    {artists.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.origin})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.dimensions} *</label>
                  <input
                    type="text"
                    value={dimensionsRequired}
                    onChange={e => setDimensionsRequired(e.target.value)}
                    required
                    placeholder="e.g. 180cm × 120cm"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>

                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.medium} *</label>
                  <input
                    type="text"
                    value={mediumPreferred}
                    onChange={e => setMediumPreferred(e.target.value)}
                    required
                    placeholder="e.g. Raw earth ochre, natural resin, linen"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">
                    Allocated Budget ({currency}) *
                  </label>
                  <input
                    type="number"
                    value={budgetTzs}
                    onChange={e => setBudgetTzs(Number(e.target.value))}
                    required
                    step={500000}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 font-mono text-[#171717] focus:outline-none focus:border-[#B89B62]"
                  />
                  <span className="text-[10px] text-[#817C73] block mt-0.5">
                    Approx: {formatPrice(budgetTzs, currency)}
                  </span>
                </div>

                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.deadline} *</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Delivery Destination City *</label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={e => setDeliveryCity(e.target.value)}
                    required
                    placeholder="e.g. Arusha, London, Dubai, New York"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>

                <div>
                  <label className="block text-[#817C73] mb-1 font-medium">Country *</label>
                  <input
                    type="text"
                    value={deliveryCountry}
                    onChange={e => setDeliveryCountry(e.target.value)}
                    required
                    placeholder="e.g. Tanzania"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#817C73] mb-1 font-medium">{t.commissions.form.brief} *</label>
                <textarea
                  value={brief}
                  onChange={e => setBrief(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the aesthetic vision, intended interior setting, themes, cultural significance, or any specific color palettes..."
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-widest hover:bg-[#B89B62] hover:text-[#171717] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.commissions.form.submit}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Curatorial Commission Protocol (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#EBE6DF]/50 border border-[#817C73]/25 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B89B62]" />
                <h3 className="font-serif font-bold text-lg text-[#171717]">
                  The Mrisho Commission Guarantee
                </h3>
              </div>

              <p className="text-xs text-[#817C73] leading-relaxed">
                All bespoke commissions are structured under escrow contracts. The artist receives studio material
                disbursements upon initial sketch sign-off, while your final balance is secured until you approve
                the finished masterpiece in studio review.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 bg-white border border-[#817C73]/15">
                  <h4 className="font-bold text-[#171717]">Direct Atelier Dialogue</h4>
                  <p className="text-[#817C73] mt-0.5">
                    Receive photographic studio progress updates and raw material provenance documentation directly from the master creator.
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#817C73]/15">
                  <h4 className="font-bold text-[#171717]">Cryptographic Deed Registration</h4>
                  <p className="text-[#817C73] mt-0.5">
                    Upon delivery, the artwork is cataloged with an immutable Genesis Block, formalizing its accession into your permanent collection.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#817C73]/20 p-6 space-y-3 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#171717]">
                Commission Fee Breakdown
              </h4>
              <div className="space-y-2 text-[#817C73]">
                <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                  <span>Initial Studio Deposit:</span>
                  <span className="font-bold text-[#171717]">40% on Brief Approval</span>
                </div>
                <div className="flex justify-between border-b border-[#817C73]/15 pb-1">
                  <span>Mid-Production Milestone:</span>
                  <span className="font-bold text-[#171717]">30% on Composition Review</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Custody Transfer:</span>
                  <span className="font-bold text-[#171717]">30% on Crating & Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Track Commissions Tab */
        <div className="space-y-6">
          {commissions.length === 0 ? (
            <div className="bg-white border border-[#817C73]/20 py-16 text-center space-y-2">
              <p className="font-serif text-lg text-[#817C73]">No commission briefs currently active.</p>
              <button
                onClick={() => setActiveTab('NEW')}
                className="px-4 py-2 bg-[#171717] text-white text-xs font-semibold hover:bg-[#B89B62]"
              >
                Submit First Brief
              </button>
            </div>
          ) : (
            commissions.map(c => (
              <div
                key={c.id}
                className="bg-white border border-[#817C73]/25 p-6 sm:p-8 space-y-6 hover:border-[#171717] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#817C73]/20 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#817C73]">{c.id}</span>
                      <span>·</span>
                      <span className="text-xs text-[#817C73]">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">
                      {c.category} Commission · {c.dimensionsRequired}
                    </h3>
                    <p className="text-xs text-[#817C73]">
                      Requested by {c.customerName} ({c.deliveryCity}, {c.deliveryCountry})
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    {getStatusBadge(c.status)}
                    <span className="font-mono text-sm font-bold text-[#171717] block mt-1.5 tabular-nums">
                      Budget: {formatPrice(c.budgetTzs, currency)}
                    </span>
                  </div>
                </div>

                {/* Brief Narrative */}
                <div className="text-xs text-[#171717]/85 bg-[#F7F5F0] p-4 border border-[#817C73]/15 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#817C73] tracking-wider block">
                    Curatorial Brief Description:
                  </span>
                  <p className="leading-relaxed font-sans">{c.brief}</p>
                </div>

                {/* Assigned Artist & Quote */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[#817C73] block text-[10px] uppercase">Assigned Master Creator</span>
                    <span className="font-serif font-bold text-sm text-[#171717]">
                      {c.assignedArtistName || 'Curatorial Allocation Pending'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#817C73] block text-[10px] uppercase">Target Delivery Deadline</span>
                    <span className="font-medium text-[#171717]">{c.deadline}</span>
                  </div>
                  <div>
                    <span className="text-[#817C73] block text-[10px] uppercase">Official Atelier Quote</span>
                    <span className="font-mono font-bold text-[#B89B62]">
                      {c.quoteAmountTzs ? formatPrice(c.quoteAmountTzs, currency) : 'Review in Progress'}
                    </span>
                  </div>
                </div>

                {/* Milestones if present */}
                {c.milestones && c.milestones.length > 0 && (
                  <div className="pt-2 border-t border-[#817C73]/15">
                    <span className="text-[10px] uppercase tracking-wider text-[#817C73] block mb-2 font-semibold">
                      Production Milestones
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      {c.milestones.map((m, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 border text-xs ${
                            m.completed
                              ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                              : 'bg-white border-[#817C73]/20 text-[#817C73]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold mb-0.5">
                            {m.completed ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-[#817C73]" />
                            )}
                            <span className="truncate">{m.title}</span>
                          </div>
                          {m.date && <span className="text-[10px] opacity-75">{m.date}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
