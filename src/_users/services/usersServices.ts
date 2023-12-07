import {
  UserReqInterface,
  UserResInterface,
} from "../interfaces/usersInterfaces";

import {
  AdminRegisterMutation,
  AdminRegister,
  UserQuery,
  UserRegister,
  UserRegisterMutation,
  UserLogin,
  Login,
} from "../../users/resolvers/interface";
import {
  getUserByIdFromDB,
  registerUserToDB,
  getUsersFromDB,
  userExistInDB,
  loginToDB,
} from "../dal/usersDal";
import { generateToken } from "../../auth/JWT";
import ServerError from "../../utils/ServerError";
import { convertUserForSending } from "../utils/usersUtils";

export const getUsers = async () => {
  try {
    const users = await getUsersFromDB();
    return users;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};

export const getUser = async (parent: UserQuery, args: { _id: string }) => {
  try {
    const user = await getUserByIdFromDB(args._id);
    return user;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};

const register = async (user: UserReqInterface) => {
  if (await userExistInDB(user.email))
    throw new ServerError(
      401,
      "it is not possible to register again with an existing email"
    );
  const userRegistered = await registerUserToDB(user);
  if (!userRegistered)
    throw new ServerError(401, "did not receive user from db");
  return convertUserForSending(userRegistered as UserResInterface);
};

const login = async (user: UserReqInterface) => {
  const userLogin = await loginToDB(user.email, user.password);
  if (!userLogin) {
    throw new ServerError(400, "unauthorized");
  } else {
    const token = generateToken(userLogin);
    return { token: token, isAdmin: user.isAdmin };
  }
};

export const signUpUser = async (
  parent: UserRegisterMutation,
  args: { input: UserReqInterface }
) => {
  try {
    return register(args.input);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};

export const signUpAndSignInUser = async (
  parent: UserRegisterMutation,
  args: { input: UserReqInterface }
) => {
  try {
    await register(args.input);
    return login(args.input);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};

export const SignInUser = async (
  parent: UserRegisterMutation,
  args: { input: UserReqInterface }
) => {
  try {
    return login(args.input);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};
