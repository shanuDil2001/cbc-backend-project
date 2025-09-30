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

export async function getProduct(req, res) {
   const productId = req.params.productId;

   const product = await Product.findOne({ productId: productId });

   if (!isAdmin(req)) {

      if (product != null) {
         if (product.isAvailable == false) {
            return res.status(404).json({
               message: "Product not found."
            });
         } else {
            return res.status(200).json(product);
         }
      } else {
         return res.status(404).json({
            message: "Product not found."
         });
      }
   } else {
      if (product != null) {
         return res.status(200).json(product);
      } else {
         return res.status(404).json({
            message: "Product not found."
         });
      }
   }
}

export async function getProducts(req, res) {
   if (!isAdmin(req)) {
      try {
         const products = await Product.find({ isAvailable: true });

         return res.status(200).json(products);
      } catch (error) {
         console.error(error);

         return res.status(500).json({
            message: "Failed to get products."
         });
      }
   } else {
      try {
         const products = await Product.find();

         return res.status(200).json(products);
      } catch (error) {
         console.error(error);

         return res.status(500).json({
            message: "Failed to get products."
         });
      }
   }
}

export async function updateProduct(req, res) {

}

export async function deleteProduct(req, res) {

}