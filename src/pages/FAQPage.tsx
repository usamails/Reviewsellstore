import React, { useState } from 'react';
import { FAQS } from '../data/servicesData';
import { ChevronDown, ChevronUp, HelpCircle, Send, Phone, Search, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | ReviewSellStore Support"
        description="Find answers to all questions regarding account delivery, replacement guarantees, cookie setup, crypto payment networks, and custom bulk review orders."
        canonical="/faq"
        schemaJson={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }}
      />
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Knowledge Base & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Find answers to common questions about account delivery, crypto payment options, replacement guarantees, and custom order requests.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search questions or keywords..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 bg-white/90 backdrop-blur-md shadow-xs"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map(faq => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 uppercase tracking-wider shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-sm sm:text-base">{faq.question}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Prompt */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 text-center">
        <h3 className="text-xl font-bold font-jakarta">Still have questions or need a custom test?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.” Our team is live 24/7.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Telegram (@EgSupport24)</span>
          </a>

          <a
            href="https://wa.me/13073939979"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp (+1 307-393-9979)</span>
          </a>
        </div>
      </div>

    </div>
  );
};
