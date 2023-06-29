import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './bed.module.scss';
import {
  faMattressPillow,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';
import { useUser } from '@/context/user-context';
import BedDropdown from './bed-dropdown/bed-dropdown';

const filterOutUsersWithSelectedBeds = ({ members, selectedBeds }) => {
  return members
    .filter(({ id }) => {
      for (let i = 0; i < selectedBeds.length; i++) {
        const selectedBed = selectedBeds[i];
        const userHasBed = selectedBed.id === id;
        if (userHasBed) return false;
      }
      return true;
    })
    .map(({ name }) => name);
};

const getIsBedOccupiedByMemberOfGroup = ({ members, bedName, cabin }) => {
  return members.find(({ name }) => {
    if (
      cabin[bedName] &&
      cabin[bedName].length &&
      cabin[bedName][0].name === name
    ) {
      return true;
    }
    return false;
  });
};

export default function Bed({ bedName, classNames = '', flip = false }) {
  const {
    selectedBeds,
    dispatch,
    actions,
    groupData: { members },
  } = useReservation();
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState('');
  const [placeOnHold, setPlaceOnHold] = useState(false);
  const cabin = user?.cabin && user.cabin[0];

  // Filter out names with selected beds
  const usersWithoutSelectedBeds = filterOutUsersWithSelectedBeds({
    members,
    selectedBeds,
  });

  const handleChange = selectedUser => {
    const currentUserData = members.find(({ name }) => selectedUser === name);

    const { id, name } = currentUserData;

    selectedBeds.push({
      bedName,
      id,
      name,
    });
    dispatch({ type: actions.SELECT_BEDS, selectedBeds });
    setCurrentUser(name);
    setPlaceOnHold(true);
  };

  const currentBedOccupantInCurrentGroup = getIsBedOccupiedByMemberOfGroup({
    members,
    bedName,
    cabin,
  });

  // Set bed status on page load
  useEffect(() => {
    const isBedSelected = cabin[bedName].length > 0;
    if (currentBedOccupantInCurrentGroup) {
      // If bed is selected by a person in this group
      setCurrentUser(currentBedOccupantInCurrentGroup.name);
    } else if (isBedSelected) {
      // If bed is selected by a person outside of this group
      setCurrentUser('Reserved');
    }
  }, [currentBedOccupantInCurrentGroup, cabin, bedName]);

  const handleRemove = () => {
    const updatedBeds = selectedBeds.filter(({ name }) => name !== currentUser);
    setCurrentUser();
    setPlaceOnHold(false);
    dispatch({
      type: actions.SELECT_BEDS,
      selectedBeds: updatedBeds,
    });
  };

  const BedIcon = () => (
    <FontAwesomeIcon
      icon={faMattressPillow}
      size="3x"
      className={clsx(
        styles.icon,
        currentUser && styles.reserved,
        placeOnHold && styles.selected
      )}
    />
  );

  return (
    <div className={clsx(styles.bed, classNames, flip && styles.flip)}>
      {flip && <BedIcon />}
      {!currentUser ? (
        <BedDropdown
          options={usersWithoutSelectedBeds}
          classNames={styles.dropdown}
          handleChange={handleChange}
          label="Select Guest"
          value={currentUser}
        />
      ) : (
        <p className={styles.reservedText}>
          {currentUser !== 'Reserved' && (
            <button onClick={handleRemove} className={styles.removeButton}>
              <FontAwesomeIcon icon={faMinusCircle} />
            </button>
          )}
          {currentUser}
        </p>
      )}

      {!flip && <BedIcon />}
    </div>
  );
}
