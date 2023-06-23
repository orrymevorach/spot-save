import styles from './bedSelection.module.scss';
import { useReservation } from '@/context/reservation-context';
import Button from '@/components/shared/button/button';
import { reserveBedsMap } from '@/lib/airtable-bed-reservations';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import Cabin from './cabin/cabin';

export default function BedSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cabinData: { cabin },
    selectedBeds,
    dispatch,
    actions,
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
  const handleClickCancel = () => {
    dispatch({
      type: actions.SET_SELECTION_STAGE,
      currentStage: CABIN_SELECTION_STAGES.CONFIRMATION,
    });
    router.push(
      {
        query: {
          stage: CABIN_SELECTION_STAGES.CONFIRMATION,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
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
        <Button
          handleClick={handleClickCancel}
          isLoading={isLoading}
          classNames={styles.button}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
