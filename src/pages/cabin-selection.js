import { FiltersProvider } from '@/components/cabinSelectionPage/filters/filters-context';
import CabinSelectionContainer from '@/components/cabinSelectionPage/cabinSelectionContainer';
import { CabinSelectionProvider } from '@/context/cabin-selection-context';

export default function CabinSelection() {
  return (
    <CabinSelectionProvider>
      <FiltersProvider>
        <main>
          <CabinSelectionContainer />
        </main>
      </FiltersProvider>
    </CabinSelectionProvider>
  );
}
