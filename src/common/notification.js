import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notification = message => {
  const options = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  return toast.info(message, options);
};

export default notification;
