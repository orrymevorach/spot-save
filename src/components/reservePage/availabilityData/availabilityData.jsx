import { useState } from 'react';
import Takeover from '../../shared/takeover/takeover';
import UnitRow from '../unitRow';
import SelectionSummary from '../selectionSummary';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Dropdown from '@/components/shared/dropdown/dropdown';
import Loader from '@/components/shared/loader/loader';

import EmailVerificationTakeover from '../emailVerificationTakeover/emailVerificationTakeover';

export default function AvailabilityData() {
  const [showTakeover, setShowTakeover] = useState(false);
  const { units, isLoading } = useGetCabinAndUnitData();
  const [bedQuantity, setBedQuantity] = useState(1);
  const [selectedCabin, setSelectedCabin] = useState('');

  const handleSubmit = async selectedCabin => {
    setShowTakeover(true);
    setSelectedCabin(selectedCabin);
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <SelectionSummary />
      <Dropdown
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        label="Available Beds (Maximium 12 people per cabin)"
        currentValue={bedQuantity}
        handleChange={setBedQuantity}
      />
      {units.map(unitData => {
        const [unitName] = unitData;
        return (
          <UnitRow
            key={unitName}
            unitData={unitData}
            handleSubmit={handleSubmit}
            bedQuantity={bedQuantity}
          />
        );
      })}
      {showTakeover && (
        <Takeover disableOverlayClose>
          <EmailVerificationTakeover
            bedQuantity={bedQuantity}
            selectedCabin={selectedCabin}
          />
        </Takeover>
      )}
    </div>
  );
}
