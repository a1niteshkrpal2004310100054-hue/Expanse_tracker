import mongoose, { Schema } from "mongoose";

const participentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    inviteToken: {
      type: String,
      sparse: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    linkedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "pending", "invited"],
      default: "pending",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  { timestamps: true }
);

export const Participent = mongoose.model("Participent", participentSchema);
