import { User } from "../model/userModel.js";
import { Participent } from "../model/participentSchema.js";
import { Groups } from "../model/groupModel.js";
import { NormalExpanse } from "../model/singleExpanseModel.js";

// create Expanse
export const createIndividualExpense = async (req, res) => {
  const { title, amount, category, description, paymentMethod } = req.body;
  const userId = req.user.userId;
  if (!title || !amount || !category || !paymentMethod) {
    return res.status(401).json({ message: "All fields are required" });
  }
  try {
    if (!userId) {
      return res.status(400).json({ message: "Unauthorized User" });
    }

    const expense = await NormalExpanse.create({
      title,
      amount,
      category,
      description,
      paymentMethod,
      createdBy: userId,
    });

    return res.status(200).json({ message: "Created", expense });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// For Registers User Only
export const getExpanse = async (req, res) => {
  const userId = req.user.userId;
  try {
    if (!userId) {
      return res.status(401).josn({ message: "Unauthorized User" });
    }

    const expanse = await NormalExpanse.find({
      createdBy: userId,
    }).sort({ createdAt: -1 });
    if (!expanse) {
      return res.json({ message: "expanse not found" });
    }
    return res.status(200).json({ message: "Success", expanse });
  } catch (error) {
    console.error(error);
    return res.status(500).josn({ message: "Internal server Error" });
  }
};

// fro Edit Expanse
export const editExpanse = async (req, res) => {
  const userId = req.user.userId;
  const expanseId = req.params.id;
  try {
    if (!userId) {
      return res.statue(401).json({ message: "Unauthorized User" });
    }

    const allowedFields = [
      "title",
      "amount",
      "category",
      "description",
      "paymentMethod",
    ];

    const updates = {};
    for (const keys of allowedFields) {
      if (req.body.hasOwnProperty(keys)) {
        updates[keys] = req.body[keys];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields are provided for updates" });
    }

    const updatedExpanse = await NormalExpanse.findByIdAndUpdate(
      expanseId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedExpanse) {
      return res.statue(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expanse Updated", updatedExpanse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExpense = async (req, res) => {
  const userId = req.user.userId;
  const expenseId = req.params.id;
  try {
    if (!userId) {
      return res.statue(401).json({ message: "Unauthorized User" });
    }
    if (!expenseId) {
      return res.statue(404).json({ message: "ExpenseId is required" });
    }

    const deleteExpense = await NormalExpanse.findByIdAndDelete(expenseId);

    if (!deleteExpense) {
      return res
        .status(400)
        .json({ message: "Requested expense is not found" });
    }

    return res.status(200).json({ message: "Expense deleted", deleteExpense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const getMonthlyDataByCategory = async(req, res);
