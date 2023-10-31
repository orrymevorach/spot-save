import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pill.module.scss';
import clsx from 'clsx';

export default function Pill({
  text,
  icon,
  size = 'xs',
  classNames = '',
  iconSide = 'right',
}) {
  return (
    <div className={clsx(styles.container, classNames)}>
      {iconSide === 'left' && icon && (
        <FontAwesomeIcon
          icon={icon}
          className={styles.icon}
          color="red"
          size={size}
        />
      )}
      <p className={styles.text}>{text}</p>
      {iconSide === 'right' && icon && (
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
