import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { 
  BookOpen, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Save, 
  RefreshCw, 
  Image as ImageIcon, 
  FileText, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Plus, 
  Send,
  Sparkles,
  Search,
  Check,
  AlertTriangle
} from 'lucide-react';
import { KnowledgeHubConfig, TrainingBlog, BlogPost } from '../../../types';

export const KnowledgeHubManager: React.FC = () => {
  const {
    knowledgeHubConfig,
    updateKnowledgeHubConfig,
    brokerAccessRequests,
    updateBrokerAccessRequestStatus,
    deleteBrokerAccessRequest,
    trainingBlogs,
    addTrainingBlog,
    updateTrainingBlog,
    deleteTrainingBlog,
    cmsBlogs,
    addCmsBlog,
    updateCmsBlog,
    deleteCmsBlog,
    brokerMessages,
    sendBrokerMessage,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'cards' | 'requests' | 'broker-blogs' | 'chat'>('requests');

  // Local Form state for 4 Cards CMS
  const [formData, setFormData] = useState<KnowledgeHubConfig>(knowledgeHubConfig);
  const [isSaving, setIsSaving] = useState(false);

  // Request Queue Filter & Search
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [requestSearch, setRequestSearch] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState<{ [id: string]: string }>({});

  // Training Blog Editor State
  const [editingTrainingBlog, setEditingTrainingBlog] = useState<Partial<TrainingBlog> | null>(null);
  const [isCreatingTrainingBlog, setIsCreatingTrainingBlog] = useState(false);
  useModalBackHandler(isCreatingTrainingBlog, () => setIsCreatingTrainingBlog(false));

  // Admin Chat State
  const [selectedBrokerForChat, setSelectedBrokerForChat] = useState<string>('realtor-01');
  const [adminReplyText, setAdminReplyText] = useState('');

  // Handle Cards Save
  const handleSaveCardsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateKnowledgeHubConfig(formData);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Knowledge Hub cards & content settings saved successfully!', 'success');
    }, 300);
  };

  // Filter requests
  const filteredRequests = brokerAccessRequests.filter(req => {
    const matchesFilter = requestFilter === 'all' || req.status === requestFilter;
    const matchesSearch = !requestSearch || 
      req.brokerName.toLowerCase().includes(requestSearch.toLowerCase()) ||
      (req.agencyName && req.agencyName.toLowerCase().includes(requestSearch.toLowerCase())) ||
      req.phone.includes(requestSearch) ||
      (req.reraNumber && req.reraNumber.toLowerCase().includes(requestSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const pendingCount = brokerAccessRequests.filter(r => r.status === 'pending').length;

  // Handle Training Blog Save
  const handleSaveTrainingBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrainingBlog?.title || !editingTrainingBlog?.summary) {
      showToast('Title and Summary are required', 'warning');
      return;
    }

    if (isCreatingTrainingBlog) {
      const newBlog: TrainingBlog = {
        id: `tb-${Date.now()}`,
        title: editingTrainingBlog.title || 'Untitled Training Playbook',
        category: editingTrainingBlog.category || 'Sales Strategy',
        readTime: editingTrainingBlog.readTime || '5 min',
        publishDate: new Date().toISOString().split('T')[0],
        summary: editingTrainingBlog.summary || '',
        content: editingTrainingBlog.content || 'Content coming soon.',
        coverImage: editingTrainingBlog.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        author: editingTrainingBlog.author || 'Auricity Legal & Strategy Desk'
      };
      addTrainingBlog(newBlog);
      showToast('Broker training playbook created!', 'success');
    } else if (editingTrainingBlog?.id) {
      updateTrainingBlog(editingTrainingBlog.id, editingTrainingBlog);
      showToast('Broker training playbook updated!', 'success');
    }

    setEditingTrainingBlog(null);
    setIsCreatingTrainingBlog(false);
  };

  // Handle Admin Chat Reply
  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim()) return;

    sendBrokerMessage({
      brokerId: selectedBrokerForChat,
      brokerName: 'Super Admin',
      senderRole: 'admin',
      message: adminReplyText.trim()
    });

    setAdminReplyText('');
    showToast('Reply dispatched to broker thread.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Sub-Tabs */}
      <div className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E4FA8] to-[#163a7d] text-white flex items-center justify-center font-black">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)]">
                Knowledge Hub & Gated Broker Access CMS
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Manage Section Cards, Broker Authorization Approvals, Training Playbooks & Support Chat.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Pending Approvals:
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black ${
              pendingCount > 0 ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {pendingCount} Pending
            </span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center space-x-2 pt-2 border-t border-[var(--border)] overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
              activeSubTab === 'requests'
                ? 'bg-[#1E4FA8] text-white shadow-xs'
                : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Broker Access Requests ({brokerAccessRequests.length})</span>
            {pendingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('cards')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
              activeSubTab === 'cards'
                ? 'bg-[#1E4FA8] text-white shadow-xs'
                : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Section Cards & Layout Editor</span>
          </button>

          <button
            onClick={() => setActiveSubTab('broker-blogs')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
              activeSubTab === 'broker-blogs'
                ? 'bg-[#1E4FA8] text-white shadow-xs'
                : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Broker Training Playbooks ({trainingBlogs.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer transition-all ${
              activeSubTab === 'chat'
                ? 'bg-[#1E4FA8] text-white shadow-xs'
                : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Broker Direct Chat Desk ({brokerMessages.length})</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: BROKER ACCESS REQUESTS QUEUE */}
      {activeSubTab === 'requests' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={requestSearch}
                onChange={(e) => setRequestSearch(e.target.value)}
                placeholder="Search broker name, agency, RERA..."
                className="w-full pl-9 pr-4 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRequestFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer transition-all ${
                    requestFilter === filter
                      ? 'bg-[#1E4FA8] text-white'
                      : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="bg-[var(--surface)] p-12 text-center rounded-3xl border border-[var(--border)] text-slate-400 text-xs font-bold">
                No broker access requests found matching your filter criteria.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-xs space-y-4 hover:border-[#1E4FA8]/50 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1E4FA8] flex items-center justify-center font-black shrink-0">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-black text-sm text-[var(--text-primary)]">
                            {req.brokerName}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            req.status === 'approved' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : req.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-red-100 text-red-800 border border-red-300'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] font-bold mt-0.5">
                          {req.agencyName || 'Independent Real Estate Consultant'}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-secondary)] mt-1.5 font-mono">
                          <span>Phone: {req.phone}</span>
                          <span>•</span>
                          <span>Email: {req.email}</span>
                          {req.reraNumber && (
                            <>
                              <span>•</span>
                              <span className="text-[#1E4FA8] font-bold">RERA: {req.reraNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-[var(--text-secondary)] font-mono">
                      <div>Requested: {new Date(req.requestedAt).toLocaleDateString()}</div>
                      {req.reviewedAt && (
                        <div className="text-slate-400">Reviewed: {new Date(req.reviewedAt).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>

                  {/* Notes / Admin Comment */}
                  <div className="bg-[var(--surface-secondary)] p-3.5 rounded-2xl text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)]">
                      <span>Admin Verification Note:</span>
                      <span className="text-slate-400">{req.adminNotes || 'No notes yet.'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add review note (e.g. Verified MahaRERA portal record)..."
                        value={adminNoteInput[req.id] || ''}
                        onChange={(e) => setAdminNoteInput({ ...adminNoteInput, [req.id]: e.target.value })}
                        className="flex-1 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)]">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateBrokerAccessRequestStatus(req.id, 'approved', adminNoteInput[req.id])}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Access</span>
                      </button>

                      <button
                        onClick={() => updateBrokerAccessRequestStatus(req.id, 'rejected', adminNoteInput[req.id])}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject Access</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete request record for ${req.brokerName}?`)) {
                          deleteBrokerAccessRequest(req.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* SUBTAB 2: 4 CARDS & LAYOUT EDITOR */}
      {activeSubTab === 'cards' && (
        <form onSubmit={handleSaveCardsConfig} className="space-y-6">
          
          {/* Card 0: Main Left Title Card */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <h3 className="font-black text-base text-[#1E4FA8] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#F2621E]" />
              <span>Left Title Card (Brand Blue Background)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Badge</label>
                <input
                  type="text"
                  value={formData.titleCard.badge}
                  onChange={(e) => setFormData({
                    ...formData,
                    titleCard: { ...formData.titleCard, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Heading</label>
                <input
                  type="text"
                  value={formData.titleCard.heading}
                  onChange={(e) => setFormData({
                    ...formData,
                    titleCard: { ...formData.titleCard, heading: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Subheading</label>
                <input
                  type="text"
                  value={formData.titleCard.subheading}
                  onChange={(e) => setFormData({
                    ...formData,
                    titleCard: { ...formData.titleCard, subheading: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.titleCard.ctaText}
                  onChange={(e) => setFormData({
                    ...formData,
                    titleCard: { ...formData.titleCard, ctaText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.titleCard.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    titleCard: { ...formData.titleCard, description: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Card 1: Broker Career & Development (Gated) */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <h3 className="font-black text-base text-[#1E4FA8] flex items-center space-x-2">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Card 1: Broker Career & Development (PRIVATE / Gated)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Card Title</label>
                <input
                  type="text"
                  value={formData.card1Broker.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Badge</label>
                <input
                  type="text"
                  value={formData.card1Broker.badge}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Cover Image URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={formData.card1Broker.coverImage}
                    onChange={(e) => setFormData({
                      ...formData,
                      card1Broker: { ...formData.card1Broker, coverImage: e.target.value }
                    })}
                    className="flex-1 px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                  {formData.card1Broker.coverImage && (
                    <img
                      src={formData.card1Broker.coverImage}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button: Not Logged In</label>
                <input
                  type="text"
                  value={formData.card1Broker.buttonTextNotLoggedIn}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, buttonTextNotLoggedIn: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button: Request Access</label>
                <input
                  type="text"
                  value={formData.card1Broker.buttonTextRequestAccess}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, buttonTextRequestAccess: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button: Pending Approval</label>
                <input
                  type="text"
                  value={formData.card1Broker.buttonTextPending}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, buttonTextPending: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button: Approved Unlock</label>
                <input
                  type="text"
                  value={formData.card1Broker.buttonTextApproved}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, buttonTextApproved: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.card1Broker.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    card1Broker: { ...formData.card1Broker, description: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Buyers Guide (Public) */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <h3 className="font-black text-base text-[#1E4FA8] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Card 2: Real Estate Buyers Guide (PUBLIC)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Card Title</label>
                <input
                  type="text"
                  value={formData.card2BuyersGuide.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    card2BuyersGuide: { ...formData.card2BuyersGuide, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Badge</label>
                <input
                  type="text"
                  value={formData.card2BuyersGuide.badge}
                  onChange={(e) => setFormData({
                    ...formData,
                    card2BuyersGuide: { ...formData.card2BuyersGuide, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Cover Image URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={formData.card2BuyersGuide.coverImage}
                    onChange={(e) => setFormData({
                      ...formData,
                      card2BuyersGuide: { ...formData.card2BuyersGuide, coverImage: e.target.value }
                    })}
                    className="flex-1 px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                  {formData.card2BuyersGuide.coverImage && (
                    <img
                      src={formData.card2BuyersGuide.coverImage}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData.card2BuyersGuide.buttonText}
                  onChange={(e) => setFormData({
                    ...formData,
                    card2BuyersGuide: { ...formData.card2BuyersGuide, buttonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.card2BuyersGuide.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    card2BuyersGuide: { ...formData.card2BuyersGuide, description: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Trends & News (Public) */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
            <h3 className="font-black text-base text-[#1E4FA8] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#1E4FA8]" />
              <span>Card 3: Real Estate Trends & News (PUBLIC)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Card Title</label>
                <input
                  type="text"
                  value={formData.card3TrendsNews.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    card3TrendsNews: { ...formData.card3TrendsNews, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Badge</label>
                <input
                  type="text"
                  value={formData.card3TrendsNews.badge}
                  onChange={(e) => setFormData({
                    ...formData,
                    card3TrendsNews: { ...formData.card3TrendsNews, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Cover Image URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={formData.card3TrendsNews.coverImage}
                    onChange={(e) => setFormData({
                      ...formData,
                      card3TrendsNews: { ...formData.card3TrendsNews, coverImage: e.target.value }
                    })}
                    className="flex-1 px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-mono"
                  />
                  {formData.card3TrendsNews.coverImage && (
                    <img
                      src={formData.card3TrendsNews.coverImage}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData.card3TrendsNews.buttonText}
                  onChange={(e) => setFormData({
                    ...formData,
                    card3TrendsNews: { ...formData.card3TrendsNews, buttonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.card3TrendsNews.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    card3TrendsNews: { ...formData.card3TrendsNews, description: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-theme-primary text-white text-xs font-black px-8 py-3 rounded-2xl shadow-lg cursor-pointer flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Configuration...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Knowledge Hub Cards CMS</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* SUBTAB 3: BROKER TRAINING PLAYBOOKS CRUD */}
      {activeSubTab === 'broker-blogs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-[var(--text-primary)]">
              Private Broker Training Playbooks ({trainingBlogs.length})
            </h3>
            <button
              onClick={() => {
                setEditingTrainingBlog({
                  title: '',
                  category: 'Sales Strategy',
                  readTime: '6 min',
                  summary: '',
                  content: '',
                  coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
                  author: 'Auricity Legal & Strategy Desk'
                });
                setIsCreatingTrainingBlog(true);
              }}
              className="btn-theme-primary text-white text-xs font-black px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Training Playbook</span>
            </button>
          </div>

          {/* Modal / Inline Editor for Training Playbook */}
          {editingTrainingBlog && (
            <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border-2 border-[#1E4FA8] shadow-lg space-y-4">
              <h4 className="font-black text-sm text-[#1E4FA8]">
                {isCreatingTrainingBlog ? 'Create New Training Module' : 'Edit Training Module'}
              </h4>

              <form onSubmit={handleSaveTrainingBlog} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Module Title *</label>
                    <input
                      type="text"
                      required
                      value={editingTrainingBlog.title || ''}
                      onChange={(e) => setEditingTrainingBlog({ ...editingTrainingBlog, title: e.target.value })}
                      placeholder="e.g. Masterclass: Industrial Land Acquisition in AURIC"
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Category</label>
                    <select
                      value={editingTrainingBlog.category || 'Sales Strategy'}
                      onChange={(e) => setEditingTrainingBlog({ ...editingTrainingBlog, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)]"
                    >
                      <option value="Sales Strategy">Sales Strategy</option>
                      <option value="RERA Compliance">RERA Compliance</option>
                      <option value="Client Handling">Client Handling</option>
                      <option value="Marketing Mastery">Marketing Mastery</option>
                      <option value="AURIC Industrial">AURIC Industrial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Read Duration</label>
                    <input
                      type="text"
                      value={editingTrainingBlog.readTime || '5 min'}
                      onChange={(e) => setEditingTrainingBlog({ ...editingTrainingBlog, readTime: e.target.value })}
                      placeholder="e.g. 7 min"
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Cover Image URL</label>
                    <input
                      type="url"
                      value={editingTrainingBlog.coverImage || ''}
                      onChange={(e) => setEditingTrainingBlog({ ...editingTrainingBlog, coverImage: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs font-mono text-[var(--text-primary)]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Brief Summary / Takeaway *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingTrainingBlog.summary || ''}
                      onChange={(e) => setEditingTrainingBlog({ ...editingTrainingBlog, summary: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">Full Content / Playbook Guide</label>
                    <textarea
                      rows={6}
                      value={editingTrainingBlog.content || ''}
                      onChange={(e) => setEditingTrainingBlog({ ...editingTrainingBlog, content: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] font-sans"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => { setEditingTrainingBlog(null); setIsCreatingTrainingBlog(false); }}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-theme-primary text-white text-xs font-black px-6 py-2 rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Playbook
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Training Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingBlogs.map((tb) => (
              <div
                key={tb.id}
                className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] flex flex-col justify-between space-y-4 hover:border-[#1E4FA8] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-[#1E4FA8] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      {tb.category}
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                      {tb.readTime}
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-[var(--text-primary)] leading-snug">
                    {tb.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {tb.summary}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[var(--border)]">
                  <button
                    onClick={() => {
                      setEditingTrainingBlog(tb);
                      setIsCreatingTrainingBlog(false);
                    }}
                    className="p-2 text-xs font-bold text-[#1E4FA8] hover:bg-blue-50 rounded-xl flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete module "${tb.title}"?`)) {
                        deleteTrainingBlog(tb.id);
                        showToast('Module deleted', 'info');
                      }
                    }}
                    className="p-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUBTAB 4: SUPER ADMIN LIVE BROKER CHAT DESK */}
      {activeSubTab === 'chat' && (
        <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[600px]">
          
          {/* Left Broker Threads List */}
          <div className="md:col-span-4 border-r border-[var(--border)] bg-[var(--surface-secondary)]/50 p-4 space-y-3 overflow-y-auto">
            <h4 className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wider px-2">
              Active Broker Conversations
            </h4>

            {brokerAccessRequests.map((b) => (
              <div
                key={b.brokerId}
                onClick={() => setSelectedBrokerForChat(b.brokerId)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all ${
                  selectedBrokerForChat === b.brokerId
                    ? 'bg-[#1E4FA8] text-white shadow-md'
                    : 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[#1E4FA8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-black text-xs">{b.brokerName}</h5>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedBrokerForChat === b.brokerId ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#1E4FA8]'
                  }`}>
                    {b.status}
                  </span>
                </div>
                <p className={`text-[11px] mt-1 line-clamp-1 ${
                  selectedBrokerForChat === b.brokerId ? 'text-blue-100' : 'text-[var(--text-secondary)]'
                }`}>
                  {b.agencyName || b.phone}
                </p>
              </div>
            ))}
          </div>

          {/* Right Chat Pane */}
          <div className="md:col-span-8 flex flex-col justify-between bg-[var(--surface)]">
            <div className="p-4 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h4 className="font-black text-xs text-[var(--text-primary)]">
                  Live Hotline with {brokerAccessRequests.find(b => b.brokerId === selectedBrokerForChat)?.brokerName || 'Broker'}
                </h4>
              </div>
              <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                Thread #{selectedBrokerForChat}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--surface-secondary)]/30">
              {brokerMessages
                .filter(m => m.brokerId === selectedBrokerForChat || m.brokerId === 'realtor-01')
                .map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.senderRole === 'admin' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-[var(--text-secondary)] font-bold mb-1 px-1">
                      {msg.senderRole === 'admin' ? 'You (Super Admin)' : msg.brokerName}
                    </div>
                    <div
                      className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.senderRole === 'admin'
                          ? 'bg-[#1E4FA8] text-white rounded-tr-xs'
                          : 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-xs'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendAdminReply} className="p-3.5 border-t border-[var(--border)] flex items-center space-x-2 bg-[var(--surface)]">
              <input
                type="text"
                value={adminReplyText}
                onChange={(e) => setAdminReplyText(e.target.value)}
                placeholder="Type official Super Admin response or RERA advisory..."
                className="flex-1 px-4 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#1E4FA8]"
              />
              <button
                type="submit"
                disabled={!adminReplyText.trim()}
                className="btn-theme-primary text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-xs cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
