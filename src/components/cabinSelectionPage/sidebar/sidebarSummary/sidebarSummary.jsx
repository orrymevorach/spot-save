import styles from './sidebarSummary.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCabin } from '@/lib/airtable';
import Loader from '@/components/shared/loader/loader';
import ImageCarousel from '@/components/shared/imageCarousel/imageCarousel';
import rainbow from 'public/rainbow-min.png';
import Image from 'next/image';

export default function SidebarSummary() {
  const [cabin, setCabin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const cabinQuery = router.query.cabin;

  useEffect(() => {
    const getCabinData = async () => {
      const cabinData = await getCabin({ cabinName: cabinQuery });
      setCabin(cabinData);
      setIsLoading(false);
      return;
    };
    if (cabinQuery && !cabin) {
      getCabinData();
    }
  }, [cabinQuery, cabin]);

  if (isLoading) return <Loader isDotted />;

  const { name, unit, images } = cabin;

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Summary</p>
        <Image src={rainbow} alt="" className={styles.image} />
      </div>
      <p>
        <span className={styles.left}>Cabin:</span>
        <span className={styles.right}>{name}</span>
      </p>
      <p>
        <span className={styles.left}>Unit:</span>
        <span className={styles.right}>{unit}</span>
      </p>
      {images && (
        <ImageCarousel
          images={images}
          hideThumbnails
          classNames={styles.images}
          height={150}
        />
      )}
    </div>
  );
}
