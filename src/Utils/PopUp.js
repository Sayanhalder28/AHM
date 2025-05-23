import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function popMessage(title, icon, massage, onCloseCallback) {
  MySwal.fire({
    title: title,
    text: massage,
    timer: 8000,
    icon: icon,
    showCancelButton: false,
    confirmButtonColor: '#2563EB',
    didClose: () => {
      // Execute the callback function when the modal is closed
      if (typeof onCloseCallback === 'function') {
        onCloseCallback();
      }
    },
  });
}

export default popMessage;
