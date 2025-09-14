import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import BoardModal from "./components/BoardModal";
import TaskDetailsModal from "./components/TaskDetailsModal";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
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

  const handleUpdateTask = (updatedTask) => {
    if (!activeBoard) return;

    const newColumns = activeBoard.columns.map((col) => {
      let newTasks = col.tasks.filter((t) => t.id !== updatedTask.id);

      if (col.title === updatedTask.status) {
        newTasks = [...newTasks, updatedTask];
      }

      return { ...col, tasks: newTasks };
    });

    const updatedBoard = { ...activeBoard, columns: newColumns };

    setBoards(boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b)));
    setActiveBoard(updatedBoard);
    setSelectedTask(updatedTask);
  };

  const handleCreateBoard = (newBoard) => {
    const boardWithColumns = {
      ...newBoard,
      id: Date.now(), 
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

  const handleSelectBoard = (board) => setActiveBoard(board);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        open={sidebarOpen}
        boards={boards}
        onCreateBoardClick={() => setIsBoardModalOpen(true)}
        onSelectBoard={handleSelectBoard}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeBoard={activeBoard} 
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          onAddTask={() => setIsTaskModalOpen(true)}
          activeBoard={activeBoard} 
        />
        <Board
          activeBoard={activeBoard}
          onUpdateBoard={(updatedBoard) => {
            setBoards(
              boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b))
            );
            setActiveBoard(updatedBoard);
          }}
          onSelectTask={(task) => setSelectedTask(task)}
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

      <TaskDetailsModal
        isOpen={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        statusOptions={activeBoard ? activeBoard.columns.map((c) => c.title) : []}
      />
    </div>
  );
}
