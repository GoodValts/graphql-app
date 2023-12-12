import { useNavigate } from 'react-router-dom';
import styles from './404.module.scss';

const NotFoundPage = (): JSX.Element => {
  const navTo = useNavigate();

  const backToMain = (): void => {
    navTo('/');
  };

  return (
    <section className={styles.exampleStyle}>
      <div>
        <div>Page not found!</div>
        <button type="button" onClick={backToMain}>
          Return to main page
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
