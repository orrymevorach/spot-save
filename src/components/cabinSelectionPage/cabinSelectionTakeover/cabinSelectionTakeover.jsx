import styles from './cabinSelectionTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import BottomRow from './bottomRow';
import ImageCarousel from '@/components/shared/imageCarousel';
import CabinSummary from './cabinSummary';
import Takeover from '@/components/shared/takeover/takeover';
import { useWindowSize } from '@/context/window-size-context';
import { useState } from 'react';
import BedSelection from '@/components/shared/bedSelection/bedSelection';

export default function CabinSelectionTakeover() {
  const { showTakeover, dispatch, actions, selectedCabin } =
    useCabinSelection();
  const { isMobile } = useWindowSize();
  const [showBedSelection, setShowBedSelection] = useState(false);

  return (
    <Takeover
      showTakeover={showTakeover}
      handleClose={() => dispatch({ type: actions.CLOSE_CABIN_SELECTION })}
      modalClassNames={styles.modal}
    >
      {showBedSelection ? (
        <BedSelection cabin={selectedCabin} readOnly />
      ) : (
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <ImageCarousel
              images={selectedCabin.images}
              classNames={styles.carousel}
              height={isMobile ? 200 : 300}
            />
            <CabinSummary {...selectedCabin} />
          </div>
        </div>
      )}
      <BottomRow
        showBedSelection={showBedSelection}
        setShowBedSelection={setShowBedSelection}
      />
    </Takeover>
  );
}
