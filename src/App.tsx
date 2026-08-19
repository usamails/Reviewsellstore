/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FloatingBackgroundBlobs } from './components/FloatingBackgroundBlobs';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingSupport } from './components/FloatingSupport';
import { CartDrawer } from './components/CartDrawer';
import { CryptoCheckoutModal } from './components/CryptoCheckoutModal';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PaymentMethodsPage = lazy(() => import('./pages/PaymentMethodsPage').then(m => ({ default: m.PaymentMethodsPage })));
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage').then(m => ({ default: m.OrderTrackingPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));
const BlogListPage = lazy(() => import('./pages/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageFallbackLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center p-8">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white relative">
          
          {/* Background Floating Blobs */}
          <FloatingBackgroundBlobs />

          {/* Sticky Header Navigation */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 relative z-10">
            <Suspense fallback={<PageFallbackLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ProductDetailPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                <Route path="/order-tracking" element={<OrderTrackingPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/refund" element={<RefundPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>

          {/* Floating Live Support Widget */}
          <FloatingSupport />

          {/* Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Crypto Payment Modal */}
          <CryptoCheckoutModal />

          {/* Global SaaS Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
