import { useCabinAndUnitData } from '@/context/cabin-and-unit-data-context';
import UnitRow from './unitRow';
import { FILTERS, useFilters } from '../filters/filters-context';

export default function Units() {
  const { units } = useCabinAndUnitData();
  const { selectedFilters } = useFilters();
  const { UNIT } = FILTERS;
  const unitFilter = selectedFilters[UNIT];
  return (
    <>
      {units
        .filter(unitData => {
          const { name: unitName } = unitData;
          if (!unitFilter) return true;
          if (unitName === unitFilter || unitFilter === 'All') return true;
          return false;
        })
        .map(unitData => {
          const { name: unitName } = unitData;
          return <UnitRow key={unitName} unitData={unitData} />;
        })}
    </>
  );
}
