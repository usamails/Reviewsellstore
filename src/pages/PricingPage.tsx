import React, { useState } from 'react';
import { ALL_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { ServiceItem } from '../types';
import { SEOHead } from '../components/SEOHead';
import { 
  Check, ShoppingBag, ArrowRight, Star, ShieldCheck, Sparkles, 
  Search, Filter, ChevronDown, ChevronUp, Zap, HelpCircle 
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState<boolean>(false);
  const { cart, addToCart, openInstantCheckout, totalAmount, totalItemCount, setIsCheckoutOpen } = useCart();

  // Filter services
  const filteredServices = ALL_SERVICES.filter(service => {
    const matchesCat = selectedCategory === 'all' || service.categoryId === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Digital Services Pricing Matrix | Transparent & Bulk Tier Rates"
        description="View transparent pricing tables and bulk tier discounts for verified PayPal accounts, USA Gmails, Google Voice numbers, Trustpilot reviews, and aged GitHub accounts."
        canonical="/pricing"
      />
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Transparent Bulk Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          Services & Pricing Catalog
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select exact tier packages for verified accounts, Gmail bulk lists, Google Voice lines, and reputation management. Direct crypto payments with 100% replacement warranty.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Services ({ALL_SERVICES.length})
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search service or plan..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

      </div>

      {/* Main Grid with Sticky Order Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Services Pricing Table List (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <p className="text-base font-bold text-slate-800">No services match your search criteria</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredServices.map(service => (
              <div
                key={service.id}
                className={`p-5 rounded-2xl bg-white/90 backdrop-blur-md border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                  service.isPopular
                    ? 'border-blue-300 ring-2 ring-blue-500/10 bg-blue-50/20'
                    : 'border-slate-200/90'
                }`}
              >
                {/* Left Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {service.categoryName}
                    </span>
                    {service.isPopular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        POPULAR CHOICE
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{service.title}</h3>
                  <p className="text-xs font-semibold text-blue-600">{service.variant}</p>

                  {service.description && (
                    <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Right Price & Actions */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-extrabold text-slate-900">${service.price}</span>
                    <span className="text-xs text-slate-500 block">{service.unit}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(service)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors"
                    >
                      + Basket
                    </button>

                    <button
                      onClick={() => openInstantCheckout(service)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Desktop Sticky Order Summary Sidebar (4 cols on lg) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                {totalItemCount} Items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <p className="text-xs">No items selected yet.</p>
                <p className="text-[11px] text-slate-500">Click "+ Basket" or "Buy Now" on any service above to build your order.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.service.id} className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900">{item.service.title}</p>
                      <p className="text-[11px] text-slate-500">{item.service.variant} x{item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900">${item.service.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Crucial Testing & Custom Order Note */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
              <p className="font-semibold flex items-center gap-1 text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Custom Orders
              </p>
              <p className="mt-1 text-[11px] text-amber-700 leading-relaxed">
                “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
              </p>
            </div>

            {/* Total and Checkout */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-slate-900">
                <span className="text-sm font-medium">Total Amount</span>
                <span className="text-xl font-extrabold text-blue-600">${totalAmount}.00 USD</span>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
                className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  cart.length > 0
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Checkout with Crypto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Collapsible Order Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 shadow-2xl">
        <div className="max-w-md mx-auto space-y-3">
          <div
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-xs font-bold text-slate-900">Order Summary ({totalItemCount})</span>
                <span className="text-sm font-extrabold text-blue-600 block">${totalAmount}.00 USD</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-slate-600">
              <span>{mobileSummaryOpen ? 'Hide Details' : 'View Details'}</span>
              {mobileSummaryOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </div>
          </div>

          {mobileSummaryOpen && (
            <div className="pt-3 border-t border-slate-100 space-y-2 max-h-40 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400">Basket is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.service.id} className="flex justify-between text-xs">
                    <span className="text-slate-700">{item.service.title} ({item.service.variant}) x{item.quantity}</span>
                    <span className="font-bold text-slate-900">${item.service.price * item.quantity}</span>
                  </div>
                ))
              )}
            </div>
          )}

          <button
            disabled={cart.length === 0}
            onClick={() => setIsCheckoutOpen(true)}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
              cart.length > 0
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Crypto Checkout (${totalAmount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
