import jwt from "jsonwebtoken";
import {JWT_SECRET} from "./config/keys";

const privateKey = JWT_SECRET; // secret key

// create web token
export const createToken = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, options);
}

// decode session token
export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, privateKey);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
