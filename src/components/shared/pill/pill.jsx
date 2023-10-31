import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pill.module.scss';
import clsx from 'clsx';

export default function Pill({ text, icon, size = 'xs', classNames = '' }) {
  return (
    <div className={clsx(styles.container, classNames)}>
      <p className={styles.text}>{text}</p>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={styles.icon}
          color="red"
          size={size}
        />
      )}
    </div>
  );
}
