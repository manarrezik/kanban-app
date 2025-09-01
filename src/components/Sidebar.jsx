// src/components/Sidebar.jsx
import { useState } from "react";
import {
  LayoutDashboard,
  EyeOff,
  Eye,
  PlusCircle,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar() {
  const [activeBoard, setActiveBoard] = useState("Platform launch");
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const boards = ["Platform launch", "Marketing Plan", "Roadmap"];

  return (
    <div className="flex">
    
      <div
        className={`${
          isOpen ? "w-64" : "w-0"
        } h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col justify-between overflow-hidden transition-all duration-300`}
      >
        {isOpen && (
          <>
         
            <div>
         
            
          
              <div className="px-6 text-xs tracking-widest text-gray-500 dark:text-gray-400">
                ALL BOARDS ({boards.length})
              </div>

              <nav className="mt-4 flex flex-col">
                {boards.map((board) => (
                  <button
                    key={board}
                    onClick={() => setActiveBoard(board)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-r-full transition-colors ${
                      activeBoard === board
                        ? "bg-purple-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    <span>{board}</span>
                  </button>
                ))}

          
                <button className="flex items-center gap-2 px-6 py-3 text-purple-600 hover:bg-purple-100 dark:hover:bg-gray-800 rounded-r-full">
                  <PlusCircle size={18} />
                  <span>+ Create New Board</span>
                </button>
              </nav>
            </div>

    
            <div className="p-6 flex flex-col gap-4">
       
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 rounded p-2">
                <Sun size={18} />
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-12 h-6 flex items-center bg-purple-600 rounded-full p-1 transition"
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                      darkMode ? "translate-x-6" : ""
                    }`}
                  />
                </button>
                <Moon size={18} />
              </div>

       
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <EyeOff size={18} />
                <span>Hide Sidebar</span>
              </button>
            </div>
          </>
        )}
      </div>

  
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="m-2 p-1 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          <Eye size={20} />
        </button>
      )}
    </div>
  );
}
