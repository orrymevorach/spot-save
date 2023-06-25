import styles from './sidebar.module.scss';
import VerifiedUsers from './verifiedUsers/verifiedUsers';
import { useReservation } from '@/context/reservation-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import ReserveButton from '@/components/shared/reserveButton';
import rainbow from 'public/rainbow-min.png';
import Image from 'next/image';
import ReservationSummary from '@/components/shared/reservationSummary';

export default function Sidebar({ cabinData }) {
  const { currentStage } = useReservation();

  return (
    <div className={styles.sidebar}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Summary</p>
        <Image src={rainbow} alt="" className={styles.image} />
      </div>
      <ReservationSummary cabinData={cabinData} />
      <VerifiedUsers />
      {currentStage !== CABIN_SELECTION_STAGES.CONFIRMATION && (
        <ReserveButton cabinId={cabinData?.cabin?.id} />
      )}
    </div>
  );
}
