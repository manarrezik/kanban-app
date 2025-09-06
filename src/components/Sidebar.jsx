import { useState } from "react";
import { LayoutDashboard, EyeOff, Eye, PlusCircle } from "lucide-react";

export default function Sidebar({
  open = true,
  boards = [],
  onCreateBoardClick,
  onSelectBoard,
}) {
  const [isOpen, setIsOpen] = useState(open);

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
                    className="flex items-center gap-2 px-6 py-3 rounded-r-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
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

            
            <div className="p-6">
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
