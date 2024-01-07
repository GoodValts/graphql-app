import { useContext } from 'react';
import LoginForm from '../../components/Forms/LoginForm/loginForm';
import { AuthContext } from '../../controllers/appControllers';
import styles from './login.module.scss';

const textObj: {
  [key: string]: { paragraphStart: string; link: string; paragraphEnd: string };
} = {
  en: {
    paragraphStart: "Don't have an account?",
    link: 'Sign up',
    paragraphEnd: 'now!',
  },
  ru: {
    paragraphStart: 'Нет учетной записи?',
    link: 'Присоединяйтесь',
    paragraphEnd: 'к нам!',
  },
};

const LoginPage = (): JSX.Element => {
  const { lang } = useContext(AuthContext);
  return (
    <>
      <LoginForm />
      <p className={styles.paragraph}>
        {textObj[lang].paragraphStart}{' '}
        <a className={styles.link} href="/registration">
          {textObj[lang].link}
        </a>{' '}
        {textObj[lang].paragraphEnd}
      </p>
    </>
  );
};

export default LoginPage;
