import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import UnitRow from './unitRow';
import Loader from '@/components/shared/loader/loader';

export default function Units() {
  const { units, isLoading } = useGetCabinAndUnitData();
  if (isLoading) return <Loader />;
  return (
    <>
      {units.map(unitData => {
        const [unitName] = unitData;
        return <UnitRow key={unitName} unitData={unitData} />;
      })}
    </>
  );
}
