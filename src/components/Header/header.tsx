import { Nav, Stack, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './header.module.scss';
import logo from '../../assets/img/logo.png';
import { AuthContext } from '../../controllers/appControllers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsAuth, selectLanguage } from '../../redux/store';
import { setLanguage } from '../../redux/reducers/settings';

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
  const dispatch = useAppDispatch();
  const lang = useAppSelector(selectLanguage);
  const isAuth = useAppSelector(selectIsAuth);
  const [radioValue, setRadioValue] = useState('1');
  const [scrollWindow, setScrollWindow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.onscroll = (): void => {
      scroll = window.scrollY;
      if (scroll >= window.scrollY && window.scrollY > 10) {
        console.log(window.scrollY);
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
        <img src={logo} className={styles.logo} alt="logo" />
        <Link to="/">
          <span className={styles.logoText}>{textObj[lang].project}</span>
        </Link>
      </Stack>
      <Stack direction="horizontal" className={`ms-auto ${styles.container}`}>
        <ButtonGroup>
          {radios.map((radio, ind) => (
            <ToggleButton
              key={radio.value}
              id={`radio-${ind}`}
              type="radio"
              name="radio"
              variant="outline-info"
              value={radio.value}
              size="lg"
              checked={radioValue === radio.value}
              onChange={(e): void => {
                setRadioValue(e.currentTarget.value);
                dispatch(
                  setLanguage(
                    radios
                      .find((item) => item.value === e.currentTarget.value)!
                      .value.toLowerCase()
                  )
                );
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {isAuth ? (
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
              onClick={(): void => navigate('/')}
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
