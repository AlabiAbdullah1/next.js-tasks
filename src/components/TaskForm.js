/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const TaskForm = ({ task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To Do");
  const [priority, setPriority] = useState(task?.priority || "Low");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (task) {
        // Editing a task
        await axios.put(
          `/api/tasks/${task._id}`,
          { title, description, status, priority },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Creating a new task
        await axios.post(
          "/api/tasks",
          { title, description, status, priority },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      router.push("/tasks");
    } catch (err) {
      console.error("Error creating/updating task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">{task ? "Update Task" : "Create Task"}</button>
    </form>
  );
};

export default TaskForm;
