import styles from './reserveButton.module.scss';
import Button from '@/components/shared/button/button';
import { useReservation } from '@/context/reservation-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import { reserveSpotInCabin } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ReserveButton() {
  const {
    verifiedUsers,
    cabinData: { cabin },
    dispatch,
    actions,
  } = useReservation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const reserveCabinForVerifiedUsers = async () => {
    setIsLoading(true);
    try {
      for (let i = 0; i < verifiedUsers.length; i++) {
        const user = verifiedUsers[i];
        const response = await reserveSpotInCabin({
          cabinId: cabin.id,
          attendeeId: user.id,
        });
      }
      setIsLoading(false);
      dispatch({
        type: actions.SET_SELECTION_STAGE,
        currentStage: CABIN_SELECTION_STAGES.CONFIRMATION,
        reservationStatus: 'Confirmed',
      });
      router.push(
        {
          query: {
            stage: CABIN_SELECTION_STAGES.CONFIRMATION,
          },
        },
        undefined,
        { shallow: true }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      handleClick={reserveCabinForVerifiedUsers}
      isLoading={isLoading}
      classNames={styles.continueButton}
    >
      Confirm reservation
    </Button>
  );
}
