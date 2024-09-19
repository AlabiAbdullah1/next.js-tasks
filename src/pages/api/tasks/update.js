import Task from "../../../models/Task";
import connectDB from "../../../utils/db";

connectDB();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { taskId, title, description, status, priority, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, priority, dueDate },
      { new: true }
    );
    res.status(200).json(updatedTask);
  }
}
