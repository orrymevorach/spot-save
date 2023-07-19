import styles from './bedSelection.module.scss';
import { useReservation } from '@/context/reservation-context';
import Button from '@/components/shared/button/button';
import { useState } from 'react';
import Cabin from './cabin/cabin';
import { clearCurrentBedSelection, reserveBed } from '@/lib/airtable';
import Legend from './legend/legend';
import { useWindowSize } from '@/context/window-size-context';
import { sendConfirmationEmail } from '@/lib/mailgun';

const HeadStaffCabinInformation = () => {
  return (
    <div>
      <p>Bed selection for this cabin is not required.</p>
    </div>
  );
};

export default function BedSelection({ readOnly = false, cabin }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedBeds,
    groupData: { members },
  } = useReservation();
  const { isMobile } = useWindowSize();

  if (cabin.totalBeds === 3) return <HeadStaffCabinInformation />;

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
    await sendConfirmationEmail({
      groupMembers: usersToBeUpdated,
      cabin,
      selectedBeds,
    });
    setIsLoading(false);
    window.location = '/summary?stage=BED_SELECTION';
  };

  const ConfirmButton = () => (
    <Button
      handleClick={handleClick}
      isLoading={isLoading}
      classNames={styles.button}
    >
      Confirm Selection
    </Button>
  );

  return (
    <div className={styles.bedSelectionContainer}>
      <Cabin readOnly={readOnly} cabin={cabin} />
      <div className={styles.sidePanel}>
        {!isMobile && !readOnly ? <ConfirmButton /> : ''}
        <Legend />
      </div>
      {isMobile && !readOnly ? <ConfirmButton /> : ''}
    </div>
  );
}
