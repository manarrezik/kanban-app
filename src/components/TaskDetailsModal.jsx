import { useState, useEffect } from "react";

export default function TaskDetailsModal({
  isOpen,
  task,
  onClose,
  onUpdateTask,
  statusOptions = [],
}) {
  const [localTask, setLocalTask] = useState(null);

  useEffect(() => {
    if (task) {
      const fixedSubtasks =
        task.subtasks?.map((s) =>
          typeof s === "string" ? { title: s, completed: false } : s
        ) || [];
      setLocalTask({ ...task, subtasks: fixedSubtasks });
    }
  }, [task]);

  if (!isOpen || !localTask) return null;

  const toggleSubtask = (index) => {
    const updatedSubtasks = [...localTask.subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;

    const updated = { ...localTask, subtasks: updatedSubtasks };
    setLocalTask(updated);
    onUpdateTask(updated); 
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    const updated = { ...localTask, status: newStatus };
    setLocalTask(updated);
    onUpdateTask(updated);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
  
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 "
        >
          ✕
        </button>

        
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {localTask.title}
        </h2>

      
        <div className="mb-4 text-gray-900 dark:text-white">
          <h3 className="font-semibold mb-2">
            Subtasks (
            {localTask.subtasks.filter((s) => s.completed).length} of{" "}
            {localTask.subtasks.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {localTask.subtasks.map((sub, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={sub.completed || false}
                  onChange={() => toggleSubtask(idx)}
                  className="accent-purple-600"
                />
                <span
                  className={
                    sub.completed ? "line-through text-gray-500" : ""
                  }
                >
                  {sub.title}
                </span>
              </label>
            ))}
          </div>
        </div>

      
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900 dark:text-white">
            Current Status
          </label>
          <select
            value={localTask.status}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {statusOptions.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
