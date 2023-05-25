import { useState, useEffect } from "react";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
import "./App.css";

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  document.title = "Tasks App";

  // Funcion para crear una nueva tarea.
  const createNewTask = (taskName) => {
    // Comprueba si ya existe una tarea con el mismo nombre en la lista taskItems y, si no existe, agrega una nueva tarea a la lista.
    if (!taskItems.find((task) => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  // La función se utiliza para alternar el estado "done" de una tarea específica.
  const toggleTask = (task) => {
    setTaskItems(
      // Se utiliza map para crear una nueva lista de tareas donde se actualiza el estado "done" de la tarea seleccionada.
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  // La función se utiliza para eliminar las tareas completadas de la lista taskItems. Filtra las tareas que no están marcadas como completadas y actualiza el estado de taskItems. Además, establece showCompleted en false para ocultar las tareas completadas.
  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  // Este useEffect se ejecuta cuando el componente se monta. Recupera los datos de las tareas almacenadas en el localStorage y los establece en taskItems utilizando JSON.parse para convertirlos de cadena a formato de objeto.
  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  // Este useEffect se ejecuta cada vez que el estado taskItems cambia. Guarda las tareas actualizadas en el localStorage utilizando JSON.stringify para convertirlas a formato de cadena.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <main className="bg-dark vh-100 text-white">
      <h1 className="text-center">Tasks App</h1>
      <div className="container p-4 col-md-4 offset-md-4">
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {/* Utilizamos una condición para mostrar el componente TaskTable solo si showCompleted es verdadero. */}
        {showCompleted && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </div>
    </main>
  );
}

export default App;
