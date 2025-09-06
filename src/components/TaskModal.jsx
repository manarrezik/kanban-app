import { useState } from "react";

export default function TaskModal({ isOpen, onClose, onCreateTask }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const [status, setStatus] = useState("Todo"); 

  
  if (!isOpen) return null;

  const handleAddSubtask = () => setSubtasks([...subtasks, ""]);

  const handleSubtaskChange = (i, v) => {
    const next = [...subtasks];
    next[i] = v;
    setSubtasks(next);
  };

  const handleRemoveSubtask = (i) =>
    setSubtasks(subtasks.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateTask({
      id: Date.now(),
      title: taskName,
      description,
      subtasks: subtasks.filter((s) => s.trim() !== ""),
      status,
    });

    
    setTaskName("");
    setDescription("");
    setSubtasks([""]);
    setStatus("Todo");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g. Take coffee break"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              rows="3"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium">Subtasks</label>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subtask}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  placeholder="Subtask"
                  className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(index)}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubtask}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              + Add New Subtask
            </button>
          </div>

          
          <div>
            <label className="block text-sm font-medium">Current Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>

    
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
