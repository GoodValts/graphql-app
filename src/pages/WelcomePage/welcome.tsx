import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthContext } from '../../controllers/appControllers';
import { auth } from '../../firebase/firebase';
import styles from './welcome.module.scss';
import gitIcon from '../../assets/img/git.png';
import tgIcon from '../../assets/img/tg.png';
import mapsIcon from '../../assets/img/maps.png';
import textObj, { Developer } from './langData';

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
                data-testid="navToGraphQL"
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
                data-testid="navToLogin"
              >
                {textObj[lang].links.linkSignIn}
              </button>
              {' / '}
              <button
                className={styles.links}
                type="button"
                onClick={(): void => navigate('/registration')}
                data-testid="navToRegistration"
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
