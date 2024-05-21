import mongoose, { Schema, models } from "mongoose";

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

const Folder = models.Folder || mongoose.model("Folder", folderSchema);
export default Folder;