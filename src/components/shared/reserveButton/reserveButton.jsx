import styles from './reserveButton.module.scss';
import Button from '@/components/shared/button/button';
import { useReservation } from '@/context/reservation-context';
import { useUser } from '@/context/user-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import { getUserByRecordId, reserveSpotInCabin } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useState } from 'react';
import clsx from 'clsx';

export default function ReserveButton({ children, cabinId, classNames = '' }) {
  const { groupData, dispatch, actions } = useReservation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, dispatch: dispatchUser, actions: userActions } = useUser();
  const groupMembers = groupData.members;

  const reserveCabinForGroupMembers = async () => {
    setIsLoading(true);
    try {
      for (let i = 0; i < groupMembers.length; i++) {
        const groupMember = groupMembers[i];
        const response = await reserveSpotInCabin({
          cabinId,
          attendeeId: groupMember.id,
        });
      }

      // Get latest user data, with cabin
      const userData = await getUserByRecordId({ id: user.id });
      dispatchUser({ type: userActions.LOG_IN, userData });

      setIsLoading(false);
      dispatch({
        type: actions.SET_SELECTION_STAGE,
        currentStage: CABIN_SELECTION_STAGES.CONFIRMATION,
      });
      router.push({
        query: {
          stage: CABIN_SELECTION_STAGES.CONFIRMATION,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      handleClick={reserveCabinForGroupMembers}
      isLoading={isLoading}
      classNames={clsx(styles.continueButton, classNames)}
    >
      {children || 'Confirm reservation'}
    </Button>
  );
}
