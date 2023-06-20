import InputVerify from './inputVerify/inputVerify';
import { useCabinSelection } from '@/context/cabin-selection-context';
import styles from './addGuests.module.scss';
import Button from '@/components/shared/button/button';

export default function AddGuests() {
  const { verifiedUsers } = useCabinSelection();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfVerifiedUsers >= 12;

  return (
    <div className={styles.container}>
      <div className={styles.addGuests}>
        <div className={styles.column}>
          <div>
            <p className={styles.title}>Add Guests (optional)</p>
          </div>
          <div className={styles.textContainer}>
            <p>
              If you would like to reserve a spot in your cabin on behalf of
              your friends or partners, please make sure they have purchased a
              ticket in advance, and verify their email address.
            </p>
          </div>
          {hasMaximumGuests ? (
            <p>Maximum 12 guests per cabin</p>
          ) : (
            <InputVerify />
          )}
          <Button classNames={styles.continueButton}>
            Continue to checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
