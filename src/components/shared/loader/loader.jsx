import styles from './loader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function Loader({
  isDotted = false,
  size = '2xl',
  classNames = '',
}) {
  if (isDotted) {
    return (
      <div className={clsx(styles['lds-ring'], classNames)}>
        <FontAwesomeIcon
          icon={faSpinner}
          className={styles.dottedIcon}
          size={size}
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
