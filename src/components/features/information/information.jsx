import styles from './information.module.scss';

export default function InformationContainer({
  heading,
  description,
  children,
}) {
  return (
    <div className={styles.informationContainer}>
      <p className={styles.heading}>{heading}</p>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
}
