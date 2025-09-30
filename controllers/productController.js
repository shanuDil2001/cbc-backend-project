import Product from "../models/productModel.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
   if (!isAdmin(req)) {
      return res.status(401).json({
         message: "You are not authorized to create products."
      });
   } else {
      const newProduct = new Product(req.body);

      try {
         const savedProduct = await newProduct.save();
         res.status(201).json({
            message: "Product created successful.",
            product: savedProduct.productId
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to create the product."
         });
         console.error(error);
      }
   }
}