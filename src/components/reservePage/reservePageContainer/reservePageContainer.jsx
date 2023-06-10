import Takeover from '@/components/shared/takeover';
import EmailVerificationTakeover from '../emailVerificationTakeover/emailVerificationTakeover';
import Units from '../units/units';
import { useCabinSelection } from '@/context/cabin-selection-context';
import Filters from '../filters/filters';
import Sidebar from '../sidebar/sidebar';
import { useRef } from 'react';

export default function ReservePageContainer() {
  const { showTakeover, dispatch, actions } = useCabinSelection();
  const mainSectionRef = useRef();
  return (
    <div>
      <Sidebar mainSectionRef={mainSectionRef} />
      <Filters mainSectionRef={mainSectionRef} />
      <Units />
      {showTakeover && (
        <Takeover
          disableOverlayClose
          showTakeover={showTakeover}
          handleClose={() => dispatch({ type: actions.CLOSE_CABIN_SELECTION })}
        >
          <EmailVerificationTakeover />
        </Takeover>
      )}
    </div>
  );
}
