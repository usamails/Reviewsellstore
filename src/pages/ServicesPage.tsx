import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ALL_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { Search, CheckCircle2, Star, Zap, Sparkles, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import { ProductVariant } from '../types';
import { SEOHead } from '../components/SEOHead';

export const ServicesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToCart, openInstantCheckout } = useCart();

  // State to hold selected variants per service ID
  const [selectedVariantsMap, setSelectedVariantsMap] = useState<Record<string, ProductVariant>>({});

  useEffect(() => {
    const catFromUrl = searchParams.get('cat') || searchParams.get('category');
    if (catFromUrl) {
      setActiveCategory(catFromUrl);
    }
  }, [searchParams]);

  const filteredServices = ALL_SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.categoryId === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVariantSelect = (serviceId: string, variant: ProductVariant) => {
    setSelectedVariantsMap(prev => ({ ...prev, [serviceId]: variant }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Verified Digital Services Catalog | Buy PayPal, Google Reviews, Gmails"
        description="Explore our complete catalog of verified digital accounts: Personal & Business PayPal accounts, USA Gmails, Google Voice numbers, Trustpilot & Google reviews, and aged GitHub accounts."
        canonical="/services"
      />
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Digital Services Marketplace
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          All Digital Services & Packages
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Browse verified accounts, bulk Gmail lists, Google Voice numbers, Trustpilot reviews, and aged developer profiles. Dedicated product pages, quantity variants & 24/7 instant crypto dispatch.
        </p>
      </div>

      {/* Testing Note Callout */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between gap-4 max-w-4xl mx-auto shadow-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="font-medium text-amber-900">
            “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
          </p>
        </div>
        <a
          href="https://t.me/EgSupport24"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors"
        >
          Message Live Support
        </a>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Services ({ALL_SERVICES.length})
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => {
          const selectedVariant = selectedVariantsMap[service.id] || service.variants?.[0] || null;
          const displayPrice = selectedVariant ? selectedVariant.price : service.price;

          return (
            <div
              key={service.id}
              className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {service.categoryName}
                  </span>
                  {service.isPopular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      POPULAR
                    </span>
                  )}
                </div>

                <div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group flex items-center justify-between hover:text-blue-600 transition-colors"
                  >
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 font-jakarta">
                      {service.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </Link>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">{service.variant}</p>
                </div>

                {/* Price Display */}
                <div className="py-2 border-y border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">${displayPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 font-medium ml-1">
                      / {selectedVariant ? selectedVariant.unit || 'unit' : service.unit}
                    </span>
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    <span>Product Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Variant Package Selector on Card */}
                {service.variants && service.variants.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Select Package Variant:
                    </label>
                    <select
                      value={selectedVariant?.id || ''}
                      onChange={(e) => {
                        const found = service.variants?.find(v => v.id === e.target.value);
                        if (found) handleVariantSelect(service.id, found);
                      }}
                      className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2 outline-hidden focus:border-blue-500"
                    >
                      {service.variants.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name} - ${v.price} {v.savePercent ? `(${v.savePercent})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {service.description && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                )}

                {service.features && (
                  <ul className="space-y-1 text-xs text-slate-600 pt-1">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => addToCart(service, 1, selectedVariant || undefined)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors"
                >
                  + Basket
                </button>

                <button
                  onClick={() => openInstantCheckout(service, selectedVariant || undefined, 1)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

