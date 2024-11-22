import mongoose, { Schema, models } from "mongoose";

export interface Folder {
  _id?: string;
  name: string;
  createdBy?: string;
  favourite?: string;
  createdAt?: string;
}

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean, 
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

const FolderModel = models.Folder || mongoose.model("Folder", folderSchema);
export default FolderModel;