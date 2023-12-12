import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import git from '../../assets/img/git.png';
import rss from '../../assets/img/rs-school-js_.svg';
import styles from './footer.module.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <Navbar data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <img src={git} width={20} alt="git-logo" />
            <span className={styles.gitText}>GitHub:</span>
          </Navbar.Brand>
          <Nav className="ma-auto">
            <Nav.Link href="https://github.com/goodvalts">
              Ivan Martynjuk
            </Nav.Link>
            <Nav.Link href="https://github.com/anastasiyaalisenok">
              Anastasiya Alisenok
            </Nav.Link>
            <Nav.Link href="https://github.com/whiterabbit8">
              Natallia Ivanyuk
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className={styles.year}>2023</div>
      <div>
        <a href="https://rs.school/react/">
          <img className={styles.rssLogo} src={rss} alt="rss-logo" width={65} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
