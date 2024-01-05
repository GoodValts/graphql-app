import { useContext } from 'react';
import git from '../../assets/img/github.png';
import rss from '../../assets/img/rs-school-js_.svg';
import rssHovered from '../../assets/img/rs-school-js_blue.svg';
import { AuthContext } from '../../controllers/appControllers';
import styles from './footer.module.scss';

const textObj: {
  [key: string]: {
    Ivan: string;
    Anastasiya: string;
    Natallia: string;
  };
} = {
  en: {
    Ivan: 'Ivan Martynjuk',
    Anastasiya: 'Anastasiya Alisenok',
    Natallia: 'Natallia Ivanyuk',
  },
  ru: {
    Ivan: 'Иван Мартынюк',
    Anastasiya: 'Анастасия Алисёнок',
    Natallia: 'Наталья Иванюк',
  },
  logins: {
    Ivan: 'goodvalts',
    Anastasiya: 'anastasiyaalisenok',
    Natallia: 'whiterabbit8',
  },
};

const Footer = (): JSX.Element => {
  const { lang } = useContext(AuthContext);

  return (
    <footer className={styles.footer}>
      <div className={styles.members}>
        <a
          href="https://github.com/goodvalts"
          target="_blank"
          rel="noreferrer"
          className={styles.member}
        >
          <img className={styles.gitLogo} src={git} alt="rss-logo" />
          <span className={styles.gitText}>{textObj[lang].Ivan}</span>
        </a>
        <a
          href="https://github.com/anastasiyaalisenok"
          target="_blank"
          rel="noreferrer"
          className={styles.member}
        >
          <img className={styles.gitLogo} src={git} alt="rss-logo" />
          <span className={styles.gitText}>{textObj[lang].Anastasiya}</span>
        </a>
        <a
          href="https://github.com/whiterabbit8"
          target="_blank"
          rel="noreferrer"
          className={styles.member}
        >
          <img className={styles.gitLogo} src={git} alt="rss-logo" />
          <span className={styles.gitText}>{textObj[lang].Natallia}</span>
        </a>
      </div>
      <div className={styles.year}>2023 ©</div>
      <div className={styles.rssContainer}>
        <div className={`${styles.year} ${styles.yearMobile}`}>2023 ©</div>
        <a href="https://rs.school/react/">
          <img
            className={styles.rssLogo}
            data-testid="rss-icon"
            onMouseEnter={(e): void => {
              if (window.screen.width > 1279.98) {
                const img = e.target as HTMLImageElement;
                img.src = rssHovered;
              }
            }}
            onMouseLeave={(e): void => {
              const img = e.target as HTMLImageElement;
              img.src = rss;
            }}
            src={rss}
            alt="rss-logo"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
