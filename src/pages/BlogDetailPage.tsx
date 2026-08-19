import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Copy,
  Check,
  Send,
  MessageCircle,
  Twitter,
  ShoppingBag,
  ShieldCheck,
  Tag,
  ArrowRight,
  BookOpen,
  Sparkles,
  List,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Headphones,
  Zap,
  Lock,
  ThumbsUp
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedBlogPosts } from '../data/blogsData';
import { ALL_SERVICES } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';

// Helper to extract Table of Contents headings and inject IDs into HTML
function parseAndEnhanceContent(rawHtml: string) {
  let counter = 0;
  const headings: { id: string; text: string; level: number }[] = [];

  const processedHtml = rawHtml.replace(/<h([23])>(.*?)<\/h\1>/gi, (_, levelStr, innerText) => {
    const id = `section-${counter++}`;
    const cleanText = innerText.replace(/<[^>]+>/g, '').trim();
    const level = parseInt(levelStr, 10);
    headings.push({ id, text: cleanText, level });

    return `<h${levelStr} id="${id}" class="scroll-mt-28 font-jakarta font-extrabold text-slate-900 border-b border-slate-100 pb-2.5 mt-10 mb-4 text-xl sm:text-2xl flex items-center gap-2">
      <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
      ${innerText}
    </h${levelStr}>`;
  });

  return { processedHtml, headings };
}

// Category Specific FAQs for SEO Rich Snippets
function getCategoryFaqs(category: string, title: string) {
  switch (category) {
    case 'Merchant Accounts':
      return [
        {
          q: 'How fast are verified PayPal accounts delivered after purchase?',
          a: 'Accounts are delivered instantly within 5 to 15 minutes via automated digital dispatch containing login credentials, recovery email access, SSN/EIN document sets, and JSON browser cookies.'
        },
        {
          q: 'How do I prevent PayPal account limitations and holds?',
          a: 'Follow our 30-day warm-up scaling protocol: use static US residential proxies, scale daily transaction volume gradually, and sync shipping tracking numbers automatically.'
        },
        {
          q: 'What replacement warranty is included with merchant accounts?',
          a: 'Every purchased PayPal account includes a 48-hour initial login guarantee and a 100% money-back / free account replacement warranty if credentials fail.'
        }
      ];
    case 'Google Reviews':
      return [
        {
          q: 'Are the Google Reviews posted by real Local Guide profiles?',
          a: 'Yes, 100% of our reviews are posted by active Level 4+ Google Local Guide profiles with established contribution histories across Google Maps.'
        },
        {
          q: 'Will these Google reviews stick or drop over time?',
          a: 'Reviews are posted using geo-targeted residential proxies and drip-fed naturally over days to ensure 99%+ retention. All reviews include a 60-day non-drop replacement warranty.'
        },
        {
          q: 'Can I provide my own review text and photo attachments?',
          a: 'Yes, you can specify custom review wording, targeted keywords, and upload storefront or product photos for maximum local SEO ranking impact.'
        }
      ];
    case 'Trustpilot & Reputation':
      return [
        {
          q: 'How do Trustpilot Verified buyer badges work?',
          a: 'We send official Trustpilot post-purchase review invitations, generating authentic green "Verified" badges that boost your TrustScore instantly.'
        },
        {
          q: 'Can ReviewSellStore help remove negative Trustpilot reviews?',
          a: 'Yes, our reputation specialists dispute non-compliant or unverified negative reviews directly through Trustpilot legal and compliance channels.'
        }
      ];
    case 'PVA & Email':
      return [
        {
          q: 'Are PVA Gmail accounts compatible with Smartlead and Instantly?',
          a: 'Yes, all USA Phone Verified Gmail accounts are created over clean residential IP proxies and pre-warmed for seamless connection to cold email automation tools.'
        },
        {
          q: 'Why are US IP registered Gmail accounts better for deliverability?',
          a: 'US IP registration aligns sender domain telemetry with corporate spam filter algorithms, resulting in significantly higher inbox placement for B2B sales outreach.'
        }
      ];
    case 'Virtual Phone Lines':
      return [
        {
          q: 'Can I use Google Voice or TextPlus for Telegram and 2FA SMS?',
          a: 'Yes, our assigned virtual phone numbers are permanent, North American numbers capable of receiving 2FA SMS, OTP activation codes, Telegram, Signal, and WhatsApp verification.'
        }
      ];
    default:
      return [
        {
          q: `How does ${title} benefit my online business?`,
          a: 'Implementing these proven digital growth strategies increases conversion rates, establishes brand trust, protects payment processing infrastructure, and boosts organic search rankings.'
        },
        {
          q: 'What payment methods are accepted on ReviewSellStore?',
          a: 'We accept Bitcoin (BTC), USDT (TRC20/ERC20), Ethereum (ETH), Solana (SOL), Litecoin (LTC), and major cryptocurrencies with instant checkout.'
        },
        {
          q: 'Is technical support available if I need assistance?',
          a: 'Yes, our expert technical support team is available 24/7 via Telegram and live chat to guide you through setup and account integration.'
        }
      ];
  }
}

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  const post = getBlogPostBySlug(slug || '');

  // Scroll Reading Progress Bar & Active Heading Indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Find heading in view
      const headingElements = document.querySelectorAll('h2[id], h3[id]');
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 200) {
          setActiveHeadingId(el.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { processedHtml, headings } = useMemo(() => {
    if (!post) return { processedHtml: '', headings: [] };
    return parseAndEnhanceContent(post.content);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-md space-y-4 shadow-xl">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h1 className="text-xl font-extrabold text-slate-900">Article Not Found</h1>
          <p className="text-xs text-slate-500">
            The requested article could not be located in our Knowledge Hub.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, post.category, 3);
  const relatedService = post.relatedServiceSlug
    ? ALL_SERVICES.find(s => s.slug === post.relatedServiceSlug)
    : ALL_SERVICES[0];

  const faqs = getCategoryFaqs(post.category, post.title);
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleAddToCart = () => {
    if (relatedService) {
      addToCart(relatedService, 1);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHeadingId(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 relative">
      <SEOHead
        title={post.seoTitle || `${post.title} | ReviewSellStore`}
        description={post.excerpt}
        keywords={post.seoKeywords?.join(', ') || post.tags?.join(', ')}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        schemaJson={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              '@id': `https://reviewsellstore.com/blog/${post.slug}#article`,
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt || post.date,
              dateModified: post.publishedAt || post.date,
              author: {
                '@type': 'Person',
                name: post.author
              },
              publisher: {
                '@type': 'Organization',
                name: 'ReviewSellStore',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://reviewsellstore.com/apple-touch-icon.png'
                }
              },
              mainEntityOfPage: `https://reviewsellstore.com/blog/${post.slug}`
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `https://reviewsellstore.com/blog/${post.slug}#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reviewsellstore.com/' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://reviewsellstore.com/blog' },
                { '@type': 'ListItem', position: 3, name: post.title, item: `https://reviewsellstore.com/blog/${post.slug}` }
              ]
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a
                }
              }))
            }
          ]
        }}
      />
      
      {/* Scroll Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Top Breadcrumb Header Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600 font-medium">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-blue-600 font-semibold">{post.category}</span>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-xs">{post.title}</span>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Article Header Card */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-blue-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Published {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              SEO & EEAT Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug font-jakarta">
            {post.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-4 border-blue-600 pl-4 py-2 italic bg-blue-50/40 rounded-r-2xl">
            {post.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>{post.author}</span>
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </p>
                <p className="text-[11px] text-slate-500 font-medium">{post.authorRole || 'Senior Digital Strategist'}</p>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 px-2 uppercase tracking-wider">Share</span>
              
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm relative group"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow-sm"
                title="Share on Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${currentUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
                title="Share on X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Desktop 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN ARTICLE COLUMN (8 Cols) */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Hero Featured Image */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 max-h-[400px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Takeaways / Executive Summary Card */}
            <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-jakarta">
                Core Masterclass Highlights
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Structured Implementation Roadmap:</strong> Step-by-step technical blueprint designed for immediate execution without compliance risk.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Deliverability & Authority Growth:</strong> High-impact practices for optimizing IP telemetry, account warm-up, and trust signals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Risk Mitigation Strategy:</strong> Avoid automated limitations, shadowbans, and billing suspensions through clean infrastructure pairing.</span>
                </li>
              </ul>
            </div>

            {/* Mobile Table of Contents Inline */}
            {headings.length > 0 && (
              <div className="lg:hidden bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  <List className="w-4 h-4 text-blue-600" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1.5 text-xs">
                  {headings.map((h, idx) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`block text-left w-full truncate py-1 transition-colors ${
                        activeHeadingId === h.id
                          ? 'text-blue-600 font-bold pl-2 border-l-2 border-blue-600'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {idx + 1}. {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Clean Structured Article Content Body */}
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
              
              <div
                className="prose prose-slate max-w-none 
                  prose-p:text-slate-700 prose-p:text-sm prose-p:sm:text-base prose-p:leading-relaxed prose-p:mb-5
                  prose-ul:my-5 prose-ul:space-y-2.5 prose-ul:text-sm prose-ul:sm:text-base prose-ul:text-slate-700
                  prose-ol:my-5 prose-ol:space-y-2.5 prose-ol:text-sm prose-ol:sm:text-base prose-ol:text-slate-700
                  prose-li:leading-relaxed prose-li:pl-1
                  prose-strong:text-slate-900 prose-strong:font-extrabold
                  prose-code:bg-blue-50 prose-code:text-blue-700 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono
                  prose-pre:bg-slate-900 prose-pre:text-slate-200 prose-pre:p-4 prose-pre:rounded-2xl prose-pre:text-xs prose-pre:overflow-x-auto
                "
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />

              {/* Tags Cloud */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-blue-600" /> Category Tags:
                </span>
                {post.tags.map(t => (
                  <span key={t} className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-xl transition-colors">
                    #{t}
                  </span>
                ))}
              </div>
            </article>

            {/* SEO Interactive FAQ Accordion Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 font-jakarta">
                  Frequently Asked Questions (FAQ)
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Author Bio Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-lg">
                {post.author.charAt(0)}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-base font-bold text-slate-900 font-jakarta flex items-center justify-center sm:justify-start gap-1.5">
                  <span>Written by {post.author}</span>
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </h4>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{post.authorRole || 'Senior Digital Strategist'}</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialist at ReviewSellStore focusing on digital identity compliance, payment gateway security, local SEO algorithms, and automated email deliverability infrastructure.
                </p>
              </div>
            </div>

          </main>

          {/* STICKY SIDEBAR COLUMN (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Desktop Table of Contents Widget */}
            {headings.length > 0 && (
              <div className="hidden lg:block bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                  <List className="w-4 h-4 text-blue-600" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-2 text-xs">
                  {headings.map((h, idx) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`block text-left w-full truncate py-1.5 px-2.5 rounded-xl transition-all ${
                        activeHeadingId === h.id
                          ? 'bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                      }`}
                    >
                      {idx + 1}. {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Recommended Service CTA Widget */}
            {relatedService && (
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl space-y-5 relative overflow-hidden">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Service Solution</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white font-jakarta leading-snug">
                    {relatedService.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {relatedService.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-cyan-400 font-mono">${relatedService.price}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{relatedService.unit}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedToCart ? 'Added to Cart!' : 'Add to Cart Now'}</span>
                  </button>

                  <Link
                    to={`/services/${relatedService.slug}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* ReviewSellStore Marketplace Guarantees Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Storefront Guarantees</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Crypto Checkout:</strong> Automated dispatch within 5-15 minutes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>48-Hour Replacement:</strong> 100% money-back or account swap warranty.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ThumbsUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Verified Quality:</strong> Created on static US residential proxies.</span>
                </div>
              </div>

              <a
                href="https://t.me/reviewsellstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-colors shadow"
              >
                <Headphones className="w-4 h-4" />
                <span>Contact 24/7 Telegram Support</span>
              </a>
            </div>

          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 font-jakarta flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Related Masterclasses & SEO Guides</span>
              </h3>
              <Link to="/blog" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>View All 50+ Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rel => (
                <article
                  key={rel.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all p-5 space-y-3 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      {rel.category}
                    </span>
                    <Link to={`/blog/${rel.slug}`} className="block group-hover:text-blue-600 transition-colors">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 font-jakarta">
                        {rel.title}
                      </h4>
                    </Link>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{rel.publishedAt}</span>
                    <Link to={`/blog/${rel.slug}`} className="font-bold text-blue-600 flex items-center gap-1">
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
