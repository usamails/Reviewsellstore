import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, CartItem, CryptoAddress, ProductVariant } from '../types';
import { CRYPTO_ADDRESSES } from '../data/servicesData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (service: ServiceItem, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (serviceId: string, variantId?: string) => void;
  updateQuantity: (serviceId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutItem: { service: ServiceItem; variant?: ProductVariant; quantity: number } | null;
  selectedCrypto: CryptoAddress;
  setSelectedCrypto: (crypto: CryptoAddress) => void;
  openInstantCheckout: (service: ServiceItem, variant?: ProductVariant, quantity?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('review_sell_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ service: ServiceItem; variant?: ProductVariant; quantity: number } | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAddress>(CRYPTO_ADDRESSES[0]);

  useEffect(() => {
    try {
      localStorage.setItem('review_sell_store_cart', JSON.stringify(cart));
    } catch (err) {
      console.error(err);
    }
  }, [cart]);

  const addToCart = (service: ServiceItem, quantity: number = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const existingKey = variant ? `${service.id}-${variant.id}` : service.id;
      const existingIndex = prev.findIndex(item => {
        const itemKey = item.selectedVariant ? `${item.service.id}-${item.selectedVariant.id}` : item.service.id;
        return itemKey === existingKey;
      });

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { service, quantity, selectedVariant: variant }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (serviceId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => {
      if (variantId) {
        return !(item.service.id === serviceId && item.selectedVariant?.id === variantId);
      }
      return item.service.id !== serviceId;
    }));
  };

  const updateQuantity = (serviceId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(serviceId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        const isMatch = variantId
          ? item.service.id === serviceId && item.selectedVariant?.id === variantId
          : item.service.id === serviceId;
        return isMatch ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openInstantCheckout = (service: ServiceItem, variant?: ProductVariant, quantity: number = 1) => {
    setCheckoutItem({ service, variant, quantity });
    setIsCheckoutOpen(true);
  };

  const totalAmount = cart.reduce((sum, item) => {
    const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.service.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutItem,
        selectedCrypto,
        setSelectedCrypto,
        openInstantCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

