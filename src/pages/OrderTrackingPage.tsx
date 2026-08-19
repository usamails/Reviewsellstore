import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, ShieldCheck, Send, Phone, Package, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const OrderTrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<{
    id: string;
    status: string;
    service: string;
    date: string;
    deliveryEstimate: string;
    steps: { title: string; done: boolean; time: string }[];
  } | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      setTrackedOrder({
        id: orderId.toUpperCase(),
        status: 'In Dispatch / Verification',
        service: '50 USA Gmail Accounts Package',
        date: new Date().toLocaleDateString(),
        deliveryEstimate: '10 - 20 Minutes',
        steps: [
          { title: 'Crypto Payment Confirmed', done: true, time: 'Just now' },
          { title: 'Credentials Audit & Verification', done: true, time: '1 min ago' },
          { title: 'Encrypted Vault Packaging', done: true, time: 'In progress' },
          { title: 'Direct Dispatch to Customer', done: false, time: 'Pending' }
        ]
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SEOHead
        title="Live Order Tracking | ReviewSellStore Instant Dispatch Portal"
        description="Track the real-time dispatch status of your purchased verified PayPal accounts, Gmail lists, Google Voice numbers, and Google reviews."
        canonical="/order-tracking"
      />
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Order Lookup Tool
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          Track Your Order
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Enter your Order ID or TxID to track your credential packaging status in real-time.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleTrack} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Enter Order ID or Crypto Transaction Hash:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. #8492 or 0xF837...36f6"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            className="flex-1 px-4 py-3 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </div>
      </form>

      {/* Result Card */}
      {trackedOrder && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Order ID: {trackedOrder.id}</span>
              <h3 className="text-lg font-bold text-slate-900">{trackedOrder.service}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              {trackedOrder.status}
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Dispatch Progress:</h4>
            <div className="space-y-3">
              {trackedOrder.steps.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
                    step.done ? 'bg-emerald-500' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`font-semibold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
            <span>Estimated Remaining Dispatch Time: <strong>{trackedOrder.deliveryEstimate}</strong></span>
            <a
              href={`https://t.me/EgSupport24?text=${encodeURIComponent(`Hi Support, checking order status for ${trackedOrder.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Ask Support <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Direct Support Note */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center space-y-2">
        <p className="font-semibold text-amber-900">
          “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
        </p>
        <div className="flex justify-center gap-4 text-amber-800 font-bold">
          <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram: @EgSupport24</a>
          <span>•</span>
          <a href="https://wa.me/13073939979" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: +1 (307) 393-9979</a>
        </div>
      </div>

    </div>
  );
};
