import Task from "../../../models/Task";
import connectDB from "../../../utils/db";

await connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  }
}
