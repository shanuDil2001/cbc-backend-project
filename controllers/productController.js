import Product from "../models/productModel.js";

export async function createProduct(req, res) {
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