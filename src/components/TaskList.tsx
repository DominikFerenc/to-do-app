import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  toggleTaskComplete,
  updateTask,
} from "../api/api-service";
import EllipsisVertical from "../icons/ellipsis-vertical";
import { Task } from "../types/task";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import MenuList from "./MenuList";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        setError("Error fetching tasks.");
      }
    };
    loadTasks();
  }, []);

  const handleToggleCompletionTask = async (task: Task) => {
    try {
      const updatedTask = await toggleTaskComplete(task.id);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      setError("Error updating task status.");
    }
  };

  const handleAddTask = async (task: Omit<Task, "id">) => {
    try {
      await createTask(task);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      setError("Error adding task.");
    }
  };

  const handleSaveEdit = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      setEditingTaskId(null);
    } catch (error) {
      setError("Error updating task.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError("Error deleting task.");
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <div className="container border rounded-2xl shadow-lg flex flex-col mx-auto p-4 bg-white max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="w-full">
            <AddTask onAdd={handleAddTask} />
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="relative bg-gray-200 p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {editingTaskId === task.id ? (
                <EditTask
                  task={task}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <label className="block text-lg font-semibold mb-2">
                    {task.title}
                  </label>
                  <p
                    className="text-sm mb-4"
                    style={{ wordBreak: "break-word" }}
                  >
                    {task.content}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                        task.completed
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {task.completed ? "Ukończony" : "Nieukończony"}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() =>
                        setActiveTaskId(
                          task.id === activeTaskId ? null : task.id
                        )
                      }
                      className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <EllipsisVertical />
                    </button>
                    {task.id === activeTaskId && (
                      <MenuList
                        id={task.id}
                        onDelete={handleDeleteTask}
                        onEdit={() => setEditingTaskId(task.id)}
                      />
                    )}
                  </div>
                  <div className="mt-12 flex flex-col justify-center items-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleCompletionTask(task)}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="text-gray-700">
                        Zmień status zadania
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
