import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Lock, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, getCartItemsCount, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Prevent body scroll when sidebar is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-full sm:w-96 bg-white shadow-xl">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 sm:py-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <ShoppingBag size={20} className="text-rose-600" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Shopping Bag
                </h2>
                <span className="bg-rose-500 text-white text-xs sm:text-sm rounded-full px-2 py-1 min-w-6 h-6 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 sm:p-8">
                  <ShoppingBag size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm sm:text-base">
                    Start shopping to add products to your bag
                  </p>
                  <Button onClick={onClose} className="w-full sm:w-auto justify-center">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-3 sm:p-4 space-y-4">
                {/* Order Summary */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Order Summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({getCartItemsCount()} items)</span>
                      <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {getCartTotal() >= 50 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${5.99}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span>${(getCartTotal() + (getCartTotal() >= 50 ? 0 : 5.99)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="premium" 
                    className="w-full justify-center text-sm sm:text-base"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-center text-sm sm:text-base"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Free Shipping Progress */}
                {getCartTotal() < 50 && (
                  <div className="bg-rose-50 rounded-lg p-3 text-center">
                    <p className="text-xs sm:text-sm text-rose-700">
                      Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
                    </p>
                    <div className="w-full bg-rose-200 rounded-full h-1.5 sm:h-2 mt-2">
                      <div 
                        className="bg-rose-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(getCartTotal() / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex justify-between sm:justify-center sm:space-x-6 text-gray-400 pt-2">
                  <div className="text-center flex-1 sm:flex-none">
                    <div className="flex justify-center mb-1">
                      <Lock size={14} />
                    </div>
                    <p className="text-xs">Secure Checkout</p>
                  </div>
                  <div className="text-center flex-1 sm:flex-none">
                    <div className="flex justify-center mb-1">
                      <Truck size={14} />
                    </div>
                    <p className="text-xs">Free Shipping</p>
                  </div>
                  <div className="text-center flex-1 sm:flex-none">
                    <div className="flex justify-center mb-1">
                      <RefreshCw size={14} />
                    </div>
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