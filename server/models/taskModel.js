import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: () => new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "completed", "in progress"],
    },
    activities: {
      type: {
        type: String,
        default: "assigned",
        enum: [
          "assigned",
          "started",
          "inprogress",
          "bug",
          "completed",
          "commented",
        ],
      },
      date: { type: Date, default: () => new Date() },
      by: { type: Schema.Types.ObjectId, ref: "User" },
    },
    subTasks: [
      {
        subtitle: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
