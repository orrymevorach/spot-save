import AddGuests from '@/components/shared/addGuests';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import styles from './addGuestsReservePage.module.scss';

export default function AddGuestsReservePage() {
  return (
    <>
      <AddGuests />
      <div className={styles.buttons}>
        <Button href={ROUTES.CABIN_SELECTION}>Back to cabin selection</Button>
      </div>
    </>
  );
}
