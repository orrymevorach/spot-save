import { getUserByEmail } from '@/lib/airtable';
import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from './inputVerify.module.scss';
import Button from '@/components/shared/button/button';
import { useCabinSelection } from '@/context/cabin-selection-context';

export default function InputVerify({ index }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifiedEmails, verifiedUsers, dispatch, actions } =
    useCabinSelection();

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
    } else if (!hasUser) {
      setError('No user found with this email.');
    } else if (hasUser && !isRepeatEmail) {
      const updatedVerifiedEmails = [...verifiedEmails, email];
      const updatedVerifiedUsers = [...verifiedUsers, userResponse];
      dispatch({
        type: actions.VERIFY_GUEST,
        verifiedEmails: updatedVerifiedEmails,
        verifiedUsers: updatedVerifiedUsers,
      });
    }
    setIsLoading(false);
  };

  const guestNumber = verifiedUsers.length + index + 1;

  return (
    <form onSubmit={verifyEmail} className={styles.form}>
      <label className={styles.label} htmlFor={`label-${index}`}>
        Guest {guestNumber}
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.row}>
        <TextField
          name={`label-${index}`}
          id={`label-${index}`}
          onChange={handleChange}
          value={email}
          size="small"
        />
        <Button isLoading={isLoading} classNames={styles.button}>
          Verify
        </Button>
        <Button
          handleClick={() => dispatch({ type: actions.REMOVE_GUEST })}
          classNames={styles.button}
        >
          Remove User
        </Button>
      </div>
    </form>
  );
}
