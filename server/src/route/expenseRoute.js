import Router from "express";
import {
  createGroup,
  createSplitExpense,
  getGroup,
  getSplitExpanse,
} from "../controller/expenseSplitController.js";
import {
  createIndividualExpense,
  getExpanse,
  editExpanse,
  deleteExpense,
  generateReport,
} from "../controller/expanseController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

// for individuals
router.post("/single-expense", isAuthenticated, createIndividualExpense);
router.get("/get-single-expense", isAuthenticated, getExpanse);
router.patch("/edit-expanse/:id", isAuthenticated, editExpanse);
router.delete("/delete-expanse/:id", isAuthenticated, deleteExpense);
router.post("/generate-report", isAuthenticated, generateReport);
// for split
router.post("/create-group", isAuthenticated, createGroup);
router.post("/split-expense", isAuthenticated, createSplitExpense);
router.get("/get-group", isAuthenticated, getGroup);
router.get("/get-group-expanse/:id", isAuthenticated, getSplitExpanse);

export default router;
