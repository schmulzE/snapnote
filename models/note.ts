import mongoose, { Schema, models } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Folder',
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

const Note = models.Note || mongoose.model("Note", noteSchema);
export default Note;