import styles from './bedSelection.module.scss';
import { useReservation } from '@/context/reservation-context';
import Button from '@/components/shared/button/button';
import { useState } from 'react';
import Cabin from './cabin/cabin';
import { useUser } from '@/context/user-context';
import { clearCurrentBedSelection, reserveBed } from '@/lib/airtable';

export default function BedSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedBeds } = useReservation();
  const { user } = useUser();
  const cabin = user.cabin[0];

  const handleClick = async () => {
    setIsLoading(true);
    for (let i = 0; i < selectedBeds.length; i++) {
      const { bedName, userRecordId } = selectedBeds[i];
      await clearCurrentBedSelection({ userId: userRecordId });
      const response = await reserveBed({
        userId: userRecordId,
        [bedName]: cabin.id,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.bedSelectionContainer}>
      <Cabin />
      <div className={styles.buttons}>
        <Button
          handleClick={handleClick}
          isLoading={isLoading}
          classNames={styles.button}
        >
          Confirm Beds
        </Button>
      </div>
    </div>
  );
}
