import Task from "../../../models/task";
import connectDB from "../../../utils/db";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, status, priority, dueDate, userId } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  }
}
