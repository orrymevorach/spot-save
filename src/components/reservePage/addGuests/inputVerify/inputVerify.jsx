import { getUserByEmail } from '@/lib/airtable';
import { useState } from 'react';
import styles from './inputVerify.module.scss';
import Button from '@/components/shared/button/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '@/components/shared/input/input';
import { useReservation } from '@/context/reservation-context';

export default function InputVerify() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifiedEmails, verifiedUsers, dispatch, actions } = useReservation();

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
        type: actions.ADD_GUEST,
        verifiedEmails: updatedVerifiedEmails,
        verifiedUsers: updatedVerifiedUsers,
      });
    }
    setIsLoading(false);
    setEmail('');
  };

  return (
    <form onSubmit={verifyEmail}>
      <div className={styles.row}>
        <Input
          handleChange={handleChange}
          value={email}
          label="Email address"
          error={error}
        />
        <Button isLoading={isLoading} classNames={styles.button}>
          Add Guest <FontAwesomeIcon icon={faPlus} size="sm" />
        </Button>
      </div>
    </form>
  );
}
