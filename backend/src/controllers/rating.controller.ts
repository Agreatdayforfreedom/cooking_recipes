import { Request, Response } from "express";
import { prisma } from "../prisma";
import { createRatingSchema, updateRatingSchema } from "../schemas/rating";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const addRating = async (req: Request, res: Response) => {
  const data = createRatingSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: "Validation failed", details: data.error.errors });
  }

  const { rating, review, recipeId } = data.data;

  try {
    const ratingExists = await prisma.ratings.findFirst({
      where: {
        userId: req.user.id,
        recipeId,
      },
    });

    if (ratingExists) {
      return res.status(400).json({ error: "You cannot add more than one review per recipe" });
    }

    await prisma.ratings.create({
      data: {
        rating,
        review,
        recipeId,
        userId: req.user.id,
      },
    });

    return res.json({ message: "Rating added successfully" });
  } catch {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const updateOne = async (req: Request, res: Response) => {
  const data = updateRatingSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: "Validation failed", details: data.error.errors });
  }

  try {
    const rating = await prisma.ratings.update({
      where: {
        id: parseInt(req.params.id, 10),
        userId: req.user.id,
      },
      data: data.data,
    });

    return res.json({ message: "Rating updated successfully", rating });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Recipe not found" });
      }
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await prisma.ratings.delete({
      where: {
        id: parseInt(req.params.id, 10),
        userId: req.user.id,
      },
    });
    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Recipe not found" });
      }
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
