import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/constants/toastMessage.scss';

const ToastMessage  = (message)=> {
        toast.success(message, {
          position: "top-right",
          autoClose: 4000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast',
        });
      
}

export default  ToastMessage ;