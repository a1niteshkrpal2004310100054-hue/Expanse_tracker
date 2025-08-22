import { Groups } from "../model/groupModel.js";
import { Participent } from "../model/participentSchema.js";
import { Expense } from "../model/expenseModel.js";
import { User } from "../model/userModel.js";
import crypto from "crypto";

export const createGroup = async (req, res) => {
  const { title, participents } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).josn("title is required");
  }
  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const group = await Groups.create({
      title,
      createdBy: userId,
    });

    const currentUser = await User.findById(userId);

    const creatorParticipent = await Participent.create({
      name: currentUser.name,
      email: currentUser.email,
      invitedBy: userId,
      inviteToken: crypto.randomBytes(16).toString("hex"),
      isRegistered: true,
      isShared: false,
      linkedUserId: userId,
      status: "active",
      groupId: group._id,
    });

    group.participents.push(creatorParticipent._id);

    if (Array.isArray(participents)) {
      for (const p of participents) {
        if (p.userId === userId || p.email === currentUser.email) continue;

        let inviteToken = crypto.randomBytes(16).toString("hex");
        let isRegistered = !!p.isRegistered;
        const newParticipents = await Participent.create({
          name: p.name,
          email: p.email,
          invitedBy: userId,
          inviteToken: inviteToken,
          isRegistered,
          isShared: false,
          linkedUserId: null,
          status: "pending",
          groupId: group._id,
        });
        group.participents.push(newParticipents._id);
      }
    }

    await group.save();

    const groupParticipents = await Groups.findById(group._id).populate(
      "participents"
    );

    return res
      .status(200)
      .json({ message: "Group Created", groups: groupParticipents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const createSplitExpense = async (req, res) => {
  const { title, amount, paidBy, participents, group, split } = req.body;
  const userId = req.user.userId;

  if (!title || !amount || !paidBy) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const splitAmount = amount / participents.length;

    const splitBetween = participents.map((participentsId) => ({
      participents: participentsId._id,
      share: Number(splitAmount.toFixed(2)),
    }));

    const currentUser = await User.findById(userId);
    const ispaidByUser = String(paidBy) === String(currentUser._id);

    const currentUserParticipant = await Participent.findOne({
      linkedUserId: userId,
      groupId: group,
    });

    const isPaidByCurrentUser =
      currentUserParticipant &&
      String(paidBy) === String(currentUserParticipant._id);

    // console.log("debug", currentUserParticipant, isPaidByCurrentUser);

    const expense = await Expense.create({
      title,
      amount: Number(amount),
      paidBy,
      paidByModel: isPaidByCurrentUser ? "User" : "Participent",
      group,
      participents,
      splitBetween,
      isShared: participents.length > 1,
    });
    await expense.save();

    const expensepopulated = await Expense.findById(expense._id)
      .populate("participents")
      .populate({
        path: "paidBy",
        select: "name email",
      });
    return res
      .status(200)
      .json({ message: "Expense Created", expensepopulated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get groups created by User along with participents
export const getGroup = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ message: "Unauthorized field" });
  }
  try {
    const group = await Groups.find({ createdBy: userId }).populate(
      "participents"
    );

    const userParticipents = await Participent.find({ linkedUserId: userId });
    const participentsId = userParticipents.map((p) => p._id);

    const membersGroup = await Groups.find({
      createdBy: { $ne: userId },
      participents: { $in: participentsId },
    }).populate("participents");

    const allGroups = [...group, ...membersGroup];

    return res.status(200).json({ message: "Group found", allGroups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSplitExpanse = async (req, res) => {
  const groupId = req.params.id;
  try {
    // console.log("groupId", groupId);
    if (!groupId) {
      return res.status(400).json({ message: "Group Id is missing" });
    }

    const expensepopulated = await Expense.find({ group: groupId })
      .sort({ createdAt: -1 })
      .populate("participents")
      .populate({
        path: "paidBy",
        select: "name email",
      });

    if (!expensepopulated) {
      return res
        .status(400)
        .json({ message: "Expense is not found for the selected Group" });
    }
    return res
      .status(200)
      .json({ message: "Expense Created", expensepopulated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
