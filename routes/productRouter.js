import express from "express";
import { createProduct, getProduct, getProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProduct);

export default productRouter;