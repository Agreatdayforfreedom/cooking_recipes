import jwt from "jsonwebtoken";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const signToken = (data: Record<string, any>) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "30d" });
};
