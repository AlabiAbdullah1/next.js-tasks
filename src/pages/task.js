import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import TaskModal from "../components/TaskModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get("/api/tasks/getTasks");
    setTasks(data);
  };

  const openModal = (task = null) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditTask(null);
    setIsModalOpen(false);
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await axios.delete("/api/tasks/delete", { data: { taskId } });
    fetchTasks();
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const goToKanban = () => {
    router.push("/kanban");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List</h1>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => openModal()}
          >
            Add Task
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={goToKanban}
          >
            Kanban Board
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-300 rounded-lg shadow-lg p-4"
          >
            <div className="mb-2">
              <h2 className="text-xl font-semibold">{task.title}</h2>
            </div>
            <div className="mb-2">
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              {task.dueDate && (
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => openModal(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={closeModal} task={editTask} />
      )}
    </div>
  );
};

export default Tasks;
