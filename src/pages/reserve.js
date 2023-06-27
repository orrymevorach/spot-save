import ReservePage from '@/components/reservePage/reservePage';
import { CabinAndUnitDataProvider } from '@/context/cabin-and-unit-data-context';
import { ReservationProvider } from '@/context/reservation-context';

export default function Reserve() {
  return (
    <CabinAndUnitDataProvider>
      <ReservationProvider>
        <ReservePage />
      </ReservationProvider>
    </CabinAndUnitDataProvider>
  );
}
