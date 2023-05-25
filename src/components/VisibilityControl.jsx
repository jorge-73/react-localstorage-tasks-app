import Swal from "sweetalert2";

export const VisibilityControl = ({
  setShowCompleted,
  cleanTasks,
  isChecked,
}) => {
  // Esta función se llama cuando el valor del checkbox cambia. Actualiza el estado setShowCompleted según el valor del checkbox.
  const handleChange = (e) => {
    setShowCompleted(e.target.checked);
  };

  // Esta función se llama cuando se hace clic en el botón "Clear". Muestra un cuadro de diálogo SweetAlert2 para confirmar si el usuario desea eliminar las tareas. Si el usuario confirma, muestra un mensaje de éxito y luego llama a la función cleanTasks para limpiar las tareas completadas.
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to delete it?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your tasks has been deleted',
          showConfirmButton: false,
          timer: 1000
        })
        cleanTasks();
      }
    })
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-secondary p-2 rounded border-secondary">
      <div className="form-check form-switch">
      <input type="checkbox" checked={isChecked} onChange={handleChange} className="form-check-input" />{" "}
      <label>Show Tasks Done</label>
      </div>
      <button 
      onClick={handleDelete}
      className="btn btn-danger mx-2"
      >
        Clear
      </button>
    </div>
  );
};
