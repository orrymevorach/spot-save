import { useCabinSelectionReducer } from '@/hooks/useCabinSelection';
import { createContext, useContext, useReducer } from 'react';

const CabinSelectionContext = createContext();

export const useCabinSelection = () => useContext(CabinSelectionContext);

export const CabinSelectionProvider = ({ children }) => {
  const cabinSelectionReducer = useCabinSelectionReducer();
  return (
    <CabinSelectionContext.Provider value={cabinSelectionReducer}>
      {children}
    </CabinSelectionContext.Provider>
  );
};
