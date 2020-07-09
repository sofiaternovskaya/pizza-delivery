import { RequestHandler } from "express";
import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import apiResponse from "../utilities/apiResponse";
import { verifyCookie } from "../utilities/encryptionUtils";
import Constants from "../constants";

const authenticateMiddleware: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.cookies.user;

  if (authorizationHeader) {
    try {
      const decoded = await verifyCookie(authorizationHeader);
      const user = await userService.getUserById(
        decoded[Constants.Cookie.KEY_USER_ID]
      );
      req.user = user;
    } catch (e) {
      apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      return;
    }
  } else {
    apiResponse.error(res, httpStatusCodes.FORBIDDEN);
    return;
  }

  next();
};

export default authenticateMiddleware;
