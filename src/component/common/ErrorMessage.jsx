import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

export const ErrorMessage = ({message,onRetry}) => {
  return (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
        <FiAlertCircle className='size-16 text-red-500 mb-4'/>
        <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>Oops! something went wrong</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
            {message||'An error occurred while fetching data'}
        </p>

        {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
