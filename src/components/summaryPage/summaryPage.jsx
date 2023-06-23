import SidebarSummary from '../cabinSelectionPage/sidebar/sidebarSummary';
import VerifiedUsers from '../cabinSelectionPage/sidebar/verifiedUsers';
import { useUser } from '@/context/user-context';
import Loader from '../shared/loader/loader';
import styles from './summaryPage.module.scss';
import Button from '../shared/button/button';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import Takeover from '../shared/takeover/takeover';
import AddGuests from '../reservePage/addGuests/addGuests';
import BedSelection from '../reservePage/bedSelection/bedSelection';

export default function SummaryPage() {
  const { user, isLoading: isUserDataLoading } = useUser();
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState();

  const stageQuery = router.query.stage;
  useEffect(() => {
    if (stageQuery) {
      setCurrentStage(stageQuery);
    }
  }, [stageQuery]);

  if (isUserDataLoading || !user) return <Loader isDotted />;

  const handleRoute = ({ pathname, stage }) => {
    const query = stage ? { stage } : null;
    router.push({
      pathname,
      query,
    });
  };

  const cabinData = {
    cabin: user.cabin[0],
    isLoading: isUserDataLoading,
  };

  return (
    <div className={styles.container}>
      {currentStage === CABIN_SELECTION_STAGES.ADD_GUESTS && (
        <Takeover>
          <div className={styles.takeover}>
            <AddGuests />
            <VerifiedUsers />
          </div>
        </Takeover>
      )}
      {currentStage === CABIN_SELECTION_STAGES.BED_SELECTION && (
        <Takeover>
          <div className={styles.takeover}>
            <BedSelection />
          </div>
        </Takeover>
      )}

      <div>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Summary</p>
        </div>
        <SidebarSummary cabinData={cabinData} />
        <VerifiedUsers />
      </div>
      <div className={styles.modifyContainer}>
        <p className={styles.title}>Modify your reservation</p>
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
              handleRoute({ pathname: ROUTES.CABIN_SELECTION })
            }
          >
            Switch Cabin/Unit
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
        </div>
      </div>
    </div>
  );
}
