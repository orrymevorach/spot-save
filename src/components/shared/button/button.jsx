import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import styled from 'styled-components';
import { COLOURS } from '@/utils/constants';

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
  const classnames = clsx(
    styles.button,
    classNames,
    isLight && styles.light,
    isSmall && styles.small,
    isInverted && styles.inverted
  );

  const { PRIMARY_COLOUR } = COLOURS;

  const StyledButton = styled.button`
    background-color: ${PRIMARY_COLOUR};
    border: 2px solid ${PRIMARY_COLOUR};
    &.light,
    &:hover {
      color: ${PRIMARY_COLOUR};
    }
  `;

  const NextLink = styled(Link)`
    background-color: ${PRIMARY_COLOUR};
    border: 2px solid ${PRIMARY_COLOUR};
    &.light,
    &:hover {
      color: ${PRIMARY_COLOUR};
    }
  `;

  if (isAnchor) {
    return (
      <StyledButton as="a" href={href} className={classnames}>
        {children}
      </StyledButton>
    );
  }
  if (href) {
    return (
      <NextLink href={href} className={classnames}>
        {children}
      </NextLink>
    );
  }
  if (handleClick) {
    return (
      <StyledButton
        className={classnames}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </StyledButton>
    );
  }
  return (
    <StyledButton className={classnames} type="submit" disabled={isDisabled}>
      <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
    </StyledButton>
  );
}
