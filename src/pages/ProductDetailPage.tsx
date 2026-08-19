import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Send,
  MessageCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { ALL_SERVICES, getServiceBySlug } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { ProductVariant } from '../types';
import { SEOHead } from '../components/SEOHead';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, openInstantCheckout } = useCart();

  const service = getServiceBySlug(slug || '');

  // Default selected variant or fallback
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (service) {
      document.title = service.seoTitle || `${service.title} - ReviewSellStore`;
      if (service.variants && service.variants.length > 0) {
        const popular = service.variants.find(v => v.isPopular) || service.variants[0];
        setSelectedVariant(popular);
      } else {
        setSelectedVariant(null);
      }
      setQuantity(1);
    }
  }, [slug, service]);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2 font-jakarta">Product Not Found</h1>
        <p className="text-slate-500 max-w-md mb-6">
          The requested service page could not be located or may have been renamed.
        </p>
        <Link
          to="/services"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : service.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addToCart(service, quantity, selectedVariant || undefined);
  };

  const handleInstantBuy = () => {
    openInstantCheckout(service, selectedVariant || undefined, quantity);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedProducts = ALL_SERVICES.filter(
    s => s.categoryId === service.categoryId && s.id !== service.id
  ).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-slate-50/50 min-h-screen">
      <SEOHead
        title={service.seoTitle || `${service.title} | ReviewSellStore`}
        description={service.description}
        keywords={service.seoKeywords?.join(', ')}
        canonical={`/services/${service.slug}`}
        schemaJson={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': ['Product', 'Service'],
              '@id': `https://reviewsellstore.com/services/${service.slug}#product`,
              name: service.title,
              description: service.description,
              image: ['https://reviewsellstore.com/apple-touch-icon.png'],
              sku: service.slug,
              brand: {
                '@type': 'Brand',
                name: 'ReviewSellStore'
              },
              provider: {
                '@type': 'Organization',
                name: 'ReviewSellStore',
                url: 'https://reviewsellstore.com'
              },
              offers: {
                '@type': 'Offer',
                '@id': `https://reviewsellstore.com/services/${service.slug}#offer`,
                priceCurrency: 'USD',
                price: service.price,
                priceValidUntil: '2027-12-31',
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
                url: `https://reviewsellstore.com/services/${service.slug}`,
                seller: {
                  '@type': 'Organization',
                  name: 'ReviewSellStore',
                  url: 'https://reviewsellstore.com'
                },
                hasMerchantReturnPolicy: {
                  '@type': 'MerchantReturnPolicy',
                  applicableCountry: 'US',
                  returnPolicyCategory: 'https://schema.org/MerchantReturnMoneyBackGuarantee',
                  merchantReturnDays: 2
                }
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '128',
                bestRating: '5',
                worstRating: '1'
              },
              review: [
                {
                  '@type': 'Review',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5'
                  },
                  author: {
                    '@type': 'Person',
                    name: 'Verified Client'
                  },
                  reviewBody: 'High quality phone verified account with active cookies and instant 24/7 delivery.'
                }
              ]
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `https://reviewsellstore.com/services/${service.slug}#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reviewsellstore.com/' },
                { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://reviewsellstore.com/services' },
                { '@type': 'ListItem', position: 3, name: service.categoryName, item: 'https://reviewsellstore.com/services' },
                { '@type': 'ListItem', position: 4, name: service.title, item: `https://reviewsellstore.com/services/${service.slug}` }
              ]
            },
            ...(service.faqs && service.faqs.length > 0 ? [{
              '@type': 'FAQPage',
              mainEntity: service.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            }] : [])
          ]
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-medium">{service.categoryName}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600 font-semibold truncate max-w-[200px] sm:max-w-none">{service.title}</span>
        </nav>

        {/* Product Top Header & Purchasing Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Title, SEO Highlights, Badges & Long Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{service.categoryName}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Dispatch Ready
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-jakarta leading-tight">
              {service.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              {service.description}
            </p>

            {/* Keyword tags */}
            {service.seoKeywords && service.seoKeywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-slate-400 font-medium mr-1">SEO Keywords:</span>
                {service.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-600 font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}

            {/* Key Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Speed</p>
                  <p className="text-xs font-bold text-slate-800">{service.deliveryTime || '5-30 Mins'}</p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Warranty</p>
                  <p className="text-xs font-bold text-slate-800">100% Guaranteed</p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Surcharge</p>
                  <p className="text-xs font-bold text-emerald-600">0% Crypto Fees</p>
                </div>
              </div>
            </div>

            {/* Detailed Feature Checklist */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-jakarta uppercase tracking-wider text-slate-400">
                  Included Features & Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Purchasing Box with Variant Selection & Custom Quantity */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl relative sticky top-24 space-y-6">
              
              {/* Top Pricing Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Package</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-jakarta">${totalPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500">
                      (${currentPrice} / {selectedVariant ? selectedVariant.unit || 'unit' : service.unit})
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              {/* Variant Tiers Selector (If variants exist) */}
              {service.variants && service.variants.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Package / Quantity Variant:
                    </label>
                    {selectedVariant?.savePercent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                        {selectedVariant.savePercent}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                    {service.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{v.name}</span>
                              {v.isPopular && (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-extrabold uppercase rounded">
                                  POPULAR
                                </span>
                              )}
                            </div>
                            {v.savePercent && (
                              <p className="text-[10px] text-emerald-600 font-semibold">{v.savePercent}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-blue-600">${v.price}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Counter (Allows buying multiple units/packages) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Order Quantity / Sets:
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    Total Items: {quantity * (selectedVariant ? selectedVariant.quantity : 1)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2.5 hover:bg-slate-200 text-slate-600 transition-colors active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 text-center font-bold text-slate-900 text-sm bg-transparent outline-hidden"
                    />
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2.5 hover:bg-slate-200 text-slate-600 transition-colors active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 italic flex-1">
                    Select any quantity to scale your bulk order.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleInstantBuy}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now (${totalPrice.toFixed(2)})</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Direct Support Notice */}
              <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Custom Quantity or Test Order?</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  Need custom volume, sample testing, or special GEO requirements? Message us directly on 
                  <a href="https://t.me/EgSupport24" target="_blank" rel="noreferrer" className="underline font-bold ml-1 text-amber-900">Telegram</a> or 
                  <a href="https://wa.me/13073939979" target="_blank" rel="noreferrer" className="underline font-bold ml-1 text-amber-900">WhatsApp</a>.
                </p>
              </div>

              {/* Supported Crypto Chains */}
              <div className="pt-2 text-center text-[11px] text-slate-400">
                🔒 Accepts BTC, ETH, SOL, USDT (TRC20/ERC20/BEP20) & 8+ Crypto Chains
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Long SEO Description & Article Section */}
        {service.longDescription && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-12 space-y-8">
            <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  In-Depth Technical & Service Guide
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-jakarta">
                  About {service.title} – Complete Service Overview
                </h2>
              </div>
              <div className="text-xs text-slate-500 font-medium bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80 self-start sm:self-auto">
                Comprehensive Verification & Operations
              </div>
            </div>

            {/* Extended Multi-paragraph Article Text */}
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-normal">
              {service.longDescription}
            </div>

            {/* Technical Service Specifications & Safety Pillars Grid */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-jakarta">
                Service Delivery Standards & Technical Safeguards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 font-jakarta">100% Verified Identity</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Created via static residential IP proxies and real SIM / SSN verification for maximum trust.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 font-jakarta">Instant / Drip Dispatch</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Automated credential delivery or natural drip-feed posting to preserve account longevity.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 font-jakarta">Cookies & User-Agent</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Delivered with JSON session cookies and device profiles to bypass login checkpoints smoothly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 font-jakarta">Replacement Warranty</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    100% non-drop warranty and 48-hour free replacement for any initial credential issues.
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-step Operational Workflow */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-jakarta">
                Standard Fulfillment & Onboarding Steps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-jakarta">Order Checkout & Form Details</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Select your package quantity, submit target URLs or requirements, and complete payment with crypto.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-jakarta">Automated / Manual Dispatch</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Credentials or review confirmation logs are compiled in CSV/TXT format and sent directly to your email or Telegram.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/30 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    03
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-jakarta">Session Setup & Ongoing Support</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Import cookies or launch your campaign. Our 24/7 technical support is on standby to assist with setup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Use Cases */}
            {service.useCases && service.useCases.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-jakarta">
                  Recommended Business Use Cases & Applications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.useCases.map((uc, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3.5 bg-slate-50/80 rounded-xl text-xs text-slate-800 font-semibold border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Product FAQs with Google Search Rich Snippet Accordion Styling */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
            
            {/* Inject FAQPage Structured Data (JSON-LD) for Search Engine Rich Snippets */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": service.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer
                    }
                  }))
                })
              }}
            />

            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-jakarta flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <span>Google Search FAQ Schema - {service.title}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Answers to key questions regarding verification, delivery speed, replacement warranties, and usage guidelines.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 hidden sm:inline-block">
                {service.faqs.length} FAQs Listed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-4.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-jakarta">
                      Q{i + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug font-jakarta">{faq.question}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 border-l-2 border-blue-200 ml-3">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-200/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-jakarta">
                  Related Services in {service.categoryName}
                </h2>
                <p className="text-xs text-slate-500">Explore complementary products from our catalog</p>
              </div>
              <Link
                to="/services"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{rel.categoryName}</span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{rel.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{rel.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-sm font-extrabold text-blue-600">${rel.price}</span>
                    <Link
                      to={`/services/${rel.slug}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>View Product</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
