import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  getAffiliateApplications, 
  saveAffiliateApplications, 
  updateAffiliateApplicationStatus,
  getAffiliateReferrals, 
  saveAffiliateReferrals, 
  updateAffiliateReferral,
  AffiliateApplication, 
  AffiliatePropertyReferral,
  ReferralDealStatus,
  ReferralPayoutStatus
} from '../../../utils/affiliateStorage';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Wallet, 
  Search, 
  Filter, 
  Sparkles, 
  ExternalLink, 
  Plus, 
  DollarSign, 
  ArrowUpRight, 
  UserCheck, 
  Phone, 
  AlertCircle,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { formatPriceINR } from '../../../utils/propertyUtils';

export const AffiliateManagementAdminTab: React.FC = () => {
  const { showToast, addProperty, allProperties } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'referrals' | 'payouts'>('applications');
  
  const [applications, setApplications] = useState<AffiliateApplication[]>([]);
  const [referrals, setReferrals] = useState<AffiliatePropertyReferral[]>([]);
  
  const [appFilter, setAppFilter] = useState<'all' | 'under_review' | 'approved' | 'rejected'>('all');
  const [searchApp, setSearchApp] = useState('');
  
  const [dealFilter, setDealFilter] = useState<string>('all');
  const [searchDeal, setSearchDeal] = useState('');

  // Selected Referral modal for closing deal / payout
  const [editingRef, setEditingRef] = useState<AffiliatePropertyReferral | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setApplications(getAffiliateApplications());
    setReferrals(getAffiliateReferrals());
  };

  const handleApproveApp = (app: AffiliateApplication) => {
    updateAffiliateApplicationStatus(app.id, 'approved', 'Approved by admin. Full referral portal access granted.');
    refreshData();
    showToast(`Approved ${app.fullName}! They can now log in and refer properties.`, 'success');
  };

  const handleRejectApp = (app: AffiliateApplication) => {
    const reason = prompt('Please enter reason for rejection:', 'Information could not be verified.');
    if (reason !== null) {
      updateAffiliateApplicationStatus(app.id, 'rejected', reason);
      refreshData();
      showToast(`Application for ${app.fullName} set to rejected.`, 'info');
    }
  };

  const handleSaveDealDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRef) return;

    updateAffiliateReferral(editingRef.id, {
      dealStatus: editingRef.dealStatus,
      dealAmount: editingRef.dealAmount,
      commissionReward: editingRef.commissionReward,
      payoutStatus: editingRef.payoutStatus,
      payoutTxId: editingRef.payoutTxId,
      payoutDate: editingRef.payoutStatus === 'Paid' && !editingRef.payoutDate ? new Date().toISOString() : editingRef.payoutDate,
      adminNotes: editingRef.adminNotes
    });

    refreshData();
    setEditingRef(null);
    showToast('Referral deal status and commission updated successfully!', 'success');
  };

  // 1-Click Convert referral to portal property listing
  const handlePublishAsListing = (ref: AffiliatePropertyReferral) => {
    const newListing = {
      title: ref.propertyTitle,
      type: (ref.propertyType.toLowerCase().includes('flat') || ref.propertyType.toLowerCase().includes('apartment') ? 'flat' :
             ref.propertyType.toLowerCase().includes('villa') || ref.propertyType.toLowerCase().includes('house') ? 'house' :
             ref.propertyType.toLowerCase().includes('plot') ? 'plot' : 'commercial') as any,
      listingType: ref.listingNature.toLowerCase() as any,
      price: ref.dealAmount || 6500000,
      locality: ref.locality,
      address: ref.address || ref.locality,
      city: 'Chhatrapati Sambhajinagar',
      bhk: ref.propertyTitle.includes('3 BHK') ? 3 : ref.propertyTitle.includes('2 BHK') ? 2 : 1,
      carpetArea: 1100,
      builtUpArea: 1350,
      description: `${ref.propertyTitle}. Sourced via Auricity Verified Partner ${ref.affiliateName}. Direct owner deal. ${ref.additionalNotes || ''}`,
      features: ['24/7 Water Supply', 'Clear Title', 'Town Planning Sanctioned', 'Immediate Possession'],
      verified: true,
      featured: true,
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80'
      ],
      ownerContact: {
        name: ref.ownerName,
        phone: ref.ownerPhone,
        whatsapp: ref.ownerPhone
      },
      contactPhone: ref.ownerPhone,
      postedDate: new Date().toISOString().split('T')[0]
    };

    addProperty(newListing);
    updateAffiliateReferral(ref.id, {
      dealStatus: 'Owner Contacted',
      adminNotes: 'Property published to live portal as direct listing!'
    });
    refreshData();
    showToast(`Property "${ref.propertyTitle}" added to live portal inventory!`, 'success');
  };

  const pendingApps = applications.filter(a => a.status === 'under_review');
  const approvedApps = applications.filter(a => a.status === 'approved');

  const filteredApps = applications.filter(a => {
    const matchesFilter = appFilter === 'all' || a.status === appFilter;
    const matchesSearch = !searchApp.trim() || 
      a.fullName.toLowerCase().includes(searchApp.toLowerCase()) ||
      a.mobile.includes(searchApp) ||
      a.email.toLowerCase().includes(searchApp.toLowerCase()) ||
      a.affiliateId.toLowerCase().includes(searchApp.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredRefs = referrals.filter(r => {
    const matchesFilter = dealFilter === 'all' || r.dealStatus === dealFilter;
    const matchesSearch = !searchDeal.trim() ||
      r.propertyTitle.toLowerCase().includes(searchDeal.toLowerCase()) ||
      r.ownerName.toLowerCase().includes(searchDeal.toLowerCase()) ||
      r.ownerPhone.includes(searchDeal) ||
      r.affiliateName.toLowerCase().includes(searchDeal.toLowerCase()) ||
      r.locality.toLowerCase().includes(searchDeal.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCommissionsEarned = referrals.reduce((sum, r) => sum + (r.commissionReward || 0), 0);
  const totalCommissionsPaid = referrals.filter(r => r.payoutStatus === 'Paid').reduce((sum, r) => sum + (r.commissionReward || 0), 0);
  const pendingPayouts = referrals.filter(r => r.dealStatus === 'Sold / Deal Closed' && r.payoutStatus !== 'Paid').reduce((sum, r) => sum + (r.commissionReward || 0), 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E4FA8] text-[10px] font-black uppercase tracking-wider">
              Partner Network CRM
            </span>
            <span className="text-xs text-slate-500 font-bold">Workflow Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Affiliate Partner & Referral Desk
          </h2>
          <p className="text-xs text-slate-500">
            Review partner applications, approve accounts, view owner phone numbers, track closed deals & process commission payouts.
          </p>
        </div>

        {/* Sub-Navigation Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('applications')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'applications'
                ? 'bg-[#1E4FA8] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applications</span>
            {pendingApps.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] animate-pulse">
                {pendingApps.length} New
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('referrals')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'referrals'
                ? 'bg-[#1E4FA8] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Referred Properties (Owner Leads)</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-current font-bold text-[10px]">
              {referrals.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('payouts')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'payouts'
                ? 'bg-[#1E4FA8] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Commission Payouts</span>
            {pendingPayouts > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px]">
                ₹{pendingPayouts.toLocaleString('en-IN')}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Pending Approvals</span>
          <p className="text-2xl font-black text-[#F2621E]">{pendingApps.length}</p>
          <span className="text-[11px] text-amber-700 font-bold">New affiliate signups</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Approved Partners</span>
          <p className="text-2xl font-black text-emerald-600">{approvedApps.length}</p>
          <span className="text-[11px] text-slate-500 font-medium">Active sending properties</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Referred Properties</span>
          <p className="text-2xl font-black text-[#1E4FA8]">{referrals.length}</p>
          <span className="text-[11px] text-slate-500 font-medium">Direct owner properties</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Commission Distributed</span>
          <p className="text-2xl font-black text-slate-900">₹{totalCommissionsPaid.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-600 font-bold">Paid to affiliates</span>
        </div>
      </div>

      {/* SUB-TAB 1: APPLICATIONS & APPROVALS */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {(['all', 'under_review', 'approved', 'rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setAppFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    appFilter === tab
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'all' ? 'All Applicants' :
                   tab === 'under_review' ? `Pending Review (${pendingApps.length})` :
                   tab === 'approved' ? `Approved (${approvedApps.length})` : 'Rejected'}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchApp}
                onChange={e => setSearchApp(e.target.value)}
                placeholder="Search by name, phone, city…"
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1E4FA8]"
              />
            </div>
          </div>

          {/* Applications Table / Cards */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-black uppercase text-[10px]">
                  <th className="py-3 px-3">Partner Applicant</th>
                  <th className="py-3 px-3">Profession & City</th>
                  <th className="py-3 px-3">Payout UPI / Bank</th>
                  <th className="py-3 px-3">Submitted</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No applications match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => {
                    const isPending = app.status === 'under_review';
                    const isApproved = app.status === 'approved';

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-3">
                          <p className="font-black text-slate-900 text-sm">{app.fullName}</p>
                          <p className="font-mono text-slate-500 font-bold">{app.mobile}</p>
                          <p className="text-[11px] text-slate-400">{app.email}</p>
                        </td>

                        <td className="py-3.5 px-3">
                          <p className="font-bold text-slate-800">{app.profession || 'Partner'}</p>
                          <p className="text-slate-500">{app.city}, {app.state}</p>
                          <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            ID: {app.affiliateId}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-mono">
                          {app.upiId ? (
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 block max-w-xs truncate">
                              {app.upiId}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Not added</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-slate-500">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            isApproved 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : isPending 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                          {isPending ? (
                            <>
                              <button
                                onClick={() => handleApproveApp(app)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs transition-all inline-flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                              </button>
                              <button
                                onClick={() => handleRejectApp(app)}
                                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-all inline-flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Reject
                              </button>
                            </>
                          ) : isApproved ? (
                            <a
                              href={`https://wa.me/${app.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(app.fullName)},%20your%20Auricity%20Affiliate%20Partner%20account%20(ID:%20${app.affiliateId})%20is%20APPROVED!%20You%20can%20now%20login%20to%20send%20property%20leads%20and%20earn%20commissions.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs border border-emerald-200 inline-flex items-center gap-1"
                            >
                              <PhoneCall className="w-3 h-3 text-emerald-600" /> WhatsApp Access
                            </a>
                          ) : (
                            <button
                              onClick={() => handleApproveApp(app)}
                              className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                            >
                              Re-activate
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: REFERRED PROPERTIES (OWNER LEADS & DEAL TRACKER) */}
      {activeSubTab === 'referrals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'Open', 'Owner Contacted', 'In Negotiation', 'Sold / Deal Closed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setDealFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                    dealFilter === tab
                      ? 'bg-[#1E4FA8] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'all' ? 'All Referrals' : tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchDeal}
                onChange={e => setSearchDeal(e.target.value)}
                placeholder="Search property, owner, phone…"
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1E4FA8]"
              />
            </div>
          </div>

          {/* Referrals Cards Grid */}
          <div className="space-y-4">
            {filteredRefs.length === 0 ? (
              <div className="py-10 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                No property referrals match this filter.
              </div>
            ) : (
              filteredRefs.map(ref => {
                const isClosed = ref.dealStatus === 'Sold / Deal Closed';
                const isPaid = ref.payoutStatus === 'Paid';

                return (
                  <div
                    key={ref.id}
                    className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-blue-300 transition-all space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-[#1E4FA8] text-[10px] font-black uppercase">
                            {ref.propertyType}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                            {ref.listingNature}
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-bold">{ref.id}</span>
                          <span className="text-xs text-slate-400">• Sent by {ref.affiliateName} ({ref.affiliatePhone})</span>
                        </div>

                        <h3 className="font-black text-base text-slate-900 mt-1">
                          {ref.propertyTitle}
                        </h3>

                        <p className="text-xs text-slate-600">
                          <strong>Locality:</strong> {ref.locality} {ref.address ? `• ${ref.address}` : ''} • <strong>Expected Price:</strong> <span className="font-black text-[#1E4FA8]">{ref.expectedPrice}</span>
                        </p>
                      </div>

                      {/* Status & Payout Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${
                          isClosed 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : ref.dealStatus === 'In Negotiation'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          ● {ref.dealStatus}
                        </span>

                        {ref.commissionReward && ref.commissionReward > 0 && (
                          <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                            isPaid ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-950'
                          }`}>
                            <Wallet className="w-3.5 h-3.5" />
                            Reward: ₹{ref.commissionReward.toLocaleString('en-IN')} ({ref.payoutStatus})
                          </span>
                        )}

                        <button
                          onClick={() => setEditingRef({ ...ref })}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-xs"
                        >
                          Update Deal & Commission
                        </button>
                      </div>
                    </div>

                    {/* OWNER DETAILS BOX - Prominently accessible as requested by the user */}
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                          Property Owner's Direct Contact (Auricity Exclusive)
                        </span>
                        <p className="font-black text-slate-900 text-sm">
                          {ref.ownerName}
                        </p>
                        <p className="font-mono text-slate-700 text-xs font-bold flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-amber-700" />
                          {ref.ownerPhone}
                        </p>
                        {ref.additionalNotes && (
                          <p className="text-xs text-amber-900 italic mt-1 bg-white/70 p-2 rounded-xl">
                            "{ref.additionalNotes}"
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Call Owner */}
                        <a
                          href={`tel:${ref.ownerPhone}`}
                          className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-amber-100"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-700" /> Call Owner
                        </a>

                        {/* WhatsApp Owner */}
                        <a
                          href={`https://wa.me/${ref.ownerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(ref.ownerName)},%20I%20am%20calling%20from%20Auricity%20regarding%20your%20property%20listing%20(${encodeURIComponent(ref.propertyTitle)}).%20We%20have%20verified%20buyers%20interested.`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-xs"
                        >
                          <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Owner
                        </a>

                        {/* Convert to public listing */}
                        <button
                          onClick={() => handlePublishAsListing(ref)}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                          title="Add this property directly to live website inventory"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add to Website Inventory
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: COMMISSION PAYOUTS & FINANCE */}
      {activeSubTab === 'payouts' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-2">
            <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">
              Affiliate Reward Ledger
            </span>
            <h3 className="text-xl font-black">
              Total Affiliate Commissions: ₹{totalCommissionsEarned.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-slate-300">
              When a referred property sells, update the deal status to "Sold / Deal Closed", enter the agreed affiliate reward amount, and record the UPI transaction ID.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-black uppercase text-[10px]">
                  <th className="py-3 px-3">Referral Property</th>
                  <th className="py-3 px-3">Affiliate Partner</th>
                  <th className="py-3 px-3">Sale Deal Price</th>
                  <th className="py-3 px-3">Reward / Commission</th>
                  <th className="py-3 px-3">Payout Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {referrals.map(ref => (
                  <tr key={ref.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <p className="font-black text-slate-900">{ref.propertyTitle}</p>
                      <p className="text-slate-400 font-mono text-[11px]">{ref.id}</p>
                    </td>

                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-800">{ref.affiliateName}</p>
                      <p className="font-mono text-emerald-700 text-[11px] font-bold">{ref.affiliateUpi || 'No UPI'}</p>
                    </td>

                    <td className="py-3 px-3 font-black text-slate-900">
                      {ref.dealAmount ? `₹${(ref.dealAmount / 100000).toFixed(2)} Lakh` : ref.expectedPrice}
                    </td>

                    <td className="py-3 px-3 font-black text-[#1E4FA8]">
                      {ref.commissionReward ? `₹${ref.commissionReward.toLocaleString('en-IN')}` : 'To be calculated'}
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        ref.payoutStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ref.dealStatus === 'Sold / Deal Closed'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {ref.payoutStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setEditingRef({ ...ref })}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                      >
                        Edit Payout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DEAL STATUS & COMMISSION PAYOUT */}
      {editingRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-[#1E4FA8] tracking-wider">
                  Deal & Commission Settlement
                </span>
                <h3 className="font-black text-lg text-slate-900">
                  {editingRef.propertyTitle}
                </h3>
              </div>
              <button
                onClick={() => setEditingRef(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDealDetails} className="space-y-4 text-xs">
              <div>
                <label className="font-black text-slate-800 block mb-1">Deal Lifecycle Status</label>
                <select
                  value={editingRef.dealStatus}
                  onChange={e => setEditingRef({ ...editingRef, dealStatus: e.target.value as ReferralDealStatus })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
                >
                  <option value="Open">Open (New Referral)</option>
                  <option value="Owner Contacted">Owner Contacted & Verified</option>
                  <option value="Site Visit">Site Visit with Buyers Scheduled</option>
                  <option value="In Negotiation">In Negotiation with Buyer</option>
                  <option value="Sold / Deal Closed">Sold / Deal Closed (Eligible for Commission!)</option>
                  <option value="Dropped">Dropped (Not Viable)</option>
                </select>
              </div>

              {/* Deal Amount & Commission */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black text-slate-800 block mb-1">Final Sale Amount (₹)</label>
                  <input
                    type="number"
                    value={editingRef.dealAmount || ''}
                    onChange={e => setEditingRef({ ...editingRef, dealAmount: Number(e.target.value) })}
                    placeholder="e.g. 6500000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-black text-slate-800 block mb-1">Affiliate Reward (₹)</label>
                  <input
                    type="number"
                    value={editingRef.commissionReward || ''}
                    onChange={e => setEditingRef({ ...editingRef, commissionReward: Number(e.target.value) })}
                    placeholder="e.g. 25000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-black text-emerald-700"
                  />
                </div>
              </div>

              {/* Payout Status & UPI Ref */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <span className="text-[10px] font-black uppercase text-emerald-800 block">
                  Commission Payout to {editingRef.affiliateName}
                </span>
                <p className="text-[11px] text-emerald-900">
                  Affiliate UPI: <span className="font-mono font-bold">{editingRef.affiliateUpi || 'Ask affiliate for UPI ID'}</span>
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-black text-slate-800 block mb-1">Payout Status</label>
                    <select
                      value={editingRef.payoutStatus}
                      onChange={e => setEditingRef({ ...editingRef, payoutStatus: e.target.value as ReferralPayoutStatus })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-900 font-bold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Paid">Paid (Credited via UPI)</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-black text-slate-800 block mb-1">UPI Transaction / UTR Ref</label>
                    <input
                      type="text"
                      value={editingRef.payoutTxId || ''}
                      onChange={e => setEditingRef({ ...editingRef, payoutTxId: e.target.value })}
                      placeholder="e.g. UPI-260920-12345"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-black text-slate-800 block mb-1">Admin Notes / Updates</label>
                <textarea
                  rows={2}
                  value={editingRef.adminNotes || ''}
                  onChange={e => setEditingRef({ ...editingRef, adminNotes: e.target.value })}
                  placeholder="e.g. Token completed. Deed scheduled for Friday."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRef(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-md"
                >
                  Save & Update Affiliate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
