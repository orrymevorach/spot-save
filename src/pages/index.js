import Head from 'next/head';
import Login from '@/components/loginPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Highlands Tickets</title>
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
}
