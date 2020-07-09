import { Router } from "express";
import userController from "../../controllers/user.controller";
import authenticate from "../../middlewares/authenticate";
import { handleErrorAsync } from "../../middlewares/errorHandler";
import userSchema from "../../constants/schema/user.schema";

const schemaValidator = require("express-joi-validator");

const router = Router();

router.post(
  "/login",
  schemaValidator(userSchema.login),
  handleErrorAsync(userController.login)
);
router.get("/me", authenticate, handleErrorAsync(userController.self));

export default router;
