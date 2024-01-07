import { useNavigate } from 'react-router-dom';
import styles from './404.module.scss';

const NotFoundPage = (): JSX.Element => {
  const navTo = useNavigate();

  const backToMain = (): void => {
    navTo('/');
  };

  return (
    <section className={styles.page}>
      <div className={styles.errorBlock}>
        <div className={styles.text}>Page not found!</div>
        <button type="button" onClick={backToMain} className={styles.button}>
          Return to main page
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
