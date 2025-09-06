import { useState } from "react";

export default function BoardModal({ isOpen, onClose, onCreateBoard }) {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState(["Todo", "Doing", "Done"]); 

  if (!isOpen) return null;

  const handleAddColumn = () => setColumns([...columns, ""]);

  const handleColumnChange = (i, value) => {
    const next = [...columns];
    next[i] = value;
    setColumns(next);
  };

  const handleRemoveColumn = (i) =>
    setColumns(columns.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBoard = {
      id: Date.now(),
      title: boardName,
      columns: columns
        .filter((c) => c.trim() !== "")
        .map((col) => ({ id: Date.now() + Math.random(), title: col, tasks: [] })), 
    };

    onCreateBoard(newBoard);

    setBoardName("");
    setColumns(["Todo", "Doing", "Done"]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Add New Board</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div>
            <label className="block text-sm font-medium">Board Name</label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="e.g. Marketing Plan"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium">Board Columns</label>
            {columns.map((col, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={col}
                  onChange={(e) => handleColumnChange(idx, e.target.value)}
                  placeholder="Column name"
                  className="flex-1 py-2 px-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                {columns.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveColumn(idx)}
                    className="text-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddColumn}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              + Add New Column
            </button>
          </div>

    
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  );
}
