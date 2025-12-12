import React from 'react'

export const Input = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    error,
    className= ''
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
        {label && (
            <label className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                {label}
            </label>
        )}
        <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-4 py-2 rounded-lg border-2 
                focus:outline-none focus:ring-2 focus:ring-primary
                dark:bg-dark-secondary dark:text-white transition-colors
                ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && (
            <span className='text-red-500 text-sm mt-1'>{error}</span>
        )}
    </div>
  )
}


