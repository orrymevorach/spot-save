import Takeover from '@/components/shared/takeover';
import ReservationTakeover from '../reservationTakeover';
import Units from '../units';
import { useCabinSelection } from '@/context/cabin-selection-context';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Filters from '../filters/filters';
import UnitLinks from '../unitLinks/unitLinks';
import styles from './reservePageContainer.module.scss';
import Loader from '@/components/shared/loader/loader';

export default function ReservePageContainer() {
  const { showTakeover, dispatch, actions } = useCabinSelection();
  const { isLoading, units } = useGetCabinAndUnitData();
  if (isLoading || !units.length) return <Loader isDotted />;

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.headerContainer}>
          <Filters />
          <UnitLinks />
        </div>
      </div>
      <Units />
      {showTakeover && (
        <Takeover
          disableOverlayClose
          showTakeover={showTakeover}
          handleClose={() => dispatch({ type: actions.CLOSE_CABIN_SELECTION })}
        >
          <ReservationTakeover />
        </Takeover>
      )}
    </>
  );
}
