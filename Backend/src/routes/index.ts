import express, { Express, Request, Response } from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifytoken";
import auth from "../controllers/auth.controller";
import user from "../controllers/user.controller";
import products from "../controllers/product.controller";
import categories from "../controllers/category.controller";
import permissions from "../controllers/permission.controller";

router.use("/auth", auth);
router.use("/users", verifyToken, user);
router.use("/products", verifyToken, products);
router.use("/categories", verifyToken, categories);
router.use("/permissions", verifyToken, permissions);


export default router;
