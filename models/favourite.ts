import mongoose, { Schema, models } from "mongoose";

const favouriteSchema = new Schema(
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

const Favourite = models.Favourite || mongoose.model("Favourite", favouriteSchema);
export default Favourite;