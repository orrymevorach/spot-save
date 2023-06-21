import styles from './cabinSelectionTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import BottomRow from './bottomRow';
import ImageCarousel from '@/components/shared/imageCarousel';
import CabinSummary from './cabinSummary';
import Takeover from '@/components/shared/takeover/takeover';

export default function CabinSelectionTakeover() {
  const { showTakeover, dispatch, actions, selectedCabin } =
    useCabinSelection();

  return (
    <Takeover
      showTakeover={showTakeover}
      handleClose={() => dispatch({ type: actions.CLOSE_CABIN_SELECTION })}
    >
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <ImageCarousel images={selectedCabin.images} />
          <CabinSummary {...selectedCabin} />
        </div>

        <BottomRow />
      </div>
    </Takeover>
  );
}
