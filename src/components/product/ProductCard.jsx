import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import ProductDetails from './ProductDetails';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const { addToCart } = useCart();

  const calculateDiscount = () => {
    return Math.round(((product.normalPrice - product.priceBulk) / product.normalPrice) * 100);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add product with normal price for single purchase
    addToCart({
      ...product,
      price: product.normalPrice,
      quantity: 1
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowProductDetails(true);
  };

  const handleCardClick = () => {
    setShowProductDetails(true);
  };

  const hasBulkDiscount = product.priceBulk < product.normalPrice;

  return (
    <>
      <Card 
        hover 
        className="overflow-hidden group relative cursor-pointer"
        onClick={handleCardClick}
      >
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
            {hasBulkDiscount && (
              <span className="bg-rose-500 text-white px-2 py-1 text-xs rounded-full">
                Save {calculateDiscount()}%
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
          
          {/* Pricing */}
          <div className="space-y-2">
            {/* Normal Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">${product.normalPrice}</span>
                <span className="text-sm text-gray-500">each</span>
              </div>
              
              {/* Mobile Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="lg:hidden p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
              >
                <ShoppingBag size={16} />
              </button>
            </div>

            {/* Bulk Price */}
            {hasBulkDiscount && (
              <div className="flex items-center justify-between bg-rose-50 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <Package size={14} className="text-rose-600" />
                  <span className="text-sm font-semibold text-rose-700">${product.priceBulk}</span>
                  <span className="text-xs text-rose-600">bulk price</span>
                </div>
                <span className="text-xs text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                  Save {calculateDiscount()}%
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Product Details Modal */}
      <Modal 
        isOpen={showProductDetails} 
        onClose={() => setShowProductDetails(false)}
        size="full"
        showCloseButton={true}
      >
        <ProductDetails 
          product={product} 
          onClose={() => setShowProductDetails(false)} 
        />
      </Modal>
    </>
  );
};

export default ProductCard;