import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import application from "../constants/application";

const generateHash = async (
  password: string,
  saltRounds: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
      if (!err) {
        resolve(hash);
      }
      reject(err);
    });
  });

const verifyHash = async (password: string, hash: string): Promise<boolean> =>
  new Promise(resolve => {
    bcrypt.compare(password, hash, (err: Error, same: boolean) => {
      resolve(same);
    });
  });

const generateCookie = async (key: string, value: string) => {
  return await jwt.sign({ [key]: value }, application.env.authSecret, {
    expiresIn: application.timers.userCookieExpiry,
  });
};

const verifyCookie = async (token: string): Promise<any> =>
  new Promise(resolve => {
    jwt.verify(
      token,
      application.env.authSecret,
      (err: Error, decoded: any) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded);
        }
      }
    );
  });

export { generateHash, verifyHash, generateCookie, verifyCookie };
