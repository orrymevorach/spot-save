import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import UnitRow from './unitRow';

export default function Units() {
  const { units, isLoading } = useGetCabinAndUnitData();
  return (
    <>
      {units.map(unitData => {
        const [unitName] = unitData;
        return <UnitRow key={unitName} unitData={unitData} />;
      })}
    </>
  );
}
