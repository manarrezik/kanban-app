import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


export default function Board({ activeBoard, onUpdateBoard }) {
  if (!activeBoard) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No board selected. Create or select one.
      </div>
    );
  }


  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = activeBoard.columns.findIndex(
      (col) => col.id.toString() === source.droppableId
    );
    const destColIndex = activeBoard.columns.findIndex(
      (col) => col.id.toString() === destination.droppableId
    );

    const sourceCol = activeBoard.columns[sourceColIndex];
    const destCol = activeBoard.columns[destColIndex];

    const task = sourceCol.tasks[source.index];

    
    const newSourceTasks = [...sourceCol.tasks];
    newSourceTasks.splice(source.index, 1);

    
    const newDestTasks = [...destCol.tasks];
    newDestTasks.splice(destination.index, 0, { ...task, status: destCol.title });

    const newColumns = [...activeBoard.columns];
    newColumns[sourceColIndex] = { ...sourceCol, tasks: newSourceTasks };
    newColumns[destColIndex] = { ...destCol, tasks: newDestTasks };

    onUpdateBoard({ ...activeBoard, columns: newColumns });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex-1 p-4 grid grid-cols-3 gap-4">
        {activeBoard.columns.map((col) => (
          <Droppable droppableId={col.id.toString()} key={col.id}>
            {(provided) => (
              <div
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow flex flex-col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="font-bold mb-3">
                  {col.title} ({col.tasks.length})
                </h3>

                <div className="space-y-2 flex-1">
                  {col.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow cursor-pointer"
                        >
                          <p className="font-medium">{task.title}</p>
                          {task.subtasks && task.subtasks.length > 0 && (
                            <p className="text-sm text-gray-500">
                              {
                                task.subtasks.filter((s) => s.trim() !== "")
                                  .length
                              }{" "}
                              of {task.subtasks.length} subtasks
                            </p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
