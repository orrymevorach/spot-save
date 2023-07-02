import styles from './bedSelection.module.scss';
import { useReservation } from '@/context/reservation-context';
import Button from '@/components/shared/button/button';
import { useState } from 'react';
import Cabin from './cabin/cabin';
import { useUser } from '@/context/user-context';
import { clearCurrentBedSelection, reserveBed } from '@/lib/airtable';
import Legend from './legend/legend';

export default function BedSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedBeds,
    groupData: { members },
  } = useReservation();
  const { user } = useUser();
  const cabin = user.cabin[0];

  const handleClick = async () => {
    setIsLoading(true);
    // selectedBeds contains all the reserved beds in the cabins, even those for people that are in a different group.
    // We don't want to make any updates to users that are not in the current group.
    const usersToBeUpdated = selectedBeds.filter(user => {
      for (let i = 0; i < members.length; i++) {
        const member = members[i];
        if (member.name === user.name) return true;
      }
    });
    for (let i = 0; i < usersToBeUpdated.length; i++) {
      const { bedName, id } = usersToBeUpdated[i];
      await clearCurrentBedSelection({ userId: id });
      const response = await reserveBed({
        userId: id,
        [bedName]: cabin.id,
      });
    }
    setIsLoading(false);
    window.location = '/summary?stage=BED_SELECTION';
  };

  return (
    <div className={styles.bedSelectionContainer}>
      <Cabin />
      <div className={styles.sidePanel}>
        <Button
          handleClick={handleClick}
          isLoading={isLoading}
          classNames={styles.button}
        >
          Confirm Selection
        </Button>
        <Legend />
      </div>
    </div>
  );
}
