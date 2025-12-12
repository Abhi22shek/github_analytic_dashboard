export const Card = ({ children, className = '', hover = false, onClick }) => {
  return (
    <div
      className={`bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6
         ${className} ${hover ? 'hover:shadow-lg transition duration-300 ease-in-out' : ''}
        `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
