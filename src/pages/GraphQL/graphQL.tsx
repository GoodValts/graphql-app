import { useContext, useEffect, useState } from 'react';
import styles from './graphQL.module.scss';
import { AuthContext } from '../../controllers/appControllers';
import GraphQLtextObj from './langData';
import prettify from './prettify';

import document from '../../assets/img/doc.svg';
import Documentation from '../../components/Documentation/Documentation';

interface ResponseData {
  data?: unknown;
  errors?: unknown;
}

const exampleUrl = 'https://rickandmortyapi.com/graphql';
const examleQuery = `query AllCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      name
      status
    }
  }
}
`;
const exampleVariables = `{
  "page": 1,
  "filter": {
    "name": "Rick"
  }
}`;

const GraphQLPage = (): JSX.Element => {
  const [url, setUrl] = useState(exampleUrl);
  const [query, setQuery] = useState(examleQuery);
  const [response, setResponse] = useState('');
  const [statusColor, setStatusColor] = useState('status_loading');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [displayParams, setDisplayParams] = useState('none');
  const [currParams, setCurrParams] = useState('variables');
  const [variables, setVariables] = useState(exampleVariables);
  const [headers, setHeaders] = useState('headers example');
  const [isDocsOpen, setDocsOpen] = useState(false);
  const { lang } = useContext(AuthContext);

  const makeRequest = async (): Promise<ResponseData> => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: JSON.parse(variables),
      }),
    });
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
        setStatusMessage(GrapgQLtextObj[lang].errorMessage);
      }
    );
  }, [url]);

  const printData = (): void => {
    setLoading(true);
    setResponse('');
    makeRequest().then((res): void => {
      if (res.data) {
        setResponse(JSON.stringify(res.data, undefined, 2));
      } else if (res.errors) {
        setResponse(JSON.stringify(res.errors, undefined, 2));
      }
      setLoading(false);
    });
  };

  return (
    <div className={styles.graphql}>
      {isDocsOpen && <Documentation />}
      <div className={styles.header}>
        <button
          className={styles.button}
          type="button"
          onClick={(): void => setQuery(prettify(query))}
        >
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
        <button
          className={styles.button_doc}
          type="button"
          onClick={(): void =>
            isDocsOpen ? setDocsOpen(false) : setDocsOpen(true)
          }
        >
          <img src={document} alt="documentation" />
        </button>
      </div>
      <div className={styles.main}>
        <div className={styles.query}>
          <textarea
            className={styles.query_input}
            placeholder={GraphQLtextObj[lang].queryPlaceholder}
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
          />
          <div className={styles.params}>
            <div className={styles.param_tabs}>
              <button
                className={
                  currParams === 'variables'
                    ? styles.button_active
                    : styles.button
                }
                type="button"
                onClick={(): void => {
                  setDisplayParams('block');
                  setCurrParams('variables');
                }}
              >
                {GrapgQLtextObj[lang].variables}
              </button>
              <button
                className={
                  currParams === 'headers'
                    ? styles.button_active
                    : styles.button
                }
                type="button"
                onClick={(): void => {
                  setDisplayParams('block');
                  setCurrParams('headers');
                }}
              >
                {GrapgQLtextObj[lang].headers}
              </button>
              <button
                className={styles.toggle}
                type="button"
                aria-label="toggle"
                style={
                  displayParams === 'none'
                    ? { transform: 'rotate(45deg)' }
                    : { transform: 'rotate(-135deg)', top: '0.5rem' }
                }
                onClick={(): void =>
                  displayParams === 'none'
                    ? setDisplayParams('block')
                    : setDisplayParams('none')
                }
              />
            </div>
            <textarea
              className={styles.query_input}
              style={{ display: `${displayParams}` }}
              value={currParams === 'variables' ? variables : headers}
              onChange={(e): void =>
                currParams === 'variables'
                  ? setVariables(e.target.value)
                  : setHeaders(e.target.value)
              }
            />
          </div>
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
          {isLoading && <div className={styles.loader} />}
        </div>
      </div>
    </div>
  );
};

export default GraphQLPage;
