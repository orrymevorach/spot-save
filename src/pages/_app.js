import '@/styles/globals.css';
import Head from '@/components/shared/head/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { WindowSizeProvider } from '@/context/window-size-context';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <WindowSizeProvider>
      <Head />
      <Component {...pageProps} />
    </WindowSizeProvider>
  );
}
