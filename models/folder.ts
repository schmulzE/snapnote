import mongoose, { Schema, models } from "mongoose";

export interface Folder {
  name: string;
  tag?: string;
  createdBy?: string;
}
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

const FolderModel = models.Folder || mongoose.model("Folder", folderSchema);
export default FolderModel;