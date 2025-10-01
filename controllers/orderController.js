import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export async function createOrder(req, res) {
   // Check wether the user is available or not
   if (req.user == null) {
      return res.status(401).json({
         message: "Want to make an order, login first."
      });
   } else {
      // Generate order id
      function getNextOrderId(lastOrderId) {
         const prefix = "CBC";
         if (lastOrderId == null) {
            return `${prefix}00001`;
         } else {
            const numberPart = lastOrderId.replace(prefix, ""); //00004
            const newNumber = parseInt(numberPart, 10) + 1; //5
            const paddedNumber = newNumber.toString().padStart(numberPart.length, "0"); //00005
            return `${prefix}${paddedNumber}`;
         }
      }

      try {
         const orderArray = await Order.find();
         const lastOrder = orderArray.reverse().at(0);

         if (lastOrder != null) {
            req.body.orderId = getNextOrderId(lastOrder.orderId);
         } else {
            req.body.orderId = getNextOrderId(null);
         }

         let products = [];
         let total = 0;
         let labeledTotal = 0;

         for (let i = 0; i < req.body.products.length; i++) {
            const productId = req.body.products[i].productInfo.productId;

            const product = await Product.findOne({ productId: productId });


            if (product == null) {
               return res.status(404).json({
                  message: `Product with the ${productId} is not found`
               });
            } else {
               const productIsAvailable = product.isAvailable;

               if (!productIsAvailable) {
                  return res.status(404).json({
                     message: `Product with the ${productId} is not available`
                  });
               } else {
                  products.fill(product);

                  total = product.price * req.body.products[i].quantity;

                  labeledTotal = product.labeledPrice * req.body.products[i].quantity;
               }
            }
         }

         const newOrder = new Order({
            orderId: req.body.orderId,
            email: req.user.email,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            total: total,
            labeledTotal: labeledTotal,
            products: products
         });

         await newOrder.save();

         return res.status(201).json({
            message: "Order created successful.",
            total: total,
            labeledTotal: labeledTotal
         });

      } catch (error) {
         console.error(error);

         res.status(500).json({
            message: error.message || "Internal server error."
         });
      }
   }
}