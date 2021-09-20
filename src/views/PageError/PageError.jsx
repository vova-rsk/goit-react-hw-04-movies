import css from './PageError.module.css';

const PageError = () => {
  return (
    <div className={css.container}>
      <span className={css.code}>404</span>
      <span className={css.message}> page not found</span>
    </div>
  );
};

export default PageError;
