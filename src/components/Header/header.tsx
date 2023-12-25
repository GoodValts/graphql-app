import { Nav, Stack, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { key } from 'localforage';
import logo from '../../assets/img/logo3.png';
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
      <a className={styles.logoContainer} href="/">
        <img src={logo} className={styles.logo} alt="logo" />
        <p className={styles.logoText}>{textObj[lang].project}</p>
      </a>

      <div className={styles.headerPanel}>
        <div className={styles.languageContainer}>
          {radios.map((radio, id) => (
            <button
              key={radio.value}
              type="button"
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
            <button
              type="button"
              data-testid="graphql-btn"
              className={styles.navButton}
              onClick={(): void => {
                logout();
                navigate('/');
              }}
            >
              {textObj[lang].signOut}
            </button>
          ) : (
            // <>
            //   <Nav
            //     className={styles.nav}
            //     fill
            //     variant="pills"
            //     defaultActiveKey="/"
            //   >
            //     <Nav.Item>
            //       <Nav.Link
            //         // href="/graphQL"
            //         eventKey="graphQL"
            //         data-testid="graphql-btn"
            //         onClick={(): void => navigate('/graphQL')}
            //       >
            //         GraphQL
            //       </Nav.Link>
            //     </Nav.Item>
            //   </Nav>
            //   <Button
            //     variant="outline-info"
            //     size="lg"
            //     onClick={(): void => {
            //       logout();
            //       navigate('/');
            //     }}
            //   >
            //     {textObj[lang].signOut}
            //   </Button>
            // </>

            // <Stack direction="horizontal" gap={2} className="ms-auto">
            //   <Button
            //     variant="outline-info"
            //     size="lg"
            //     onClick={(): void => navigate('/login')}
            //   >
            //     {textObj[lang].signIn}
            //   </Button>
            //   <Button
            //     variant="outline-info"
            //     size="lg"
            //     onClick={(): void => navigate('/registration')}
            //   >
            //     {textObj[lang].signUp}
            //   </Button>
            // </Stack>
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
                className={styles.navButton}
                onClick={(): void => navigate('/registration')}
              >
                {textObj[lang].signUp}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
