import { LegacyRef, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { printSchema } from 'graphql';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/intellij-light.css';
import { RootState } from '../../redux/store';
import Documentation from '../../components/Documentation/Documentation';
import EndpointInput from '../../components/EndpointInput/EndpointInput';
import { AuthContext } from '../../controllers/appControllers';
import GraphQLtextObj from './langData';
import prettify from '../../utils/prettify';
import { makeRequest, getIntrospectionSchema } from '../../utils/api';

import document from '../../assets/img/doc.svg';
import stick from '../../assets/img/magic-stick.svg';

import styles from './graphQL.module.scss';

hljs.registerLanguage('javascript', javascript);

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
  const [headers, setHeaders] = useState('');
  const [isDocsOpen, setDocsOpen] = useState(false);
  const [schema, setSchema] = useState('');
  const { lang } = useContext(AuthContext);
  const url = useSelector((state: RootState) => state.endpoint.value);

  useEffect(() => {
    hljs.highlightAll();
  }, [isDocsOpen, schema]);

  const printData = (): void => {
    setLoading(true);
    setResponse('');
    makeRequest(url, query, variables, headers).then(
      (res): void => {
        if (res.data) {
          setResponse(JSON.stringify(res.data, undefined, 2));
        } else if (res.errors) {
          setResponse(JSON.stringify(res.errors, undefined, 2));
        }
        setLoading(false);
      },
      (error) => {
        setResponse(`${error.name}: ${error.message}`);
        setLoading(false);
      }
    );
  };

  const handlePrettify = (): void => {
    setQuery(prettify(query));
    if (variables) {
      setVariables(JSON.stringify(JSON.parse(variables), undefined, 2));
    }
    if (headers) {
      setHeaders(JSON.stringify(JSON.parse(headers), undefined, 2));
    }
  };

  const responseRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = responseRef.current;
    if (el) {
      if (el.dataset.highlighted === 'yes') {
        delete el.dataset.highlighted;
        hljs.highlightElement(el);
      } else {
        hljs.highlightElement(el);
      }
    }
  }, [response]);

  function removeQuotes(jsonString: string): string {
    const pattern = /"(\w+)":/g;
    const replacedString = jsonString.replace(pattern, '$1:');

    return replacedString;
  }

  const openDocs = (): void => {
    if (!isDocsOpen) {
      getIntrospectionSchema(url).then((res) => {
        setDocsOpen(true);
        setSchema(printSchema(res));
      });
    } else {
      setDocsOpen(false);
    }
  };

  return (
    <div className={styles.graphql}>
      {isDocsOpen && <Documentation schema={schema} />}
      <div className={styles.header}>
        <button
          className={styles.button_prettify}
          type="button"
          onClick={handlePrettify}
        >
          {GraphQLtextObj[lang].prettify}
        </button>
        <button
          className={styles.button_prettify_icon}
          type="button"
          onClick={handlePrettify}
        >
          <img src={stick} alt="prettify" />
        </button>
        <EndpointInput />
        <button
          className={styles.button_doc}
          type="button"
          data-testid="docs-btn"
          onClick={openDocs}
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
            data-testid="arrow-btn"
            onClick={printData}
          >
            <div className={styles.arrow_right} />
          </button>
        </div>
        <div className={styles.response}>
          <pre>
            <code
              data-testid="response-block"
              className="json"
              ref={responseRef}
            >
              {response}
            </code>
          </pre>
          {isLoading && <div className={styles.loader} />}
        </div>
      </div>
    </div>
  );
};

export default GraphQLPage;
