import React from 'react';

const Inputs = ({
  label,
  type = 'text',
  icon,
  placeholder,
  value,
  onChange,
  onIconClick,
  error,
  required,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-1'>
        {label && <label className='block text-sm font-medium'>{label}</label>}
        {required && <span className='text-red-500'>*</span>}
      </div>
      <div className='relative flex items-center'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded-xl p-3 w-full focus:outline-none transition-colors placeholder:text-sm ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-gray-lines focus:border-primary'
          }`}
          {...props}
        />
        {icon && (
          <button
            type='button'
            onClick={onIconClick}
            className='absolute right-3 flex items-center justify-center w-5 h-5 cursor-pointer hover:text-primary'
          >
            {icon}
          </button>
        )}
      </div>
      {error && (
        <span className='text-xs text-red-500 font-medium'>{error}</span>
      )}
    </div>
  );
};

export default Inputs;
