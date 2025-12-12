import React from 'react'

export const LoadingSpinner = ({size='md',text='Loading...'}) => {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    }

  return (
   <div className='flex flex-col items-center justify-center p-8'>
    <div className={`${sizes[size]} border-4 border-gray-200 border-t-primary rounded-full animate-spin`}></div>
    {text && <p className='mt-4 text-gray-600 dark:text-gray-400'>{text}</p>}
   </div>
  )
}
