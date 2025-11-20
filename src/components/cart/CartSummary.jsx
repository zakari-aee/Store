import React, { useState } from 'react';
import { Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

const CartSummary = () => {
  const { getCartTotal, getCartItemsCount } = useCart();
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'GLAMOUR10') {
      setDiscount(subtotal * 0.1); // 10% discount
    } else if (promoCode.toUpperCase() === 'WELCOME15') {
      setDiscount(subtotal * 0.15); // 15% discount
    }
    // In real app, you'd validate with backend
  };

  const popularPromoCodes = [
    { code: 'GLAMOUR10', discount: '10% off' },
    { code: 'WELCOME15', discount: '15% off first order' },
    { code: 'FREESHIP', discount: 'Free shipping' }
  ];

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Order Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({getCartItemsCount()} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">
                -${discount.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setIsPromoOpen(!isPromoOpen)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
        >
          <div className="flex items-center space-x-2">
            <Tag size={16} className="text-rose-600" />
            <span>Add promo code</span>
          </div>
          {isPromoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isPromoOpen && (
          <div className="mt-3 space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <Button 
                size="small" 
                variant="outline"
                onClick={applyPromoCode}
                disabled={!promoCode.trim()}
              >
                Apply
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-gray-500">Popular codes:</p>
              <div className="flex flex-wrap gap-2">
                {popularPromoCodes.map((promo) => (
                  <button
                    key={promo.code}
                    onClick={() => setPromoCode(promo.code)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                  >
                    {promo.code} - {promo.discount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Free Samples */}
      <div className="bg-rose-50 rounded-lg p-3">
        <h4 className="font-medium text-rose-900 text-sm mb-2">
          🎁 Choose Your Free Samples
        </h4>
        <p className="text-rose-700 text-xs">
          Add 2 free samples to your order. Available with any purchase.
        </p>
        <Button 
          variant="ghost" 
          size="small" 
          className="mt-2 text-rose-600 hover:text-rose-700 text-xs"
        >
          Select Samples
        </Button>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-2 border-t border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 text-lg">🔒</div>
          <p className="text-xs text-gray-500 mt-1">Secure</p>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-lg">🛡️</div>
          <p className="text-xs text-gray-500 mt-1">Protected</p>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-lg">✓</div>
          <p className="text-xs text-gray-500 mt-1">Guaranteed</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;