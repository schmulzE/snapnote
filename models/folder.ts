import mongoose, { Schema, models } from "mongoose";

const folderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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