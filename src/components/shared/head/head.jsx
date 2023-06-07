import Head from 'next/head';

export default function Meta({ title = '' }) {
  const tabTitle = `Highlands | Cabin Reservation`;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Cabin & bed reservations for Highlands Music Festival."
      />
      <title>{tabTitle}</title>
      <link rel="icon" href="/rainbow-min.png" />
      {/* <meta
        name="keywords"
        content="Highlands Music Festival, music festival, festival, Bancroft, Ontario, Toronto, Palmer Rapids, summer camp, 2023"
      /> */}
    </Head>
  );
}
