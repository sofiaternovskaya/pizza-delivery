import { getRepository } from "typeorm";
import { generateHash, verifyHash } from "../utilities/encryptionUtils";
import { sanitizeUser } from "../utilities/apiUtilities";
import { User } from "../entities/user/user.entity";

const getUserById = async (userId: string) => {
  try {
    return sanitizeUser(await getRepository(User).findOne({ id: userId }));
  } catch (e) {
    return null;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    return await getRepository(User).findOne({ email });
  } catch (e) {
    return null;
  }
};

type TUserInput = Pick<User, "email" | "password" | "name">;

const createUser = async (userData: TUserInput) => {
  const newUser = new User();
  const password = await generateHash(userData.password, 10);
  Object.assign(newUser, userData, {
    password,
  });
  return sanitizeUser(await getRepository(User).save(newUser));
};

const updateUser = async (user: User) => {
  return await getRepository(User).save(user);
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (user) {
    if (await verifyHash(password, user.password)) {
      updateUser(user);
      return sanitizeUser(user);
    }
  }
  return null;
};

export default {
  createUser,
  loginUser,
  getUserById,
};
