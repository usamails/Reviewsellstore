import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag, Filter, ShieldCheck, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ALL_BLOG_POSTS, BLOG_CATEGORIES, getFeaturedBlogPost } from '../data/blogsData';
import { SEOHead } from '../components/SEOHead';

const POSTS_PER_PAGE = 9;

export const BlogListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const featuredPost = useMemo(() => getFeaturedBlogPost(), []);

  const filteredPosts = useMemo(() => {
    return ALL_BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Reset page when category or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      <SEOHead
        title="Knowledge Hub & Digital Growth Guides | ReviewSellStore Blog"
        description="Master cold email deliverability, PayPal merchant compliance, Google Local Guide reviews, and Trustpilot TrustScore algorithms with our expert technical guides."
        canonical="/blog"
      />
      
      {/* Blog Hero Header */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Growth & SEO Knowledge Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-jakarta max-w-3xl mx-auto leading-tight">
            ReviewSellStore Official Growth & Security Blog
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            In-depth SEO guides, PVA account deliverability strategies, PayPal merchant compliance blueprints, Google review ranking algorithms, and Web3 developer insights.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search 50+ SEO growth guides, PayPal, Google reviews..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xl transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Blog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-10">

        {/* Category Filter Pills */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Blog Post Card (Show when on Page 1 and no active search) */}
        {currentPage === 1 && selectedCategory === 'all' && !searchQuery && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg uppercase tracking-wider">
                  Featured Masterclass
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {featuredPost.publishedAt}
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`} className="block group-hover:text-blue-600 transition-colors">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug font-jakarta">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredPost.tags.map(t => (
                      <span key={t} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{featuredPost.author}</p>
                      <p className="text-[10px] text-slate-500">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Counter Summary */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Showing {filteredPosts.length} Articles</span>
            {searchQuery && (
              <span className="text-slate-500 font-normal">
                for "{searchQuery}"
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>

        {/* Blog Post Cards Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Card Thumbnail Image */}
                <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden block bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-600 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow">
                    {post.category}
                  </div>
                </Link>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="block group-hover:text-blue-600 transition-colors">
                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 font-jakarta">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[140px]">
                      By {post.author}
                    </span>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <Tag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Articles Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any blog posts matching your search criteria. Try searching for broader terms or clearing category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              Trusted Digital Marketplace
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-jakarta leading-tight">
              Ready to Accelerate Your Online Growth & Brand Authority?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Explore ReviewSellStore's catalog of verified business accounts, Google 5-star reviews, Trustpilot badges, USA PVA Gmails, and aged GitHub profiles.
            </p>
          </div>

          <Link
            to="/services"
            className="px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            Browse Full Catalog →
          </Link>
        </div>

      </div>
    </div>
  );
};
