import React, { useState } from "react";
import { Task } from "../types/task";

interface AddTaskProps {
  onAdd: (task: Omit<Task, "id">) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const initialTask: Omit<Task, "id"> = {
    title: "",
    content: "",
    completed: false,
  };

  const [newTask, setNewTask] = useState<Omit<Task, "id">>(initialTask);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!newTask.title.trim()) {
      newErrors.title = "Tytuł jest wymagany.";
    }
    if (!newTask.content.trim()) {
      newErrors.content = "Treść jest wymagana.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd(newTask);
    setNewTask(initialTask);
    setErrors({});
  };

  const handleCancel = () => {
    setNewTask(initialTask);
    setErrors({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Dodaj nowe zadanie</h2>
      <form onSubmit={handleAddTask}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Tytuł
          </label>
          <input
            id="title"
            type="text"
            className={`mt-1 block w-full border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Treść
          </label>
          <textarea
            id="content"
            rows={4}
            className={`mt-1 block w-full border ${
              errors.content ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            value={newTask.content}
            onChange={(e) =>
              setNewTask({ ...newTask, content: e.target.value })
            }
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
          >
            Dodaj zadanie
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
