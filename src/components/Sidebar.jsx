import { useState, useEffect } from "react";
import { LayoutDashboard, EyeOff, Eye, PlusCircle } from "lucide-react";
import dark from "../assets/icon-dark-theme.svg";
import light from "../assets/icon-light-theme.svg";

export default function Sidebar({
  open = true,
  boards = [],
  onCreateBoardClick,
  onSelectBoard,
}) {
  const [isOpen, setIsOpen] = useState(open);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
                    key={board.id}
                    onClick={() => onSelectBoard(board)}
                    className="flex items-center gap-2 px-6 py-3 rounded-r-full text-gray-700 dark:text-gray-300 hover:bg-purple-700 hover:text-white transition"
                  >
                    <LayoutDashboard size={18} />
                    <span>{board.title}</span>
                  </button>
                ))}

                
                <button
                  onClick={onCreateBoardClick}
                  className="flex items-center gap-2 px-6 py-3 text-purple-600 hover:bg-purple-100 dark:hover:bg-gray-800 rounded-r-full"
                >
                  <PlusCircle size={18} />
                  <span>+ Create New Board</span>
                </button>
              </nav>
            </div>

        
            <div className="p-6 space-y-4">
              
              <div className="flex items-center justify-center gap-4 bg-gray-200 dark:bg-gray-800 rounded-md py-2">
                <img
                  src={light}
                  alt="Light mode"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setDarkMode(false)}
                />
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="w-10 h-5 bg-purple-600 rounded-full flex items-center px-1"
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </button>
                <img
                  src={dark}
                  alt="Dark mode"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setDarkMode(true)}
                />
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
