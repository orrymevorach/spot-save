import InputVerify from './inputVerify/inputVerify';
import { useCabinSelection } from '@/context/cabin-selection-context';
import styles from './addGuests.module.scss';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import { useState } from 'react';
import { reserveSpotInCabin } from '@/lib/airtable';

export default function AddGuests() {
  const { verifiedUsers } = useCabinSelection();
  const [isLoading, setIsLoading] = useState(false);

  const reserveCabinForVerifiedUsers = async () => {
    setIsLoading(true);
    for (let i = 0; i < verifiedUsers.length; i++) {
      const user = verifiedUsers[i];
      const response = await reserveSpotInCabin({
        cabinId: selectedCabin.id,
        attendeeId: user.id,
      });
    }
    setIsLoading(false);
  };

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
        <Button classNames={styles.backButton} href={ROUTES.CABIN_SELECTION}>
          Back to cabin selection
        </Button>
        <Button
          handleClick={reserveCabinForVerifiedUsers}
          isLoading={isLoading}
          classNames={styles.continueButton}
        >
          Confirm reservation
        </Button>
      </div>
    </div>
  );
}
