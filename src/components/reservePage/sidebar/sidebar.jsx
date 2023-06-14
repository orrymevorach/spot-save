import React, { useState, useContext, useEffect } from 'react';
import styles from './sidebar.module.scss';
import Filters from '../filters/filters';
import Summary from './sidebarSummary';

function useShowSidebar({ mainSectionRef, setIsSidebarShowing }) {
  useEffect(() => {
    const bottomOfMainSection = mainSectionRef?.current?.clientHeight;
    const handleScroll = () => {
      const hasScrolledPassedMainSection =
        window.scrollY > bottomOfMainSection - 1;
      if (!bottomOfMainSection || hasScrolledPassedMainSection) {
        setIsSidebarShowing(true);
      } else {
        setIsSidebarShowing(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mainSectionRef, setIsSidebarShowing]);
}

export default function Sidebar({ mainSectionRef }) {
  const [isSidebarShowing, setIsSidebarShowing] = useState(false);
  useShowSidebar({ mainSectionRef, setIsSidebarShowing });

  return (
    <>
      {isSidebarShowing && (
        <div className={styles.sidebar}>
          <Summary />
          <div className={styles.bottom}>
            <Filters
              mainSectionRef={mainSectionRef}
              classNames={styles.filtersSidebar}
            />
          </div>
        </div>
      )}
    </>
  );
}
