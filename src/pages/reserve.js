import { FiltersProvider } from '@/components/reservePage/filters/filters-context';
import ReservePageContainer from '@/components/reservePage/reservePageContainer';
import { CabinSelectionProvider } from '@/context/cabin-selection-context';

export default function Reserve() {
  return (
    <>
      <main>
        <CabinSelectionProvider>
          <FiltersProvider>
            <ReservePageContainer />
          </FiltersProvider>
        </CabinSelectionProvider>
      </main>
    </>
  );
}
