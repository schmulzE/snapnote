import mongoose, { Schema, models } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    dueDate: {
      type: String,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      required: false,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Tag',
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;