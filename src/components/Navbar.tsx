import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ShieldCheck, MessageCircle, CreditCard, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SERVICE_CATEGORIES, ALL_SERVICES } from '../data/servicesData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const { totalItemCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 font-jakarta">
                  ReviewSellStore
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                Trusted Digital Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown Item */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                to="/services"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-1 ${
                  isActive('/services') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </Link>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 w-[720px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {SERVICE_CATEGORIES.slice(0, 6).map(cat => {
                    const products = ALL_SERVICES.filter(s => s.categoryId === cat.id);
                    return (
                      <div key={cat.id} className="space-y-2">
                        <Link
                          to={`/services?category=${cat.id}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-xs font-extrabold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center justify-between group"
                        >
                          <span>{cat.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <div className="space-y-1 pt-1 border-t border-slate-100">
                          {products.map(prod => (
                            <Link
                              key={prod.id}
                              to={`/services/${prod.slug}`}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="block text-[12px] font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 p-1.5 rounded-lg transition-colors truncate"
                            >
                              • {prod.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Mega Menu Footer */}
                  <div className="col-span-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/80 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      18+ SEO Keyword Services with Instant Crypto Delivery
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="font-bold text-blue-600 hover:underline"
                    >
                      Browse Full Catalog →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/pricing') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/blog') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/faq"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/faq') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/about') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/contact') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-700" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>24/7 Support</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg border border-slate-200 text-slate-700"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>

            {/* Mobile Services Sub-List */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span>Services Catalog</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 pr-2 py-2 space-y-3 bg-slate-50/80 rounded-xl my-1 border border-slate-100">
                  {SERVICE_CATEGORIES.map(cat => (
                    <div key={cat.id} className="space-y-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 px-2">{cat.name}</p>
                      {ALL_SERVICES.filter(s => s.categoryId === cat.id).map(prod => (
                        <Link
                          key={prod.id}
                          to={`/services/${prod.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-slate-700 hover:text-blue-600 py-1 px-2 rounded-md hover:bg-white truncate"
                        >
                          • {prod.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Blog (50+ SEO Guides)
            </Link>

            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Support (@EgSupport24)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

