import styles from './layout.module.scss';
import Nav from '../nav/nav';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Nav
        navData={[
          {
            label: `Get a demo`,
            isButton: true,
            isAnchor: true,
          },
        ]}
      />

      {children}
    </div>
  );
}
