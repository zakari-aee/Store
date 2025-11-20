import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('Added to cart:', product.name);
    // Add to cart logic here
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist updated:', product.name);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setIsQuickView(true);
  };

  return (
    <>
      <Card hover className="overflow-hidden group relative">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isNew && (
              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                New
              </span>
            )}
            {product.discount && (
              <span className="bg-rose-500 text-white px-2 py-1 text-xs rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isWishlisted 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            
            <button 
              onClick={handleQuickView}
              className="p-2 bg-white/80 text-gray-600 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button 
              variant="primary" 
              size="small" 
              className="w-full justify-center"
              icon={ShoppingBag}
              onClick={handleAddToCart}
            >
              Add to Bag
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-rose-600 font-medium">{product.brand}</span>
            <div className="flex items-center text-amber-400">
              <Star size={14} fill="currentColor" />
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
            </div>
            
            {/* Mobile Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="lg:hidden p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;