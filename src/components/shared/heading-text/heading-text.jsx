import styles from './heading-text.module.scss';
import clsx from 'clsx';

export default function HeadingText({
  children,
  classNames,
  isMedium = false,
}) {
  return (
    <p className={clsx(styles.text, isMedium && styles.medium, classNames)}>
      {children}
    </p>
  );
}
