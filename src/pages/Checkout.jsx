import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99,
      freeThreshold: 50,
      delivery: '3-5 business days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 12.99,
      delivery: '1-2 business days'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 24.99,
      delivery: 'Next business day'
    }
  ];

  const steps = [
    { number: 1, title: 'Shipping', completed: step > 1 },
    { number: 2, title: 'Payment', completed: step > 2 },
    { number: 3, title: 'Review', completed: step > 3 }
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/products">
            <Button className="w-full justify-center">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      <div className="container mx-auto px-4">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            <ArrowLeft size={18} className="mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center sm:text-left">
            Checkout
          </h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
            <Lock size={14} />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Progress Steps - Mobile Optimized */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4 max-w-full overflow-x-auto py-2">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center flex-shrink-0">
                <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                  step >= stepItem.number ? 'bg-rose-500 text-white' : 'bg-gray-300 text-gray-600'
                } font-medium text-xs sm:text-sm`}>
                  {stepItem.completed ? '✓' : stepItem.number}
                </div>
                <span className={`ml-2 text-xs sm:text-sm font-medium ${
                  step >= stepItem.number ? 'text-rose-600' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-4 sm:w-8 h-0.5 ml-2 sm:ml-4 ${
                    step > stepItem.number ? 'bg-rose-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            {step === 1 && (
              <Card className="border-0 sm:border sm:border-gray-200">
                <Card.Header className="px-4 sm:px-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Shipping Information</h2>
                </Card.Header>
                <Card.Content className="px-4 sm:px-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    {/* Shipping Method Selection */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Shipping Method
                      </label>
                      <div className="space-y-3">
                        {shippingMethods.map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              shippingMethod === method.id
                                ? 'border-rose-500 bg-rose-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value={method.id}
                                checked={shippingMethod === method.id}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="text-rose-600 focus:ring-rose-500"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{method.name}</p>
                                <p className="text-sm text-gray-600">{method.delivery}</p>
                              </div>
                            </div>
                            <span className="font-medium text-gray-900">
                              {method.price === 0 ? 'Free' : `$${method.price}`}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            )}

            {/* Payment Information */}
            {step === 2 && (
              <Card className="border-0 sm:border sm:border-gray-200">
                <Card.Header className="px-4 sm:px-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Payment Method</h2>
                </Card.Header>
                <Card.Content className="px-4 sm:px-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg">
                      <CreditCard size={20} className="text-gray-400" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            )}

            {/* Order Review */}
            {step === 3 && (
              <Card className="border-0 sm:border sm:border-gray-200">
                <Card.Header className="px-4 sm:px-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Review Order</h2>
                </Card.Header>
                <Card.Content className="px-4 sm:px-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Shipping Address</p>
                        <p className="text-sm text-gray-600">John Doe</p>
                        <p className="text-sm text-gray-600">123 Main St, New York, NY 10001</p>
                      </div>
                      <button className="text-rose-600 hover:text-rose-700 text-sm font-medium whitespace-nowrap">
                        Change
                      </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Payment Method</p>
                        <p className="text-sm text-gray-600">Visa ending in 3456</p>
                      </div>
                      <button className="text-rose-600 hover:text-rose-700 text-sm font-medium whitespace-nowrap">
                        Change
                      </button>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            )}

            {/* Navigation Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 bg-white p-4 border-t border-gray-200 fixed bottom-0 left-0 right-0 lg:static lg:border-0 lg:bg-transparent lg:p-0">
              {step > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="w-full sm:w-auto justify-center order-2 sm:order-1"
                >
                  Previous
                </Button>
              ) : (
                <Link to="/cart" className="w-full sm:w-auto order-2 sm:order-1">
                  <Button variant="outline" className="w-full justify-center">
                    Back to Cart
                  </Button>
                </Link>
              )}
              
              {step < 3 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  className="w-full sm:w-auto justify-center order-1 sm:order-2 mb-3 sm:mb-0"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  variant="premium" 
                  className="w-full sm:w-auto justify-center order-1 sm:order-2 mb-3 sm:mb-0"
                >
                  <Lock size={16} className="mr-2" />
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary - Mobile Optimized */}
          <div className="lg:col-span-1">
            <Card className="border-0 sm:border sm:border-gray-200 lg:sticky lg:top-8">
              <Card.Header className="px-4 sm:px-6">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </Card.Header>
              <Card.Content className="px-4 sm:px-6">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                        {item.isBulk && (
                          <span className="inline-block bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded mt-1">
                            Bulk Price
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {subtotal < 50 && (
                  <div className="mt-4 bg-rose-50 rounded-lg p-3">
                    <p className="text-sm text-rose-700 text-center">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                    <div className="w-full bg-rose-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Trust Badges - Mobile Optimized */}
            <div className="mt-4 sm:mt-6 space-y-3 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield size={16} className="text-green-500 flex-shrink-0" />
                <span>Your payment is secure and encrypted</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck size={16} className="text-blue-500 flex-shrink-0" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;