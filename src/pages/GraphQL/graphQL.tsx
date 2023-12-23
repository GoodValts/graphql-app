import styles from './graphQL.module.scss';

const GraphQLPage = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.header}>
        <button className={styles.button} type='button'>Prettify</button>
        <input
          className={styles.url_input}
          type="url"
          placeholder="Enter URL"
        />
        <button className={styles.button} type='submit'>Submit</button>
      </form>
      <div className={styles.code_wrapper}>
        <div className={styles.code}>
          <textarea
            className={styles.code_input}
            placeholder="Input code here"
          />
          <button className={styles.button_run} type='button'>Run</button>
        </div>
        <div className={styles.response} />
      </div>
    </div>
  );
};

export default GraphQLPage;
