import express from "express";
import isAuth from "../middlewares/isAuth";
import { addRating, deleteOne, updateOne } from "../controllers/rating.controller";

const router = express.Router();

// add rating and review
router.post("/add", isAuth, addRating);
router.patch("/update/:id", isAuth, updateOne);
router.delete("/delete/:id", isAuth, deleteOne);

export default router;
