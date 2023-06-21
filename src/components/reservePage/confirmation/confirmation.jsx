import { useUser } from '@/context/user-context';
import styles from './confirmation.module.scss';
import { useEffect, useState } from 'react';
import { getCabin } from '@/lib/airtable';

export default function Confirmation() {
  const [cabin, setCabin] = useState(null);
  const { user } = useUser();
  const cabinName = user.cabin[0].name;

  useEffect(() => {
    const getCabinData = async () => {
      const data = await getCabin({ cabinName });
      setCabin(data);
      return;
    };
    if (cabinName) {
      getCabinData();
    }
  }, [cabinName]);

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
