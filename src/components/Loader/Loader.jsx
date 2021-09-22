import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './Loader.module.css';

const LoaderSpinner = ({ type = 'ThreeDots', size = 60 }) => {
  const options = {
    type,
    color: 'rgb(201, 94, 115)',
    height: size,
    width: size,
  };
  return (
    <div className={css.container}>
      <Loader {...options} />
    </div>
  );
};

export default LoaderSpinner;
