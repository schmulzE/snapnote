import mongoose, { Schema, models } from "mongoose";
export interface Tag {
  _id?: string;
  name?: string;
  createdBy?: string;
}

const tagSchema = new Schema(
  {
    name: {
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

const TagModel = models.Tag || mongoose.model("Tag", tagSchema);
export default TagModel;