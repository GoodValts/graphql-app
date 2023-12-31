import { useContext, useEffect, useState } from 'react';
import styles from './graphQL.module.scss';
import { AuthContext } from '../../controllers/appControllers';
import GraphQLtextObj from './langData';

interface ResponseData {
  data?: unknown;
  errors?: unknown;
}

const exampleUrl = 'https://rickandmortyapi.com/graphql';
const examleQuery = `query {
    characters {
      results {
        name
        status
      }
    }
  }
`;

const GraphQLPage = (): JSX.Element => {
  const [url, setUrl] = useState(exampleUrl);
  const [query, setQuery] = useState(examleQuery);
  const [response, setResponse] = useState('');
  const [statusColor, setStatusColor] = useState('status_loading');
  const [statusMessage, setStatusMessage] = useState('');
  const { lang } = useContext(AuthContext);

  const makeRequest = async (): Promise<ResponseData> => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    // console.log(res.json());

    return res.json();
  };

  useEffect(() => {
    setStatusColor('status_loading');
    setStatusMessage('');
    makeRequest().then(
      () => {
        setStatusColor('status_success');
      },
      () => {
        setStatusColor('status_error');
        setStatusMessage('Server cannot be reached');
      }
    );
  }, [url]);

  const printData = (): void => {
    makeRequest().then((res): void => {
      if (res.data) {
        setResponse(JSON.stringify(res.data, undefined, 2));
      } else if (res.errors) {
        setResponse(JSON.stringify(res.errors, undefined, 2));
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.button} type="button">
          {GraphQLtextObj[lang].prettify}
        </button>
        <input
          name="url"
          className={styles.url_input}
          type="url"
          placeholder={GraphQLtextObj[lang].urlPlaceholder}
          value={url}
          onChange={(e): void => setUrl(e.target.value)}
        />
        <label htmlFor="url" className={styles.status_message}>
          {statusMessage}
        </label>
        <div className={styles[statusColor]} />
      </div>
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
