import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { items, getCartItemsCount, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-rose-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button size="large" className="justify-center">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link to="/products" className="flex items-center text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center sm:text-left">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-rose-600 hover:text-rose-700 font-medium text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-0 sm:border sm:border-gray-200">
              <Card.Header className="px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Your Items ({getCartItemsCount()})
                  </h2>
                  <span className="text-gray-600 text-sm sm:text-base">
                    Total: ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </Card.Header>
              <Card.Content className="px-4 sm:px-6 space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </Card.Content>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-center mb-2">
                  <Lock size={20} className="text-green-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure</p>
                <p className="text-xs text-gray-600">Checkout</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-center mb-2">
                  <Truck size={20} className="text-blue-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free</p>
                <p className="text-xs text-gray-600">Shipping</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-center mb-2">
                  <RefreshCw size={20} className="text-rose-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Easy</p>
                <p className="text-xs text-gray-600">Returns</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 sm:border sm:border-gray-200">
              <Card.Header className="px-4 sm:px-6">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </Card.Header>
              <Card.Content className="px-4 sm:px-6">
                <CartSummary />
                <div className="space-y-3 mt-6">
                  <Button 
                    variant="premium" 
                    className="w-full justify-center"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Link to="/products">
                    <Button variant="outline" className="w-full justify-center">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card.Content>
            </Card>

            {/* Free Samples */}
            <Card className="mt-4 sm:mt-6 bg-rose-50 border-rose-200">
              <Card.Content className="p-4">
                <div className="flex items-start space-x-3">
                  <Package size={18} className="text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-rose-900 text-sm mb-1">Free Samples</h3>
                    <p className="text-rose-700 text-xs mb-2">
                      Choose 2 free samples with your order
                    </p>
                    <Button variant="ghost" size="small" className="text-rose-600 hover:text-rose-700 text-xs">
                      Select Samples
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;