import { useReservation } from '@/context/reservation-context';
import Sidebar from '../cabinSelectionPage/sidebar/sidebar';
import { Logo } from '../shared/layout/layout';
import styles from './reservePage.module.scss';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import Confirmation from './confirmation/confirmation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../shared/loader/loader';
import AddGuestsReservePage from './addGuestsReservePage/addGuestsReservePage';
import { ROUTES } from '@/utils/constants';
import { useConfig } from '@/context/config-context';

const useSetStageBasedOnQuery = () => {
  const { actions, dispatch } = useReservation();
  const { ADD_GUESTS } = CABIN_SELECTION_STAGES;
  const router = useRouter();
  useEffect(() => {
    if (
      router.isReady &&
      !router.query.cabinId &&
      router.query.stage === ADD_GUESTS
    ) {
      router.push(ROUTES.CABIN_SELECTION);
    }
    dispatch({
      type: actions.SET_SELECTION_STAGE,
      currentStage: router.query.stage,
    });
  }, [router, ADD_GUESTS, actions, dispatch]);
};
export default function ReservePage() {
  const { currentStage, cabinData } = useReservation();
  const { ADD_GUESTS, CONFIRMATION } = CABIN_SELECTION_STAGES;
  useSetStageBasedOnQuery();
  const config = useConfig();
  if (!currentStage || !config) return <Loader isDotted />;
  const logo = config.logo[0];
  return (
    <div className={styles.sideMargins}>
      <Logo classNames={styles.logo} {...logo} />
      <div className={styles.container}>
        {currentStage === ADD_GUESTS && <AddGuestsReservePage />}
        {currentStage === CONFIRMATION && <Confirmation />}
        <Sidebar cabinData={cabinData} />
      </div>
    </div>
  );
}
