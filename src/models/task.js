import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  dueDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
