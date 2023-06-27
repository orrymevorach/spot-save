import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import { createContext, useContext } from 'react';

const CabinAndUnitData = createContext();

export const useCabinAndUnitData = () => useContext(CabinAndUnitData);

export const CabinAndUnitDataProvider = ({ children }) => {
  const cabinAndUnitData = useGetCabinAndUnitData();
  return (
    <CabinAndUnitData.Provider value={cabinAndUnitData}>
      {children}
    </CabinAndUnitData.Provider>
  );
};
