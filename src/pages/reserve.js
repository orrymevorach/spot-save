import ReservePage from '@/components/reservePage/reservePage';
import { ReservationProvider } from '@/context/reservation-context';

export default function Reserve() {
  return (
    <ReservationProvider>
      <ReservePage />
    </ReservationProvider>
  );
}
