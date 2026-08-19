import React, { useState } from 'react';
import { Send, Phone, Check, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      let messageSent = false;

      // 1. Primary Attempt: Call local Node Express API endpoint (/api/send-contact-email)
      try {
        const res = await fetch('/api/send-contact-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success) {
            messageSent = true;
            setSent(true);
            setFormData({ name: '', email: '', service: 'General Inquiry', message: '' });
            setTimeout(() => setSent(false), 8000);
          }
        }
      } catch (err) {
        console.log('Primary contact endpoint unavailable, falling back to FormSubmit...', err);
      }

      // 2. Secondary Attempt: Direct Web3Forms API (No activation form required)
      if (!messageSent) {
        try {
          const web3res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: '09b62f55-9004-4f80-87bf-a1c1a9bc1cf0',
              subject: `📩 NEW CONTACT INQUIRY - ${formData.name} (${formData.service})`,
              from_name: 'ReviewSellStore Contact',
              email: formData.email,
              replyto: formData.email,
              name: formData.name,
              message: `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`,
              Service_Requested: formData.service
            })
          });

          const w3data = await web3res.json();
          if (web3res.ok && w3data.success) {
            messageSent = true;
            setSent(true);

            // Send acknowledgment copy to user's email
            try {
              fetch(`https://formsubmit.co/ajax/${formData.email}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  _subject: `📩 We Received Your Message - ReviewSellStore Support`,
                  _replyto: 'smmbuy2022@gmail.com',
                  _captcha: 'false',
                  _template: 'table',
                  Store_Logo: 'https://reviewsellstore.com/apple-touch-icon.png',
                  Greeting: `Hello ${formData.name}, thank you for contacting ReviewSellStore! Our support team will respond within 15-30 minutes.`,
                  Requested_Service: formData.service,
                  Your_Message: formData.message,
                  Instant_Support: 'Telegram: @EgSupport24 | WhatsApp: +1 307-393-9979 | Web: https://reviewsellstore.com'
                })
              }).catch(e => console.log('Contact acknowledgment error:', e));
            } catch (ackErr) {
              console.log('Contact ack error:', ackErr);
            }

            setFormData({ name: '', email: '', service: 'General Inquiry', message: '' });
            setTimeout(() => setSent(false), 8000);
          }
        } catch (w3err) {
          console.log('Web3Forms contact failed, trying FormSubmit fallback...', w3err);
        }
      }

      // 3. Tertiary Attempt: Fallback via FormSubmit
      if (!messageSent) {
        try {
          const fallbackRes = await fetch('https://formsubmit.co/ajax/smmbuy2022@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `📩 NEW CONTACT INQUIRY - ${formData.name} (${formData.service})`,
              _replyto: formData.email,
              _captcha: 'false',
              Name: formData.name,
              Email: formData.email,
              Service: formData.service,
              Message: formData.message
            })
          });

          if (fallbackRes.ok) {
            setSent(true);
            setFormData({ name: '', email: '', service: 'General Inquiry', message: '' });
            setTimeout(() => setSent(false), 8000);
          } else {
            setErrorMsg('Failed to send message automatically. Please contact us directly via Telegram or WhatsApp.');
          }
        } catch (e) {
          setErrorMsg('Network error. Please contact us directly via Telegram or WhatsApp.');
        }
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SEOHead
        title="Contact Live Customer Support | ReviewSellStore Telegram & WhatsApp"
        description="Get instant 24/7 technical customer support for custom bulk orders, testing, and credential assistance on Telegram (@EgSupport24) or WhatsApp (+1 307-393-9979)."
        canonical="/contact"
      />
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          24/7 Live Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-jakarta">
          Contact ReviewSellStore
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Reach our live support agents on Telegram or WhatsApp for immediate order assistance, custom service packages, or instant testing.
        </p>
      </div>

      {/* Primary Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Telegram Card */}
        <a
          href="https://t.me/EgSupport24"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-sky-500 text-white shadow-xl hover:bg-sky-600 transition-all space-y-4 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Send className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20">24/7 Live</span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-jakarta">Telegram Support</h3>
            <p className="text-sm font-mono text-sky-100 mt-1">@EgSupport24</p>
            <p className="text-xs text-sky-100 mt-2 leading-relaxed">
              Fastest response channel for custom quotes, bulk orders, and technical support.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-1 text-xs font-bold underline">
            <span>Open Telegram Chat</span> →
          </div>
        </a>

        {/* WhatsApp Card */}
        <a
          href="https://wa.me/13073939979"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-all space-y-4 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20">24/7 Live</span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-jakarta">WhatsApp Support</h3>
            <p className="text-sm font-mono text-emerald-100 mt-1">+1 (307) 393-9979</p>
            <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
              Direct messenger support for invoice verification and service inquiries.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-1 text-xs font-bold underline">
            <span>Open WhatsApp Chat</span> →
          </div>
        </a>

      </div>

      {/* Crucial Note Callout */}
      <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3 shadow-xs">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        <h3 className="text-xl font-bold text-slate-900 font-jakarta text-center">Send Us a Direct Message</h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="e.g. john@company.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Service Interested In</label>
            <select
              value={formData.service}
              onChange={e => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
            >
              <option>General Inquiry</option>
              <option>Verified PayPal Accounts</option>
              <option>Google & Local Guide Reviews</option>
              <option>Trustpilot Reviews</option>
              <option>Gmail Bulk Packages</option>
              <option>Google Voice & Virtual Lines</option>
              <option>GitHub Aged Accounts</option>
              <option>Custom Order Request</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Message / Requirements *</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your requirements or questions..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Message...' : 'Submit Message'}
          </button>

          {errorMsg && (
            <p className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold text-center border border-red-200">
              {errorMsg}
            </p>
          )}

          {sent && (
            <p className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" /> Message submitted successfully! Sent to smmbuy2022@gmail.com.
            </p>
          )}
        </form>
      </div>

    </div>
  );
};
