import express from "express";
import isAuth from "../middlewares/isAuth";
import { signin, signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/profile", isAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
