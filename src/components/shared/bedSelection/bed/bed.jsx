import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './bed.module.scss';
import { faMattressPillow } from '@fortawesome/free-solid-svg-icons';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';
import { useUser } from '@/context/user-context';
import BedDropdown from './bed-dropdown/bed-dropdown';

export default function Bed({ bedName, classNames = '', flip = false }) {
  const { selectedBeds, dispatch, actions, groupData } = useReservation();
  const { members } = groupData;
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState('');

  const cabin = user?.cabin && user.cabin[0];
  const isBedSelected = cabin[bedName].length > 0;

  const names = members
    // Filter out names with selected beds
    .filter(({ id }) => {
      for (let i = 0; i < selectedBeds.length; i++) {
        const selectedBed = selectedBeds[i];
        const userHasBed = selectedBed.userRecordId === id;
        if (userHasBed) return false;
      }
      return true;
    })
    .map(({ name }) => name);

  const handleChange = selectedUser => {
    const currentUserData = members.find(({ name }) => selectedUser === name);

    const { id, name } = currentUserData;

    selectedBeds.push({
      bedName,
      userRecordId: id,
    });
    dispatch({ type: actions.SELECT_BEDS, selectedBeds });
    setCurrentUser(name);
  };

  useEffect(() => {
    // Remove user if Reset button is clicked
    if (!selectedBeds.length) {
      setCurrentUser();
    }
  }, [selectedBeds]);

  const BedIcon = () => (
    <FontAwesomeIcon
      icon={faMattressPillow}
      size="3x"
      className={clsx(
        styles.icon,
        isBedSelected && styles.reserved,
        currentUser && styles.selected
      )}
    />
  );
  return (
    <div className={clsx(styles.bed, classNames, flip && styles.flip)}>
      {flip && <BedIcon />}
      {!isBedSelected ? (
        <BedDropdown
          options={names}
          classNames={styles.dropdown}
          handleChange={handleChange}
          label="Select Guest"
          value={currentUser}
        />
      ) : (
        <div className={styles.placeholder}></div>
      )}

      {!flip && <BedIcon />}
    </div>
  );
}
