import { getUserByEmail } from '@/lib/airtable';
import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from './inputVerify.module.scss';
import Button from '@/components/shared/button/button';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export default function InputVerify({
  index,
  setNumberOfVerifiedEmails,
  numberOfVerifiedEmails,
  verifiedEmails,
  setVerifiedEmails,
}) {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationIcon, setShowVerificationIcon] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setEmail(e.target.value);
    setError('');
  };

  const verifyEmail = async e => {
    e.preventDefault();
    setIsLoading(true);
    const userResponse = await getUserByEmail({ email });
    const hasUser = userResponse && userResponse.id;
    const isRepeatEmail = verifiedEmails.includes(email);
    if (isRepeatEmail) {
      setError(
        'This email has already been verified. Please enter a new email.'
      );
    } else if (hasUser && !isRepeatEmail) {
      setIsVerified(true);
      setNumberOfVerifiedEmails(numberOfVerifiedEmails + 1);
      verifiedEmails.push(email);
      setVerifiedEmails(verifiedEmails);
    } else setIsVerified(false);
    setShowVerificationIcon(true);
    setIsLoading(false);
  };

  const guestNumber = index + 1;
  const icon = isVerified ? faCheck : faTimes;

  return (
    <form onSubmit={verifyEmail} className={styles.form}>
      <label htmlFor={`label-${index}`}>Guest {guestNumber}</label>
      {error && <p>{error}</p>}
      <div className={styles.row}>
        {!isVerified ? (
          <>
            <TextField
              name={`label-${index}`}
              id={`label-${index}`}
              onChange={handleChange}
              value={email}
              size="small"
            />
            <Button isLoading={isLoading}>Verify</Button>
          </>
        ) : (
          <p>{email}</p>
        )}

        {showVerificationIcon && (
          <FontAwesomeIcon
            icon={icon}
            className={clsx(
              styles.icon,
              isVerified ? styles.check : styles.close
            )}
          />
        )}
      </div>
    </form>
  );
}
