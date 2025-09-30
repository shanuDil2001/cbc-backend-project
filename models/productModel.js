import mongoose from "mongoose";

const productSchema = mongoose.Schema({
   productId: {
      type: String,
      required: true,
      unique: true
   },
   name: {
      type: String,
      required: true
   },
   altNames: [
      {
         type: String,
         required: true
      }
   ],
   description: {
      type: String,
      required: true
   },
   images: [
      {
         type: String
      }
   ],
   labeledPrice: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   stock: {
      type: Number,
      required: true
   },
   isAvailable: {
      type: Boolean,
      required: true,
      default: true
   }
});

const Product = mongoose.model("products", productSchema);

export default Product;