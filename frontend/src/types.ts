import { number } from "zod";

export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

export type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: {
    name: string;
    quantity: number;
  }[];
  created_at: string;
  image?: string;
  userId?: number; // unused
  avg_rating?: number;
};
