import fs from 'fs';
import path from 'path';
import { ALL_SERVICES, SERVICE_CATEGORIES, FAQS } from '../src/data/servicesData';
import { ALL_BLOG_POSTS } from '../src/data/blogsData';

const SITE_URL = 'https://reviewsellstore.com';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

interface RouteConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  schema?: any;
  htmlContent: string;
}

// Helper to sanitize text for HTML
function escapeHtml(str: string | undefined | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Common Header Pre-render HTML
function getHeaderHtml(): string {
  return `
    <header class="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
            R
          </div>
          <div class="flex flex-col">
            <span class="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight font-jakarta">ReviewSellStore</span>
            <span class="text-[10px] font-semibold text-blue-600 tracking-wider uppercase -mt-1">Verified Digital Marketplace</span>
          </div>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700">
          <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
          <a href="/services" class="hover:text-blue-600 transition-colors">Services</a>
          <a href="/pricing" class="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="/blog" class="hover:text-blue-600 transition-colors">Blog & Guides</a>
          <a href="/faq" class="hover:text-blue-600 transition-colors">FAQ</a>
          <a href="/payment-methods" class="hover:text-blue-600 transition-colors">Crypto Checkout</a>
          <a href="/contact" class="hover:text-blue-600 transition-colors">Live Support</a>
        </nav>
        <div class="flex items-center gap-3">
          <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5">
            <span>24/7 Telegram Support</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// Common Footer Pre-render HTML
function getFooterHtml(): string {
  return `
    <footer class="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-base">R</div>
              <span class="text-lg font-extrabold text-white font-jakarta">ReviewSellStore</span>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed max-w-sm">
              ReviewSellStore is a premier digital marketplace providing phone-verified accounts, Google reviews, Trustpilot reviews, USA Gmails, Google Voice numbers, and aged developer profiles with 24/7 crypto checkout.
            </p>
            <div class="flex items-center gap-3 pt-2 text-white text-xs font-medium">
              <span>Telegram: <a href="https://t.me/EgSupport24" class="text-cyan-400 hover:underline">@EgSupport24</a></span>
              <span>•</span>
              <span>WhatsApp: <a href="https://wa.me/13073939979" class="text-emerald-400 hover:underline">+1 (307) 393-9979</a></span>
            </div>
          </div>
          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">Core Services</h4>
            <ul class="space-y-2.5 text-slate-400">
              <li><a href="/services/buy-verified-paypal-personal-account" class="hover:text-white transition-colors">Verified PayPal Personal</a></li>
              <li><a href="/services/buy-verified-paypal-business-account" class="hover:text-white transition-colors">Verified PayPal Business</a></li>
              <li><a href="/services/buy-google-reviews" class="hover:text-white transition-colors">Buy Google Reviews</a></li>
              <li><a href="/services/buy-trustpilot-reviews" class="hover:text-white transition-colors">Buy Trustpilot Reviews</a></li>
              <li><a href="/services/buy-usa-pva-gmail-accounts" class="hover:text-white transition-colors">Buy USA Gmail Accounts</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">Popular Categories</h4>
            <ul class="space-y-2.5 text-slate-400">
              <li><a href="/services?cat=verified-accounts" class="hover:text-white transition-colors">Verified Payment Accounts</a></li>
              <li><a href="/services?cat=reputation-management" class="hover:text-white transition-colors">Reputation Management</a></li>
              <li><a href="/services?cat=gmail-accounts" class="hover:text-white transition-colors">USA PVA Gmail Accounts</a></li>
              <li><a href="/services?cat=virtual-number-services" class="hover:text-white transition-colors">Google Voice & Virtual Lines</a></li>
              <li><a href="/services?cat=developer-accounts" class="hover:text-white transition-colors">Aged GitHub Accounts</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">Navigation & Legal</h4>
            <ul class="space-y-2.5 text-slate-400">
              <li><a href="/about" class="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/pricing" class="hover:text-white transition-colors">Pricing Matrix</a></li>
              <li><a href="/blog" class="hover:text-white transition-colors">SEO & Growth Guides</a></li>
              <li><a href="/faq" class="hover:text-white transition-colors">FAQ & Support</a></li>
              <li><a href="/order-tracking" class="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" class="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/refund" class="hover:text-white transition-colors">Refund & Replacement</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 ReviewSellStore.com. All rights reserved. Managed by Senior Technical SEO & Infrastructure Engineers.</p>
          <div class="flex items-center gap-4">
            <a href="/sitemap.xml" class="hover:text-slate-300">XML Sitemap</a>
            <a href="/robots.txt" class="hover:text-slate-300">Robots.txt</a>
            <a href="/rss.xml" class="hover:text-slate-300">RSS Feed</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Generate static routes data
function buildRoutesData(): RouteConfig[] {
  const routes: RouteConfig[] = [];

  // 1. Homepage Route
  routes.push({
    path: '/',
    title: 'ReviewSellStore | Buy Verified Accounts, Google Reviews & Digital Services',
    description: 'Premier digital services marketplace. Buy verified PayPal accounts, USA Gmails, Google Voice numbers, Trustpilot reviews, Google Local Guide reviews, and aged GitHub accounts with instant crypto checkout.',
    keywords: 'buy verified paypal, buy google reviews, buy trustpilot reviews, buy gmail accounts, google voice numbers, digital accounts marketplace',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'ReviewSellStore',
          url: SITE_URL,
          description: 'Premier marketplace for verified digital accounts and business reputation management services.',
          publisher: {
            '@id': `${SITE_URL}/#organization`
          }
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'ReviewSellStore',
          url: SITE_URL,
          logo: `${SITE_URL}/apple-touch-icon.png`,
          image: `${SITE_URL}/apple-touch-icon.png`,
          description: 'Your Trusted Digital Services Marketplace for Verified Accounts, Reputation Management, and Phone Numbers.',
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              telephone: '+1-307-393-9979',
              url: `${SITE_URL}/contact`,
              availableLanguage: ['English']
            }
          ]
        }
      ]
    },
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section class="text-center space-y-6 max-w-4xl mx-auto">
          <span class="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            Verified Digital Services & Reputation Solutions
          </span>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-jakarta leading-tight">
            Buy Verified Accounts, Google Reviews & Digital Services
          </h1>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            ReviewSellStore provides fully phone-verified PayPal accounts, USA PVA Gmails, Google Voice numbers, 5-Star Local Guide Google reviews, Trustpilot reviews, and aged GitHub profiles with 24/7 instant crypto dispatch.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="/services" class="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25">Browse Catalog</a>
            <a href="/pricing" class="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm">View Pricing Matrix</a>
          </div>
        </section>

        <section class="space-y-8">
          <div class="text-center space-y-2">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-jakarta">Core Service Categories</h2>
            <p class="text-slate-500 text-xs sm:text-sm">High quality verified accounts and reputation management built for business scaling.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${SERVICE_CATEGORIES.map(cat => `
              <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <h3 class="text-lg font-bold text-slate-900">${escapeHtml(cat.name)}</h3>
                <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(cat.description)}</p>
                <div class="pt-2 text-xs font-semibold text-blue-600">Popular: ${escapeHtml(cat.popularItem)}</div>
                <a href="/services?cat=${cat.id}" class="inline-block text-xs font-bold text-blue-600 hover:underline pt-1">Explore ${escapeHtml(cat.name)} →</a>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="space-y-8">
          <div class="text-center space-y-2">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-jakarta">Popular Digital Services</h2>
            <p class="text-slate-500 text-xs sm:text-sm">Top-rated accounts and reviews ready for instant delivery.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${ALL_SERVICES.slice(0, 6).map(s => `
              <article class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">${escapeHtml(s.categoryName)}</span>
                  <span class="text-xs font-extrabold text-blue-600">$${s.price} ${escapeHtml(s.unit)}</span>
                </div>
                <h3 class="text-base font-bold text-slate-900 font-jakarta">
                  <a href="/services/${s.slug}" class="hover:text-blue-600 transition-colors">${escapeHtml(s.title)}</a>
                </h3>
                <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">${escapeHtml(s.description)}</p>
                <div class="pt-2 flex items-center justify-between">
                  <span class="text-[11px] text-emerald-600 font-semibold">⚡ ${escapeHtml(s.deliveryTime)}</span>
                  <a href="/services/${s.slug}" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs">View Details</a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="space-y-8 bg-slate-900 text-white p-8 sm:p-12 rounded-3xl">
          <div class="text-center space-y-3">
            <h2 class="text-2xl sm:text-4xl font-extrabold font-jakarta">Knowledge Hub & SEO Growth Guides</h2>
            <p class="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">Master deliverability, merchant account compliance, and reputation management.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${ALL_BLOG_POSTS.slice(0, 3).map(b => `
              <article class="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                <span class="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">${escapeHtml(b.category)}</span>
                <h3 class="text-sm font-bold text-white line-clamp-2">
                  <a href="/blog/${b.slug}" class="hover:text-cyan-300">${escapeHtml(b.title)}</a>
                </h3>
                <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">${escapeHtml(b.excerpt)}</p>
                <a href="/blog/${b.slug}" class="inline-block text-xs font-bold text-cyan-400 hover:underline">Read Article →</a>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
    `
  });

  // 2. Services List Page
  routes.push({
    path: '/services',
    title: 'Verified Digital Services Catalog | Buy PayPal, Google Reviews, Gmails',
    description: 'Explore our complete catalog of verified digital accounts: Personal & Business PayPal accounts, USA Gmails, Google Voice numbers, Trustpilot & Google reviews, and aged GitHub accounts.',
    keywords: 'digital accounts catalog, buy verified paypal, buy google reviews, buy gmail accounts',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/services#collection`,
          name: 'Verified Digital Services Catalog',
          url: `${SITE_URL}/services`,
          description: 'Complete catalog of verified digital accounts and business reputation management services.',
          hasPart: ALL_SERVICES.map(s => ({
            '@type': 'Product',
            name: s.title,
            url: `${SITE_URL}/services/${s.slug}`,
            offers: {
              '@type': 'Offer',
              price: s.price,
              priceCurrency: 'USD'
            }
          }))
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/services#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` }
          ]
        }
      ]
    },
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Digital Services Marketplace
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            All Verified Digital Services & Packages
          </h1>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse verified accounts, bulk Gmail lists, Google Voice numbers, Trustpilot reviews, and aged developer profiles. Dedicated product pages, quantity variants & 24/7 instant crypto dispatch.
          </p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${ALL_SERVICES.map(s => `
            <article class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">${escapeHtml(s.categoryName)}</span>
                <span class="text-xs font-extrabold text-blue-600">$${s.price} ${escapeHtml(s.unit)}</span>
              </div>
              <h2 class="text-base font-bold text-slate-900 font-jakarta">
                <a href="/services/${s.slug}" class="hover:text-blue-600 transition-colors">${escapeHtml(s.title)}</a>
              </h2>
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">${escapeHtml(s.description)}</p>
              <div class="pt-2 flex items-center justify-between">
                <span class="text-[11px] text-emerald-600 font-semibold">⚡ Delivery: ${escapeHtml(s.deliveryTime)}</span>
                <a href="/services/${s.slug}" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs">View Service</a>
              </div>
            </article>
          `).join('')}
        </section>
      </main>
    `
  });

  // 3. Pricing Matrix Page
  routes.push({
    path: '/pricing',
    title: 'Digital Services Pricing Matrix | Transparent & Bulk Tier Rates',
    description: 'View transparent pricing tables and bulk tier discounts for verified PayPal accounts, USA Gmails, Google Voice numbers, Trustpilot reviews, and aged GitHub accounts.',
    keywords: 'paypal pricing, google reviews price, gmail account cost, trustpilot review rates',
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Transparent Tiered Pricing
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Digital Services Pricing Matrix
          </h1>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Compare unit prices, volume package savings, and warranty coverage across all 15+ verified account & reputation service tiers.
          </p>
        </header>

        <section class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-100 text-slate-900 uppercase font-bold text-[11px]">
              <tr>
                <th class="p-4">Service Name</th>
                <th class="p-4">Category</th>
                <th class="p-4">Base Price</th>
                <th class="p-4">Delivery Time</th>
                <th class="p-4">Warranty</th>
                <th class="p-4">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${ALL_SERVICES.map(s => `
                <tr class="hover:bg-slate-50">
                  <td class="p-4 font-bold text-slate-900"><a href="/services/${s.slug}" class="hover:text-blue-600">${escapeHtml(s.title)}</a></td>
                  <td class="p-4">${escapeHtml(s.categoryName)}</td>
                  <td class="p-4 font-extrabold text-blue-600">$${s.price} / ${escapeHtml(s.unit)}</td>
                  <td class="p-4 text-emerald-600 font-medium">${escapeHtml(s.deliveryTime)}</td>
                  <td class="p-4 text-slate-600">100% 48-Hour Free Replacement</td>
                  <td class="p-4"><a href="/services/${s.slug}" class="px-3 py-1.5 rounded bg-blue-600 text-white font-bold text-xs">Details</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>
      </main>
    `
  });

  // 4. Blog List Page
  routes.push({
    path: '/blog',
    title: 'Knowledge Hub & Digital Growth Guides | ReviewSellStore Blog',
    description: 'Master cold email deliverability, PayPal merchant compliance, Google Local Guide reviews, and Trustpilot TrustScore algorithms with our expert technical guides.',
    keywords: 'digital growth guides, paypal compliance, google review strategy, cold email deliverability',
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Digital Growth Knowledge Hub
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Latest Industry Articles & Technical Guides
          </h1>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            In-depth operational protocols for merchant payment gateways, reputation scaling, PVA email deliverability, and virtual phone verification.
          </p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${ALL_BLOG_POSTS.map(b => `
            <article class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">${escapeHtml(b.category)}</span>
              <h2 class="text-base font-bold text-slate-900 font-jakarta">
                <a href="/blog/${b.slug}" class="hover:text-blue-600 transition-colors">${escapeHtml(b.title)}</a>
              </h2>
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">${escapeHtml(b.excerpt)}</p>
              <div class="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>By ${escapeHtml(b.author)}</span>
                <a href="/blog/${b.slug}" class="font-bold text-blue-600 hover:underline">Read Article →</a>
              </div>
            </article>
          `).join('')}
        </section>
      </main>
    `
  });

  // 5. FAQ Page
  routes.push({
    path: '/faq',
    title: 'Frequently Asked Questions (FAQ) | ReviewSellStore Support',
    description: 'Find answers to all questions regarding account delivery, replacement guarantees, cookie setup, crypto payment networks, and custom bulk review orders.',
    keywords: 'reviewsellstore faq, digital accounts support, paypal warranty, google review guarantee',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` }
          ]
        }
      ]
    },
    htmlContent: `
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header class="text-center space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Knowledge Base & Support
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Frequently Asked Questions
          </h1>
          <p class="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about purchasing verified accounts, importing browser session cookies, 24/7 crypto payments, and account replacement guarantees.
          </p>
        </header>

        <section class="space-y-4">
          ${FAQS.map((faq, i) => `
            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h2 class="text-base font-bold text-slate-900 font-jakarta">${i + 1}. ${escapeHtml(faq.question)}</h2>
              <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(faq.answer)}</p>
            </div>
          `).join('')}
        </section>
      </main>
    `
  });

  // 6. About Page
  routes.push({
    path: '/about',
    title: 'About ReviewSellStore | Leading Digital Accounts Marketplace',
    description: 'Learn about ReviewSellStore.com: Our mission, quality standards, 24/7 technical support, and instant crypto dispatch infrastructure.',
    keywords: 'about reviewsellstore, digital accounts vendor, verified accounts seller',
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header class="text-center max-w-3xl mx-auto space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            About ReviewSellStore.com
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Your Trusted Digital Services Marketplace
          </h1>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            ReviewSellStore is a premier digital marketplace providing businesses, marketing agencies, and software developers with phone-verified accounts, reputation management tools, and virtual lines backed by 24/7 crypto payments.
          </p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h2 class="text-base font-bold text-slate-900">100% Phone & Document Verified</h2>
            <p class="text-xs text-slate-600 leading-relaxed">Every account is created with real residential proxies, mobile SIM cards, and legitimate SSN/EIN document credentials for maximum longevity.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h2 class="text-base font-bold text-slate-900">48-Hour Free Replacement</h2>
            <p class="text-xs text-slate-600 leading-relaxed">We back all orders with a 100% free account replacement warranty in case of any initial login checkpoint or credential mismatch.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h2 class="text-base font-bold text-slate-900">24/7 Telegram & WhatsApp Support</h2>
            <p class="text-xs text-slate-600 leading-relaxed">Our dedicated technical engineering support team is available around the clock to guide you through session cookie import and setup.</p>
          </div>
        </section>
      </main>
    `
  });

  // 7. Contact Page
  routes.push({
    path: '/contact',
    title: 'Contact Live Customer Support | ReviewSellStore Telegram & WhatsApp',
    description: 'Get instant 24/7 technical customer support for custom bulk orders, testing, and credential assistance on Telegram (@EgSupport24) or WhatsApp (+1 307-393-9979).',
    keywords: 'contact reviewsellstore, reviewsellstore telegram, reviewsellstore support',
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            24/7 Live Support
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Contact Technical Support Team
          </h1>
          <p class="text-sm text-slate-600 leading-relaxed">
            Need a custom order build, bulk discount tier, or instant credential test? Reach out directly via Telegram or WhatsApp.
          </p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="p-8 rounded-3xl bg-blue-600 text-white space-y-4">
            <h2 class="text-2xl font-bold font-jakarta">Telegram Live Channel</h2>
            <p class="text-xs text-blue-100">Instant response for technical support, replacement requests, and crypto dispatch verification.</p>
            <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" class="inline-block px-5 py-2.5 rounded-xl bg-white text-blue-600 font-bold text-xs">Message @EgSupport24</a>
          </div>

          <div class="p-8 rounded-3xl bg-emerald-600 text-white space-y-4">
            <h2 class="text-2xl font-bold font-jakarta">WhatsApp Direct Line</h2>
            <p class="text-xs text-emerald-100">Direct mobile messaging for agency inquiries, custom bulk invoicing, and order updates.</p>
            <a href="https://wa.me/13073939979" target="_blank" rel="noopener noreferrer" class="inline-block px-5 py-2.5 rounded-xl bg-white text-emerald-600 font-bold text-xs">Chat +1 (307) 393-9979</a>
          </div>
        </section>
      </main>
    `
  });

  // 8. Payment Methods Page
  routes.push({
    path: '/payment-methods',
    title: 'Accepted Crypto Payment Deposit Addresses | ReviewSellStore',
    description: 'View accepted cryptocurrency deposit addresses (BTC, ETH, USDT ERC20/TRC20, LTC, SOL, BNB, DOGE, XRP, TRX) for instant order processing.',
    keywords: 'crypto checkout, buy accounts with usdt, btc digital store',
    htmlContent: `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Cryptocurrency Checkout
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Accepted Payment Methods & Deposit Addresses
          </h1>
          <p class="text-sm text-slate-600 leading-relaxed">
            We accept 12 major cryptocurrency networks for instant, private, and secure automated dispatch.
          </p>
        </header>
      </main>
    `
  });

  // 9. Order Tracking Page
  routes.push({
    path: '/order-tracking',
    title: 'Live Order Tracking | ReviewSellStore Instant Dispatch Portal',
    description: 'Track the real-time dispatch status of your purchased verified PayPal accounts, Gmail lists, Google Voice numbers, and Google reviews.',
    keywords: 'track reviewsellstore order, digital account dispatch status',
    htmlContent: `
      <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header class="text-center space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Automated Order Tracking
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
            Track Order Dispatch
          </h1>
          <p class="text-sm text-slate-600">
            Enter your Transaction Hash or Order ID to inspect live dispatch and verification status.
          </p>
        </header>
      </main>
    `
  });

  // 10. Privacy Policy
  routes.push({
    path: '/privacy',
    title: 'Privacy Policy & Data Security | ReviewSellStore',
    description: 'Read ReviewSellStore\'s privacy policy regarding data protection, customer confidentiality, and non-disclosure of buyer credentials.',
    keywords: 'reviewsellstore privacy policy, buyer data confidentiality',
    htmlContent: `
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header class="space-y-3 pb-6 border-b border-slate-200">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta">Privacy Policy</h1>
          <p class="text-xs text-slate-500">Last updated: July 2026 • ReviewSellStore.com</p>
        </header>
        <div class="prose prose-slate text-xs sm:text-sm text-slate-600 space-y-4">
          <p>ReviewSellStore values customer privacy and confidentiality. We store zero personal financial data on our servers. All transactions are processed using decentralized peer-to-peer cryptocurrency networks.</p>
        </div>
      </main>
    `
  });

  // 11. Terms of Service
  routes.push({
    path: '/terms',
    title: 'Terms of Service | ReviewSellStore User Agreement',
    description: 'ReviewSellStore terms of service, account replacement warranties, customer responsibilities, and service delivery policies.',
    keywords: 'reviewsellstore terms of service, account warranty terms',
    htmlContent: `
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header class="space-y-3 pb-6 border-b border-slate-200">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta">Terms of Service</h1>
          <p class="text-xs text-slate-500">Last updated: July 2026 • ReviewSellStore.com</p>
        </header>
        <div class="prose prose-slate text-xs sm:text-sm text-slate-600 space-y-4">
          <p>By using ReviewSellStore.com, you agree to our service delivery protocols, 48-hour login guarantee terms, and antidetect browser session cookie guidelines.</p>
        </div>
      </main>
    `
  });

  // 12. Refund Policy
  routes.push({
    path: '/refund',
    title: '100% Replacement Guarantee & Refund Policy | ReviewSellStore',
    description: 'Learn about ReviewSellStore\'s 48-hour 100% free account replacement warranty and refund terms for all digital service purchases.',
    keywords: 'reviewsellstore refund policy, account replacement guarantee',
    htmlContent: `
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header class="space-y-3 pb-6 border-b border-slate-200">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta">Refund & Replacement Policy</h1>
          <p class="text-xs text-slate-500">Last updated: July 2026 • ReviewSellStore.com</p>
        </header>
        <div class="prose prose-slate text-xs sm:text-sm text-slate-600 space-y-4">
          <p>We provide a 100% 48-hour free account replacement guarantee for any initial login credential checkpoint or error. Contact live support on Telegram or WhatsApp for instant resolution.</p>
        </div>
      </main>
    `
  });

  // Dynamic Service Pages (`/services/:slug`)
  for (const s of ALL_SERVICES) {
    const serviceUrl = `${SITE_URL}/services/${s.slug}`;
    
    // Find related services from same category
    const related = ALL_SERVICES.filter(rel => rel.slug !== s.slug && rel.categoryId === s.categoryId).slice(0, 5);
    const otherServices = related.length >= 3 ? related : ALL_SERVICES.filter(rel => rel.slug !== s.slug).slice(0, 5);

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Product', 'Service'],
          '@id': `${serviceUrl}#product`,
          name: s.title,
          description: s.description,
          image: [`${SITE_URL}/apple-touch-icon.png`],
          sku: s.slug,
          brand: {
            '@type': 'Brand',
            name: 'ReviewSellStore'
          },
          provider: {
            '@type': 'Organization',
            name: 'ReviewSellStore',
            url: SITE_URL
          },
          offers: {
            '@type': 'Offer',
            '@id': `${serviceUrl}#offer`,
            priceCurrency: 'USD',
            price: s.price,
            priceValidUntil: '2027-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            url: serviceUrl,
            seller: {
              '@type': 'Organization',
              name: 'ReviewSellStore',
              url: SITE_URL
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
          '@id': `${serviceUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
            { '@type': 'ListItem', position: 3, name: s.categoryName, item: `${SITE_URL}/services` },
            { '@type': 'ListItem', position: 4, name: s.title, item: serviceUrl }
          ]
        },
        ...(s.faqs && s.faqs.length > 0 ? [{
          '@type': 'FAQPage',
          mainEntity: s.faqs.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer
            }
          }))
        }] : [])
      ]
    };

    routes.push({
      path: `/services/${s.slug}`,
      title: s.seoTitle || `${s.title} | ReviewSellStore`,
      description: s.description,
      keywords: s.seoKeywords?.join(', '),
      schema,
      htmlContent: `
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <a href="/" class="hover:text-blue-600">Home</a>
            <span>/</span>
            <a href="/services" class="hover:text-blue-600">Services</a>
            <span>/</span>
            <span class="text-slate-700 font-semibold">${escapeHtml(s.categoryName)}</span>
            <span>/</span>
            <span class="text-blue-600 font-bold">${escapeHtml(s.title)}</span>
          </nav>

          <!-- Product Main Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div class="lg:col-span-7 space-y-6">
              <span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
                ${escapeHtml(s.categoryName)}
              </span>
              <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta leading-tight">
                ${escapeHtml(s.title)}
              </h1>
              <p class="text-base text-slate-600 leading-relaxed font-medium">
                ${escapeHtml(s.description)}
              </p>

              <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <h2 class="text-lg font-bold text-slate-900 font-jakarta">Key Service Specifications</h2>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                  ${s.features.map(f => `<li class="flex items-center gap-2">✔ ${escapeHtml(f)}</li>`).join('')}
                </ul>
              </div>

              <!-- Detailed Long Description for Google Search Crawlers -->
              <article class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 pt-4 border-t border-slate-200">
                <h2 class="text-xl font-bold text-slate-900 font-jakarta">Complete Service Breakdown & Quality Overview</h2>
                <p>${escapeHtml(s.longDescription || s.description)}</p>
              </article>
            </div>

            <!-- Right Column Purchasing Box -->
            <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span class="text-xs text-slate-400 font-medium">Price per unit:</span>
                  <div class="text-3xl font-extrabold text-slate-900 font-jakarta">$${s.price}</div>
                </div>
                <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  ⚡ Delivery: ${escapeHtml(s.deliveryTime)}
                </span>
              </div>

              ${s.variants && s.variants.length > 0 ? `
                <div class="space-y-3">
                  <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Package Volume:</h3>
                  <div class="space-y-2">
                    ${s.variants.map(v => `
                      <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs font-medium">
                        <span class="font-bold text-slate-900">${escapeHtml(v.name)}</span>
                        <span class="font-extrabold text-blue-600">$${v.price}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="space-y-3 pt-2">
                <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center block shadow-lg shadow-blue-600/20">
                  Buy Now via Telegram / Crypto
                </a>
                <p class="text-[11px] text-center text-slate-400 font-medium">100% 48-Hour Free Account Replacement Warranty Included</p>
              </div>
            </div>
          </div>

          <!-- FAQs Section -->
          ${s.faqs && s.faqs.length > 0 ? `
            <section class="space-y-6 pt-8 border-t border-slate-200">
              <h2 class="text-2xl font-bold text-slate-900 font-jakarta">Frequently Asked Questions</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${s.faqs.map(faq => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h3 class="text-xs font-bold text-slate-900">${escapeHtml(faq.question)}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(faq.answer)}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Internal Link Silo / Related Services -->
          <section class="space-y-6 pt-8 border-t border-slate-200">
            <h2 class="text-xl font-bold text-slate-900 font-jakarta">Related Digital Services & Packages</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              ${otherServices.map(rel => `
                <a href="/services/${rel.slug}" class="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-colors space-y-2 block">
                  <div class="text-xs font-bold text-slate-900">${escapeHtml(rel.title)}</div>
                  <div class="text-[11px] text-slate-500 line-clamp-2">${escapeHtml(rel.description)}</div>
                  <div class="text-xs font-extrabold text-blue-600 pt-1">$${rel.price} ${escapeHtml(rel.unit)}</div>
                </a>
              `).join('')}
            </div>
          </section>
        </main>
      `
    });
  }

  // Dynamic Blog Detail Pages (`/blog/:slug`)
  for (const b of ALL_BLOG_POSTS) {
    const blogUrl = `${SITE_URL}/blog/${b.slug}`;

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${blogUrl}#article`,
          headline: b.title,
          description: b.excerpt,
          datePublished: b.publishedAt || b.date,
          dateModified: b.publishedAt || b.date,
          author: {
            '@type': 'Person',
            name: b.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'ReviewSellStore',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/apple-touch-icon.png`
            }
          },
          mainEntityOfPage: blogUrl
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${blogUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
            { '@type': 'ListItem', position: 3, name: b.title, item: blogUrl }
          ]
        }
      ]
    };

    routes.push({
      path: `/blog/${b.slug}`,
      title: b.seoTitle || `${b.title} | ReviewSellStore`,
      description: b.metaDescription || b.excerpt,
      keywords: b.seoKeywords?.join(', ') || b.tags?.join(', '),
      schema,
      htmlContent: `
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          <nav class="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <a href="/" class="hover:text-blue-600">Home</a>
            <span>/</span>
            <a href="/blog" class="hover:text-blue-600">Blog</a>
            <span>/</span>
            <span class="text-blue-600 font-bold truncate max-w-xs">${escapeHtml(b.title)}</span>
          </nav>

          <article class="space-y-6">
            <header class="space-y-4 pb-6 border-b border-slate-200">
              <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                ${escapeHtml(b.category)}
              </span>
              <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta leading-tight">
                ${escapeHtml(b.title)}
              </h1>
              <div class="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span>By ${escapeHtml(b.author)}</span>
                <span>•</span>
                <span>Published: ${escapeHtml(b.publishedAt || b.date)}</span>
                <span>•</span>
                <span>${escapeHtml(b.readTime)}</span>
              </div>
            </header>

            <div class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              ${b.content}
            </div>
          </article>
        </main>
      `
    });
  }

  return routes;
}

// Generate static XML Sitemap
function generateSitemapXml(routes: RouteConfig[]): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const urlEntries = routes.map(r => {
    const loc = r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`;
    let priority = '0.80';
    let changefreq = 'weekly';

    if (r.path === '/') {
      priority = '1.00';
      changefreq = 'daily';
    } else if (r.path === '/services' || r.path === '/pricing' || r.path === '/blog') {
      priority = '0.90';
      changefreq = 'daily';
    } else if (r.path.startsWith('/services/')) {
      priority = '0.85';
      changefreq = 'daily';
    } else if (r.path.startsWith('/blog/')) {
      priority = '0.75';
      changefreq = 'weekly';
    }

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

// Generate Robots.txt
function generateRobotsTxt(): string {
  return `# Robots.txt for ReviewSellStore.com
User-agent: *
Allow: /
Disallow: /api/
Disallow: /order-tracking
Disallow: /404

User-agent: Googlebot
Allow: /
Allow: /services
Allow: /blog
Allow: /pricing
Allow: /faq
Allow: /about
Allow: /contact
Allow: /payment-methods

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-index.xml
Host: reviewsellstore.com
`;
}

// Generate RSS Feed
function generateRssXml(): string {
  const currentDate = new Date().toUTCString();
  const items = ALL_BLOG_POSTS.map(b => `    <item>
      <title>${escapeHtml(b.title)}</title>
      <link>${SITE_URL}/blog/${b.slug}</link>
      <description>${escapeHtml(b.excerpt)}</description>
      <author>${escapeHtml(b.author)}</author>
      <category>${escapeHtml(b.category)}</category>
      <pubDate>${currentDate}</pubDate>
      <guid>${SITE_URL}/blog/${b.slug}</guid>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ReviewSellStore Knowledge Hub &amp; Growth Feed</title>
    <link>${SITE_URL}</link>
    <description>Technical guides on verified accounts, reputation management, and email deliverability.</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

// Main Prerender Build Pipeline
async function runPrerender() {
  console.log('🚀 Starting Technical SEO Prerender & Static HTML Generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: dist/ directory does not exist. Run "vite build" first.');
    process.exit(1);
  }

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('❌ Error: dist/index.html not found.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

  // Strip existing variable meta & script tags from base template to avoid duplicate tags in prerendered files
  const cleanTemplate = templateHtml
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']keywords["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']twitter:[\s\S]*?>/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, '');

  const routes = buildRoutesData();

  console.log(`📦 Pre-rendering ${routes.length} static routes with clean metadata & schemas...`);

  const headerHtml = getHeaderHtml();
  const footerHtml = getFooterHtml();

  for (const route of routes) {
    const fullHtmlContent = `${headerHtml}${route.htmlContent}${footerHtml}`;
    const canonicalUrl = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;

    const seoHeadTags = `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    ${route.keywords ? `<meta name="keywords" content="${escapeHtml(route.keywords)}" />` : ''}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="${route.path.startsWith('/blog/') ? 'article' : 'website'}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="ReviewSellStore" />
    <meta property="og:image" content="${SITE_URL}/apple-touch-icon.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${SITE_URL}/apple-touch-icon.png" />
    ${route.schema ? `<script type="application/ld+json" id="static-prerender-schema">${JSON.stringify(route.schema, null, 2)}</script>` : ''}
    `;

    // Construct full pre-rendered page
    let pageHtml = cleanTemplate;
    pageHtml = pageHtml.replace('</head>', `${seoHeadTags}\n</head>`);
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${fullHtmlContent}</div>`);

    // Write to destination
    if (route.path === '/') {
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), pageHtml, 'utf-8');
    } else {
      const relPath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
      const targetDir = path.join(DIST_DIR, relPath);
      fs.mkdirSync(targetDir, { recursive: true });

      // Write dist/<route>/index.html
      fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf-8');

      // Also write dist/<route>.html for web servers supporting extensionless clean URLs
      fs.writeFileSync(`${targetDir}.html`, pageHtml, 'utf-8');
    }
  }

  // Generate 404.html (Clean static 404 page for invalid routes)
  const notFoundHead = `
    <title>404 - Page Not Found | ReviewSellStore</title>
    <meta name="description" content="The page you requested does not exist. Explore verified accounts and reputation services." />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${SITE_URL}/404" />
  `;
  let notFoundHtml = cleanTemplate
    .replace('</head>', `${notFoundHead}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${headerHtml}
      <main class="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 class="text-4xl font-extrabold text-slate-900 font-jakarta">404 - Page Not Found</h1>
        <p class="text-sm text-slate-600 max-w-md">The requested page could not be located. Explore our verified digital services catalog below.</p>
        <a href="/services" class="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">View All Services</a>
      </main>${footerHtml}</div>`);

  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');

  // Generate SEO Static Files in dist/
  console.log('⚙️  Generating Robots.txt, Sitemap.xml, Manifest, RSS, and Security files...');

  const sitemapXml = generateSitemapXml(routes);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`, 'utf-8');

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), generateRobotsTxt(), 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'rss.xml'), generateRssXml(), 'utf-8');

  // Manifest
  const manifestJson = {
    name: 'ReviewSellStore Marketplace',
    short_name: 'ReviewSellStore',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  };
  fs.writeFileSync(path.join(DIST_DIR, 'manifest.json'), JSON.stringify(manifestJson, null, 2), 'utf-8');

  // Humans.txt & Security.txt
  fs.writeFileSync(path.join(DIST_DIR, 'humans.txt'), `/* TEAM */
  Technical SEO Engineer: ReviewSellStore Infrastructure Team
  Site: ${SITE_URL}
  Contact: support@reviewsellstore.com
  Telegram: @EgSupport24
  WhatsApp: +1 307-393-9979
  
  /* SITE */
  Standards: HTML5, CSS3, TypeScript, React 19, Static Site Pre-rendering
  Components: Tailwind CSS, Motion
`, 'utf-8');

  fs.mkdirSync(path.join(DIST_DIR, '.well-known'), { recursive: true });
  fs.writeFileSync(path.join(DIST_DIR, '.well-known', 'security.txt'), `Contact: support@reviewsellstore.com
Contact: https://t.me/EgSupport24
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: ${SITE_URL}/.well-known/security.txt
`, 'utf-8');

  console.log('✅ Technical SEO Pre-render build completed successfully!');
  console.log(`🎉 Generated ${routes.length} pre-rendered HTML files, sitemaps, robots.txt, and RSS feeds in dist/`);
}

runPrerender().catch(err => {
  console.error('❌ Prerender script failed:', err);
  process.exit(1);
});
