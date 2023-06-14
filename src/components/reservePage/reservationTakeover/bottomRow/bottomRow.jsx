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
      previousStage: null,
      nextStage: CABIN_SELECTION_STAGES.ADD_GUESTS,
    },
    [CABIN_SELECTION_STAGES.ADD_GUESTS]: {
      previousStage: CABIN_SELECTION_STAGES.CABIN_SELECTION,
      nextStage: CABIN_SELECTION_STAGES.BED_SELECTION,
      nextButtonText: 'Reserve',
      handleClick: reserveCabinForVerifiedUsers,
    },
    [CABIN_SELECTION_STAGES.BED_SELECTION]: {
      previousStage: CABIN_SELECTION_STAGES.ADD_GUESTS,
      nextStage: CABIN_SELECTION_STAGES.CHECKOUT,
    },
    [CABIN_SELECTION_STAGES.CHECKOUT]: {
      previousStage: CABIN_SELECTION_STAGES.BED_SELECTION,
      nextStage: null,
    },
  };

  const { previousStage, nextStage, nextButtonText, handleClick } =
    data[currentStage];

  const handleClickNextStage = async () => {
    handleClick ? await handleClick() : () => {};
    goToStage({ stage: nextStage });
  };

  if (isLoading)
    return (
      <div className={styles.overlay}>
        <Loader isDotted />
      </div>
    );

  return (
    <div className={styles.bottomRow}>
      {previousStage && (
        <Button handleClick={() => goToStage({ stage: previousStage })}>
          Back
        </Button>
      )}

      {nextStage && (
        <Button
          handleClick={handleClickNextStage}
          classNames={styles.nextButton}
        >
          {nextButtonText || 'Continue'}
        </Button>
      )}
    </div>
  );
}
