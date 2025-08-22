import Router from "express";
import {
  register,
  userLogin,
  userLogOut,
} from "../controller/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", userLogin);
router.post("/logout", userLogOut);

export default router;
