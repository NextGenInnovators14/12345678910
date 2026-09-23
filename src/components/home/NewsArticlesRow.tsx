import React, { useState } from 'react';
import { useHomeCopy } from './homeEditorUtils';
import { useApp } from '../../context/AppContext';
import { 
  Newspaper, 
  ArrowRight, 
  Clock, 
  User, 
  Tag, 
  Calendar,
  X,
  Share2
} from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const NewsArticlesRow: React.FC = () => {
  const { heading: homeHeading, subheading: homeSubheading } = useHomeCopy('news', 'News & Articles', 'Latest property news, guides and market insights.');
  const { setActiveView } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const articles: ArticleItem[] = [
    {
      id: 'art-1',
      title: 'AURIC Smart City Shendra Node Attracts ₹12,000 Cr Global Manufacturing Investments',
      category: 'AURIC & Infrastructure',
      excerpt: 'With direct Samruddhi Mahamarg connectivity, Shendra and Bidkin nodes are witnessing rapid industrial and high-yield residential real estate demand.',
      content: 'Chhatrapati Sambhajinagar is emerging as Maharashtra’s fastest growing smart industrial hub. AURIC (Aurangabad Industrial City) under the Delhi-Mumbai Industrial Corridor (DMIC) has secured major investment commitments in automobile, defence, electronics, and EV manufacturing. This has triggered significant residential expansion across Jalna Road, Cambridge Chowk, and Shendra township zones.',
      author: 'Auricity Research Desk',
      date: 'August 24, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'art-2',
      title: 'MahaRERA 2026 Guidelines: Why 30-Year Title Search is Essential Before Buying Resale Flats',
      category: 'Legal & RERA',
      excerpt: 'Legal experts break down how title deed checks, CTS extract audits, and occupancy certificate verification safeguard your hard-earned savings.',
      content: 'Purchasing a resale apartment or NA plot requires comprehensive due diligence. Under MahaRERA and Maharashtra Land Revenue Code regulations, verifying the 30-year chain of title ownership, encumbrance certificates, and sanctioned floor plans protects buyers from boundary disputes and illegal encroachments.',
      author: 'Adv. Suresh Jadhav',
      date: 'August 18, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'art-3',
      title: 'Why Beed Bypass & CIDCO Continue to Be Top Rental Yield Hotspots in Sambhajinagar',
      category: 'Market Trends',
      excerpt: 'Close proximity to coaching hubs, hospitals, and educational institutes keeps rental vacancy rates below 3% in central Sambhajinagar.',
      content: 'Investors seeking 4.5% to 6.2% annual rental yields are heavily focusing on 2 BHK and 3 BHK apartments in CIDCO N-1 to N-8, Garkheda Parisar, and Beed Bypass Road. The influx of engineering professionals, medical doctors, and student tenants continues to push high occupancy throughout the year.',
      author: 'Pooja Kulkarni (Market Analyst)',
      date: 'August 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)] border-b border-[var(--border)] transition-colors w-full overflow-hidden" id="news-and-articles-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-black uppercase tracking-wider border border-[var(--primary)]/20">
              <Newspaper className="w-3.5 h-3.5 text-[var(--secondary)]" />
              <span>News & Market Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {homeHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              {homeSubheading}
            </p>
          </div>

          <button
            onClick={() => setActiveView('properties')}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer group shrink-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Visible on Desktop, Horizontal Scroll on Mobile with View More Arrow at End */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth items-stretch">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-[280px] sm:w-auto shrink-0 card-theme group rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Article Image & Category Badge */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute top-2.5 left-2.5 bg-[var(--primary)] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
                  {article.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] text-[var(--text-secondary)]">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[var(--secondary)]" />
                      <span>{article.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-black text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 truncate">
                    By {article.author}
                  </span>
                  <span className="text-xs font-black text-[var(--secondary)] flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--surface)] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] max-h-[90vh] flex flex-col">
            
            <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[var(--primary)] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg sm:text-xl font-black">{selectedArticle.title}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  By {selectedArticle.author} • {selectedArticle.date} ({selectedArticle.readTime})
                </p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="font-bold text-[var(--text-primary)]">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
              <p>For verified property consultations or RERA document verification in Sambhajinagar, reach out directly to Auricity Legal & Advisory desk.</p>
            </div>

            <div className="p-4 bg-[var(--surface-secondary)] border-t border-[var(--border)] flex items-center justify-between">
              <button
                onClick={() => {
                  window.open(`https://wa.me/918010506030?text=Hi%20Auricity,%20I%20read%20your%20article%20on%20${encodeURIComponent(selectedArticle.title)}`, '_blank');
                }}
                className="btn-theme-secondary py-2 px-4 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Discuss with Auricity Advisor</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
