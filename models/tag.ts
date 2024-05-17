import mongoose, { Schema, models } from "mongoose";

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

const Tag = models.Tag || mongoose.model("Tag", tagSchema);
export default Tag;