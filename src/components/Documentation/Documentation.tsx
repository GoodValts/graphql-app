import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import styles from './documentation.module.scss';

hljs.registerLanguage('javascript', javascript);

interface DocumentationType {
  schema: string;
}

const Documentation = (props: DocumentationType): JSX.Element => {
  const { schema } = props;

  return (
    <div className={styles.docs} data-testid="docs">
      <pre>
        <code className={`${styles.codePanel} javascript`}>{schema}</code>
      </pre>
    </div>
  );
};

export default Documentation;
