import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export function SweetAlertMessage(title,text,icon) {
    const MySwal= withReactContent(Swal);

    MySwal.fire({
        title:title,
        text: text,
        icon:icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true,
    })

}

export function SweetAlertConfirm() {
    const MySwal= withReactContent(Swal);

   return MySwal.fire({
        title:"¿Está seguro?",
        text: "¡No podrá revertir esto!",
        icon:"warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    })

}
