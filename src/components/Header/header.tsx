import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../../assets/img/logo3.png';
import singInLogo from '../../assets/img/login.png';
import singUpLogo from '../../assets/img/register.png';
import singOutLogo from '../../assets/img/logout.png';
import graphQLLogo from '../../assets/img/graphQL.png';
import { auth, logout } from '../../firebase/firebase';
import { AuthContext } from '../../controllers/appControllers';
import styles from './header.module.scss';

let scroll = 0;

const radios: { name: string; value: string }[] = [
  { name: 'En', value: 'en' },
  { name: 'Рус', value: 'ru' },
];

const textObj: {
  [key: string]: {
    project: string;
    signUp: string;
    signIn: string;
    signOut: string;
  };
} = {
  en: {
    project: 'Phoenix GraphQL',
    signUp: 'Sign up',
    signIn: 'Sign in',
    signOut: 'Sign out',
  },
  ru: {
    project: 'Феникс GraphQL',
    signUp: 'Регистрация',
    signIn: 'Вход',
    signOut: 'Выход',
  },
};

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const { lang, setLang } = useContext(AuthContext);
  const [scrollWindow, setScrollWindow] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    window.onscroll = (): void => {
      scroll = window.scrollY;
      if (scroll >= window.scrollY && window.scrollY > 10) {
        setScrollWindow(true);
      } else {
        setScrollWindow(false);
      }
    };
  }, []);

  return (
    <header
      className={
        scrollWindow ? `${styles.header} ${styles.sticky}` : styles.header
      }
    >
      <a
        className={styles.logoContainer}
        href="https://goodvalts.github.io/graphql-app/"
      >
        <img src={logo} className={styles.logo} alt="logo" />
        <p className={styles.logoText}>{textObj[lang].project}</p>
      </a>

      <div className={styles.headerPanel}>
        <div className={styles.languageContainer}>
          {radios.map((radio, id) => (
            <button
              key={radio.value}
              type="button"
              data-testid={radio.value}
              className={`
              ${styles.toggleButton}
              ${id === 0 ? styles.first : ''}
              ${id === radios.length - 1 ? styles.last : ''}
              ${radio.value === lang ? styles.selected : ''}
            `
                .replace(/\n/g, '')
                .replace(/ {2,}/g, ' ')
                .trim()}
              onClick={(): void => {
                setLang(radio.value);
                localStorage.setItem('lang', radio.value);
              }}
            >
              {radio.name}
            </button>
          ))}
        </div>
        <nav>
          {user ? (
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navButton}
                onClick={(): void => navigate('/graphQL')}
                data-testid="graphql-btn"
              >
                GraphQl
              </button>
              <button
                type="button"
                className={styles.iconButton}
                onClick={(): void => navigate('/graphQL')}
              >
                <img className={styles.icon} alt="sign_out" src={graphQLLogo} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                onClick={(): void => {
                  logout();
                  navigate('/');
                }}
              >
                {textObj[lang].signOut}
              </button>
              <button
                type="button"
                className={styles.iconButton}
                onClick={(): void => {
                  logout();
                  navigate('/');
                }}
              >
                <img className={styles.icon} alt="sign_out" src={singOutLogo} />
              </button>
            </div>
          ) : (
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navButton}
                onClick={(): void => navigate('/login')}
              >
                {textObj[lang].signIn}
              </button>
              <button
                type="button"
                className={styles.iconButton}
                data-testid="mobile-btn-login"
                onClick={(): void => navigate('/login')}
              >
                <img className={styles.icon} alt="sign_in" src={singInLogo} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                onClick={(): void => navigate('/registration')}
              >
                {textObj[lang].signUp}
              </button>
              <button
                type="button"
                data-testid="mobile-btn-reg"
                className={styles.iconButton}
                onClick={(): void => navigate('/registration')}
              >
                <img className={styles.icon} alt="sign_out" src={singUpLogo} />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
