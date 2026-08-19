import React, { useState } from 'react';
import { X, Copy, Check, ShieldAlert, Send, Phone, Wallet, QrCode, Mail, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CRYPTO_ADDRESSES } from '../data/servicesData';

export const CryptoCheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, checkoutItem, cart, totalAmount, selectedCrypto, setSelectedCrypto, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // Customer input states
  const [customerEmail, setCustomerEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [txNote, setTxNote] = useState('');

  // Order submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  // Items to checkout: either single item or current cart
  const itemsToCheckout = checkoutItem
    ? [{
        service: checkoutItem.service,
        variant: checkoutItem.variant,
        quantity: checkoutItem.quantity
      }]
    : cart;

  const orderTotal = checkoutItem
    ? (checkoutItem.variant ? checkoutItem.variant.price : checkoutItem.service.price) * checkoutItem.quantity
    : totalAmount;

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!customerEmail || !customerEmail.includes('@')) {
      setSubmitError('Please enter a valid email address to receive your order confirmation.');
      return;
    }

    setIsSubmitting(true);
    let orderSent = false;

    const orderItems = itemsToCheckout.map(i => ({
      title: i.service.title,
      variantName: i.variant ? i.variant.name : (i.selectedVariant ? i.selectedVariant.name : i.service.variant),
      quantity: i.quantity,
      price: i.variant ? i.variant.price : (i.selectedVariant ? i.selectedVariant.price : i.service.price)
    }));

    // 1. Primary Attempt: Call local Node Express API endpoint (/api/send-order-email)
    try {
      const res = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerEmail,
          telegram,
          whatsapp,
          txNote,
          selectedCrypto,
          orderItems,
          orderTotal
        })
      });

      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          orderSent = true;
          setSubmitSuccess(true);
          clearCart();
        }
      }
    } catch (err: any) {
      console.log('Primary API server route unavailable, trying direct Web3Forms endpoint...', err);
    }

    const formattedItems = orderItems
      .map((item, idx) => `${idx + 1}. ${item.title} (${item.variantName || 'Standard'}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)} USD`)
      .join('\n');

    // 2. Secondary Attempt: Direct Web3Forms API (No activation form/link required)
    if (!orderSent) {
      try {
        const web3res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '09b62f55-9004-4f80-87bf-a1c1a9bc1cf0',
            subject: `🛒 NEW ORDER PLACED - $${orderTotal.toFixed(2)} USD (${customerEmail})`,
            from_name: 'ReviewSellStore Instant Orders',
            email: customerEmail,
            replyto: customerEmail,
            message: `CUSTOMER DETAILS:\nEmail: ${customerEmail}\nTelegram: ${telegram || 'N/A'}\nWhatsApp: ${whatsapp || 'N/A'}\n\nPAYMENT DETAILS:\nMethod: ${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})\nWallet: ${selectedCrypto.address}\nTxID: ${txNote || 'N/A'}\n\nORDER ITEMS:\n${formattedItems}\n\nTOTAL AMOUNT: $${orderTotal.toFixed(2)} USD`,
            Customer_Email: customerEmail,
            Telegram: telegram || 'Not provided',
            WhatsApp: whatsapp || 'Not provided',
            Payment_Method: `${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})`,
            Deposit_Wallet: selectedCrypto.address,
            Transaction_Hash_or_TxID: txNote || 'Not provided',
            Order_Items: formattedItems,
            Total_Amount: `$${orderTotal.toFixed(2)} USD`
          })
        });

        const w3data = await web3res.json();
        if (web3res.ok && w3data.success) {
          orderSent = true;
          setSubmitSuccess(true);
          clearCart();

          // Also dispatch customer receipt directly to customerEmail
          try {
            fetch(`https://formsubmit.co/ajax/${customerEmail}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                _subject: `✅ Order Receipt & Confirmation - ReviewSellStore`,
                _replyto: 'smmbuy2022@gmail.com',
                _captcha: 'false',
                _template: 'table',
                Store_Logo: 'https://reviewsellstore.com/apple-touch-icon.png',
                Greeting: 'Thank you for your order with ReviewSellStore! Our 24/7 team is processing your items.',
                Customer_Email: customerEmail,
                Payment_Method: `${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})`,
                Deposit_Wallet: selectedCrypto.address,
                Transaction_Hash: txNote || 'N/A',
                Ordered_Items: formattedItems,
                Total_Amount: `$${orderTotal.toFixed(2)} USD`,
                Live_Support: 'Telegram: @EgSupport24 | WhatsApp: +1 307-393-9979 | Email: smmbuy2022@gmail.com | Web: https://reviewsellstore.com'
              })
            }).catch(e => console.log('Customer receipt send error:', e));
          } catch (custErr) {
            console.log('Customer receipt error:', custErr);
          }
        }
      } catch (w3err) {
        console.log('Web3Forms backup failed, trying FormSubmit fallback...', w3err);
      }
    }

    // 3. Tertiary Attempt: Fallback via FormSubmit with _captcha=false
    if (!orderSent) {
      try {
        const formSubmitRes = await fetch('https://formsubmit.co/ajax/smmbuy2022@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🛒 NEW ORDER PLACED - $${orderTotal.toFixed(2)} USD (${customerEmail})`,
            _replyto: customerEmail,
            _captcha: 'false',
            Customer_Email: customerEmail,
            Telegram: telegram || 'Not provided',
            WhatsApp: whatsapp || 'Not provided',
            Payment_Method: `${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})`,
            Deposit_Wallet: selectedCrypto.address,
            Transaction_Hash_or_TxID: txNote || 'Not provided',
            Order_Items: formattedItems,
            Total_Amount: `$${orderTotal.toFixed(2)} USD`
          })
        });

        if (formSubmitRes.ok) {
          orderSent = true;
          setSubmitSuccess(true);
          clearCart();

          // Also dispatch customer receipt directly to customerEmail
          try {
            fetch(`https://formsubmit.co/ajax/${customerEmail}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                _subject: `✅ Order Receipt & Confirmation - ReviewSellStore`,
                _replyto: 'smmbuy2022@gmail.com',
                _captcha: 'false',
                _template: 'table',
                Store_Logo: 'https://reviewsellstore.com/apple-touch-icon.png',
                Greeting: 'Thank you for your order with ReviewSellStore! Our 24/7 team is processing your items.',
                Customer_Email: customerEmail,
                Payment_Method: `${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})`,
                Deposit_Wallet: selectedCrypto.address,
                Transaction_Hash: txNote || 'N/A',
                Ordered_Items: formattedItems,
                Total_Amount: `$${orderTotal.toFixed(2)} USD`,
                Live_Support: 'Telegram: @EgSupport24 | WhatsApp: +1 307-393-9979 | Email: smmbuy2022@gmail.com | Web: https://reviewsellstore.com'
              })
            }).catch(e => console.log('Customer receipt send error:', e));
          } catch (custErr) {
            console.log('Customer receipt error:', custErr);
          }
        } else {
          setSubmitError('Unable to send email automatically. Please click Telegram or WhatsApp button below to complete your order!');
        }
      } catch (fallbackErr) {
        console.error('Fallback submit error:', fallbackErr);
        setSubmitError('Unable to connect to order server. Please click Telegram or WhatsApp button below to complete your order!');
      }
    }

    setIsSubmitting(false);
  };

  const generateOrderText = () => {
    const itemLines = itemsToCheckout
      .map(i => {
        const itemPrice = i.variant ? i.variant.price : i.service.price;
        const variantLabel = i.variant ? i.variant.name : i.service.variant;
        return `• ${i.service.title} [${variantLabel}] x${i.quantity} = $${(itemPrice * i.quantity).toFixed(2)}`;
      })
      .join('\n');

    return encodeURIComponent(
      `Hello ReviewSellStore Support!\nI would like to complete my order:\n\n` +
      `CUSTOMER EMAIL: ${customerEmail || 'Not provided'}\n` +
      (telegram ? `TELEGRAM: ${telegram}\n` : '') +
      (whatsapp ? `WHATSAPP: ${whatsapp}\n` : '') +
      `\nORDER ITEMS:\n${itemLines}\n\n` +
      `TOTAL AMOUNT: $${orderTotal.toFixed(2)} USD\n` +
      `SELECTED PAYMENT: ${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})\n` +
      `WALLET USED: ${selectedCrypto.address}\n` +
      (txNote ? `TX HASH / NOTE: ${txNote}\n` : '') +
      `\nPlease verify and dispatch my credentials.`
    );
  };

  const telegramUrl = `https://t.me/EgSupport24?text=${generateOrderText()}`;
  const whatsappUrl = `https://wa.me/13073939979?text=${generateOrderText()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Secure Crypto Checkout</h3>
              <p className="text-xs text-slate-300">Direct Wallet Transfer • Instant Email Confirmation</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setSubmitSuccess(false);
            }}
            aria-label="Close Checkout Modal"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Order Success Banner if email sent */}
          {submitSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  A thank you confirmation email has been sent to <strong className="text-slate-900 underline">{customerEmail}</strong> and our team (<strong className="text-slate-900">smmbuy2022@gmail.com</strong>) has been notified.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-left text-xs space-y-1 text-slate-700">
                <p className="font-semibold text-slate-900 border-b border-slate-100 pb-1">Order Details:</p>
                <p>• Total: <strong className="text-blue-600">${orderTotal.toFixed(2)} USD</strong></p>
                <p>• Payment: {selectedCrypto.name} ({selectedCrypto.symbol} - {selectedCrypto.network})</p>
                {telegram && <p>• Telegram: {telegram}</p>}
                {whatsapp && <p>• WhatsApp: {whatsapp}</p>}
              </div>

              <div className="pt-2 space-y-2">
                <p className="text-xs text-slate-500 font-medium">Want instant order dispatch or updates on Telegram/WhatsApp?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open Telegram Chat</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setSubmitSuccess(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Close & Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              
              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Order Summary</span>
                  <span className="text-sm font-extrabold text-blue-600">${orderTotal.toFixed(2)} USD</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {itemsToCheckout.map((item, idx) => {
                    const itemPrice = item.variant
                      ? item.variant.price
                      : (item.selectedVariant ? item.selectedVariant.price : item.service.price);
                    const variantLabel = item.variant
                      ? item.variant.name
                      : (item.selectedVariant ? item.selectedVariant.name : item.service.variant);

                    return (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-medium text-slate-800">
                          {item.service.title} ({variantLabel}) x{item.quantity}
                        </span>
                        <span className="font-semibold text-slate-900">${(itemPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Contact Information Fields */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Customer Contact Details</span>
                </div>

                {/* Customer Email (Required) */}
                <div>
                  <label htmlFor="checkoutEmailInput" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    id="checkoutEmailInput"
                    type="email"
                    required
                    aria-label="Your Email Address"
                    placeholder="e.g. customer@gmail.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    We will send your order receipt and credential download confirmation to this email.
                  </p>
                </div>

                {/* Optional Social Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label htmlFor="checkoutTelegramInput" className="block text-xs font-medium text-slate-700 mb-1 flex items-center justify-between">
                      <span>Telegram (Optional)</span>
                      <span className="text-[10px] text-slate-400">@username</span>
                    </label>
                    <div className="relative">
                      <Send className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        id="checkoutTelegramInput"
                        type="text"
                        aria-label="Telegram Username"
                        placeholder="@username"
                        value={telegram}
                        onChange={e => setTelegram(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="checkoutWhatsappInput" className="block text-xs font-medium text-slate-700 mb-1 flex items-center justify-between">
                      <span>WhatsApp (Optional)</span>
                      <span className="text-[10px] text-slate-400">+Number</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        id="checkoutWhatsappInput"
                        type="text"
                        aria-label="WhatsApp Number"
                        placeholder="+1 234 567 8900"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Coin Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Cryptocurrency Network:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CRYPTO_ADDRESSES.map((coin) => {
                    const isSelected = selectedCrypto.id === coin.id;
                    return (
                      <button
                        key={coin.id}
                        type="button"
                        aria-label={`Select ${coin.name} ${coin.network}`}
                        onClick={() => {
                          setSelectedCrypto(coin);
                          setCopied(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold">{coin.symbol}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${coin.badgeColor}`}>
                            {coin.network}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-normal truncate mt-1">{coin.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Wallet Display Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Deposit Address ({selectedCrypto.symbol} - <span className="text-cyan-400 font-bold">{selectedCrypto.network}</span>)
                  </span>
                  <button
                    type="button"
                    aria-label={showQR ? 'Hide QR Code' : 'Show QR Code'}
                    onClick={() => setShowQR(!showQR)}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    {showQR ? 'Hide QR Code' : 'Show QR Code'}
                  </button>
                </div>

                {showQR && (
                  <div className="flex justify-center p-3 bg-white rounded-xl">
                    <div className="w-32 h-32 bg-slate-900 p-2 rounded flex flex-col items-center justify-center text-white text-center">
                      <QrCode className="w-20 h-20 text-cyan-400" />
                      <span className="text-[9px] font-mono mt-1 text-slate-300">{selectedCrypto.symbol} Deposit</span>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <input
                    id="cryptoDepositAddress"
                    type="text"
                    readOnly
                    aria-label={`Deposit address for ${selectedCrypto.name} ${selectedCrypto.network}`}
                    value={selectedCrypto.address}
                    className="w-full pl-3 pr-28 py-3 text-xs sm:text-sm font-mono bg-slate-800 border border-slate-700 rounded-xl text-cyan-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label={`Copy deposit address for ${selectedCrypto.name}`}
                    onClick={() => handleCopy(selectedCrypto.address)}
                    className={`absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      copied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Network Warning Box */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong className="text-amber-200">Network Warning:</strong> Please ensure you select <strong className="underline font-mono">{selectedCrypto.network}</strong> in your crypto wallet. Sending funds on the wrong network will result in lost funds.
                  </p>
                </div>
              </div>

              {/* Transaction Hash / Note Optional Field */}
              <div>
                <label htmlFor="txNoteInput" className="block text-xs font-semibold text-slate-700 mb-1">
                  Transaction Hash / TxID (Optional):
                </label>
                <input
                  id="txNoteInput"
                  type="text"
                  aria-label="Transaction Hash or Note"
                  placeholder="Paste your transaction ID or note here..."
                  value={txNote}
                  onChange={e => setTxNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Error Banner */}
              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Complete Order & Send Email Button */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Order Emails...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Complete Order & Send Confirmation Email</span>
                    </>
                  )}
                </button>

                {/* Confirm via Telegram / WhatsApp */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase">Or Direct Contact</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => clearCart()}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all text-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm on Telegram</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => clearCart()}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Confirm on WhatsApp</span>
                  </a>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
