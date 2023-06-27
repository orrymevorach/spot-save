import InputVerify from './inputVerify/inputVerify';
import styles from './addGuests.module.scss';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';

export default function AddGuests({ cabin, classNames = '' }) {
  const { verifiedUsers } = useReservation();

  if (!cabin) return;
  const numberOfOpenBeds = cabin.openBeds;

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfVerifiedUsers >= numberOfOpenBeds;

  return (
    <div className={clsx(styles.container, classNames)}>
      <p className={styles.title}>Add Guests (optional)</p>
      <p className={styles.text}>
        If you would like to reserve a spot in your cabin on behalf of your
        friends or partners, please make sure they have purchased a ticket in
        advance, and verify their email address.
      </p>
      {hasMaximumGuests ? (
        <div className={styles.input}>
          <p>There are no more open beds in this cabin.</p>
        </div>
      ) : (
        <div className={styles.input}>
          <InputVerify />
        </div>
      )}
    </div>
  );
}
