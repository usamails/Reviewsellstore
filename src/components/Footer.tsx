import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Send, MessageCircle, Phone, ArrowUpRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-jakarta tracking-tight">
                  ReviewSellStore
                </span>
                <p className="text-xs text-blue-400 font-medium">Your Trusted Digital Services Marketplace</p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Premium marketplace for verified business accounts, reputation management, communication lines, and developer profiles. Fast automated delivery backed by 24/7 crypto payments and 100% replacement warranty.
            </p>

            <div className="pt-2 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Telegram: </span>
                <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-bold">
                  @EgSupport24
                </a>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: </span>
                <a href="https://wa.me/13073939979" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">
                  +1 (307) 393-9979
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/services?cat=verified-accounts" className="hover:text-white transition-colors flex items-center gap-1">
                  Verified PayPal Accounts
                </Link>
              </li>
              <li>
                <Link to="/services?cat=reputation-management" className="hover:text-white transition-colors">
                  Google & Local Guide Reviews
                </Link>
              </li>
              <li>
                <Link to="/services?cat=reputation-management" className="hover:text-white transition-colors">
                  Trustpilot Verified Reviews
                </Link>
              </li>
              <li>
                <Link to="/services?cat=gmail-accounts" className="hover:text-white transition-colors">
                  PVA & USA Gmail Packages
                </Link>
              </li>
              <li>
                <Link to="/services?cat=virtual-number-services" className="hover:text-white transition-colors">
                  Google Voice & TextNow Lines
                </Link>
              </li>
              <li>
                <Link to="/services?cat=developer-accounts" className="hover:text-white transition-colors">
                  GitHub 5-7+ Year Aged Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Policies</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/blog" className="hover:text-white transition-colors text-blue-400 font-bold">
                  Blog & SEO Guides (50+ Posts)
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition-colors">
                  Refund & Replacement Warranty
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/payment-methods" className="hover:text-white transition-colors">
                  Payment Methods & Wallet Keys
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay updated with new stock arrivals, bulk discount codes, and custom service drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  aria-label="Email address for newsletter"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </form>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold mb-1.5">Accepted Crypto</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono font-bold text-slate-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">BTC</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">ETH</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">SOL</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">USDT</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">LTC</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">BNB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ReviewSellStore.com. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Encrypted
            </span>
            <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 flex items-center gap-1">
              Live Telegram <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
