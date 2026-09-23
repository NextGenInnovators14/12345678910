import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Lock, 
  Unlock, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Send
} from 'lucide-react';

interface KnowledgeHubSectionProps {
  onOpenArticleReader?: (articleId: string) => void;
}

export const KnowledgeHubSection: React.FC<KnowledgeHubSectionProps> = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('knowledgeHub', "Auricity's Knowledge Hub", 'Guides, market insights and practical real-estate knowledge.');
  const { 
    knowledgeHubConfig, 
    currentUser, 
    activeRole, 
    setActiveView, 
    setActiveRole,
    getBrokerAccessStatus, 
    requestBrokerAccess,
    showToast 
  } = useApp();

  const [showBrokerRequestModal, setShowBrokerRequestModal] = useState(false);
  const [requestName, setRequestName] = useState(currentUser?.name || '');
  const [requestPhone, setRequestPhone] = useState(currentUser?.phone || '+91 ');
  const [requestEmail, setRequestEmail] = useState(currentUser?.email || '');
  const [requestAgency, setRequestAgency] = useState('');
  const [requestRera, setRequestRera] = useState('');

  // Determine broker authorization status
  const isBroker = activeRole === 'broker';
  const isAdmin = activeRole === 'admin';
  const brokerStatus = currentUser?.id ? getBrokerAccessStatus(currentUser.id) : (isBroker ? 'pending' : 'not_requested');
  const isApproved = isAdmin || (isBroker && brokerStatus === 'approved');
  const isPending = isBroker && brokerStatus === 'pending';

  const handleCard1Click = () => {
    if (!currentUser && !isBroker) {
      // 1. Not logged in -> Route to Broker Auth / Broker Hub
      setActiveRole('broker');
      setActiveView('broker-hub');
      showToast('Please sign in or register as an Auricity Broker to access private masterclasses.', 'info');
      return;
    }

    if (isApproved) {
      // 2. Approved -> Enter private broker knowledge hub
      setActiveView('broker-knowledge-hub');
      return;
    }

    if (isPending) {
      // 3. Pending
      showToast('Your broker access request is currently under Super Admin review. You will receive an instant unlock once verified.', 'info');
      return;
    }

    // 4. Logged in as broker, not requested yet -> Open request modal
    setShowBrokerRequestModal(true);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName || !requestPhone) {
      showToast('Please enter your full name and mobile number', 'warning');
      return;
    }

    requestBrokerAccess({
      brokerId: currentUser?.id || `broker-${Date.now()}`,
      brokerName: requestName,
      agencyName: requestAgency || 'Independent Consultant',
      phone: requestPhone,
      email: requestEmail || `${requestName.toLowerCase().replace(/\s+/g, '')}@auricity.com`,
      reraNumber: requestRera || 'Applied for MahaRERA'
    });

    setShowBrokerRequestModal(false);
  };

  const { titleCard, card1Broker, card2BuyersGuide, card3TrendsNews } = knowledgeHubConfig;

  return (
    <section className="py-12 bg-[var(--surface-secondary)]/50 border-y border-[var(--border)] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E4FA8]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F2621E]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Title Card on Left + 3 Content Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: TITLE CARD (Brand Blue Background) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#1E4FA8] via-[#163a7d] to-[#0f2857] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Subtle overlay effect */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F2621E]/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 p-6 opacity-15 pointer-events-none">
              <BookOpen className="w-24 h-24 text-white" />
            </div>

            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center space-x-1.5 bg-white/15 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F2621E]" />
                <span>{titleCard.badge || "Auricity's Knowledge Hub"}</span>
              </span>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  {homeHeading || titleCard.heading || "Auricity's Knowledge Hub"}
                </h2>
                <h3 className="text-sm font-bold text-blue-200 mt-1">
                  {titleCard.subheading || 'Blogs, News & Articles'}
                </h3>
              </div>

              <p className="text-xs text-blue-100/90 leading-relaxed font-normal">
                {homeSubheading || titleCard.description || 'Expert insights, RERA compliance advisories, local market trends, and private training modules for certified brokers.'}
              </p>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-white/15">
              <button
                onClick={() => setActiveView('knowledge-hub')}
                className="w-full bg-[#F2621E] hover:bg-[#d95316] text-white font-black text-xs px-4 py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer group/btn"
              >
                <span>{titleCard.ctaText || 'Explore Knowledge Hub'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT: 3 CONTENT CARDS ROW */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: AURICITY BROKERS CAREER & DEVELOPMENT (Gated / Private) */}
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
              {/* Top Cover Image with Gated Badge */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={card1Broker.coverImage}
                  alt={card1Broker.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Gated Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md ${
                    isApproved 
                      ? 'bg-emerald-500/90 text-white border border-emerald-400/40' 
                      : isPending
                      ? 'bg-amber-500/90 text-white border border-amber-400/40'
                      : 'bg-red-500/90 text-white border border-red-400/40'
                  }`}>
                    {isApproved ? (
                      <>
                        <Unlock className="w-3 h-3" />
                        <span>Broker Unlocked</span>
                      </>
                    ) : isPending ? (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        <span>Approval Pending</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>{card1Broker.badge || 'Private & Gated'}</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MahaRERA & Broker Academy</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[var(--text-primary)] group-hover:text-[#1E4FA8] transition-colors leading-snug line-clamp-2">
                    {card1Broker.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {card1Broker.description}
                  </p>
                </div>

                {/* Card Action Button */}
                <div className="pt-2 border-t border-[var(--border)]">
                  {(!currentUser && !isBroker) ? (
                    <button
                      onClick={handleCard1Click}
                      className="w-full bg-[#1E4FA8] hover:bg-[#163a7d] text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{card1Broker.buttonTextNotLoggedIn || 'Get Access'}</span>
                    </button>
                  ) : isApproved ? (
                    <button
                      onClick={handleCard1Click}
                      className="w-full bg-[#F2621E] hover:bg-[#d95316] text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>{card1Broker.buttonTextApproved || 'Enter Knowledge Hub'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : isPending ? (
                    <button
                      disabled
                      className="w-full bg-amber-100 text-amber-800 text-xs font-black py-2.5 px-4 rounded-xl border border-amber-300 flex items-center justify-center space-x-1.5 opacity-90 cursor-not-allowed"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                      <span>{card1Broker.buttonTextPending || 'Pending Admin Approval'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCard1Click}
                      className="w-full btn-theme-primary text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{card1Broker.buttonTextRequestAccess || 'Request Access'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* CARD 2: REAL ESTATE BUYERS GUIDE (PUBLIC) */}
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              {/* Top Cover Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={card2BuyersGuide.coverImage}
                  alt={card2BuyersGuide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    <FileText className="w-3 h-3" />
                    <span>{card2BuyersGuide.badge || 'Buyers Guide'}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Apartments, Plots & Resale</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[var(--text-primary)] group-hover:text-[#1E4FA8] transition-colors leading-snug line-clamp-2">
                    {card2BuyersGuide.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {card2BuyersGuide.description}
                  </p>
                </div>

                {/* Action */}
                <div className="pt-2 border-t border-[var(--border)]">
                  <button
                    onClick={() => setActiveView('knowledge-hub')}
                    className="w-full bg-[var(--surface-secondary)] hover:bg-[#1E4FA8] text-[var(--text-primary)] hover:text-white text-xs font-black py-2.5 px-4 rounded-xl border border-[var(--border)] hover:border-[#1E4FA8] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{card2BuyersGuide.buttonText || 'Read More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3: REAL ESTATE TRENDS & NEWS (PUBLIC) */}
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              {/* Top Cover Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={card3TrendsNews.coverImage}
                  alt={card3TrendsNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 bg-[#1E4FA8]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    <TrendingUp className="w-3 h-3" />
                    <span>{card3TrendsNews.badge || 'Market Insights'}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider flex items-center space-x-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Sambhajinagar & AURIC Growth</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[var(--text-primary)] group-hover:text-[#1E4FA8] transition-colors leading-snug line-clamp-2">
                    {card3TrendsNews.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {card3TrendsNews.description}
                  </p>
                </div>

                {/* Action */}
                <div className="pt-2 border-t border-[var(--border)]">
                  <button
                    onClick={() => setActiveView('knowledge-hub')}
                    className="w-full bg-[var(--surface-secondary)] hover:bg-[#1E4FA8] text-[var(--text-primary)] hover:text-white text-xs font-black py-2.5 px-4 rounded-xl border border-[var(--border)] hover:border-[#1E4FA8] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{card3TrendsNews.buttonText || 'Read More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* REQUEST BROKER ACCESS MODAL */}
      {showBrokerRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-lg rounded-3xl border border-[var(--border)] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1E4FA8] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[var(--text-primary)]">
                  Request Broker Career Hub Access
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Super Admin unlocks private training modules, deal playbooks & direct messaging desk.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  placeholder="e.g. Rajesh Patil"
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={requestPhone}
                    onChange={(e) => setRequestPhone(e.target.value)}
                    placeholder="+91 98220 12345"
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-mono text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder="broker@example.com"
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Agency / Consultancy Name</label>
                  <input
                    type="text"
                    value={requestAgency}
                    onChange={(e) => setRequestAgency(e.target.value)}
                    placeholder="e.g. Marathwada Real Estates"
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">MahaRERA Reg. Number</label>
                  <input
                    type="text"
                    value={requestRera}
                    onChange={(e) => setRequestRera(e.target.value)}
                    placeholder="A5150000XXXX"
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-mono text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl text-[11px] text-[#1E4FA8] flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  By requesting access, you agree to Auricity's verified broker code of conduct and RERA transparency standards.
                </span>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowBrokerRequestModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-theme-primary text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
