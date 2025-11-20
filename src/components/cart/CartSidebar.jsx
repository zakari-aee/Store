import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Lock, Truck, RefreshCw, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

const CartSidebar = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    getCartItemsCount, 
    getCartTotal, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart();
  
  const navigate = useNavigate();

  console.log('CartSidebar - cartItems:', cartItems); // Debug log

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleIncreaseQuantity = (item) => {
    console.log('Increasing quantity for:', item.id);
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    console.log('Decreasing quantity for:', item.id);
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemoveItem = (itemId) => {
    console.log('Removing item:', itemId);
    removeFromCart(itemId);
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
              <div className="flex items-center space-x-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    title="Clear cart"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
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
                    {cartItems.map((item) => {
                      // Calculate price (use bulk price if applicable)
                      const unitPrice = item.priceBulk && item.quantity >= 3 ? item.priceBulk : item.normalPrice;
                      const totalPrice = unitPrice * item.quantity;
                      
                      return (
                        <div key={item.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg bg-white">
                          {/* Product Image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 pr-2">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-400 hover:text-rose-500 transition-colors flex-shrink-0 ml-2"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            
                            <p className="text-xs text-gray-600 mb-1">
                              {item.brand}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleDecreaseQuantity(item)}
                                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={12} />
                                </button>
                                
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                
                                <button
                                  onClick={() => handleIncreaseQuantity(item)}
                                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              
                              {/* Price */}
                              <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">
                                  ${totalPrice.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  ${unitPrice.toFixed(2)} each
                                </p>
                              </div>
                            </div>
                            
                            {/* Bulk Pricing Notice */}
                            {item.priceBulk && item.quantity >= 3 && (
                              <div className="mt-2 bg-green-50 border border-green-200 rounded px-2 py-1">
                                <p className="text-xs text-green-700">
                                  🎉 Bulk price applied!
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
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
                        style={{ width: `${Math.min((getCartTotal() / 50) * 100, 100)}%` }}
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