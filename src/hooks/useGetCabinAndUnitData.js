import { useEffect, useState } from 'react';
import { getCabins } from '@/lib/airtable';

const initialUnitsData = {
  Colours: {
    cabins: [],
  },
  Comics: {
    cabins: [],
  },
  Zodiacs: {
    cabins: [],
  },
  Seekers: {
    cabins: [],
  },
  // CITS: {
  //   cabins: [],
  // },
  // 'L-Team': {
  //   cabins: [],
  // },
};

const sortCabinsIntoUnits = (cabinList, initialUnitsData) => {
  for (let cabin of cabinList) {
    const currentUnit = cabin.unit;
    // Some units, such as "Other" in the Airtable DB, are not included in the initial unit data
    const hasUnitData =
      initialUnitsData[currentUnit] && initialUnitsData[currentUnit].cabins;
    if (hasUnitData && !initialUnitsData[currentUnit].cabins.includes(cabin)) {
      initialUnitsData[currentUnit].cabins.push(cabin);
    }
  }
  return initialUnitsData;
};

export default function useGetCabinAndUnitData() {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const cabinResponse = await getCabins({});
      if (!units.length) {
        const unitsWithAllCabins = sortCabinsIntoUnits(
          cabinResponse,
          initialUnitsData
        );
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
