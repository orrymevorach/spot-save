import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './legend.module.scss';
import { faMattressPillow } from '@fortawesome/free-solid-svg-icons';

const legend = [
  {
    color: 'green',
    status: 'Available',
  },
  {
    color: 'blue',
    status: 'Selected (Pending confirmation)',
  },
  {
    color: 'gray',
    status: 'Reserved',
  },
];

export default function Legend() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Legend:</p>
      {legend.map(({ status, color }) => {
        return (
          <div key={status} className={styles.statusContainer}>
            <FontAwesomeIcon icon={faMattressPillow} color={color} size="2x" />
            <p className={styles.statusText}>{status}</p>
          </div>
        );
      })}
    </div>
  );
}
