import CabinSelectionTakeover from '../cabinSelectionTakeover';
import Units from '../units';
import { useCabinSelection } from '@/context/cabin-selection-context';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Filters from '../filters/filters';
import UnitLinks from '../unitLinks/unitLinks';
import styles from './cabinSelectionContainer.module.scss';
import Loader from '@/components/shared/loader/loader';

export default function CabinSelectionContainer() {
  const { showTakeover } = useCabinSelection();
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
      {showTakeover && <CabinSelectionTakeover />}
    </>
  );
}
