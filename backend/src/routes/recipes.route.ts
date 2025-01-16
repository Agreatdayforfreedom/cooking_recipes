import express from "express";
import { getAll, getOne, getOwn, createOne, updateOne, deleteOne } from "../controllers/recipes.controller";
import isAuth from "../middlewares/isAuth";

const router = express();

router.get("/", getAll);

router.get("/:id", getOne);

//protected
router.get("/own", isAuth, getOwn);

router.post("/create", isAuth, createOne);

router.patch("/update/:id", isAuth, updateOne);

router.delete("/delete/:id", isAuth, deleteOne);

export default router;
