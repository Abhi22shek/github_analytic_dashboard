import { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState([]);

  const addToComparison = (username) => {
    if (!comparisonList.includes(username) && comparisonList.length < 3) {
      setComparisonList([...comparisonList, username]);
    }
  };

  const removeFromComparison = (username) => {
    setComparisonList(comparisonList.filter(user => user !== username));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (username) => {
    return comparisonList.includes(username);
  };

  return (
    <ComparisonContext.Provider value={{ 
      comparisonList, 
      addToComparison, 
      removeFromComparison, 
      clearComparison,
      isInComparison 
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};
