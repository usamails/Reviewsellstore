import React, { useState } from 'react';
import { Send, Phone, MessageSquare, X, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="mb-4 w-80 sm:w-88 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl p-4 text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  24/7
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">ReviewSellStore Support</h4>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Dispatch Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Support Window"
                className="p-1 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Crucial Support Note */}
            <div className="my-3 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
              <p className="font-semibold flex items-center gap-1.5 text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                Testing & Custom Orders
              </p>
              <p className="mt-1 text-[11px] text-amber-700 font-medium">
                “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-2">
              <a
                href="https://t.me/EgSupport24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-md shadow-sky-500/20 group"
              >
                <div className="flex items-center space-x-3">
                  <Send className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Telegram Support</span>
                    <span className="text-[11px] text-sky-100 font-mono">@EgSupport24</span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-white/20">Chat</span>
              </a>

              <a
                href="https://wa.me/13073939979"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20 group"
              >
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">WhatsApp Support</span>
                    <span className="text-[11px] text-emerald-100 font-mono">+1 (307) 393-9979</span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-white/20">Chat</span>
              </a>
            </div>

            <p className="mt-3 text-[10px] text-slate-400 text-center">
              Average response time: &lt; 2 minutes
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Toggle Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Live Support Chat"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-xs shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageSquare className="w-4 h-4 fill-white" />
            <span className="inline tracking-wide font-semibold text-xs">24/7 Support</span>
          </>
        )}
      </button>
    </div>
  );
};
