import React from 'react';

export const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  className = ''
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600  dark:bg-dark-secondary dark:text-white transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} className='dark:bg-gray-800 ' value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
