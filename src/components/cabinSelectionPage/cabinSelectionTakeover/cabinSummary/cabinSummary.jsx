import styles from './cabinSummary.module.scss';

export default function CabinSummary({
  name,
  additionalInformation = [],
  unit,
}) {
  const hasAdditionalInformation = additionalInformation?.length > 0;
  const { name: unitName } = unit[0];
  return (
    <div className={styles.summaryContainer}>
      <p className={styles.name}>Cabin {name}</p>
      <p className={styles.description}>
        Cabin {name} is located in the{' '}
        <span className={styles.unit}>{unitName}</span> unit.
      </p>
      {hasAdditionalInformation && (
        <div className={styles.additionalInformationContainer}>
          <p className={styles.additionalInformationTitle}>
            Additonal details:
          </p>
          <ul className={styles.additionalInformationList}>
            {additionalInformation.map(info => {
              return (
                <li key={info} className={styles.additionalInformationItem}>
                  {info}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
