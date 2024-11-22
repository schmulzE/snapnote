import mongoose, { Schema, models } from "mongoose";

export interface Note {
  _id?: string;
  title?: string;
  content?: string;
  createdBy?: string;
  folder?: string;
  favourite?: boolean;
  image?: string;
  tag?: string;
  createdAt? : string;
}

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
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
      ref: 'FolderModel',
      required: false,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'TagModel',
      required: false,
    },
    favourite: {
      type: Boolean,
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

const NoteModel = models.Note || mongoose.model("Note", noteSchema);
export default NoteModel;