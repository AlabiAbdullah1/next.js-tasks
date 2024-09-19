import { useState, useEffect } from "react";
import axios from "axios";
import KanbanBoard from "../components/KanbanBoard";

const KanbanPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get("/api/tasks/getTasks");

    setTasks(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-center text-blue-500">Kanban Board</h1>
      <KanbanBoard tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default KanbanPage;
