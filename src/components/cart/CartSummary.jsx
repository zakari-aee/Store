import React from 'react';
import { Package, Truck } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

const CartSummary = () => {
  const { getCartTotal, getCartItemsCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Order Summary</h3>
        
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

      {/* Free Samples */}
      <div className="bg-rose-50 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Package size={16} className="text-rose-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium text-rose-900 text-sm mb-1">Free Samples</h4>
            <p className="text-rose-700 text-xs">
              Choose 2 free samples with your order
            </p>
            <Button 
              variant="ghost" 
              size="small" 
              className="text-rose-600 hover:text-rose-700 text-xs mt-1"
            >
              Select Samples
            </Button>
          </div>
        </div>
      </div>

      {/* Shipping Notice */}
      {subtotal < 50 && (
        <div className="flex items-center space-x-2 text-xs text-gray-600 bg-blue-50 p-2 rounded-lg">
          <Truck size={14} className="text-blue-500 flex-shrink-0" />
          <span>Free shipping on orders over $50</span>
        </div>
      )}

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 py-2 border-t border-gray-200 pt-3">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Lock size={14} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">Secure</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Truck size={14} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">Guaranteed</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Package size={14} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">Protected</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;