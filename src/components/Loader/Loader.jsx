import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './Loader.module.css';

const LoaderSpinner = () => {
  const options = {
    type: 'ThreeDots',
    color: '#eb4034',
    height: 60,
    width: 60,
  };
  return (
    <div className={css.container}>
      <Loader {...options} />
    </div>
  );
};

export default LoaderSpinner;
