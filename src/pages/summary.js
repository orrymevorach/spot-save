import Layout from '@/components/shared/layout';
import { ReservationProvider } from '@/context/reservation-context';
import SummaryPage from '@/components/summaryPage/summaryPage';
import { UserProvider } from '@/context/user-context';

export default function Summary() {
  return (
    <ReservationProvider>
      <Layout>
        <SummaryPage />
      </Layout>
    </ReservationProvider>
  );
}
