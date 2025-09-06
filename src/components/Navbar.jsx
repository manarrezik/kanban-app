import { useState } from "react";
import { Plus } from "lucide-react";
import TaskModal from "./TaskModal";


import logo from "../assets/logo-dark.svg";

export default function Navbar({ onCreateTask, statusOptions = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      
    
      <img src={logo} alt="Logo" className="h-6" />

      <h1 className="text-lg font-bold text-gray-900 dark:text-white"></h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} />
          <span>Add New Task</span>
        </button>

        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          ⋮
        </button>
      </div>

      
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateTask={onCreateTask}
        statusOptions={statusOptions}
      />
    </nav>
  );
}
