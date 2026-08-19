import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <SEOHead
        title="Privacy Policy & Data Security | ReviewSellStore"
        description="Read ReviewSellStore's privacy policy regarding data protection, customer confidentiality, and non-disclosure of buyer credentials."
        canonical="/privacy"
      />
      
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Legal Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-jakarta">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last updated: July 2026 • ReviewSellStore.com
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-900 space-y-1">
          <h3 className="font-bold text-sm flex items-center gap-1.5 text-blue-900">
            <Lock className="w-4 h-4 text-blue-600" /> Privacy & Crypto Anonymity
          </h3>
          <p className="text-xs text-blue-800">
            At ReviewSellStore, we prioritize end-to-end user privacy. We do not store personal credit card data, bank details, or sensitive identities. Payments are processed via decentralized crypto wallets.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information Collection</h2>
          <p>
            When you place an order on ReviewSellStore.com, we collect only minimal communication identifiers necessary to complete account delivery (such as your Telegram handle, WhatsApp number, or email address).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Usage of Data</h2>
          <p>
            Collected contact data is used exclusively for dispatching purchased account credentials, providing replacement warranty support, and notifying you about custom service updates. We never sell, rent, or lease customer data to third-party brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Crypto Payment Privacy</h2>
          <p>
            All transaction verification relies solely on public blockchain TxIDs. Wallet addresses are strictly used for matching incoming deposits to specific orders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Support Contact</h2>
          <p>
            For any privacy inquiries or account data deletion requests, contact our support team on Telegram (@EgSupport24) or WhatsApp (+1 307-393-9979).
          </p>
        </section>

      </div>

    </div>
  );
};
