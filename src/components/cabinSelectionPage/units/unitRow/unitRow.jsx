import styles from './unitRow.module.scss';
import Image from 'next/image';
import CabinList from './cabinList/cabinList';
import { useWindowSize } from '@/context/window-size-context';
import Takeover from '@/components/shared/takeover/takeover';
import { useState } from 'react';
import Button from '@/components/shared/button/button';

export default function UnitRow({ unitData }) {
  const [showTakeover, setShowTakeover] = useState(false);
  const [hasAvailability, setHasAvailability] = useState(true);
  const { name: unitName, image } = unitData;
  const { url, width, height } = image[0];
  const { isDesktop } = useWindowSize();
  const unitNameWithoutTrailingS = unitName.slice(0, -1);

  return (
    <div id={unitName} className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.unitTitleContainer}>
          <p className={styles.unitName}>{unitNameWithoutTrailingS} Unit</p>
          {!isDesktop && (
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
                    src={url}
                    alt={`${unitName} unit`}
                    className={styles.takeoverUnitImage}
                    width={width}
                    height={height}
                  />
                </Takeover>
              )}
            </>
          )}
        </div>
        <div className={styles.unitContainer}>
          <CabinList
            unitData={unitData}
            setHasAvailability={setHasAvailability}
          />
          {isDesktop && hasAvailability ? (
            <Image
              src={url}
              alt={`${unitName} unit`}
              className={styles.unitImage}
              width={width}
              height={height}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
