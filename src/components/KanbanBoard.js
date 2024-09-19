import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import axios from "axios";

const KanbanBoard = ({ tasks, fetchTasks }) => {
  const [columns, setColumns] = useState({
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceTasks = Array.from(columns[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;

    const destinationTasks = Array.from(columns[destination.droppableId]);
    destinationTasks.splice(destination.index, 0, movedTask);

    setColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    }));

    await axios.put("/api/tasks/update", {
      taskId: movedTask._id,
      status: movedTask.status,
    });
    fetchTasks();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {Object.keys(columns).map((columnId) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                className="flex flex-col w-1/3 bg-gray-100 p-4 rounded-lg shadow-md"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-2xl font-bold mb-4">{columnId}</h2>
                {columns[columnId].map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white rounded-lg shadow-md mb-2 p-4 border border-gray-300"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          {task.title}
                        </h3>
                        <p className="text-gray-700">{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
