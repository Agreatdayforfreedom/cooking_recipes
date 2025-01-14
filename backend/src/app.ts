import express from "express";

const app = express();

app.use(express.json());

app.use("healt", async (_req, res) => {
  res.sendStatus(200);
});

export default app;
