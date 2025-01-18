import { Request, Response } from "express";
import { prisma } from "../prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createRecipeSchema, updateRecipeSchema } from "../schemas/recipe";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { upload_stream } from "../utils/cloudinary";
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
        ratings: {
          include: {
            user: {
              omit: {
                password: true,
              },
            },
          },
        },
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
    let secure_url = "";
    if (req.file) {
      if (req.file.size / (1024 * 1024) >= 2) {
        return res.status(403).json("Max image size: 2MB");
      }

      const result = await upload_stream(req.file.buffer);

      if (result?.secure_url) {
        secure_url = result.secure_url;
      }
    }
    const recipe = await prisma.recipes.create({
      data: {
        title,
        description,
        ingredients,
        image: secure_url,
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
    const recipeExists = await prisma.recipes.findUnique({
      where: {
        id: parseInt(req.params.id, 10),
        userId: req.user.id,
      },
    });

    if (!recipeExists) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const public_id = recipeExists.image?.split("/").at(-1)?.split(".")[0];

    let secure_url = "";
    if (req.file) {
      if (req.file.size / (1024 * 1024) >= 2) {
        return res.status(403).json("Max image size: 2MB");
      }

      const result = await upload_stream(req.file.buffer, public_id);

      if (result?.secure_url) {
        secure_url = result.secure_url;
      }
    }
    const recipe = await prisma.recipes.update({
      where: {
        id: parseInt(req.params.id, 10),
        userId: req.user.id,
      },
      // the ingredients is validated with zod z.optional(ingredientsSchema), so the ingredients object is not parsed if the fields don't match.
      data: { ...data.data, ...(secure_url && secure_url ? { image: secure_url } : {}) },
    });

    res.send({ message: "Updated successfully", recipe });
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
    const recipe = await prisma.recipes.delete({
      where: {
        id: parseInt(req.params.id, 10),
        userId: req.user.id,
      },
    });
    const public_id = recipe.image?.split("/").at(-1)?.split(".")[0];

    await cloudinary.uploader.destroy("recipes/" + public_id);
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
