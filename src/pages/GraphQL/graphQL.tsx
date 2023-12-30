import { useContext, useState } from 'react';
import styles from './graphQL.module.scss';
import { AuthContext } from '../../controllers/appControllers';
import GraphQLtextObj from './langData';
import { selectEndpoint } from '../../redux/store';
import { setEndpoint } from '../../redux/reducers/settings';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import requestIcon from '../../assets/img/triangle.svg';
import requestIconActive from '../../assets/img/triangle_active.svg';

const exampleStr = `query {
  characters {
    results {
      name
      status
    }
  }
}`;

const someStr = `query {
  characters {
    results {
      name
      status {
        aaaaaaaaaaaaaaaaaaaaaaaa: {
          bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb: {
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc: {
              ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd: {
                eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: {
                  g
                }
              }
            }
          }
        }
      }
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
      name
      status
    }
  }
}`;

interface ResponseData {
  data: unknown;
}

const GraphQLPage = (): JSX.Element => {
  const { lang } = useContext(AuthContext);
  const url = useAppSelector(selectEndpoint);
  const dispatch = useAppDispatch();

  const [response, setResponse] = useState('');
  const [query, setQuery] = useState(`${exampleStr}`);
  const [isApi, setIsApi] = useState(true);
  const [isDocs, setIsDocs] = useState(false);

  const makeRequest = async (endpoint: string): Promise<ResponseData> => {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      setIsApi(true);
      return await res.json();
    } catch (err) {
      setIsApi(false);
      throw err;
    }
  };

  const printData = (): void => {
    makeRequest(url).then((res): void => {
      const resp = JSON.stringify(res.data, undefined, 2);
      setResponse(resp);
    });
  };

  const changeUrl = (str: string): void => {
    dispatch(setEndpoint(str));
    localStorage.setItem('endpoint', str);
    console.log(url);
    setResponse('');
    setQuery(exampleStr);
    makeRequest(str);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.apiSection}>
        <input
          className={
            isApi ? styles.url_input : `${styles.url_input} ${styles.error}`
          }
          type="url"
          placeholder={GraphQLtextObj[lang].urlPlaceholder}
          value={url}
          onChange={(e): void => changeUrl(e.target.value)}
        />
        <button
          className={styles.url_button}
          type="button"
          onClick={(): void => changeUrl('https://rickandmortyapi.com/graphql')}
        >
          {GraphQLtextObj[lang].reset}
        </button>
        <button
          className={
            isDocs ? `${styles.url_button} ${styles.active}` : styles.url_button
          }
          type="button"
          onClick={(): void => {
            if (isDocs === false) {
              setIsDocs(true);
            } else {
              setIsDocs(false);
            }
          }}
        >
          {GraphQLtextObj[lang].documentation}
        </button>
      </section>
      {isDocs && <pre className={styles.docs}>{someStr}</pre>}
      {!isDocs && (
        <section className={styles.query}>
          <button
            className={styles.query_button}
            type="button"
            onClick={(): void => console.log('Prettify')}
          >
            {GraphQLtextObj[lang].prettify}
          </button>
          <button
            className={styles.query_button}
            type="button"
            onClick={(): void => printData()}
          >
            <img
              src={requestIcon}
              alt="request"
              className={styles.requestImg}
              onMouseEnter={(e): void => {
                const img = e.target as HTMLImageElement;
                img.src = requestIconActive;
              }}
              onMouseLeave={(e): void => {
                const img = e.target as HTMLImageElement;
                img.src = requestIcon;
              }}
            />
          </button>
          <textarea
            className={styles.query_input}
            placeholder={GraphQLtextObj[lang].queryPlaceholder}
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
          />
        </section>
      )}
      {!isDocs && (
        <section
          className={
            isApi ? styles.response : `${styles.response} ${styles.error}`
          }
        >
          <div>{isApi ? response : 'No API or blocked by CORS'}</div>
        </section>
      )}
    </div>
  );
};

export default GraphQLPage;
