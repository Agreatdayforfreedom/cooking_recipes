import { Request, Response } from "express";
import { signinSchema, signupSchema } from "../schemas/auth";
import { prisma } from "../prisma";
import { signToken } from "../utils/token";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

export const signin = async (req: Request, res: Response) => {
  const data = signinSchema.safeParse(req.body);

  if (!data.success) {
    return res.json({ error: "Validation failed", details: data.error.errors });
  }
  try {
    const { email, password } = data.data;
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return res.json({ error: "Invalid email" });
    }

    if (!(await bcrypt.compare(password, userExists.password))) {
      return res.json({ error: "Incorrect password" });
    }

    const { password: omit_password, ...rest } = userExists;

    return res.json({
      message: "User logged in successfully",
      user: {
        ...rest,
        token: signToken({ id: userExists.id }),
      },
    });
  } catch (error) {
    res.json({ error: "An unexpected error occurred" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const data = signupSchema.safeParse(req.body);

  if (!data.success) {
    return res.json({ error: "Validation failed", details: data.error.errors });
  }

  const { name, lastname, email, password } = data.data;

  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({ data: { email, lastname, name, password: passwordHash } });

    const { password: omit_password, ...rest } = user;

    return res.json({
      message: "User created successfully",
      user: {
        ...rest,
        token: signToken({ id: user.id }),
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.json({ error: "Email is already in use" });
      } else {
        res.json({ error: "An unexpected database error occurred" });
      }
    }
    res.json({ error: "An unexpected error occurred" });
  }
};
