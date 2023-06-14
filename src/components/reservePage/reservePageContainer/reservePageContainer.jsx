import Takeover from '@/components/shared/takeover';
import ReservationTakeover from '../reservationTakeover';
import Units from '../units';
import { useCabinSelection } from '@/context/cabin-selection-context';
import Sidebar from '../sidebar';
import { useRef } from 'react';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Header from '../header';

export default function ReservePageContainer() {
  const { showTakeover, dispatch, actions } = useCabinSelection();
  const mainSectionRef = useRef();
  const { isLoading } = useGetCabinAndUnitData();

  return (
    <div>
      <div ref={mainSectionRef}>
        <Header />
      </div>
      {!isLoading && (
        <>
          <Sidebar mainSectionRef={mainSectionRef} />
          <Units />
          {showTakeover && (
            <Takeover
              disableOverlayClose
              showTakeover={showTakeover}
              handleClose={() =>
                dispatch({ type: actions.CLOSE_CABIN_SELECTION })
              }
            >
              <ReservationTakeover />
            </Takeover>
          )}
        </>
      )}
    </div>
  );
}
