import mongoose, { Schema } from "mongoose";

const expensSchema = new Schema(
  {
    title: String,
    amount: Number,
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "paidByModel",
      required: true,
    },
    paidByModel: {
      type: String,
      required: true,
      enum: ["User", "Participent"],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
      default: null,
    },
    participents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participent",
      },
    ],
    splitBetween: [
      {
        participents: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Participent",
        },
        share: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    isShared: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expensSchema);
