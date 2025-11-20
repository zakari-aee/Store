import React, { useState } from 'react';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Package, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ProductDetails = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState(null);
  const { addToCart } = useCart();

  if (!product) return null;

  const calculateDiscount = () => {
    return Math.round(((product.normalPrice - product.priceBulk) / product.normalPrice) * 100);
  };

  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=400",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
  ];

  const shades = [
    { name: 'Rose Nude', color: 'bg-rose-200', inStock: true },
    { name: 'Ruby Woo', color: 'bg-red-500', inStock: true },
    { name: 'Velvet Teddy', color: 'bg-amber-200', inStock: false },
    { name: 'Whirl', color: 'bg-pink-300', inStock: true }
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
  };

  const handleAddBulkToCart = () => {
    // For bulk, you might want to add a minimum quantity or different logic
    addToCart({ 
      ...product, 
      price: product.priceBulk,
      quantity: Math.max(quantity, 3), // Minimum 3 for bulk
      isBulk: true
    });
  };

  const hasBulkDiscount = product.priceBulk < product.normalPrice;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button onClick={onClose} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200">
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
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-rose-500' : 'border-gray-200'
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
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-rose-600 font-medium">{product.brand}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
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
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} (128 reviews)
                  </span>
                </div>
                <span className="text-green-600 text-sm font-medium">In Stock</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              {/* Normal Price */}
              <div className="flex items-center space-x-3">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  ${product.normalPrice}
                </span>
                <span className="text-gray-600">per item</span>
              </div>

              {/* Bulk Price */}
              {hasBulkDiscount && (
                <Card className="bg-rose-50 border-rose-200">
                  <Card.Content>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Package size={24} className="text-rose-600" />
                        <div>
                          <p className="font-semibold text-rose-900">Bulk Pricing Available</p>
                          <p className="text-rose-700">
                            ${product.priceBulk} per item - Save {calculateDiscount()}%
                          </p>
                        </div>
                      </div>
                      <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                        Save ${(product.normalPrice - product.priceBulk).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-rose-600 mt-2">
                      Minimum 3 items required for bulk pricing
                    </p>
                  </Card.Content>
                </Card>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <ul className="mt-3 space-y-1 text-gray-600">
                <li>• Long-lasting, weightless formula</li>
                <li>• Enriched with Vitamin E and Avocado Oil</li>
                <li>• Cruelty-free and vegan</li>
                <li>• Dermatologist tested</li>
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="premium"
                  size="large"
                  className="flex-1 justify-center"
                  onClick={handleAddToCart}
                >
                  Add to Bag - ${(product.normalPrice * quantity).toFixed(2)}
                </Button>
                
                {hasBulkDiscount && quantity >= 3 && (
                  <Button
                    variant="outline"
                    size="large"
                    className="flex-1 justify-center border-rose-500 text-rose-600 hover:bg-rose-50"
                    onClick={handleAddBulkToCart}
                  >
                    Add Bulk - ${(product.priceBulk * quantity).toFixed(2)}
                  </Button>
                )}
              </div>

              {hasBulkDiscount && quantity < 3 && (
                <p className="text-sm text-rose-600 text-center">
                  Add {3 - quantity} more to qualify for bulk pricing
                </p>
              )}
            </div>

            {/* Features */}
            <Card className="bg-gray-50 border-0">
              <Card.Content className="space-y-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon size={20} className="text-rose-600" />
                      <span className="text-sm text-gray-600">{feature.text}</span>
                    </div>
                  );
                })}
              </Card.Content>
            </Card>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Category:</span>
                  <span className="text-gray-600 ml-2">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Subcategory:</span>
                  <span className="text-gray-600 ml-2">{product.subcategory}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Delivery:</span>
                  <span className="text-gray-600 ml-2">2-4 business days</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Return Policy:</span>
                  <span className="text-gray-600 ml-2">30 days</span>
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