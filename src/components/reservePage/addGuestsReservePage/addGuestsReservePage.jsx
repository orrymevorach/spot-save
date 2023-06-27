import AddGuests from '@/components/shared/addGuests';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import styles from './addGuestsReservePage.module.scss';
import { useReservation } from '@/context/reservation-context';

export default function AddGuestsReservePage() {
  const { cabinData } = useReservation();
  const cabin = cabinData.cabin;
  return (
    <>
      <AddGuests cabin={cabin} />
      <div className={styles.buttons}>
        <Button href={ROUTES.CABIN_SELECTION}>Back to cabin selection</Button>
      </div>
    </>
  );
}
