import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import styles from './icons.module.scss';
import clsx from 'clsx';

export const CloseButton = ({ handleClick, dark = false, classNames = '' }) => {
  return (
    <button
      onClick={handleClick}
      className={clsx(
        styles.closeButton,
        dark && styles.darkButton,
        classNames
      )}
    >
      <FontAwesomeIcon icon={faWindowClose} size="2x" />
    </button>
  );
};
