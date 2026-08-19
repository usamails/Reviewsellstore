import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, Globe, Lock, Send, Phone } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SEOHead } from '../components/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SEOHead
        title="About ReviewSellStore | Leading Digital Accounts Marketplace"
        description="Learn about ReviewSellStore.com: Our mission, quality standards, 24/7 technical support, and instant crypto dispatch infrastructure."
        canonical="/about"
      />
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          About ReviewSellStore.com
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          Your Trusted Digital Services Marketplace
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          ReviewSellStore is a premier digital marketplace providing businesses, marketing agencies, and software developers with phone-verified accounts, reputation management tools, and virtual lines backed by 24/7 crypto payments.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Phone & Document Verified</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every PayPal account, Gmail package, and Google Voice number is created with clean residential IPs and carrier SIM verification to ensure zero lockouts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">24/7 Crypto Privacy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We support 12 major cryptocurrency chains with direct wallet checkout, protecting your payment privacy and eliminating chargeback friction.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Replacement Warranty</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our strict quality standard guarantees instant free replacements for any login errors reported within our policy window.
          </p>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-jakarta">
            <AnimatedCounter target={5000} suffix="+" />
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-1">Orders Dispatched</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-jakarta">
            <AnimatedCounter target={1500} suffix="+" />
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-1">Global Business Clients</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-jakarta">
            <AnimatedCounter target={98} suffix="%" />
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-1">Retention & Trust Rate</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-jakarta">
            24/7
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-1">Live Instant Support</p>
        </div>
      </div>

      {/* Support & Contact Callout */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold text-amber-900">Have custom requirements or need a test sample?</p>
          <p className="text-amber-800 text-xs">
            “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs"
          >
            Telegram
          </a>
          <a
            href="https://wa.me/13073939979"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};
