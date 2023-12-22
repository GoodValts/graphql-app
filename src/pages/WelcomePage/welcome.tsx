import { useContext } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectLanguage } from '../../redux/store';
import { AuthContext } from '../../controllers/appControllers';
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
  gitHub?: string;
  telegram?: string;
}

const textObj: {
  [key: string]: {
    header: string;
    aboutProject: string;
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
    aboutProject:
      'Phoenix GraphQL is an app for the final task of the React course at Rolling Scopes School.',
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
        },
        {
          name: 'Anastasiya',
          surname: 'Alisenok',
          photo: AnastasiyaPhoto,
          city: 'Minsk',
          role: 'Frontend developer',
          gitHub: 'AnastasiyaAlisenok',
          telegram: '@anastasiya_alisenok',
        },
        {
          name: 'Natallia',
          surname: 'Ivanyuk',
          photo: NataliaPhoto,
          city: 'Brest',
          role: 'Frontend developer',
          gitHub: 'whiterabbit8',
          telegram: '@nat_viii',
        },
      ],
    },
  },
  ru: {
    header: 'Феникс GraphQL',
    aboutProject:
      'Феникс GraphQL — приложение для финального задания курса по React в Rolling Scopes School.',
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
  const lang = useAppSelector(selectLanguage);
  const { isAuth /* ,  lang */ } = useContext(AuthContext);
  return (
    <>
      <header className={styles.mainHeader}>{textObj[lang].header}</header>
      <p className={styles.paragraph}>{textObj[lang].aboutProject}</p>
      <div className={styles.listBlock}>
        <h3 className={styles.header}>{textObj[lang].stack.header}</h3>
        {textObj.en.stack.techs &&
          textObj.en.stack.techs.map((el) => {
            return (
              <p className={styles.list} key={el}>
                {el}
              </p>
            );
          })}
      </div>
      <div className={styles.linkBlock}>
        {isAuth ? (
          <>
            <button className={styles.links} type="button">
              {textObj[lang].links.linkMainPage}
            </button>
            <p className={styles.paragraph}>
              {textObj[lang].links.linkParagraph}
            </p>
          </>
        ) : (
          <>
            <button className={styles.links} type="button">
              {textObj[lang].links.linkSignIn}
            </button>
            <p className={styles.paragraph}> / </p>
            <button className={styles.links} type="button">
              {textObj[lang].links.linkSignUp}
            </button>
            <p className={styles.paragraph}>
              {textObj[lang].links.linkParagraph}
            </p>
          </>
        )}
      </div>

      <div className={styles.developersBlock}>
        <h3 className={styles.header}>{textObj[lang].developers.header}</h3>
        <div className={styles.developers}>
          {textObj[lang].developers.members.map(
            (el: Developer, index: number) => {
              // console.log(el.surname);
              console.log(index);
              console.log(textObj.en.developers.members[index]);
              return (
                <div key={el.surname} className={styles.member}>
                  <img
                    className={styles.photo}
                    src={textObj.en.developers.members[index].photo}
                    alt={`${textObj.en.developers.members[index].name}_photo`}
                  />
                  <p className={styles.mainHeader}>
                    {`${el.name} ${el.surname}`}
                  </p>
                  <p className={styles.header}>{el.role}</p>
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
      </div>
    </>
  );
};

export default WelcomePage;
