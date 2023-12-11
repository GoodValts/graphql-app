import { Nav, Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import styles from './header.module.scss';
import logo from '../../assets/img/logo.png';
import { AuthContext } from '../../controllers/appControllers';

const Header = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <Stack direction="horizontal" gap={4}>
        <img src={logo} className={styles.logo} alt="logo" />
        <span>PheniexGraphiQL</span>
      </Stack>
      <Stack direction="horizontal" className="ms-auto">
        {isAuth ? (
          <Nav className={styles.nav} fill variant="pills" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link href="/graphQL" eventKey="graphQL">
                GraphiQL
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Stack direction="horizontal" gap={2} className="ms-auto">
            <Button
              variant="outline-primary"
              size="lg"
              onClick={(): void => navigate('/login')}
            >
              Sign in
            </Button>
            <Button
              variant="outline-primary"
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
