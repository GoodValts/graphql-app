import { useContext } from 'react';
import RegistrationForm from '../../components/Forms/RegistrationForm/registrationForm';
import { AuthContext } from '../../controllers/appControllers';
import { useAppSelector } from '../../redux/hooks';
import { selectLanguage } from '../../redux/store';
import styles from './registration.module.scss';

const textObj: {
  [key: string]: { paragraphStart: string; link: string; paragraphEnd: string };
} = {
  en: {
    paragraphStart: 'Already have an account? ',
    link: 'Sign in',
    paragraphEnd: ' now!',
  },
  ru: {
    paragraphStart: 'Уже есть учётная запись? ',
    link: 'Войдите',
    paragraphEnd: ' в аккаунт!',
  },
};

const RegistrationPage = (): JSX.Element => {
  const lang = useAppSelector(selectLanguage);
  return (
    <>
      <RegistrationForm />
      <p className={styles.paragraph}>
        {textObj[lang].paragraphStart}
        <a className={styles.link} href="/login">
          {textObj[lang].link}
        </a>
        {textObj[lang].paragraphEnd}
      </p>
    </>
  );
};

export default RegistrationPage;
