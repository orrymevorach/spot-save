import { UserProvider } from '@/context/user-context';
import '@/styles/globals.css';
import Head from '@/components/shared/head';
import Layout from '@/components/shared/layout/layout';
import { CabinSelectionProvider } from '@/context/cabin-selection-context';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head />
      <CabinSelectionProvider>
        <Component {...pageProps} />
      </CabinSelectionProvider>
    </UserProvider>
  );
}
