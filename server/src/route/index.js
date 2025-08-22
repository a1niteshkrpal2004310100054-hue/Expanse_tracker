import Router from "express";
import userRoute from "./userRoute.js";
import expenseRoute from "./expenseRoute.js";

const router = Router();

router.use("/user", userRoute);
router.use("/expense", expenseRoute);

export default router;
