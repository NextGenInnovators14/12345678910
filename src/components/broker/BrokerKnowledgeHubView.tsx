import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  BookOpen, 
  MessageSquare, 
  Send, 
  FileText, 
  Download, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  ArrowLeft, 
  Share2, 
  AlertCircle,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { TrainingBlog } from '../../types';

export const BrokerKnowledgeHubView: React.FC = () => {
  const { 
    currentUser, 
    activeRole, 
    setActiveView, 
    trainingBlogs, 
    brokerMessages, 
    sendBrokerMessage, 
    getBrokerAccessStatus, 
    requestBrokerAccess,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'training' | 'chat' | 'resources'>('training');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<TrainingBlog | null>(null);

  // Chat state
  const [chatMessage, setChatMessage] = useState('');

  // Access check
  const isBroker = activeRole === 'broker';
  const isAdmin = activeRole === 'admin';
  const brokerId = currentUser?.id || 'realtor-01';
  const accessStatus = isAdmin ? 'approved' : getBrokerAccessStatus(brokerId);
  const isApproved = isAdmin || accessStatus === 'approved';
  const isPending = accessStatus === 'pending';

  // State for request access if not requested
  const [requestName, setRequestName] = useState(currentUser?.name || '');
  const [requestPhone, setRequestPhone] = useState(currentUser?.phone || '');
  const [requestAgency, setRequestAgency] = useState('');
  const [requestRera, setRequestRera] = useState('');

  const handleSendAdminMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    sendBrokerMessage({
      brokerId: currentUser?.id || 'realtor-01',
      brokerName: currentUser?.name || 'Verified Broker',
      senderRole: 'broker',
      message: chatMessage.trim()
    });

    setChatMessage('');
    showToast('Question sent to Super Admin desk. You will receive real-time answers here.', 'success');
  };

  const handleRequestAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName || !requestPhone) {
      showToast('Please provide your name and phone number.', 'warning');
      return;
    }
    requestBrokerAccess({
      brokerId: currentUser?.id || `broker-${Date.now()}`,
      brokerName: requestName,
      agencyName: requestAgency || 'Independent Realtor',
      phone: requestPhone,
      email: currentUser?.email || 'broker@auricity.com',
      reraNumber: requestRera || 'Applied for MahaRERA'
    });
  };

  // Filtered Training Blogs
  const categories = ['All', 'Sales Strategy', 'RERA Compliance', 'Client Handling', 'Marketing Mastery', 'AURIC Industrial'];
  
  const filteredBlogs = trainingBlogs.filter(blog => {
    const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered direct chat messages between this broker and admin
  const currentBrokerMessages = brokerMessages.filter(m => m.brokerId === brokerId || m.brokerId === 'realtor-01');

  // IF NOT APPROVED: GATED SCREEN
  if (!isApproved) {
    return (
      <div className="min-h-screen bg-[var(--surface-secondary)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Lock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Private & Gated Desk
            </span>
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Auricity Brokers Career & Development
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This masterclass hub contains proprietary deal playbooks, MahaRERA litigation defense kits, and an encrypted 1-on-1 advisory desk with the Auricity Super Admin.
            </p>
          </div>

          {isPending ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left space-y-3">
              <div className="flex items-center space-x-2 text-amber-800 font-black text-sm">
                <Clock className="w-5 h-5 text-amber-600 animate-spin" />
                <span>Access Request Under Review</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Your broker profile is currently being verified against Maharashtra Real Estate Regulatory Authority records by our Super Admin team.
              </p>
              <div className="pt-2 flex justify-between items-center text-[11px] font-bold text-amber-800">
                <span>Status: Verification Queue #02</span>
                <span>Expected Unlock: &lt; 2 Hours</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRequestAccessSubmit} className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 text-left space-y-4">
              <h3 className="text-xs font-black text-[#1E4FA8] uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Instant Authorization Request</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="e.g. Sunil Kulkarni"
                    className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-xs font-bold text-[var(--text-primary)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={requestPhone}
                      onChange={(e) => setRequestPhone(e.target.value)}
                      placeholder="+91 98220 00000"
                      className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-xs font-mono text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">MahaRERA No.</label>
                    <input
                      type="text"
                      value={requestRera}
                      onChange={(e) => setRequestRera(e.target.value)}
                      placeholder="A5150000XXXX"
                      className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-xs font-mono text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E4FA8] hover:bg-[#163a7d] text-white font-black text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Request Broker Access Now</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-center space-x-4">
            <button
              onClick={() => setActiveView('home')}
              className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Homepage</span>
            </button>
            <button
              onClick={() => setActiveView('knowledge-hub')}
              className="text-xs font-bold text-[#1E4FA8] hover:underline cursor-pointer"
            >
              Browse Public Knowledge Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED / APPROVED BROKER PORTAL
  return (
    <div className="min-h-screen bg-[var(--surface-secondary)] pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1E4FA8] via-[#163a7d] to-[#0f2857] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setActiveView('home')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-blue-200 hover:text-white bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black">
                <Unlock className="w-3.5 h-3.5" />
                <span>Verified Broker Privileges Active</span>
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>MahaRERA Certified Broker Academy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Brokers Career & Development Hub
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
              Exclusive tactical training, commercial deal underwriting frameworks, Sambhajinagar industrial land playbooks, and direct advisory hotline with Super Admin.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 pt-4 border-t border-white/10 overflow-x-auto">
            <button
              onClick={() => { setActiveTab('training'); setSelectedArticle(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
                activeTab === 'training'
                  ? 'bg-white text-[#1E4FA8] shadow-md'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Training Modules & Playbooks ({trainingBlogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-[#1E4FA8] shadow-md'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Super Admin Direct Desk ({currentBrokerMessages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
                activeTab === 'resources'
                  ? 'bg-white text-[#1E4FA8] shadow-md'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Legal Kits & Downloads</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB 1: TRAINING PLAYBOOKS & MODULES */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            
            {/* If Single Article is Selected */}
            {selectedArticle ? (
              <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 sm:p-10 space-y-6 shadow-sm">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="inline-flex items-center space-x-1.5 text-xs font-black text-[#1E4FA8] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all Training Modules</span>
                </button>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-blue-100 text-[#1E4FA8] font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedArticle.category}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] flex items-center space-x-1 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedArticle.readTime} read</span>
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] font-mono">
                      Published: {selectedArticle.publishDate}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight">
                    {selectedArticle.title}
                  </h2>

                  <p className="text-sm font-bold text-[var(--text-secondary)] border-l-4 border-[#F2621E] pl-4 italic">
                    {selectedArticle.summary}
                  </p>
                </div>

                {selectedArticle.coverImage && (
                  <div className="rounded-2xl overflow-hidden h-72 sm:h-96 w-full bg-slate-900">
                    <img 
                      src={selectedArticle.coverImage} 
                      alt={selectedArticle.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="prose max-w-none text-[var(--text-primary)] text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                  {selectedArticle.content}
                </div>

                {/* Key Takeaway box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
                  <h4 className="font-black text-xs uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Broker Action Checklist</span>
                  </h4>
                  <ul className="text-xs text-emerald-900 space-y-1.5 list-disc list-inside">
                    <li>Always cross-check the CTS / Survey number on the Maharashtra Revenue Portal (Mahabhulekh) before token signing.</li>
                    <li>Ensure both seller and buyer have executed standard 15-day title search notices in two local newspapers.</li>
                    <li>Utilize Auricity's 100% verified agreement format for zero-dispute commission clearance.</li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="btn-theme-primary text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center space-x-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Ask Super Admin About This Playbook</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Playbook link copied to clipboard', 'info');
                      }
                    }}
                    className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#1E4FA8] cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Search & Category Filter Bar */}
                <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search training modules..."
                        className="w-full pl-9 pr-4 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                      />
                    </div>

                    <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                            selectedCategory === cat
                              ? 'bg-[#1E4FA8] text-white shadow-xs'
                              : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      onClick={() => setSelectedArticle(blog)}
                      className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="relative h-44 bg-slate-800 overflow-hidden">
                        <img
                          src={blog.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#F2621E] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                            {blog.category}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-[11px] font-bold">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{blog.readTime}</span>
                          </span>
                          <span className="text-amber-300 font-mono">Module #{blog.id.slice(-2)}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-black text-sm text-[var(--text-primary)] group-hover:text-[#1E4FA8] transition-colors leading-snug line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                            {blog.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-black text-[#1E4FA8]">
                          <span>Read Full Playbook</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        )}

        {/* TAB 2: DIRECT CHAT WITH SUPER ADMIN */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-md overflow-hidden flex flex-col h-[650px]">
            {/* Desk Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F2621E] text-white flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm">Super Admin Broker Hotline</h3>
                  <p className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Support & Legal Verification Desk</span>
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Encrypted Real-Time Thread
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--surface-secondary)]/40">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-[#1E4FA8] space-y-1">
                <div className="font-black flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Welcome to the Auricity Broker Direct Desk</span>
                </div>
                <p className="text-slate-600">
                  Ask our legal team for quick title validations, draft agreement reviews, or custom commission escrow confirmations for transactions in Chhatrapati Sambhajinagar.
                </p>
              </div>

              {currentBrokerMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.senderRole === 'broker' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--text-secondary)] mb-1 px-1">
                    <span>{msg.senderRole === 'broker' ? 'You (Verified Broker)' : 'Super Admin / Legal Desk'}</span>
                    <span>•</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div
                    className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                      msg.senderRole === 'broker'
                        ? 'bg-[#1E4FA8] text-white rounded-tr-xs'
                        : 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-xs'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendAdminMessage} className="p-4 bg-[var(--surface)] border-t border-[var(--border)] flex items-center space-x-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your question or deal query to Super Admin..."
                className="flex-1 px-4 py-3 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-2xl text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#1E4FA8]"
              />
              <button
                type="submit"
                disabled={!chatMessage.trim()}
                className="btn-theme-primary text-white font-black text-xs px-5 py-3 rounded-2xl shadow-md cursor-pointer transition-all flex items-center space-x-1.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: LEGAL KITS & DOWNLOADS */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1E4FA8] flex items-center justify-center font-black">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-[var(--text-primary)]">
                    MahaRERA Agreement for Sale Template
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Standardized Marathi & English bilateral contract compliant with MahaRERA Section 13 rules.
                  </p>
                </div>
                <button
                  onClick={() => showToast('MahaRERA bilateral agreement template downloaded (.DOCX)', 'success')}
                  className="w-full bg-[var(--surface-secondary)] hover:bg-[#1E4FA8] text-[var(--text-primary)] hover:text-white text-xs font-black py-2.5 px-4 rounded-xl border border-[var(--border)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .DOCX (2.4 MB)</span>
                </button>
              </div>

              <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-[var(--text-primary)]">
                    30-Year Title Search & Encumbrance Checklist
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Step-by-step verification checklist for 7/12 extract mutation entries, NA orders, and sub-registrar search.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Title Search checklist downloaded (.PDF)', 'success')}
                  className="w-full bg-[var(--surface-secondary)] hover:bg-[#1E4FA8] text-[var(--text-primary)] hover:text-white text-xs font-black py-2.5 px-4 rounded-xl border border-[var(--border)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .PDF (1.1 MB)</span>
                </button>
              </div>

              <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-[var(--text-primary)]">
                    AURIC Shendra-Bidkin Industrial Pitch Deck
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Corporate presentation deck for pitching plug-and-play DMIC land parcels to MNC clients.
                  </p>
                </div>
                <button
                  onClick={() => showToast('AURIC Pitch Deck downloaded (.PPTX)', 'success')}
                  className="w-full bg-[var(--surface-secondary)] hover:bg-[#1E4FA8] text-[var(--text-primary)] hover:text-white text-xs font-black py-2.5 px-4 rounded-xl border border-[var(--border)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .PPTX (8.7 MB)</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
