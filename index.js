// Section 01: Import dependencies
import express from "express";
import mongoose from "mongoose";
import { env } from "./validations/validateEnv.js";

// Section 02: Create an express app
const app = express();



// Section 03: Middleware configurations



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



// Section 05: Start the server
app.listen(env.PORT, () => {
   console.log(`Server is running on port ${env.PORT}.`);
});