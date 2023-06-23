import { useReservation } from '@/context/reservation-context';
import Sidebar from '../cabinSelectionPage/sidebar/sidebar';
import { Logo } from '../shared/layout/layout';
import AddGuests from './addGuests/addGuests';
import styles from './reservePage.module.scss';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import Confirmation from './confirmation/confirmation';
import BedSelection from './bedSelection/bedSelection';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../shared/loader/loader';

const useSetStageBasedOnQuery = () => {
  const { actions, dispatch } = useReservation();
  const { ADD_GUESTS } = CABIN_SELECTION_STAGES;
  const router = useRouter();
  useEffect(() => {
    if (!router.query.stage) {
      dispatch({
        type: actions.SET_SELECTION_STAGE,
        currentStage: ADD_GUESTS,
      });
    } else {
      dispatch({
        type: actions.SET_SELECTION_STAGE,
        currentStage: router.query.stage,
      });
    }
  }, [router, ADD_GUESTS, actions, dispatch]);
};

export default function ReservePage() {
  const { currentStage, cabinData } = useReservation();
  const { ADD_GUESTS, CONFIRMATION, BED_SELECTION } = CABIN_SELECTION_STAGES;
  useSetStageBasedOnQuery();
  if (!currentStage) return <Loader isDotted />;
  return (
    <div className={styles.sideMargins}>
      <Logo classNames={styles.logo} />
      <div className={styles.container}>
        {currentStage === ADD_GUESTS && <AddGuests />}
        {currentStage === CONFIRMATION && <Confirmation />}
        {currentStage === BED_SELECTION && <BedSelection />}
        <Sidebar cabinData={cabinData} />
      </div>
    </div>
  );
}
