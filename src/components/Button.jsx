import React from 'react';

const Button = ({
  variant = 'default',
  children,
  onClick,
  icon,
  label,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm';

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  const variants = {
    default: `bg-primary text-white ${disabled ? 'hover:opacity-50' : 'hover:opacity-90'}`,
    outline: `border border-gray-lines ${disabled ? 'hover:bg-white' : 'hover:bg-gray-50'}`,
    icon: `border border-gray-lines ${disabled ? 'hover:bg-white' : 'hover:bg-gray-50'} gap-3 flex-1`,
  };

  const variantClass = variants[variant] || variants.default;

  // Icon variant
  if (variant === 'icon') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantClass} ${disabledStyles}`}
        {...props}
      >
        <div className='w-5 h-5 flex items-center justify-center'>{icon}</div>
        {label && <span>{label}</span>}
      </button>
    );
  }

  // Default and Outline variants
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClass} w-full ${disabledStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
