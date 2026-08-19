import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <SEOHead
        title="Terms of Service | ReviewSellStore User Agreement"
        description="ReviewSellStore terms of service, account replacement warranties, customer responsibilities, and service delivery policies."
        canonical="/terms"
      />
      
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          User Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last updated: July 2026 • ReviewSellStore.com
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or placing an order on ReviewSellStore.com, you agree to be bound by these Terms of Service. If you do not agree, please refrain from using our marketplace.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Service Usage & Fair Play</h2>
          <p>
            Purchased digital items (verified PayPal accounts, USA Gmail lists, Google Voice numbers, Trustpilot reviews, GitHub profiles) are provided for legitimate business testing, communication, and marketing purposes. Users are responsible for complying with applicable local platform guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Delivery & Dispatch SLA</h2>
          <p>
            Standard digital accounts are dispatched within 5 to 30 minutes following blockchain payment confirmation. Bulk custom orders or drip-feed review campaigns follow the timeline agreed upon with support.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Crypto Transactions</h2>
          <p>
            All prices are quoted in USD and payable in accepted cryptocurrencies. Users must select the exact matching network (ERC20, TRC20, BEP20, etc.) when sending funds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Custom Orders & Testing</h2>
          <p className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
            “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
          </p>
        </section>

      </div>

    </div>
  );
};
