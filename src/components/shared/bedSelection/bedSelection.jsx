import styles from './bedSelection.module.scss';
import { useReservation } from '@/context/reservation-context';
import Button from '@/components/shared/button/button';
import { reserveBedsMap } from '@/lib/airtable-bed-reservations';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cabin from './cabin/cabin';

export default function BedSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cabinData: { cabin },
    selectedBeds,
  } = useReservation();
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    for (let i = 0; i < selectedBeds.length; i++) {
      const { bedName, userRecordId } = selectedBeds[i];
      const reserveFunction = reserveBedsMap[bedName];

      const response = await reserveFunction({
        cabinId: cabin.id,
        [bedName]: userRecordId,
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
