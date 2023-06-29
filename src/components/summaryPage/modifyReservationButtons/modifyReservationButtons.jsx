import Button from '@/components/shared/button/button';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import { ROUTES } from '@/utils/constants';
import styles from './modifyReservationButtons.module.scss';
import { useRouter } from 'next/router';

export default function ModifyReservationButtons() {
  const router = useRouter();
  const handleRoute = ({ pathname, stage }) => {
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
          Add Guests / Modify Group
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
