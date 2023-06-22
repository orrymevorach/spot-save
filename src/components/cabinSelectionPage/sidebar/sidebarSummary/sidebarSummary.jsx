import styles from './sidebarSummary.module.scss';
import Loader from '@/components/shared/loader/loader';
import ImageCarousel from '@/components/shared/imageCarousel/imageCarousel';
import rainbow from 'public/rainbow-min.png';
import Image from 'next/image';
import { useReservation } from '@/context/reservation-context';

export default function SidebarSummary() {
  const {
    cabinData: { cabin, isLoading },
  } = useReservation();

  if (isLoading) return <Loader isDotted />;

  const { name, unit, images, additionalInformation } = cabin;
  const hasAdditionalInformation =
    additionalInformation && additionalInformation.length > 0;

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
      {hasAdditionalInformation && (
        <div className={styles.additionalInformationContainer}>
          <p className={styles.additionalInformationTitle}>
            Additional information:
          </p>
          <ul className={styles.additionalInformationList}>
            {additionalInformation.map(detail => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
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
