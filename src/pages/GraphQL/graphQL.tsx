import { useContext, useState, useEffect } from 'react';
import { GraphQLSchema, printSchema } from 'graphql';
import hljs from 'highlight.js/lib/core';
import styles from './graphQL.module.scss';
import { AuthContext } from '../../controllers/appControllers';
import GrapgQLtextObj from './langData';
import getIntrospectionSchema from '../../redux/api/api';
import Documentation from '../../components/Documentation/Documentation';

export interface ResponseData {
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
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();
  // const [schema, setSchema] = useState('');
  const [open, setOpen] = useState(false);
  const { lang } = useContext(AuthContext);

  useEffect(() => {
    hljs.highlightAll();
  }, [schema, open]);

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

  const getRequest = (): void => {
    setOpen(!open);
    getIntrospectionSchema(url).then((res) => {
      setSchema(res);
      // setSchema(printSchema(res));
    });
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
          {GrapgQLtextObj[lang].prettify}
        </button>
        <input
          className={styles.url_input}
          type="url"
          placeholder={GrapgQLtextObj[lang].urlPlaceholder}
          value={url}
          onChange={(e): void => setUrl(e.target.value)}
        />
        <button
          className={styles.button}
          type="button"
          onClick={(): void => getRequest()}
        >
          {GrapgQLtextObj[lang].submit}
        </button>
      </form>
      <div className={styles.query_wrapper}>
        {open && <Documentation schema={schema} />}
        <div className={styles.query}>
          <textarea
            className={styles.query_input}
            placeholder={GrapgQLtextObj[lang].queryPlaceholder}
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
