import { useState } from 'react';
import Button from '@/components/shared/button/button';
import { reserveSpotInCabin } from '@/lib/airtable';
import styles from './bottomRow.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useCabinSelection';
import Loader from '@/components/shared/loader/loader';

export default function BottomRow() {
  const { selectedCabin, verifiedUsers, dispatch, actions, currentStage } =
    useCabinSelection();

  const [isLoading, setIsLoading] = useState(false);

  // const reserveCabinForVerifiedUsers = async () => {
  //   setIsLoading(true);
  //   for (let i = 0; i < verifiedUsers.length; i++) {
  //     const user = verifiedUsers[i];
  //     const response = await reserveSpotInCabin({
  //       cabinId: selectedCabin.id,
  //       attendeeId: user.id,
  //     });
  //   }
  //   setIsLoading(false);
  // };

  const goToStage = ({ stage }) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({
        type: actions.SET_SELECTION_STAGE,
        currentStage: stage,
      });
      setIsLoading(false);
    }, 500);
  };

  const data = {
    [CABIN_SELECTION_STAGES.CABIN_SELECTION]: {
      backButtonText: null,
      nextButtonText: 'Select Cabin',
      nextStage: CABIN_SELECTION_STAGES.ADD_GUESTS,
    },
    [CABIN_SELECTION_STAGES.ADD_GUESTS]: {
      backButtonText: 'Back to Cabin Selection',
      nextButtonText: 'Continue to Checkout',
      previousStage: CABIN_SELECTION_STAGES.CABIN_SELECTION,
      nextStage: CABIN_SELECTION_STAGES.BED_SELECTION,
    },
  };

  const { backButtonText, nextButtonText, previousStage, nextStage } =
    data[currentStage];

  if (isLoading) return <Loader isDotted />;

  return (
    <div className={styles.bottomRow}>
      {backButtonText && (
        <Button handleClick={() => goToStage({ stage: previousStage })}>
          {backButtonText}
        </Button>
      )}

      {nextButtonText && (
        <Button
          handleClick={() => goToStage({ stage: nextStage })}
          classNames={styles.nextButton}
        >
          {nextButtonText}
        </Button>
      )}
    </div>
  );
}
