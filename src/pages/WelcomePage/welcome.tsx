import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthContext } from '../../controllers/appControllers';
import { auth } from '../../firebase/firebase';
import styles from './welcome.module.scss';
import IvanPhoto from '../../assets/img/IvanPhoto.jpg';
import AnastasiyaPhoto from '../../assets/img/AnastasiyaPhoto.jpg';
import NataliaPhoto from '../../assets/img/NataliaPhoto.jpg';
import gitIcon from '../../assets/img/git.png';
import tgIcon from '../../assets/img/tg.png';
import mapsIcon from '../../assets/img/maps.png';

interface Developer {
  photo?: string;
  name: string;
  surname: string;
  city: string;
  role: string;
  cvLink?: string;
  gitHub?: string;
  telegram?: string;
}

const textObj: {
  [key: string]: {
    header: string;
    aboutProject: { description: string; link: string };
    stack: { header: string; techs?: string[] };
    links: {
      linkSignIn: string;
      linkSignUp: string;
      linkMainPage: string;
      linkParagraph: string;
    };
    developers: { header: string; members: Developer[] };
  };
} = {
  en: {
    header: 'Phoenix GraphQL',
    aboutProject: {
      description: 'is an app for the final task of the',
      link: 'React course at Rolling Scopes School',
    },
    stack: {
      header: 'Stack:',
      techs: [
        'React + Redux',
        'Typescript',
        'SCSS + Bootstrap',
        'GraphQL',
        'Jest',
        'Husky + Prettier + ESLint',
        'Firebase',
      ],
    },
    links: {
      linkSignIn: 'Sign in',
      linkSignUp: 'Sign up',
      linkMainPage: 'Go to main page',
      linkParagraph: ' and try it!',
    },
    developers: {
      header: 'Our team:',
      members: [
        {
          name: 'Ivan',
          surname: 'Martynjuk',
          photo: IvanPhoto,
          city: 'Gomel',
          role: 'Team Lead',
          gitHub: 'GoodValts',
          telegram: '@szczuczynszczyna',
          cvLink: 'https://goodvalts.github.io/rsschool-cv/',
        },
        {
          name: 'Anastasiya',
          surname: 'Alisenok',
          photo: AnastasiyaPhoto,
          city: 'Minsk',
          role: 'Frontend developer',
          gitHub: 'AnastasiyaAlisenok',
          telegram: '@anastasiya_alisenok',
          cvLink: 'https://anastasiyaalisenok-portfolio.netlify.app/',
        },
        {
          name: 'Natallia',
          surname: 'Ivanyuk',
          photo: NataliaPhoto,
          city: 'Brest',
          role: 'Frontend developer',
          gitHub: 'whiterabbit8',
          telegram: '@nat_viii',
          cvLink: 'https://whiterabbit8.github.io/rsschool-cv/',
        },
      ],
    },
  },
  ru: {
    header: 'Феникс GraphQL',
    aboutProject: {
      description: '— приложение для финального задания',
      link: 'курса по React в Rolling Scopes School',
    },
    stack: {
      header: 'Технологии:',
    },
    links: {
      linkSignIn: 'Войдите',
      linkSignUp: 'Зарегистрируйтесь',
      linkMainPage: 'Переходите на главную',
      linkParagraph: ' и посмотрите, как это работает!',
    },
    developers: {
      header: 'Наша команда:',
      members: [
        {
          name: 'Иван',
          surname: 'Мартынюк',
          city: 'Гомель',
          role: 'Тимлид',
        },
        {
          name: 'Анастасия',
          surname: 'Алисёнок',
          city: 'Минск',
          role: 'Разработчик интерфейсов',
        },
        {
          name: 'Наталья',
          surname: 'Иванюк',
          city: 'Брест',
          role: 'Разработчик интерфейсов',
        },
      ],
    },
  },
};

const WelcomePage = (): JSX.Element => {
  const { lang } = useContext(AuthContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.topMargin} />
      <h2 className={styles.mainHeader}>{textObj[lang].header}</h2>
      <div className={styles.aboutContainer}>
        <p className={styles.paragraph}>
          <strong>{textObj[lang].header}</strong>{' '}
          {textObj[lang].aboutProject.description}{' '}
          <a
            className={styles.links}
            href="https://github.com/rolling-scopes-school/tasks/blob/master/react/README.md"
            target="_blank"
            rel="noreferrer"
          >
            {textObj[lang].aboutProject.link}
          </a>
          .
        </p>
      </div>
      <section className={styles.techs}>
        <h3 className={styles.header}>{textObj[lang].stack.header}</h3>
        {textObj.en.stack.techs &&
          textObj.en.stack.techs.map((el) => {
            return (
              <p className={styles.list} key={el}>
                {el}
              </p>
            );
          })}
        <div className={styles.linkBlock}>
          {user ? (
            <p className={styles.paragraph}>
              <button
                className={styles.links}
                type="button"
                onClick={(): void => navigate('/graphQL')}
              >
                {textObj[lang].links.linkMainPage}
              </button>
              {textObj[lang].links.linkParagraph}
            </p>
          ) : (
            <p className={styles.paragraph}>
              {' '}
              <button
                className={styles.links}
                type="button"
                onClick={(): void => navigate('/login')}
              >
                {textObj[lang].links.linkSignIn}
              </button>
              {' / '}
              <button
                className={styles.links}
                type="button"
                onClick={(): void => navigate('/registration')}
              >
                {textObj[lang].links.linkSignUp}
              </button>{' '}
              {textObj[lang].links.linkParagraph}{' '}
            </p>
          )}
        </div>
      </section>
      <section className={styles.developersBlock}>
        <h3 className={styles.header}>{textObj[lang].developers.header}</h3>
        <div className={styles.developers}>
          {textObj[lang].developers.members.map(
            (el: Developer, index: number) => {
              return (
                <div key={el.surname} className={styles.member}>
                  <a
                    href={textObj.en.developers.members[index].cvLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className={styles.photo}
                      src={textObj.en.developers.members[index].photo}
                      alt={`${textObj.en.developers.members[index].name}_photo`}
                    />
                  </a>
                  <p className={styles.header}>{`${el.name} ${el.surname}`}</p>
                  <p className={styles.paragraph} style={{ fontWeight: '700' }}>
                    {el.role}
                  </p>
                  <a
                    href={`https://github.com/${textObj.en.developers.members[index].gitHub}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.iconContainer}
                  >
                    <img alt="gitIcon" src={gitIcon} className={styles.icon} />
                    <p className={styles.links}>
                      {textObj.en.developers.members[index].gitHub}
                    </p>
                  </a>
                  <a
                    href={`https://t.me/${textObj.en.developers.members[
                      index
                    ].telegram?.slice(1)}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.iconContainer}
                  >
                    <img alt="tgIcon" src={tgIcon} className={styles.icon} />
                    <p className={styles.links}>
                      {textObj.en.developers.members[index].telegram}
                    </p>
                  </a>
                  <a
                    href={`https://www.google.by/maps/place/${textObj.en.developers.members[index].city}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.iconContainer}
                  >
                    <img alt="geoIcon" src={mapsIcon} className={styles.icon} />
                    <p className={styles.links}>{el.city}</p>
                  </a>
                </div>
              );
            }
          )}
        </div>
      </section>
    </>
  );
};

export default WelcomePage;
