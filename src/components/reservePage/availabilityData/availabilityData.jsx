import { useState } from 'react';
import Takeover from '../../shared/takeover/takeover';
import UnitRow from '../unitRow';
import SelectionSummary from '../selectionSummary';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Dropdown from '@/components/shared/dropdown/dropdown';

export default function AvailabilityData() {
  const [showTakeover, setShowTakeover] = useState(false);
  const { units } = useGetCabinAndUnitData();
  const [bedQuantity, setBedQuantity] = useState(0);

  return (
    <div>
      <SelectionSummary />
      <Dropdown
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        label="How many beds are you reserving? (Maximium 12 beds in a cabin)"
        currentValue={bedQuantity}
        handleChange={setBedQuantity}
      />
      {units.map(unitData => {
        const [unitName] = unitData;
        return (
          <UnitRow
            key={unitName}
            unitData={unitData}
            handleSubmit={() => setShowTakeover(!showTakeover)}
            bedQuantity={bedQuantity}
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
