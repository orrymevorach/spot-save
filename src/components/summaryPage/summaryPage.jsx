import SidebarSummary from '../cabinSelectionPage/sidebar/sidebarSummary';
import VerifiedUsers from '../cabinSelectionPage/sidebar/verifiedUsers';
import { useUser } from '@/context/user-context';
import Loader from '../shared/loader/loader';
import styles from './summaryPage.module.scss';
import Button from '../shared/button/button';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';
import { useState } from 'react';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';

export default function SummaryPage() {
  const [isRouting, setIsRouting] = useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading || isRouting) return <Loader isDotted />;

  if (!user) return <p>no user found!</p>;

  const cabinData = {
    cabin: user.cabin[0],
    isLoading,
  };

  const handleRoute = ({ pathname, stage }) => {
    setIsRouting(true);
    setTimeout(() => {
      const query = stage ? { stage } : null;
      router.push({
        pathname,
        query,
      });
    }, 300);
  };

  return (
    <div className={styles.container}>
      <SidebarSummary cabinData={cabinData} />
      <VerifiedUsers />
      <div className={styles.modifyContainer}>
        <p className={styles.modifyTitle}>Modify your reservation</p>
        <div className={styles.buttons}>
          <Button
            classNames={styles.button}
            handleClick={() =>
              handleRoute({
                pathname: ROUTES.RESERVE,
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
          <Button classNames={styles.button}>Select Beds</Button>
        </div>
      </div>
    </div>
  );
}
