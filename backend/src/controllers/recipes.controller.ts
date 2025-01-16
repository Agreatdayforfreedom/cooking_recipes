import { Request, Response } from "express";
import { prisma } from "../prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createRecipeSchema, updateRecipeSchema } from "../schemas/recipe";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipes.findMany({
      include: {
        ratings: true,

        _count: {
          select: {
            ratings: true,
          },
        },
      },
    });

    const recipesWithAvg = recipes.map((recipe) => {
      const avg =
        recipe.ratings.reduce((acc: number, curr) => {
          return acc + curr.rating;
        }, 0) / recipe.ratings.length;

      //exclude rating because they aren't used in the front
      const { ratings: _, ...recipeWithoutRating } = recipe;
      return {
        ...recipeWithoutRating,
        avg_rating: avg,
      };
    });

    return res.json({ recipes: recipesWithAvg });
  } catch {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
export const getOne = async (req: Request, res: Response) => {
  try {
    const recipe = await prisma.recipes.findFirst({
      where: {
        id: parseInt(req.params.id, 10),
      },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
        ratings: true,
        _count: {
          select: {
            ratings: true,
          },
        },
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const avg = recipe.ratings.reduce((acc: number, curr) => {
      return acc + curr.rating;
    }, 0);

    return res.json({
      recipe: {
        ...recipe,
        avg_rating: avg / recipe.ratings.length,
      },
    });
  } catch {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const getOwn = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipes.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        ratings: true,

        _count: {
          select: {
            ratings: true,
          },
        },
      },
    });

    const recipesWithAvg = recipes.map((recipe) => {
      const avg =
        recipe.ratings.reduce((acc: number, curr) => {
          return acc + curr.rating;
        }, 0) / recipe.ratings.length;

      const { ratings: _, ...recipeWithoutRating } = recipe;
      return {
        ...recipeWithoutRating,
        avg_rating: avg,
      };
    });

    return res.json({ recipes: recipesWithAvg });
  } catch {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const createOne = async (req: Request, res: Response) => {
  const data = createRecipeSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: "Validation failed", details: data.error.errors });
  }

  const { title, description, ingredients } = data.data;

  try {
    const recipe = await prisma.recipes.create({
      data: {
        title,
        description,
        ingredients,
        userId: req.user.id,
      },
    });

    return res.json({ message: "Recipe created successfully", recipe });
  } catch {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const updateOne = async (req: Request, res: Response) => {
  const data = updateRecipeSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: "Validation failed", details: data.error.errors });
  }

  try {
    const updated = await prisma.recipes.update({
      where: {
        id: parseInt(req.params.id, 10),
        userId: req.user.id,
      },
      // the ingredients is validated with zod z.optional(ingredientsSchema), so the ingredients object is not parsed if the fields don't match.
      data: data.data,
    });

    res.send({ message: "Updated successfully", updated });
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
    await prisma.recipes.delete({
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
