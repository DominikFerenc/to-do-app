import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "../types/task";

interface EditTaskProps {
  task: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export default function EditTask({ task, onSave, onCancel }: EditTaskProps) {
  useParams<{ id: string }>();

  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = { ...task, title, content, completed };
    onSave(updatedTask);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edytuj taska</h2>
      <form onSubmit={handleSubmit}>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="completed" className="inline-flex items-center">
            <input
              id="completed"
              type="checkbox"
              className="form-checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <span className="ml-2">Ukończony</span>
          </label>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
          >
            Zapisz zmiany
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
