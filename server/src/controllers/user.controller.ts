import { RequestHandler } from "express";
import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import apiResponse from "../utilities/apiResponse";
import { generateCookie } from "../utilities/encryptionUtils";
import constants from "../constants";
import locale from "../constants/locale";

const login: RequestHandler = async (req, res) => {
  const user = await userService.loginUser(req.body.email, req.body.password);
  if (user) {
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(res, user, httpStatusCodes.OK, cookie);
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      locale.INVALID_CREDENTIALS
    );
  }
};

const register: RequestHandler = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(res, user, httpStatusCodes.CREATED, cookie);
  } catch (e) {
    if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS
      );
    } else {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
  }
};

const self: RequestHandler = async (req, res) => {
  const cookie = await generateUserCookie(req.user.id);
  apiResponse.result(res, req.user, httpStatusCodes.OK, cookie);
};

const generateUserCookie = async (userId: string) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value: await generateCookie(
      constants.Cookie.KEY_USER_ID,
      userId.toString()
    ),
  };
};

export default {
  login,
  register,
  self,
};
