import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { useSearchHistory } from '../../hooks/useSearchHistory'

export const SearchBar = ({ onSearch, placeholder = 'Search GitHub username...' }) => {
    const [input, setInput] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const { history, addToHistory, clearHistory } = useSearchHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim()) {
            addToHistory(input.trim())
            onSearch(input.trim())
            setInput('')
            setShowHistory(false)
        }
    }

    const handleHistoryClick = (username) => {
        onSearch(username)
        setInput('')
        setShowHistory(false)
    }

    const handleBlur = () => {
        setTimeout(() => setShowHistory(false), 200)
    }

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-2xl relative'>
            <div className='relative'>
                <FiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none' />
                
                <input
                    type='text'
                    value={input}
                    placeholder={placeholder}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setShowHistory(true)}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 focus:border-primary focus:outline-none dark:bg-dark-secondary dark:border-gray-600 dark:text-white transition-colors"
                />
            </div>

            {/* Search History Dropdown */}
            {showHistory && history.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-background text-foreground border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50'>
                    <div className='flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700'>
                        <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                            Recent Searches
                        </span>
                        <button
                            type='button'
                            onClick={clearHistory}
                            className='text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
                        >
                            Clear
                        </button>
                    </div>

                    <div className='max-h-48 overflow-y-auto'>
                        {history.map((username) => (
                            <button
                                key={username}
                                type='button'
                                onClick={() => handleHistoryClick(username)}
                                className='w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200'
                            >
                                @{username}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </form>
    )
}