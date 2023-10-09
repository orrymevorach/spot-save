import { UserProvider } from '@/context/user-context';
import '@/styles/globals.css';
import Head from '@/components/shared/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { WindowSizeProvider } from '@/context/window-size-context';
import { ConfigProvider } from '@/context/config-context';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <WindowSizeProvider>
      <ConfigProvider>
        <UserProvider>
          <Head />
          <Component {...pageProps} />
        </UserProvider>
      </ConfigProvider>
    </WindowSizeProvider>
  );
}
