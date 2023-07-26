import Takeover from '@/components/shared/takeover/takeover';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './mapOfCamp.module.scss';
import fullCamp from 'public/fullCamp.jpg';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const MapOfCampTakeover = ({ setShowMapTakeover }) => {
  const [isZoom, setIsZoom] = useState(false);
  const router = useRouter();

  // Add query param when takeover opens
  useEffect(() => {
    router.push(
      {
        query: {
          showMap: true,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
    // Remove query param when takeover closes
    return () => {
      router.push(
        {
          query: {},
        },
        undefined,
        {
          shallow: true,
        }
      );
    };
  }, []);

  return (
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
  );
};

export default function MapOfCamp() {
  const [showMapTakeover, setShowMapTakeover] = useState(false);
  const router = useRouter();

  // Show map takeover if showMap query param is true
  useEffect(() => {
    if (router?.query?.showMap === 'true') {
      setShowMapTakeover(true);
    }
  }, [router, setShowMapTakeover]);

  return (
    <>
      <p onClick={() => setShowMapTakeover(true)} className={styles.text}>
        <span className={styles.underline}>View map</span> of Highlands festival
        grounds.
      </p>
      {showMapTakeover && (
        <MapOfCampTakeover setShowMapTakeover={setShowMapTakeover} />
      )}
    </>
  );
}
