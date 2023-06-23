import { useState } from 'react';
import Dropdown from '@/components/shared/dropdown/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './bed.module.scss';
import { faMattressPillow } from '@fortawesome/free-solid-svg-icons';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';

export default function Bed({ bedName, classNames = '', flip = false }) {
  const {
    cabinData: { cabin },
    selectedBeds,
    dispatch,
    actions,
    verifiedUsers,
  } = useReservation();

  const [currentUser, setCurrentUser] = useState('');
  const isBedSelected = cabin && !!cabin[bedName].length;

  const names = verifiedUsers
    // .filter(({ id }) => {
    //   for (let i = 0; i < selectedBeds.length; i++) {
    //     const selectedBed = selectedBeds[i];
    //     const userHasBed = selectedBed.userRecordId === id;
    //     if (userHasBed) return false;
    //   }
    //   return true;
    // })
    .map(({ name }) => name);

  const handleChange = selectedUser => {
    const currentUserData = verifiedUsers.find(
      ({ name }) => selectedUser === name
    );

    const { id, name } = currentUserData;

    selectedBeds.push({
      bedName,
      userRecordId: id,
    });

    dispatch({ type: actions.SELECT_BEDS, selectedBeds });
    setCurrentUser(name);
  };

  const BedIcon = () => (
    <FontAwesomeIcon
      icon={faMattressPillow}
      size="3x"
      className={clsx(styles.icon, isBedSelected && styles.reserved)}
    />
  );
  return (
    <div className={clsx(styles.bed, classNames, flip && styles.flip)}>
      {flip && <BedIcon />}
      {!isBedSelected ? (
        <Dropdown
          options={names}
          classNames={styles.dropdown}
          handleChange={handleChange}
          label="Select Guest"
          currentValue={currentUser}
        />
      ) : (
        <div className={styles.placeholder}></div>
      )}

      {!flip && <BedIcon />}
    </div>
  );
}
