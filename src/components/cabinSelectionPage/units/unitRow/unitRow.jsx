import styles from './unitRow.module.scss';
import Image from 'next/image';
import Colours from 'public/colours.jpg';
import Comics from 'public/comics.jpg';
import Zodiacs from 'public/zodiacs.jpg';
import Seekers from 'public/seekers.jpg';
import CITS from 'public/cits.jpg';
import lteam from 'public/l-team.jpg';
import CabinList from './cabinList/cabinList';
import { useWindowSize } from '@/context/window-size-context';
import Takeover from '@/components/shared/takeover/takeover';
import { useState } from 'react';
import Button from '@/components/shared/button/button';

const unitImages = {
  Colours,
  Comics,
  Zodiacs,
  Seekers,
  CITS,
  ['L-Team']: lteam,
};

export default function UnitRow({ unitData }) {
  const [showTakeover, setShowTakeover] = useState(false);
  const [unitName, { cabins = [] }] = unitData;
  const hasCabinData = cabins.length;
  const unitImage = unitImages[unitName];
  const { isMobile } = useWindowSize();

  return (
    <div id={unitName} className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.unitTitleContainer}>
          <p className={styles.unitName}>Unit: {unitName}</p>
          {isMobile && (
            <>
              <Button
                classNames={styles.showMapButton}
                handleClick={() => setShowTakeover(true)}
                isInverted
              >
                Show Map
              </Button>
              {showTakeover && (
                <Takeover handleClose={() => setShowTakeover(false)}>
                  <Image
                    src={unitImage}
                    alt={`${unitName} unit`}
                    className={styles.takeoverUnitImage}
                  />
                </Takeover>
              )}
            </>
          )}
        </div>
        <div className={styles.unitContainer}>
          {!hasCabinData ? (
            <p>There are currently no cabins available in this unit</p>
          ) : (
            <CabinList unitData={unitData} />
          )}
          {!isMobile && (
            <Image
              src={unitImage}
              alt={`${unitName} unit`}
              className={styles.unitImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
