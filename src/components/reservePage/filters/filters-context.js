import { createContext, useState, useContext } from 'react';

const FiltersContext = createContext('');

const useFilters = () => {
  const context = useContext(FiltersContext);
  return context;
};

const initialState = {
  Levels: null,
  Mat: null,
  Apparatus: null,
  Duration: null,
};

const FiltersProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState(initialState);
  const value = {
    selectedFilters,
    setSelectedFilters,
  };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export { FiltersProvider, useFilters };
