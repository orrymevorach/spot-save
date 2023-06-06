import { UserProvider } from '@/context/user-context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
