// eslint-disable-next-line
import { User } from "../entities/user/user.entity";

// TODO: better solve this issue through `typeRoots`
declare global {
  namespace Express {
    export interface Request {
      user: Omit<User, "password">;
    }
  }
}
