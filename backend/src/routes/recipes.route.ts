import express from "express";
import { getAll, getOne, getOwn, createOne, updateOne, deleteOne } from "../controllers/recipes.controller";
import isAuth from "../middlewares/isAuth";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/", getAll);

//protected
router.get("/own", isAuth, getOwn);

//unprotected
router.get("/:id", getOne);

//protected

router.post("/create", isAuth, upload.single("file"), createOne);

router.patch("/update/:id", upload.single("file"), isAuth, updateOne);

router.delete("/delete/:id", isAuth, deleteOne);

export default router;
