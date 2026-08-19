import React, { useState } from 'react';
import { CRYPTO_ADDRESSES } from '../data/servicesData';
import { Copy, Check, ShieldAlert, Wallet, Send, Phone, QrCode } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PaymentMethodsPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SEOHead
        title="Accepted Crypto Payment Deposit Addresses | ReviewSellStore"
        description="View accepted cryptocurrency deposit addresses (BTC, ETH, USDT ERC20/TRC20, LTC, SOL, BNB, DOGE, XRP, TRX) for instant order processing."
        canonical="/payment-methods"
      />
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Cryptocurrency Checkout
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          Accepted Payment Methods
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We accept 12 major cryptocurrency chains. Enjoy zero fee surcharges and 100% private wallet-to-wallet transactions.
        </p>
      </div>

      {/* Network Warning Banner */}
      <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-900">Network Verification Protocol</h4>
          <p className="mt-1 leading-relaxed text-amber-800">
            Please double-check the network tag (e.g. <strong>ERC20</strong>, <strong>TRC20</strong>, <strong>BEP20</strong>, <strong>Solana Native</strong>) in your crypto wallet prior to transferring funds. Transactions sent to incorrect chains cannot be recovered.
          </p>
        </div>
      </div>

      {/* Crypto Addresses Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CRYPTO_ADDRESSES.map(coin => (
          <div
            key={coin.id}
            className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {coin.symbol}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{coin.name}</h3>
                  <span className="text-[11px] text-slate-500 font-mono">{coin.symbol}</span>
                </div>
              </div>

              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-bold border ${coin.badgeColor}`}>
                {coin.network}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Deposit Address:</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={coin.address}
                  className="w-full pl-3 pr-24 py-2.5 text-xs font-mono bg-slate-900 text-cyan-300 rounded-xl border border-slate-800 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(coin.id, coin.address)}
                  className={`absolute right-1 top-1 bottom-1 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    copiedId === coin.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {copiedId === coin.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
              <span>Required Confirmations: 1-2</span>
              <span className="text-emerald-600 font-semibold">Zero Fee Surcharge</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Dispatch Support Box */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white max-w-4xl mx-auto space-y-4 text-center">
        <h3 className="text-xl font-bold font-jakarta">Completed your crypto transfer?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Send your TxID / Transaction hash to our 24/7 support team on Telegram (@EgSupport24) or WhatsApp (+1 307-393-9979) for instant credential dispatch.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Confirm on Telegram</span>
          </a>

          <a
            href="https://wa.me/13073939979"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Confirm on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
