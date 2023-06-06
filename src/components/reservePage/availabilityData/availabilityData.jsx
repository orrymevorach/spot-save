import { useState } from 'react';
import Takeover from '../../shared/takeover/takeover';
import UnitRow from '../unitRow';
import SelectionSummary from '../selectionSummary';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';

export default function AvailabilityData() {
  const [showTakeover, setShowTakeover] = useState(false);
  const { units } = useGetCabinAndUnitData();

  return (
    <div>
      <SelectionSummary />
      {units.map(unitData => {
        const [unitName] = unitData;
        return (
          <UnitRow
            key={unitName}
            unitData={unitData}
            handleSubmit={() => setShowTakeover(!showTakeover)}
          />
        );
      })}
      {showTakeover && (
        <Takeover>
          <p>Thank you!</p>
        </Takeover>
      )}
    </div>
  );
}
