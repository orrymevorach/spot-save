import { FiltersProvider } from '@/components/cabinSelectionPage/filters/filters-context';
import CabinSelectionContainer from '@/components/cabinSelectionPage/cabinSelectionContainer';
import Layout from '@/components/shared/layout/layout';
import { CabinSelectionProvider } from '@/context/cabin-selection-context';

export default function CabinSelection() {
  return (
    <CabinSelectionProvider>
      <FiltersProvider>
        <Layout>
          <main>
            <CabinSelectionContainer />
          </main>
        </Layout>
      </FiltersProvider>
    </CabinSelectionProvider>
  );
}
