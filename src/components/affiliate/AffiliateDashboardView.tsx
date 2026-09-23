import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  getCurrentAffiliate, 
  setCurrentAffiliate, 
  getAffiliateReferrals, 
  addAffiliateReferral,
  AffiliatePropertyReferral,
  AffiliateApplication,
  ReferralDealStatus
} from '../../utils/affiliateStorage';
import { 
  Building2, 
  PlusCircle, 
  PhoneCall, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Wallet, 
  ExternalLink, 
  LogOut, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  X, 
  AlertCircle,
  MapPin,
  Tag,
  DollarSign,
  User,
  ArrowRight
} from 'lucide-react';
import { formatPriceINR } from '../../utils/propertyUtils';

export const AffiliateDashboardView: React.FC = () => {
  const { setActiveView, showToast } = useApp();
  const [affiliate, setAffiliate] = useState<AffiliateApplication | null>(null);
  const [referrals, setReferrals] = useState<AffiliatePropertyReferral[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // New Property Referral Form state
  const [newProp, setNewProp] = useState({
    propertyTitle: '',
    propertyType: 'Apartment / Flat',
    listingNature: 'Sale' as 'Sale' | 'Rent' | 'Lease',
    locality: 'CIDCO',
    address: '',
    expectedPrice: '',
    ownerName: '',
    ownerPhone: '',
    additionalNotes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const current = getCurrentAffiliate();
    if (!current) {
      setActiveView('affiliate-login');
      return;
    }
    setAffiliate(current);
    loadMyReferrals(current.affiliateId);
  }, []);

  const loadMyReferrals = (affId: string) => {
    const all = getAffiliateReferrals();
    // Filter referrals submitted by this affiliate
    const mine = all.filter(r => r.affiliateId === affId);
    setReferrals(mine);
  };

  const handleLogout = () => {
    setCurrentAffiliate(null);
    showToast('Signed out of affiliate portal', 'info');
    setActiveView('affiliate-login');
  };

  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliate) return;

    if (!newProp.propertyTitle.trim()) {
      showToast('Please enter a property title or description.', 'error');
      return;
    }
    if (!newProp.ownerName.trim()) {
      showToast("Owner's name is required.", 'error');
      return;
    }
    if (!newProp.ownerPhone.trim() || newProp.ownerPhone.length < 10) {
      showToast("Please enter a valid 10-digit owner phone number.", 'error');
      return;
    }

    setSubmitting(true);
    const newRecord: AffiliatePropertyReferral = {
      id: `REF-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      affiliateId: affiliate.affiliateId,
      affiliateName: affiliate.fullName,
      affiliatePhone: affiliate.mobile,
      affiliateUpi: affiliate.upiId,
      propertyTitle: newProp.propertyTitle.trim(),
      propertyType: newProp.propertyType,
      listingNature: newProp.listingNature,
      locality: newProp.locality,
      address: newProp.address.trim(),
      expectedPrice: newProp.expectedPrice.trim() || 'Market Rate',
      ownerName: newProp.ownerName.trim(),
      ownerPhone: newProp.ownerPhone.trim(),
      additionalNotes: newProp.additionalNotes.trim(),
      submittedAt: new Date().toISOString(),
      dealStatus: 'Open',
      payoutStatus: 'Pending'
    };

    addAffiliateReferral(newRecord);
    loadMyReferrals(affiliate.affiliateId);
    setSubmitting(false);
    setModalOpen(false);
    setNewProp({
      propertyTitle: '',
      propertyType: 'Apartment / Flat',
      listingNature: 'Sale',
      locality: 'CIDCO',
      address: '',
      expectedPrice: '',
      ownerName: '',
      ownerPhone: '',
      additionalNotes: ''
    });
    showToast('Property referral submitted successfully! Admin will verify with owner.', 'success');
  };

  if (!affiliate) {
    return null;
  }

  // Earnings calculations
  const totalSent = referrals.length;
  const soldDeals = referrals.filter(r => r.dealStatus === 'Sold / Deal Closed');
  const totalEarned = referrals.reduce((sum, r) => sum + (r.commissionReward || 0), 0);
  const paidOut = referrals
    .filter(r => r.payoutStatus === 'Paid')
    .reduce((sum, r) => sum + (r.commissionReward || 0), 0);
  const pendingPayout = referrals
    .filter(r => r.dealStatus === 'Sold / Deal Closed' && r.payoutStatus !== 'Paid')
    .reduce((sum, r) => sum + (r.commissionReward || 0), 0);

  const referralLink = `https://auricity.com/?ref=${affiliate.referralCode || affiliate.affiliateId}`;

  const copyRefLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    showToast('Referral link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Affiliate Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#102B59] via-[#1E4FA8] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Auricity Verified Affiliate Partner
              </span>
              <span className="text-xs font-mono text-blue-200">{affiliate.affiliateId}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {affiliate.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100">
              {affiliate.profession} • {affiliate.city}, {affiliate.state} • UPI: <span className="font-mono font-bold text-amber-300">{affiliate.upiId || 'Not provided'}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              + Send / Refer a Property
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* 4 Financial & Performance KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Properties Sent</span>
            <p className="text-3xl font-black text-[#1E4FA8]">{totalSent}</p>
            <span className="text-[11px] font-medium text-slate-500">Submitted property leads</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Properties Sold / Closed</span>
            <p className="text-3xl font-black text-emerald-600">{soldDeals.length}</p>
            <span className="text-[11px] font-bold text-emerald-600">Deals successfully completed</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Commission Paid to You</span>
            <p className="text-3xl font-black text-slate-900">₹{paidOut.toLocaleString('en-IN')}</p>
            <span className="text-[11px] font-bold text-emerald-600">Credited to UPI</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Pending Payout</span>
            <p className="text-3xl font-black text-[#F2621E]">₹{pendingPayout.toLocaleString('en-IN')}</p>
            <span className="text-[11px] font-medium text-amber-600">Awaiting admin transaction</span>
          </div>
        </div>

        {/* Unique Referral Link & Share Strip */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Your Trackable Referral Link</span>
            <h3 className="font-black text-sm text-slate-900">
              Share Auricity with buyers or property owners in your network
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              {referralLink}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={copyRefLink}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <a
              href={`https://wa.me/?text=Check%20out%20Auricity%20-%20the%20trusted%200%25%20brokerage%20property%20portal%20in%20Sambhajinagar:%20${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4" /> Share on WhatsApp
            </a>
          </div>
        </div>

        {/* Main Content: Properties Sent & Status Pipeline */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                My Referred Properties & Deal Tracker ({referrals.length})
              </h2>
              <p className="text-xs text-slate-500">
                Properties you sent to Auricity. When a property sells, your commission is credited directly to your UPI.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#1E4FA8] hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" /> + Refer Another Property
            </button>
          </div>

          {referrals.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <p className="font-black text-sm text-slate-700">No properties referred yet</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Know someone selling a flat, house, or NA plot in Sambhajinagar? Send their property details and owner phone number to earn referral rewards.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-md hover:bg-emerald-500 transition-all inline-flex items-center gap-1"
              >
                + Send First Property Lead
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map(ref => {
                const isClosed = ref.dealStatus === 'Sold / Deal Closed';
                const isPaid = ref.payoutStatus === 'Paid';

                return (
                  <div 
                    key={ref.id}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-blue-300 transition-all space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#1E4FA8] text-[10px] font-black uppercase">
                            {ref.propertyType}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                            {ref.listingNature}
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-bold">{ref.id}</span>
                        </div>
                        <h3 className="font-black text-base text-slate-900 mt-1">
                          {ref.propertyTitle}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {ref.locality} {ref.address ? `• ${ref.address}` : ''}
                        </p>
                      </div>

                      {/* Deal Status & Commission Tag */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${
                          isClosed 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : ref.dealStatus === 'In Negotiation'
                            ? 'bg-purple-100 text-purple-800'
                            : ref.dealStatus === 'Owner Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          ● {ref.dealStatus}
                        </span>

                        {ref.commissionReward && ref.commissionReward > 0 && (
                          <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                            isPaid 
                              ? 'bg-emerald-600 text-white shadow-xs' 
                              : 'bg-amber-500 text-slate-950 font-black'
                          }`}>
                            <Wallet className="w-3.5 h-3.5" />
                            ₹{ref.commissionReward.toLocaleString('en-IN')} {isPaid ? '(Paid via UPI)' : '(Approved)'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Owner Details & Status Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Owner Contact</span>
                        <p className="font-black text-slate-900">{ref.ownerName}</p>
                        <p className="font-mono text-slate-600 font-bold">{ref.ownerPhone}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Expected Price</span>
                        <p className="font-black text-slate-900">{ref.expectedPrice}</p>
                        <p className="text-[11px] text-slate-400">Submitted: {new Date(ref.submittedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Payout Info</span>
                        {ref.payoutTxId ? (
                          <div>
                            <span className="text-emerald-600 font-black flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Transferred via UPI
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">Ref: {ref.payoutTxId}</span>
                          </div>
                        ) : isClosed ? (
                          <span className="text-amber-600 font-black">Commission Processing</span>
                        ) : (
                          <span className="text-slate-400 font-medium">Earned upon deal closure</span>
                        )}
                      </div>
                    </div>

                    {ref.adminNotes && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
                        <strong>Auricity Team Update:</strong> {ref.adminNotes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal: Refer / Send a Property */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#F2621E] tracking-wider">
                    New Property Submission
                  </span>
                  <h3 className="font-black text-lg text-slate-900">
                    Send Property Lead to Auricity
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReferral} className="space-y-4 text-xs">
                {/* Property Headline */}
                <div>
                  <label className="font-black text-slate-800 block mb-1">
                    Property Title / Short Description *
                  </label>
                  <input
                    type="text"
                    value={newProp.propertyTitle}
                    onChange={e => setNewProp({ ...newProp, propertyTitle: e.target.value })}
                    placeholder="e.g. 2 BHK East Facing Flat in CIDCO N-2 or 1500 sq.ft Plot"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:border-[#1E4FA8] focus:bg-white"
                    required
                  />
                </div>

                {/* Property Type & Nature */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-black text-slate-800 block mb-1">Property Type</label>
                    <select
                      value={newProp.propertyType}
                      onChange={e => setNewProp({ ...newProp, propertyType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    >
                      <option>Apartment / Flat</option>
                      <option>Independent House / Villa</option>
                      <option>Plot / Sanctioned Land</option>
                      <option>Commercial Shop / Office</option>
                      <option>Agricultural Land</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-black text-slate-800 block mb-1">Listing Nature</label>
                    <select
                      value={newProp.listingNature}
                      onChange={e => setNewProp({ ...newProp, listingNature: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    >
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                      <option value="Lease">Commercial Lease</option>
                    </select>
                  </div>
                </div>

                {/* Locality & Expected Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-black text-slate-800 block mb-1">Locality</label>
                    <select
                      value={newProp.locality}
                      onChange={e => setNewProp({ ...newProp, locality: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    >
                      <option>CIDCO</option>
                      <option>Beed Bypass</option>
                      <option>Garkheda</option>
                      <option>Jalna Road</option>
                      <option>Samarth Nagar</option>
                      <option>Shendra MIDC</option>
                      <option>Waluj</option>
                      <option>Chikalthana</option>
                      <option>Harsul</option>
                      <option>Railway Station Road</option>
                      <option>Other Locality</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-black text-slate-800 block mb-1">Expected Price (₹)</label>
                    <input
                      type="text"
                      value={newProp.expectedPrice}
                      onChange={e => setNewProp({ ...newProp, expectedPrice: e.target.value })}
                      placeholder="e.g. ₹ 65 Lakh or ₹ 18,000/mo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:border-[#1E4FA8] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Owner Information (Crucial!) */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-900 font-black">
                    <User className="w-4 h-4 text-amber-700" />
                    Property Owner's Direct Information
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Auricity directly connects with this owner to verify title and arrange buyer visits. You earn commission once sold!
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-black text-slate-800 block mb-1">
                        Owner's Full Name *
                      </label>
                      <input
                        type="text"
                        value={newProp.ownerName}
                        onChange={e => setNewProp({ ...newProp, ownerName: e.target.value })}
                        placeholder="e.g. Rameshwar Patil"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 font-semibold focus:outline-none focus:border-[#1E4FA8]"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-black text-slate-800 block mb-1">
                        Owner's Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={newProp.ownerPhone}
                        onChange={e => setNewProp({ ...newProp, ownerPhone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 font-semibold font-mono focus:outline-none focus:border-[#1E4FA8]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address & Specific Notes */}
                <div>
                  <label className="font-black text-slate-800 block mb-1">
                    Specific Address / Landmark / Floor (Optional)
                  </label>
                  <input
                    type="text"
                    value={newProp.address}
                    onChange={e => setNewProp({ ...newProp, address: e.target.value })}
                    placeholder="e.g. Near Cannaught Garden, 3rd Floor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-black text-slate-800 block mb-1">
                    Key Highlights / Urgent Sale Notes
                  </label>
                  <textarea
                    rows={3}
                    value={newProp.additionalNotes}
                    onChange={e => setNewProp({ ...newProp, additionalNotes: e.target.value })}
                    placeholder="e.g. Owner is relocating to Pune, clear title, immediate registration possible."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-1.5 shadow-md transition-all"
                  >
                    {submitting ? 'Submitting…' : 'Submit Property Lead'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
