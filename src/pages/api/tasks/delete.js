import Task from "../../../models/Task";
import connectDB from "../../../utils/db";

connectDB();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { taskId } = req.body;
    await Task.findByIdAndDelete(taskId);
    res.status(204).json({ message: "Task deleted" });
  }
}
