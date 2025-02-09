import { Users } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

interface IPayload {
  id: number;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: Omit<Users, "password">;
    }
  }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = "";
  const bearer = req.header("Authorization");

  if (!bearer) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    if (bearer && bearer.toLowerCase().startsWith("bearer")) {
      token = bearer.split(" ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as IPayload;

      req.user = (await prisma.users.findFirst({
        where: {
          id: payload.id,
        },
        select: {
          email: true,
          id: true,
          lastname: true,
          name: true,
        },
      })) as Omit<Users, "password">;

      return next();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: "Invalid token" });
    }
  }
};

export default isAuth;
