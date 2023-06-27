import { FiltersProvider } from '@/components/cabinSelectionPage/filters/filters-context';
import CabinSelectionContainer from '@/components/cabinSelectionPage/cabinSelectionContainer';
import Layout from '@/components/shared/layout/layout';
import { CabinSelectionProvider } from '@/context/cabin-selection-context';
import { CabinAndUnitDataProvider } from '@/context/cabin-and-unit-data-context';

export default function CabinSelection() {
  return (
    <CabinAndUnitDataProvider>
      <CabinSelectionProvider>
        <FiltersProvider>
          <Layout>
            <main>
              <CabinSelectionContainer />
            </main>
          </Layout>
        </FiltersProvider>
      </CabinSelectionProvider>
    </CabinAndUnitDataProvider>
  );
}
