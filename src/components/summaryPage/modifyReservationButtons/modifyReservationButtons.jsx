import Button from '@/components/shared/button/button';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import { ROUTES } from '@/utils/constants';
import styles from './modifyReservationButtons.module.scss';
import { useRouter } from 'next/router';
import { useReservation } from '@/context/reservation-context';

export default function ModifyReservationButtons({ setShowAddGuestsTakeover }) {
  const router = useRouter();
  // const { dispatch, actions } = useReservation();
  const handleRoute = ({ pathname, stage }) => {
    // dispatch({
    //   type: actions.SET_SELECTION_STAGE,
    //   currentStage: CABIN_SELECTION_STAGES.ADD_GUESTS,
    // });
    const query = stage ? { stage } : null;
    router.push({
      pathname,
      query,
    });
  };
  return (
    <div className={styles.modifyContainer}>
      <p className={styles.title}>Modify Your Reservation</p>
      <div className={styles.buttons}>
        <Button
          classNames={styles.button}
          handleClick={() =>
            handleRoute({
              stage: CABIN_SELECTION_STAGES.ADD_GUESTS,
            })
          }
        >
          Add Guests
        </Button>
        <Button
          classNames={styles.button}
          handleClick={() =>
            handleRoute({
              stage: CABIN_SELECTION_STAGES.BED_SELECTION,
            })
          }
        >
          Select Beds
        </Button>
        <Button
          classNames={styles.button}
          handleClick={() => handleRoute({ pathname: ROUTES.CABIN_SELECTION })}
        >
          Change Cabin/Unit
        </Button>
      </div>
    </div>
  );
}
