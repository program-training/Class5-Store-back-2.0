import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserResInterface } from "../_users/interfaces/usersInterfaces";
dotenv.config();

const secret = process.env.JWT_SECRET || "secret";

export const generateToken = ({ _id, isAdmin, email }: UserResInterface) => {
  const expiresIn = "1h";
  const token = jwt.sign({ _id, isAdmin, email }, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secretKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
