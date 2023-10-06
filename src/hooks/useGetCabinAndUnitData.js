import { useEffect, useState } from 'react';
import { getTableData } from '@/lib/airtable';
import { AIRTABLE_TABLES } from '@/utils/constants';

const sortCabinsIntoUnits = cabinList => {
  return cabinList.reduce((acc, curr) => {
    const currentUnit = curr.unit;
    const currentUnitExistsInData = !!acc[currentUnit];
    if (currentUnitExistsInData) {
      acc[currentUnit].cabins.push(curr);
    } else {
      acc[currentUnit] = {
        cabins: [curr],
      };
    }
    return acc;
  }, {});
};

export default function useGetCabinAndUnitData() {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const cabinResponse = await getTableData({
        tableId: AIRTABLE_TABLES.CABINS,
      });
      if (!units.length) {
        const unitsWithAllCabins = sortCabinsIntoUnits(cabinResponse);
        setUnits(Object.entries(unitsWithAllCabins));
      }
      setIsLoading(false);
    };

    getData();
  }, [units.length]);

  return {
    units,
    isLoading,
  };
}
