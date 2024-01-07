import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../controllers/appControllers';
import styles from './404.module.scss';

const textObj: {
  [key: string]: {
    message: string;
    button: string;
  };
} = {
  en: {
    message: 'Page not found',
    button: 'Return to main page',
  },
  ru: {
    message: 'Страница не найдена',
    button: 'На главную',
  },
};

const NotFoundPage = (): JSX.Element => {
  const navTo = useNavigate();

  const { lang } = useContext(AuthContext);

  const backToMain = (): void => {
    navTo('/');
  };

  return (
    <section className={styles.page}>
      <div className={styles.errorBlock}>
        <div className={styles.text}>{textObj[lang].message}!</div>
        <button type="button" onClick={backToMain} className={styles.button}>
          {textObj[lang].button}
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
