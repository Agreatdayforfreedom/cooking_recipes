export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
};

export type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  created_at: string;
  image?: string;
  userId?: number; // unused
  user: User;
  avg_rating?: number;
  _count?: {
    ratings: number;
  };
  ratings: Rating[];
};

export type Rating = {
  id: number;
  rating: number;
  review: string;
  user: User;
  userId: number;
  created_at: string;
};
