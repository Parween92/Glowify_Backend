import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";
import {
  loginUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import userSchema from "../schemas/user.schema.js";
import loginSchema from "../schemas/login.schema.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(validateSchema(userSchema), createUser);

userRouter.post("/register", validateSchema(userSchema), registerUser);
userRouter.post("/login", validateSchema(loginSchema), loginUser);

userRouter
  .route("/:id")
  .get(getUserById)
  .put(updateUser) 
  .delete(deleteUser);

export default userRouter;
