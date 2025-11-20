import React, { useState } from 'react';
import { Plus, Minus, X, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
    }, 300);
  };

  const moveToWishlist = () => {
    // Implement move to wishlist logic
    console.log('Moving to wishlist:', item.id);
    handleRemove();
  };

  return (
    <div 
      className={`flex items-center space-x-4 p-4 bg-white border border-gray-100 rounded-lg transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
            
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3 mt-3">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus size={14} className="text-gray-600" />
              </button>
              
              <span className="text-sm font-medium text-gray-900 w-8 text-center">
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Price and Remove */}
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-500">
                ${item.price} each
              </p>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={moveToWishlist}
                className="p-1 hover:text-rose-600 transition-colors text-gray-400"
                title="Move to Wishlist"
              >
                <Heart size={14} />
              </button>
              
              <button
                onClick={handleRemove}
                className="p-1 hover:text-rose-600 transition-colors text-gray-400"
                title="Remove from cart"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Free Samples Note */}
        {item.category === 'Skincare' && (
          <div className="mt-2">
            <p className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded">
              🎁 Eligible for 2 free samples
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;