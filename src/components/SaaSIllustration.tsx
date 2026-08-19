import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, Zap, Copy, Check, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_SERVICES } from '../data/servicesData';

export const SaaSIllustration: React.FC = () => {
  const { openInstantCheckout } = useCart();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sampleService = ALL_SERVICES.find(s => s.id === 'gmail-50-pva') || ALL_SERVICES[0];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Soft Radial Ambient Backdrop Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-cyan-400/15 to-blue-600/10 rounded-3xl blur-3xl opacity-75" />

      <div className="relative bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Angled Verified Business Account */}
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-xl flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800">Verified Business Account</p>
                <p className="text-slate-400 italic text-[11px]">Completed delivery</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                <span>Dispatch Status</span>
                <span className="text-emerald-600">100% Ready</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">USA Identity</span>
              <span className="text-base font-extrabold text-blue-600 tracking-tight">$130.00</span>
            </div>
          </motion.div>

          {/* Card 2: Angled Featured Service Plan */}
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-xl flex flex-col justify-between space-y-3"
          >
            <div className="flex justify-between items-start">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase tracking-wider border border-amber-200">
                Popular
              </span>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GMAIL PVA</p>
                <p className="text-lg font-black text-slate-900">$130.00</p>
              </div>
            </div>

            <div className="text-xs font-medium text-slate-600 space-y-1">
              <div className="flex justify-between py-0.5 border-b border-slate-50 text-[11px]">
                <span>Qty: 50 Accounts</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-50 text-[11px]">
                <span>Delivery: Instant</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
              <div className="flex justify-between py-0.5 text-[11px]">
                <span>Support: Priority</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
            </div>

            <button
              onClick={() => openInstantCheckout(sampleService)}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              Buy Now
            </button>
          </motion.div>

          {/* Bottom Card: Dark Payment Gateway Module */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sm:col-span-2 bg-slate-900 p-5 rounded-2xl shadow-2xl text-white space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-jakarta">Crypto Payment Gateway</h3>
              </div>
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 bg-blue-500 text-white text-[9px] font-bold rounded uppercase tracking-wider">
                  ERC20
                </span>
                <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded uppercase tracking-wider">
                  BEP20
                </span>
                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded uppercase tracking-wider">
                  TRC20
                </span>
              </div>
            </div>

            {/* Address Row 1 */}
            <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900 shrink-0">
                  ₿
                </div>
                <code className="text-[11px] text-cyan-200 font-mono truncate">
                  bc1quckwjx8dscacalh6066q92stnd83942rzevk
                </code>
              </div>
              <button
                onClick={() => handleCopy('btc', 'bc1quckwjx8dscacalh6066q92stnd83942rzevk')}
                className="text-xs font-bold text-cyan-400 hover:text-white shrink-0 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1"
              >
                {copiedKey === 'btc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'btc' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Address Row 2 */}
            <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  Ξ
                </div>
                <code className="text-[11px] text-cyan-200 font-mono truncate">
                  0xF83739DBE20DCe5698c1C98aCe46EACF89D
                </code>
              </div>
              <button
                onClick={() => handleCopy('eth', '0xF83739DBE20DCe5698c1C98aCe46EACF89D')}
                className="text-xs font-bold text-cyan-400 hover:text-white shrink-0 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1"
              >
                {copiedKey === 'eth' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'eth' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Instant Blockchain Audit
              </span>
              <span className="text-cyan-300 font-semibold flex items-center gap-0.5">
                Zero Fees Surcharge <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

