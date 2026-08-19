import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, ShieldCheck, Home, HelpCircle, ShoppingBag, BookOpen, Send, Phone } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ALL_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';

export const NotFoundPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularServices = ALL_SERVICES.slice(0, 6);

  return (
    <div className="min-h-[80vh] bg-slate-50/60 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <SEOHead
        title="404 - Page Not Found | ReviewSellStore"
        description="The requested page could not be located on ReviewSellStore. Explore our verified digital accounts catalog, PayPal merchant packages, and reputation services."
        canonical="/404"
        robots="noindex, follow"
      />

      <div className="max-w-2xl w-full text-center space-y-6">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 font-bold text-xs uppercase tracking-widest border border-blue-200">
          <HelpCircle className="w-4 h-4" />
          <span>Error 404 • Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-jakarta">
          Looking for Something Specific?
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          The link you followed may be broken or the page has moved. Use the search bar below or explore our popular digital service categories.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search PayPal, Gmails, Google Reviews, Voice lines..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Quick Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-blue-600" />
            <span>Homepage</span>
          </Link>
          <Link
            to="/services"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>All 18+ Services</span>
          </Link>
          <Link
            to="/pricing"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-bold transition-all shadow-xs"
          >
            <span>Pricing Matrix</span>
          </Link>
          <Link
            to="/blog"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>SEO Guides (50+ Posts)</span>
          </Link>
        </div>

        {/* Popular Category Cards */}
        <div className="pt-6 text-left border-t border-slate-200">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 text-center">
            Popular Verified Service Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICE_CATEGORIES.slice(0, 6).map(cat => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Explore →
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Support Help */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
          <span>Need live assistance?</span>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" /> Telegram (@EgSupport24)
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://wa.me/13073939979"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> WhatsApp (+1 307-393-9979)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
