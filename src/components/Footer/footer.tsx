import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import git from '../../assets/img/git.png';
import rss from '../../assets/img/rs-school-js_.svg';
import { useAppSelector } from '../../redux/hooks';
import { selectLanguage } from '../../redux/store';
import styles from './footer.module.scss';

const textObj: {
  [key: string]: {
    github: string;
    Ivan: string;
    Anastasiya: string;
    Natallia: string;
  };
} = {
  en: {
    github: 'GitHub:',
    Ivan: 'Ivan Martynjuk',
    Anastasiya: 'Anastasiya Alisenok',
    Natallia: 'Natallia Ivanyuk',
  },
  ru: {
    github: 'ГитХаб:',
    Ivan: 'Иван Мартынюк',
    Anastasiya: 'Анастасия Алисёнок',
    Natallia: 'Наталья Иванюк',
  },
};

const Footer = (): JSX.Element => {
  const lang = useAppSelector(selectLanguage);

  return (
    <footer className={styles.footer}>
      <Navbar data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <img src={git} width={20} alt="git-logo" />
            <span className={styles.gitText}>{textObj[lang].github}</span>
          </Navbar.Brand>
          <Nav className="ma-auto">
            <Nav.Link href="https://github.com/goodvalts">
              {textObj[lang].Ivan}
            </Nav.Link>
            <Nav.Link href="https://github.com/anastasiyaalisenok">
              {textObj[lang].Anastasiya}
            </Nav.Link>
            <Nav.Link href="https://github.com/whiterabbit8">
              {textObj[lang].Natallia}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className={styles.year}>2023 ©</div>
      <div>
        <a href="https://rs.school/react/">
          <img className={styles.rssLogo} src={rss} alt="rss-logo" width={65} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
