// Section 01: Import dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file into process.env object



// Section 02: Create an express app
const app = express();



// Section 03: Middleware configurations



// MongoDB Connection
try {
   mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
   console.log("Connection to MongoDB was established.");
} catch (error) {
   console.log("Connection to MongoDB was failed.");
   console.error(error);
}



// Section 04: Define routes



// Section 05: Start the server
app.listen(5000, () => {
   console.log("Server is running on port: 5000");
});