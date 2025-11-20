import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'rose', 
  text = null,
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    rose: 'text-rose-500',
    gray: 'text-gray-500',
    white: 'text-white'
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          {spinner}
          {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        {spinner}
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    );
  }

  return spinner;
};

// Product Card Skeleton Loader
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-64 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="bg-gray-200 h-4 w-20 rounded"></div>
          <div className="bg-gray-200 h-4 w-10 rounded"></div>
        </div>
        <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-full rounded"></div>
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 h-6 w-16 rounded"></div>
          <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Grid Skeleton Loader
export const GridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSpinner;