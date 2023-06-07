import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

const ButtonContents = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
      ) : (
        children
      )}
    </>
  );
};

export default function Button({
  children,
  isLoading = false,
  isDisabled = false,
  href = null,
  handleClick = null,
  classNames = '',
}) {
  if (href) {
    return (
      <Link href={href} className={clsx(styles.button, classNames)}>
        {children}
      </Link>
    );
  }
  if (handleClick) {
    return (
      <button
        className={clsx(styles.button, classNames)}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </button>
    );
  }
  return (
    <button
      className={clsx(styles.button, classNames)}
      type="submit"
      disabled={isDisabled}
    >
      <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
    </button>
  );
}
