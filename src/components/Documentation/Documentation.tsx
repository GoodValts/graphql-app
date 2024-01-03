import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import { Voyager } from 'graphql-voyager';
import { GraphQLSchema } from 'graphql';
import styles from './Documentation.module.scss';

hljs.registerLanguage('javascript', javascript);

// interface DocumentationType {
//   schema: GraphQLSchema | undefined;
// }

interface DocumentationType {
  schema: string;
}

const Documentation = (props: DocumentationType): JSX.Element => {
  const { schema } = props;

  // const codeRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   console.log(codeRef);
  //   if (codeRef.current) {
  //     const codeElement = codeRef.current;
  //     if (!codeElement.classList.contains('hljs')) {
  //       hljs.highlightElement(codeElement);
  //     }
  //   }
  // }, [schema]);

  return (
    <div className={styles.docPanel}>
      <pre>
        <code className={`javascript ${styles.codePanel}`} /*ref={codeRef}*/>
          {schema}
        </code>
      </pre>
    </div>
  );
};

// const Documentation = (props: DocumentationType): JSX.Element => {
//   const { schema } = props;
//   return (
//     <div className={styles.docPanel}>
//       <Voyager introspection={schema} hideSettings />
//     </div>
//   );
// };
export default Documentation;
