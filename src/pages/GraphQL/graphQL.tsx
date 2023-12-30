import { useContext, useState } from 'react';
import styles from './graphQL.module.scss';
import { AuthContext } from '../../controllers/appControllers';
import GraphQLtextObj from './langData';

interface ResponseData {
  data: undefined;
}

const GraphQLPage = (): JSX.Element => {
  const [url, setUrl] = useState('https://rickandmortyapi.com/graphql');
  const [query, setQuery] = useState(`query {
    characters {
      results {
        name
        status
      }
    }
  }`);
  const [response, setResponse] = useState('');
  const { lang } = useContext(AuthContext);

  const makeRequest = async (): Promise<ResponseData> => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    return res.json();
  };

  const printData = (): void => {
    makeRequest().then((res): void => {
      setResponse(JSON.stringify(res.data, undefined, 2));
    });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.header}>
        <button className={styles.button} type="button">
          {GraphQLtextObj[lang].prettify}
        </button>
        <input
          className={styles.url_input}
          type="url"
          placeholder={GraphQLtextObj[lang].urlPlaceholder}
          value={url}
          onChange={(e): void => setUrl(e.target.value)}
        />
        <button className={styles.button} type="submit">
          {GraphQLtextObj[lang].submit}
        </button>
      </form>
      <div className={styles.query_wrapper}>
        <div className={styles.query}>
          <textarea
            className={styles.query_input}
            placeholder={GraphQLtextObj[lang].queryPlaceholder}
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
          />
          <button
            className={styles.button_run}
            type="button"
            onClick={(): void => printData()}
          >
            <div className={styles.arrow_right} />
          </button>
        </div>
        <div className={styles.response}>
          <pre>{response}</pre>
        </div>
      </div>
    </div>
  );
};

export default GraphQLPage;
