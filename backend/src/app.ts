import express from "express";
import authRouter from "./routes/auth.route";
import recipeRouter from "./routes/recipes.route";
const app = express();

app.use(express.json());

app.use("/", authRouter);
app.use("/recipe", recipeRouter);

app.use("/health", async (_req, res) => {
  res.sendStatus(200);
});

export default app;
