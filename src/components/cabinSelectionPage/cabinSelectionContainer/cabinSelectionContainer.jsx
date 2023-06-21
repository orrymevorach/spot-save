import CabinSelectionTakeover from '../cabinSelectionTakeover';
import Units from '../units';
import { useCabinSelection } from '@/context/cabin-selection-context';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Filters from '../filters/filters';
import UnitLinks from '../unitLinks/unitLinks';
import styles from './cabinSelectionContainer.module.scss';
import Loader from '@/components/shared/loader/loader';
import Button from '@/components/shared/button/button';
import { useEffect, useRef, useState } from 'react';

function useShowOnScroll({ ref, setIsShowing }) {
  useEffect(() => {
    const bottomOfMainSection = ref?.current?.clientHeight;
    const handleScroll = () => {
      const hasScrolledPassedMainSection =
        window.scrollY > bottomOfMainSection - 1;
      if (!bottomOfMainSection || hasScrolledPassedMainSection) {
        setIsShowing(true);
      } else {
        setIsShowing(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, setIsShowing]);
}

export default function CabinSelectionContainer() {
  const [showBackToTopButton, setShowBackToTopButton] = useState();
  const { showTakeover } = useCabinSelection();
  const { isLoading, units } = useGetCabinAndUnitData();
  const headerRef = useRef();
  useShowOnScroll({ ref: headerRef, setIsShowing: setShowBackToTopButton });

  if (isLoading || !units.length) return <Loader isDotted />;

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.headerContainer} ref={headerRef}>
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
