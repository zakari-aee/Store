import React, { useState } from 'react';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ProductDetails = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=400",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
  ];

  const features = [
    { icon: Truck, text: 'Free shipping on orders over $50' },
    { icon: Shield, text: '30-day return policy' },
    { icon: RotateCcw, text: 'Free returns within 30 days' }
  ];

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      price: product.normalPrice,
      quantity 
    });
    onClose(); // Close the component after adding to cart
  };

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button 
          onClick={onClose} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 lg:mb-8 text-sm lg:text-base transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-rose-500 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  } bg-white`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-rose-600 font-medium text-base lg:text-lg">{product.brand}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <= Math.floor(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} (128 reviews)
                  </span>
                </div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                ${product.normalPrice}
              </span>
              <span className="text-gray-600 text-lg">per item</span>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                {product.description}
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm lg:text-base">
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  Long-lasting, weightless formula
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  Enriched with Vitamin E and Avocado Oil
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  Cruelty-free and vegan
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  Dermatologist tested
                </li>
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-6 bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <label className="text-lg font-medium text-gray-900">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 lg:p-4 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} className="text-gray-600" />
                  </button>
                  <span className="px-4 lg:px-6 py-3 min-w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 lg:p-4 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <Button
                variant="premium"
                size="large"
                className="w-full justify-center text-lg py-4"
                onClick={handleAddToCart}
              >
                Add to Shopping Bag - ${(product.normalPrice * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Features */}
            <Card className="border-0 shadow-sm">
              <Card.Content className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-rose-600" />
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  );
                })}
              </Card.Content>
            </Card>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm lg:text-base">
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-900">Category:</span>
                  <span className="text-gray-600 sm:ml-2">{product.category}</span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-900">Subcategory:</span>
                  <span className="text-gray-600 sm:ml-2">{product.subcategory}</span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-900">Delivery:</span>
                  <span className="text-gray-600 sm:ml-2">2-4 business days</span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-900">Return Policy:</span>
                  <span className="text-gray-600 sm:ml-2">30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;