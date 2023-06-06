import Head from 'next/head';
import AvailabilityData from '@/components/reservePage/availabilityData';

export default function Reserve() {
  return (
    <>
      <Head>
        <title>Highlands Tickets</title>
      </Head>
      <main>
        <AvailabilityData />
      </main>
    </>
  );
}
