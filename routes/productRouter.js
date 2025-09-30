import express from "express";
import { createProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProduct);
productRouter.put("/:productId", updateProduct);

export default productRouter;