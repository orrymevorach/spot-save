import styles from './sidebar.module.scss';
import { useReservation } from '@/context/reservation-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import ReserveButton from '@/components/shared/reserveButton';
import rainbow from 'public/rainbow-min.png';
import Image from 'next/image';
import ReservationSummary from '@/components/shared/reservationSummary';
import VerifiedUsers from '@/components/shared/verifiedUsers/verifiedUsers';
import { useUser } from '@/context/user-context';
import Loader from '@/components/shared/loader/loader';

export default function Sidebar({ cabinData }) {
  const {
    currentStage,
    groupData: { members },
  } = useReservation();
  const { user } = useUser();
  const { isLoading: isCabinDataLoading, cabin } = cabinData;

  if (isCabinDataLoading || !user) {
    return (
      <div className={styles.sidebar}>
        <Loader isDotted />
      </div>
    );
  }

  const isConfirmationStage =
    currentStage !== CABIN_SELECTION_STAGES.CONFIRMATION;
  const cabinHasEnoughBeds = cabin.openBeds >= members.length;
  const showReservationButton = isConfirmationStage && cabinHasEnoughBeds;

  return (
    <div className={styles.sidebar}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Summary</p>
        <Image src={rainbow} alt="" className={styles.image} />
      </div>
      <ReservationSummary cabinData={cabinData} />
      <VerifiedUsers
        hideRemoveButton={currentStage === CABIN_SELECTION_STAGES.ADD_GUESTS}
      />
      {!cabinHasEnoughBeds && (
        <p>There are not enough beds in this cabin for your entire group.</p>
      )}
      {showReservationButton && <ReserveButton cabin={cabinData?.cabin} />}
    </div>
  );
}
