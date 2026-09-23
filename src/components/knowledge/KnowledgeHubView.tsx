import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Compass, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  User, 
  Calendar,
  Lock,
  ChevronRight,
  X
} from 'lucide-react';
import { BlogPost } from '../../types';

export const KnowledgeHubView: React.FC = () => {
  const { cmsBlogs, setActiveView, knowledgeHubConfig, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Buyers Guide',
    'Trends & News',
    'RERA Compliance',
    'AURIC & Infrastructure',
    'Investment Advisory',
    'Home Loans & Tax'
  ];

  const filteredArticles = cmsBlogs.filter(article => {
    const matchesCategory = selectedCategory === 'All' || 
      article.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Buyers Guide' && (article.category.includes('Guide') || article.tags?.some(t => t.toLowerCase().includes('guide') || t.toLowerCase().includes('buyer')))) ||
      (selectedCategory === 'Trends & News' && (article.category.includes('Market') || article.category.includes('News') || article.tags?.some(t => t.toLowerCase().includes('news') || t.toLowerCase().includes('trend'))));
    
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = cmsBlogs.find(b => b.isFeatured) || cmsBlogs[0];

  return (
    <div className="min-h-screen bg-[var(--surface-secondary)] pb-20">
      
      {/* Top Hero Banner */}
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

            <button
              onClick={() => setActiveView('broker-knowledge-hub')}
              className="inline-flex items-center space-x-2 text-xs font-black bg-[#F2621E] hover:bg-[#d95316] text-white px-4 py-2 rounded-xl shadow-lg cursor-pointer transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Brokers Career & Development (Gated)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-white/15 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#F2621E]" />
              <span>Auricity Knowledge Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Real Estate Guides, Market Trends & Legal Insights
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
              Your comprehensive resource center for buying flats, NA land verification, MahaRERA compliance, and Samruddhi Expressway corridor growth in Chhatrapati Sambhajinagar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-[var(--surface)] p-4 rounded-3xl border border-[var(--border)] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, RERA rules, localities..."
                className="w-full pl-9 pr-4 py-2.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-2xl text-xs text-[var(--text-primary)] focus:outline-none focus:border-[#1E4FA8]"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
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

        {/* FEATURED STORY HERO (if no search active) */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && (
          <div 
            onClick={() => setReadingArticle(featuredArticle)}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-3xl border border-slate-700/50 overflow-hidden shadow-xl text-white grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
          >
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Featured Spotlight
                  </span>
                  <span className="text-xs text-slate-300 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime} read</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-blue-300 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-normal">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <User className="w-3.5 h-3.5 text-[#F2621E]" />
                  <span>{featuredArticle.author}</span>
                  <span>•</span>
                  <span>{featuredArticle.publishDate}</span>
                </div>

                <span className="inline-flex items-center space-x-1 text-xs font-black text-blue-300 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden bg-slate-800">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[var(--text-primary)]">
              {selectedCategory === 'All' ? 'Latest Guides & Articles' : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Showing {filteredArticles.length} publications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setReadingArticle(article)}
                className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#1E4FA8] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                      {article.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-[11px] font-bold">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{article.readTime}</span>
                    </span>
                    <span className="text-slate-300">{article.publishDate}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-black text-base text-[var(--text-primary)] group-hover:text-[#1E4FA8] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-black text-[#1E4FA8]">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULL ARTICLE READER MODAL */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-[var(--border)] shadow-2xl overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[var(--surface)]/95 backdrop-blur-md p-5 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-[#1E4FA8] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                  {readingArticle.category}
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-bold">
                  {readingArticle.readTime} read
                </span>
              </div>

              <button
                onClick={() => setReadingArticle(null)}
                className="p-2 rounded-xl bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight">
                {readingArticle.title}
              </h1>

              <div className="flex items-center space-x-3 text-xs text-[var(--text-secondary)] font-bold pb-2 border-b border-[var(--border)]">
                <div className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-[#1E4FA8]" />
                  <span>By {readingArticle.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#F2621E]" />
                  <span>{readingArticle.publishDate}</span>
                </div>
              </div>

              {readingArticle.coverImage && (
                <div className="rounded-2xl overflow-hidden h-72 sm:h-80 w-full bg-slate-900">
                  <img
                    src={readingArticle.coverImage}
                    alt={readingArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="bg-blue-50 border-l-4 border-[#1E4FA8] p-4 rounded-r-2xl text-xs sm:text-sm font-bold text-[#1E4FA8] leading-relaxed">
                {readingArticle.summary}
              </div>

              <div className="prose max-w-none text-[var(--text-primary)] text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {readingArticle.content}
              </div>

              {readingArticle.tags && readingArticle.tags.length > 0 && (
                <div className="pt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-secondary)]">Tags:</span>
                  {readingArticle.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold bg-[var(--surface-secondary)] text-[var(--text-secondary)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[var(--surface)] p-4 border-t border-[var(--border)] flex items-center justify-between">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Article link copied to clipboard', 'info');
                  }
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[#1E4FA8] cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Guide</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="btn-theme-primary text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
