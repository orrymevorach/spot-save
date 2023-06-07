import ReservePageContainer from '@/components/reservePage/reservePageContainer';
import { CabinSelectionProvider } from '@/context/cabin-selection-context';

export default function Reserve() {
  return (
    <>
      <main>
        <CabinSelectionProvider>
          <ReservePageContainer />
        </CabinSelectionProvider>
      </main>
    </>
  );
}
