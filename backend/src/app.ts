import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route";
import recipeRouter from "./routes/recipes.route";
import ratingRouter from "./routes/ratings.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use("/recipe", recipeRouter);
app.use("/rating", ratingRouter);

app.use("/health", async (_req, res) => {
  res.sendStatus(200);
});

export default app;
