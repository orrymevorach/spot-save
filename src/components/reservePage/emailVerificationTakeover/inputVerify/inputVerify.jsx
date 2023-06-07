import { getUserByEmail } from '@/lib/airtable';
import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from './inputVerify.module.scss';
import Button from '@/components/shared/button/button';
import { useCabinSelection } from '@/context/cabin-selection-context';

export default function InputVerify({ index }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifiedEmails, dispatch, actions } = useCabinSelection();

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
      dispatch({
        type: actions.VERIFY_GUEST,
        verifiedEmails: updatedVerifiedEmails,
      });
      setUser(userResponse);
    }
    setIsLoading(false);
  };

  const guestNumber = index + 1;

  return (
    <form onSubmit={verifyEmail} className={styles.form}>
      <label htmlFor={`label-${index}`}>Guest {guestNumber}</label>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.row}>
        {!user ? (
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
          <p>{user.name}</p>
        )}
      </div>
    </form>
  );
}
