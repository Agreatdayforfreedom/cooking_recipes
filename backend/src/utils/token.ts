import jwt from "jsonwebtoken";

export const signToken = (data: Record<string, any>) => {
  return jwt.sign(data, "secret", { expiresIn: "30d" });
};
