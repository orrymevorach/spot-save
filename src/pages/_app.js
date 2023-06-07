import { UserProvider } from '@/context/user-context';
import '@/styles/globals.css';
import Head from '@/components/shared/head';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head />
      <Component {...pageProps} />
    </UserProvider>
  );
}
