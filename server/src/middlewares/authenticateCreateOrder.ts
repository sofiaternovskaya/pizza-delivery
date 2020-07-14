import { RequestHandler } from "express";
import userService from "../services/user.service";
import { verifyCookie } from "../utilities/encryptionUtils";
import Constants from "../constants";

const authenticateCreateOrderMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authorizationHeader = req.cookies.user;

  if (authorizationHeader) {
    const decoded = await verifyCookie(authorizationHeader);
    const user = await userService.getUserById(
      decoded[Constants.Cookie.KEY_USER_ID]
    );
    req.user = user;
  }

  next();
};

export default authenticateCreateOrderMiddleware;
