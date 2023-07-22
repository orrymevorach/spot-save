import Takeover from '@/components/shared/takeover/takeover';
import Image from 'next/image';
import { useState } from 'react';
import styles from './mapOfCamp.module.scss';
import fullCamp from 'public/fullCamp.jpg';
import clsx from 'clsx';

export default function MapOfCamp() {
  const [showMapTakeover, setShowMapTakeover] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  return (
    <>
      <p onClick={() => setShowMapTakeover(true)} className={styles.text}>
        <span className={styles.underline}>View map</span> of Highlands festival
        grounds.
      </p>
      {showMapTakeover && (
        <Takeover
          handleClose={() => setShowMapTakeover(false)}
          modalClassNames={styles.takeover}
        >
          <Image
            src={fullCamp}
            alt=""
            className={clsx(styles.map, isZoom && styles.isZoom)}
            onClick={() => setIsZoom(!isZoom)}
          />
        </Takeover>
      )}
    </>
  );
}
