import UserInterface from "../interfaces/UserInterface";
import User from "../models/mongoose/UserSchema";

export const getUserByIdFromDb = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUsersToDb = async (user: UserInterface) => {
  try {
    const newUser = new User(user);
    const userFromDB = await newUser.save();
    return userFromDB;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};
