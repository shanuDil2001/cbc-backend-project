import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProduct);
productRouter.put("/:productId", updateProduct);
productRouter.delete("/:productId", deleteProduct);

export default productRouter;