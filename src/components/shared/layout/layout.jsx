import styles from './layout.module.scss';
import Nav from '../nav/nav';
import Footer from '../footer/footer';
import { ROUTES } from '@/utils/constants';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Nav
        navData={[
          {
            label: `Get a demo`,
            isButton: true,
            url: ROUTES.CONTACT,
          },
        ]}
      />

      {children}
      <Footer />
    </div>
  );
}
