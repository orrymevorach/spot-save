import { useReservation } from '@/context/reservation-context';
import Sidebar from '../cabinSelectionPage/sidebar/sidebar';
import { Logo } from '../shared/layout/layout';
import AddGuests from './addGuests/addGuests';
import styles from './reservePage.module.scss';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import Confirmation from './confirmation/confirmation';

export default function ReservePage() {
  const { currentStage } = useReservation();
  const { ADD_GUESTS, CONFIRMATION } = CABIN_SELECTION_STAGES;
  return (
    <div className={styles.sideMargins}>
      <Logo classNames={styles.logo} />
      <div className={styles.container}>
        {currentStage === ADD_GUESTS && <AddGuests />}
        {currentStage === CONFIRMATION && <Confirmation />}
        <Sidebar />
      </div>
    </div>
  );
}
