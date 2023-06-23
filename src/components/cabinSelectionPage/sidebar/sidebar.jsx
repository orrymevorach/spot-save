import Button from '@/components/shared/button/button';
import styles from './sidebar.module.scss';
import Summary from './sidebarSummary';
import VerifiedUsers from './verifiedUsers/verifiedUsers';
import { useReservation } from '@/context/reservation-context';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { reserveSpotInCabin } from '@/lib/airtable';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';

export default function Sidebar({ cabinData }) {
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
    <div className={styles.sidebar}>
      <Summary cabinData={cabinData} />
      <VerifiedUsers />
      <Button
        handleClick={reserveCabinForVerifiedUsers}
        isLoading={isLoading}
        classNames={styles.continueButton}
      >
        Confirm reservation
      </Button>
    </div>
  );
}
