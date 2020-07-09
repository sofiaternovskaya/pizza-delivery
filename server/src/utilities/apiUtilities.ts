import { User } from "../entities/user/user.entity";

const sanitizeUser = (user: User) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

export { sanitizeUser };
