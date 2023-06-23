import InputVerify from './inputVerify/inputVerify';
import styles from './addGuests.module.scss';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import { useReservation } from '@/context/reservation-context';

export default function AddGuests() {
  const { verifiedUsers } = useReservation();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfVerifiedUsers >= 12;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Add Guests (optional)</p>
      <p className={styles.text}>
        If you would like to reserve a spot in your cabin on behalf of your
        friends or partners, please make sure they have purchased a ticket in
        advance, and verify their email address.
      </p>
      {hasMaximumGuests ? (
        <div className={styles.input}>
          <p>Maximum 12 guests per cabin</p>
        </div>
      ) : (
        <div className={styles.input}>
          <InputVerify />
        </div>
      )}
      <div className={styles.buttons}>
        <Button href={ROUTES.CABIN_SELECTION}>Back to cabin selection</Button>
      </div>
    </div>
  );
}
