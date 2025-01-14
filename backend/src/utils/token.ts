import jwt from "jsonwebtoken";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const signToken = (data: Record<string, any>) => {
  return jwt.sign(data, "secret", { expiresIn: "30d" });
};
