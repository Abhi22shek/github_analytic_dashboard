import React,{useState} from 'react'


export const Tooltip = ({children,text,position='top'}) => {

    const [show,setShow] = useState(false)

    const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className='relative inline-block'
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
    >
    {children}
    {show && (
        <div className={`absolute ${positions[position]} z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap`}>
            {text}
        </div>
    )}

    </div>
  )
}
