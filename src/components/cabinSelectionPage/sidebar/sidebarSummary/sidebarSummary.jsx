import styles from './sidebarSummary.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCabin } from '@/lib/airtable';
import Loader from '@/components/shared/loader/loader';

export default function SidebarSummary() {
  const [cabin, setCabin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const cabinQuery = router.query.cabin;

  useEffect(() => {
    const getCabinData = async () => {
      const cabinData = await getCabin({ cabinName: cabinQuery });
      setCabin(cabinData);
      setIsLoading(false);
      return;
    };
    if (cabinQuery && !cabin) {
      getCabinData();
    }
  }, [cabinQuery, cabin]);

  if (isLoading) return <Loader isDotted />;

  const { name, unit } = cabin;
  return (
    <div className={styles.summaryContainer}>
      <p className={styles.title}>Summary</p>
      <p>
        <span className={styles.cabin}>Cabin:</span>
        {name}
      </p>
      <p>Unit: {unit}</p>
    </div>
  );
}
