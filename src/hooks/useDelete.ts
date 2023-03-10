import Swal from 'sweetalert2';

export async function useDelete(message: string): Promise<boolean> {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Confirmación',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    return true;
  }

  return false;
}