import styles from './reservationTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import BottomRow from './bottomRow';
import ImageCarousel from '@/components/shared/imageCarousel';
import { CABIN_SELECTION_STAGES } from '@/hooks/useCabinSelection';
import CabinSelection from './addGuests';
import CabinSummary from './cabinSelection';
import Confirmation from './confirmation';

export default function ReservationTakeover() {
  const { selectedCabin, currentStage } = useCabinSelection();

  const { CABIN_SELECTION, BED_SELECTION, ADD_GUESTS, CONFIRMATION } =
    CABIN_SELECTION_STAGES;

  return (
    <div className={styles.container}>
      {currentStage === CABIN_SELECTION && (
        <>
          <ImageCarousel images={selectedCabin.images} />
          <CabinSummary {...selectedCabin} />
        </>
      )}

      {currentStage === ADD_GUESTS && <CabinSelection />}
      {currentStage === CONFIRMATION && <Confirmation />}

      <BottomRow />
    </div>
  );
}
