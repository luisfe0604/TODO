import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import EditTaskDialog from "./editTaskDialog";
import TaskList from "./taskList";

import "../App.css";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/task");
      setTasks(response.data);
    } catch (error) {
      setError("Erro ao carregar tarefas " + error);
    }
  };

  const setError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const addTask = async () => {
    try {
      const response = await axios.post("http://localhost:8080/task/save", {
        task: task,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      setError("Erro ao adicionar tarefa. " + error);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/task/delete/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError("Erro ao remover tarefa. " + error);
    }
  };

  const startEditingTask = (task) => {
    setEditingTask(task);
  };

  const confirmEditTask = async (editedTaskLabel) => {
    try {
      const response = await axios.put(`http://localhost:8080/task/edit`, {
        ...editingTask,
        task: editedTaskLabel,
      });
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? response.data : task))
      );
      setEditingTask(null);
    } catch (error) {
      setError("Erro ao editar tarefa. " + error);
    }
  };

  const toggleTaskCompletion = async (editedTaskCompleted) => {
    try {
      await axios.put(`http://localhost:8080/task/edit`, {
        ...editedTaskCompleted,
        completed: !editedTaskCompleted.completed,
      });
      fetchTasks();
    } catch (error) {
      setError("Erro ao finalizar tarefa. " + error);
    }
  };

  return (
    <div className="todo-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <h2>TODO List</h2>
      <div className="input-group">
        <InputText
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adicione uma tarefa"
        />
        <Button icon="pi pi-plus" onClick={addTask} label="Adicionar" />
      </div>

      <h3>Tarefas Pendentes</h3>
      {tasks.filter((task) => !task.completed).length > 0 ? (
        <TaskList
          tasks={tasks.filter((task) => !task.completed)}
          onToggle={toggleTaskCompletion}
          onEdit={startEditingTask}
          onRemove={removeTask}
        />
      ) : (
        <div className="no-tasks">Nenhuma tarefa pendente.</div>
      )}

      <hr className="divider" />

      <h3>Tarefas Concluídas</h3>
      {tasks.filter((task) => task.completed).length > 0 ? (
        <TaskList
          tasks={tasks.filter((task) => task.completed)}
          onToggle={toggleTaskCompletion}
          onEdit={startEditingTask}
          onRemove={removeTask}
        />
      ) : (
        <div className="no-tasks">Nenhuma tarefa concluída.</div>
      )}

      <EditTaskDialog
        visible={!!editingTask}
        task={editingTask}
        onHide={() => setEditingTask(null)}
        onConfirm={confirmEditTask}
      />
    </div>
  );
};

export default ToDoList;
