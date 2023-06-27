import CabinSelectionTakeover from '../cabinSelectionTakeover';
import Units from '../units';
import { useCabinSelection } from '@/context/cabin-selection-context';
import { useCabinAndUnitData } from '@/context/cabin-and-unit-data-context';
import Filters from '../filters/filters';
import UnitLinks from '../unitLinks/unitLinks';
import styles from './cabinSelectionContainer.module.scss';
import Loader from '@/components/shared/loader/loader';
import Button from '@/components/shared/button/button';
import { useRef, useState } from 'react';
import useShowOnScroll from '@/hooks/useShowOnScroll';

export default function CabinSelectionContainer() {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const { showTakeover } = useCabinSelection();
  const { isLoading, units } = useCabinAndUnitData();
  const headerRef = useRef();
  useShowOnScroll({ ref: headerRef, setIsShowing: setShowBackToTopButton });

  if (isLoading || !units.length) return <Loader isDotted />;

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.headerContainer} ref={headerRef}>
          {/* <p>Welcome to the Highlands Music Festival Reservation Platform:</p>
          <ul>
            <li>
              At Highlands, we have 6 units. A unit is a village that consists
              of 12+ cabins.
            </li>
            <li>
              Each unit has its own washhouse, which has showers and washroom
              for communal use.
            </li>
            <li>
              The time is takes to walk from end-to-end in a single unit ranges
              from 2-4 minutes. Cabins are scattered differently in each unit,
              and are usually about 10 feet away from the closest cabin.
            </li>
          </ul>
          <ol>
            <li>hey</li>
          </ol> */}
          <Filters />
          <UnitLinks />
        </div>
      </div>
      <Units />
      {showTakeover && <CabinSelectionTakeover />}
      {showBackToTopButton && (
        <Button handleClick={scrollToTop} classNames={styles.backToTop}>
          Back to top
        </Button>
      )}
    </>
  );
}
