import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: { type: String },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    notificationType: {
      type: String,
      default: "alert",
      enum: ["alert", "message"],
    },
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
