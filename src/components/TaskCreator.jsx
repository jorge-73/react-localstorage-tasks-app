import { useState } from "react";

export const TaskCreator = ({ createNewTask }) => {
  const [newTaskName, setNewTaskName] = useState("");

  // Esta función se llama cuando se envía el formulario. Previene el comportamiento predeterminado del evento, llama a la función createNewTask que se pasa como prop desde el componente padre, pasando el nombre de la nueva tarea como argumento, y luego restablece el valor de newTaskName a una cadena vacía.
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(newTaskName);
    setNewTaskName("");
  };

  // Esta función se llama cuando cambia el valor del campo de entrada. Actualiza el estado newTaskName con el valor ingresado por el usuario.
  const handleChange = (e) => {
    setNewTaskName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 row">
      <div className="col-md-9">
        <input
          type="text"
          placeholder="Enter a new task"
          onChange={handleChange}
          value={newTaskName}
          required
          className="form-control"
        />
      </div>
      <div className="col-3">
        <button className="btn btn-primary btn-sm form-control">Save Task</button>
      </div>
    </form>
  );
};
