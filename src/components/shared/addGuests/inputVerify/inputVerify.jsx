import { createGroup, getUserByEmail, updateGroup } from '@/lib/airtable';
import { useState } from 'react';
import styles from './inputVerify.module.scss';
import Button from '@/components/shared/button/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '@/components/shared/input/input';
import { useReservation } from '@/context/reservation-context';
import { useUser } from '@/context/user-context';

const createOrUpdateGroup = async ({ user, groupData }) => {
  const hasExistingGroup = !!groupData.id;
  const groupRecordIds = groupData.members.map(({ id }) => id);
  if (!hasExistingGroup) {
    const response = await createGroup({
      groupName: user.name,
      members: groupRecordIds,
    });
    return {
      id: response.id,
      members: groupData.members,
    };
  } else {
    const response = await updateGroup({
      groupId: groupData.id,
      members: groupRecordIds,
    });
    return {
      id: response.id,
      members: groupData.members,
    };
  }
};

export default function InputVerify() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { groupData, dispatch, actions } = useReservation();
  const { user } = useUser();

  const handleChange = e => {
    setEmail(e.target.value);
    setError('');
  };

  const verifyEmail = async () => {
    setIsLoading(true);
    const userResponse = await getUserByEmail({ email });
    const hasUser = userResponse && userResponse.id;
    const groupEmails = groupData.members.map(
      ({ emailAddress }) => emailAddress
    );
    const isRepeatEmail = groupEmails.includes(email);
    if (isRepeatEmail) {
      return {
        error: 'This guest is already in your group. Please enter a new email.',
      };
    } else if (!hasUser) {
      return {
        error: 'No user found with this email.',
      };
    } else if (hasUser && !isRepeatEmail) {
      const groupDataWithNewMembers = {
        ...groupData,
        members: [...groupData.members, userResponse],
      };
      return {
        groupDataWithNewMembers,
        error: '',
      };
    }
  };

  const handleAddGuest = async e => {
    e.preventDefault();
    // Verify that user exists, and if so return updated group data
    const { groupDataWithNewMembers, error } = await verifyEmail();
    if (error) {
      setError(error);
      setIsLoading(false);
      setEmail('');
      return;
    }
    // Using new member data, create group or update existing group
    const updatedGroupData = await createOrUpdateGroup({
      user,
      groupData: groupDataWithNewMembers,
    });

    setIsLoading(false);
    setEmail('');
    dispatch({
      type: actions.UPDATE_GROUP,
      groupData: updatedGroupData,
    });
  };

  return (
    <form onSubmit={handleAddGuest}>
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
