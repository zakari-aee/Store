import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-200 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-200 border border-gray-200',
    outline: 'border border-gray-300 hover:border-rose-400 text-gray-700 hover:text-rose-600 focus:ring-rose-200 bg-transparent',
    ghost: 'text-gray-600 hover:text-rose-600 hover:bg-rose-50 focus:ring-rose-200',
    premium: 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-pink-200'
  };

  const sizes = {
    small: 'px-3 py-2 text-sm gap-2',
    medium: 'px-6 py-3 text-base gap-3',
    large: 'px-8 py-4 text-lg gap-4'
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <button 
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'small' ? 16 : 20} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'small' ? 16 : 20} />}
        </>
      )}
    </button>
  );
};

export default Button;