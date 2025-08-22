import mongoose, { Schema } from "mongoose";

const singleExpanse = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    paymentMethod: {
      type: String,
      default: "cash",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const NormalExpanse = mongoose.model("NormalExpanse", singleExpanse);
