import IvanPhoto from '../../assets/img/IvanPhoto.jpg';
import AnastasiyaPhoto from '../../assets/img/AnastasiyaPhoto.jpg';
import NataliaPhoto from '../../assets/img/NataliaPhoto.jpg';

export interface Developer {
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

export default textObj;
