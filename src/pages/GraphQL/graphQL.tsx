import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Documentation from '../../components/Documentation/Documentation';
import EndpointInput from '../../components/EndpointInput/EndpointInput';
import { AuthContext } from '../../controllers/appControllers';
import GraphQLtextObj from './langData';
import prettify from '../../utils/prettify';
import makeRequest from '../../utils/api';

import document from '../../assets/img/doc.svg';

import styles from './graphQL.module.scss';

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
  const [query, setQuery] = useState(examleQuery);
  const [response, setResponse] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [displayParams, setDisplayParams] = useState('none');
  const [currParams, setCurrParams] = useState('variables');
  const [variables, setVariables] = useState(exampleVariables);
  const [headers, setHeaders] = useState('headers example');
  const [isDocsOpen, setDocsOpen] = useState(false);
  const { lang } = useContext(AuthContext);
  const url = useSelector((state: RootState) => state.endpoint.value);

  const printData = (): void => {
    setLoading(true);
    setResponse('');
    makeRequest(url, query, variables).then((res): void => {
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
        <EndpointInput />
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
            className={styles.input}
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
                {GraphQLtextObj[lang].variables}
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
                {GraphQLtextObj[lang].headers}
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
              className={styles.input}
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
