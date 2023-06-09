import styles from './loader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loader({ isDotted = false }) {
  if (isDotted) {
    return (
      <div className={styles['lds-ring']}>
        <FontAwesomeIcon
          icon={faSpinner}
          className={styles.dottedIcon}
          size="2xl"
        />
      </div>
    );
  }
  return (
    <div className={styles['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
