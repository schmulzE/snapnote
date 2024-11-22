import mongoose, { Schema, models } from "mongoose";

export interface Todo {
  _id?: string;
  title?: string;
  description?: string;
  dueDate?: string | null;
  isCompleted?: boolean;
  tag?: string;
  createdBy?: string;
}

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
      ref: 'TagModel',
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'UserModel',
      required: true,
    },
  },
  { timestamps: true }
);

const TodoModel = models.Todo || mongoose.model("Todo", todoSchema);
export default TodoModel;