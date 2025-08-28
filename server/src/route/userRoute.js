import Router from "express";
import {
  register,
  userLogin,
  userLogOut,
  refresh,
  getUser,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", userLogin);
router.post("/logout", userLogOut);
router.get("/refresh", refresh);
router.get("/me", isAuthenticated, getUser);

export default router;
