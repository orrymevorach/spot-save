import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

const ButtonContents = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
      ) : (
        <>
          {children}
          <FontAwesomeIcon
            icon={faChevronRight}
            className={styles.chevron}
            size="sm"
          />
        </>
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
  isSecondary = false,
  isAnchor = false,
  isSmall = false,
  isInverted = false,
}) {
  const classnames = clsx(
    styles.button,
    classNames,
    isSecondary && styles.secondary,
    isSmall && styles.small,
    isInverted && styles.inverted
  );

  if (isAnchor) {
    return (
      <a href={href} className={classnames}>
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classnames}>
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </Link>
    );
  }
  if (handleClick) {
    return (
      <Button
        className={classnames}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </Button>
    );
  }
  return (
    <Button className={classnames} type="submit" disabled={isDisabled}>
      <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
    </Button>
  );
}
