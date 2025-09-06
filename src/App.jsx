import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import BoardModal from "./components/BoardModal";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);


  const handleCreateTask = (task) => {
    if (!activeBoard) return;

    const updatedBoards = boards.map((board) => {
      if (board.id === activeBoard.id) {
        return {
          ...board,
          columns: board.columns.map((col) =>
            col.title === task.status
              ? {
                  ...col,
                  tasks: [...col.tasks, { ...task, id: Date.now() }],
                }
              : col
          ),
        };
      }
      return board;
    });

    setBoards(updatedBoards);
    setActiveBoard(updatedBoards.find((b) => b.id === activeBoard.id));
  };

  const handleCreateBoard = (newBoard) => {
    const boardWithColumns = {
      ...newBoard,
      columns:
        newBoard.columns && newBoard.columns.length > 0
          ? newBoard.columns
          : [
              { id: 1, title: "Todo", tasks: [] },
              { id: 2, title: "Doing", tasks: [] },
              { id: 3, title: "Done", tasks: [] },
            ],
    };

    setBoards([...boards, boardWithColumns]);
    setActiveBoard(boardWithColumns);
  };


  const handleSelectBoard = (board) => {
    setActiveBoard(board);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      
      <Sidebar
        open={sidebarOpen}
        boards={boards}
        onCreateBoardClick={() => setIsBoardModalOpen(true)}
        onSelectBoard={handleSelectBoard}
      />

    
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          onAddTask={() => setIsTaskModalOpen(true)}
        />
       <Board
  activeBoard={activeBoard}
  onUpdateBoard={(updatedBoard) => {
    setBoards(
      boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b))
    );
    setActiveBoard(updatedBoard);
  }}
/>

      </div>

      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        statusOptions={activeBoard ? activeBoard.columns.map((c) => c.title) : []}
      />

      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </div>
  );
}
