import React, { useRef } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import { Voyager } from 'graphql-voyager';
import { GraphQLSchema } from 'graphql';
import styles from './Documentation.module.scss';

// hljs.registerLanguage('javascript', javascript);

interface DocumentationType {
  schema: GraphQLSchema | undefined;
}

/* interface DocumentationType {
  schema: string;
}

const Documentation = (props: DocumentationType): JSX.Element => {
  const { schema } = props;
  return (
    <div className={styles.docPanel}>
      <pre>
        <code className='javascript'>{schema}</code>
      </pre>
    </div>
  );
}; */

const Documentation = (props: DocumentationType): JSX.Element => {
  const { schema } = props;
  return (
    <div className={styles.docPanel}>
      <Voyager introspection={schema} hideSettings />
    </div>
  );
};
export default Documentation;
