import Head from 'next/head';

export default function Meta({ title = '' }) {
  const tabTitle = `Reserved`;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="Reserved" />
      <title>{tabTitle}</title>
      <link rel="icon" href="/reserved.png" />
      {/* <meta
        name="keywords"
        content="Highlands Music Festival, music festival, festival, Bancroft, Ontario, Toronto, Palmer Rapids, summer camp, 2023"
      /> */}
    </Head>
  );
}
