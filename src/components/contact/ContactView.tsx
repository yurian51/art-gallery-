import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Clock, Mail, Phone, MessageSquare, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('ACQUISITION');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#817C73]/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
            Curatorial Advisory & Institutional Liaison
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
            {language === 'sw' ? 'Wasiliana Nasi' : 'Contact Mrisho Art Gallery'}
          </h1>
          <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
            {language === 'sw'
              ? 'Makao Makuu yetu yapo Arusha, Tanzania. Wasiliana na jopo letu la uratibu kwa ununuzi wa kazi za sanaa, maagizo maalum, au ushirikiano wa kitaasisi.'
              : 'Official gallery headquarters in Arusha, Tanzania. Connect directly with our curatorial board for private acquisitions, museum loans, bespoke commissions, and artist submissions.'}
          </p>
        </div>

        <div className="bg-white p-3 border border-[#817C73]/20 shadow-sm shrink-0">
          <img
            src="/assets/aistudio/file_000000003cbc82119fc00a28863060cc_f2901e66.png"
            alt="Official Logo of Mrisho Art Gallery"
            className="h-16 w-auto object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery Headquarters & Institutional Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#817C73]/25 p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#817C73]/15 pb-4">
              <span className="text-[10px] uppercase font-bold text-[#B89B62] tracking-wider block">
                Official Business Identity
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#171717] mt-1">
                Mrisho Art Gallery
              </h3>
              <p className="text-xs text-[#817C73] mt-0.5">
                Founder & CEO: <strong className="text-[#171717]">Hussein Sadiki Gumbo</strong>
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B89B62] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#171717] block">Business Location</span>
                  <p className="text-[#817C73]">Arusha, Tanzania</p>
                  <p className="text-[11px] text-[#817C73]/75 mt-0.5">
                    (Exact salon address and private appointments provided upon curatorial confirmation)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B89B62] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#171717] block">Salon & Visiting Hours</span>
                  <p className="text-[#817C73]">Monday – Saturday: 10:00 – 19:00 EAT</p>
                  <p className="text-[11px] text-[#817C73]/75 mt-0.5">Sunday: Private Viewings by Appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B89B62] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#171717] block">
                    {language === 'sw' ? 'Nambari za Simu' : 'Gallery Telephone Lines'}
                  </span>
                  <div className="space-y-0.5 mt-0.5">
                    <a
                      href="tel:+255639827831"
                      className="text-[#171717] hover:text-[#B89B62] font-semibold block transition-colors"
                    >
                      +255 639 827 831
                    </a>
                    <a
                      href="tel:+255782400311"
                      className="text-[#171717] hover:text-[#B89B62] font-semibold block transition-colors"
                    >
                      +255 782 400 311
                    </a>
                  </div>
                  <p className="text-[11px] text-[#817C73]/80 mt-1">
                    {language === 'sw' ? 'Mawasiliano ya moja kwa moja ya galari' : 'Direct collector & client advisory lines'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#B89B62] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#171717] block">
                    {language === 'sw' ? 'Huduma ya WhatsApp' : 'WhatsApp Curatorial Concierge'}
                  </span>
                  <a
                    href="https://wa.me/255639827831"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold hover:underline mt-0.5"
                  >
                    <span>+255 639 827 831 / +255 782 400 311</span>
                  </a>
                  <p className="text-[11px] text-[#817C73]/80 mt-0.5">
                    {language === 'sw' ? 'Jibu la haraka ndani ya saa za kazi' : 'Instant client advisory & custom enquiries'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B89B62] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#171717] block">
                    {language === 'sw' ? 'Barua Pepe Rasmi' : 'Official Direct Email'}
                  </span>
                  <a
                    href="mailto:mrishoartist@gmail.com"
                    className="text-[#171717] hover:text-[#B89B62] font-semibold block transition-colors mt-0.5"
                  >
                    mrishoartist@gmail.com
                  </a>
                  <p className="text-[11px] text-[#817C73]/80 mt-0.5">
                    {language === 'sw' ? 'Kwa ununuzi, maonyesho na hati za uratibu' : 'For acquisitions, museum loans & press'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#817C73]/15 flex items-center gap-3 text-xs text-[#817C73]">
              <ShieldCheck className="w-5 h-5 text-[#B89B62] shrink-0" />
              <span>
                All acquisitions and communications are backed by the Mrisho Provenance Guarantee.
              </span>
            </div>
          </div>

          {/* Technology Partner Card */}
          <div className="bg-[#FAF8F5] border border-[#817C73]/20 p-5 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89B62] font-semibold block">
              Platform Engineering Partner
            </span>
            <h4 className="font-serif font-bold text-base text-[#171717]">
              ALTAVOX TECH
            </h4>
            <p className="text-[#817C73] leading-relaxed text-[11px]">
              Digital platform designed, engineered, and maintained by ALTAVOX TECH. Technical support,
              infrastructure, and smart transaction architecture.
            </p>
          </div>
        </div>

        {/* Right: Curatorial Enquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#817C73]/25 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">
              {language === 'sw' ? 'Tuma Ujumbe kwa Bodi ya Uratibu' : 'Submit Curatorial Enquiry'}
            </h3>
            <p className="text-xs text-[#817C73] mt-1">
              {language === 'sw'
                ? 'Jaza fomu hii kwa maswali kuhusu kazi za sanaa, maagizo maalum, maonyesho au ushirikiano.'
                : 'Please complete the form below. Our curatorial director in Arusha will respond within 24 hours.'}
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3 bg-[#FAF8F5] border border-emerald-200 p-6">
              <Check className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-xl text-[#171717]">
                {language === 'sw' ? 'Ujumbe Wako Umepokelewa' : 'Enquiry Successfully Received'}
              </h4>
              <p className="text-xs text-[#817C73] max-w-md mx-auto">
                {language === 'sw'
                  ? 'Asante kwa kuwasiliana na Mrisho Art Gallery. Mkurugenzi wa uratibu atawasiliana nawe hivi punde.'
                  : 'Thank you for reaching out to Mrisho Art Gallery. Our curatorial board in Arusha will review your request and get in touch shortly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#171717] font-medium mb-1">
                    {language === 'sw' ? 'Jina Kamili *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="e.g. Elena Rostova"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>

                <div>
                  <label className="block text-[#171717] font-medium mb-1">
                    {language === 'sw' ? 'Barua Pepe *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="name@domain.com"
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#171717] font-medium mb-1">
                    {language === 'sw' ? 'Nambari ya Simu (WhatsApp)' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+255 ... / +1 ..."
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                  />
                </div>

                <div>
                  <label className="block text-[#171717] font-medium mb-1">
                    {language === 'sw' ? 'Aina ya Uchunguzi *' : 'Enquiry Type *'}
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62] text-[#171717]"
                  >
                    <option value="ACQUISITION">Private Artwork Acquisition</option>
                    <option value="COMMISSION">Bespoke Art Commission</option>
                    <option value="EXHIBITION">Exhibition Attendance & VIP RSVP</option>
                    <option value="ARTIST_SUBMISSION">Artist Representation Application</option>
                    <option value="MUSEUM_LOAN">Institutional / Museum Loan</option>
                    <option value="GENERAL">General Information</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#171717] font-medium mb-1">
                  {language === 'sw' ? 'Maelezo ya Ujumbe *' : 'Enquiry Details *'}
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder={
                    language === 'sw'
                      ? 'Eleza kazi unayovutiwa nayo, mradi wa sanaa, au maswali yako...'
                      : 'Please specify the artworks of interest, project scope, dimensions, or specific curatorial questions...'
                  }
                  className="w-full p-2.5 bg-[#F7F5F0] border border-[#817C73]/30 focus:outline-none focus:border-[#B89B62]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider hover:bg-[#B89B62] hover:text-[#171717] transition-all"
              >
                {language === 'sw' ? 'Wasilisha Ujumbe kwa Bodi' : 'Dispatch Message to Curatorial Board'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
