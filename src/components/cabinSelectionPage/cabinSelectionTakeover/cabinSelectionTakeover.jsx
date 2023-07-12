import styles from './cabinSelectionTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import BottomRow from './bottomRow';
import ImageCarousel from '@/components/shared/imageCarousel';
import CabinSummary from './cabinSummary';
import Takeover from '@/components/shared/takeover/takeover';
import { useWindowSize } from '@/context/window-size-context';

export default function CabinSelectionTakeover() {
  const { showTakeover, dispatch, actions, selectedCabin } =
    useCabinSelection();
  const { isMobile } = useWindowSize();

  return (
    <Takeover
      showTakeover={showTakeover}
      handleClose={() => dispatch({ type: actions.CLOSE_CABIN_SELECTION })}
      classNames={styles.takeover}
      modalClassNames={styles.modal}
    >
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <ImageCarousel
            images={selectedCabin.images}
            classNames={styles.carousel}
            height={isMobile ? 200 : 300}
          />
          <CabinSummary {...selectedCabin} />
        </div>

        <BottomRow />
      </div>
    </Takeover>
  );
}
