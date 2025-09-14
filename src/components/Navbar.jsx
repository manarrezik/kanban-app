import logo from "../assets/logo-dark.svg";
import { Plus } from "lucide-react";

export default function Navbar({ onAddTask, activeBoard }) {
  return (
    <nav
      className="flex items-center justify-between 
      bg-white dark:bg-gray-800 
      px-6 py-4 
      border-b border-gray-200 dark:border-gray-700
      transition-colors duration-300"
    >
  
      <img src={logo} alt="Logo" className="h-6" />

      
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {activeBoard ? activeBoard.title : ""}
      </h1>


      <div className="flex items-center gap-4">
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 
            bg-purple-600 hover:bg-purple-700
            text-white 
            px-4 py-2 
            rounded-lg shadow
            transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!activeBoard} 
        >
          <Plus size={18} />
          <span>Add New Task</span>
        </button>

        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition">
          ⋮
        </button>
      </div>
    </nav>
  );
}
