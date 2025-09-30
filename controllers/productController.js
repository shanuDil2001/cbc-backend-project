import { json } from "zod";
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

   try {
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
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: error.message || "Internal server error"
      });
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
            message: error.message || "Internal server error."
         });
      }
   } else {
      try {
         const products = await Product.find();

         return res.status(200).json(products);
      } catch (error) {
         console.error(error);

         return res.status(500).json({
            message: error.message || "Internal server error."
         });
      }
   }
}

export async function updateProduct(req, res) {
   const productId = req.params.productId;

   if (!isAdmin(req)) {
      return res.status(401).json({
         message: "You are not authorized to update the products."
      });
   } else {
      try {
         const product = await Product.findOne({ productId: productId });

         if (product == null) {
            return res.status(404).json({
               message: "Enter a valid Product ID."
            });
         } else {
            await Product.updateOne({ productId: productId }, {
               productId: req.body.productId,
               name: req.body.name,
               altNames: req.body.altNames,
               description: req.body.description,
               images: req.body.images,
               labeledPrice: req.body.labeledPrice,
               price: req.body.price,
               stock: req.body.stock,
               isAvailable: req.body.isAvailable
            });

            res.status(200).json({
               message: "Product updated successful."
            });
         }
      } catch (error) {
         console.error(error);

         return res.status(500).json({
            message: error.message || "Internal server error."
         });
      }
   }
}

export async function deleteProduct(req, res) {

}