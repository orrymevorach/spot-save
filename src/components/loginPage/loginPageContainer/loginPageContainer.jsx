import Login from '@/components/loginPage';
import Header from '@/components/loginPage/header';
import Information from '@/components/loginPage/information';
import styles from './loginPageContainer.module.scss';

export default function LoginPageContainer() {
  return (
    <div>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.column}>
          <Information />
        </div>
        <div className={styles.column}>
          <Login />
        </div>
      </main>
    </div>
  );
}
