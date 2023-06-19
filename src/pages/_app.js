import { UserProvider } from '@/context/user-context';
import '@/styles/globals.css';
import Head from '@/components/shared/head';
import Layout from '@/components/shared/layout/layout';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
