import {useLocalStorage}  from './useLocalStorage'

export const useSearchHistory = () => {
    const [history,setHistory] = useLocalStorage('searchHistory',[])

    const addToHistory = (username) => {
        const filtered = history.filter(item => item !== username);
        setHistory([username, ...filtered].slice(0,10))
    };

    const clearHistory = () => {
        setHistory([]);
    }

    return {history, addToHistory, clearHistory}
}