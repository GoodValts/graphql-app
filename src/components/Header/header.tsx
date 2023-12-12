import { Nav, Stack, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './header.module.scss';
import logo from '../../assets/img/logo.png';
import { AuthContext } from '../../controllers/appControllers';

let scroll = 0;
const radios = [
  { name: 'En', value: '1' },
  { name: 'Ru', value: '2' },
];

const Header = (): JSX.Element => {
  const [radioValue, setRadioValue] = useState('1');
  const { isAuth } = useContext(AuthContext);
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
        <span>PhoenixGraphiQL</span>
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
              onChange={(e): void => setRadioValue(e.currentTarget.value)}
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
                <Nav.Link href="/graphQL" eventKey="graphQL">
                  GraphiQL
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Button
              variant="outline-info"
              size="lg"
              onClick={(): void => navigate('/')}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Stack direction="horizontal" gap={2} className="ms-auto">
            <Button
              variant="outline-info"
              size="lg"
              onClick={(): void => navigate('/login')}
            >
              Sign in
            </Button>
            <Button
              variant="outline-info"
              size="lg"
              onClick={(): void => navigate('/registration')}
            >
              Sign up
            </Button>
          </Stack>
        )}
      </Stack>
    </header>
  );
};

export default Header;
