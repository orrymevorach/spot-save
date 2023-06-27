import { useUser } from '@/context/user-context';
import styles from './reservationSummary.module.scss';
import Loader from '@/components/shared/loader/loader';

export default function ReservationSummary({ cabinData }) {
  const { user } = useUser();
  const { cabin, isLoading } = cabinData;

  if (isLoading || !user) return <Loader isDotted />;

  const { name, unit, additionalInformation } = cabin;
  const hasAdditionalInformation =
    additionalInformation && additionalInformation.length > 0;

  return (
    <div className={styles.summaryContainer}>
      <p>
        <span className={styles.left}>Name:</span>
        <span className={styles.right}>{user.name}</span>
      </p>
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
    </div>
  );
}
