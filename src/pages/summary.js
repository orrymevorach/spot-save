import Layout from '@/components/shared/layout';
import { ReservationProvider } from '@/context/reservation-context';
import SummaryPage from '@/components/summaryPage/summaryPage';

export default function Summary() {
  return (
    <ReservationProvider>
      <Layout>
        <SummaryPage />
      </Layout>
    </ReservationProvider>
  );
}
