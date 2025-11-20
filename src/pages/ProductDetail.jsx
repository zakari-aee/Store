import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProductGrid from '../components/product/ProductGrid';
import { mockProducts } from '../data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState(null);
  const { addToCart } = useCart();

  const product = mockProducts.find(p => p.id === parseInt(id));
  const relatedProducts = mockProducts.filter(p => p.category === product?.category && p.id !== product.id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

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
    addToCart({ ...product, quantity });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-gray-200">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-rose-500' : 'border-gray-200'
                  } bg-white transition-all duration-200`}
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
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-rose-600 font-medium text-sm sm:text-base">{product.brand}</span>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 size={18} className="text-gray-600" />
                  </button>
                  <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Heart size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-3 sm:mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= Math.floor(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">
                    {product.rating} (128 reviews)
                  </span>
                </div>
                <span className="text-green-600 text-xs sm:text-sm font-medium">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {product.originalPrice && (
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discount && (
                <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
              <ul className="mt-2 sm:mt-3 space-y-1 text-gray-600 text-sm sm:text-base">
                <li>• Long-lasting, weightless formula</li>
                <li>• Enriched with Vitamin E and Avocado Oil</li>
                <li>• Cruelty-free and vegan</li>
                <li>• Dermatologist tested</li>
              </ul>
            </div>

            {/* Shade Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Shade
              </label>
              <div className="flex flex-wrap gap-2">
                {shades.map((shade) => (
                  <button
                    key={shade.name}
                    onClick={() => setSelectedShade(shade.name)}
                    disabled={!shade.inStock}
                    className={`flex items-center space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 text-xs sm:text-sm ${
                      selectedShade === shade.name
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      !shade.inStock ? 'opacity-50 cursor-not-allowed' : ''
                    } transition-all duration-200`}
                  >
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${shade.color}`}></div>
                    <span className="whitespace-nowrap">{shade.name}</span>
                    {!shade.inStock && (
                      <span className="text-xs text-gray-500 hidden sm:inline">(Out of stock)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 sm:p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} className="text-gray-600" />
                  </button>
                  <span className="px-3 sm:px-4 py-2 min-w-8 sm:min-w-12 text-center font-medium text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 sm:p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="premium"
                  size="large"
                  className="flex-1 justify-center text-sm sm:text-base py-3"
                  onClick={handleAddToCart}
                >
                  Add to Bag - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  className="flex-1 justify-center text-sm sm:text-base py-3"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="bg-gray-50 border-0">
              <Card.Content className="space-y-2 sm:space-y-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <Icon size={16} className="text-rose-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{feature.text}</span>
                    </div>
                  );
                })}
              </Card.Content>
            </Card>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-900">SKU:</span>
                  <span className="text-gray-600 sm:ml-2">GLM{product.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-900">Category:</span>
                  <span className="text-gray-600 sm:ml-2">{product.category}</span>
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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-8 sm:mt-12 lg:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts} columns={2} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;