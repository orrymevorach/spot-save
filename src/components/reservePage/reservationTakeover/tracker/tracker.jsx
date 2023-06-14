import styles from './tracker.module.scss';

const steps = [
  'Select a cabin',
  'Add guests (optional)',
  'Select beds (optional)',
];

export default function Tracker() {
  return (
    <div className={styles.tracker}>
      {steps.map(step => {
        return (
          <div key={step} className={styles.step}>
            {step}
            <div className={styles.ball}></div>
          </div>
        );
      })}
    </div>
  );
}
