import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    title: {
      type: String,
    },
    participents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participent",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Groups = mongoose.model("Groups", groupSchema);
