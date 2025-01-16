import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

export const getAll = async (req: Request, res: Response) => {};
export const getOne = async (req: Request, res: Response) => {};

export const getOwn = async (req: Request, res: Response) => {};

export const createOne = async (req: Request, res: Response) => {
  const { title, description, ingredients } = req.body;

  try {
    const recipe = await prisma.recipes.create({
      data: {
        title,
        description,
        ingredients: ingredients as Prisma.JsonArray,
        userId: req.user.id,
      },
    });

    res.json({ message: "recipe created!", recipe });
  } catch (error) {
    console.log(error);
  }
};

export const updateOne = async (req: Request, res: Response) => {};
export const deleteOne = async (req: Request, res: Response) => {};
