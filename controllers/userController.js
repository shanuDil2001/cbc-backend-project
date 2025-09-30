import { env } from "../config/validateEnv.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {

   async function hashPassword(password) {
      try {
         return await bcrypt.hash(password, env.SALT_ROUNDS);
      } catch (error) {
         throw new Error("Failed to hash password.");
      }
   }

   try {
      const hash = await hashPassword(req.body.password);

      const newUser = new User({
         email: req.body.email,
         fname: req.body.fname,
         lname: req.body.lname,
         password: hash,
         role: req.body.role
      });

      const savedUser = await newUser.save();

      return res.status(201).json({
         message: "User created successful.",
         user: {
            email: savedUser.email,
            role: savedUser.role
         }
      });
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: error.message || "Internal server error."
      });
   }
}