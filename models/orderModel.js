import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
   orderId: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   total: {
      type: Number,
      required: true
   },
   labeledTotal: {
      type: Number,
      required: true
   },
   status: {
      type: String,
      required: true,
      default: "pending"
   },
   products: [
      {
         productInfo: {
            productId: {
               type: String,
               required: true
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
            }
         },
         quantity: {
            type: Number,
            required: true
         }
      }
   ],
   createdAt: {
      type: Date,
      required: true,
      default: Date.now
   }
});

const Order = mongoose.model("orders", orderSchema);

export default Order;