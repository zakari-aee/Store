import React from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '../ui/Button';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, getCartItemsCount, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={24} className="text-rose-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Shopping Bag
                </h2>
                <span className="bg-rose-500 text-white text-sm rounded-full px-2 py-1">
                  {getCartItemsCount()}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <ShoppingBag size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start shopping to add products to your bag
                  </p>
                  <Button onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <CartSummary />
                
                <div className="space-y-3">
                  <Button 
                    variant="premium" 
                    className="w-full justify-center"
                    onClick={() => {
                      // Navigate to checkout
                      console.log('Proceed to checkout');
                    }}
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Free Shipping Progress */}
                {getCartTotal() < 50 && (
                  <div className="bg-rose-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-rose-700">
                      Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
                    </p>
                    <div className="w-full bg-rose-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(getCartTotal() / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex justify-center space-x-6 text-gray-400">
                  <div className="text-center">
                    <div className="text-lg mb-1">🔒</div>
                    <p className="text-xs">Secure Checkout</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">🚚</div>
                    <p className="text-xs">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">↩️</div>
                    <p className="text-xs">Easy Returns</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;