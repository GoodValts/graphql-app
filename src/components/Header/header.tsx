import { Nav, Stack, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../../assets/img/logo3.png';
import { auth, logout } from '../../firebase/firebase';
import { AuthContext } from '../../controllers/appControllers';
import styles from './header.module.scss';

let scroll = 0;

const radios = [
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
  const [radioValue, setRadioValue] = useState(
    localStorage.getItem('lang') || 'en'
  );
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
      <Stack direction="horizontal" gap={4}>
        <a className={styles.logoContainer} href="/">
          <img src={logo} className={styles.logo} alt="logo" />
          <p className={styles.logoText}>{textObj[lang].project}</p>
        </a>
      </Stack>
      <Stack
        direction="horizontal"
        gap={2}
        className={`ms-auto ${styles.container}`}
      >
        <ButtonGroup>
          {radios.map((radio, ind) => (
            <ToggleButton
              key={radio.value}
              id={`radio-${ind}`}
              type="radio"
              name="radio"
              variant="outline-light"
              value={radio.value}
              size="lg"
              checked={radioValue === radio.value}
              data-testid={radio.value}
              onChange={(e): void => {
                setRadioValue(e.currentTarget.value);
                const selectedLang = radios
                  .find((item) => item.value === e.currentTarget.value)!
                  .value.toLowerCase();
                setLang(selectedLang);
                localStorage.setItem('lang', selectedLang);
              }}
              className={styles.red}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {user ? (
          <>
            <Nav
              className={styles.nav}
              fill
              variant="pills"
              defaultActiveKey="/"
            >
              <Nav.Item>
                <Nav.Link
                  // href="/graphQL"
                  eventKey="graphQL"
                  data-testid="graphql-btn"
                  onClick={(): void => navigate('/graphQL')}
                >
                  GraphQL
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Button
              variant="outline-info"
              size="lg"
              onClick={(): void => {
                logout();
                navigate('/');
              }}
            >
              {textObj[lang].signOut}
            </Button>
          </>
        ) : (
          <Stack direction="horizontal" gap={2} className="ms-auto">
            <Button
              variant="outline-info"
              size="lg"
              onClick={(): void => navigate('/login')}
            >
              {textObj[lang].signIn}
            </Button>
            <Button
              variant="outline-info"
              size="lg"
              onClick={(): void => navigate('/registration')}
            >
              {textObj[lang].signUp}
            </Button>
          </Stack>
        )}
      </Stack>
    </header>
  );
};

export default Header;
