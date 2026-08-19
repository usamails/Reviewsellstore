import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, ArrowRight, Star, Zap, Lock, RefreshCw, 
  Headphones, DollarSign, Globe, CheckCircle2,
  Send, Phone, ExternalLink, Sparkles, Award, Shield, Mail, Code2, MessageSquare
} from 'lucide-react';
import { SaaSIllustration } from '../components/SaaSIllustration';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SERVICE_CATEGORIES, ALL_SERVICES, WHY_CHOOSE_US, HOW_IT_WORKS_STEPS } from '../data/servicesData';
import { ALL_BLOG_POSTS } from '../data/blogsData';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';

export const HomePage: React.FC = () => {
  const { openInstantCheckout, addToCart } = useCart();

  // Popular items highlight
  const popularServices = ALL_SERVICES.filter(s => s.isPopular).slice(0, 6);

  return (
    <div className="relative space-y-20 pb-16">
      <SEOHead 
        title="ReviewSellStore | Buy Verified Accounts, Google Reviews & Digital Services"
        description="Premier digital services marketplace. Buy verified PayPal accounts, USA Gmails, Google Voice numbers, Trustpilot reviews, Google Local Guide reviews, and aged GitHub accounts."
        canonical="/"
      />
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full"
              >
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">Digital Marketplace 2.0</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter text-slate-900 font-jakarta"
              >
                Premium Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Services</span> Marketplace
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg"
              >
                Buy premium digital services for your business from one trusted marketplace. Reputation management, verified solutions, virtual lines, and 24/7 crypto delivery.
              </motion.p>

              {/* Primary & Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  to="/services"
                  className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:translate-y-[-2px] transition-all shadow-xl shadow-slate-200 flex items-center gap-2 text-sm"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl font-bold shadow-xs hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4 text-sky-500" />
                  <span>Contact Support</span>
                </a>
              </motion.div>

              {/* Crucial Testing Note Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5 max-w-xl shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900">Custom Orders or Quick Testing?</p>
                  <p className="text-xs text-amber-800 mt-0.5">
                    “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
                  </p>
                </div>
              </motion.div>

              {/* Stats Bar Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-jakarta">
                    <AnimatedCounter target={5000} suffix="+" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Orders</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-jakarta">
                    <AnimatedCounter target={1500} suffix="+" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Clients</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-jakarta">
                    <AnimatedCounter target={98} suffix="%" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Success</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600 font-jakarta">24/7</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Support</div>
                </div>
              </motion.div>

            </div>

            {/* Right Column SaaS Interactive Graphic */}
            <div className="lg:col-span-5">
              <SaaSIllustration />
            </div>

          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Enterprise Solutions</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-jakarta mt-1">
            Service Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Select from our six core digital service categories with guaranteed phone verification & clean proxies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat, index) => {
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {cat.id === 'verified-accounts' && <ShieldCheck className="w-6 h-6" />}
                      {cat.id === 'reputation-management' && <Star className="w-6 h-6" />}
                      {cat.id === 'gmail-accounts' && <Mail className="w-6 h-6" />}
                      {cat.id === 'virtual-number-services' && <Phone className="w-6 h-6" />}
                      {cat.id === 'communication-accounts' && <MessageSquare className="w-6 h-6" />}
                      {cat.id === 'developer-accounts' && <Code2 className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {cat.count} Packages
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                      {cat.description}
                    </p>
                  </div>

                  {cat.popularItem && (
                    <div className="text-[11px] font-medium text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-400">Top Plan:</span>
                      <span className="font-semibold text-slate-800">{cat.popularItem}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <Link
                    to={`/services?cat=${cat.id}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold transition-all"
                  >
                    <span>Browse Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Pricing Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Popular Plans</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-jakarta">
              Featured Best-Selling Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Popular bulk plans chosen by marketing agencies, businesses, and developers.
            </p>
          </div>
          <Link
            to="/pricing"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>View Full Pricing Table</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {service.categoryName}
                  </span>
                  {service.isPopular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      ★ POPULAR
                    </span>
                  )}
                </div>

                <div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    <h3 className="text-base font-extrabold text-slate-900 font-jakarta hover:text-blue-600">
                      {service.title}
                    </h3>
                  </Link>
                  <p className="text-xs font-semibold text-blue-600">{service.variant}</p>
                </div>

                <div className="py-2 border-y border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">${service.price}</span>
                    <span className="text-xs text-slate-500 font-medium ml-1">/{service.unit}</span>
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {service.description && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                )}

                {service.features && (
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => addToCart(service)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => openInstantCheckout(service)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (4-step animated timeline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Streamlined Process</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-jakarta mt-1">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Get your accounts or reviews delivered in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <span className="text-3xl font-extrabold font-mono text-cyan-400">{step.step}</span>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (8 Icon Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The ReviewSellStore Advantage</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-jakarta mt-1">
            Why Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Built for reliability, speed, and privacy with 24/7 dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {item.id === 'instant-delivery' && <Zap className="w-5 h-5" />}
                {item.id === 'secure-crypto' && <Shield className="w-5 h-5" />}
                {item.id === 'premium-quality' && <Award className="w-5 h-5" />}
                {item.id === 'replacement-guarantee' && <RefreshCw className="w-5 h-5" />}
                {item.id === 'support-247' && <Headphones className="w-5 h-5" />}
                {item.id === 'affordable-pricing' && <DollarSign className="w-5 h-5" />}
                {item.id === 'global-customers' && <Globe className="w-5 h-5" />}
                {item.id === 'easy-ordering' && <CheckCircle2 className="w-5 h-5" />}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Knowledge Hub & Latest Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
              Knowledge Hub & Technical SEO Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-jakarta">
              Latest Growth & Deliverability Insights
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              Master cold email deliverability, PayPal merchant compliance, Google Local Guide reviews, and Trustpilot TrustScore algorithms.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <span>Explore All 50+ Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALL_BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all p-5 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {post.readTime}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`} className="block group-hover:text-blue-600 transition-colors">
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 font-jakarta">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">By {post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Support Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-jakarta">Ready to Boost Your Business Reputation?</h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Connect with our live support on Telegram or WhatsApp for bulk tier discounts, custom account builds, or instant testing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>Telegram (@EgSupport24)</span>
            </a>

            <a
              href="https://wa.me/13073939979"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp (+1 307-393-9979)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
