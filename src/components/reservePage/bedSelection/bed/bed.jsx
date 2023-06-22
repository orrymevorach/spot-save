import Dropdown from '@/components/shared/dropdown/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './bed.module.scss';
import { faMattressPillow } from '@fortawesome/free-solid-svg-icons';
import { useReservation } from '@/context/reservation-context';
import { useBedSelection } from '@/context/bed-selection-context';
import clsx from 'clsx';

export default function Bed({ bedName, classNames = '', flip = false }) {
  const {
    verifiedUsers,
    cabinData: { cabin },
  } = useReservation();
  const { bedSelection, setBedSelection } = useBedSelection();

  const isBedSelected = !!cabin[bedName].length;

  const names = verifiedUsers.map(({ name }) => name);

  const handleChange = selectedUser => {
    const userRecordId = verifiedUsers.find(
      ({ name }) => selectedUser === name
    ).id;

    bedSelection.push({
      bedName,
      userRecordId,
    });

    setBedSelection(bedSelection);
  };
  const BedIcon = () => (
    <FontAwesomeIcon
      icon={faMattressPillow}
      size="3x"
      className={styles.icon}
    />
  );
  return (
    <div className={clsx(styles.bed, classNames, flip && styles.flip)}>
      {flip && <BedIcon />}
      {isBedSelected ? (
        <p className={styles.reserved}>Reserved</p>
      ) : (
        <Dropdown
          options={names}
          classNames={styles.dropdown}
          handleChange={handleChange}
          label="Select Guest"
        />
      )}

      {!flip && <BedIcon />}
    </div>
  );
}
