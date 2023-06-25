import SidebarSummary from '../cabinSelectionPage/sidebar/sidebarSummary';
import VerifiedUsers from '../cabinSelectionPage/sidebar/verifiedUsers';
import { useUser } from '@/context/user-context';
import Loader from '../shared/loader/loader';
import styles from './summaryPage.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import BedSelectionTakeover from './bedSelectionTakeover/bedSelectionTakeover';
import AddGuestsTakeover from './addGuestsTakeover/addGuestsTakeover';
import ModifyReservationButtons from './modifyReservationButtons/modifyReservationButtons';
import { useReservation } from '@/context/reservation-context';

export default function SummaryPage() {
  const { user, isLoading: isUserDataLoading } = useUser();
  const router = useRouter();
  const { currentStage, dispatch, actions } = useReservation();

  const stageQuery = router.query.stage;
  useEffect(() => {
    if (stageQuery) {
      dispatch({ type: actions.SET_SELECTION_STAGE, currentStage: stageQuery });
    }
  }, [stageQuery, dispatch, actions]);

  if (isUserDataLoading || !user) return <Loader isDotted />;

  const cabinData = {
    cabin: user.cabin[0],
    isLoading: isUserDataLoading,
  };

  return (
    <div className={styles.container}>
      {currentStage === CABIN_SELECTION_STAGES.ADD_GUESTS && (
        <AddGuestsTakeover />
      )}
      {currentStage === CABIN_SELECTION_STAGES.BED_SELECTION && (
        <BedSelectionTakeover />
      )}

      <div>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Summary</p>
        </div>
        <SidebarSummary cabinData={cabinData} />
        <VerifiedUsers />
      </div>
      <ModifyReservationButtons />
    </div>
  );
}
