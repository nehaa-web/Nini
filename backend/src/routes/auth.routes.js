import { Router }  from "express"
import { registerValidator , loginValidator} from "../validators/auth.validator.js";
import { register , login , verifyEmail } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/register" , registerValidator , register)

authRouter.get("/verify-email" , verifyEmail)

authRouter.post("/login" , loginValidator ,login)
export default authRouter