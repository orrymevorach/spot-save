import { FiltersProvider } from '@/components/cabinSelectionPage/filters/filters-context';
import CabinSelectionContainer from '@/components/cabinSelectionPage/cabinSelectionContainer';
import Layout from '@/components/shared/layout/layout';

export default function CabinSelection() {
  return (
    <FiltersProvider>
      <Layout>
        <main>
          <CabinSelectionContainer />
        </main>
      </Layout>
    </FiltersProvider>
  );
}
