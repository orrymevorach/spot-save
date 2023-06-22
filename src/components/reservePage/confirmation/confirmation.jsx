import styles from './confirmation.module.scss';
import { useReservation } from '@/context/reservation-context';
import Loader from '@/components/shared/loader/loader';
import Button from '@/components/shared/button/button';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import { useState } from 'react';

export default function Confirmation() {
  const [isLoadingBedSelection, setIsLoadingBedSelection] = useState(false);
  const {
    cabinData: { isLoading },
    dispatch,
    actions,
  } = useReservation();

  if (isLoading || isLoadingBedSelection) return <Loader isDotted />;

  const handleClick = () => {
    setIsLoadingBedSelection(true);
    setTimeout(() => {
      dispatch({
        type: actions.SET_SELECTION_STAGE,
        currentStage: CABIN_SELECTION_STAGES.BED_SELECTION,
      });
      setIsLoadingBedSelection(false);
    }, 300);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Confirmed!</p>
      <p className={styles.text}>
        We have sent a confirmation email with your reservation details to all
        guests on the reservation.
      </p>
      <p className={styles.text}>See you at Highlands!</p>
      <div className={styles.optionalContainer}>
        <Button handleClick={handleClick}>Continue to bed selection</Button>
      </div>
    </div>
  );
}
