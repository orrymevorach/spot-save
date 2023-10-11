import { useEffect, useState } from 'react';
import { getTableData } from '@/lib/airtable';
import { AIRTABLE_TABLES } from '@/utils/constants';

export default function useGetCabinAndUnitData() {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const cabinResponse = await getTableData({
        tableId: AIRTABLE_TABLES.UNITS,
        queryName: 'getUnits',
      });
      setUnits(cabinResponse);
      setIsLoading(false);
    };
    if (units.length === 0) {
      getData();
    }
  }, []);

  return {
    units,
    isLoading,
  };
}
