import styles from './emailVerificationTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import BottomRow from './bottomRow/bottomRow';
import ImageCarousel from '@/components/shared/imageCarousel';
import { CABIN_SELECTION_STAGES } from '@/hooks/useCabinSelection';
import CabinSelection from './cabinSelection/cabinSelection';

export default function EmailVerificationTakeover() {
  const { selectedCabin, currentStage } = useCabinSelection();

  const { CABIN_SELECTION, BED_SELECTION, ADD_GUESTS } = CABIN_SELECTION_STAGES;

  return (
    <div className={styles.container}>
      {currentStage === CABIN_SELECTION && (
        <ImageCarousel images={selectedCabin.images} />
      )}

      {currentStage === ADD_GUESTS && <CabinSelection />}

      <BottomRow />
    </div>
  );
}
