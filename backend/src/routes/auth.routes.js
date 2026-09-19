import { Router } from "express";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import {
  register,
  login,
  verifyEmail,
  getMe,
} from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";


const authRouter = Router();

// POST api/register
authRouter.post("/register", registerValidator, register);

// POST api/login
authRouter.post("/login", loginValidator, login);

//  GET api/get-me
authRouter.get("/get-me", authUser, getMe);

// GET api/verify-email
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
