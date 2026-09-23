import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useModalBackHandler } from '../../../utils/useModalBackHandler';
import { BlogPost, TrainingBlog } from '../../../types';
import { CmsImageReplacerModal } from './CmsImageReplacerModal';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  User, 
  Tag, 
  Globe, 
  GraduationCap, 
  FileText, 
  Image as ImageIcon,
  X,
  ExternalLink,
  Filter
} from 'lucide-react';

export const BlogNewsManager: React.FC = () => {
  const { 
    cmsBlogs, 
    addCmsBlog, 
    updateCmsBlog, 
    deleteCmsBlog,
    trainingBlogs,
    addTrainingBlog,
    updateTrainingBlog,
    deleteTrainingBlog,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'public' | 'broker_academy'>('public');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal / Drawer state
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  useModalBackHandler(isEditorOpen, () => setIsEditorOpen(false));
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState<string>('');
  const [formSlug, setFormSlug] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>('Market Trends');
  const [formExcerpt, setFormExcerpt] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [formCoverImage, setFormCoverImage] = useState<string>('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80');
  const [formAuthor, setFormAuthor] = useState<string>('Auricity Editorial Desk');
  const [formAuthorRole, setFormAuthorRole] = useState<string>('Market Research Lead');
  const [formReadTime, setFormReadTime] = useState<number>(4);
  const [formPublished, setFormPublished] = useState<boolean>(true);
  const [formTags, setFormTags] = useState<string>('Sambhajinagar, Real Estate, RERA');
  const [formIsBrokerTraining, setFormIsBrokerTraining] = useState<boolean>(false);
  const [formDifficulty, setFormDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [formResourceUrl, setFormResourceUrl] = useState<string>('');

  // Image replacer modal inside blog editor
  const [replacerOpen, setReplacerOpen] = useState<boolean>(false);

  const categories = [
    'Market Trends',
    'Buyer Guide',
    'Legal & RERA',
    'Broker Academy',
    'AURIC & Infrastructure',
    'Home Decor & Vastu',
    'Investment Advisory'
  ];

  const handleOpenAddModal = (forBrokerAcademy = false) => {
    setEditingBlogId(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory(forBrokerAcademy ? 'Broker Academy' : 'Market Trends');
    setFormExcerpt('');
    setFormContent(`### Overview\nWrite your informative article content here using markdown headers, bullet points, and practical advice.\n\n### Key Takeaways:\n- Important legal and financial checkpoints\n- Step-by-step guidance for Sambhajinagar residents.`);
    setFormCoverImage('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80');
    setFormAuthor('Auricity Advisory Desk');
    setFormAuthorRole('Senior Legal & Valuation Consultant');
    setFormReadTime(5);
    setFormPublished(true);
    setFormTags('Sambhajinagar, Real Estate, MahaRERA');
    setFormIsBrokerTraining(forBrokerAcademy || activeTab === 'broker_academy');
    setFormDifficulty('Intermediate');
    setFormResourceUrl('');
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (blog: BlogPost | TrainingBlog, isTraining = false) => {
    setEditingBlogId(blog.id);
    setFormTitle(blog.title);
    setFormSlug(blog.slug || '');
    setFormCategory(blog.category);
    setFormExcerpt(blog.excerpt || '');
    setFormContent(blog.content || '');
    setFormCoverImage(blog.coverImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80');
    setFormAuthor(blog.author || 'Auricity Editor');
    setFormAuthorRole(('authorRole' in blog && blog.authorRole) ? blog.authorRole : 'Analyst');
    setFormReadTime(blog.readTimeMinutes || 4);
    setFormPublished(blog.published !== false);
    setFormTags(blog.tags ? blog.tags.join(', ') : '');
    setFormIsBrokerTraining(isTraining || ('targetAudience' in blog && blog.targetAudience === 'realtor_academy'));
    setFormDifficulty(('difficultyLevel' in blog ? blog.difficultyLevel : 'Intermediate') as any);
    setFormResourceUrl(('downloadableResourceUrl' in blog ? blog.downloadableResourceUrl : '') || '');
    setIsEditorOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Please enter an article title', 'error');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);
    const slug = formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (formIsBrokerTraining) {
      // Save as Training Blog
      const trainingItem: TrainingBlog = {
        id: editingBlogId || `tb-${Date.now()}`,
        title: formTitle.trim(),
        slug,
        excerpt: formExcerpt.trim(),
        content: formContent.trim(),
        category: formCategory,
        author: formAuthor.trim(),
        authorRole: formAuthorRole.trim(),
        readTimeMinutes: Number(formReadTime) || 5,
        coverImage: formCoverImage,
        publishedAt: new Date().toISOString().split('T')[0],
        published: formPublished,
        tags: tagsArray,
        difficultyLevel: formDifficulty,
        targetAudience: 'realtor_academy',
        downloadableResourceUrl: formResourceUrl.trim() || undefined
      };

      if (editingBlogId) {
        updateTrainingBlog(editingBlogId, trainingItem);
        showToast('Broker training guide updated!', 'success');
      } else {
        addTrainingBlog(trainingItem);
        showToast('New broker training guide published to Realtor Academy!', 'success');
      }
    } else {
      // Save as Public Blog
      const blogItem: BlogPost = {
        id: editingBlogId || `blog-${Date.now()}`,
        title: formTitle.trim(),
        slug,
        excerpt: formExcerpt.trim(),
        content: formContent.trim(),
        category: formCategory,
        author: formAuthor.trim(),
        authorRole: formAuthorRole.trim(),
        readTimeMinutes: Number(formReadTime) || 5,
        coverImage: formCoverImage,
        publishedAt: new Date().toISOString().split('T')[0],
        published: formPublished,
        tags: tagsArray
      };

      if (editingBlogId) {
        updateCmsBlog(editingBlogId, blogItem);
        showToast('Public article updated successfully!', 'success');
      } else {
        addCmsBlog(blogItem);
        showToast('New public article published to website!', 'success');
      }
    }

    setIsEditorOpen(false);
  };

  const filteredPublicBlogs = cmsBlogs.filter(b => {
    const matchesCat = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredTrainingBlogs = trainingBlogs.filter(b => {
    const matchesCat = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="blog-news-manager" className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-purple-100 text-purple-700 rounded-full uppercase tracking-wider">
              CMS • Articles & Broker Academy
            </span>
            <span className="text-xs text-slate-400">• {cmsBlogs.length} Public Posts • {trainingBlogs.length} Academy Guides</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Blog & News Management
          </h2>
          <p className="text-xs text-slate-500">
            Publish market insights for home buyers and manage private training modules for certified MahaRERA brokers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="cms-add-blog-btn"
            onClick={() => handleOpenAddModal(activeTab === 'broker_academy')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            {activeTab === 'broker_academy' ? '+ New Broker Guide' : '+ Add New Blog Post'}
          </button>
        </div>
      </div>

      {/* Target Audience Tabs */}
      <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-2">
        <button
          onClick={() => setActiveTab('public')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'public'
              ? 'bg-[#1E4FA8] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Public Real Estate News & Blogs ({cmsBlogs.length})
        </button>

        <button
          onClick={() => setActiveTab('broker_academy')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'broker_academy'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Broker Training Academy (Private to Brokers) ({trainingBlogs.length})
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white font-medium text-slate-700"
        >
          <option value="all">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      {activeTab === 'public' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPublicBlogs.map((blog) => (
            <div 
              key={blog.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-video w-full relative bg-slate-100 overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold">
                  {blog.category}
                </div>
                {blog.published ? (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">
                    Published
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-amber-600 text-white text-[10px] font-bold">
                    Draft
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blog.readTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span>{blog.publishedAt}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600 truncate max-w-[120px]">
                    By {blog.author}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(blog, false)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      title="Edit Article"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete post "${blog.title}"?`)) {
                          deleteCmsBlog(blog.id);
                          showToast('Article deleted', 'info');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTrainingBlogs.map((guide) => (
            <div 
              key={guide.id}
              className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-video w-full relative bg-purple-950 overflow-hidden">
                <img 
                  src={guide.coverImage} 
                  alt={guide.title} 
                  className="w-full h-full object-cover opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-purple-900/90 text-white text-[10px] font-bold">
                  {guide.category} • {guide.difficultyLevel || 'Pro'}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-purple-600 text-white text-[10px] font-bold flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Realtor Only
                </div>
              </div>

              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {guide.readTimeMinutes} min study
                    </span>
                    <span>•</span>
                    <span>{guide.publishedAt}</span>
                  </div>
                  <h3 className="text-sm font-bold text-purple-950 line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-50 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600 truncate max-w-[120px]">
                    By {guide.author}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(guide, true)}
                      className="p-1.5 rounded-lg text-purple-700 hover:bg-purple-50 transition-colors"
                      title="Edit Training Guide"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete broker guide "${guide.title}"?`)) {
                          deleteTrainingBlog(guide.id);
                          showToast('Training guide deleted', 'info');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete Training Guide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ARTICLE EDITOR MODAL / DRAWER */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F2621E]" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingBlogId ? 'Edit Article' : 'Create New Article / Post'}
                </h3>
              </div>
              <button onClick={() => setIsEditorOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Audience selection toggle */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Target Audience</p>
                  <p className="text-[11px] text-slate-500">
                    {formIsBrokerTraining 
                      ? 'Visible ONLY in Broker Dashboard (Realtor Academy)' 
                      : 'Visible on Public Website (News & Insights)'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormIsBrokerTraining(false)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${!formIsBrokerTraining ? 'bg-[#1E4FA8] text-white' : 'bg-white text-slate-600 border'}`}
                  >
                    Public Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormIsBrokerTraining(true)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${formIsBrokerTraining ? 'bg-purple-700 text-white' : 'bg-white text-slate-600 border'}`}
                  >
                    Broker Training
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Article Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (!editingBlogId) {
                      setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                    }
                  }}
                  placeholder="e.g. AURIC Smart City Industrial Corridor Property Trends 2026"
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F2621E]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="auric-smart-city-trends"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white font-medium"
                  >
                    {categories.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Read Time (Mins)</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image with Replacer */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Cover Image</label>
                  <button
                    type="button"
                    onClick={() => setReplacerOpen(true)}
                    className="text-xs text-[#F2621E] hover:underline font-bold flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Choose from Media Library / Upload
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={formCoverImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <input
                    type="url"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Excerpt / Summary (SEO)</label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="2-3 sentence overview displayed on article cards..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Article Body Content (Markdown Supported)</label>
                <textarea
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="### Section Heading&#10;Write detailed paragraphs, guidance, or legal explanations here..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Author Designation / Role</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {formIsBrokerTraining && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Downloadable Resource / PDF Link</label>
                  <input
                    type="url"
                    value={formResourceUrl}
                    onChange={(e) => setFormResourceUrl(e.target.value)}
                    placeholder="https://.../rera-broker-checklist.pdf"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keywords / Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="MahaRERA, CIDCO, Home Loans, Valuation"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="form-publish-checkbox"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="w-4 h-4 text-[#F2621E] rounded focus:ring-0"
                />
                <label htmlFor="form-publish-checkbox" className="text-xs font-bold text-slate-800">
                  Publish article immediately (Uncheck to save as private draft)
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#F2621E] hover:bg-[#d85517] rounded-xl shadow-sm"
                >
                  {editingBlogId ? 'Save & Update Post' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cover image replacer modal */}
      <CmsImageReplacerModal
        isOpen={replacerOpen}
        onClose={() => setReplacerOpen(false)}
        currentImageUrl={formCoverImage}
        imageTitle="Select Article Cover Photo"
        onSelectImage={(newUrl) => setFormCoverImage(newUrl)}
      />

    </div>
  );
};
