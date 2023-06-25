import InputVerify from './inputVerify/inputVerify';
import styles from './addGuests.module.scss';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';

export default function AddGuests({ classNames = '' }) {
  const { verifiedUsers } = useReservation();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfVerifiedUsers >= 12;

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
          <p>Maximum 12 guests per cabin</p>
        </div>
      ) : (
        <div className={styles.input}>
          <InputVerify />
        </div>
      )}
    </div>
  );
}
