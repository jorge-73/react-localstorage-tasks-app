import { TaskRow } from "./TaskRow";

export const TaskTable = ({ tasks, toggleTask, showCompleted = false }) => {

  // Esta función toma un parámetro doneValue. Filtra las tareas según el valor de doneValue (ya sea true o false) y luego mapea cada tarea a un componente TaskRow, pasando las props necesarias.
  const taskTableRows = (doneValue) => {
    return (
    tasks
    .filter(task => task.done === doneValue)
    .map((task) => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ))
    )
  };

  return (
    <table className="table table-secondary table-dark table-striped table-bordered my-3">
      <thead>
        <tr className="table-primary">
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>{taskTableRows(showCompleted)}</tbody>
    </table>
  );
};
