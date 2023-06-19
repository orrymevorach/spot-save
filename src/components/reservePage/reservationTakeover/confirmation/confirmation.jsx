import { useUser } from '@/context/user-context';
import styles from './confirmation.module.scss';
import { useEffect, useState } from 'react';
import { getCabin } from '@/lib/airtable';

export default function Confirmation() {
  const [cabin, setCabin] = useState(null);
  const user = useUser();
  const cabinId = user.cabin[0].id;

  useEffect(() => {
    const getCabinData = async () => {
      const data = await getCabin({ cabinId });
      setCabin(data);
      return;
    };
    if (cabinId) {
      getCabinData();
    }
  }, [cabinId]);

  return (
    <div>
      {cabin && (
        <>
          <div>
            <p className={styles.confirmed}>Confirmed!</p>
            <p>
              You are in cabin {cabin.name} in the {cabin.unit} unit.
            </p>
          </div>
          {cabin.additionalInformation && (
            <div className={styles.additionalInformationContainer}>
              <p>Additonal details:</p>
              <ul>
                {cabin.additionalInformation.map(info => {
                  return (
                    <li key={info} className={styles.additionalInformationItem}>
                      - {info}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
