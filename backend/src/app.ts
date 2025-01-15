import express from "express";
import authRouter from "./routes/auth.route";
const app = express();

app.use(express.json());

//todo: move base url to a config file
app.use("/", authRouter);

app.use("/health", async (_req, res) => {
  res.sendStatus(200);
});

export default app;
