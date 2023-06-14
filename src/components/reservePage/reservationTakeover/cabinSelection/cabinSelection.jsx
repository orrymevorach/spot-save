import styles from './cabinSelection.module.scss';

export default function CabinSummary({
  name,
  additionalInformation = [],
  unit,
}) {
  const hasAdditionalInformation = additionalInformation?.length > 0;
  return (
    <div className={styles.summaryContainer}>
      <p className={styles.name}>Cabin {name}</p>
      <p className={styles.description}>
        Cabin {name} is located in the{' '}
        <span className={styles.unit}>{unit}</span> unit.
      </p>
      {hasAdditionalInformation && (
        <div className={styles.additionalInformationContainer}>
          <p>Additonal details:</p>
          <ul>
            {additionalInformation.map(info => {
              return (
                <li key={info} className={styles.additionalInformationItem}>
                  - {info}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
