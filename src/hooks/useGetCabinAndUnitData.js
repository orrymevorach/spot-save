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
      });
      setUnits(cabinResponse);
      setIsLoading(false);
    };

    getData();
  }, [units.length]);

  return {
    units,
    isLoading,
  };
}
