import React from 'react';
import { RefreshCw, ShieldCheck, Send, Phone } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <SEOHead
        title="100% Replacement Guarantee & Refund Policy | ReviewSellStore"
        description="Learn about ReviewSellStore's 48-hour 100% free account replacement warranty and refund terms for all digital service purchases."
        canonical="/refund"
      />
      
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Quality Guarantee
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta">
          Refund & Replacement Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last updated: July 2026 • ReviewSellStore.com
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
          <h3 className="font-bold text-sm flex items-center gap-1.5 text-emerald-900">
            <RefreshCw className="w-4 h-4 text-emerald-600" /> 100% Replacement Warranty
          </h3>
          <p className="text-xs text-emerald-800">
            We offer 100% free replacement for any account credentials that fail initial login or exhibit status errors upon delivery.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Warranty Coverage</h2>
          <p>
            All digital accounts (USA Gmail, PVA Gmail, Google Voice numbers, PayPal accounts, GitHub profiles) come with a 48-hour initial login guarantee. If an account is disabled or incorrect upon first login attempt, contact support for an instant replacement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Review Replacement Guarantee</h2>
          <p>
            Google Reviews and Trustpilot Reviews posted through our drip-feed system include a sticky non-drop warranty. In the rare event a review drops within 30 days, we re-post it free of charge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Bad Review Removal Warranty</h2>
          <p>
            Bad Google review removal services operate on a success-or-refund guarantee. If our legal dispute process fails to remove the specified review, you receive a full replacement credit or crypto refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. How to Request Replacement</h2>
          <p>
            Message our 24/7 support with your Order ID and brief screenshot of the login error via Telegram (@EgSupport24) or WhatsApp (+1 307-393-9979).
          </p>
        </section>

      </div>

    </div>
  );
};
