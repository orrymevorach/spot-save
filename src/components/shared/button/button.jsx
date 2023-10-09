import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { useConfig } from '@/context/config-context';
import styled from 'styled-components';

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
  isLight = false,
  isAnchor = false,
  isSmall = false,
  isInverted = false,
}) {
  const config = useConfig();
  if (!config) return;
  const { primaryColour } = config;
  const classnames = clsx(
    styles.button,
    classNames,
    isLight && styles.light,
    isSmall && styles.small,
    isInverted && styles.inverted
  );

  const Button = styled.button`
    background-color: ${primaryColour};
    border: 2px solid ${primaryColour};
    &.light,
    &:hover {
      color: ${primaryColour};
    }
  `;

  if (isAnchor) {
    return (
      <a href={href} className={classnames}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classnames}>
        {children}
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
