import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalAmount, totalItemCount, setIsCheckoutOpen } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Your Order Basket ({totalItemCount})</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close Order Basket"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your basket is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Browse our catalog of verified PayPal accounts, Gmail packages, reviews, or Google Voice numbers to build your order.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => {
                  const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.service.price;
                  const variantLabel = item.selectedVariant ? item.selectedVariant.name : item.service.variant;
                  const variantId = item.selectedVariant?.id;

                  return (
                    <div
                      key={variantId ? `${item.service.id}-${variantId}` : `${item.service.id}-${idx}`}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div className="space-y-1 max-w-[200px]">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {item.service.title}
                        </h4>
                        <p className="text-[11px] text-blue-600 font-semibold">{variantLabel}</p>
                        <p className="text-xs font-bold text-slate-800">${itemPrice.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.service.id, item.quantity - 1, variantId)}
                            aria-label="Decrease quantity"
                            className="p-1 hover:bg-slate-100 rounded text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5 text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.service.id, item.quantity + 1, variantId)}
                            aria-label="Increase quantity"
                            className="p-1 hover:bg-slate-100 rounded text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.service.id, variantId)}
                          aria-label="Remove item from basket"
                          className="text-slate-500 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Support Note */}
          {cart.length > 0 && (
            <div className="mx-5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px]">
              <p className="font-semibold flex items-center gap-1 text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Custom Orders & Testing
              </p>
              <p className="mt-0.5 text-[10px] text-amber-700">
                “For testing any service or requesting a custom order, contact us via Telegram or WhatsApp.”
              </p>
            </div>
          )}

          {/* Footer Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Subtotal</span>
                <span className="text-lg font-extrabold text-slate-900">${totalAmount.toFixed(2)} USD</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Proceed to Crypto Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Instant Credentials Dispatch Guaranteed
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
