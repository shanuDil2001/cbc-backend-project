// Section 01: Import dependencies
import express from "express";
import mongoose from "mongoose";
import { env } from "./config/validateEnv.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import authenticateUser from "./middlewares/authenticateUser.js";


// Section 02: Create an express app
const app = express();


// Section 03: Middleware configurations
app.use(express.json());
app.use(authenticateUser);


// MongoDB Connection
async function connectToMongoDB() {
   try {
      await mongoose.connect(env.MONGODB_URI);
      console.log("Connection to MongoDB was established.");
   } catch (error) {
      console.log("Connection to MongoDB was failed.");
      console.error(error);
   }
}
connectToMongoDB();


// Section 04: Define routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


// Section 05: Start the server
app.listen(env.PORT, () => {
   console.log(`Server is running on port ${env.PORT}.`);
});