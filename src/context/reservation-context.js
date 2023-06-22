import { useReservationReducer } from '@/hooks/useReservation';
import { createContext, useContext } from 'react';

const ReservationContext = createContext();

export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const reservationReducer = useReservationReducer();
  return (
    <ReservationContext.Provider value={reservationReducer}>
      {children}
    </ReservationContext.Provider>
  );
};
