import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import UnitRow from './unitRow';
import { FILTERS, useFilters } from '../filters/filters-context';

export default function Units() {
  const { units } = useGetCabinAndUnitData();
  const { selectedFilters } = useFilters();
  const { UNIT } = FILTERS;
  const unitFilter = selectedFilters[UNIT];
  return (
    <>
      {units
        .filter(unitData => {
          const [unitName] = unitData;
          if (!unitFilter) return true;
          if (unitName === unitFilter || unitFilter === 'All') return true;
          return false;
        })
        .map(unitData => {
          const [unitName] = unitData;
          return <UnitRow key={unitName} unitData={unitData} />;
        })}
    </>
  );
}
