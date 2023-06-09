import Takeover from '@/components/shared/takeover';
import SelectionSummary from '../selectionSummary';
import EmailVerificationTakeover from '../emailVerificationTakeover/emailVerificationTakeover';
import Units from '../units/units';
import { useCabinSelection } from '@/context/cabin-selection-context';

export default function ReservePageContainer() {
  const { showTakeover, dispatch, actions } = useCabinSelection();
  return (
    <div>
      {/* <SelectionSummary /> */}
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
